import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  defineContainerCompose,
  defineContainerConfig,
  defineContainerConfiguration,
  defineContainerNetwork,
  defineContainerSecret,
  defineContainerService,
  defineContainerVolume,
  which,
} from "../src/config.ts";
import {
  ContainerComposeConfig,
} from "../src/models/config/container-compose.ts";
import { ContainerConfig } from "../src/models/config/container.ts";
import { ContainerSectionSchema } from "../src/models/config/std.ts";
import { UpOptionsSchema } from "../src/models/config/container-compose.ts";
import {
  isExecutableInPath,
  whichContainer,
  whichContainerCompose,
} from "../scripts/container-which.ts";
import {
  autoPullComposeImagesSync,
  containerComposeDown,
  containerComposeUp,
  containerCreate,
  containerExec,
  containerFactory,
  containerRun,
  extractPositionalImage,
  formatContainerArgs,
  isAutoImagePullEnabled,
} from "../scripts/container-exec.ts";
import { defineOciConfig, OciConfig } from "../src/models/config/container.ts";

describe("ContainerComposeConfig schema & defineContainerCompose", () => {
  it("should validate a compose specification", () => {
    const compose = ContainerComposeConfig.parse({
      name: "my-app",
      services: {
        web: {
          image: "nginx:latest",
          ports: ["8080:80"],
          environment: {
            NODE_ENV: "production",
          },
        },
        db: {
          image: "postgres:15",
          volumes: ["db-data:/var/lib/postgresql/data"],
        },
      },
      volumes: {
        "db-data": null,
      },
    });

    assert.equal(compose.name, "my-app");
    assert.equal(compose.services?.web.image, "nginx:latest");
  });

  it("should validate compose config via defineContainerCompose helper", () => {
    const compose = defineContainerCompose({
      name: "compose-test",
      services: {
        app: {
          image: "node:20-alpine",
          command: ["node", "server.js"],
        },
      },
    });

    assert.equal(compose.name, "compose-test");
    assert.equal(compose.services?.app.image, "node:20-alpine");
  });

  it("should support fine-grained defineContainer* helpers and top-level composer key aliases", () => {
    const service = defineContainerService({
      image: "redis:alpine",
      ports: ["6379:6379"],
    });
    assert.equal(service.image, "redis:alpine");

    const network = defineContainerNetwork({
      driver: "bridge",
    });
    assert.equal(network?.driver, "bridge");

    const volume = defineContainerVolume({
      driver: "local",
    });
    assert.equal(volume?.driver, "local");

    const cfg = defineContainerConfig({
      file: "./my-config.txt",
    });
    assert.equal(cfg.file, "./my-config.txt");

    const secret = defineContainerSecret({
      file: "./my-secret.txt",
    });
    assert.equal(secret.file, "./my-secret.txt");

    const compose = defineContainerCompose({
      Name: "pascal-app",
      WorkingDir: "/app",
      Services: {
        redis: service,
      },
      Networks: {
        backend: network,
      },
      Volumes: {
        data: volume,
      },
      Configs: {
        app_config: cfg,
      },
      Secrets: {
        db_secret: secret,
      },
    });

    assert.equal(compose.Name, "pascal-app");
    assert.equal(compose.WorkingDir, "/app");
    assert.equal(compose.Services?.redis.image, "redis:alpine");
  });
});

describe("Apple ContainerConfig schema & defineContainerConfiguration", () => {
  it("should validate an Apple ContainerClient configuration", () => {
    const container = ContainerConfig.parse({
      id: "my-container-1",
      image: "alpine:latest",
      initProcess: {
        executable: "/bin/sh",
        arguments: ["-c", "echo hello"],
        workingDirectory: "/",
      },
      resources: {
        cpu: 2,
        memory: "2GB",
      },
      rosetta: true,
    });

    assert.equal(container.id, "my-container-1");
    assert.equal(container.image, "alpine:latest");
    assert.equal(container.initProcess.executable, "/bin/sh");
    assert.equal(container.rosetta, true);
  });

  it("should validate via defineContainerConfiguration helper", () => {
    const cfg = defineContainerConfiguration({
      id: "apple-container-2",
      image: { name: "ubuntu", tag: "22.04" },
      hostname: "ubuntu-host",
    });

    assert.equal(cfg.id, "apple-container-2");
    assert.equal(cfg.hostname, "ubuntu-host");
  });

  it("should validate OCI Runtime Spec config via defineOciConfig", () => {
    const oci = defineOciConfig({
      ociVersion: "1.0.1",
      root: { path: "rootfs", readonly: true },
      process: {
        cwd: "/",
        args: ["sh"],
      },
      hostname: "oci-host",
      linux: {
        namespaces: [{ type: "pid" }, { type: "network" }],
        uidMappings: [{ containerID: 0, hostID: 1000, size: 65536 }],
        devices: [{ type: "c", path: "/dev/fuse", major: 10, minor: 229 }],
      },
    });

    assert.equal(oci.ociVersion, "1.0.1");
    assert.equal(oci.root?.path, "rootfs");
    assert.equal(oci.hostname, "oci-host");
    assert.equal(oci.linux?.namespaces?.[0].type, "pid");
    assert.equal(oci.linux?.devices?.[0].path, "/dev/fuse");
  });
});

