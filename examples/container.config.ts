import { defineContainerConfiguration } from "../src/config";

export default defineContainerConfiguration({
  id: "example-container",
  image: "alpine:latest",
  initProcess: {
    executable: "/bin/sh",
    arguments: ["-c", "echo Hello from container"],
    workingDirectory: "/",
    terminal: true,
  },
  resources: {
    cpu: 2,
    memory: "1GB",
  },
});