describe("Container config section schema", () => {
  it("should default container.execPaths, container.compose.execPaths, and autoImagePull when omitted", () => {
    const parsed = ContainerSectionSchema.parse({});
    assert.ok(Array.isArray(parsed.execPaths) && parsed.execPaths.length > 0);
    assert.ok(
      Array.isArray(parsed.compose?.execPaths) &&
        (parsed.compose?.execPaths.length ?? 0) > 0,
    );
    assert.equal(parsed.compose?.imagePull, "prepull");
    assert.equal(parsed.autoImagePull, true);
  });

  it("should accept custom execPaths, compose.execPaths, and autoImagePull", () => {
    const parsed = ContainerSectionSchema.parse({
      execPaths: ["docker", "podman"],
      compose: { execPaths: ["docker-compose"] },
      autoImagePull: false,
    });
    assert.deepEqual(parsed.execPaths, ["docker", "podman"]);
    assert.deepEqual(parsed.compose?.execPaths, ["docker-compose"]);
    assert.equal(parsed.autoImagePull, false);
  });

  it("should validate upOptions schema defaults and custom properties", () => {
    const defaultUp = UpOptionsSchema.parse({});
    assert.equal(defaultUp.removeOrphans, true);
    assert.equal(defaultUp.detach, true);

    const customUp = UpOptionsSchema.parse({
      RemoveOrphans: false,
      Detach: false,
      AbortOnContainerExit: true,
      Scale: { web: 3 },
    });
    assert.equal(customUp.RemoveOrphans, false);
    assert.equal(customUp.Detach, false);
    assert.equal(customUp.AbortOnContainerExit, true);
    assert.deepEqual(customUp.Scale, { web: 3 });
  });
});

describe("container-which utilities", () => {
  it("should resolve executable using which helper", () => {
    const nodePath = which("node");
    assert.ok(nodePath.endsWith("node"));
    assert.equal(which("nonexistent_binary_xyz"), "nonexistent_binary_xyz");
  });

  it("should find an executable in PATH or fall back to first item", () => {
    // Node executable exists
    assert.equal(isExecutableInPath("node"), true);

    const chosenExec = whichContainer(["nonexistent_exec_12345", "node"]);
    assert.ok(chosenExec.endsWith("node"));

    const fallbackExec = whichContainer(["nonexistent_exec_99999"]);
    assert.equal(fallbackExec, "nonexistent_exec_99999");
  });

  it("should choose compose executable based on custom list or default", () => {
    const chosenCompose = whichContainerCompose([
      "nonexistent_compose_123",
      "node",
    ]);
    assert.ok(chosenCompose.endsWith("node"));
  });
});

describe("container-exec subcommands", () => {
  it("should extract positional image argument from container run args", () => {
    assert.equal(
      extractPositionalImage(["-d", "-p", "80:80", "nginx:alpine"]),
      "nginx:latest" ? "nginx:alpine" : "nginx:alpine",
    );
    assert.equal(
      extractPositionalImage(["--name", "web", "linuxserver/heimdall"]),
      "linuxserver/heimdall",
    );
    assert.equal(extractPositionalImage(["-d"]), undefined);
  });

  it("should execute container command using mock binary", () => {
    if (isExecutableInPath("echo")) {
      const output = containerRun(["my-image"], {
        binary: "echo",
      });
      assert.ok(output.includes("my-image"));
    }
  });

  it("should format arguments correctly for lima, limactl, and colima binaries", () => {
    const resLima = formatContainerArgs("lima", ["run", "nginx"]);
    assert.deepEqual(resLima, {
      binary: "lima",
      args: ["nerdctl", "run", "nginx"],
    });

    const resLimactl = formatContainerArgs("limactl", ["run", "nginx"]);
    assert.deepEqual(resLimactl, {
      binary: "limactl",
      args: ["shell", "default", "nerdctl", "run", "nginx"],
    });

    const resColima = formatContainerArgs("colima", ["run", "nginx"]);
    assert.deepEqual(resColima, {
      binary: "colima",
      args: ["nerdctl", "run", "nginx"],
    });
  });

  it("should execute container compose command using mock binary", () => {
    if (isExecutableInPath("echo")) {
      const output = containerComposeUp(["-d"], {
        binary: "echo",
      });
      assert.ok(output.includes("up"));
    }
  });

  it("should format UpOptions flags for containerComposeUp", () => {
    if (isExecutableInPath("echo")) {
      const output = containerComposeUp([], {
        binary: "echo",
        upOptions: {
          RemoveOrphans: true,
          Detach: true,
          Scale: { web: 2 },
        },
      });
      assert.ok(output.includes("--remove-orphans"));
      assert.ok(output.includes("-d"));
      assert.ok(output.includes("--scale web=2"));
    }
  });

  it("should create client instance via containerCreate", () => {
    if (isExecutableInPath("echo")) {
      const client = containerCreate({ binary: "echo" });
      const runOut = client.run(["test-image"]);
      assert.ok(runOut.includes("test-image"));

      const composeOut = client.composeUp(["-d"]);
      assert.ok(composeOut.includes("up"));

      const aliasClient = containerFactory({ binary: "echo" });
      assert.ok(aliasClient.run(["test-image"]).includes("test-image"));
    }
  });
});
