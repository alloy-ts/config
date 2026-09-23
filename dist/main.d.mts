import * as Schema from "zod";
import { $output, ZodObject } from "zod";
//#region src/models/config/package.d.ts
/** Strongly-typed `definePackageConfig` for authoring a `package.config.ts` file. */
export declare const definePackageConfig: {
  (options: {
    name?: string | undefined;
    version?: string | undefined;
    description?: string | undefined;
    keywords?: string[] | undefined;
    homepage?: string | undefined;
    bugs?: string | {
      url?: string | undefined;
      email?: string | undefined;
    } | undefined;
    license?: string | undefined;
    licenses?: {
      type?: string | undefined;
      url?: string | undefined;
    }[] | undefined;
    author?: string | {
      name: string;
      url?: string | undefined;
      email?: string | undefined;
    } | undefined;
    contributors?: (string | {
      name: string;
      url?: string | undefined;
      email?: string | undefined;
    })[] | undefined;
    maintainers?: (string | {
      name: string;
      url?: string | undefined;
      email?: string | undefined;
    })[] | undefined;
    files?: string[] | undefined;
    main?: string | undefined;
    exports?: unknown;
    imports?: Record<string, unknown> | undefined;
    bin?: string | Record<string, string> | undefined;
    type: "commonjs" | "module";
    types?: string | undefined;
    typings?: string | undefined;
    typesVersions?: Record<string, Record<string, string[]>> | undefined;
    man?: string | string[] | undefined;
    directories?: {
      bin?: string | undefined;
      doc?: string | undefined;
      example?: string | undefined;
      lib?: string | undefined;
      man?: string | undefined;
      test?: string | undefined;
    } | undefined;
    repository?: string | {
      type?: string | undefined;
      url?: string | undefined;
      directory?: string | undefined;
    } | undefined;
    funding?: string | (string | {
      url: string;
      type?: string | undefined;
    })[] | {
      url: string;
      type?: string | undefined;
    } | undefined;
    scripts?: Record<string, string> | undefined;
    config?: Record<string, unknown> | undefined;
    dependencies?: Record<string, string> | undefined;
    devDependencies?: Record<string, string> | undefined;
    optionalDependencies?: Record<string, string> | undefined;
    peerDependencies?: Record<string, string> | undefined;
    peerDependenciesMeta?: Record<string, {
      [x: string]: unknown;
      optional?: boolean | undefined;
    }> | undefined;
    bundleDependencies?: boolean | string[] | undefined;
    bundledDependencies?: boolean | string[] | undefined;
    resolutions?: Record<string, unknown> | undefined;
    overrides?: Record<string, unknown> | undefined;
    packageManager?: string | undefined;
    engines?: {
      [x: string]: string;
      node?: string | undefined;
      runtime?: {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      }[] | {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      } | undefined;
    } | undefined;
    volta?: {
      [x: string]: string;
      extends?: string | undefined;
    } | undefined;
    engineStrict?: boolean | undefined;
    os?: string[] | undefined;
    cpu?: string[] | undefined;
    devEngines?: {
      os?: {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      }[] | {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      } | undefined;
      cpu?: {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      }[] | {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      } | undefined;
      libc?: {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      }[] | {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      } | undefined;
      runtime?: {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      }[] | {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      } | undefined;
      packageManager?: {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      }[] | {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      } | undefined;
    } | undefined;
    preferGlobal?: boolean | undefined;
    private?: "false" | "true" | boolean | undefined;
    publishConfig?: {
      [x: string]: unknown;
      access?: "public" | "restricted" | undefined;
      tag?: string | undefined;
      registry?: string | undefined;
      provenance?: boolean | undefined;
      directory?: string | undefined;
      linkDirectory?: boolean | undefined;
      executableFiles?: string[] | undefined;
    } | undefined;
    dist?: {
      shasum?: string | undefined;
      tarball?: string | undefined;
    } | undefined;
    readme?: string | undefined;
    module?: string | undefined;
    esnext?: string | {
      [x: string]: string;
      main?: string | undefined;
      browser?: string | undefined;
    } | undefined;
    workspaces?: string[] | {
      packages?: string[] | undefined;
      nohoist?: string[] | undefined;
    } | undefined;
    allowScripts?: Record<string, boolean> | undefined;
    sideEffects?: boolean | string[] | undefined;
  }): {
    name?: string | undefined;
    version?: string | undefined;
    description?: string | undefined;
    keywords?: string[] | undefined;
    homepage?: string | undefined;
    bugs?: string | {
      url?: string | undefined;
      email?: string | undefined;
    } | undefined;
    license?: string | undefined;
    licenses?: {
      type?: string | undefined;
      url?: string | undefined;
    }[] | undefined;
    author?: string | {
      name: string;
      url?: string | undefined;
      email?: string | undefined;
    } | undefined;
    contributors?: (string | {
      name: string;
      url?: string | undefined;
      email?: string | undefined;
    })[] | undefined;
    maintainers?: (string | {
      name: string;
      url?: string | undefined;
      email?: string | undefined;
    })[] | undefined;
    files?: string[] | undefined;
    main?: string | undefined;
    exports?: unknown;
    imports?: Record<string, unknown> | undefined;
    bin?: string | Record<string, string> | undefined;
    type: "commonjs" | "module";
    types?: string | undefined;
    typings?: string | undefined;
    typesVersions?: Record<string, Record<string, string[]>> | undefined;
    man?: string | string[] | undefined;
    directories?: {
      bin?: string | undefined;
      doc?: string | undefined;
      example?: string | undefined;
      lib?: string | undefined;
      man?: string | undefined;
      test?: string | undefined;
    } | undefined;
    repository?: string | {
      type?: string | undefined;
      url?: string | undefined;
      directory?: string | undefined;
    } | undefined;
    funding?: string | (string | {
      url: string;
      type?: string | undefined;
    })[] | {
      url: string;
      type?: string | undefined;
    } | undefined;
    scripts?: Record<string, string> | undefined;
    config?: Record<string, unknown> | undefined;
    dependencies?: Record<string, string> | undefined;
    devDependencies?: Record<string, string> | undefined;
    optionalDependencies?: Record<string, string> | undefined;
    peerDependencies?: Record<string, string> | undefined;
    peerDependenciesMeta?: Record<string, {
      [x: string]: unknown;
      optional?: boolean | undefined;
    }> | undefined;
    bundleDependencies?: boolean | string[] | undefined;
    bundledDependencies?: boolean | string[] | undefined;
    resolutions?: Record<string, unknown> | undefined;
    overrides?: Record<string, unknown> | undefined;
    packageManager?: string | undefined;
    engines?: {
      [x: string]: string;
      node?: string | undefined;
      runtime?: {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      }[] | {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      } | undefined;
    } | undefined;
    volta?: {
      [x: string]: string;
      extends?: string | undefined;
    } | undefined;
    engineStrict?: boolean | undefined;
    os?: string[] | undefined;
    cpu?: string[] | undefined;
    devEngines?: {
      os?: {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      }[] | {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      } | undefined;
      cpu?: {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      }[] | {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      } | undefined;
      libc?: {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      }[] | {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      } | undefined;
      runtime?: {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      }[] | {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      } | undefined;
      packageManager?: {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      }[] | {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      } | undefined;
    } | undefined;
    preferGlobal?: boolean | undefined;
    private?: "false" | "true" | boolean | undefined;
    publishConfig?: {
      [x: string]: unknown;
      access?: "public" | "restricted" | undefined;
      tag?: string | undefined;
      registry?: string | undefined;
      provenance?: boolean | undefined;
      directory?: string | undefined;
      linkDirectory?: boolean | undefined;
      executableFiles?: string[] | undefined;
    } | undefined;
    dist?: {
      shasum?: string | undefined;
      tarball?: string | undefined;
    } | undefined;
    readme?: string | undefined;
    module?: string | undefined;
    esnext?: string | {
      [x: string]: string;
      main?: string | undefined;
      browser?: string | undefined;
    } | undefined;
    workspaces?: string[] | {
      packages?: string[] | undefined;
      nohoist?: string[] | undefined;
    } | undefined;
    allowScripts?: Record<string, boolean> | undefined;
    sideEffects?: boolean | string[] | undefined;
  };
  (options: {
    name?: string | undefined;
    version?: string | undefined;
    description?: string | undefined;
    keywords?: string[] | undefined;
    homepage?: string | undefined;
    bugs?: string | {
      url?: string | undefined;
      email?: string | undefined;
    } | undefined;
    license?: string | undefined;
    licenses?: {
      type?: string | undefined;
      url?: string | undefined;
    }[] | undefined;
    author?: string | {
      name: string;
      url?: string | undefined;
      email?: string | undefined;
    } | undefined;
    contributors?: (string | {
      name: string;
      url?: string | undefined;
      email?: string | undefined;
    })[] | undefined;
    maintainers?: (string | {
      name: string;
      url?: string | undefined;
      email?: string | undefined;
    })[] | undefined;
    files?: string[] | undefined;
    main?: string | undefined;
    exports?: unknown;
    imports?: Record<string, unknown> | undefined;
    bin?: string | Record<string, string> | undefined;
    type: "commonjs" | "module";
    types?: string | undefined;
    typings?: string | undefined;
    typesVersions?: Record<string, Record<string, string[]>> | undefined;
    man?: string | string[] | undefined;
    directories?: {
      bin?: string | undefined;
      doc?: string | undefined;
      example?: string | undefined;
      lib?: string | undefined;
      man?: string | undefined;
      test?: string | undefined;
    } | undefined;
    repository?: string | {
      type?: string | undefined;
      url?: string | undefined;
      directory?: string | undefined;
    } | undefined;
    funding?: string | (string | {
      url: string;
      type?: string | undefined;
    })[] | {
      url: string;
      type?: string | undefined;
    } | undefined;
    scripts?: Record<string, string> | undefined;
    config?: Record<string, unknown> | undefined;
    dependencies?: Record<string, string> | undefined;
    devDependencies?: Record<string, string> | undefined;
    optionalDependencies?: Record<string, string> | undefined;
    peerDependencies?: Record<string, string> | undefined;
    peerDependenciesMeta?: Record<string, {
      [x: string]: unknown;
      optional?: boolean | undefined;
    }> | undefined;
    bundleDependencies?: boolean | string[] | undefined;
    bundledDependencies?: boolean | string[] | undefined;
    resolutions?: Record<string, unknown> | undefined;
    overrides?: Record<string, unknown> | undefined;
    packageManager?: string | undefined;
    engines?: {
      [x: string]: string;
      node?: string | undefined;
      runtime?: {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      }[] | {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      } | undefined;
    } | undefined;
    volta?: {
      [x: string]: string;
      extends?: string | undefined;
    } | undefined;
    engineStrict?: boolean | undefined;
    os?: string[] | undefined;
    cpu?: string[] | undefined;
    devEngines?: {
      os?: {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      }[] | {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      } | undefined;
      cpu?: {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      }[] | {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      } | undefined;
      libc?: {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      }[] | {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      } | undefined;
      runtime?: {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      }[] | {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      } | undefined;
      packageManager?: {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      }[] | {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      } | undefined;
    } | undefined;
    preferGlobal?: boolean | undefined;
    private?: "false" | "true" | boolean | undefined;
    publishConfig?: {
      [x: string]: unknown;
      access?: "public" | "restricted" | undefined;
      tag?: string | undefined;
      registry?: string | undefined;
      provenance?: boolean | undefined;
      directory?: string | undefined;
      linkDirectory?: boolean | undefined;
      executableFiles?: string[] | undefined;
    } | undefined;
    dist?: {
      shasum?: string | undefined;
      tarball?: string | undefined;
    } | undefined;
    readme?: string | undefined;
    module?: string | undefined;
    esnext?: string | {
      [x: string]: string;
      main?: string | undefined;
      browser?: string | undefined;
    } | undefined;
    workspaces?: string[] | {
      packages?: string[] | undefined;
      nohoist?: string[] | undefined;
    } | undefined;
    allowScripts?: Record<string, boolean> | undefined;
    sideEffects?: boolean | string[] | undefined;
  }[]): {
    name?: string | undefined;
    version?: string | undefined;
    description?: string | undefined;
    keywords?: string[] | undefined;
    homepage?: string | undefined;
    bugs?: string | {
      url?: string | undefined;
      email?: string | undefined;
    } | undefined;
    license?: string | undefined;
    licenses?: {
      type?: string | undefined;
      url?: string | undefined;
    }[] | undefined;
    author?: string | {
      name: string;
      url?: string | undefined;
      email?: string | undefined;
    } | undefined;
    contributors?: (string | {
      name: string;
      url?: string | undefined;
      email?: string | undefined;
    })[] | undefined;
    maintainers?: (string | {
      name: string;
      url?: string | undefined;
      email?: string | undefined;
    })[] | undefined;
    files?: string[] | undefined;
    main?: string | undefined;
    exports?: unknown;
    imports?: Record<string, unknown> | undefined;
    bin?: string | Record<string, string> | undefined;
    type: "commonjs" | "module";
    types?: string | undefined;
    typings?: string | undefined;
    typesVersions?: Record<string, Record<string, string[]>> | undefined;
    man?: string | string[] | undefined;
    directories?: {
      bin?: string | undefined;
      doc?: string | undefined;
      example?: string | undefined;
      lib?: string | undefined;
      man?: string | undefined;
      test?: string | undefined;
    } | undefined;
    repository?: string | {
      type?: string | undefined;
      url?: string | undefined;
      directory?: string | undefined;
    } | undefined;
    funding?: string | (string | {
      url: string;
      type?: string | undefined;
    })[] | {
      url: string;
      type?: string | undefined;
    } | undefined;
    scripts?: Record<string, string> | undefined;
    config?: Record<string, unknown> | undefined;
    dependencies?: Record<string, string> | undefined;
    devDependencies?: Record<string, string> | undefined;
    optionalDependencies?: Record<string, string> | undefined;
    peerDependencies?: Record<string, string> | undefined;
    peerDependenciesMeta?: Record<string, {
      [x: string]: unknown;
      optional?: boolean | undefined;
    }> | undefined;
    bundleDependencies?: boolean | string[] | undefined;
    bundledDependencies?: boolean | string[] | undefined;
    resolutions?: Record<string, unknown> | undefined;
    overrides?: Record<string, unknown> | undefined;
    packageManager?: string | undefined;
    engines?: {
      [x: string]: string;
      node?: string | undefined;
      runtime?: {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      }[] | {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      } | undefined;
    } | undefined;
    volta?: {
      [x: string]: string;
      extends?: string | undefined;
    } | undefined;
    engineStrict?: boolean | undefined;
    os?: string[] | undefined;
    cpu?: string[] | undefined;
    devEngines?: {
      os?: {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      }[] | {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      } | undefined;
      cpu?: {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      }[] | {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      } | undefined;
      libc?: {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      }[] | {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      } | undefined;
      runtime?: {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      }[] | {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      } | undefined;
      packageManager?: {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      }[] | {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      } | undefined;
    } | undefined;
    preferGlobal?: boolean | undefined;
    private?: "false" | "true" | boolean | undefined;
    publishConfig?: {
      [x: string]: unknown;
      access?: "public" | "restricted" | undefined;
      tag?: string | undefined;
      registry?: string | undefined;
      provenance?: boolean | undefined;
      directory?: string | undefined;
      linkDirectory?: boolean | undefined;
      executableFiles?: string[] | undefined;
    } | undefined;
    dist?: {
      shasum?: string | undefined;
      tarball?: string | undefined;
    } | undefined;
    readme?: string | undefined;
    module?: string | undefined;
    esnext?: string | {
      [x: string]: string;
      main?: string | undefined;
      browser?: string | undefined;
    } | undefined;
    workspaces?: string[] | {
      packages?: string[] | undefined;
      nohoist?: string[] | undefined;
    } | undefined;
    allowScripts?: Record<string, boolean> | undefined;
    sideEffects?: boolean | string[] | undefined;
  }[];
  (options: UserConfigFn<Schema.ZodObject<{
    name: Schema.ZodOptional<Schema.ZodString>;
    version: Schema.ZodOptional<Schema.ZodString>;
    description: Schema.ZodOptional<Schema.ZodString>;
    keywords: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    homepage: Schema.ZodOptional<Schema.ZodString>;
    bugs: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      url: Schema.ZodOptional<Schema.ZodString>;
      email: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>]>>;
    license: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodEnum<{
      "AGPL-3.0-only": "AGPL-3.0-only";
      "Apache-2.0": "Apache-2.0";
      "BSD-2-Clause": "BSD-2-Clause";
      "BSD-3-Clause": "BSD-3-Clause";
      "BSL-1.0": "BSL-1.0";
      "CC0-1.0": "CC0-1.0";
      "CDDL-1.0": "CDDL-1.0";
      "CDDL-1.1": "CDDL-1.1";
      "EPL-1.0": "EPL-1.0";
      "EPL-2.0": "EPL-2.0";
      "GPL-2.0-only": "GPL-2.0-only";
      "GPL-3.0-only": "GPL-3.0-only";
      ISC: "ISC";
      "LGPL-2.0-only": "LGPL-2.0-only";
      "LGPL-2.1-only": "LGPL-2.1-only";
      "LGPL-2.1-or-later": "LGPL-2.1-or-later";
      "LGPL-3.0-only": "LGPL-3.0-only";
      "LGPL-3.0-or-later": "LGPL-3.0-or-later";
      MIT: "MIT";
      "MPL-2.0": "MPL-2.0";
      "MS-PL": "MS-PL";
      UNLICENSED: "UNLICENSED";
    }>]>>;
    licenses: Schema.ZodOptional<Schema.ZodArray<Schema.ZodObject<{
      type: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodEnum<{
        "AGPL-3.0-only": "AGPL-3.0-only";
        "Apache-2.0": "Apache-2.0";
        "BSD-2-Clause": "BSD-2-Clause";
        "BSD-3-Clause": "BSD-3-Clause";
        "BSL-1.0": "BSL-1.0";
        "CC0-1.0": "CC0-1.0";
        "CDDL-1.0": "CDDL-1.0";
        "CDDL-1.1": "CDDL-1.1";
        "EPL-1.0": "EPL-1.0";
        "EPL-2.0": "EPL-2.0";
        "GPL-2.0-only": "GPL-2.0-only";
        "GPL-3.0-only": "GPL-3.0-only";
        ISC: "ISC";
        "LGPL-2.0-only": "LGPL-2.0-only";
        "LGPL-2.1-only": "LGPL-2.1-only";
        "LGPL-2.1-or-later": "LGPL-2.1-or-later";
        "LGPL-3.0-only": "LGPL-3.0-only";
        "LGPL-3.0-or-later": "LGPL-3.0-or-later";
        MIT: "MIT";
        "MPL-2.0": "MPL-2.0";
        "MS-PL": "MS-PL";
        UNLICENSED: "UNLICENSED";
      }>]>>;
      url: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>>>;
    author: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      name: Schema.ZodString;
      url: Schema.ZodOptional<Schema.ZodString>;
      email: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>]>>;
    contributors: Schema.ZodOptional<Schema.ZodArray<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      name: Schema.ZodString;
      url: Schema.ZodOptional<Schema.ZodString>;
      email: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>]>>>;
    maintainers: Schema.ZodOptional<Schema.ZodArray<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      name: Schema.ZodString;
      url: Schema.ZodOptional<Schema.ZodString>;
      email: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>]>>>;
    files: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    main: Schema.ZodOptional<Schema.ZodString>;
    exports: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodNullable<Schema.ZodString>, Schema.ZodRecord<Schema.ZodString, Schema.ZodType<unknown, unknown, Schema.core.$ZodTypeInternals<unknown, unknown>>>, Schema.ZodType<unknown, unknown, Schema.core.$ZodTypeInternals<unknown, unknown>>, Schema.ZodType<unknown, unknown, Schema.core.$ZodTypeInternals<unknown, unknown>>]>>;
    imports: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodType<unknown, unknown, Schema.core.$ZodTypeInternals<unknown, unknown>>>>;
    bin: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodString>]>>;
    type: Schema.ZodDefault<Schema.ZodOptional<Schema.ZodEnum<{
      commonjs: "commonjs";
      module: "module";
    }>>>;
    types: Schema.ZodOptional<Schema.ZodString>;
    typings: Schema.ZodOptional<Schema.ZodString>;
    typesVersions: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodArray<Schema.ZodString>>>>;
    man: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodArray<Schema.ZodString>]>>;
    directories: Schema.ZodOptional<Schema.ZodObject<{
      bin: Schema.ZodOptional<Schema.ZodString>;
      doc: Schema.ZodOptional<Schema.ZodString>;
      example: Schema.ZodOptional<Schema.ZodString>;
      lib: Schema.ZodOptional<Schema.ZodString>;
      man: Schema.ZodOptional<Schema.ZodString>;
      test: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>>;
    repository: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      type: Schema.ZodOptional<Schema.ZodString>;
      url: Schema.ZodOptional<Schema.ZodString>;
      directory: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>]>>;
    funding: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      url: Schema.ZodString;
      type: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      url: Schema.ZodString;
      type: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>]>>]>>;
    scripts: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
    config: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>;
    dependencies: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
    devDependencies: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
    optionalDependencies: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
    peerDependencies: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
    peerDependenciesMeta: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodObject<{
      optional: Schema.ZodOptional<Schema.ZodBoolean>;
    }, Schema.core.$loose>>>;
    bundleDependencies: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodArray<Schema.ZodString>, Schema.ZodBoolean]>>;
    bundledDependencies: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodArray<Schema.ZodString>, Schema.ZodBoolean]>>;
    resolutions: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>;
    overrides: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>;
    packageManager: Schema.ZodOptional<Schema.ZodString>;
    engines: Schema.ZodOptional<Schema.ZodObject<{
      node: Schema.ZodOptional<Schema.ZodString>;
      runtime: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>>]>>;
    }, Schema.core.$catchall<Schema.ZodString>>>;
    volta: Schema.ZodOptional<Schema.ZodObject<{
      extends: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$catchall<Schema.ZodString>>>;
    engineStrict: Schema.ZodOptional<Schema.ZodBoolean>;
    os: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    cpu: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    devEngines: Schema.ZodOptional<Schema.ZodObject<{
      os: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>>]>>;
      cpu: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>>]>>;
      libc: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>>]>>;
      runtime: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>>]>>;
      packageManager: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>>]>>;
    }, Schema.core.$strip>>;
    preferGlobal: Schema.ZodOptional<Schema.ZodBoolean>;
    private: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodEnum<{
      false: "false";
      true: "true";
    }>]>>;
    publishConfig: Schema.ZodOptional<Schema.ZodObject<{
      access: Schema.ZodOptional<Schema.ZodEnum<{
        public: "public";
        restricted: "restricted";
      }>>;
      tag: Schema.ZodOptional<Schema.ZodString>;
      registry: Schema.ZodOptional<Schema.ZodString>;
      provenance: Schema.ZodOptional<Schema.ZodBoolean>;
      directory: Schema.ZodOptional<Schema.ZodString>;
      linkDirectory: Schema.ZodOptional<Schema.ZodBoolean>;
      executableFiles: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$loose>>;
    dist: Schema.ZodOptional<Schema.ZodObject<{
      shasum: Schema.ZodOptional<Schema.ZodString>;
      tarball: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>>;
    readme: Schema.ZodOptional<Schema.ZodString>;
    module: Schema.ZodOptional<Schema.ZodString>;
    esnext: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      main: Schema.ZodOptional<Schema.ZodString>;
      browser: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$catchall<Schema.ZodString>>]>>;
    workspaces: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodArray<Schema.ZodString>, Schema.ZodObject<{
      packages: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      nohoist: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>]>>;
    allowScripts: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodBoolean>>;
    sideEffects: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
  }, Schema.core.$strip>>): UserConfigFn<Schema.ZodObject<{
    name: Schema.ZodOptional<Schema.ZodString>;
    version: Schema.ZodOptional<Schema.ZodString>;
    description: Schema.ZodOptional<Schema.ZodString>;
    keywords: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    homepage: Schema.ZodOptional<Schema.ZodString>;
    bugs: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      url: Schema.ZodOptional<Schema.ZodString>;
      email: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>]>>;
    license: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodEnum<{
      "AGPL-3.0-only": "AGPL-3.0-only";
      "Apache-2.0": "Apache-2.0";
      "BSD-2-Clause": "BSD-2-Clause";
      "BSD-3-Clause": "BSD-3-Clause";
      "BSL-1.0": "BSL-1.0";
      "CC0-1.0": "CC0-1.0";
      "CDDL-1.0": "CDDL-1.0";
      "CDDL-1.1": "CDDL-1.1";
      "EPL-1.0": "EPL-1.0";
      "EPL-2.0": "EPL-2.0";
      "GPL-2.0-only": "GPL-2.0-only";
      "GPL-3.0-only": "GPL-3.0-only";
      ISC: "ISC";
      "LGPL-2.0-only": "LGPL-2.0-only";
      "LGPL-2.1-only": "LGPL-2.1-only";
      "LGPL-2.1-or-later": "LGPL-2.1-or-later";
      "LGPL-3.0-only": "LGPL-3.0-only";
      "LGPL-3.0-or-later": "LGPL-3.0-or-later";
      MIT: "MIT";
      "MPL-2.0": "MPL-2.0";
      "MS-PL": "MS-PL";
      UNLICENSED: "UNLICENSED";
    }>]>>;
    licenses: Schema.ZodOptional<Schema.ZodArray<Schema.ZodObject<{
      type: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodEnum<{
        "AGPL-3.0-only": "AGPL-3.0-only";
        "Apache-2.0": "Apache-2.0";
        "BSD-2-Clause": "BSD-2-Clause";
        "BSD-3-Clause": "BSD-3-Clause";
        "BSL-1.0": "BSL-1.0";
        "CC0-1.0": "CC0-1.0";
        "CDDL-1.0": "CDDL-1.0";
        "CDDL-1.1": "CDDL-1.1";
        "EPL-1.0": "EPL-1.0";
        "EPL-2.0": "EPL-2.0";
        "GPL-2.0-only": "GPL-2.0-only";
        "GPL-3.0-only": "GPL-3.0-only";
        ISC: "ISC";
        "LGPL-2.0-only": "LGPL-2.0-only";
        "LGPL-2.1-only": "LGPL-2.1-only";
        "LGPL-2.1-or-later": "LGPL-2.1-or-later";
        "LGPL-3.0-only": "LGPL-3.0-only";
        "LGPL-3.0-or-later": "LGPL-3.0-or-later";
        MIT: "MIT";
        "MPL-2.0": "MPL-2.0";
        "MS-PL": "MS-PL";
        UNLICENSED: "UNLICENSED";
      }>]>>;
      url: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>>>;
    author: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      name: Schema.ZodString;
      url: Schema.ZodOptional<Schema.ZodString>;
      email: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>]>>;
    contributors: Schema.ZodOptional<Schema.ZodArray<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      name: Schema.ZodString;
      url: Schema.ZodOptional<Schema.ZodString>;
      email: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>]>>>;
    maintainers: Schema.ZodOptional<Schema.ZodArray<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      name: Schema.ZodString;
      url: Schema.ZodOptional<Schema.ZodString>;
      email: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>]>>>;
    files: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    main: Schema.ZodOptional<Schema.ZodString>;
    exports: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodNullable<Schema.ZodString>, Schema.ZodRecord<Schema.ZodString, Schema.ZodType<unknown, unknown, Schema.core.$ZodTypeInternals<unknown, unknown>>>, Schema.ZodType<unknown, unknown, Schema.core.$ZodTypeInternals<unknown, unknown>>, Schema.ZodType<unknown, unknown, Schema.core.$ZodTypeInternals<unknown, unknown>>]>>;
    imports: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodType<unknown, unknown, Schema.core.$ZodTypeInternals<unknown, unknown>>>>;
    bin: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodString>]>>;
    type: Schema.ZodDefault<Schema.ZodOptional<Schema.ZodEnum<{
      commonjs: "commonjs";
      module: "module";
    }>>>;
    types: Schema.ZodOptional<Schema.ZodString>;
    typings: Schema.ZodOptional<Schema.ZodString>;
    typesVersions: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodArray<Schema.ZodString>>>>;
    man: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodArray<Schema.ZodString>]>>;
    directories: Schema.ZodOptional<Schema.ZodObject<{
      bin: Schema.ZodOptional<Schema.ZodString>;
      doc: Schema.ZodOptional<Schema.ZodString>;
      example: Schema.ZodOptional<Schema.ZodString>;
      lib: Schema.ZodOptional<Schema.ZodString>;
      man: Schema.ZodOptional<Schema.ZodString>;
      test: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>>;
    repository: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      type: Schema.ZodOptional<Schema.ZodString>;
      url: Schema.ZodOptional<Schema.ZodString>;
      directory: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>]>>;
    funding: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      url: Schema.ZodString;
      type: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      url: Schema.ZodString;
      type: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>]>>]>>;
    scripts: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
    config: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>;
    dependencies: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
    devDependencies: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
    optionalDependencies: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
    peerDependencies: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
    peerDependenciesMeta: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodObject<{
      optional: Schema.ZodOptional<Schema.ZodBoolean>;
    }, Schema.core.$loose>>>;
    bundleDependencies: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodArray<Schema.ZodString>, Schema.ZodBoolean]>>;
    bundledDependencies: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodArray<Schema.ZodString>, Schema.ZodBoolean]>>;
    resolutions: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>;
    overrides: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>;
    packageManager: Schema.ZodOptional<Schema.ZodString>;
    engines: Schema.ZodOptional<Schema.ZodObject<{
      node: Schema.ZodOptional<Schema.ZodString>;
      runtime: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>>]>>;
    }, Schema.core.$catchall<Schema.ZodString>>>;
    volta: Schema.ZodOptional<Schema.ZodObject<{
      extends: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$catchall<Schema.ZodString>>>;
    engineStrict: Schema.ZodOptional<Schema.ZodBoolean>;
    os: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    cpu: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    devEngines: Schema.ZodOptional<Schema.ZodObject<{
      os: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>>]>>;
      cpu: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>>]>>;
      libc: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>>]>>;
      runtime: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>>]>>;
      packageManager: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>>]>>;
    }, Schema.core.$strip>>;
    preferGlobal: Schema.ZodOptional<Schema.ZodBoolean>;
    private: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodEnum<{
      false: "false";
      true: "true";
    }>]>>;
    publishConfig: Schema.ZodOptional<Schema.ZodObject<{
      access: Schema.ZodOptional<Schema.ZodEnum<{
        public: "public";
        restricted: "restricted";
      }>>;
      tag: Schema.ZodOptional<Schema.ZodString>;
      registry: Schema.ZodOptional<Schema.ZodString>;
      provenance: Schema.ZodOptional<Schema.ZodBoolean>;
      directory: Schema.ZodOptional<Schema.ZodString>;
      linkDirectory: Schema.ZodOptional<Schema.ZodBoolean>;
      executableFiles: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$loose>>;
    dist: Schema.ZodOptional<Schema.ZodObject<{
      shasum: Schema.ZodOptional<Schema.ZodString>;
      tarball: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>>;
    readme: Schema.ZodOptional<Schema.ZodString>;
    module: Schema.ZodOptional<Schema.ZodString>;
    esnext: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      main: Schema.ZodOptional<Schema.ZodString>;
      browser: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$catchall<Schema.ZodString>>]>>;
    workspaces: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodArray<Schema.ZodString>, Schema.ZodObject<{
      packages: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      nohoist: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>]>>;
    allowScripts: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodBoolean>>;
    sideEffects: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
  }, Schema.core.$strip>>;
  (options: UserConfigExport<Schema.ZodObject<{
    name: Schema.ZodOptional<Schema.ZodString>;
    version: Schema.ZodOptional<Schema.ZodString>;
    description: Schema.ZodOptional<Schema.ZodString>;
    keywords: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    homepage: Schema.ZodOptional<Schema.ZodString>;
    bugs: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      url: Schema.ZodOptional<Schema.ZodString>;
      email: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>]>>;
    license: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodEnum<{
      "AGPL-3.0-only": "AGPL-3.0-only";
      "Apache-2.0": "Apache-2.0";
      "BSD-2-Clause": "BSD-2-Clause";
      "BSD-3-Clause": "BSD-3-Clause";
      "BSL-1.0": "BSL-1.0";
      "CC0-1.0": "CC0-1.0";
      "CDDL-1.0": "CDDL-1.0";
      "CDDL-1.1": "CDDL-1.1";
      "EPL-1.0": "EPL-1.0";
      "EPL-2.0": "EPL-2.0";
      "GPL-2.0-only": "GPL-2.0-only";
      "GPL-3.0-only": "GPL-3.0-only";
      ISC: "ISC";
      "LGPL-2.0-only": "LGPL-2.0-only";
      "LGPL-2.1-only": "LGPL-2.1-only";
      "LGPL-2.1-or-later": "LGPL-2.1-or-later";
      "LGPL-3.0-only": "LGPL-3.0-only";
      "LGPL-3.0-or-later": "LGPL-3.0-or-later";
      MIT: "MIT";
      "MPL-2.0": "MPL-2.0";
      "MS-PL": "MS-PL";
      UNLICENSED: "UNLICENSED";
    }>]>>;
    licenses: Schema.ZodOptional<Schema.ZodArray<Schema.ZodObject<{
      type: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodEnum<{
        "AGPL-3.0-only": "AGPL-3.0-only";
        "Apache-2.0": "Apache-2.0";
        "BSD-2-Clause": "BSD-2-Clause";
        "BSD-3-Clause": "BSD-3-Clause";
        "BSL-1.0": "BSL-1.0";
        "CC0-1.0": "CC0-1.0";
        "CDDL-1.0": "CDDL-1.0";
        "CDDL-1.1": "CDDL-1.1";
        "EPL-1.0": "EPL-1.0";
        "EPL-2.0": "EPL-2.0";
        "GPL-2.0-only": "GPL-2.0-only";
        "GPL-3.0-only": "GPL-3.0-only";
        ISC: "ISC";
        "LGPL-2.0-only": "LGPL-2.0-only";
        "LGPL-2.1-only": "LGPL-2.1-only";
        "LGPL-2.1-or-later": "LGPL-2.1-or-later";
        "LGPL-3.0-only": "LGPL-3.0-only";
        "LGPL-3.0-or-later": "LGPL-3.0-or-later";
        MIT: "MIT";
        "MPL-2.0": "MPL-2.0";
        "MS-PL": "MS-PL";
        UNLICENSED: "UNLICENSED";
      }>]>>;
      url: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>>>;
    author: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      name: Schema.ZodString;
      url: Schema.ZodOptional<Schema.ZodString>;
      email: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>]>>;
    contributors: Schema.ZodOptional<Schema.ZodArray<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      name: Schema.ZodString;
      url: Schema.ZodOptional<Schema.ZodString>;
      email: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>]>>>;
    maintainers: Schema.ZodOptional<Schema.ZodArray<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      name: Schema.ZodString;
      url: Schema.ZodOptional<Schema.ZodString>;
      email: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>]>>>;
    files: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    main: Schema.ZodOptional<Schema.ZodString>;
    exports: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodNullable<Schema.ZodString>, Schema.ZodRecord<Schema.ZodString, Schema.ZodType<unknown, unknown, Schema.core.$ZodTypeInternals<unknown, unknown>>>, Schema.ZodType<unknown, unknown, Schema.core.$ZodTypeInternals<unknown, unknown>>, Schema.ZodType<unknown, unknown, Schema.core.$ZodTypeInternals<unknown, unknown>>]>>;
    imports: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodType<unknown, unknown, Schema.core.$ZodTypeInternals<unknown, unknown>>>>;
    bin: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodString>]>>;
    type: Schema.ZodDefault<Schema.ZodOptional<Schema.ZodEnum<{
      commonjs: "commonjs";
      module: "module";
    }>>>;
    types: Schema.ZodOptional<Schema.ZodString>;
    typings: Schema.ZodOptional<Schema.ZodString>;
    typesVersions: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodArray<Schema.ZodString>>>>;
    man: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodArray<Schema.ZodString>]>>;
    directories: Schema.ZodOptional<Schema.ZodObject<{
      bin: Schema.ZodOptional<Schema.ZodString>;
      doc: Schema.ZodOptional<Schema.ZodString>;
      example: Schema.ZodOptional<Schema.ZodString>;
      lib: Schema.ZodOptional<Schema.ZodString>;
      man: Schema.ZodOptional<Schema.ZodString>;
      test: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>>;
    repository: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      type: Schema.ZodOptional<Schema.ZodString>;
      url: Schema.ZodOptional<Schema.ZodString>;
      directory: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>]>>;
    funding: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      url: Schema.ZodString;
      type: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      url: Schema.ZodString;
      type: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>]>>]>>;
    scripts: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
    config: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>;
    dependencies: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
    devDependencies: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
    optionalDependencies: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
    peerDependencies: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
    peerDependenciesMeta: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodObject<{
      optional: Schema.ZodOptional<Schema.ZodBoolean>;
    }, Schema.core.$loose>>>;
    bundleDependencies: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodArray<Schema.ZodString>, Schema.ZodBoolean]>>;
    bundledDependencies: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodArray<Schema.ZodString>, Schema.ZodBoolean]>>;
    resolutions: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>;
    overrides: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>;
    packageManager: Schema.ZodOptional<Schema.ZodString>;
    engines: Schema.ZodOptional<Schema.ZodObject<{
      node: Schema.ZodOptional<Schema.ZodString>;
      runtime: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>>]>>;
    }, Schema.core.$catchall<Schema.ZodString>>>;
    volta: Schema.ZodOptional<Schema.ZodObject<{
      extends: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$catchall<Schema.ZodString>>>;
    engineStrict: Schema.ZodOptional<Schema.ZodBoolean>;
    os: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    cpu: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    devEngines: Schema.ZodOptional<Schema.ZodObject<{
      os: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>>]>>;
      cpu: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>>]>>;
      libc: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>>]>>;
      runtime: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>>]>>;
      packageManager: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>>]>>;
    }, Schema.core.$strip>>;
    preferGlobal: Schema.ZodOptional<Schema.ZodBoolean>;
    private: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodEnum<{
      false: "false";
      true: "true";
    }>]>>;
    publishConfig: Schema.ZodOptional<Schema.ZodObject<{
      access: Schema.ZodOptional<Schema.ZodEnum<{
        public: "public";
        restricted: "restricted";
      }>>;
      tag: Schema.ZodOptional<Schema.ZodString>;
      registry: Schema.ZodOptional<Schema.ZodString>;
      provenance: Schema.ZodOptional<Schema.ZodBoolean>;
      directory: Schema.ZodOptional<Schema.ZodString>;
      linkDirectory: Schema.ZodOptional<Schema.ZodBoolean>;
      executableFiles: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$loose>>;
    dist: Schema.ZodOptional<Schema.ZodObject<{
      shasum: Schema.ZodOptional<Schema.ZodString>;
      tarball: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>>;
    readme: Schema.ZodOptional<Schema.ZodString>;
    module: Schema.ZodOptional<Schema.ZodString>;
    esnext: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      main: Schema.ZodOptional<Schema.ZodString>;
      browser: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$catchall<Schema.ZodString>>]>>;
    workspaces: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodArray<Schema.ZodString>, Schema.ZodObject<{
      packages: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      nohoist: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>]>>;
    allowScripts: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodBoolean>>;
    sideEffects: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
  }, Schema.core.$strip>>): UserConfigExport<Schema.ZodObject<{
    name: Schema.ZodOptional<Schema.ZodString>;
    version: Schema.ZodOptional<Schema.ZodString>;
    description: Schema.ZodOptional<Schema.ZodString>;
    keywords: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    homepage: Schema.ZodOptional<Schema.ZodString>;
    bugs: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      url: Schema.ZodOptional<Schema.ZodString>;
      email: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>]>>;
    license: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodEnum<{
      "AGPL-3.0-only": "AGPL-3.0-only";
      "Apache-2.0": "Apache-2.0";
      "BSD-2-Clause": "BSD-2-Clause";
      "BSD-3-Clause": "BSD-3-Clause";
      "BSL-1.0": "BSL-1.0";
      "CC0-1.0": "CC0-1.0";
      "CDDL-1.0": "CDDL-1.0";
      "CDDL-1.1": "CDDL-1.1";
      "EPL-1.0": "EPL-1.0";
      "EPL-2.0": "EPL-2.0";
      "GPL-2.0-only": "GPL-2.0-only";
      "GPL-3.0-only": "GPL-3.0-only";
      ISC: "ISC";
      "LGPL-2.0-only": "LGPL-2.0-only";
      "LGPL-2.1-only": "LGPL-2.1-only";
      "LGPL-2.1-or-later": "LGPL-2.1-or-later";
      "LGPL-3.0-only": "LGPL-3.0-only";
      "LGPL-3.0-or-later": "LGPL-3.0-or-later";
      MIT: "MIT";
      "MPL-2.0": "MPL-2.0";
      "MS-PL": "MS-PL";
      UNLICENSED: "UNLICENSED";
    }>]>>;
    licenses: Schema.ZodOptional<Schema.ZodArray<Schema.ZodObject<{
      type: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodEnum<{
        "AGPL-3.0-only": "AGPL-3.0-only";
        "Apache-2.0": "Apache-2.0";
        "BSD-2-Clause": "BSD-2-Clause";
        "BSD-3-Clause": "BSD-3-Clause";
        "BSL-1.0": "BSL-1.0";
        "CC0-1.0": "CC0-1.0";
        "CDDL-1.0": "CDDL-1.0";
        "CDDL-1.1": "CDDL-1.1";
        "EPL-1.0": "EPL-1.0";
        "EPL-2.0": "EPL-2.0";
        "GPL-2.0-only": "GPL-2.0-only";
        "GPL-3.0-only": "GPL-3.0-only";
        ISC: "ISC";
        "LGPL-2.0-only": "LGPL-2.0-only";
        "LGPL-2.1-only": "LGPL-2.1-only";
        "LGPL-2.1-or-later": "LGPL-2.1-or-later";
        "LGPL-3.0-only": "LGPL-3.0-only";
        "LGPL-3.0-or-later": "LGPL-3.0-or-later";
        MIT: "MIT";
        "MPL-2.0": "MPL-2.0";
        "MS-PL": "MS-PL";
        UNLICENSED: "UNLICENSED";
      }>]>>;
      url: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>>>;
    author: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      name: Schema.ZodString;
      url: Schema.ZodOptional<Schema.ZodString>;
      email: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>]>>;
    contributors: Schema.ZodOptional<Schema.ZodArray<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      name: Schema.ZodString;
      url: Schema.ZodOptional<Schema.ZodString>;
      email: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>]>>>;
    maintainers: Schema.ZodOptional<Schema.ZodArray<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      name: Schema.ZodString;
      url: Schema.ZodOptional<Schema.ZodString>;
      email: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>]>>>;
    files: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    main: Schema.ZodOptional<Schema.ZodString>;
    exports: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodNullable<Schema.ZodString>, Schema.ZodRecord<Schema.ZodString, Schema.ZodType<unknown, unknown, Schema.core.$ZodTypeInternals<unknown, unknown>>>, Schema.ZodType<unknown, unknown, Schema.core.$ZodTypeInternals<unknown, unknown>>, Schema.ZodType<unknown, unknown, Schema.core.$ZodTypeInternals<unknown, unknown>>]>>;
    imports: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodType<unknown, unknown, Schema.core.$ZodTypeInternals<unknown, unknown>>>>;
    bin: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodString>]>>;
    type: Schema.ZodDefault<Schema.ZodOptional<Schema.ZodEnum<{
      commonjs: "commonjs";
      module: "module";
    }>>>;
    types: Schema.ZodOptional<Schema.ZodString>;
    typings: Schema.ZodOptional<Schema.ZodString>;
    typesVersions: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodArray<Schema.ZodString>>>>;
    man: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodArray<Schema.ZodString>]>>;
    directories: Schema.ZodOptional<Schema.ZodObject<{
      bin: Schema.ZodOptional<Schema.ZodString>;
      doc: Schema.ZodOptional<Schema.ZodString>;
      example: Schema.ZodOptional<Schema.ZodString>;
      lib: Schema.ZodOptional<Schema.ZodString>;
      man: Schema.ZodOptional<Schema.ZodString>;
      test: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>>;
    repository: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      type: Schema.ZodOptional<Schema.ZodString>;
      url: Schema.ZodOptional<Schema.ZodString>;
      directory: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>]>>;
    funding: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      url: Schema.ZodString;
      type: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      url: Schema.ZodString;
      type: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>]>>]>>;
    scripts: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
    config: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>;
    dependencies: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
    devDependencies: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
    optionalDependencies: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
    peerDependencies: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
    peerDependenciesMeta: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodObject<{
      optional: Schema.ZodOptional<Schema.ZodBoolean>;
    }, Schema.core.$loose>>>;
    bundleDependencies: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodArray<Schema.ZodString>, Schema.ZodBoolean]>>;
    bundledDependencies: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodArray<Schema.ZodString>, Schema.ZodBoolean]>>;
    resolutions: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>;
    overrides: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>;
    packageManager: Schema.ZodOptional<Schema.ZodString>;
    engines: Schema.ZodOptional<Schema.ZodObject<{
      node: Schema.ZodOptional<Schema.ZodString>;
      runtime: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>>]>>;
    }, Schema.core.$catchall<Schema.ZodString>>>;
    volta: Schema.ZodOptional<Schema.ZodObject<{
      extends: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$catchall<Schema.ZodString>>>;
    engineStrict: Schema.ZodOptional<Schema.ZodBoolean>;
    os: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    cpu: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    devEngines: Schema.ZodOptional<Schema.ZodObject<{
      os: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>>]>>;
      cpu: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>>]>>;
      libc: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>>]>>;
      runtime: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>>]>>;
      packageManager: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>>]>>;
    }, Schema.core.$strip>>;
    preferGlobal: Schema.ZodOptional<Schema.ZodBoolean>;
    private: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodEnum<{
      false: "false";
      true: "true";
    }>]>>;
    publishConfig: Schema.ZodOptional<Schema.ZodObject<{
      access: Schema.ZodOptional<Schema.ZodEnum<{
        public: "public";
        restricted: "restricted";
      }>>;
      tag: Schema.ZodOptional<Schema.ZodString>;
      registry: Schema.ZodOptional<Schema.ZodString>;
      provenance: Schema.ZodOptional<Schema.ZodBoolean>;
      directory: Schema.ZodOptional<Schema.ZodString>;
      linkDirectory: Schema.ZodOptional<Schema.ZodBoolean>;
      executableFiles: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$loose>>;
    dist: Schema.ZodOptional<Schema.ZodObject<{
      shasum: Schema.ZodOptional<Schema.ZodString>;
      tarball: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>>;
    readme: Schema.ZodOptional<Schema.ZodString>;
    module: Schema.ZodOptional<Schema.ZodString>;
    esnext: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      main: Schema.ZodOptional<Schema.ZodString>;
      browser: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$catchall<Schema.ZodString>>]>>;
    workspaces: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodArray<Schema.ZodString>, Schema.ZodObject<{
      packages: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      nohoist: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>]>>;
    allowScripts: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodBoolean>>;
    sideEffects: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
  }, Schema.core.$strip>>;
};
//#endregion
//#region src/models/config/tsconfig.d.ts
/** Strongly-typed `defineTypeScriptConfig` for authoring tsconfig files. */
export declare const defineTypeScriptConfig: {
  (options: {
    compilerOptions?: Record<string, unknown> | undefined;
    compileOnSave?: boolean | null | undefined;
    typeAcquisition?: {
      enable?: boolean | null | undefined;
      include?: string[] | null | undefined;
      exclude?: string[] | null | undefined;
    } | null | undefined;
    extends?: string | string[] | undefined;
    watchOptions?: {
      force?: string | null | undefined;
      watchFile?: string | null | undefined;
      watchDirectory?: string | null | undefined;
      fallbackPolling?: string | null | undefined;
      synchronousWatchDirectory?: boolean | null | undefined;
      excludeFiles?: string[] | null | undefined;
      excludeDirectories?: string[] | null | undefined;
    } | null | undefined;
    buildOptions?: {
      dry?: boolean | null | undefined;
      force?: boolean | null | undefined;
      verbose?: boolean | null | undefined;
      incremental?: boolean | null | undefined;
      assumeChangesOnlyAffectDirectDependencies?: boolean | null | undefined;
      traceResolution?: boolean | null | undefined;
    } | undefined;
    "ts-node"?: Record<string, unknown> | null | undefined;
    files?: string[] | null | undefined;
    exclude?: string[] | null | undefined;
    include?: string[] | null | undefined;
    references?: {
      path: string;
    }[] | undefined;
  }): {
    compilerOptions?: Record<string, unknown> | undefined;
    compileOnSave?: boolean | null | undefined;
    typeAcquisition?: {
      enable?: boolean | null | undefined;
      include?: string[] | null | undefined;
      exclude?: string[] | null | undefined;
    } | null | undefined;
    extends?: string | string[] | undefined;
    watchOptions?: {
      force?: string | null | undefined;
      watchFile?: string | null | undefined;
      watchDirectory?: string | null | undefined;
      fallbackPolling?: string | null | undefined;
      synchronousWatchDirectory?: boolean | null | undefined;
      excludeFiles?: string[] | null | undefined;
      excludeDirectories?: string[] | null | undefined;
    } | null | undefined;
    buildOptions?: {
      dry?: boolean | null | undefined;
      force?: boolean | null | undefined;
      verbose?: boolean | null | undefined;
      incremental?: boolean | null | undefined;
      assumeChangesOnlyAffectDirectDependencies?: boolean | null | undefined;
      traceResolution?: boolean | null | undefined;
    } | undefined;
    "ts-node"?: Record<string, unknown> | null | undefined;
    files?: string[] | null | undefined;
    exclude?: string[] | null | undefined;
    include?: string[] | null | undefined;
    references?: {
      path: string;
    }[] | undefined;
  };
  (options: {
    compilerOptions?: Record<string, unknown> | undefined;
    compileOnSave?: boolean | null | undefined;
    typeAcquisition?: {
      enable?: boolean | null | undefined;
      include?: string[] | null | undefined;
      exclude?: string[] | null | undefined;
    } | null | undefined;
    extends?: string | string[] | undefined;
    watchOptions?: {
      force?: string | null | undefined;
      watchFile?: string | null | undefined;
      watchDirectory?: string | null | undefined;
      fallbackPolling?: string | null | undefined;
      synchronousWatchDirectory?: boolean | null | undefined;
      excludeFiles?: string[] | null | undefined;
      excludeDirectories?: string[] | null | undefined;
    } | null | undefined;
    buildOptions?: {
      dry?: boolean | null | undefined;
      force?: boolean | null | undefined;
      verbose?: boolean | null | undefined;
      incremental?: boolean | null | undefined;
      assumeChangesOnlyAffectDirectDependencies?: boolean | null | undefined;
      traceResolution?: boolean | null | undefined;
    } | undefined;
    "ts-node"?: Record<string, unknown> | null | undefined;
    files?: string[] | null | undefined;
    exclude?: string[] | null | undefined;
    include?: string[] | null | undefined;
    references?: {
      path: string;
    }[] | undefined;
  }[]): {
    compilerOptions?: Record<string, unknown> | undefined;
    compileOnSave?: boolean | null | undefined;
    typeAcquisition?: {
      enable?: boolean | null | undefined;
      include?: string[] | null | undefined;
      exclude?: string[] | null | undefined;
    } | null | undefined;
    extends?: string | string[] | undefined;
    watchOptions?: {
      force?: string | null | undefined;
      watchFile?: string | null | undefined;
      watchDirectory?: string | null | undefined;
      fallbackPolling?: string | null | undefined;
      synchronousWatchDirectory?: boolean | null | undefined;
      excludeFiles?: string[] | null | undefined;
      excludeDirectories?: string[] | null | undefined;
    } | null | undefined;
    buildOptions?: {
      dry?: boolean | null | undefined;
      force?: boolean | null | undefined;
      verbose?: boolean | null | undefined;
      incremental?: boolean | null | undefined;
      assumeChangesOnlyAffectDirectDependencies?: boolean | null | undefined;
      traceResolution?: boolean | null | undefined;
    } | undefined;
    "ts-node"?: Record<string, unknown> | null | undefined;
    files?: string[] | null | undefined;
    exclude?: string[] | null | undefined;
    include?: string[] | null | undefined;
    references?: {
      path: string;
    }[] | undefined;
  }[];
  (options: UserConfigFn<Schema.ZodObject<{
    compilerOptions: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>;
    compileOnSave: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
    typeAcquisition: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodObject<{
      enable: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      include: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
      exclude: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
    }, Schema.core.$strip>>>;
    extends: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodArray<Schema.ZodString>]>>;
    watchOptions: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodObject<{
      force: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      watchFile: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      watchDirectory: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      fallbackPolling: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      synchronousWatchDirectory: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      excludeFiles: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
      excludeDirectories: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
    }, Schema.core.$strip>>>;
    buildOptions: Schema.ZodOptional<Schema.ZodObject<{
      dry: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      force: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      verbose: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      incremental: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      assumeChangesOnlyAffectDirectDependencies: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      traceResolution: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
    }, Schema.core.$strip>>;
    "ts-node": Schema.ZodOptional<Schema.ZodNullable<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>>;
    files: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
    exclude: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
    include: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
    references: Schema.ZodOptional<Schema.ZodArray<Schema.ZodObject<{
      path: Schema.ZodString;
    }, Schema.core.$strip>>>;
  }, Schema.core.$strip>>): UserConfigFn<Schema.ZodObject<{
    compilerOptions: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>;
    compileOnSave: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
    typeAcquisition: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodObject<{
      enable: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      include: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
      exclude: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
    }, Schema.core.$strip>>>;
    extends: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodArray<Schema.ZodString>]>>;
    watchOptions: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodObject<{
      force: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      watchFile: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      watchDirectory: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      fallbackPolling: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      synchronousWatchDirectory: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      excludeFiles: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
      excludeDirectories: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
    }, Schema.core.$strip>>>;
    buildOptions: Schema.ZodOptional<Schema.ZodObject<{
      dry: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      force: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      verbose: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      incremental: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      assumeChangesOnlyAffectDirectDependencies: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      traceResolution: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
    }, Schema.core.$strip>>;
    "ts-node": Schema.ZodOptional<Schema.ZodNullable<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>>;
    files: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
    exclude: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
    include: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
    references: Schema.ZodOptional<Schema.ZodArray<Schema.ZodObject<{
      path: Schema.ZodString;
    }, Schema.core.$strip>>>;
  }, Schema.core.$strip>>;
  (options: UserConfigExport<Schema.ZodObject<{
    compilerOptions: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>;
    compileOnSave: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
    typeAcquisition: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodObject<{
      enable: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      include: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
      exclude: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
    }, Schema.core.$strip>>>;
    extends: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodArray<Schema.ZodString>]>>;
    watchOptions: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodObject<{
      force: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      watchFile: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      watchDirectory: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      fallbackPolling: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      synchronousWatchDirectory: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      excludeFiles: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
      excludeDirectories: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
    }, Schema.core.$strip>>>;
    buildOptions: Schema.ZodOptional<Schema.ZodObject<{
      dry: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      force: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      verbose: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      incremental: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      assumeChangesOnlyAffectDirectDependencies: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      traceResolution: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
    }, Schema.core.$strip>>;
    "ts-node": Schema.ZodOptional<Schema.ZodNullable<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>>;
    files: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
    exclude: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
    include: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
    references: Schema.ZodOptional<Schema.ZodArray<Schema.ZodObject<{
      path: Schema.ZodString;
    }, Schema.core.$strip>>>;
  }, Schema.core.$strip>>): UserConfigExport<Schema.ZodObject<{
    compilerOptions: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>;
    compileOnSave: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
    typeAcquisition: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodObject<{
      enable: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      include: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
      exclude: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
    }, Schema.core.$strip>>>;
    extends: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodArray<Schema.ZodString>]>>;
    watchOptions: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodObject<{
      force: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      watchFile: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      watchDirectory: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      fallbackPolling: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      synchronousWatchDirectory: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      excludeFiles: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
      excludeDirectories: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
    }, Schema.core.$strip>>>;
    buildOptions: Schema.ZodOptional<Schema.ZodObject<{
      dry: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      force: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      verbose: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      incremental: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      assumeChangesOnlyAffectDirectDependencies: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      traceResolution: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
    }, Schema.core.$strip>>;
    "ts-node": Schema.ZodOptional<Schema.ZodNullable<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>>;
    files: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
    exclude: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
    include: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
    references: Schema.ZodOptional<Schema.ZodArray<Schema.ZodObject<{
      path: Schema.ZodString;
    }, Schema.core.$strip>>>;
  }, Schema.core.$strip>>;
};
//#endregion
//#region src/models/config/deno.d.ts
/** Strongly-typed `defineDenoConfig` for authoring a `deno.config.ts` file. */
export declare const defineDenoConfig: {
  (options: {
    allowScripts?: boolean | string[] | {
      allow?: boolean | string[] | undefined;
      deny?: string[] | undefined;
    } | undefined;
    compile?: {
      include?: string[] | undefined;
      exclude?: string[] | undefined;
      permissions?: string | {
        all?: boolean | undefined;
        read?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
          ignore?: boolean | string[] | undefined;
        } | undefined;
        write?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        import?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        env?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
          ignore?: boolean | string[] | undefined;
        } | undefined;
        net?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        run?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        ffi?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        sys?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
      } | undefined;
    } | undefined;
    desktop?: {
      app?: {
        name?: string | undefined;
        identifier?: string | undefined;
        icons?: {
          macos?: string | undefined;
          windows?: string | undefined;
          linux?: string | undefined;
        } | undefined;
        deepLinks?: string[] | undefined;
      } | undefined;
      backend?: "cef" | "webview" | undefined;
      output?: {
        macos?: string | undefined;
        windows?: string | undefined;
        linux?: string | undefined;
      } | undefined;
      release?: {
        baseUrl?: string | undefined;
      } | undefined;
    } | undefined;
    compilerOptions?: {
      allowJs?: boolean | undefined;
      allowUnreachableCode?: boolean | undefined;
      allowUnusedLabels?: boolean | undefined;
      checkJs?: boolean | undefined;
      emitDecoratorMetadata?: boolean | undefined;
      erasableSyntaxOnly?: boolean | null | undefined;
      exactOptionalPropertyTypes?: boolean | undefined;
      experimentalDecorators?: boolean | undefined;
      isolatedDeclarations?: boolean | undefined;
      jsx?: "precompile" | "preserve" | "react" | "react-jsx" | "react-jsxdev" | "react-native" | undefined;
      jsxFactory?: string | undefined;
      jsxFragmentFactory?: string | undefined;
      jsxImportSource?: string | undefined;
      jsxImportSourceTypes?: string | undefined;
      jsxPrecompileSkipElements?: string[] | undefined;
      lib?: string[] | undefined;
      module?: string | null | undefined;
      moduleResolution?: string | null | undefined;
      noErrorTruncation?: boolean | undefined;
      noFallthroughCasesInSwitch?: boolean | undefined;
      noImplicitAny?: boolean | undefined;
      noImplicitOverride?: boolean | undefined;
      noImplicitReturns?: boolean | undefined;
      noImplicitThis?: boolean | undefined;
      noPropertyAccessFromIndexSignature?: boolean | undefined;
      noUncheckedIndexedAccess?: boolean | undefined;
      noUnusedLocals?: boolean | undefined;
      noUnusedParameters?: boolean | undefined;
      baseUrl?: string | null | undefined;
      paths?: Record<string, (string | null)[] | null> | null | undefined;
      rootDirs?: string[] | undefined;
      skipLibCheck?: boolean | undefined;
      strict?: boolean | undefined;
      strictBindCallApply?: boolean | undefined;
      strictBuiltinIteratorReturn?: boolean | undefined;
      strictFunctionTypes?: boolean | undefined;
      strictNullChecks?: boolean | undefined;
      strictPropertyInitialization?: boolean | undefined;
      types?: string[] | undefined;
      useUnknownInCatchVariables?: boolean | undefined;
      verbatimModuleSyntax?: boolean | undefined;
    } | undefined;
    deploy?: {
      org?: string | undefined;
      app?: string | undefined;
      framework?: string | undefined;
      install?: string | undefined;
      build?: string | undefined;
      predeploy?: string | undefined;
      runtime?: {
        mode?: "dynamic" | "static" | undefined;
        entrypoint?: string | undefined;
        args?: string[] | undefined;
        cwd?: string | undefined;
        spa?: boolean | undefined;
      } | undefined;
      include?: string[] | undefined;
      exclude?: string[] | undefined;
    } | undefined;
    importMap?: string | undefined;
    catalog?: Record<string, string> | undefined;
    catalogs?: Record<string, Record<string, string>> | undefined;
    imports?: Record<string, string> | undefined;
    scopes?: Record<string, Record<string, string>> | undefined;
    exclude?: string[] | undefined;
    lint?: {
      include?: string[] | undefined;
      exclude?: string[] | undefined;
      plugins?: string[] | undefined;
      rules?: {
        tags?: string[] | undefined;
        exclude?: string[] | undefined;
        include?: string[] | undefined;
      } | undefined;
      report?: "compact" | "json" | "pretty" | undefined;
    } | undefined;
    fmt?: {
      include?: string[] | undefined;
      exclude?: string[] | undefined;
      useTabs?: boolean | undefined;
      lineWidth?: number | undefined;
      indentWidth?: number | undefined;
      singleQuote?: boolean | undefined;
      proseWrap?: "always" | "never" | "preserve" | undefined;
      semiColons?: boolean | undefined;
      quoteProps?: "asNeeded" | "consistent" | "preserve" | undefined;
      newLineKind?: "auto" | "crlf" | "lf" | "system" | undefined;
      useBraces?: "always" | "maintain" | "preferNone" | "whenNotSingleLine" | undefined;
      bracePosition?: "maintain" | "nextLine" | "sameLine" | "sameLineUnlessHanging" | undefined;
      singleBodyPosition?: "maintain" | "nextLine" | "sameLine" | undefined;
      nextControlFlowPosition?: "maintain" | "nextLine" | "sameLine" | undefined;
      trailingCommas?: "always" | "never" | "onlyMultiLine" | undefined;
      "json.trailingCommas"?: "always" | "jsonc" | "maintain" | "never" | undefined;
      operatorPosition?: "maintain" | "nextLine" | "sameLine" | undefined;
      "jsx.bracketPosition"?: "maintain" | "nextLine" | "sameLine" | undefined;
      "jsx.forceNewLinesSurroundingContent"?: boolean | undefined;
      "jsx.multiLineParens"?: "always" | "never" | "prefer" | undefined;
      "typeLiteral.separatorKind"?: "comma" | "semiColon" | undefined;
      spaceAround?: boolean | undefined;
      spaceSurroundingProperties?: boolean | undefined;
      vueComponentCase?: "ignore" | "kebab-case" | "pascal-case" | undefined;
      angularNextControlFlowSameLine?: boolean | undefined;
      sortNamedImports?: "caseInsensitive" | "caseSensitive" | "maintain" | undefined;
      sortNamedExports?: "caseInsensitive" | "caseSensitive" | "maintain" | undefined;
      useEditorConfig?: boolean | undefined;
      options?: {
        useTabs?: boolean | undefined;
        lineWidth?: number | undefined;
        indentWidth?: number | undefined;
        singleQuote?: boolean | undefined;
        proseWrap?: "always" | "never" | "preserve" | undefined;
        semiColons?: boolean | undefined;
      } | undefined;
    } | undefined;
    minimumDependencyAge?: string | number | {
      age?: string | number | undefined;
      exclude?: string[] | undefined;
    } | undefined;
    nodeModulesDir?: "auto" | "manual" | "none" | boolean | undefined;
    vendor?: boolean | undefined;
    jsrDepsInNodeModules?: boolean | undefined;
    preferPackageJson?: boolean | undefined;
    tasks?: Record<string, string | {
      description?: string | undefined;
      command?: string | undefined;
      dependencies?: string[] | undefined;
      files?: string[] | undefined;
      output?: string[] | undefined;
      env?: string[] | undefined;
    }> | undefined;
    test?: {
      include?: string[] | undefined;
      exclude?: string[] | undefined;
      permissions?: string | {
        all?: boolean | undefined;
        read?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
          ignore?: boolean | string[] | undefined;
        } | undefined;
        write?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        import?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        env?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
          ignore?: boolean | string[] | undefined;
        } | undefined;
        net?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        run?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        ffi?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        sys?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
      } | undefined;
      sanitizeOps?: boolean | undefined;
      sanitizeResources?: boolean | undefined;
    } | undefined;
    publish?: false | {
      include?: string[] | undefined;
      exclude?: string[] | undefined;
    } | undefined;
    bench?: {
      include?: string[] | undefined;
      exclude?: string[] | undefined;
      permissions?: string | {
        all?: boolean | undefined;
        read?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
          ignore?: boolean | string[] | undefined;
        } | undefined;
        write?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        import?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        env?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
          ignore?: boolean | string[] | undefined;
        } | undefined;
        net?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        run?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        ffi?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        sys?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
      } | undefined;
    } | undefined;
    coverage?: {
      thresholds?: {
        lines?: number | undefined;
        branches?: number | undefined;
        functions?: number | undefined;
      } | undefined;
    } | undefined;
    license?: string | undefined;
    lock?: string | boolean | {
      path?: string | undefined;
      frozen?: boolean | undefined;
    } | undefined;
    unstable?: string[] | undefined;
    name?: string | undefined;
    version?: string | undefined;
    exports?: string | Record<string, string> | undefined;
    permissions?: Record<string, {
      all?: boolean | undefined;
      read?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
        ignore?: boolean | string[] | undefined;
      } | undefined;
      write?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
      } | undefined;
      import?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
      } | undefined;
      env?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
        ignore?: boolean | string[] | undefined;
      } | undefined;
      net?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
      } | undefined;
      run?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
      } | undefined;
      ffi?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
      } | undefined;
      sys?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
      } | undefined;
    }> | undefined;
    patch?: string[] | undefined;
    links?: string[] | undefined;
    workspace?: string[] | {
      members?: string[] | undefined;
    } | undefined;
  }): {
    allowScripts?: boolean | string[] | {
      allow?: boolean | string[] | undefined;
      deny?: string[] | undefined;
    } | undefined;
    compile?: {
      include?: string[] | undefined;
      exclude?: string[] | undefined;
      permissions?: string | {
        all?: boolean | undefined;
        read?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
          ignore?: boolean | string[] | undefined;
        } | undefined;
        write?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        import?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        env?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
          ignore?: boolean | string[] | undefined;
        } | undefined;
        net?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        run?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        ffi?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        sys?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
      } | undefined;
    } | undefined;
    desktop?: {
      app?: {
        name?: string | undefined;
        identifier?: string | undefined;
        icons?: {
          macos?: string | undefined;
          windows?: string | undefined;
          linux?: string | undefined;
        } | undefined;
        deepLinks?: string[] | undefined;
      } | undefined;
      backend?: "cef" | "webview" | undefined;
      output?: {
        macos?: string | undefined;
        windows?: string | undefined;
        linux?: string | undefined;
      } | undefined;
      release?: {
        baseUrl?: string | undefined;
      } | undefined;
    } | undefined;
    compilerOptions?: {
      allowJs?: boolean | undefined;
      allowUnreachableCode?: boolean | undefined;
      allowUnusedLabels?: boolean | undefined;
      checkJs?: boolean | undefined;
      emitDecoratorMetadata?: boolean | undefined;
      erasableSyntaxOnly?: boolean | null | undefined;
      exactOptionalPropertyTypes?: boolean | undefined;
      experimentalDecorators?: boolean | undefined;
      isolatedDeclarations?: boolean | undefined;
      jsx?: "precompile" | "preserve" | "react" | "react-jsx" | "react-jsxdev" | "react-native" | undefined;
      jsxFactory?: string | undefined;
      jsxFragmentFactory?: string | undefined;
      jsxImportSource?: string | undefined;
      jsxImportSourceTypes?: string | undefined;
      jsxPrecompileSkipElements?: string[] | undefined;
      lib?: string[] | undefined;
      module?: string | null | undefined;
      moduleResolution?: string | null | undefined;
      noErrorTruncation?: boolean | undefined;
      noFallthroughCasesInSwitch?: boolean | undefined;
      noImplicitAny?: boolean | undefined;
      noImplicitOverride?: boolean | undefined;
      noImplicitReturns?: boolean | undefined;
      noImplicitThis?: boolean | undefined;
      noPropertyAccessFromIndexSignature?: boolean | undefined;
      noUncheckedIndexedAccess?: boolean | undefined;
      noUnusedLocals?: boolean | undefined;
      noUnusedParameters?: boolean | undefined;
      baseUrl?: string | null | undefined;
      paths?: Record<string, (string | null)[] | null> | null | undefined;
      rootDirs?: string[] | undefined;
      skipLibCheck?: boolean | undefined;
      strict?: boolean | undefined;
      strictBindCallApply?: boolean | undefined;
      strictBuiltinIteratorReturn?: boolean | undefined;
      strictFunctionTypes?: boolean | undefined;
      strictNullChecks?: boolean | undefined;
      strictPropertyInitialization?: boolean | undefined;
      types?: string[] | undefined;
      useUnknownInCatchVariables?: boolean | undefined;
      verbatimModuleSyntax?: boolean | undefined;
    } | undefined;
    deploy?: {
      org?: string | undefined;
      app?: string | undefined;
      framework?: string | undefined;
      install?: string | undefined;
      build?: string | undefined;
      predeploy?: string | undefined;
      runtime?: {
        mode?: "dynamic" | "static" | undefined;
        entrypoint?: string | undefined;
        args?: string[] | undefined;
        cwd?: string | undefined;
        spa?: boolean | undefined;
      } | undefined;
      include?: string[] | undefined;
      exclude?: string[] | undefined;
    } | undefined;
    importMap?: string | undefined;
    catalog?: Record<string, string> | undefined;
    catalogs?: Record<string, Record<string, string>> | undefined;
    imports?: Record<string, string> | undefined;
    scopes?: Record<string, Record<string, string>> | undefined;
    exclude?: string[] | undefined;
    lint?: {
      include?: string[] | undefined;
      exclude?: string[] | undefined;
      plugins?: string[] | undefined;
      rules?: {
        tags?: string[] | undefined;
        exclude?: string[] | undefined;
        include?: string[] | undefined;
      } | undefined;
      report?: "compact" | "json" | "pretty" | undefined;
    } | undefined;
    fmt?: {
      include?: string[] | undefined;
      exclude?: string[] | undefined;
      useTabs?: boolean | undefined;
      lineWidth?: number | undefined;
      indentWidth?: number | undefined;
      singleQuote?: boolean | undefined;
      proseWrap?: "always" | "never" | "preserve" | undefined;
      semiColons?: boolean | undefined;
      quoteProps?: "asNeeded" | "consistent" | "preserve" | undefined;
      newLineKind?: "auto" | "crlf" | "lf" | "system" | undefined;
      useBraces?: "always" | "maintain" | "preferNone" | "whenNotSingleLine" | undefined;
      bracePosition?: "maintain" | "nextLine" | "sameLine" | "sameLineUnlessHanging" | undefined;
      singleBodyPosition?: "maintain" | "nextLine" | "sameLine" | undefined;
      nextControlFlowPosition?: "maintain" | "nextLine" | "sameLine" | undefined;
      trailingCommas?: "always" | "never" | "onlyMultiLine" | undefined;
      "json.trailingCommas"?: "always" | "jsonc" | "maintain" | "never" | undefined;
      operatorPosition?: "maintain" | "nextLine" | "sameLine" | undefined;
      "jsx.bracketPosition"?: "maintain" | "nextLine" | "sameLine" | undefined;
      "jsx.forceNewLinesSurroundingContent"?: boolean | undefined;
      "jsx.multiLineParens"?: "always" | "never" | "prefer" | undefined;
      "typeLiteral.separatorKind"?: "comma" | "semiColon" | undefined;
      spaceAround?: boolean | undefined;
      spaceSurroundingProperties?: boolean | undefined;
      vueComponentCase?: "ignore" | "kebab-case" | "pascal-case" | undefined;
      angularNextControlFlowSameLine?: boolean | undefined;
      sortNamedImports?: "caseInsensitive" | "caseSensitive" | "maintain" | undefined;
      sortNamedExports?: "caseInsensitive" | "caseSensitive" | "maintain" | undefined;
      useEditorConfig?: boolean | undefined;
      options?: {
        useTabs?: boolean | undefined;
        lineWidth?: number | undefined;
        indentWidth?: number | undefined;
        singleQuote?: boolean | undefined;
        proseWrap?: "always" | "never" | "preserve" | undefined;
        semiColons?: boolean | undefined;
      } | undefined;
    } | undefined;
    minimumDependencyAge?: string | number | {
      age?: string | number | undefined;
      exclude?: string[] | undefined;
    } | undefined;
    nodeModulesDir?: "auto" | "manual" | "none" | boolean | undefined;
    vendor?: boolean | undefined;
    jsrDepsInNodeModules?: boolean | undefined;
    preferPackageJson?: boolean | undefined;
    tasks?: Record<string, string | {
      description?: string | undefined;
      command?: string | undefined;
      dependencies?: string[] | undefined;
      files?: string[] | undefined;
      output?: string[] | undefined;
      env?: string[] | undefined;
    }> | undefined;
    test?: {
      include?: string[] | undefined;
      exclude?: string[] | undefined;
      permissions?: string | {
        all?: boolean | undefined;
        read?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
          ignore?: boolean | string[] | undefined;
        } | undefined;
        write?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        import?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        env?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
          ignore?: boolean | string[] | undefined;
        } | undefined;
        net?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        run?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        ffi?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        sys?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
      } | undefined;
      sanitizeOps?: boolean | undefined;
      sanitizeResources?: boolean | undefined;
    } | undefined;
    publish?: false | {
      include?: string[] | undefined;
      exclude?: string[] | undefined;
    } | undefined;
    bench?: {
      include?: string[] | undefined;
      exclude?: string[] | undefined;
      permissions?: string | {
        all?: boolean | undefined;
        read?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
          ignore?: boolean | string[] | undefined;
        } | undefined;
        write?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        import?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        env?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
          ignore?: boolean | string[] | undefined;
        } | undefined;
        net?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        run?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        ffi?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        sys?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
      } | undefined;
    } | undefined;
    coverage?: {
      thresholds?: {
        lines?: number | undefined;
        branches?: number | undefined;
        functions?: number | undefined;
      } | undefined;
    } | undefined;
    license?: string | undefined;
    lock?: string | boolean | {
      path?: string | undefined;
      frozen?: boolean | undefined;
    } | undefined;
    unstable?: string[] | undefined;
    name?: string | undefined;
    version?: string | undefined;
    exports?: string | Record<string, string> | undefined;
    permissions?: Record<string, {
      all?: boolean | undefined;
      read?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
        ignore?: boolean | string[] | undefined;
      } | undefined;
      write?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
      } | undefined;
      import?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
      } | undefined;
      env?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
        ignore?: boolean | string[] | undefined;
      } | undefined;
      net?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
      } | undefined;
      run?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
      } | undefined;
      ffi?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
      } | undefined;
      sys?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
      } | undefined;
    }> | undefined;
    patch?: string[] | undefined;
    links?: string[] | undefined;
    workspace?: string[] | {
      members?: string[] | undefined;
    } | undefined;
  };
  (options: {
    allowScripts?: boolean | string[] | {
      allow?: boolean | string[] | undefined;
      deny?: string[] | undefined;
    } | undefined;
    compile?: {
      include?: string[] | undefined;
      exclude?: string[] | undefined;
      permissions?: string | {
        all?: boolean | undefined;
        read?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
          ignore?: boolean | string[] | undefined;
        } | undefined;
        write?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        import?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        env?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
          ignore?: boolean | string[] | undefined;
        } | undefined;
        net?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        run?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        ffi?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        sys?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
      } | undefined;
    } | undefined;
    desktop?: {
      app?: {
        name?: string | undefined;
        identifier?: string | undefined;
        icons?: {
          macos?: string | undefined;
          windows?: string | undefined;
          linux?: string | undefined;
        } | undefined;
        deepLinks?: string[] | undefined;
      } | undefined;
      backend?: "cef" | "webview" | undefined;
      output?: {
        macos?: string | undefined;
        windows?: string | undefined;
        linux?: string | undefined;
      } | undefined;
      release?: {
        baseUrl?: string | undefined;
      } | undefined;
    } | undefined;
    compilerOptions?: {
      allowJs?: boolean | undefined;
      allowUnreachableCode?: boolean | undefined;
      allowUnusedLabels?: boolean | undefined;
      checkJs?: boolean | undefined;
      emitDecoratorMetadata?: boolean | undefined;
      erasableSyntaxOnly?: boolean | null | undefined;
      exactOptionalPropertyTypes?: boolean | undefined;
      experimentalDecorators?: boolean | undefined;
      isolatedDeclarations?: boolean | undefined;
      jsx?: "precompile" | "preserve" | "react" | "react-jsx" | "react-jsxdev" | "react-native" | undefined;
      jsxFactory?: string | undefined;
      jsxFragmentFactory?: string | undefined;
      jsxImportSource?: string | undefined;
      jsxImportSourceTypes?: string | undefined;
      jsxPrecompileSkipElements?: string[] | undefined;
      lib?: string[] | undefined;
      module?: string | null | undefined;
      moduleResolution?: string | null | undefined;
      noErrorTruncation?: boolean | undefined;
      noFallthroughCasesInSwitch?: boolean | undefined;
      noImplicitAny?: boolean | undefined;
      noImplicitOverride?: boolean | undefined;
      noImplicitReturns?: boolean | undefined;
      noImplicitThis?: boolean | undefined;
      noPropertyAccessFromIndexSignature?: boolean | undefined;
      noUncheckedIndexedAccess?: boolean | undefined;
      noUnusedLocals?: boolean | undefined;
      noUnusedParameters?: boolean | undefined;
      baseUrl?: string | null | undefined;
      paths?: Record<string, (string | null)[] | null> | null | undefined;
      rootDirs?: string[] | undefined;
      skipLibCheck?: boolean | undefined;
      strict?: boolean | undefined;
      strictBindCallApply?: boolean | undefined;
      strictBuiltinIteratorReturn?: boolean | undefined;
      strictFunctionTypes?: boolean | undefined;
      strictNullChecks?: boolean | undefined;
      strictPropertyInitialization?: boolean | undefined;
      types?: string[] | undefined;
      useUnknownInCatchVariables?: boolean | undefined;
      verbatimModuleSyntax?: boolean | undefined;
    } | undefined;
    deploy?: {
      org?: string | undefined;
      app?: string | undefined;
      framework?: string | undefined;
      install?: string | undefined;
      build?: string | undefined;
      predeploy?: string | undefined;
      runtime?: {
        mode?: "dynamic" | "static" | undefined;
        entrypoint?: string | undefined;
        args?: string[] | undefined;
        cwd?: string | undefined;
        spa?: boolean | undefined;
      } | undefined;
      include?: string[] | undefined;
      exclude?: string[] | undefined;
    } | undefined;
    importMap?: string | undefined;
    catalog?: Record<string, string> | undefined;
    catalogs?: Record<string, Record<string, string>> | undefined;
    imports?: Record<string, string> | undefined;
    scopes?: Record<string, Record<string, string>> | undefined;
    exclude?: string[] | undefined;
    lint?: {
      include?: string[] | undefined;
      exclude?: string[] | undefined;
      plugins?: string[] | undefined;
      rules?: {
        tags?: string[] | undefined;
        exclude?: string[] | undefined;
        include?: string[] | undefined;
      } | undefined;
      report?: "compact" | "json" | "pretty" | undefined;
    } | undefined;
    fmt?: {
      include?: string[] | undefined;
      exclude?: string[] | undefined;
      useTabs?: boolean | undefined;
      lineWidth?: number | undefined;
      indentWidth?: number | undefined;
      singleQuote?: boolean | undefined;
      proseWrap?: "always" | "never" | "preserve" | undefined;
      semiColons?: boolean | undefined;
      quoteProps?: "asNeeded" | "consistent" | "preserve" | undefined;
      newLineKind?: "auto" | "crlf" | "lf" | "system" | undefined;
      useBraces?: "always" | "maintain" | "preferNone" | "whenNotSingleLine" | undefined;
      bracePosition?: "maintain" | "nextLine" | "sameLine" | "sameLineUnlessHanging" | undefined;
      singleBodyPosition?: "maintain" | "nextLine" | "sameLine" | undefined;
      nextControlFlowPosition?: "maintain" | "nextLine" | "sameLine" | undefined;
      trailingCommas?: "always" | "never" | "onlyMultiLine" | undefined;
      "json.trailingCommas"?: "always" | "jsonc" | "maintain" | "never" | undefined;
      operatorPosition?: "maintain" | "nextLine" | "sameLine" | undefined;
      "jsx.bracketPosition"?: "maintain" | "nextLine" | "sameLine" | undefined;
      "jsx.forceNewLinesSurroundingContent"?: boolean | undefined;
      "jsx.multiLineParens"?: "always" | "never" | "prefer" | undefined;
      "typeLiteral.separatorKind"?: "comma" | "semiColon" | undefined;
      spaceAround?: boolean | undefined;
      spaceSurroundingProperties?: boolean | undefined;
      vueComponentCase?: "ignore" | "kebab-case" | "pascal-case" | undefined;
      angularNextControlFlowSameLine?: boolean | undefined;
      sortNamedImports?: "caseInsensitive" | "caseSensitive" | "maintain" | undefined;
      sortNamedExports?: "caseInsensitive" | "caseSensitive" | "maintain" | undefined;
      useEditorConfig?: boolean | undefined;
      options?: {
        useTabs?: boolean | undefined;
        lineWidth?: number | undefined;
        indentWidth?: number | undefined;
        singleQuote?: boolean | undefined;
        proseWrap?: "always" | "never" | "preserve" | undefined;
        semiColons?: boolean | undefined;
      } | undefined;
    } | undefined;
    minimumDependencyAge?: string | number | {
      age?: string | number | undefined;
      exclude?: string[] | undefined;
    } | undefined;
    nodeModulesDir?: "auto" | "manual" | "none" | boolean | undefined;
    vendor?: boolean | undefined;
    jsrDepsInNodeModules?: boolean | undefined;
    preferPackageJson?: boolean | undefined;
    tasks?: Record<string, string | {
      description?: string | undefined;
      command?: string | undefined;
      dependencies?: string[] | undefined;
      files?: string[] | undefined;
      output?: string[] | undefined;
      env?: string[] | undefined;
    }> | undefined;
    test?: {
      include?: string[] | undefined;
      exclude?: string[] | undefined;
      permissions?: string | {
        all?: boolean | undefined;
        read?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
          ignore?: boolean | string[] | undefined;
        } | undefined;
        write?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        import?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        env?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
          ignore?: boolean | string[] | undefined;
        } | undefined;
        net?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        run?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        ffi?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        sys?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
      } | undefined;
      sanitizeOps?: boolean | undefined;
      sanitizeResources?: boolean | undefined;
    } | undefined;
    publish?: false | {
      include?: string[] | undefined;
      exclude?: string[] | undefined;
    } | undefined;
    bench?: {
      include?: string[] | undefined;
      exclude?: string[] | undefined;
      permissions?: string | {
        all?: boolean | undefined;
        read?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
          ignore?: boolean | string[] | undefined;
        } | undefined;
        write?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        import?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        env?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
          ignore?: boolean | string[] | undefined;
        } | undefined;
        net?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        run?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        ffi?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        sys?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
      } | undefined;
    } | undefined;
    coverage?: {
      thresholds?: {
        lines?: number | undefined;
        branches?: number | undefined;
        functions?: number | undefined;
      } | undefined;
    } | undefined;
    license?: string | undefined;
    lock?: string | boolean | {
      path?: string | undefined;
      frozen?: boolean | undefined;
    } | undefined;
    unstable?: string[] | undefined;
    name?: string | undefined;
    version?: string | undefined;
    exports?: string | Record<string, string> | undefined;
    permissions?: Record<string, {
      all?: boolean | undefined;
      read?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
        ignore?: boolean | string[] | undefined;
      } | undefined;
      write?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
      } | undefined;
      import?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
      } | undefined;
      env?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
        ignore?: boolean | string[] | undefined;
      } | undefined;
      net?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
      } | undefined;
      run?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
      } | undefined;
      ffi?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
      } | undefined;
      sys?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
      } | undefined;
    }> | undefined;
    patch?: string[] | undefined;
    links?: string[] | undefined;
    workspace?: string[] | {
      members?: string[] | undefined;
    } | undefined;
  }[]): {
    allowScripts?: boolean | string[] | {
      allow?: boolean | string[] | undefined;
      deny?: string[] | undefined;
    } | undefined;
    compile?: {
      include?: string[] | undefined;
      exclude?: string[] | undefined;
      permissions?: string | {
        all?: boolean | undefined;
        read?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
          ignore?: boolean | string[] | undefined;
        } | undefined;
        write?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        import?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        env?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
          ignore?: boolean | string[] | undefined;
        } | undefined;
        net?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        run?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        ffi?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        sys?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
      } | undefined;
    } | undefined;
    desktop?: {
      app?: {
        name?: string | undefined;
        identifier?: string | undefined;
        icons?: {
          macos?: string | undefined;
          windows?: string | undefined;
          linux?: string | undefined;
        } | undefined;
        deepLinks?: string[] | undefined;
      } | undefined;
      backend?: "cef" | "webview" | undefined;
      output?: {
        macos?: string | undefined;
        windows?: string | undefined;
        linux?: string | undefined;
      } | undefined;
      release?: {
        baseUrl?: string | undefined;
      } | undefined;
    } | undefined;
    compilerOptions?: {
      allowJs?: boolean | undefined;
      allowUnreachableCode?: boolean | undefined;
      allowUnusedLabels?: boolean | undefined;
      checkJs?: boolean | undefined;
      emitDecoratorMetadata?: boolean | undefined;
      erasableSyntaxOnly?: boolean | null | undefined;
      exactOptionalPropertyTypes?: boolean | undefined;
      experimentalDecorators?: boolean | undefined;
      isolatedDeclarations?: boolean | undefined;
      jsx?: "precompile" | "preserve" | "react" | "react-jsx" | "react-jsxdev" | "react-native" | undefined;
      jsxFactory?: string | undefined;
      jsxFragmentFactory?: string | undefined;
      jsxImportSource?: string | undefined;
      jsxImportSourceTypes?: string | undefined;
      jsxPrecompileSkipElements?: string[] | undefined;
      lib?: string[] | undefined;
      module?: string | null | undefined;
      moduleResolution?: string | null | undefined;
      noErrorTruncation?: boolean | undefined;
      noFallthroughCasesInSwitch?: boolean | undefined;
      noImplicitAny?: boolean | undefined;
      noImplicitOverride?: boolean | undefined;
      noImplicitReturns?: boolean | undefined;
      noImplicitThis?: boolean | undefined;
      noPropertyAccessFromIndexSignature?: boolean | undefined;
      noUncheckedIndexedAccess?: boolean | undefined;
      noUnusedLocals?: boolean | undefined;
      noUnusedParameters?: boolean | undefined;
      baseUrl?: string | null | undefined;
      paths?: Record<string, (string | null)[] | null> | null | undefined;
      rootDirs?: string[] | undefined;
      skipLibCheck?: boolean | undefined;
      strict?: boolean | undefined;
      strictBindCallApply?: boolean | undefined;
      strictBuiltinIteratorReturn?: boolean | undefined;
      strictFunctionTypes?: boolean | undefined;
      strictNullChecks?: boolean | undefined;
      strictPropertyInitialization?: boolean | undefined;
      types?: string[] | undefined;
      useUnknownInCatchVariables?: boolean | undefined;
      verbatimModuleSyntax?: boolean | undefined;
    } | undefined;
    deploy?: {
      org?: string | undefined;
      app?: string | undefined;
      framework?: string | undefined;
      install?: string | undefined;
      build?: string | undefined;
      predeploy?: string | undefined;
      runtime?: {
        mode?: "dynamic" | "static" | undefined;
        entrypoint?: string | undefined;
        args?: string[] | undefined;
        cwd?: string | undefined;
        spa?: boolean | undefined;
      } | undefined;
      include?: string[] | undefined;
      exclude?: string[] | undefined;
    } | undefined;
    importMap?: string | undefined;
    catalog?: Record<string, string> | undefined;
    catalogs?: Record<string, Record<string, string>> | undefined;
    imports?: Record<string, string> | undefined;
    scopes?: Record<string, Record<string, string>> | undefined;
    exclude?: string[] | undefined;
    lint?: {
      include?: string[] | undefined;
      exclude?: string[] | undefined;
      plugins?: string[] | undefined;
      rules?: {
        tags?: string[] | undefined;
        exclude?: string[] | undefined;
        include?: string[] | undefined;
      } | undefined;
      report?: "compact" | "json" | "pretty" | undefined;
    } | undefined;
    fmt?: {
      include?: string[] | undefined;
      exclude?: string[] | undefined;
      useTabs?: boolean | undefined;
      lineWidth?: number | undefined;
      indentWidth?: number | undefined;
      singleQuote?: boolean | undefined;
      proseWrap?: "always" | "never" | "preserve" | undefined;
      semiColons?: boolean | undefined;
      quoteProps?: "asNeeded" | "consistent" | "preserve" | undefined;
      newLineKind?: "auto" | "crlf" | "lf" | "system" | undefined;
      useBraces?: "always" | "maintain" | "preferNone" | "whenNotSingleLine" | undefined;
      bracePosition?: "maintain" | "nextLine" | "sameLine" | "sameLineUnlessHanging" | undefined;
      singleBodyPosition?: "maintain" | "nextLine" | "sameLine" | undefined;
      nextControlFlowPosition?: "maintain" | "nextLine" | "sameLine" | undefined;
      trailingCommas?: "always" | "never" | "onlyMultiLine" | undefined;
      "json.trailingCommas"?: "always" | "jsonc" | "maintain" | "never" | undefined;
      operatorPosition?: "maintain" | "nextLine" | "sameLine" | undefined;
      "jsx.bracketPosition"?: "maintain" | "nextLine" | "sameLine" | undefined;
      "jsx.forceNewLinesSurroundingContent"?: boolean | undefined;
      "jsx.multiLineParens"?: "always" | "never" | "prefer" | undefined;
      "typeLiteral.separatorKind"?: "comma" | "semiColon" | undefined;
      spaceAround?: boolean | undefined;
      spaceSurroundingProperties?: boolean | undefined;
      vueComponentCase?: "ignore" | "kebab-case" | "pascal-case" | undefined;
      angularNextControlFlowSameLine?: boolean | undefined;
      sortNamedImports?: "caseInsensitive" | "caseSensitive" | "maintain" | undefined;
      sortNamedExports?: "caseInsensitive" | "caseSensitive" | "maintain" | undefined;
      useEditorConfig?: boolean | undefined;
      options?: {
        useTabs?: boolean | undefined;
        lineWidth?: number | undefined;
        indentWidth?: number | undefined;
        singleQuote?: boolean | undefined;
        proseWrap?: "always" | "never" | "preserve" | undefined;
        semiColons?: boolean | undefined;
      } | undefined;
    } | undefined;
    minimumDependencyAge?: string | number | {
      age?: string | number | undefined;
      exclude?: string[] | undefined;
    } | undefined;
    nodeModulesDir?: "auto" | "manual" | "none" | boolean | undefined;
    vendor?: boolean | undefined;
    jsrDepsInNodeModules?: boolean | undefined;
    preferPackageJson?: boolean | undefined;
    tasks?: Record<string, string | {
      description?: string | undefined;
      command?: string | undefined;
      dependencies?: string[] | undefined;
      files?: string[] | undefined;
      output?: string[] | undefined;
      env?: string[] | undefined;
    }> | undefined;
    test?: {
      include?: string[] | undefined;
      exclude?: string[] | undefined;
      permissions?: string | {
        all?: boolean | undefined;
        read?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
          ignore?: boolean | string[] | undefined;
        } | undefined;
        write?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        import?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        env?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
          ignore?: boolean | string[] | undefined;
        } | undefined;
        net?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        run?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        ffi?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        sys?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
      } | undefined;
      sanitizeOps?: boolean | undefined;
      sanitizeResources?: boolean | undefined;
    } | undefined;
    publish?: false | {
      include?: string[] | undefined;
      exclude?: string[] | undefined;
    } | undefined;
    bench?: {
      include?: string[] | undefined;
      exclude?: string[] | undefined;
      permissions?: string | {
        all?: boolean | undefined;
        read?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
          ignore?: boolean | string[] | undefined;
        } | undefined;
        write?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        import?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        env?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
          ignore?: boolean | string[] | undefined;
        } | undefined;
        net?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        run?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        ffi?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        sys?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
      } | undefined;
    } | undefined;
    coverage?: {
      thresholds?: {
        lines?: number | undefined;
        branches?: number | undefined;
        functions?: number | undefined;
      } | undefined;
    } | undefined;
    license?: string | undefined;
    lock?: string | boolean | {
      path?: string | undefined;
      frozen?: boolean | undefined;
    } | undefined;
    unstable?: string[] | undefined;
    name?: string | undefined;
    version?: string | undefined;
    exports?: string | Record<string, string> | undefined;
    permissions?: Record<string, {
      all?: boolean | undefined;
      read?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
        ignore?: boolean | string[] | undefined;
      } | undefined;
      write?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
      } | undefined;
      import?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
      } | undefined;
      env?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
        ignore?: boolean | string[] | undefined;
      } | undefined;
      net?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
      } | undefined;
      run?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
      } | undefined;
      ffi?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
      } | undefined;
      sys?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
      } | undefined;
    }> | undefined;
    patch?: string[] | undefined;
    links?: string[] | undefined;
    workspace?: string[] | {
      members?: string[] | undefined;
    } | undefined;
  }[];
  (options: UserConfigFn<Schema.ZodObject<{
    allowScripts: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>, Schema.ZodObject<{
      allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      deny: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>]>>;
    compile: Schema.ZodOptional<Schema.ZodObject<{
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      permissions: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
        all: Schema.ZodOptional<Schema.ZodBoolean>;
        read: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        write: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        import: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        env: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        net: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        run: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        ffi: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        sys: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
      }, Schema.core.$strip>]>>;
    }, Schema.core.$strip>>;
    desktop: Schema.ZodOptional<Schema.ZodObject<{
      app: Schema.ZodOptional<Schema.ZodObject<{
        name: Schema.ZodOptional<Schema.ZodString>;
        identifier: Schema.ZodOptional<Schema.ZodString>;
        icons: Schema.ZodOptional<Schema.ZodObject<{
          macos: Schema.ZodOptional<Schema.ZodString>;
          windows: Schema.ZodOptional<Schema.ZodString>;
          linux: Schema.ZodOptional<Schema.ZodString>;
        }, Schema.core.$strip>>;
        deepLinks: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      }, Schema.core.$strip>>;
      backend: Schema.ZodOptional<Schema.ZodEnum<{
        cef: "cef";
        webview: "webview";
      }>>;
      output: Schema.ZodOptional<Schema.ZodObject<{
        macos: Schema.ZodOptional<Schema.ZodString>;
        windows: Schema.ZodOptional<Schema.ZodString>;
        linux: Schema.ZodOptional<Schema.ZodString>;
      }, Schema.core.$strip>>;
      release: Schema.ZodOptional<Schema.ZodObject<{
        baseUrl: Schema.ZodOptional<Schema.ZodString>;
      }, Schema.core.$strip>>;
    }, Schema.core.$strip>>;
    compilerOptions: Schema.ZodOptional<Schema.ZodObject<{
      allowJs: Schema.ZodOptional<Schema.ZodBoolean>;
      allowUnreachableCode: Schema.ZodOptional<Schema.ZodBoolean>;
      allowUnusedLabels: Schema.ZodOptional<Schema.ZodBoolean>;
      checkJs: Schema.ZodOptional<Schema.ZodBoolean>;
      emitDecoratorMetadata: Schema.ZodOptional<Schema.ZodBoolean>;
      erasableSyntaxOnly: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      exactOptionalPropertyTypes: Schema.ZodOptional<Schema.ZodBoolean>;
      experimentalDecorators: Schema.ZodOptional<Schema.ZodBoolean>;
      isolatedDeclarations: Schema.ZodOptional<Schema.ZodBoolean>;
      jsx: Schema.ZodOptional<Schema.ZodEnum<{
        precompile: "precompile";
        preserve: "preserve";
        react: "react";
        "react-jsx": "react-jsx";
        "react-jsxdev": "react-jsxdev";
        "react-native": "react-native";
      }>>;
      jsxFactory: Schema.ZodOptional<Schema.ZodString>;
      jsxFragmentFactory: Schema.ZodOptional<Schema.ZodString>;
      jsxImportSource: Schema.ZodOptional<Schema.ZodString>;
      jsxImportSourceTypes: Schema.ZodOptional<Schema.ZodString>;
      jsxPrecompileSkipElements: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      lib: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      module: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      moduleResolution: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      noErrorTruncation: Schema.ZodOptional<Schema.ZodBoolean>;
      noFallthroughCasesInSwitch: Schema.ZodOptional<Schema.ZodBoolean>;
      noImplicitAny: Schema.ZodOptional<Schema.ZodBoolean>;
      noImplicitOverride: Schema.ZodOptional<Schema.ZodBoolean>;
      noImplicitReturns: Schema.ZodOptional<Schema.ZodBoolean>;
      noImplicitThis: Schema.ZodOptional<Schema.ZodBoolean>;
      noPropertyAccessFromIndexSignature: Schema.ZodOptional<Schema.ZodBoolean>;
      noUncheckedIndexedAccess: Schema.ZodOptional<Schema.ZodBoolean>;
      noUnusedLocals: Schema.ZodOptional<Schema.ZodBoolean>;
      noUnusedParameters: Schema.ZodOptional<Schema.ZodBoolean>;
      baseUrl: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      paths: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodRecord<Schema.ZodString, Schema.ZodNullable<Schema.ZodArray<Schema.ZodNullable<Schema.ZodString>>>>>>;
      rootDirs: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      skipLibCheck: Schema.ZodOptional<Schema.ZodBoolean>;
      strict: Schema.ZodOptional<Schema.ZodBoolean>;
      strictBindCallApply: Schema.ZodOptional<Schema.ZodBoolean>;
      strictBuiltinIteratorReturn: Schema.ZodOptional<Schema.ZodBoolean>;
      strictFunctionTypes: Schema.ZodOptional<Schema.ZodBoolean>;
      strictNullChecks: Schema.ZodOptional<Schema.ZodBoolean>;
      strictPropertyInitialization: Schema.ZodOptional<Schema.ZodBoolean>;
      types: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      useUnknownInCatchVariables: Schema.ZodOptional<Schema.ZodBoolean>;
      verbatimModuleSyntax: Schema.ZodOptional<Schema.ZodBoolean>;
    }, Schema.core.$strip>>;
    deploy: Schema.ZodOptional<Schema.ZodObject<{
      org: Schema.ZodOptional<Schema.ZodString>;
      app: Schema.ZodOptional<Schema.ZodString>;
      framework: Schema.ZodOptional<Schema.ZodString>;
      install: Schema.ZodOptional<Schema.ZodString>;
      build: Schema.ZodOptional<Schema.ZodString>;
      predeploy: Schema.ZodOptional<Schema.ZodString>;
      runtime: Schema.ZodOptional<Schema.ZodObject<{
        mode: Schema.ZodOptional<Schema.ZodEnum<{
          dynamic: "dynamic";
          static: "static";
        }>>;
        entrypoint: Schema.ZodOptional<Schema.ZodString>;
        args: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
        cwd: Schema.ZodOptional<Schema.ZodString>;
        spa: Schema.ZodOptional<Schema.ZodBoolean>;
      }, Schema.core.$strip>>;
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>>;
    importMap: Schema.ZodOptional<Schema.ZodString>;
    catalog: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
    catalogs: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>;
    imports: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
    scopes: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>;
    exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    lint: Schema.ZodOptional<Schema.ZodObject<{
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      plugins: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      rules: Schema.ZodOptional<Schema.ZodObject<{
        tags: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
        exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
        include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      }, Schema.core.$strip>>;
      report: Schema.ZodOptional<Schema.ZodEnum<{
        compact: "compact";
        json: "json";
        pretty: "pretty";
      }>>;
    }, Schema.core.$strip>>;
    fmt: Schema.ZodOptional<Schema.ZodObject<{
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      useTabs: Schema.ZodOptional<Schema.ZodBoolean>;
      lineWidth: Schema.ZodOptional<Schema.ZodNumber>;
      indentWidth: Schema.ZodOptional<Schema.ZodNumber>;
      singleQuote: Schema.ZodOptional<Schema.ZodBoolean>;
      proseWrap: Schema.ZodOptional<Schema.ZodEnum<{
        always: "always";
        never: "never";
        preserve: "preserve";
      }>>;
      semiColons: Schema.ZodOptional<Schema.ZodBoolean>;
      quoteProps: Schema.ZodOptional<Schema.ZodEnum<{
        asNeeded: "asNeeded";
        consistent: "consistent";
        preserve: "preserve";
      }>>;
      newLineKind: Schema.ZodOptional<Schema.ZodEnum<{
        auto: "auto";
        crlf: "crlf";
        lf: "lf";
        system: "system";
      }>>;
      useBraces: Schema.ZodOptional<Schema.ZodEnum<{
        always: "always";
        maintain: "maintain";
        preferNone: "preferNone";
        whenNotSingleLine: "whenNotSingleLine";
      }>>;
      bracePosition: Schema.ZodOptional<Schema.ZodEnum<{
        maintain: "maintain";
        nextLine: "nextLine";
        sameLine: "sameLine";
        sameLineUnlessHanging: "sameLineUnlessHanging";
      }>>;
      singleBodyPosition: Schema.ZodOptional<Schema.ZodEnum<{
        maintain: "maintain";
        nextLine: "nextLine";
        sameLine: "sameLine";
      }>>;
      nextControlFlowPosition: Schema.ZodOptional<Schema.ZodEnum<{
        maintain: "maintain";
        nextLine: "nextLine";
        sameLine: "sameLine";
      }>>;
      trailingCommas: Schema.ZodOptional<Schema.ZodEnum<{
        always: "always";
        never: "never";
        onlyMultiLine: "onlyMultiLine";
      }>>;
      "json.trailingCommas": Schema.ZodOptional<Schema.ZodEnum<{
        always: "always";
        jsonc: "jsonc";
        maintain: "maintain";
        never: "never";
      }>>;
      operatorPosition: Schema.ZodOptional<Schema.ZodEnum<{
        maintain: "maintain";
        nextLine: "nextLine";
        sameLine: "sameLine";
      }>>;
      "jsx.bracketPosition": Schema.ZodOptional<Schema.ZodEnum<{
        maintain: "maintain";
        nextLine: "nextLine";
        sameLine: "sameLine";
      }>>;
      "jsx.forceNewLinesSurroundingContent": Schema.ZodOptional<Schema.ZodBoolean>;
      "jsx.multiLineParens": Schema.ZodOptional<Schema.ZodEnum<{
        always: "always";
        never: "never";
        prefer: "prefer";
      }>>;
      "typeLiteral.separatorKind": Schema.ZodOptional<Schema.ZodEnum<{
        comma: "comma";
        semiColon: "semiColon";
      }>>;
      spaceAround: Schema.ZodOptional<Schema.ZodBoolean>;
      spaceSurroundingProperties: Schema.ZodOptional<Schema.ZodBoolean>;
      vueComponentCase: Schema.ZodOptional<Schema.ZodEnum<{
        ignore: "ignore";
        "kebab-case": "kebab-case";
        "pascal-case": "pascal-case";
      }>>;
      angularNextControlFlowSameLine: Schema.ZodOptional<Schema.ZodBoolean>;
      sortNamedImports: Schema.ZodOptional<Schema.ZodEnum<{
        caseInsensitive: "caseInsensitive";
        caseSensitive: "caseSensitive";
        maintain: "maintain";
      }>>;
      sortNamedExports: Schema.ZodOptional<Schema.ZodEnum<{
        caseInsensitive: "caseInsensitive";
        caseSensitive: "caseSensitive";
        maintain: "maintain";
      }>>;
      useEditorConfig: Schema.ZodOptional<Schema.ZodBoolean>;
      options: Schema.ZodOptional<Schema.ZodObject<{
        useTabs: Schema.ZodOptional<Schema.ZodBoolean>;
        lineWidth: Schema.ZodOptional<Schema.ZodNumber>;
        indentWidth: Schema.ZodOptional<Schema.ZodNumber>;
        singleQuote: Schema.ZodOptional<Schema.ZodBoolean>;
        proseWrap: Schema.ZodOptional<Schema.ZodEnum<{
          always: "always";
          never: "never";
          preserve: "preserve";
        }>>;
        semiColons: Schema.ZodOptional<Schema.ZodBoolean>;
      }, Schema.core.$strip>>;
    }, Schema.core.$strip>>;
    minimumDependencyAge: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodNumber]>, Schema.ZodObject<{
      age: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodNumber]>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>]>>;
    nodeModulesDir: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodEnum<{
      auto: "auto";
      manual: "manual";
      none: "none";
    }>, Schema.ZodBoolean]>>;
    vendor: Schema.ZodOptional<Schema.ZodBoolean>;
    jsrDepsInNodeModules: Schema.ZodOptional<Schema.ZodBoolean>;
    preferPackageJson: Schema.ZodOptional<Schema.ZodBoolean>;
    tasks: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      description: Schema.ZodOptional<Schema.ZodString>;
      command: Schema.ZodOptional<Schema.ZodString>;
      dependencies: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      files: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      output: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      env: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>]>>>;
    test: Schema.ZodOptional<Schema.ZodObject<{
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      permissions: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
        all: Schema.ZodOptional<Schema.ZodBoolean>;
        read: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        write: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        import: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        env: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        net: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        run: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        ffi: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        sys: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
      }, Schema.core.$strip>]>>;
      sanitizeOps: Schema.ZodOptional<Schema.ZodBoolean>;
      sanitizeResources: Schema.ZodOptional<Schema.ZodBoolean>;
    }, Schema.core.$strip>>;
    publish: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>, Schema.ZodLiteral<false>]>>;
    bench: Schema.ZodOptional<Schema.ZodObject<{
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      permissions: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
        all: Schema.ZodOptional<Schema.ZodBoolean>;
        read: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        write: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        import: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        env: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        net: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        run: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        ffi: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        sys: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
      }, Schema.core.$strip>]>>;
    }, Schema.core.$strip>>;
    coverage: Schema.ZodOptional<Schema.ZodObject<{
      thresholds: Schema.ZodOptional<Schema.ZodObject<{
        lines: Schema.ZodOptional<Schema.ZodNumber>;
        branches: Schema.ZodOptional<Schema.ZodNumber>;
        functions: Schema.ZodOptional<Schema.ZodNumber>;
      }, Schema.core.$strip>>;
    }, Schema.core.$strip>>;
    license: Schema.ZodOptional<Schema.ZodString>;
    lock: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodBoolean, Schema.ZodObject<{
      path: Schema.ZodOptional<Schema.ZodString>;
      frozen: Schema.ZodOptional<Schema.ZodBoolean>;
    }, Schema.core.$strip>]>>;
    unstable: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    name: Schema.ZodOptional<Schema.ZodString>;
    version: Schema.ZodOptional<Schema.ZodString>;
    exports: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodString>]>>;
    permissions: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodObject<{
      all: Schema.ZodOptional<Schema.ZodBoolean>;
      read: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      write: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      import: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      env: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      net: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      run: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      ffi: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      sys: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
    }, Schema.core.$strip>>>;
    patch: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    links: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    workspace: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodArray<Schema.ZodString>, Schema.ZodObject<{
      members: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>]>>;
  }, Schema.core.$strip>>): UserConfigFn<Schema.ZodObject<{
    allowScripts: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>, Schema.ZodObject<{
      allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      deny: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>]>>;
    compile: Schema.ZodOptional<Schema.ZodObject<{
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      permissions: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
        all: Schema.ZodOptional<Schema.ZodBoolean>;
        read: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        write: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        import: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        env: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        net: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        run: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        ffi: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        sys: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
      }, Schema.core.$strip>]>>;
    }, Schema.core.$strip>>;
    desktop: Schema.ZodOptional<Schema.ZodObject<{
      app: Schema.ZodOptional<Schema.ZodObject<{
        name: Schema.ZodOptional<Schema.ZodString>;
        identifier: Schema.ZodOptional<Schema.ZodString>;
        icons: Schema.ZodOptional<Schema.ZodObject<{
          macos: Schema.ZodOptional<Schema.ZodString>;
          windows: Schema.ZodOptional<Schema.ZodString>;
          linux: Schema.ZodOptional<Schema.ZodString>;
        }, Schema.core.$strip>>;
        deepLinks: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      }, Schema.core.$strip>>;
      backend: Schema.ZodOptional<Schema.ZodEnum<{
        cef: "cef";
        webview: "webview";
      }>>;
      output: Schema.ZodOptional<Schema.ZodObject<{
        macos: Schema.ZodOptional<Schema.ZodString>;
        windows: Schema.ZodOptional<Schema.ZodString>;
        linux: Schema.ZodOptional<Schema.ZodString>;
      }, Schema.core.$strip>>;
      release: Schema.ZodOptional<Schema.ZodObject<{
        baseUrl: Schema.ZodOptional<Schema.ZodString>;
      }, Schema.core.$strip>>;
    }, Schema.core.$strip>>;
    compilerOptions: Schema.ZodOptional<Schema.ZodObject<{
      allowJs: Schema.ZodOptional<Schema.ZodBoolean>;
      allowUnreachableCode: Schema.ZodOptional<Schema.ZodBoolean>;
      allowUnusedLabels: Schema.ZodOptional<Schema.ZodBoolean>;
      checkJs: Schema.ZodOptional<Schema.ZodBoolean>;
      emitDecoratorMetadata: Schema.ZodOptional<Schema.ZodBoolean>;
      erasableSyntaxOnly: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      exactOptionalPropertyTypes: Schema.ZodOptional<Schema.ZodBoolean>;
      experimentalDecorators: Schema.ZodOptional<Schema.ZodBoolean>;
      isolatedDeclarations: Schema.ZodOptional<Schema.ZodBoolean>;
      jsx: Schema.ZodOptional<Schema.ZodEnum<{
        precompile: "precompile";
        preserve: "preserve";
        react: "react";
        "react-jsx": "react-jsx";
        "react-jsxdev": "react-jsxdev";
        "react-native": "react-native";
      }>>;
      jsxFactory: Schema.ZodOptional<Schema.ZodString>;
      jsxFragmentFactory: Schema.ZodOptional<Schema.ZodString>;
      jsxImportSource: Schema.ZodOptional<Schema.ZodString>;
      jsxImportSourceTypes: Schema.ZodOptional<Schema.ZodString>;
      jsxPrecompileSkipElements: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      lib: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      module: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      moduleResolution: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      noErrorTruncation: Schema.ZodOptional<Schema.ZodBoolean>;
      noFallthroughCasesInSwitch: Schema.ZodOptional<Schema.ZodBoolean>;
      noImplicitAny: Schema.ZodOptional<Schema.ZodBoolean>;
      noImplicitOverride: Schema.ZodOptional<Schema.ZodBoolean>;
      noImplicitReturns: Schema.ZodOptional<Schema.ZodBoolean>;
      noImplicitThis: Schema.ZodOptional<Schema.ZodBoolean>;
      noPropertyAccessFromIndexSignature: Schema.ZodOptional<Schema.ZodBoolean>;
      noUncheckedIndexedAccess: Schema.ZodOptional<Schema.ZodBoolean>;
      noUnusedLocals: Schema.ZodOptional<Schema.ZodBoolean>;
      noUnusedParameters: Schema.ZodOptional<Schema.ZodBoolean>;
      baseUrl: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      paths: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodRecord<Schema.ZodString, Schema.ZodNullable<Schema.ZodArray<Schema.ZodNullable<Schema.ZodString>>>>>>;
      rootDirs: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      skipLibCheck: Schema.ZodOptional<Schema.ZodBoolean>;
      strict: Schema.ZodOptional<Schema.ZodBoolean>;
      strictBindCallApply: Schema.ZodOptional<Schema.ZodBoolean>;
      strictBuiltinIteratorReturn: Schema.ZodOptional<Schema.ZodBoolean>;
      strictFunctionTypes: Schema.ZodOptional<Schema.ZodBoolean>;
      strictNullChecks: Schema.ZodOptional<Schema.ZodBoolean>;
      strictPropertyInitialization: Schema.ZodOptional<Schema.ZodBoolean>;
      types: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      useUnknownInCatchVariables: Schema.ZodOptional<Schema.ZodBoolean>;
      verbatimModuleSyntax: Schema.ZodOptional<Schema.ZodBoolean>;
    }, Schema.core.$strip>>;
    deploy: Schema.ZodOptional<Schema.ZodObject<{
      org: Schema.ZodOptional<Schema.ZodString>;
      app: Schema.ZodOptional<Schema.ZodString>;
      framework: Schema.ZodOptional<Schema.ZodString>;
      install: Schema.ZodOptional<Schema.ZodString>;
      build: Schema.ZodOptional<Schema.ZodString>;
      predeploy: Schema.ZodOptional<Schema.ZodString>;
      runtime: Schema.ZodOptional<Schema.ZodObject<{
        mode: Schema.ZodOptional<Schema.ZodEnum<{
          dynamic: "dynamic";
          static: "static";
        }>>;
        entrypoint: Schema.ZodOptional<Schema.ZodString>;
        args: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
        cwd: Schema.ZodOptional<Schema.ZodString>;
        spa: Schema.ZodOptional<Schema.ZodBoolean>;
      }, Schema.core.$strip>>;
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>>;
    importMap: Schema.ZodOptional<Schema.ZodString>;
    catalog: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
    catalogs: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>;
    imports: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
    scopes: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>;
    exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    lint: Schema.ZodOptional<Schema.ZodObject<{
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      plugins: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      rules: Schema.ZodOptional<Schema.ZodObject<{
        tags: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
        exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
        include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      }, Schema.core.$strip>>;
      report: Schema.ZodOptional<Schema.ZodEnum<{
        compact: "compact";
        json: "json";
        pretty: "pretty";
      }>>;
    }, Schema.core.$strip>>;
    fmt: Schema.ZodOptional<Schema.ZodObject<{
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      useTabs: Schema.ZodOptional<Schema.ZodBoolean>;
      lineWidth: Schema.ZodOptional<Schema.ZodNumber>;
      indentWidth: Schema.ZodOptional<Schema.ZodNumber>;
      singleQuote: Schema.ZodOptional<Schema.ZodBoolean>;
      proseWrap: Schema.ZodOptional<Schema.ZodEnum<{
        always: "always";
        never: "never";
        preserve: "preserve";
      }>>;
      semiColons: Schema.ZodOptional<Schema.ZodBoolean>;
      quoteProps: Schema.ZodOptional<Schema.ZodEnum<{
        asNeeded: "asNeeded";
        consistent: "consistent";
        preserve: "preserve";
      }>>;
      newLineKind: Schema.ZodOptional<Schema.ZodEnum<{
        auto: "auto";
        crlf: "crlf";
        lf: "lf";
        system: "system";
      }>>;
      useBraces: Schema.ZodOptional<Schema.ZodEnum<{
        always: "always";
        maintain: "maintain";
        preferNone: "preferNone";
        whenNotSingleLine: "whenNotSingleLine";
      }>>;
      bracePosition: Schema.ZodOptional<Schema.ZodEnum<{
        maintain: "maintain";
        nextLine: "nextLine";
        sameLine: "sameLine";
        sameLineUnlessHanging: "sameLineUnlessHanging";
      }>>;
      singleBodyPosition: Schema.ZodOptional<Schema.ZodEnum<{
        maintain: "maintain";
        nextLine: "nextLine";
        sameLine: "sameLine";
      }>>;
      nextControlFlowPosition: Schema.ZodOptional<Schema.ZodEnum<{
        maintain: "maintain";
        nextLine: "nextLine";
        sameLine: "sameLine";
      }>>;
      trailingCommas: Schema.ZodOptional<Schema.ZodEnum<{
        always: "always";
        never: "never";
        onlyMultiLine: "onlyMultiLine";
      }>>;
      "json.trailingCommas": Schema.ZodOptional<Schema.ZodEnum<{
        always: "always";
        jsonc: "jsonc";
        maintain: "maintain";
        never: "never";
      }>>;
      operatorPosition: Schema.ZodOptional<Schema.ZodEnum<{
        maintain: "maintain";
        nextLine: "nextLine";
        sameLine: "sameLine";
      }>>;
      "jsx.bracketPosition": Schema.ZodOptional<Schema.ZodEnum<{
        maintain: "maintain";
        nextLine: "nextLine";
        sameLine: "sameLine";
      }>>;
      "jsx.forceNewLinesSurroundingContent": Schema.ZodOptional<Schema.ZodBoolean>;
      "jsx.multiLineParens": Schema.ZodOptional<Schema.ZodEnum<{
        always: "always";
        never: "never";
        prefer: "prefer";
      }>>;
      "typeLiteral.separatorKind": Schema.ZodOptional<Schema.ZodEnum<{
        comma: "comma";
        semiColon: "semiColon";
      }>>;
      spaceAround: Schema.ZodOptional<Schema.ZodBoolean>;
      spaceSurroundingProperties: Schema.ZodOptional<Schema.ZodBoolean>;
      vueComponentCase: Schema.ZodOptional<Schema.ZodEnum<{
        ignore: "ignore";
        "kebab-case": "kebab-case";
        "pascal-case": "pascal-case";
      }>>;
      angularNextControlFlowSameLine: Schema.ZodOptional<Schema.ZodBoolean>;
      sortNamedImports: Schema.ZodOptional<Schema.ZodEnum<{
        caseInsensitive: "caseInsensitive";
        caseSensitive: "caseSensitive";
        maintain: "maintain";
      }>>;
      sortNamedExports: Schema.ZodOptional<Schema.ZodEnum<{
        caseInsensitive: "caseInsensitive";
        caseSensitive: "caseSensitive";
        maintain: "maintain";
      }>>;
      useEditorConfig: Schema.ZodOptional<Schema.ZodBoolean>;
      options: Schema.ZodOptional<Schema.ZodObject<{
        useTabs: Schema.ZodOptional<Schema.ZodBoolean>;
        lineWidth: Schema.ZodOptional<Schema.ZodNumber>;
        indentWidth: Schema.ZodOptional<Schema.ZodNumber>;
        singleQuote: Schema.ZodOptional<Schema.ZodBoolean>;
        proseWrap: Schema.ZodOptional<Schema.ZodEnum<{
          always: "always";
          never: "never";
          preserve: "preserve";
        }>>;
        semiColons: Schema.ZodOptional<Schema.ZodBoolean>;
      }, Schema.core.$strip>>;
    }, Schema.core.$strip>>;
    minimumDependencyAge: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodNumber]>, Schema.ZodObject<{
      age: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodNumber]>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>]>>;
    nodeModulesDir: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodEnum<{
      auto: "auto";
      manual: "manual";
      none: "none";
    }>, Schema.ZodBoolean]>>;
    vendor: Schema.ZodOptional<Schema.ZodBoolean>;
    jsrDepsInNodeModules: Schema.ZodOptional<Schema.ZodBoolean>;
    preferPackageJson: Schema.ZodOptional<Schema.ZodBoolean>;
    tasks: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      description: Schema.ZodOptional<Schema.ZodString>;
      command: Schema.ZodOptional<Schema.ZodString>;
      dependencies: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      files: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      output: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      env: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>]>>>;
    test: Schema.ZodOptional<Schema.ZodObject<{
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      permissions: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
        all: Schema.ZodOptional<Schema.ZodBoolean>;
        read: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        write: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        import: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        env: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        net: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        run: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        ffi: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        sys: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
      }, Schema.core.$strip>]>>;
      sanitizeOps: Schema.ZodOptional<Schema.ZodBoolean>;
      sanitizeResources: Schema.ZodOptional<Schema.ZodBoolean>;
    }, Schema.core.$strip>>;
    publish: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>, Schema.ZodLiteral<false>]>>;
    bench: Schema.ZodOptional<Schema.ZodObject<{
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      permissions: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
        all: Schema.ZodOptional<Schema.ZodBoolean>;
        read: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        write: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        import: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        env: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        net: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        run: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        ffi: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        sys: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
      }, Schema.core.$strip>]>>;
    }, Schema.core.$strip>>;
    coverage: Schema.ZodOptional<Schema.ZodObject<{
      thresholds: Schema.ZodOptional<Schema.ZodObject<{
        lines: Schema.ZodOptional<Schema.ZodNumber>;
        branches: Schema.ZodOptional<Schema.ZodNumber>;
        functions: Schema.ZodOptional<Schema.ZodNumber>;
      }, Schema.core.$strip>>;
    }, Schema.core.$strip>>;
    license: Schema.ZodOptional<Schema.ZodString>;
    lock: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodBoolean, Schema.ZodObject<{
      path: Schema.ZodOptional<Schema.ZodString>;
      frozen: Schema.ZodOptional<Schema.ZodBoolean>;
    }, Schema.core.$strip>]>>;
    unstable: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    name: Schema.ZodOptional<Schema.ZodString>;
    version: Schema.ZodOptional<Schema.ZodString>;
    exports: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodString>]>>;
    permissions: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodObject<{
      all: Schema.ZodOptional<Schema.ZodBoolean>;
      read: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      write: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      import: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      env: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      net: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      run: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      ffi: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      sys: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
    }, Schema.core.$strip>>>;
    patch: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    links: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    workspace: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodArray<Schema.ZodString>, Schema.ZodObject<{
      members: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>]>>;
  }, Schema.core.$strip>>;
  (options: UserConfigExport<Schema.ZodObject<{
    allowScripts: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>, Schema.ZodObject<{
      allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      deny: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>]>>;
    compile: Schema.ZodOptional<Schema.ZodObject<{
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      permissions: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
        all: Schema.ZodOptional<Schema.ZodBoolean>;
        read: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        write: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        import: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        env: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        net: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        run: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        ffi: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        sys: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
      }, Schema.core.$strip>]>>;
    }, Schema.core.$strip>>;
    desktop: Schema.ZodOptional<Schema.ZodObject<{
      app: Schema.ZodOptional<Schema.ZodObject<{
        name: Schema.ZodOptional<Schema.ZodString>;
        identifier: Schema.ZodOptional<Schema.ZodString>;
        icons: Schema.ZodOptional<Schema.ZodObject<{
          macos: Schema.ZodOptional<Schema.ZodString>;
          windows: Schema.ZodOptional<Schema.ZodString>;
          linux: Schema.ZodOptional<Schema.ZodString>;
        }, Schema.core.$strip>>;
        deepLinks: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      }, Schema.core.$strip>>;
      backend: Schema.ZodOptional<Schema.ZodEnum<{
        cef: "cef";
        webview: "webview";
      }>>;
      output: Schema.ZodOptional<Schema.ZodObject<{
        macos: Schema.ZodOptional<Schema.ZodString>;
        windows: Schema.ZodOptional<Schema.ZodString>;
        linux: Schema.ZodOptional<Schema.ZodString>;
      }, Schema.core.$strip>>;
      release: Schema.ZodOptional<Schema.ZodObject<{
        baseUrl: Schema.ZodOptional<Schema.ZodString>;
      }, Schema.core.$strip>>;
    }, Schema.core.$strip>>;
    compilerOptions: Schema.ZodOptional<Schema.ZodObject<{
      allowJs: Schema.ZodOptional<Schema.ZodBoolean>;
      allowUnreachableCode: Schema.ZodOptional<Schema.ZodBoolean>;
      allowUnusedLabels: Schema.ZodOptional<Schema.ZodBoolean>;
      checkJs: Schema.ZodOptional<Schema.ZodBoolean>;
      emitDecoratorMetadata: Schema.ZodOptional<Schema.ZodBoolean>;
      erasableSyntaxOnly: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      exactOptionalPropertyTypes: Schema.ZodOptional<Schema.ZodBoolean>;
      experimentalDecorators: Schema.ZodOptional<Schema.ZodBoolean>;
      isolatedDeclarations: Schema.ZodOptional<Schema.ZodBoolean>;
      jsx: Schema.ZodOptional<Schema.ZodEnum<{
        precompile: "precompile";
        preserve: "preserve";
        react: "react";
        "react-jsx": "react-jsx";
        "react-jsxdev": "react-jsxdev";
        "react-native": "react-native";
      }>>;
      jsxFactory: Schema.ZodOptional<Schema.ZodString>;
      jsxFragmentFactory: Schema.ZodOptional<Schema.ZodString>;
      jsxImportSource: Schema.ZodOptional<Schema.ZodString>;
      jsxImportSourceTypes: Schema.ZodOptional<Schema.ZodString>;
      jsxPrecompileSkipElements: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      lib: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      module: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      moduleResolution: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      noErrorTruncation: Schema.ZodOptional<Schema.ZodBoolean>;
      noFallthroughCasesInSwitch: Schema.ZodOptional<Schema.ZodBoolean>;
      noImplicitAny: Schema.ZodOptional<Schema.ZodBoolean>;
      noImplicitOverride: Schema.ZodOptional<Schema.ZodBoolean>;
      noImplicitReturns: Schema.ZodOptional<Schema.ZodBoolean>;
      noImplicitThis: Schema.ZodOptional<Schema.ZodBoolean>;
      noPropertyAccessFromIndexSignature: Schema.ZodOptional<Schema.ZodBoolean>;
      noUncheckedIndexedAccess: Schema.ZodOptional<Schema.ZodBoolean>;
      noUnusedLocals: Schema.ZodOptional<Schema.ZodBoolean>;
      noUnusedParameters: Schema.ZodOptional<Schema.ZodBoolean>;
      baseUrl: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      paths: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodRecord<Schema.ZodString, Schema.ZodNullable<Schema.ZodArray<Schema.ZodNullable<Schema.ZodString>>>>>>;
      rootDirs: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      skipLibCheck: Schema.ZodOptional<Schema.ZodBoolean>;
      strict: Schema.ZodOptional<Schema.ZodBoolean>;
      strictBindCallApply: Schema.ZodOptional<Schema.ZodBoolean>;
      strictBuiltinIteratorReturn: Schema.ZodOptional<Schema.ZodBoolean>;
      strictFunctionTypes: Schema.ZodOptional<Schema.ZodBoolean>;
      strictNullChecks: Schema.ZodOptional<Schema.ZodBoolean>;
      strictPropertyInitialization: Schema.ZodOptional<Schema.ZodBoolean>;
      types: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      useUnknownInCatchVariables: Schema.ZodOptional<Schema.ZodBoolean>;
      verbatimModuleSyntax: Schema.ZodOptional<Schema.ZodBoolean>;
    }, Schema.core.$strip>>;
    deploy: Schema.ZodOptional<Schema.ZodObject<{
      org: Schema.ZodOptional<Schema.ZodString>;
      app: Schema.ZodOptional<Schema.ZodString>;
      framework: Schema.ZodOptional<Schema.ZodString>;
      install: Schema.ZodOptional<Schema.ZodString>;
      build: Schema.ZodOptional<Schema.ZodString>;
      predeploy: Schema.ZodOptional<Schema.ZodString>;
      runtime: Schema.ZodOptional<Schema.ZodObject<{
        mode: Schema.ZodOptional<Schema.ZodEnum<{
          dynamic: "dynamic";
          static: "static";
        }>>;
        entrypoint: Schema.ZodOptional<Schema.ZodString>;
        args: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
        cwd: Schema.ZodOptional<Schema.ZodString>;
        spa: Schema.ZodOptional<Schema.ZodBoolean>;
      }, Schema.core.$strip>>;
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>>;
    importMap: Schema.ZodOptional<Schema.ZodString>;
    catalog: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
    catalogs: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>;
    imports: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
    scopes: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>;
    exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    lint: Schema.ZodOptional<Schema.ZodObject<{
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      plugins: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      rules: Schema.ZodOptional<Schema.ZodObject<{
        tags: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
        exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
        include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      }, Schema.core.$strip>>;
      report: Schema.ZodOptional<Schema.ZodEnum<{
        compact: "compact";
        json: "json";
        pretty: "pretty";
      }>>;
    }, Schema.core.$strip>>;
    fmt: Schema.ZodOptional<Schema.ZodObject<{
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      useTabs: Schema.ZodOptional<Schema.ZodBoolean>;
      lineWidth: Schema.ZodOptional<Schema.ZodNumber>;
      indentWidth: Schema.ZodOptional<Schema.ZodNumber>;
      singleQuote: Schema.ZodOptional<Schema.ZodBoolean>;
      proseWrap: Schema.ZodOptional<Schema.ZodEnum<{
        always: "always";
        never: "never";
        preserve: "preserve";
      }>>;
      semiColons: Schema.ZodOptional<Schema.ZodBoolean>;
      quoteProps: Schema.ZodOptional<Schema.ZodEnum<{
        asNeeded: "asNeeded";
        consistent: "consistent";
        preserve: "preserve";
      }>>;
      newLineKind: Schema.ZodOptional<Schema.ZodEnum<{
        auto: "auto";
        crlf: "crlf";
        lf: "lf";
        system: "system";
      }>>;
      useBraces: Schema.ZodOptional<Schema.ZodEnum<{
        always: "always";
        maintain: "maintain";
        preferNone: "preferNone";
        whenNotSingleLine: "whenNotSingleLine";
      }>>;
      bracePosition: Schema.ZodOptional<Schema.ZodEnum<{
        maintain: "maintain";
        nextLine: "nextLine";
        sameLine: "sameLine";
        sameLineUnlessHanging: "sameLineUnlessHanging";
      }>>;
      singleBodyPosition: Schema.ZodOptional<Schema.ZodEnum<{
        maintain: "maintain";
        nextLine: "nextLine";
        sameLine: "sameLine";
      }>>;
      nextControlFlowPosition: Schema.ZodOptional<Schema.ZodEnum<{
        maintain: "maintain";
        nextLine: "nextLine";
        sameLine: "sameLine";
      }>>;
      trailingCommas: Schema.ZodOptional<Schema.ZodEnum<{
        always: "always";
        never: "never";
        onlyMultiLine: "onlyMultiLine";
      }>>;
      "json.trailingCommas": Schema.ZodOptional<Schema.ZodEnum<{
        always: "always";
        jsonc: "jsonc";
        maintain: "maintain";
        never: "never";
      }>>;
      operatorPosition: Schema.ZodOptional<Schema.ZodEnum<{
        maintain: "maintain";
        nextLine: "nextLine";
        sameLine: "sameLine";
      }>>;
      "jsx.bracketPosition": Schema.ZodOptional<Schema.ZodEnum<{
        maintain: "maintain";
        nextLine: "nextLine";
        sameLine: "sameLine";
      }>>;
      "jsx.forceNewLinesSurroundingContent": Schema.ZodOptional<Schema.ZodBoolean>;
      "jsx.multiLineParens": Schema.ZodOptional<Schema.ZodEnum<{
        always: "always";
        never: "never";
        prefer: "prefer";
      }>>;
      "typeLiteral.separatorKind": Schema.ZodOptional<Schema.ZodEnum<{
        comma: "comma";
        semiColon: "semiColon";
      }>>;
      spaceAround: Schema.ZodOptional<Schema.ZodBoolean>;
      spaceSurroundingProperties: Schema.ZodOptional<Schema.ZodBoolean>;
      vueComponentCase: Schema.ZodOptional<Schema.ZodEnum<{
        ignore: "ignore";
        "kebab-case": "kebab-case";
        "pascal-case": "pascal-case";
      }>>;
      angularNextControlFlowSameLine: Schema.ZodOptional<Schema.ZodBoolean>;
      sortNamedImports: Schema.ZodOptional<Schema.ZodEnum<{
        caseInsensitive: "caseInsensitive";
        caseSensitive: "caseSensitive";
        maintain: "maintain";
      }>>;
      sortNamedExports: Schema.ZodOptional<Schema.ZodEnum<{
        caseInsensitive: "caseInsensitive";
        caseSensitive: "caseSensitive";
        maintain: "maintain";
      }>>;
      useEditorConfig: Schema.ZodOptional<Schema.ZodBoolean>;
      options: Schema.ZodOptional<Schema.ZodObject<{
        useTabs: Schema.ZodOptional<Schema.ZodBoolean>;
        lineWidth: Schema.ZodOptional<Schema.ZodNumber>;
        indentWidth: Schema.ZodOptional<Schema.ZodNumber>;
        singleQuote: Schema.ZodOptional<Schema.ZodBoolean>;
        proseWrap: Schema.ZodOptional<Schema.ZodEnum<{
          always: "always";
          never: "never";
          preserve: "preserve";
        }>>;
        semiColons: Schema.ZodOptional<Schema.ZodBoolean>;
      }, Schema.core.$strip>>;
    }, Schema.core.$strip>>;
    minimumDependencyAge: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodNumber]>, Schema.ZodObject<{
      age: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodNumber]>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>]>>;
    nodeModulesDir: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodEnum<{
      auto: "auto";
      manual: "manual";
      none: "none";
    }>, Schema.ZodBoolean]>>;
    vendor: Schema.ZodOptional<Schema.ZodBoolean>;
    jsrDepsInNodeModules: Schema.ZodOptional<Schema.ZodBoolean>;
    preferPackageJson: Schema.ZodOptional<Schema.ZodBoolean>;
    tasks: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      description: Schema.ZodOptional<Schema.ZodString>;
      command: Schema.ZodOptional<Schema.ZodString>;
      dependencies: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      files: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      output: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      env: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>]>>>;
    test: Schema.ZodOptional<Schema.ZodObject<{
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      permissions: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
        all: Schema.ZodOptional<Schema.ZodBoolean>;
        read: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        write: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        import: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        env: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        net: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        run: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        ffi: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        sys: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
      }, Schema.core.$strip>]>>;
      sanitizeOps: Schema.ZodOptional<Schema.ZodBoolean>;
      sanitizeResources: Schema.ZodOptional<Schema.ZodBoolean>;
    }, Schema.core.$strip>>;
    publish: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>, Schema.ZodLiteral<false>]>>;
    bench: Schema.ZodOptional<Schema.ZodObject<{
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      permissions: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
        all: Schema.ZodOptional<Schema.ZodBoolean>;
        read: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        write: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        import: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        env: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        net: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        run: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        ffi: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        sys: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
      }, Schema.core.$strip>]>>;
    }, Schema.core.$strip>>;
    coverage: Schema.ZodOptional<Schema.ZodObject<{
      thresholds: Schema.ZodOptional<Schema.ZodObject<{
        lines: Schema.ZodOptional<Schema.ZodNumber>;
        branches: Schema.ZodOptional<Schema.ZodNumber>;
        functions: Schema.ZodOptional<Schema.ZodNumber>;
      }, Schema.core.$strip>>;
    }, Schema.core.$strip>>;
    license: Schema.ZodOptional<Schema.ZodString>;
    lock: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodBoolean, Schema.ZodObject<{
      path: Schema.ZodOptional<Schema.ZodString>;
      frozen: Schema.ZodOptional<Schema.ZodBoolean>;
    }, Schema.core.$strip>]>>;
    unstable: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    name: Schema.ZodOptional<Schema.ZodString>;
    version: Schema.ZodOptional<Schema.ZodString>;
    exports: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodString>]>>;
    permissions: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodObject<{
      all: Schema.ZodOptional<Schema.ZodBoolean>;
      read: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      write: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      import: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      env: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      net: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      run: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      ffi: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      sys: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
    }, Schema.core.$strip>>>;
    patch: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    links: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    workspace: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodArray<Schema.ZodString>, Schema.ZodObject<{
      members: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>]>>;
  }, Schema.core.$strip>>): UserConfigExport<Schema.ZodObject<{
    allowScripts: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>, Schema.ZodObject<{
      allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      deny: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>]>>;
    compile: Schema.ZodOptional<Schema.ZodObject<{
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      permissions: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
        all: Schema.ZodOptional<Schema.ZodBoolean>;
        read: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        write: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        import: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        env: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        net: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        run: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        ffi: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        sys: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
      }, Schema.core.$strip>]>>;
    }, Schema.core.$strip>>;
    desktop: Schema.ZodOptional<Schema.ZodObject<{
      app: Schema.ZodOptional<Schema.ZodObject<{
        name: Schema.ZodOptional<Schema.ZodString>;
        identifier: Schema.ZodOptional<Schema.ZodString>;
        icons: Schema.ZodOptional<Schema.ZodObject<{
          macos: Schema.ZodOptional<Schema.ZodString>;
          windows: Schema.ZodOptional<Schema.ZodString>;
          linux: Schema.ZodOptional<Schema.ZodString>;
        }, Schema.core.$strip>>;
        deepLinks: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      }, Schema.core.$strip>>;
      backend: Schema.ZodOptional<Schema.ZodEnum<{
        cef: "cef";
        webview: "webview";
      }>>;
      output: Schema.ZodOptional<Schema.ZodObject<{
        macos: Schema.ZodOptional<Schema.ZodString>;
        windows: Schema.ZodOptional<Schema.ZodString>;
        linux: Schema.ZodOptional<Schema.ZodString>;
      }, Schema.core.$strip>>;
      release: Schema.ZodOptional<Schema.ZodObject<{
        baseUrl: Schema.ZodOptional<Schema.ZodString>;
      }, Schema.core.$strip>>;
    }, Schema.core.$strip>>;
    compilerOptions: Schema.ZodOptional<Schema.ZodObject<{
      allowJs: Schema.ZodOptional<Schema.ZodBoolean>;
      allowUnreachableCode: Schema.ZodOptional<Schema.ZodBoolean>;
      allowUnusedLabels: Schema.ZodOptional<Schema.ZodBoolean>;
      checkJs: Schema.ZodOptional<Schema.ZodBoolean>;
      emitDecoratorMetadata: Schema.ZodOptional<Schema.ZodBoolean>;
      erasableSyntaxOnly: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      exactOptionalPropertyTypes: Schema.ZodOptional<Schema.ZodBoolean>;
      experimentalDecorators: Schema.ZodOptional<Schema.ZodBoolean>;
      isolatedDeclarations: Schema.ZodOptional<Schema.ZodBoolean>;
      jsx: Schema.ZodOptional<Schema.ZodEnum<{
        precompile: "precompile";
        preserve: "preserve";
        react: "react";
        "react-jsx": "react-jsx";
        "react-jsxdev": "react-jsxdev";
        "react-native": "react-native";
      }>>;
      jsxFactory: Schema.ZodOptional<Schema.ZodString>;
      jsxFragmentFactory: Schema.ZodOptional<Schema.ZodString>;
      jsxImportSource: Schema.ZodOptional<Schema.ZodString>;
      jsxImportSourceTypes: Schema.ZodOptional<Schema.ZodString>;
      jsxPrecompileSkipElements: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      lib: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      module: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      moduleResolution: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      noErrorTruncation: Schema.ZodOptional<Schema.ZodBoolean>;
      noFallthroughCasesInSwitch: Schema.ZodOptional<Schema.ZodBoolean>;
      noImplicitAny: Schema.ZodOptional<Schema.ZodBoolean>;
      noImplicitOverride: Schema.ZodOptional<Schema.ZodBoolean>;
      noImplicitReturns: Schema.ZodOptional<Schema.ZodBoolean>;
      noImplicitThis: Schema.ZodOptional<Schema.ZodBoolean>;
      noPropertyAccessFromIndexSignature: Schema.ZodOptional<Schema.ZodBoolean>;
      noUncheckedIndexedAccess: Schema.ZodOptional<Schema.ZodBoolean>;
      noUnusedLocals: Schema.ZodOptional<Schema.ZodBoolean>;
      noUnusedParameters: Schema.ZodOptional<Schema.ZodBoolean>;
      baseUrl: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      paths: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodRecord<Schema.ZodString, Schema.ZodNullable<Schema.ZodArray<Schema.ZodNullable<Schema.ZodString>>>>>>;
      rootDirs: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      skipLibCheck: Schema.ZodOptional<Schema.ZodBoolean>;
      strict: Schema.ZodOptional<Schema.ZodBoolean>;
      strictBindCallApply: Schema.ZodOptional<Schema.ZodBoolean>;
      strictBuiltinIteratorReturn: Schema.ZodOptional<Schema.ZodBoolean>;
      strictFunctionTypes: Schema.ZodOptional<Schema.ZodBoolean>;
      strictNullChecks: Schema.ZodOptional<Schema.ZodBoolean>;
      strictPropertyInitialization: Schema.ZodOptional<Schema.ZodBoolean>;
      types: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      useUnknownInCatchVariables: Schema.ZodOptional<Schema.ZodBoolean>;
      verbatimModuleSyntax: Schema.ZodOptional<Schema.ZodBoolean>;
    }, Schema.core.$strip>>;
    deploy: Schema.ZodOptional<Schema.ZodObject<{
      org: Schema.ZodOptional<Schema.ZodString>;
      app: Schema.ZodOptional<Schema.ZodString>;
      framework: Schema.ZodOptional<Schema.ZodString>;
      install: Schema.ZodOptional<Schema.ZodString>;
      build: Schema.ZodOptional<Schema.ZodString>;
      predeploy: Schema.ZodOptional<Schema.ZodString>;
      runtime: Schema.ZodOptional<Schema.ZodObject<{
        mode: Schema.ZodOptional<Schema.ZodEnum<{
          dynamic: "dynamic";
          static: "static";
        }>>;
        entrypoint: Schema.ZodOptional<Schema.ZodString>;
        args: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
        cwd: Schema.ZodOptional<Schema.ZodString>;
        spa: Schema.ZodOptional<Schema.ZodBoolean>;
      }, Schema.core.$strip>>;
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>>;
    importMap: Schema.ZodOptional<Schema.ZodString>;
    catalog: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
    catalogs: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>;
    imports: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
    scopes: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>;
    exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    lint: Schema.ZodOptional<Schema.ZodObject<{
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      plugins: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      rules: Schema.ZodOptional<Schema.ZodObject<{
        tags: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
        exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
        include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      }, Schema.core.$strip>>;
      report: Schema.ZodOptional<Schema.ZodEnum<{
        compact: "compact";
        json: "json";
        pretty: "pretty";
      }>>;
    }, Schema.core.$strip>>;
    fmt: Schema.ZodOptional<Schema.ZodObject<{
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      useTabs: Schema.ZodOptional<Schema.ZodBoolean>;
      lineWidth: Schema.ZodOptional<Schema.ZodNumber>;
      indentWidth: Schema.ZodOptional<Schema.ZodNumber>;
      singleQuote: Schema.ZodOptional<Schema.ZodBoolean>;
      proseWrap: Schema.ZodOptional<Schema.ZodEnum<{
        always: "always";
        never: "never";
        preserve: "preserve";
      }>>;
      semiColons: Schema.ZodOptional<Schema.ZodBoolean>;
      quoteProps: Schema.ZodOptional<Schema.ZodEnum<{
        asNeeded: "asNeeded";
        consistent: "consistent";
        preserve: "preserve";
      }>>;
      newLineKind: Schema.ZodOptional<Schema.ZodEnum<{
        auto: "auto";
        crlf: "crlf";
        lf: "lf";
        system: "system";
      }>>;
      useBraces: Schema.ZodOptional<Schema.ZodEnum<{
        always: "always";
        maintain: "maintain";
        preferNone: "preferNone";
        whenNotSingleLine: "whenNotSingleLine";
      }>>;
      bracePosition: Schema.ZodOptional<Schema.ZodEnum<{
        maintain: "maintain";
        nextLine: "nextLine";
        sameLine: "sameLine";
        sameLineUnlessHanging: "sameLineUnlessHanging";
      }>>;
      singleBodyPosition: Schema.ZodOptional<Schema.ZodEnum<{
        maintain: "maintain";
        nextLine: "nextLine";
        sameLine: "sameLine";
      }>>;
      nextControlFlowPosition: Schema.ZodOptional<Schema.ZodEnum<{
        maintain: "maintain";
        nextLine: "nextLine";
        sameLine: "sameLine";
      }>>;
      trailingCommas: Schema.ZodOptional<Schema.ZodEnum<{
        always: "always";
        never: "never";
        onlyMultiLine: "onlyMultiLine";
      }>>;
      "json.trailingCommas": Schema.ZodOptional<Schema.ZodEnum<{
        always: "always";
        jsonc: "jsonc";
        maintain: "maintain";
        never: "never";
      }>>;
      operatorPosition: Schema.ZodOptional<Schema.ZodEnum<{
        maintain: "maintain";
        nextLine: "nextLine";
        sameLine: "sameLine";
      }>>;
      "jsx.bracketPosition": Schema.ZodOptional<Schema.ZodEnum<{
        maintain: "maintain";
        nextLine: "nextLine";
        sameLine: "sameLine";
      }>>;
      "jsx.forceNewLinesSurroundingContent": Schema.ZodOptional<Schema.ZodBoolean>;
      "jsx.multiLineParens": Schema.ZodOptional<Schema.ZodEnum<{
        always: "always";
        never: "never";
        prefer: "prefer";
      }>>;
      "typeLiteral.separatorKind": Schema.ZodOptional<Schema.ZodEnum<{
        comma: "comma";
        semiColon: "semiColon";
      }>>;
      spaceAround: Schema.ZodOptional<Schema.ZodBoolean>;
      spaceSurroundingProperties: Schema.ZodOptional<Schema.ZodBoolean>;
      vueComponentCase: Schema.ZodOptional<Schema.ZodEnum<{
        ignore: "ignore";
        "kebab-case": "kebab-case";
        "pascal-case": "pascal-case";
      }>>;
      angularNextControlFlowSameLine: Schema.ZodOptional<Schema.ZodBoolean>;
      sortNamedImports: Schema.ZodOptional<Schema.ZodEnum<{
        caseInsensitive: "caseInsensitive";
        caseSensitive: "caseSensitive";
        maintain: "maintain";
      }>>;
      sortNamedExports: Schema.ZodOptional<Schema.ZodEnum<{
        caseInsensitive: "caseInsensitive";
        caseSensitive: "caseSensitive";
        maintain: "maintain";
      }>>;
      useEditorConfig: Schema.ZodOptional<Schema.ZodBoolean>;
      options: Schema.ZodOptional<Schema.ZodObject<{
        useTabs: Schema.ZodOptional<Schema.ZodBoolean>;
        lineWidth: Schema.ZodOptional<Schema.ZodNumber>;
        indentWidth: Schema.ZodOptional<Schema.ZodNumber>;
        singleQuote: Schema.ZodOptional<Schema.ZodBoolean>;
        proseWrap: Schema.ZodOptional<Schema.ZodEnum<{
          always: "always";
          never: "never";
          preserve: "preserve";
        }>>;
        semiColons: Schema.ZodOptional<Schema.ZodBoolean>;
      }, Schema.core.$strip>>;
    }, Schema.core.$strip>>;
    minimumDependencyAge: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodNumber]>, Schema.ZodObject<{
      age: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodNumber]>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>]>>;
    nodeModulesDir: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodEnum<{
      auto: "auto";
      manual: "manual";
      none: "none";
    }>, Schema.ZodBoolean]>>;
    vendor: Schema.ZodOptional<Schema.ZodBoolean>;
    jsrDepsInNodeModules: Schema.ZodOptional<Schema.ZodBoolean>;
    preferPackageJson: Schema.ZodOptional<Schema.ZodBoolean>;
    tasks: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      description: Schema.ZodOptional<Schema.ZodString>;
      command: Schema.ZodOptional<Schema.ZodString>;
      dependencies: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      files: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      output: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      env: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>]>>>;
    test: Schema.ZodOptional<Schema.ZodObject<{
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      permissions: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
        all: Schema.ZodOptional<Schema.ZodBoolean>;
        read: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        write: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        import: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        env: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        net: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        run: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        ffi: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        sys: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
      }, Schema.core.$strip>]>>;
      sanitizeOps: Schema.ZodOptional<Schema.ZodBoolean>;
      sanitizeResources: Schema.ZodOptional<Schema.ZodBoolean>;
    }, Schema.core.$strip>>;
    publish: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>, Schema.ZodLiteral<false>]>>;
    bench: Schema.ZodOptional<Schema.ZodObject<{
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      permissions: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
        all: Schema.ZodOptional<Schema.ZodBoolean>;
        read: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        write: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        import: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        env: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        net: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        run: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        ffi: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        sys: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
      }, Schema.core.$strip>]>>;
    }, Schema.core.$strip>>;
    coverage: Schema.ZodOptional<Schema.ZodObject<{
      thresholds: Schema.ZodOptional<Schema.ZodObject<{
        lines: Schema.ZodOptional<Schema.ZodNumber>;
        branches: Schema.ZodOptional<Schema.ZodNumber>;
        functions: Schema.ZodOptional<Schema.ZodNumber>;
      }, Schema.core.$strip>>;
    }, Schema.core.$strip>>;
    license: Schema.ZodOptional<Schema.ZodString>;
    lock: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodBoolean, Schema.ZodObject<{
      path: Schema.ZodOptional<Schema.ZodString>;
      frozen: Schema.ZodOptional<Schema.ZodBoolean>;
    }, Schema.core.$strip>]>>;
    unstable: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    name: Schema.ZodOptional<Schema.ZodString>;
    version: Schema.ZodOptional<Schema.ZodString>;
    exports: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodString>]>>;
    permissions: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodObject<{
      all: Schema.ZodOptional<Schema.ZodBoolean>;
      read: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      write: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      import: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      env: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      net: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      run: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      ffi: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      sys: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
    }, Schema.core.$strip>>>;
    patch: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    links: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    workspace: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodArray<Schema.ZodString>, Schema.ZodObject<{
      members: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>]>>;
  }, Schema.core.$strip>>;
};
//#endregion
//#region src/models/config/std.d.ts
export declare const DEFAULT_MERGE_WITH_GLOBAL: string[];
export declare const DEFAULT_CODEGEN: {
  in: string;
  out: string;
}[];
//#endregion
//#region src/config.d.ts
/**
 * Inferred configuration value (Zod output) for a given object schema.
 */
export type UserConfig<T extends Schema.ZodObject> = Schema.infer<T>;
/**
 * A factory that produces a configuration value, e.g. for env-driven configs.
 */
export type UserConfigFn<T extends Schema.ZodObject> = (env: NodeJS.ProcessEnv) => UserConfig<T>;
/**
 * Union of everything a {@link defineConfig} call can accept.
 */
export type UserConfigExport<T extends Schema.ZodObject> = UserConfig<T> | UserConfig<T>[] | UserConfigFn<T>;
/**
 * A schema-bound `defineConfig` helper, as produced by
 * {@link createDefineConfig} / {@link createDefineConfigs}.
 */
export type DefineConfig = ReturnType<typeof createDefineConfig>;
/**
 * Build a schema-bound `defineConfig` helper.
 *
 * The returned `defineConfig` validates object/array literals eagerly
 * against `schema`, and passes function factories through untouched (they
 * are validated lazily when invoked).
 */
export declare function createDefineConfig<T extends Schema.ZodObject>(schema: T): {
  (options: UserConfig<T>): UserConfig<T>;
  (options: UserConfig<T>[]): UserConfig<T>[];
  (options: UserConfigFn<T>): UserConfigFn<T>;
  (options: UserConfigExport<T>): UserConfigExport<T>;
};
/**
 * Build one `defineConfig` helper per grouping from any set of config schemas.
 *
 * Groupings are read from the registry via {@link groupingsOf}, so callers
 * never hardcode grouping names. A schema registered under several groupings
 * (an ordered fallback list, e.g. `["database", "app"]`) contributes its fields
 * to each grouping — required under its primary (first) grouping, optional
 * under the rest, because those are only fallback file locations.
 */
export declare function createDefineConfigs(schemas: readonly Schema.ZodObject[]): Map<string, DefineConfig>;
/**
 * Resolve a schema's registered grouping preference list, failing fast when it
 * is missing — the grouping is what names the config file to load.
 */
export declare function requireGroupings(schema: Schema.ZodObject): readonly string[];
/**
 * Distinct ordered grouping-preference lists for any set of config schemas.
 *
 * Schemas are split per preference list with `Map.groupBy` (keyed by the
 * JSON-encoded list, since arrays can't be reliable Map keys) and decoded back
 * into arrays, e.g. `[["app"], ["database", "app"]]`.
 *
 * Feed the result to {@link loadAppConfig}, which walks each list in order and
 * uses the first grouping whose config file exists.
 */
export declare function configPreferences(schemas: readonly Schema.ZodObject[]): string[][];
/**
 * Helper to expand ~ to home directory.
 */
export declare function expandHomeDir(pathStr: string): string;
/** A single resolved config file: which grouping it satisfied and its content. */
export interface LoadedConfigFile {
  /** The grouping that this file satisfied (the first existing one in a list). */
  grouping: string;
  /** The resolved file name, e.g. `app.config.ts` or `app.ts`. */
  file: string;
  /** The file's default-exported config object. */
  config: Record<string, unknown>;
}
/**
 * Load every grouping-preference list, returning the resolved file for each.
 *
 * Tries global candidate directories specified in `mergeWithGlobal` (defaulting to
 * `["~/.config", "~"]`) before loading local config, merging global configs with local
 * config overrides.
 */
export declare function loadConfigFiles(preferences: Iterable<readonly string[]>): Promise<LoadedConfigFile[]>;
/**
 * Load and merge the application config for every grouping-preference list.
 *
 * Distinct lists therefore read from their own files (or fall back to a shared
 * one), and all resolved files are merged into a single object. Also populates
 * {@link defaultConfig}.
 */
export declare function loadAppConfig(preferences?: Iterable<readonly string[]>): Promise<Record<string, unknown>>;
/**
 * Every registered configuration schema.
 *
 * Single source of truth for both the combined schema and the set of groupings
 * used to locate config files, so adding a config module only requires adding
 * it here.
 */
export declare const configSchemas: (Schema.ZodObject<{
  name: Schema.ZodOptional<Schema.ZodString>;
  version: Schema.ZodOptional<Schema.ZodString>;
  description: Schema.ZodOptional<Schema.ZodString>;
  keywords: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  homepage: Schema.ZodOptional<Schema.ZodString>;
  bugs: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
    url: Schema.ZodOptional<Schema.ZodString>;
    email: Schema.ZodOptional<Schema.ZodString>;
  }, Schema.core.$strip>]>>;
  license: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodEnum<{
    "AGPL-3.0-only": "AGPL-3.0-only";
    "Apache-2.0": "Apache-2.0";
    "BSD-2-Clause": "BSD-2-Clause";
    "BSD-3-Clause": "BSD-3-Clause";
    "BSL-1.0": "BSL-1.0";
    "CC0-1.0": "CC0-1.0";
    "CDDL-1.0": "CDDL-1.0";
    "CDDL-1.1": "CDDL-1.1";
    "EPL-1.0": "EPL-1.0";
    "EPL-2.0": "EPL-2.0";
    "GPL-2.0-only": "GPL-2.0-only";
    "GPL-3.0-only": "GPL-3.0-only";
    ISC: "ISC";
    "LGPL-2.0-only": "LGPL-2.0-only";
    "LGPL-2.1-only": "LGPL-2.1-only";
    "LGPL-2.1-or-later": "LGPL-2.1-or-later";
    "LGPL-3.0-only": "LGPL-3.0-only";
    "LGPL-3.0-or-later": "LGPL-3.0-or-later";
    MIT: "MIT";
    "MPL-2.0": "MPL-2.0";
    "MS-PL": "MS-PL";
    UNLICENSED: "UNLICENSED";
  }>]>>;
  licenses: Schema.ZodOptional<Schema.ZodArray<Schema.ZodObject<{
    type: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodEnum<{
      "AGPL-3.0-only": "AGPL-3.0-only";
      "Apache-2.0": "Apache-2.0";
      "BSD-2-Clause": "BSD-2-Clause";
      "BSD-3-Clause": "BSD-3-Clause";
      "BSL-1.0": "BSL-1.0";
      "CC0-1.0": "CC0-1.0";
      "CDDL-1.0": "CDDL-1.0";
      "CDDL-1.1": "CDDL-1.1";
      "EPL-1.0": "EPL-1.0";
      "EPL-2.0": "EPL-2.0";
      "GPL-2.0-only": "GPL-2.0-only";
      "GPL-3.0-only": "GPL-3.0-only";
      ISC: "ISC";
      "LGPL-2.0-only": "LGPL-2.0-only";
      "LGPL-2.1-only": "LGPL-2.1-only";
      "LGPL-2.1-or-later": "LGPL-2.1-or-later";
      "LGPL-3.0-only": "LGPL-3.0-only";
      "LGPL-3.0-or-later": "LGPL-3.0-or-later";
      MIT: "MIT";
      "MPL-2.0": "MPL-2.0";
      "MS-PL": "MS-PL";
      UNLICENSED: "UNLICENSED";
    }>]>>;
    url: Schema.ZodOptional<Schema.ZodString>;
  }, Schema.core.$strip>>>;
  author: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
    name: Schema.ZodString;
    url: Schema.ZodOptional<Schema.ZodString>;
    email: Schema.ZodOptional<Schema.ZodString>;
  }, Schema.core.$strip>]>>;
  contributors: Schema.ZodOptional<Schema.ZodArray<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
    name: Schema.ZodString;
    url: Schema.ZodOptional<Schema.ZodString>;
    email: Schema.ZodOptional<Schema.ZodString>;
  }, Schema.core.$strip>]>>>;
  maintainers: Schema.ZodOptional<Schema.ZodArray<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
    name: Schema.ZodString;
    url: Schema.ZodOptional<Schema.ZodString>;
    email: Schema.ZodOptional<Schema.ZodString>;
  }, Schema.core.$strip>]>>>;
  files: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  main: Schema.ZodOptional<Schema.ZodString>;
  exports: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodNullable<Schema.ZodString>, Schema.ZodRecord<Schema.ZodString, Schema.ZodType<unknown, unknown, Schema.core.$ZodTypeInternals<unknown, unknown>>>, Schema.ZodType<unknown, unknown, Schema.core.$ZodTypeInternals<unknown, unknown>>, Schema.ZodType<unknown, unknown, Schema.core.$ZodTypeInternals<unknown, unknown>>]>>;
  imports: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodType<unknown, unknown, Schema.core.$ZodTypeInternals<unknown, unknown>>>>;
  bin: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodString>]>>;
  type: Schema.ZodDefault<Schema.ZodOptional<Schema.ZodEnum<{
    commonjs: "commonjs";
    module: "module";
  }>>>;
  types: Schema.ZodOptional<Schema.ZodString>;
  typings: Schema.ZodOptional<Schema.ZodString>;
  typesVersions: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodArray<Schema.ZodString>>>>;
  man: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodArray<Schema.ZodString>]>>;
  directories: Schema.ZodOptional<Schema.ZodObject<{
    bin: Schema.ZodOptional<Schema.ZodString>;
    doc: Schema.ZodOptional<Schema.ZodString>;
    example: Schema.ZodOptional<Schema.ZodString>;
    lib: Schema.ZodOptional<Schema.ZodString>;
    man: Schema.ZodOptional<Schema.ZodString>;
    test: Schema.ZodOptional<Schema.ZodString>;
  }, Schema.core.$strip>>;
  repository: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
    type: Schema.ZodOptional<Schema.ZodString>;
    url: Schema.ZodOptional<Schema.ZodString>;
    directory: Schema.ZodOptional<Schema.ZodString>;
  }, Schema.core.$strip>]>>;
  funding: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
    url: Schema.ZodString;
    type: Schema.ZodOptional<Schema.ZodString>;
  }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
    url: Schema.ZodString;
    type: Schema.ZodOptional<Schema.ZodString>;
  }, Schema.core.$strip>]>>]>>;
  scripts: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
  config: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>;
  dependencies: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
  devDependencies: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
  optionalDependencies: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
  peerDependencies: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
  peerDependenciesMeta: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodObject<{
    optional: Schema.ZodOptional<Schema.ZodBoolean>;
  }, Schema.core.$loose>>>;
  bundleDependencies: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodArray<Schema.ZodString>, Schema.ZodBoolean]>>;
  bundledDependencies: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodArray<Schema.ZodString>, Schema.ZodBoolean]>>;
  resolutions: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>;
  overrides: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>;
  packageManager: Schema.ZodOptional<Schema.ZodString>;
  engines: Schema.ZodOptional<Schema.ZodObject<{
    node: Schema.ZodOptional<Schema.ZodString>;
    runtime: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
      name: Schema.ZodString;
      version: Schema.ZodOptional<Schema.ZodString>;
      onFail: Schema.ZodOptional<Schema.ZodEnum<{
        download: "download";
        error: "error";
        ignore: "ignore";
        warn: "warn";
      }>>;
    }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
      name: Schema.ZodString;
      version: Schema.ZodOptional<Schema.ZodString>;
      onFail: Schema.ZodOptional<Schema.ZodEnum<{
        download: "download";
        error: "error";
        ignore: "ignore";
        warn: "warn";
      }>>;
    }, Schema.core.$strip>>]>>;
  }, Schema.core.$catchall<Schema.ZodString>>>;
  volta: Schema.ZodOptional<Schema.ZodObject<{
    extends: Schema.ZodOptional<Schema.ZodString>;
  }, Schema.core.$catchall<Schema.ZodString>>>;
  engineStrict: Schema.ZodOptional<Schema.ZodBoolean>;
  os: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  cpu: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  devEngines: Schema.ZodOptional<Schema.ZodObject<{
    os: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
      name: Schema.ZodString;
      version: Schema.ZodOptional<Schema.ZodString>;
      onFail: Schema.ZodOptional<Schema.ZodEnum<{
        download: "download";
        error: "error";
        ignore: "ignore";
        warn: "warn";
      }>>;
    }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
      name: Schema.ZodString;
      version: Schema.ZodOptional<Schema.ZodString>;
      onFail: Schema.ZodOptional<Schema.ZodEnum<{
        download: "download";
        error: "error";
        ignore: "ignore";
        warn: "warn";
      }>>;
    }, Schema.core.$strip>>]>>;
    cpu: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
      name: Schema.ZodString;
      version: Schema.ZodOptional<Schema.ZodString>;
      onFail: Schema.ZodOptional<Schema.ZodEnum<{
        download: "download";
        error: "error";
        ignore: "ignore";
        warn: "warn";
      }>>;
    }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
      name: Schema.ZodString;
      version: Schema.ZodOptional<Schema.ZodString>;
      onFail: Schema.ZodOptional<Schema.ZodEnum<{
        download: "download";
        error: "error";
        ignore: "ignore";
        warn: "warn";
      }>>;
    }, Schema.core.$strip>>]>>;
    libc: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
      name: Schema.ZodString;
      version: Schema.ZodOptional<Schema.ZodString>;
      onFail: Schema.ZodOptional<Schema.ZodEnum<{
        download: "download";
        error: "error";
        ignore: "ignore";
        warn: "warn";
      }>>;
    }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
      name: Schema.ZodString;
      version: Schema.ZodOptional<Schema.ZodString>;
      onFail: Schema.ZodOptional<Schema.ZodEnum<{
        download: "download";
        error: "error";
        ignore: "ignore";
        warn: "warn";
      }>>;
    }, Schema.core.$strip>>]>>;
    runtime: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
      name: Schema.ZodString;
      version: Schema.ZodOptional<Schema.ZodString>;
      onFail: Schema.ZodOptional<Schema.ZodEnum<{
        download: "download";
        error: "error";
        ignore: "ignore";
        warn: "warn";
      }>>;
    }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
      name: Schema.ZodString;
      version: Schema.ZodOptional<Schema.ZodString>;
      onFail: Schema.ZodOptional<Schema.ZodEnum<{
        download: "download";
        error: "error";
        ignore: "ignore";
        warn: "warn";
      }>>;
    }, Schema.core.$strip>>]>>;
    packageManager: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
      name: Schema.ZodString;
      version: Schema.ZodOptional<Schema.ZodString>;
      onFail: Schema.ZodOptional<Schema.ZodEnum<{
        download: "download";
        error: "error";
        ignore: "ignore";
        warn: "warn";
      }>>;
    }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
      name: Schema.ZodString;
      version: Schema.ZodOptional<Schema.ZodString>;
      onFail: Schema.ZodOptional<Schema.ZodEnum<{
        download: "download";
        error: "error";
        ignore: "ignore";
        warn: "warn";
      }>>;
    }, Schema.core.$strip>>]>>;
  }, Schema.core.$strip>>;
  preferGlobal: Schema.ZodOptional<Schema.ZodBoolean>;
  private: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodEnum<{
    false: "false";
    true: "true";
  }>]>>;
  publishConfig: Schema.ZodOptional<Schema.ZodObject<{
    access: Schema.ZodOptional<Schema.ZodEnum<{
      public: "public";
      restricted: "restricted";
    }>>;
    tag: Schema.ZodOptional<Schema.ZodString>;
    registry: Schema.ZodOptional<Schema.ZodString>;
    provenance: Schema.ZodOptional<Schema.ZodBoolean>;
    directory: Schema.ZodOptional<Schema.ZodString>;
    linkDirectory: Schema.ZodOptional<Schema.ZodBoolean>;
    executableFiles: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  }, Schema.core.$loose>>;
  dist: Schema.ZodOptional<Schema.ZodObject<{
    shasum: Schema.ZodOptional<Schema.ZodString>;
    tarball: Schema.ZodOptional<Schema.ZodString>;
  }, Schema.core.$strip>>;
  readme: Schema.ZodOptional<Schema.ZodString>;
  module: Schema.ZodOptional<Schema.ZodString>;
  esnext: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
    main: Schema.ZodOptional<Schema.ZodString>;
    browser: Schema.ZodOptional<Schema.ZodString>;
  }, Schema.core.$catchall<Schema.ZodString>>]>>;
  workspaces: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodArray<Schema.ZodString>, Schema.ZodObject<{
    packages: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    nohoist: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  }, Schema.core.$strip>]>>;
  allowScripts: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodBoolean>>;
  sideEffects: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
}, Schema.core.$strip> | Schema.ZodObject<{
  config: Schema.ZodDefault<Schema.ZodOptional<Schema.ZodObject<{
    mergeWithGlobal: Schema.ZodDefault<Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>>;
    codegen: Schema.ZodDefault<Schema.ZodOptional<Schema.ZodArray<Schema.ZodObject<{
      in: Schema.ZodString;
      out: Schema.ZodString;
    }, Schema.core.$strip>>>>;
  }, Schema.core.$strip>>>;
}, Schema.core.$strip> | Schema.ZodObject<{
  compilerOptions: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>;
  compileOnSave: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
  typeAcquisition: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodObject<{
    enable: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
    include: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
    exclude: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
  }, Schema.core.$strip>>>;
  extends: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodArray<Schema.ZodString>]>>;
  watchOptions: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodObject<{
    force: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
    watchFile: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
    watchDirectory: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
    fallbackPolling: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
    synchronousWatchDirectory: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
    excludeFiles: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
    excludeDirectories: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
  }, Schema.core.$strip>>>;
  buildOptions: Schema.ZodOptional<Schema.ZodObject<{
    dry: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
    force: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
    verbose: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
    incremental: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
    assumeChangesOnlyAffectDirectDependencies: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
    traceResolution: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
  }, Schema.core.$strip>>;
  "ts-node": Schema.ZodOptional<Schema.ZodNullable<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>>;
  files: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
  exclude: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
  include: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
  references: Schema.ZodOptional<Schema.ZodArray<Schema.ZodObject<{
    path: Schema.ZodString;
  }, Schema.core.$strip>>>;
}, Schema.core.$strip> | Schema.ZodObject<{
  allowScripts: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>, Schema.ZodObject<{
    allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
    deny: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  }, Schema.core.$strip>]>>;
  compile: Schema.ZodOptional<Schema.ZodObject<{
    include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    permissions: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      all: Schema.ZodOptional<Schema.ZodBoolean>;
      read: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      write: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      import: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      env: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      net: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      run: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      ffi: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      sys: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
    }, Schema.core.$strip>]>>;
  }, Schema.core.$strip>>;
  desktop: Schema.ZodOptional<Schema.ZodObject<{
    app: Schema.ZodOptional<Schema.ZodObject<{
      name: Schema.ZodOptional<Schema.ZodString>;
      identifier: Schema.ZodOptional<Schema.ZodString>;
      icons: Schema.ZodOptional<Schema.ZodObject<{
        macos: Schema.ZodOptional<Schema.ZodString>;
        windows: Schema.ZodOptional<Schema.ZodString>;
        linux: Schema.ZodOptional<Schema.ZodString>;
      }, Schema.core.$strip>>;
      deepLinks: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>>;
    backend: Schema.ZodOptional<Schema.ZodEnum<{
      cef: "cef";
      webview: "webview";
    }>>;
    output: Schema.ZodOptional<Schema.ZodObject<{
      macos: Schema.ZodOptional<Schema.ZodString>;
      windows: Schema.ZodOptional<Schema.ZodString>;
      linux: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>>;
    release: Schema.ZodOptional<Schema.ZodObject<{
      baseUrl: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>>;
  }, Schema.core.$strip>>;
  compilerOptions: Schema.ZodOptional<Schema.ZodObject<{
    allowJs: Schema.ZodOptional<Schema.ZodBoolean>;
    allowUnreachableCode: Schema.ZodOptional<Schema.ZodBoolean>;
    allowUnusedLabels: Schema.ZodOptional<Schema.ZodBoolean>;
    checkJs: Schema.ZodOptional<Schema.ZodBoolean>;
    emitDecoratorMetadata: Schema.ZodOptional<Schema.ZodBoolean>;
    erasableSyntaxOnly: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
    exactOptionalPropertyTypes: Schema.ZodOptional<Schema.ZodBoolean>;
    experimentalDecorators: Schema.ZodOptional<Schema.ZodBoolean>;
    isolatedDeclarations: Schema.ZodOptional<Schema.ZodBoolean>;
    jsx: Schema.ZodOptional<Schema.ZodEnum<{
      precompile: "precompile";
      preserve: "preserve";
      react: "react";
      "react-jsx": "react-jsx";
      "react-jsxdev": "react-jsxdev";
      "react-native": "react-native";
    }>>;
    jsxFactory: Schema.ZodOptional<Schema.ZodString>;
    jsxFragmentFactory: Schema.ZodOptional<Schema.ZodString>;
    jsxImportSource: Schema.ZodOptional<Schema.ZodString>;
    jsxImportSourceTypes: Schema.ZodOptional<Schema.ZodString>;
    jsxPrecompileSkipElements: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    lib: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    module: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
    moduleResolution: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
    noErrorTruncation: Schema.ZodOptional<Schema.ZodBoolean>;
    noFallthroughCasesInSwitch: Schema.ZodOptional<Schema.ZodBoolean>;
    noImplicitAny: Schema.ZodOptional<Schema.ZodBoolean>;
    noImplicitOverride: Schema.ZodOptional<Schema.ZodBoolean>;
    noImplicitReturns: Schema.ZodOptional<Schema.ZodBoolean>;
    noImplicitThis: Schema.ZodOptional<Schema.ZodBoolean>;
    noPropertyAccessFromIndexSignature: Schema.ZodOptional<Schema.ZodBoolean>;
    noUncheckedIndexedAccess: Schema.ZodOptional<Schema.ZodBoolean>;
    noUnusedLocals: Schema.ZodOptional<Schema.ZodBoolean>;
    noUnusedParameters: Schema.ZodOptional<Schema.ZodBoolean>;
    baseUrl: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
    paths: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodRecord<Schema.ZodString, Schema.ZodNullable<Schema.ZodArray<Schema.ZodNullable<Schema.ZodString>>>>>>;
    rootDirs: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    skipLibCheck: Schema.ZodOptional<Schema.ZodBoolean>;
    strict: Schema.ZodOptional<Schema.ZodBoolean>;
    strictBindCallApply: Schema.ZodOptional<Schema.ZodBoolean>;
    strictBuiltinIteratorReturn: Schema.ZodOptional<Schema.ZodBoolean>;
    strictFunctionTypes: Schema.ZodOptional<Schema.ZodBoolean>;
    strictNullChecks: Schema.ZodOptional<Schema.ZodBoolean>;
    strictPropertyInitialization: Schema.ZodOptional<Schema.ZodBoolean>;
    types: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    useUnknownInCatchVariables: Schema.ZodOptional<Schema.ZodBoolean>;
    verbatimModuleSyntax: Schema.ZodOptional<Schema.ZodBoolean>;
  }, Schema.core.$strip>>;
  deploy: Schema.ZodOptional<Schema.ZodObject<{
    org: Schema.ZodOptional<Schema.ZodString>;
    app: Schema.ZodOptional<Schema.ZodString>;
    framework: Schema.ZodOptional<Schema.ZodString>;
    install: Schema.ZodOptional<Schema.ZodString>;
    build: Schema.ZodOptional<Schema.ZodString>;
    predeploy: Schema.ZodOptional<Schema.ZodString>;
    runtime: Schema.ZodOptional<Schema.ZodObject<{
      mode: Schema.ZodOptional<Schema.ZodEnum<{
        dynamic: "dynamic";
        static: "static";
      }>>;
      entrypoint: Schema.ZodOptional<Schema.ZodString>;
      args: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      cwd: Schema.ZodOptional<Schema.ZodString>;
      spa: Schema.ZodOptional<Schema.ZodBoolean>;
    }, Schema.core.$strip>>;
    include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  }, Schema.core.$strip>>;
  importMap: Schema.ZodOptional<Schema.ZodString>;
  catalog: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
  catalogs: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>;
  imports: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
  scopes: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>;
  exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  lint: Schema.ZodOptional<Schema.ZodObject<{
    include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    plugins: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    rules: Schema.ZodOptional<Schema.ZodObject<{
      tags: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>>;
    report: Schema.ZodOptional<Schema.ZodEnum<{
      compact: "compact";
      json: "json";
      pretty: "pretty";
    }>>;
  }, Schema.core.$strip>>;
  fmt: Schema.ZodOptional<Schema.ZodObject<{
    include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    useTabs: Schema.ZodOptional<Schema.ZodBoolean>;
    lineWidth: Schema.ZodOptional<Schema.ZodNumber>;
    indentWidth: Schema.ZodOptional<Schema.ZodNumber>;
    singleQuote: Schema.ZodOptional<Schema.ZodBoolean>;
    proseWrap: Schema.ZodOptional<Schema.ZodEnum<{
      always: "always";
      never: "never";
      preserve: "preserve";
    }>>;
    semiColons: Schema.ZodOptional<Schema.ZodBoolean>;
    quoteProps: Schema.ZodOptional<Schema.ZodEnum<{
      asNeeded: "asNeeded";
      consistent: "consistent";
      preserve: "preserve";
    }>>;
    newLineKind: Schema.ZodOptional<Schema.ZodEnum<{
      auto: "auto";
      crlf: "crlf";
      lf: "lf";
      system: "system";
    }>>;
    useBraces: Schema.ZodOptional<Schema.ZodEnum<{
      always: "always";
      maintain: "maintain";
      preferNone: "preferNone";
      whenNotSingleLine: "whenNotSingleLine";
    }>>;
    bracePosition: Schema.ZodOptional<Schema.ZodEnum<{
      maintain: "maintain";
      nextLine: "nextLine";
      sameLine: "sameLine";
      sameLineUnlessHanging: "sameLineUnlessHanging";
    }>>;
    singleBodyPosition: Schema.ZodOptional<Schema.ZodEnum<{
      maintain: "maintain";
      nextLine: "nextLine";
      sameLine: "sameLine";
    }>>;
    nextControlFlowPosition: Schema.ZodOptional<Schema.ZodEnum<{
      maintain: "maintain";
      nextLine: "nextLine";
      sameLine: "sameLine";
    }>>;
    trailingCommas: Schema.ZodOptional<Schema.ZodEnum<{
      always: "always";
      never: "never";
      onlyMultiLine: "onlyMultiLine";
    }>>;
    "json.trailingCommas": Schema.ZodOptional<Schema.ZodEnum<{
      always: "always";
      jsonc: "jsonc";
      maintain: "maintain";
      never: "never";
    }>>;
    operatorPosition: Schema.ZodOptional<Schema.ZodEnum<{
      maintain: "maintain";
      nextLine: "nextLine";
      sameLine: "sameLine";
    }>>;
    "jsx.bracketPosition": Schema.ZodOptional<Schema.ZodEnum<{
      maintain: "maintain";
      nextLine: "nextLine";
      sameLine: "sameLine";
    }>>;
    "jsx.forceNewLinesSurroundingContent": Schema.ZodOptional<Schema.ZodBoolean>;
    "jsx.multiLineParens": Schema.ZodOptional<Schema.ZodEnum<{
      always: "always";
      never: "never";
      prefer: "prefer";
    }>>;
    "typeLiteral.separatorKind": Schema.ZodOptional<Schema.ZodEnum<{
      comma: "comma";
      semiColon: "semiColon";
    }>>;
    spaceAround: Schema.ZodOptional<Schema.ZodBoolean>;
    spaceSurroundingProperties: Schema.ZodOptional<Schema.ZodBoolean>;
    vueComponentCase: Schema.ZodOptional<Schema.ZodEnum<{
      ignore: "ignore";
      "kebab-case": "kebab-case";
      "pascal-case": "pascal-case";
    }>>;
    angularNextControlFlowSameLine: Schema.ZodOptional<Schema.ZodBoolean>;
    sortNamedImports: Schema.ZodOptional<Schema.ZodEnum<{
      caseInsensitive: "caseInsensitive";
      caseSensitive: "caseSensitive";
      maintain: "maintain";
    }>>;
    sortNamedExports: Schema.ZodOptional<Schema.ZodEnum<{
      caseInsensitive: "caseInsensitive";
      caseSensitive: "caseSensitive";
      maintain: "maintain";
    }>>;
    useEditorConfig: Schema.ZodOptional<Schema.ZodBoolean>;
    options: Schema.ZodOptional<Schema.ZodObject<{
      useTabs: Schema.ZodOptional<Schema.ZodBoolean>;
      lineWidth: Schema.ZodOptional<Schema.ZodNumber>;
      indentWidth: Schema.ZodOptional<Schema.ZodNumber>;
      singleQuote: Schema.ZodOptional<Schema.ZodBoolean>;
      proseWrap: Schema.ZodOptional<Schema.ZodEnum<{
        always: "always";
        never: "never";
        preserve: "preserve";
      }>>;
      semiColons: Schema.ZodOptional<Schema.ZodBoolean>;
    }, Schema.core.$strip>>;
  }, Schema.core.$strip>>;
  minimumDependencyAge: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodNumber]>, Schema.ZodObject<{
    age: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodNumber]>>;
    exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  }, Schema.core.$strip>]>>;
  nodeModulesDir: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodEnum<{
    auto: "auto";
    manual: "manual";
    none: "none";
  }>, Schema.ZodBoolean]>>;
  vendor: Schema.ZodOptional<Schema.ZodBoolean>;
  jsrDepsInNodeModules: Schema.ZodOptional<Schema.ZodBoolean>;
  preferPackageJson: Schema.ZodOptional<Schema.ZodBoolean>;
  tasks: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
    description: Schema.ZodOptional<Schema.ZodString>;
    command: Schema.ZodOptional<Schema.ZodString>;
    dependencies: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    files: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    output: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    env: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  }, Schema.core.$strip>]>>>;
  test: Schema.ZodOptional<Schema.ZodObject<{
    include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    permissions: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      all: Schema.ZodOptional<Schema.ZodBoolean>;
      read: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      write: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      import: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      env: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      net: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      run: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      ffi: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      sys: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
    }, Schema.core.$strip>]>>;
    sanitizeOps: Schema.ZodOptional<Schema.ZodBoolean>;
    sanitizeResources: Schema.ZodOptional<Schema.ZodBoolean>;
  }, Schema.core.$strip>>;
  publish: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
    include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  }, Schema.core.$strip>, Schema.ZodLiteral<false>]>>;
  bench: Schema.ZodOptional<Schema.ZodObject<{
    include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    permissions: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      all: Schema.ZodOptional<Schema.ZodBoolean>;
      read: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      write: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      import: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      env: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      net: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      run: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      ffi: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      sys: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
    }, Schema.core.$strip>]>>;
  }, Schema.core.$strip>>;
  coverage: Schema.ZodOptional<Schema.ZodObject<{
    thresholds: Schema.ZodOptional<Schema.ZodObject<{
      lines: Schema.ZodOptional<Schema.ZodNumber>;
      branches: Schema.ZodOptional<Schema.ZodNumber>;
      functions: Schema.ZodOptional<Schema.ZodNumber>;
    }, Schema.core.$strip>>;
  }, Schema.core.$strip>>;
  license: Schema.ZodOptional<Schema.ZodString>;
  lock: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodBoolean, Schema.ZodObject<{
    path: Schema.ZodOptional<Schema.ZodString>;
    frozen: Schema.ZodOptional<Schema.ZodBoolean>;
  }, Schema.core.$strip>]>>;
  unstable: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  name: Schema.ZodOptional<Schema.ZodString>;
  version: Schema.ZodOptional<Schema.ZodString>;
  exports: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodString>]>>;
  permissions: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodObject<{
    all: Schema.ZodOptional<Schema.ZodBoolean>;
    read: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
      allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
    }, Schema.core.$strip>]>>;
    write: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
      allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
    }, Schema.core.$strip>]>>;
    import: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
      allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
    }, Schema.core.$strip>]>>;
    env: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
      allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
    }, Schema.core.$strip>]>>;
    net: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
      allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
    }, Schema.core.$strip>]>>;
    run: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
      allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
    }, Schema.core.$strip>]>>;
    ffi: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
      allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
    }, Schema.core.$strip>]>>;
    sys: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
      allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
    }, Schema.core.$strip>]>>;
  }, Schema.core.$strip>>>;
  patch: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  links: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  workspace: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodArray<Schema.ZodString>, Schema.ZodObject<{
    members: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  }, Schema.core.$strip>]>>;
}, Schema.core.$strip>)[];
/**
 * Config schemas split into one entry per grouping-preference list via
 * {@link Map.groupBy}, keyed by the JSON-encoded list (arrays can't be reliable
 * Map keys). One entry is one resolution chain: the loader walks the groupings
 * in order and uses the first config file that exists.
 */
export declare const configGroups: Map<string, (Schema.ZodObject<{
  name: Schema.ZodOptional<Schema.ZodString>;
  version: Schema.ZodOptional<Schema.ZodString>;
  description: Schema.ZodOptional<Schema.ZodString>;
  keywords: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  homepage: Schema.ZodOptional<Schema.ZodString>;
  bugs: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
    url: Schema.ZodOptional<Schema.ZodString>;
    email: Schema.ZodOptional<Schema.ZodString>;
  }, Schema.core.$strip>]>>;
  license: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodEnum<{
    "AGPL-3.0-only": "AGPL-3.0-only";
    "Apache-2.0": "Apache-2.0";
    "BSD-2-Clause": "BSD-2-Clause";
    "BSD-3-Clause": "BSD-3-Clause";
    "BSL-1.0": "BSL-1.0";
    "CC0-1.0": "CC0-1.0";
    "CDDL-1.0": "CDDL-1.0";
    "CDDL-1.1": "CDDL-1.1";
    "EPL-1.0": "EPL-1.0";
    "EPL-2.0": "EPL-2.0";
    "GPL-2.0-only": "GPL-2.0-only";
    "GPL-3.0-only": "GPL-3.0-only";
    ISC: "ISC";
    "LGPL-2.0-only": "LGPL-2.0-only";
    "LGPL-2.1-only": "LGPL-2.1-only";
    "LGPL-2.1-or-later": "LGPL-2.1-or-later";
    "LGPL-3.0-only": "LGPL-3.0-only";
    "LGPL-3.0-or-later": "LGPL-3.0-or-later";
    MIT: "MIT";
    "MPL-2.0": "MPL-2.0";
    "MS-PL": "MS-PL";
    UNLICENSED: "UNLICENSED";
  }>]>>;
  licenses: Schema.ZodOptional<Schema.ZodArray<Schema.ZodObject<{
    type: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodEnum<{
      "AGPL-3.0-only": "AGPL-3.0-only";
      "Apache-2.0": "Apache-2.0";
      "BSD-2-Clause": "BSD-2-Clause";
      "BSD-3-Clause": "BSD-3-Clause";
      "BSL-1.0": "BSL-1.0";
      "CC0-1.0": "CC0-1.0";
      "CDDL-1.0": "CDDL-1.0";
      "CDDL-1.1": "CDDL-1.1";
      "EPL-1.0": "EPL-1.0";
      "EPL-2.0": "EPL-2.0";
      "GPL-2.0-only": "GPL-2.0-only";
      "GPL-3.0-only": "GPL-3.0-only";
      ISC: "ISC";
      "LGPL-2.0-only": "LGPL-2.0-only";
      "LGPL-2.1-only": "LGPL-2.1-only";
      "LGPL-2.1-or-later": "LGPL-2.1-or-later";
      "LGPL-3.0-only": "LGPL-3.0-only";
      "LGPL-3.0-or-later": "LGPL-3.0-or-later";
      MIT: "MIT";
      "MPL-2.0": "MPL-2.0";
      "MS-PL": "MS-PL";
      UNLICENSED: "UNLICENSED";
    }>]>>;
    url: Schema.ZodOptional<Schema.ZodString>;
  }, Schema.core.$strip>>>;
  author: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
    name: Schema.ZodString;
    url: Schema.ZodOptional<Schema.ZodString>;
    email: Schema.ZodOptional<Schema.ZodString>;
  }, Schema.core.$strip>]>>;
  contributors: Schema.ZodOptional<Schema.ZodArray<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
    name: Schema.ZodString;
    url: Schema.ZodOptional<Schema.ZodString>;
    email: Schema.ZodOptional<Schema.ZodString>;
  }, Schema.core.$strip>]>>>;
  maintainers: Schema.ZodOptional<Schema.ZodArray<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
    name: Schema.ZodString;
    url: Schema.ZodOptional<Schema.ZodString>;
    email: Schema.ZodOptional<Schema.ZodString>;
  }, Schema.core.$strip>]>>>;
  files: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  main: Schema.ZodOptional<Schema.ZodString>;
  exports: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodNullable<Schema.ZodString>, Schema.ZodRecord<Schema.ZodString, Schema.ZodType<unknown, unknown, Schema.core.$ZodTypeInternals<unknown, unknown>>>, Schema.ZodType<unknown, unknown, Schema.core.$ZodTypeInternals<unknown, unknown>>, Schema.ZodType<unknown, unknown, Schema.core.$ZodTypeInternals<unknown, unknown>>]>>;
  imports: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodType<unknown, unknown, Schema.core.$ZodTypeInternals<unknown, unknown>>>>;
  bin: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodString>]>>;
  type: Schema.ZodDefault<Schema.ZodOptional<Schema.ZodEnum<{
    commonjs: "commonjs";
    module: "module";
  }>>>;
  types: Schema.ZodOptional<Schema.ZodString>;
  typings: Schema.ZodOptional<Schema.ZodString>;
  typesVersions: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodArray<Schema.ZodString>>>>;
  man: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodArray<Schema.ZodString>]>>;
  directories: Schema.ZodOptional<Schema.ZodObject<{
    bin: Schema.ZodOptional<Schema.ZodString>;
    doc: Schema.ZodOptional<Schema.ZodString>;
    example: Schema.ZodOptional<Schema.ZodString>;
    lib: Schema.ZodOptional<Schema.ZodString>;
    man: Schema.ZodOptional<Schema.ZodString>;
    test: Schema.ZodOptional<Schema.ZodString>;
  }, Schema.core.$strip>>;
  repository: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
    type: Schema.ZodOptional<Schema.ZodString>;
    url: Schema.ZodOptional<Schema.ZodString>;
    directory: Schema.ZodOptional<Schema.ZodString>;
  }, Schema.core.$strip>]>>;
  funding: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
    url: Schema.ZodString;
    type: Schema.ZodOptional<Schema.ZodString>;
  }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
    url: Schema.ZodString;
    type: Schema.ZodOptional<Schema.ZodString>;
  }, Schema.core.$strip>]>>]>>;
  scripts: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
  config: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>;
  dependencies: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
  devDependencies: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
  optionalDependencies: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
  peerDependencies: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
  peerDependenciesMeta: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodObject<{
    optional: Schema.ZodOptional<Schema.ZodBoolean>;
  }, Schema.core.$loose>>>;
  bundleDependencies: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodArray<Schema.ZodString>, Schema.ZodBoolean]>>;
  bundledDependencies: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodArray<Schema.ZodString>, Schema.ZodBoolean]>>;
  resolutions: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>;
  overrides: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>;
  packageManager: Schema.ZodOptional<Schema.ZodString>;
  engines: Schema.ZodOptional<Schema.ZodObject<{
    node: Schema.ZodOptional<Schema.ZodString>;
    runtime: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
      name: Schema.ZodString;
      version: Schema.ZodOptional<Schema.ZodString>;
      onFail: Schema.ZodOptional<Schema.ZodEnum<{
        download: "download";
        error: "error";
        ignore: "ignore";
        warn: "warn";
      }>>;
    }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
      name: Schema.ZodString;
      version: Schema.ZodOptional<Schema.ZodString>;
      onFail: Schema.ZodOptional<Schema.ZodEnum<{
        download: "download";
        error: "error";
        ignore: "ignore";
        warn: "warn";
      }>>;
    }, Schema.core.$strip>>]>>;
  }, Schema.core.$catchall<Schema.ZodString>>>;
  volta: Schema.ZodOptional<Schema.ZodObject<{
    extends: Schema.ZodOptional<Schema.ZodString>;
  }, Schema.core.$catchall<Schema.ZodString>>>;
  engineStrict: Schema.ZodOptional<Schema.ZodBoolean>;
  os: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  cpu: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  devEngines: Schema.ZodOptional<Schema.ZodObject<{
    os: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
      name: Schema.ZodString;
      version: Schema.ZodOptional<Schema.ZodString>;
      onFail: Schema.ZodOptional<Schema.ZodEnum<{
        download: "download";
        error: "error";
        ignore: "ignore";
        warn: "warn";
      }>>;
    }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
      name: Schema.ZodString;
      version: Schema.ZodOptional<Schema.ZodString>;
      onFail: Schema.ZodOptional<Schema.ZodEnum<{
        download: "download";
        error: "error";
        ignore: "ignore";
        warn: "warn";
      }>>;
    }, Schema.core.$strip>>]>>;
    cpu: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
      name: Schema.ZodString;
      version: Schema.ZodOptional<Schema.ZodString>;
      onFail: Schema.ZodOptional<Schema.ZodEnum<{
        download: "download";
        error: "error";
        ignore: "ignore";
        warn: "warn";
      }>>;
    }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
      name: Schema.ZodString;
      version: Schema.ZodOptional<Schema.ZodString>;
      onFail: Schema.ZodOptional<Schema.ZodEnum<{
        download: "download";
        error: "error";
        ignore: "ignore";
        warn: "warn";
      }>>;
    }, Schema.core.$strip>>]>>;
    libc: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
      name: Schema.ZodString;
      version: Schema.ZodOptional<Schema.ZodString>;
      onFail: Schema.ZodOptional<Schema.ZodEnum<{
        download: "download";
        error: "error";
        ignore: "ignore";
        warn: "warn";
      }>>;
    }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
      name: Schema.ZodString;
      version: Schema.ZodOptional<Schema.ZodString>;
      onFail: Schema.ZodOptional<Schema.ZodEnum<{
        download: "download";
        error: "error";
        ignore: "ignore";
        warn: "warn";
      }>>;
    }, Schema.core.$strip>>]>>;
    runtime: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
      name: Schema.ZodString;
      version: Schema.ZodOptional<Schema.ZodString>;
      onFail: Schema.ZodOptional<Schema.ZodEnum<{
        download: "download";
        error: "error";
        ignore: "ignore";
        warn: "warn";
      }>>;
    }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
      name: Schema.ZodString;
      version: Schema.ZodOptional<Schema.ZodString>;
      onFail: Schema.ZodOptional<Schema.ZodEnum<{
        download: "download";
        error: "error";
        ignore: "ignore";
        warn: "warn";
      }>>;
    }, Schema.core.$strip>>]>>;
    packageManager: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
      name: Schema.ZodString;
      version: Schema.ZodOptional<Schema.ZodString>;
      onFail: Schema.ZodOptional<Schema.ZodEnum<{
        download: "download";
        error: "error";
        ignore: "ignore";
        warn: "warn";
      }>>;
    }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
      name: Schema.ZodString;
      version: Schema.ZodOptional<Schema.ZodString>;
      onFail: Schema.ZodOptional<Schema.ZodEnum<{
        download: "download";
        error: "error";
        ignore: "ignore";
        warn: "warn";
      }>>;
    }, Schema.core.$strip>>]>>;
  }, Schema.core.$strip>>;
  preferGlobal: Schema.ZodOptional<Schema.ZodBoolean>;
  private: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodEnum<{
    false: "false";
    true: "true";
  }>]>>;
  publishConfig: Schema.ZodOptional<Schema.ZodObject<{
    access: Schema.ZodOptional<Schema.ZodEnum<{
      public: "public";
      restricted: "restricted";
    }>>;
    tag: Schema.ZodOptional<Schema.ZodString>;
    registry: Schema.ZodOptional<Schema.ZodString>;
    provenance: Schema.ZodOptional<Schema.ZodBoolean>;
    directory: Schema.ZodOptional<Schema.ZodString>;
    linkDirectory: Schema.ZodOptional<Schema.ZodBoolean>;
    executableFiles: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  }, Schema.core.$loose>>;
  dist: Schema.ZodOptional<Schema.ZodObject<{
    shasum: Schema.ZodOptional<Schema.ZodString>;
    tarball: Schema.ZodOptional<Schema.ZodString>;
  }, Schema.core.$strip>>;
  readme: Schema.ZodOptional<Schema.ZodString>;
  module: Schema.ZodOptional<Schema.ZodString>;
  esnext: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
    main: Schema.ZodOptional<Schema.ZodString>;
    browser: Schema.ZodOptional<Schema.ZodString>;
  }, Schema.core.$catchall<Schema.ZodString>>]>>;
  workspaces: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodArray<Schema.ZodString>, Schema.ZodObject<{
    packages: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    nohoist: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  }, Schema.core.$strip>]>>;
  allowScripts: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodBoolean>>;
  sideEffects: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
}, Schema.core.$strip> | Schema.ZodObject<{
  config: Schema.ZodDefault<Schema.ZodOptional<Schema.ZodObject<{
    mergeWithGlobal: Schema.ZodDefault<Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>>;
    codegen: Schema.ZodDefault<Schema.ZodOptional<Schema.ZodArray<Schema.ZodObject<{
      in: Schema.ZodString;
      out: Schema.ZodString;
    }, Schema.core.$strip>>>>;
  }, Schema.core.$strip>>>;
}, Schema.core.$strip> | Schema.ZodObject<{
  compilerOptions: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>;
  compileOnSave: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
  typeAcquisition: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodObject<{
    enable: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
    include: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
    exclude: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
  }, Schema.core.$strip>>>;
  extends: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodArray<Schema.ZodString>]>>;
  watchOptions: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodObject<{
    force: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
    watchFile: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
    watchDirectory: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
    fallbackPolling: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
    synchronousWatchDirectory: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
    excludeFiles: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
    excludeDirectories: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
  }, Schema.core.$strip>>>;
  buildOptions: Schema.ZodOptional<Schema.ZodObject<{
    dry: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
    force: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
    verbose: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
    incremental: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
    assumeChangesOnlyAffectDirectDependencies: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
    traceResolution: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
  }, Schema.core.$strip>>;
  "ts-node": Schema.ZodOptional<Schema.ZodNullable<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>>;
  files: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
  exclude: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
  include: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
  references: Schema.ZodOptional<Schema.ZodArray<Schema.ZodObject<{
    path: Schema.ZodString;
  }, Schema.core.$strip>>>;
}, Schema.core.$strip> | Schema.ZodObject<{
  allowScripts: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>, Schema.ZodObject<{
    allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
    deny: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  }, Schema.core.$strip>]>>;
  compile: Schema.ZodOptional<Schema.ZodObject<{
    include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    permissions: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      all: Schema.ZodOptional<Schema.ZodBoolean>;
      read: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      write: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      import: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      env: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      net: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      run: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      ffi: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      sys: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
    }, Schema.core.$strip>]>>;
  }, Schema.core.$strip>>;
  desktop: Schema.ZodOptional<Schema.ZodObject<{
    app: Schema.ZodOptional<Schema.ZodObject<{
      name: Schema.ZodOptional<Schema.ZodString>;
      identifier: Schema.ZodOptional<Schema.ZodString>;
      icons: Schema.ZodOptional<Schema.ZodObject<{
        macos: Schema.ZodOptional<Schema.ZodString>;
        windows: Schema.ZodOptional<Schema.ZodString>;
        linux: Schema.ZodOptional<Schema.ZodString>;
      }, Schema.core.$strip>>;
      deepLinks: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>>;
    backend: Schema.ZodOptional<Schema.ZodEnum<{
      cef: "cef";
      webview: "webview";
    }>>;
    output: Schema.ZodOptional<Schema.ZodObject<{
      macos: Schema.ZodOptional<Schema.ZodString>;
      windows: Schema.ZodOptional<Schema.ZodString>;
      linux: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>>;
    release: Schema.ZodOptional<Schema.ZodObject<{
      baseUrl: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>>;
  }, Schema.core.$strip>>;
  compilerOptions: Schema.ZodOptional<Schema.ZodObject<{
    allowJs: Schema.ZodOptional<Schema.ZodBoolean>;
    allowUnreachableCode: Schema.ZodOptional<Schema.ZodBoolean>;
    allowUnusedLabels: Schema.ZodOptional<Schema.ZodBoolean>;
    checkJs: Schema.ZodOptional<Schema.ZodBoolean>;
    emitDecoratorMetadata: Schema.ZodOptional<Schema.ZodBoolean>;
    erasableSyntaxOnly: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
    exactOptionalPropertyTypes: Schema.ZodOptional<Schema.ZodBoolean>;
    experimentalDecorators: Schema.ZodOptional<Schema.ZodBoolean>;
    isolatedDeclarations: Schema.ZodOptional<Schema.ZodBoolean>;
    jsx: Schema.ZodOptional<Schema.ZodEnum<{
      precompile: "precompile";
      preserve: "preserve";
      react: "react";
      "react-jsx": "react-jsx";
      "react-jsxdev": "react-jsxdev";
      "react-native": "react-native";
    }>>;
    jsxFactory: Schema.ZodOptional<Schema.ZodString>;
    jsxFragmentFactory: Schema.ZodOptional<Schema.ZodString>;
    jsxImportSource: Schema.ZodOptional<Schema.ZodString>;
    jsxImportSourceTypes: Schema.ZodOptional<Schema.ZodString>;
    jsxPrecompileSkipElements: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    lib: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    module: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
    moduleResolution: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
    noErrorTruncation: Schema.ZodOptional<Schema.ZodBoolean>;
    noFallthroughCasesInSwitch: Schema.ZodOptional<Schema.ZodBoolean>;
    noImplicitAny: Schema.ZodOptional<Schema.ZodBoolean>;
    noImplicitOverride: Schema.ZodOptional<Schema.ZodBoolean>;
    noImplicitReturns: Schema.ZodOptional<Schema.ZodBoolean>;
    noImplicitThis: Schema.ZodOptional<Schema.ZodBoolean>;
    noPropertyAccessFromIndexSignature: Schema.ZodOptional<Schema.ZodBoolean>;
    noUncheckedIndexedAccess: Schema.ZodOptional<Schema.ZodBoolean>;
    noUnusedLocals: Schema.ZodOptional<Schema.ZodBoolean>;
    noUnusedParameters: Schema.ZodOptional<Schema.ZodBoolean>;
    baseUrl: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
    paths: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodRecord<Schema.ZodString, Schema.ZodNullable<Schema.ZodArray<Schema.ZodNullable<Schema.ZodString>>>>>>;
    rootDirs: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    skipLibCheck: Schema.ZodOptional<Schema.ZodBoolean>;
    strict: Schema.ZodOptional<Schema.ZodBoolean>;
    strictBindCallApply: Schema.ZodOptional<Schema.ZodBoolean>;
    strictBuiltinIteratorReturn: Schema.ZodOptional<Schema.ZodBoolean>;
    strictFunctionTypes: Schema.ZodOptional<Schema.ZodBoolean>;
    strictNullChecks: Schema.ZodOptional<Schema.ZodBoolean>;
    strictPropertyInitialization: Schema.ZodOptional<Schema.ZodBoolean>;
    types: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    useUnknownInCatchVariables: Schema.ZodOptional<Schema.ZodBoolean>;
    verbatimModuleSyntax: Schema.ZodOptional<Schema.ZodBoolean>;
  }, Schema.core.$strip>>;
  deploy: Schema.ZodOptional<Schema.ZodObject<{
    org: Schema.ZodOptional<Schema.ZodString>;
    app: Schema.ZodOptional<Schema.ZodString>;
    framework: Schema.ZodOptional<Schema.ZodString>;
    install: Schema.ZodOptional<Schema.ZodString>;
    build: Schema.ZodOptional<Schema.ZodString>;
    predeploy: Schema.ZodOptional<Schema.ZodString>;
    runtime: Schema.ZodOptional<Schema.ZodObject<{
      mode: Schema.ZodOptional<Schema.ZodEnum<{
        dynamic: "dynamic";
        static: "static";
      }>>;
      entrypoint: Schema.ZodOptional<Schema.ZodString>;
      args: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      cwd: Schema.ZodOptional<Schema.ZodString>;
      spa: Schema.ZodOptional<Schema.ZodBoolean>;
    }, Schema.core.$strip>>;
    include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  }, Schema.core.$strip>>;
  importMap: Schema.ZodOptional<Schema.ZodString>;
  catalog: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
  catalogs: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>;
  imports: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
  scopes: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>;
  exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  lint: Schema.ZodOptional<Schema.ZodObject<{
    include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    plugins: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    rules: Schema.ZodOptional<Schema.ZodObject<{
      tags: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>>;
    report: Schema.ZodOptional<Schema.ZodEnum<{
      compact: "compact";
      json: "json";
      pretty: "pretty";
    }>>;
  }, Schema.core.$strip>>;
  fmt: Schema.ZodOptional<Schema.ZodObject<{
    include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    useTabs: Schema.ZodOptional<Schema.ZodBoolean>;
    lineWidth: Schema.ZodOptional<Schema.ZodNumber>;
    indentWidth: Schema.ZodOptional<Schema.ZodNumber>;
    singleQuote: Schema.ZodOptional<Schema.ZodBoolean>;
    proseWrap: Schema.ZodOptional<Schema.ZodEnum<{
      always: "always";
      never: "never";
      preserve: "preserve";
    }>>;
    semiColons: Schema.ZodOptional<Schema.ZodBoolean>;
    quoteProps: Schema.ZodOptional<Schema.ZodEnum<{
      asNeeded: "asNeeded";
      consistent: "consistent";
      preserve: "preserve";
    }>>;
    newLineKind: Schema.ZodOptional<Schema.ZodEnum<{
      auto: "auto";
      crlf: "crlf";
      lf: "lf";
      system: "system";
    }>>;
    useBraces: Schema.ZodOptional<Schema.ZodEnum<{
      always: "always";
      maintain: "maintain";
      preferNone: "preferNone";
      whenNotSingleLine: "whenNotSingleLine";
    }>>;
    bracePosition: Schema.ZodOptional<Schema.ZodEnum<{
      maintain: "maintain";
      nextLine: "nextLine";
      sameLine: "sameLine";
      sameLineUnlessHanging: "sameLineUnlessHanging";
    }>>;
    singleBodyPosition: Schema.ZodOptional<Schema.ZodEnum<{
      maintain: "maintain";
      nextLine: "nextLine";
      sameLine: "sameLine";
    }>>;
    nextControlFlowPosition: Schema.ZodOptional<Schema.ZodEnum<{
      maintain: "maintain";
      nextLine: "nextLine";
      sameLine: "sameLine";
    }>>;
    trailingCommas: Schema.ZodOptional<Schema.ZodEnum<{
      always: "always";
      never: "never";
      onlyMultiLine: "onlyMultiLine";
    }>>;
    "json.trailingCommas": Schema.ZodOptional<Schema.ZodEnum<{
      always: "always";
      jsonc: "jsonc";
      maintain: "maintain";
      never: "never";
    }>>;
    operatorPosition: Schema.ZodOptional<Schema.ZodEnum<{
      maintain: "maintain";
      nextLine: "nextLine";
      sameLine: "sameLine";
    }>>;
    "jsx.bracketPosition": Schema.ZodOptional<Schema.ZodEnum<{
      maintain: "maintain";
      nextLine: "nextLine";
      sameLine: "sameLine";
    }>>;
    "jsx.forceNewLinesSurroundingContent": Schema.ZodOptional<Schema.ZodBoolean>;
    "jsx.multiLineParens": Schema.ZodOptional<Schema.ZodEnum<{
      always: "always";
      never: "never";
      prefer: "prefer";
    }>>;
    "typeLiteral.separatorKind": Schema.ZodOptional<Schema.ZodEnum<{
      comma: "comma";
      semiColon: "semiColon";
    }>>;
    spaceAround: Schema.ZodOptional<Schema.ZodBoolean>;
    spaceSurroundingProperties: Schema.ZodOptional<Schema.ZodBoolean>;
    vueComponentCase: Schema.ZodOptional<Schema.ZodEnum<{
      ignore: "ignore";
      "kebab-case": "kebab-case";
      "pascal-case": "pascal-case";
    }>>;
    angularNextControlFlowSameLine: Schema.ZodOptional<Schema.ZodBoolean>;
    sortNamedImports: Schema.ZodOptional<Schema.ZodEnum<{
      caseInsensitive: "caseInsensitive";
      caseSensitive: "caseSensitive";
      maintain: "maintain";
    }>>;
    sortNamedExports: Schema.ZodOptional<Schema.ZodEnum<{
      caseInsensitive: "caseInsensitive";
      caseSensitive: "caseSensitive";
      maintain: "maintain";
    }>>;
    useEditorConfig: Schema.ZodOptional<Schema.ZodBoolean>;
    options: Schema.ZodOptional<Schema.ZodObject<{
      useTabs: Schema.ZodOptional<Schema.ZodBoolean>;
      lineWidth: Schema.ZodOptional<Schema.ZodNumber>;
      indentWidth: Schema.ZodOptional<Schema.ZodNumber>;
      singleQuote: Schema.ZodOptional<Schema.ZodBoolean>;
      proseWrap: Schema.ZodOptional<Schema.ZodEnum<{
        always: "always";
        never: "never";
        preserve: "preserve";
      }>>;
      semiColons: Schema.ZodOptional<Schema.ZodBoolean>;
    }, Schema.core.$strip>>;
  }, Schema.core.$strip>>;
  minimumDependencyAge: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodNumber]>, Schema.ZodObject<{
    age: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodNumber]>>;
    exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  }, Schema.core.$strip>]>>;
  nodeModulesDir: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodEnum<{
    auto: "auto";
    manual: "manual";
    none: "none";
  }>, Schema.ZodBoolean]>>;
  vendor: Schema.ZodOptional<Schema.ZodBoolean>;
  jsrDepsInNodeModules: Schema.ZodOptional<Schema.ZodBoolean>;
  preferPackageJson: Schema.ZodOptional<Schema.ZodBoolean>;
  tasks: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
    description: Schema.ZodOptional<Schema.ZodString>;
    command: Schema.ZodOptional<Schema.ZodString>;
    dependencies: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    files: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    output: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    env: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  }, Schema.core.$strip>]>>>;
  test: Schema.ZodOptional<Schema.ZodObject<{
    include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    permissions: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      all: Schema.ZodOptional<Schema.ZodBoolean>;
      read: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      write: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      import: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      env: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      net: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      run: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      ffi: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      sys: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
    }, Schema.core.$strip>]>>;
    sanitizeOps: Schema.ZodOptional<Schema.ZodBoolean>;
    sanitizeResources: Schema.ZodOptional<Schema.ZodBoolean>;
  }, Schema.core.$strip>>;
  publish: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
    include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  }, Schema.core.$strip>, Schema.ZodLiteral<false>]>>;
  bench: Schema.ZodOptional<Schema.ZodObject<{
    include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    permissions: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      all: Schema.ZodOptional<Schema.ZodBoolean>;
      read: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      write: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      import: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      env: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      net: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      run: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      ffi: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      sys: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
    }, Schema.core.$strip>]>>;
  }, Schema.core.$strip>>;
  coverage: Schema.ZodOptional<Schema.ZodObject<{
    thresholds: Schema.ZodOptional<Schema.ZodObject<{
      lines: Schema.ZodOptional<Schema.ZodNumber>;
      branches: Schema.ZodOptional<Schema.ZodNumber>;
      functions: Schema.ZodOptional<Schema.ZodNumber>;
    }, Schema.core.$strip>>;
  }, Schema.core.$strip>>;
  license: Schema.ZodOptional<Schema.ZodString>;
  lock: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodBoolean, Schema.ZodObject<{
    path: Schema.ZodOptional<Schema.ZodString>;
    frozen: Schema.ZodOptional<Schema.ZodBoolean>;
  }, Schema.core.$strip>]>>;
  unstable: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  name: Schema.ZodOptional<Schema.ZodString>;
  version: Schema.ZodOptional<Schema.ZodString>;
  exports: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodString>]>>;
  permissions: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodObject<{
    all: Schema.ZodOptional<Schema.ZodBoolean>;
    read: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
      allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
    }, Schema.core.$strip>]>>;
    write: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
      allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
    }, Schema.core.$strip>]>>;
    import: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
      allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
    }, Schema.core.$strip>]>>;
    env: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
      allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
    }, Schema.core.$strip>]>>;
    net: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
      allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
    }, Schema.core.$strip>]>>;
    run: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
      allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
    }, Schema.core.$strip>]>>;
    ffi: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
      allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
    }, Schema.core.$strip>]>>;
    sys: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
      allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
    }, Schema.core.$strip>]>>;
  }, Schema.core.$strip>>>;
  patch: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  links: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  workspace: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodArray<Schema.ZodString>, Schema.ZodObject<{
    members: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  }, Schema.core.$strip>]>>;
}, Schema.core.$strip>)[]>;
/**
 * Distinct ordered grouping preferences, e.g. `[["app"], ["database", "app"]]`.
 */
export declare const configGroupPreferences: string[][];
/**
 * Per-grouping `defineConfig` helpers, generated from the registered groupings
 * (nothing hardcoded). Keyed by grouping, e.g. `defineConfigs.get("app")`.
 */
export declare const defineConfigs: Map<string, {
  (options: Record<string, unknown>): Record<string, unknown>;
  (options: Record<string, unknown>[]): Record<string, unknown>[];
  (options: UserConfigFn<Schema.ZodObject<Schema.core.$ZodLooseShape, Schema.core.$strip>>): UserConfigFn<Schema.ZodObject<Schema.core.$ZodLooseShape, Schema.core.$strip>>;
  (options: UserConfigExport<Schema.ZodObject<Schema.core.$ZodLooseShape, Schema.core.$strip>>): UserConfigExport<Schema.ZodObject<Schema.core.$ZodLooseShape, Schema.core.$strip>>;
}>;
/**
 * Get the runtime `defineConfig` helper bound to a grouping's composed schema.
 *
 * Throws when no config schema declares the grouping. Prefer {@link defineConfig}
 * for authoring, since the per-grouping helper's shape is only known at runtime.
 */
export declare function defineConfigFor(grouping: string): DefineConfig;
/**
 * Combined configuration schema (a plain {@link Schema.ZodObject}), used both
 * for parsing loaded config and for building the typed `defineConfig` helper.
 *
 * Kept free of any runtime dependency on the user's config file so that
 * `app.config.ts` can safely import `defineConfig` from here without creating
 * an import cycle.
 */
export declare const ConfigObject: Schema.ZodObject<{
  description: Schema.ZodOptional<Schema.ZodString>;
  keywords: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  homepage: Schema.ZodOptional<Schema.ZodString>;
  bugs: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
    url: Schema.ZodOptional<Schema.ZodString>;
    email: Schema.ZodOptional<Schema.ZodString>;
  }, Schema.core.$strip>]>>;
  licenses: Schema.ZodOptional<Schema.ZodArray<Schema.ZodObject<{
    type: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodEnum<{
      "AGPL-3.0-only": "AGPL-3.0-only";
      "Apache-2.0": "Apache-2.0";
      "BSD-2-Clause": "BSD-2-Clause";
      "BSD-3-Clause": "BSD-3-Clause";
      "BSL-1.0": "BSL-1.0";
      "CC0-1.0": "CC0-1.0";
      "CDDL-1.0": "CDDL-1.0";
      "CDDL-1.1": "CDDL-1.1";
      "EPL-1.0": "EPL-1.0";
      "EPL-2.0": "EPL-2.0";
      "GPL-2.0-only": "GPL-2.0-only";
      "GPL-3.0-only": "GPL-3.0-only";
      ISC: "ISC";
      "LGPL-2.0-only": "LGPL-2.0-only";
      "LGPL-2.1-only": "LGPL-2.1-only";
      "LGPL-2.1-or-later": "LGPL-2.1-or-later";
      "LGPL-3.0-only": "LGPL-3.0-only";
      "LGPL-3.0-or-later": "LGPL-3.0-or-later";
      MIT: "MIT";
      "MPL-2.0": "MPL-2.0";
      "MS-PL": "MS-PL";
      UNLICENSED: "UNLICENSED";
    }>]>>;
    url: Schema.ZodOptional<Schema.ZodString>;
  }, Schema.core.$strip>>>;
  author: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
    name: Schema.ZodString;
    url: Schema.ZodOptional<Schema.ZodString>;
    email: Schema.ZodOptional<Schema.ZodString>;
  }, Schema.core.$strip>]>>;
  contributors: Schema.ZodOptional<Schema.ZodArray<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
    name: Schema.ZodString;
    url: Schema.ZodOptional<Schema.ZodString>;
    email: Schema.ZodOptional<Schema.ZodString>;
  }, Schema.core.$strip>]>>>;
  maintainers: Schema.ZodOptional<Schema.ZodArray<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
    name: Schema.ZodString;
    url: Schema.ZodOptional<Schema.ZodString>;
    email: Schema.ZodOptional<Schema.ZodString>;
  }, Schema.core.$strip>]>>>;
  main: Schema.ZodOptional<Schema.ZodString>;
  bin: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodString>]>>;
  type: Schema.ZodDefault<Schema.ZodOptional<Schema.ZodEnum<{
    commonjs: "commonjs";
    module: "module";
  }>>>;
  types: Schema.ZodOptional<Schema.ZodString>;
  typings: Schema.ZodOptional<Schema.ZodString>;
  typesVersions: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodArray<Schema.ZodString>>>>;
  man: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodArray<Schema.ZodString>]>>;
  directories: Schema.ZodOptional<Schema.ZodObject<{
    bin: Schema.ZodOptional<Schema.ZodString>;
    doc: Schema.ZodOptional<Schema.ZodString>;
    example: Schema.ZodOptional<Schema.ZodString>;
    lib: Schema.ZodOptional<Schema.ZodString>;
    man: Schema.ZodOptional<Schema.ZodString>;
    test: Schema.ZodOptional<Schema.ZodString>;
  }, Schema.core.$strip>>;
  repository: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
    type: Schema.ZodOptional<Schema.ZodString>;
    url: Schema.ZodOptional<Schema.ZodString>;
    directory: Schema.ZodOptional<Schema.ZodString>;
  }, Schema.core.$strip>]>>;
  funding: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
    url: Schema.ZodString;
    type: Schema.ZodOptional<Schema.ZodString>;
  }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
    url: Schema.ZodString;
    type: Schema.ZodOptional<Schema.ZodString>;
  }, Schema.core.$strip>]>>]>>;
  scripts: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
  config: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>;
  dependencies: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
  devDependencies: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
  optionalDependencies: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
  peerDependencies: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
  peerDependenciesMeta: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodObject<{
    optional: Schema.ZodOptional<Schema.ZodBoolean>;
  }, Schema.core.$loose>>>;
  bundleDependencies: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodArray<Schema.ZodString>, Schema.ZodBoolean]>>;
  bundledDependencies: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodArray<Schema.ZodString>, Schema.ZodBoolean]>>;
  resolutions: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>;
  overrides: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>;
  packageManager: Schema.ZodOptional<Schema.ZodString>;
  engines: Schema.ZodOptional<Schema.ZodObject<{
    node: Schema.ZodOptional<Schema.ZodString>;
    runtime: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
      name: Schema.ZodString;
      version: Schema.ZodOptional<Schema.ZodString>;
      onFail: Schema.ZodOptional<Schema.ZodEnum<{
        download: "download";
        error: "error";
        ignore: "ignore";
        warn: "warn";
      }>>;
    }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
      name: Schema.ZodString;
      version: Schema.ZodOptional<Schema.ZodString>;
      onFail: Schema.ZodOptional<Schema.ZodEnum<{
        download: "download";
        error: "error";
        ignore: "ignore";
        warn: "warn";
      }>>;
    }, Schema.core.$strip>>]>>;
  }, Schema.core.$catchall<Schema.ZodString>>>;
  volta: Schema.ZodOptional<Schema.ZodObject<{
    extends: Schema.ZodOptional<Schema.ZodString>;
  }, Schema.core.$catchall<Schema.ZodString>>>;
  engineStrict: Schema.ZodOptional<Schema.ZodBoolean>;
  os: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  cpu: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  devEngines: Schema.ZodOptional<Schema.ZodObject<{
    os: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
      name: Schema.ZodString;
      version: Schema.ZodOptional<Schema.ZodString>;
      onFail: Schema.ZodOptional<Schema.ZodEnum<{
        download: "download";
        error: "error";
        ignore: "ignore";
        warn: "warn";
      }>>;
    }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
      name: Schema.ZodString;
      version: Schema.ZodOptional<Schema.ZodString>;
      onFail: Schema.ZodOptional<Schema.ZodEnum<{
        download: "download";
        error: "error";
        ignore: "ignore";
        warn: "warn";
      }>>;
    }, Schema.core.$strip>>]>>;
    cpu: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
      name: Schema.ZodString;
      version: Schema.ZodOptional<Schema.ZodString>;
      onFail: Schema.ZodOptional<Schema.ZodEnum<{
        download: "download";
        error: "error";
        ignore: "ignore";
        warn: "warn";
      }>>;
    }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
      name: Schema.ZodString;
      version: Schema.ZodOptional<Schema.ZodString>;
      onFail: Schema.ZodOptional<Schema.ZodEnum<{
        download: "download";
        error: "error";
        ignore: "ignore";
        warn: "warn";
      }>>;
    }, Schema.core.$strip>>]>>;
    libc: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
      name: Schema.ZodString;
      version: Schema.ZodOptional<Schema.ZodString>;
      onFail: Schema.ZodOptional<Schema.ZodEnum<{
        download: "download";
        error: "error";
        ignore: "ignore";
        warn: "warn";
      }>>;
    }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
      name: Schema.ZodString;
      version: Schema.ZodOptional<Schema.ZodString>;
      onFail: Schema.ZodOptional<Schema.ZodEnum<{
        download: "download";
        error: "error";
        ignore: "ignore";
        warn: "warn";
      }>>;
    }, Schema.core.$strip>>]>>;
    runtime: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
      name: Schema.ZodString;
      version: Schema.ZodOptional<Schema.ZodString>;
      onFail: Schema.ZodOptional<Schema.ZodEnum<{
        download: "download";
        error: "error";
        ignore: "ignore";
        warn: "warn";
      }>>;
    }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
      name: Schema.ZodString;
      version: Schema.ZodOptional<Schema.ZodString>;
      onFail: Schema.ZodOptional<Schema.ZodEnum<{
        download: "download";
        error: "error";
        ignore: "ignore";
        warn: "warn";
      }>>;
    }, Schema.core.$strip>>]>>;
    packageManager: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
      name: Schema.ZodString;
      version: Schema.ZodOptional<Schema.ZodString>;
      onFail: Schema.ZodOptional<Schema.ZodEnum<{
        download: "download";
        error: "error";
        ignore: "ignore";
        warn: "warn";
      }>>;
    }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
      name: Schema.ZodString;
      version: Schema.ZodOptional<Schema.ZodString>;
      onFail: Schema.ZodOptional<Schema.ZodEnum<{
        download: "download";
        error: "error";
        ignore: "ignore";
        warn: "warn";
      }>>;
    }, Schema.core.$strip>>]>>;
  }, Schema.core.$strip>>;
  preferGlobal: Schema.ZodOptional<Schema.ZodBoolean>;
  private: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodEnum<{
    false: "false";
    true: "true";
  }>]>>;
  publishConfig: Schema.ZodOptional<Schema.ZodObject<{
    access: Schema.ZodOptional<Schema.ZodEnum<{
      public: "public";
      restricted: "restricted";
    }>>;
    tag: Schema.ZodOptional<Schema.ZodString>;
    registry: Schema.ZodOptional<Schema.ZodString>;
    provenance: Schema.ZodOptional<Schema.ZodBoolean>;
    directory: Schema.ZodOptional<Schema.ZodString>;
    linkDirectory: Schema.ZodOptional<Schema.ZodBoolean>;
    executableFiles: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  }, Schema.core.$loose>>;
  dist: Schema.ZodOptional<Schema.ZodObject<{
    shasum: Schema.ZodOptional<Schema.ZodString>;
    tarball: Schema.ZodOptional<Schema.ZodString>;
  }, Schema.core.$strip>>;
  readme: Schema.ZodOptional<Schema.ZodString>;
  module: Schema.ZodOptional<Schema.ZodString>;
  esnext: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
    main: Schema.ZodOptional<Schema.ZodString>;
    browser: Schema.ZodOptional<Schema.ZodString>;
  }, Schema.core.$catchall<Schema.ZodString>>]>>;
  workspaces: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodArray<Schema.ZodString>, Schema.ZodObject<{
    packages: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    nohoist: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  }, Schema.core.$strip>]>>;
  sideEffects: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
  compileOnSave: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
  typeAcquisition: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodObject<{
    enable: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
    include: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
    exclude: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
  }, Schema.core.$strip>>>;
  extends: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodArray<Schema.ZodString>]>>;
  watchOptions: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodObject<{
    force: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
    watchFile: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
    watchDirectory: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
    fallbackPolling: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
    synchronousWatchDirectory: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
    excludeFiles: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
    excludeDirectories: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
  }, Schema.core.$strip>>>;
  buildOptions: Schema.ZodOptional<Schema.ZodObject<{
    dry: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
    force: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
    verbose: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
    incremental: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
    assumeChangesOnlyAffectDirectDependencies: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
    traceResolution: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
  }, Schema.core.$strip>>;
  "ts-node": Schema.ZodOptional<Schema.ZodNullable<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>>;
  files: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
  include: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
  references: Schema.ZodOptional<Schema.ZodArray<Schema.ZodObject<{
    path: Schema.ZodString;
  }, Schema.core.$strip>>>;
  allowScripts: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>, Schema.ZodObject<{
    allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
    deny: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  }, Schema.core.$strip>]>>;
  compile: Schema.ZodOptional<Schema.ZodObject<{
    include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    permissions: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      all: Schema.ZodOptional<Schema.ZodBoolean>;
      read: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      write: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      import: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      env: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      net: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      run: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      ffi: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      sys: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
    }, Schema.core.$strip>]>>;
  }, Schema.core.$strip>>;
  desktop: Schema.ZodOptional<Schema.ZodObject<{
    app: Schema.ZodOptional<Schema.ZodObject<{
      name: Schema.ZodOptional<Schema.ZodString>;
      identifier: Schema.ZodOptional<Schema.ZodString>;
      icons: Schema.ZodOptional<Schema.ZodObject<{
        macos: Schema.ZodOptional<Schema.ZodString>;
        windows: Schema.ZodOptional<Schema.ZodString>;
        linux: Schema.ZodOptional<Schema.ZodString>;
      }, Schema.core.$strip>>;
      deepLinks: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>>;
    backend: Schema.ZodOptional<Schema.ZodEnum<{
      cef: "cef";
      webview: "webview";
    }>>;
    output: Schema.ZodOptional<Schema.ZodObject<{
      macos: Schema.ZodOptional<Schema.ZodString>;
      windows: Schema.ZodOptional<Schema.ZodString>;
      linux: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>>;
    release: Schema.ZodOptional<Schema.ZodObject<{
      baseUrl: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>>;
  }, Schema.core.$strip>>;
  compilerOptions: Schema.ZodOptional<Schema.ZodObject<{
    allowJs: Schema.ZodOptional<Schema.ZodBoolean>;
    allowUnreachableCode: Schema.ZodOptional<Schema.ZodBoolean>;
    allowUnusedLabels: Schema.ZodOptional<Schema.ZodBoolean>;
    checkJs: Schema.ZodOptional<Schema.ZodBoolean>;
    emitDecoratorMetadata: Schema.ZodOptional<Schema.ZodBoolean>;
    erasableSyntaxOnly: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
    exactOptionalPropertyTypes: Schema.ZodOptional<Schema.ZodBoolean>;
    experimentalDecorators: Schema.ZodOptional<Schema.ZodBoolean>;
    isolatedDeclarations: Schema.ZodOptional<Schema.ZodBoolean>;
    jsx: Schema.ZodOptional<Schema.ZodEnum<{
      precompile: "precompile";
      preserve: "preserve";
      react: "react";
      "react-jsx": "react-jsx";
      "react-jsxdev": "react-jsxdev";
      "react-native": "react-native";
    }>>;
    jsxFactory: Schema.ZodOptional<Schema.ZodString>;
    jsxFragmentFactory: Schema.ZodOptional<Schema.ZodString>;
    jsxImportSource: Schema.ZodOptional<Schema.ZodString>;
    jsxImportSourceTypes: Schema.ZodOptional<Schema.ZodString>;
    jsxPrecompileSkipElements: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    lib: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    module: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
    moduleResolution: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
    noErrorTruncation: Schema.ZodOptional<Schema.ZodBoolean>;
    noFallthroughCasesInSwitch: Schema.ZodOptional<Schema.ZodBoolean>;
    noImplicitAny: Schema.ZodOptional<Schema.ZodBoolean>;
    noImplicitOverride: Schema.ZodOptional<Schema.ZodBoolean>;
    noImplicitReturns: Schema.ZodOptional<Schema.ZodBoolean>;
    noImplicitThis: Schema.ZodOptional<Schema.ZodBoolean>;
    noPropertyAccessFromIndexSignature: Schema.ZodOptional<Schema.ZodBoolean>;
    noUncheckedIndexedAccess: Schema.ZodOptional<Schema.ZodBoolean>;
    noUnusedLocals: Schema.ZodOptional<Schema.ZodBoolean>;
    noUnusedParameters: Schema.ZodOptional<Schema.ZodBoolean>;
    baseUrl: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
    paths: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodRecord<Schema.ZodString, Schema.ZodNullable<Schema.ZodArray<Schema.ZodNullable<Schema.ZodString>>>>>>;
    rootDirs: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    skipLibCheck: Schema.ZodOptional<Schema.ZodBoolean>;
    strict: Schema.ZodOptional<Schema.ZodBoolean>;
    strictBindCallApply: Schema.ZodOptional<Schema.ZodBoolean>;
    strictBuiltinIteratorReturn: Schema.ZodOptional<Schema.ZodBoolean>;
    strictFunctionTypes: Schema.ZodOptional<Schema.ZodBoolean>;
    strictNullChecks: Schema.ZodOptional<Schema.ZodBoolean>;
    strictPropertyInitialization: Schema.ZodOptional<Schema.ZodBoolean>;
    types: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    useUnknownInCatchVariables: Schema.ZodOptional<Schema.ZodBoolean>;
    verbatimModuleSyntax: Schema.ZodOptional<Schema.ZodBoolean>;
  }, Schema.core.$strip>>;
  deploy: Schema.ZodOptional<Schema.ZodObject<{
    org: Schema.ZodOptional<Schema.ZodString>;
    app: Schema.ZodOptional<Schema.ZodString>;
    framework: Schema.ZodOptional<Schema.ZodString>;
    install: Schema.ZodOptional<Schema.ZodString>;
    build: Schema.ZodOptional<Schema.ZodString>;
    predeploy: Schema.ZodOptional<Schema.ZodString>;
    runtime: Schema.ZodOptional<Schema.ZodObject<{
      mode: Schema.ZodOptional<Schema.ZodEnum<{
        dynamic: "dynamic";
        static: "static";
      }>>;
      entrypoint: Schema.ZodOptional<Schema.ZodString>;
      args: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      cwd: Schema.ZodOptional<Schema.ZodString>;
      spa: Schema.ZodOptional<Schema.ZodBoolean>;
    }, Schema.core.$strip>>;
    include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  }, Schema.core.$strip>>;
  importMap: Schema.ZodOptional<Schema.ZodString>;
  catalog: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
  catalogs: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>;
  imports: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
  scopes: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>;
  exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  lint: Schema.ZodOptional<Schema.ZodObject<{
    include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    plugins: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    rules: Schema.ZodOptional<Schema.ZodObject<{
      tags: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>>;
    report: Schema.ZodOptional<Schema.ZodEnum<{
      compact: "compact";
      json: "json";
      pretty: "pretty";
    }>>;
  }, Schema.core.$strip>>;
  fmt: Schema.ZodOptional<Schema.ZodObject<{
    include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    useTabs: Schema.ZodOptional<Schema.ZodBoolean>;
    lineWidth: Schema.ZodOptional<Schema.ZodNumber>;
    indentWidth: Schema.ZodOptional<Schema.ZodNumber>;
    singleQuote: Schema.ZodOptional<Schema.ZodBoolean>;
    proseWrap: Schema.ZodOptional<Schema.ZodEnum<{
      always: "always";
      never: "never";
      preserve: "preserve";
    }>>;
    semiColons: Schema.ZodOptional<Schema.ZodBoolean>;
    quoteProps: Schema.ZodOptional<Schema.ZodEnum<{
      asNeeded: "asNeeded";
      consistent: "consistent";
      preserve: "preserve";
    }>>;
    newLineKind: Schema.ZodOptional<Schema.ZodEnum<{
      auto: "auto";
      crlf: "crlf";
      lf: "lf";
      system: "system";
    }>>;
    useBraces: Schema.ZodOptional<Schema.ZodEnum<{
      always: "always";
      maintain: "maintain";
      preferNone: "preferNone";
      whenNotSingleLine: "whenNotSingleLine";
    }>>;
    bracePosition: Schema.ZodOptional<Schema.ZodEnum<{
      maintain: "maintain";
      nextLine: "nextLine";
      sameLine: "sameLine";
      sameLineUnlessHanging: "sameLineUnlessHanging";
    }>>;
    singleBodyPosition: Schema.ZodOptional<Schema.ZodEnum<{
      maintain: "maintain";
      nextLine: "nextLine";
      sameLine: "sameLine";
    }>>;
    nextControlFlowPosition: Schema.ZodOptional<Schema.ZodEnum<{
      maintain: "maintain";
      nextLine: "nextLine";
      sameLine: "sameLine";
    }>>;
    trailingCommas: Schema.ZodOptional<Schema.ZodEnum<{
      always: "always";
      never: "never";
      onlyMultiLine: "onlyMultiLine";
    }>>;
    "json.trailingCommas": Schema.ZodOptional<Schema.ZodEnum<{
      always: "always";
      jsonc: "jsonc";
      maintain: "maintain";
      never: "never";
    }>>;
    operatorPosition: Schema.ZodOptional<Schema.ZodEnum<{
      maintain: "maintain";
      nextLine: "nextLine";
      sameLine: "sameLine";
    }>>;
    "jsx.bracketPosition": Schema.ZodOptional<Schema.ZodEnum<{
      maintain: "maintain";
      nextLine: "nextLine";
      sameLine: "sameLine";
    }>>;
    "jsx.forceNewLinesSurroundingContent": Schema.ZodOptional<Schema.ZodBoolean>;
    "jsx.multiLineParens": Schema.ZodOptional<Schema.ZodEnum<{
      always: "always";
      never: "never";
      prefer: "prefer";
    }>>;
    "typeLiteral.separatorKind": Schema.ZodOptional<Schema.ZodEnum<{
      comma: "comma";
      semiColon: "semiColon";
    }>>;
    spaceAround: Schema.ZodOptional<Schema.ZodBoolean>;
    spaceSurroundingProperties: Schema.ZodOptional<Schema.ZodBoolean>;
    vueComponentCase: Schema.ZodOptional<Schema.ZodEnum<{
      ignore: "ignore";
      "kebab-case": "kebab-case";
      "pascal-case": "pascal-case";
    }>>;
    angularNextControlFlowSameLine: Schema.ZodOptional<Schema.ZodBoolean>;
    sortNamedImports: Schema.ZodOptional<Schema.ZodEnum<{
      caseInsensitive: "caseInsensitive";
      caseSensitive: "caseSensitive";
      maintain: "maintain";
    }>>;
    sortNamedExports: Schema.ZodOptional<Schema.ZodEnum<{
      caseInsensitive: "caseInsensitive";
      caseSensitive: "caseSensitive";
      maintain: "maintain";
    }>>;
    useEditorConfig: Schema.ZodOptional<Schema.ZodBoolean>;
    options: Schema.ZodOptional<Schema.ZodObject<{
      useTabs: Schema.ZodOptional<Schema.ZodBoolean>;
      lineWidth: Schema.ZodOptional<Schema.ZodNumber>;
      indentWidth: Schema.ZodOptional<Schema.ZodNumber>;
      singleQuote: Schema.ZodOptional<Schema.ZodBoolean>;
      proseWrap: Schema.ZodOptional<Schema.ZodEnum<{
        always: "always";
        never: "never";
        preserve: "preserve";
      }>>;
      semiColons: Schema.ZodOptional<Schema.ZodBoolean>;
    }, Schema.core.$strip>>;
  }, Schema.core.$strip>>;
  minimumDependencyAge: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodNumber]>, Schema.ZodObject<{
    age: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodNumber]>>;
    exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  }, Schema.core.$strip>]>>;
  nodeModulesDir: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodEnum<{
    auto: "auto";
    manual: "manual";
    none: "none";
  }>, Schema.ZodBoolean]>>;
  vendor: Schema.ZodOptional<Schema.ZodBoolean>;
  jsrDepsInNodeModules: Schema.ZodOptional<Schema.ZodBoolean>;
  preferPackageJson: Schema.ZodOptional<Schema.ZodBoolean>;
  tasks: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
    description: Schema.ZodOptional<Schema.ZodString>;
    command: Schema.ZodOptional<Schema.ZodString>;
    dependencies: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    files: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    output: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    env: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  }, Schema.core.$strip>]>>>;
  test: Schema.ZodOptional<Schema.ZodObject<{
    include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    permissions: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      all: Schema.ZodOptional<Schema.ZodBoolean>;
      read: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      write: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      import: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      env: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      net: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      run: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      ffi: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      sys: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
    }, Schema.core.$strip>]>>;
    sanitizeOps: Schema.ZodOptional<Schema.ZodBoolean>;
    sanitizeResources: Schema.ZodOptional<Schema.ZodBoolean>;
  }, Schema.core.$strip>>;
  publish: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
    include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  }, Schema.core.$strip>, Schema.ZodLiteral<false>]>>;
  bench: Schema.ZodOptional<Schema.ZodObject<{
    include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    permissions: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      all: Schema.ZodOptional<Schema.ZodBoolean>;
      read: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      write: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      import: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      env: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      net: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      run: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      ffi: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      sys: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
    }, Schema.core.$strip>]>>;
  }, Schema.core.$strip>>;
  coverage: Schema.ZodOptional<Schema.ZodObject<{
    thresholds: Schema.ZodOptional<Schema.ZodObject<{
      lines: Schema.ZodOptional<Schema.ZodNumber>;
      branches: Schema.ZodOptional<Schema.ZodNumber>;
      functions: Schema.ZodOptional<Schema.ZodNumber>;
    }, Schema.core.$strip>>;
  }, Schema.core.$strip>>;
  license: Schema.ZodOptional<Schema.ZodString>;
  lock: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodBoolean, Schema.ZodObject<{
    path: Schema.ZodOptional<Schema.ZodString>;
    frozen: Schema.ZodOptional<Schema.ZodBoolean>;
  }, Schema.core.$strip>]>>;
  unstable: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  name: Schema.ZodOptional<Schema.ZodString>;
  version: Schema.ZodOptional<Schema.ZodString>;
  exports: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodString>]>>;
  permissions: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodObject<{
    all: Schema.ZodOptional<Schema.ZodBoolean>;
    read: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
      allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
    }, Schema.core.$strip>]>>;
    write: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
      allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
    }, Schema.core.$strip>]>>;
    import: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
      allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
    }, Schema.core.$strip>]>>;
    env: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
      allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
    }, Schema.core.$strip>]>>;
    net: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
      allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
    }, Schema.core.$strip>]>>;
    run: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
      allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
    }, Schema.core.$strip>]>>;
    ffi: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
      allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
    }, Schema.core.$strip>]>>;
    sys: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
      allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
    }, Schema.core.$strip>]>>;
  }, Schema.core.$strip>>>;
  patch: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  links: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  workspace: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodArray<Schema.ZodString>, Schema.ZodObject<{
    members: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  }, Schema.core.$strip>]>>;
}, Schema.core.$strip>;
/**
 * Readonly view of the combined configuration schema. This is the strict schema
 * the merged config is validated against, so required keys must be supplied by
 * *some* grouping's config file.
 */
export declare const Configs: Schema.ZodReadonly<Schema.ZodObject<{
  description: Schema.ZodOptional<Schema.ZodString>;
  keywords: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  homepage: Schema.ZodOptional<Schema.ZodString>;
  bugs: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
    url: Schema.ZodOptional<Schema.ZodString>;
    email: Schema.ZodOptional<Schema.ZodString>;
  }, Schema.core.$strip>]>>;
  licenses: Schema.ZodOptional<Schema.ZodArray<Schema.ZodObject<{
    type: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodEnum<{
      "AGPL-3.0-only": "AGPL-3.0-only";
      "Apache-2.0": "Apache-2.0";
      "BSD-2-Clause": "BSD-2-Clause";
      "BSD-3-Clause": "BSD-3-Clause";
      "BSL-1.0": "BSL-1.0";
      "CC0-1.0": "CC0-1.0";
      "CDDL-1.0": "CDDL-1.0";
      "CDDL-1.1": "CDDL-1.1";
      "EPL-1.0": "EPL-1.0";
      "EPL-2.0": "EPL-2.0";
      "GPL-2.0-only": "GPL-2.0-only";
      "GPL-3.0-only": "GPL-3.0-only";
      ISC: "ISC";
      "LGPL-2.0-only": "LGPL-2.0-only";
      "LGPL-2.1-only": "LGPL-2.1-only";
      "LGPL-2.1-or-later": "LGPL-2.1-or-later";
      "LGPL-3.0-only": "LGPL-3.0-only";
      "LGPL-3.0-or-later": "LGPL-3.0-or-later";
      MIT: "MIT";
      "MPL-2.0": "MPL-2.0";
      "MS-PL": "MS-PL";
      UNLICENSED: "UNLICENSED";
    }>]>>;
    url: Schema.ZodOptional<Schema.ZodString>;
  }, Schema.core.$strip>>>;
  author: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
    name: Schema.ZodString;
    url: Schema.ZodOptional<Schema.ZodString>;
    email: Schema.ZodOptional<Schema.ZodString>;
  }, Schema.core.$strip>]>>;
  contributors: Schema.ZodOptional<Schema.ZodArray<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
    name: Schema.ZodString;
    url: Schema.ZodOptional<Schema.ZodString>;
    email: Schema.ZodOptional<Schema.ZodString>;
  }, Schema.core.$strip>]>>>;
  maintainers: Schema.ZodOptional<Schema.ZodArray<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
    name: Schema.ZodString;
    url: Schema.ZodOptional<Schema.ZodString>;
    email: Schema.ZodOptional<Schema.ZodString>;
  }, Schema.core.$strip>]>>>;
  main: Schema.ZodOptional<Schema.ZodString>;
  bin: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodString>]>>;
  type: Schema.ZodDefault<Schema.ZodOptional<Schema.ZodEnum<{
    commonjs: "commonjs";
    module: "module";
  }>>>;
  types: Schema.ZodOptional<Schema.ZodString>;
  typings: Schema.ZodOptional<Schema.ZodString>;
  typesVersions: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodArray<Schema.ZodString>>>>;
  man: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodArray<Schema.ZodString>]>>;
  directories: Schema.ZodOptional<Schema.ZodObject<{
    bin: Schema.ZodOptional<Schema.ZodString>;
    doc: Schema.ZodOptional<Schema.ZodString>;
    example: Schema.ZodOptional<Schema.ZodString>;
    lib: Schema.ZodOptional<Schema.ZodString>;
    man: Schema.ZodOptional<Schema.ZodString>;
    test: Schema.ZodOptional<Schema.ZodString>;
  }, Schema.core.$strip>>;
  repository: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
    type: Schema.ZodOptional<Schema.ZodString>;
    url: Schema.ZodOptional<Schema.ZodString>;
    directory: Schema.ZodOptional<Schema.ZodString>;
  }, Schema.core.$strip>]>>;
  funding: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
    url: Schema.ZodString;
    type: Schema.ZodOptional<Schema.ZodString>;
  }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
    url: Schema.ZodString;
    type: Schema.ZodOptional<Schema.ZodString>;
  }, Schema.core.$strip>]>>]>>;
  scripts: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
  config: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>;
  dependencies: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
  devDependencies: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
  optionalDependencies: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
  peerDependencies: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
  peerDependenciesMeta: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodObject<{
    optional: Schema.ZodOptional<Schema.ZodBoolean>;
  }, Schema.core.$loose>>>;
  bundleDependencies: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodArray<Schema.ZodString>, Schema.ZodBoolean]>>;
  bundledDependencies: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodArray<Schema.ZodString>, Schema.ZodBoolean]>>;
  resolutions: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>;
  overrides: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>;
  packageManager: Schema.ZodOptional<Schema.ZodString>;
  engines: Schema.ZodOptional<Schema.ZodObject<{
    node: Schema.ZodOptional<Schema.ZodString>;
    runtime: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
      name: Schema.ZodString;
      version: Schema.ZodOptional<Schema.ZodString>;
      onFail: Schema.ZodOptional<Schema.ZodEnum<{
        download: "download";
        error: "error";
        ignore: "ignore";
        warn: "warn";
      }>>;
    }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
      name: Schema.ZodString;
      version: Schema.ZodOptional<Schema.ZodString>;
      onFail: Schema.ZodOptional<Schema.ZodEnum<{
        download: "download";
        error: "error";
        ignore: "ignore";
        warn: "warn";
      }>>;
    }, Schema.core.$strip>>]>>;
  }, Schema.core.$catchall<Schema.ZodString>>>;
  volta: Schema.ZodOptional<Schema.ZodObject<{
    extends: Schema.ZodOptional<Schema.ZodString>;
  }, Schema.core.$catchall<Schema.ZodString>>>;
  engineStrict: Schema.ZodOptional<Schema.ZodBoolean>;
  os: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  cpu: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  devEngines: Schema.ZodOptional<Schema.ZodObject<{
    os: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
      name: Schema.ZodString;
      version: Schema.ZodOptional<Schema.ZodString>;
      onFail: Schema.ZodOptional<Schema.ZodEnum<{
        download: "download";
        error: "error";
        ignore: "ignore";
        warn: "warn";
      }>>;
    }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
      name: Schema.ZodString;
      version: Schema.ZodOptional<Schema.ZodString>;
      onFail: Schema.ZodOptional<Schema.ZodEnum<{
        download: "download";
        error: "error";
        ignore: "ignore";
        warn: "warn";
      }>>;
    }, Schema.core.$strip>>]>>;
    cpu: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
      name: Schema.ZodString;
      version: Schema.ZodOptional<Schema.ZodString>;
      onFail: Schema.ZodOptional<Schema.ZodEnum<{
        download: "download";
        error: "error";
        ignore: "ignore";
        warn: "warn";
      }>>;
    }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
      name: Schema.ZodString;
      version: Schema.ZodOptional<Schema.ZodString>;
      onFail: Schema.ZodOptional<Schema.ZodEnum<{
        download: "download";
        error: "error";
        ignore: "ignore";
        warn: "warn";
      }>>;
    }, Schema.core.$strip>>]>>;
    libc: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
      name: Schema.ZodString;
      version: Schema.ZodOptional<Schema.ZodString>;
      onFail: Schema.ZodOptional<Schema.ZodEnum<{
        download: "download";
        error: "error";
        ignore: "ignore";
        warn: "warn";
      }>>;
    }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
      name: Schema.ZodString;
      version: Schema.ZodOptional<Schema.ZodString>;
      onFail: Schema.ZodOptional<Schema.ZodEnum<{
        download: "download";
        error: "error";
        ignore: "ignore";
        warn: "warn";
      }>>;
    }, Schema.core.$strip>>]>>;
    runtime: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
      name: Schema.ZodString;
      version: Schema.ZodOptional<Schema.ZodString>;
      onFail: Schema.ZodOptional<Schema.ZodEnum<{
        download: "download";
        error: "error";
        ignore: "ignore";
        warn: "warn";
      }>>;
    }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
      name: Schema.ZodString;
      version: Schema.ZodOptional<Schema.ZodString>;
      onFail: Schema.ZodOptional<Schema.ZodEnum<{
        download: "download";
        error: "error";
        ignore: "ignore";
        warn: "warn";
      }>>;
    }, Schema.core.$strip>>]>>;
    packageManager: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
      name: Schema.ZodString;
      version: Schema.ZodOptional<Schema.ZodString>;
      onFail: Schema.ZodOptional<Schema.ZodEnum<{
        download: "download";
        error: "error";
        ignore: "ignore";
        warn: "warn";
      }>>;
    }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
      name: Schema.ZodString;
      version: Schema.ZodOptional<Schema.ZodString>;
      onFail: Schema.ZodOptional<Schema.ZodEnum<{
        download: "download";
        error: "error";
        ignore: "ignore";
        warn: "warn";
      }>>;
    }, Schema.core.$strip>>]>>;
  }, Schema.core.$strip>>;
  preferGlobal: Schema.ZodOptional<Schema.ZodBoolean>;
  private: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodEnum<{
    false: "false";
    true: "true";
  }>]>>;
  publishConfig: Schema.ZodOptional<Schema.ZodObject<{
    access: Schema.ZodOptional<Schema.ZodEnum<{
      public: "public";
      restricted: "restricted";
    }>>;
    tag: Schema.ZodOptional<Schema.ZodString>;
    registry: Schema.ZodOptional<Schema.ZodString>;
    provenance: Schema.ZodOptional<Schema.ZodBoolean>;
    directory: Schema.ZodOptional<Schema.ZodString>;
    linkDirectory: Schema.ZodOptional<Schema.ZodBoolean>;
    executableFiles: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  }, Schema.core.$loose>>;
  dist: Schema.ZodOptional<Schema.ZodObject<{
    shasum: Schema.ZodOptional<Schema.ZodString>;
    tarball: Schema.ZodOptional<Schema.ZodString>;
  }, Schema.core.$strip>>;
  readme: Schema.ZodOptional<Schema.ZodString>;
  module: Schema.ZodOptional<Schema.ZodString>;
  esnext: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
    main: Schema.ZodOptional<Schema.ZodString>;
    browser: Schema.ZodOptional<Schema.ZodString>;
  }, Schema.core.$catchall<Schema.ZodString>>]>>;
  workspaces: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodArray<Schema.ZodString>, Schema.ZodObject<{
    packages: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    nohoist: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  }, Schema.core.$strip>]>>;
  sideEffects: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
  compileOnSave: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
  typeAcquisition: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodObject<{
    enable: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
    include: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
    exclude: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
  }, Schema.core.$strip>>>;
  extends: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodArray<Schema.ZodString>]>>;
  watchOptions: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodObject<{
    force: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
    watchFile: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
    watchDirectory: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
    fallbackPolling: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
    synchronousWatchDirectory: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
    excludeFiles: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
    excludeDirectories: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
  }, Schema.core.$strip>>>;
  buildOptions: Schema.ZodOptional<Schema.ZodObject<{
    dry: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
    force: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
    verbose: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
    incremental: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
    assumeChangesOnlyAffectDirectDependencies: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
    traceResolution: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
  }, Schema.core.$strip>>;
  "ts-node": Schema.ZodOptional<Schema.ZodNullable<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>>;
  files: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
  include: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
  references: Schema.ZodOptional<Schema.ZodArray<Schema.ZodObject<{
    path: Schema.ZodString;
  }, Schema.core.$strip>>>;
  allowScripts: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>, Schema.ZodObject<{
    allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
    deny: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  }, Schema.core.$strip>]>>;
  compile: Schema.ZodOptional<Schema.ZodObject<{
    include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    permissions: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      all: Schema.ZodOptional<Schema.ZodBoolean>;
      read: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      write: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      import: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      env: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      net: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      run: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      ffi: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      sys: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
    }, Schema.core.$strip>]>>;
  }, Schema.core.$strip>>;
  desktop: Schema.ZodOptional<Schema.ZodObject<{
    app: Schema.ZodOptional<Schema.ZodObject<{
      name: Schema.ZodOptional<Schema.ZodString>;
      identifier: Schema.ZodOptional<Schema.ZodString>;
      icons: Schema.ZodOptional<Schema.ZodObject<{
        macos: Schema.ZodOptional<Schema.ZodString>;
        windows: Schema.ZodOptional<Schema.ZodString>;
        linux: Schema.ZodOptional<Schema.ZodString>;
      }, Schema.core.$strip>>;
      deepLinks: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>>;
    backend: Schema.ZodOptional<Schema.ZodEnum<{
      cef: "cef";
      webview: "webview";
    }>>;
    output: Schema.ZodOptional<Schema.ZodObject<{
      macos: Schema.ZodOptional<Schema.ZodString>;
      windows: Schema.ZodOptional<Schema.ZodString>;
      linux: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>>;
    release: Schema.ZodOptional<Schema.ZodObject<{
      baseUrl: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>>;
  }, Schema.core.$strip>>;
  compilerOptions: Schema.ZodOptional<Schema.ZodObject<{
    allowJs: Schema.ZodOptional<Schema.ZodBoolean>;
    allowUnreachableCode: Schema.ZodOptional<Schema.ZodBoolean>;
    allowUnusedLabels: Schema.ZodOptional<Schema.ZodBoolean>;
    checkJs: Schema.ZodOptional<Schema.ZodBoolean>;
    emitDecoratorMetadata: Schema.ZodOptional<Schema.ZodBoolean>;
    erasableSyntaxOnly: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
    exactOptionalPropertyTypes: Schema.ZodOptional<Schema.ZodBoolean>;
    experimentalDecorators: Schema.ZodOptional<Schema.ZodBoolean>;
    isolatedDeclarations: Schema.ZodOptional<Schema.ZodBoolean>;
    jsx: Schema.ZodOptional<Schema.ZodEnum<{
      precompile: "precompile";
      preserve: "preserve";
      react: "react";
      "react-jsx": "react-jsx";
      "react-jsxdev": "react-jsxdev";
      "react-native": "react-native";
    }>>;
    jsxFactory: Schema.ZodOptional<Schema.ZodString>;
    jsxFragmentFactory: Schema.ZodOptional<Schema.ZodString>;
    jsxImportSource: Schema.ZodOptional<Schema.ZodString>;
    jsxImportSourceTypes: Schema.ZodOptional<Schema.ZodString>;
    jsxPrecompileSkipElements: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    lib: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    module: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
    moduleResolution: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
    noErrorTruncation: Schema.ZodOptional<Schema.ZodBoolean>;
    noFallthroughCasesInSwitch: Schema.ZodOptional<Schema.ZodBoolean>;
    noImplicitAny: Schema.ZodOptional<Schema.ZodBoolean>;
    noImplicitOverride: Schema.ZodOptional<Schema.ZodBoolean>;
    noImplicitReturns: Schema.ZodOptional<Schema.ZodBoolean>;
    noImplicitThis: Schema.ZodOptional<Schema.ZodBoolean>;
    noPropertyAccessFromIndexSignature: Schema.ZodOptional<Schema.ZodBoolean>;
    noUncheckedIndexedAccess: Schema.ZodOptional<Schema.ZodBoolean>;
    noUnusedLocals: Schema.ZodOptional<Schema.ZodBoolean>;
    noUnusedParameters: Schema.ZodOptional<Schema.ZodBoolean>;
    baseUrl: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
    paths: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodRecord<Schema.ZodString, Schema.ZodNullable<Schema.ZodArray<Schema.ZodNullable<Schema.ZodString>>>>>>;
    rootDirs: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    skipLibCheck: Schema.ZodOptional<Schema.ZodBoolean>;
    strict: Schema.ZodOptional<Schema.ZodBoolean>;
    strictBindCallApply: Schema.ZodOptional<Schema.ZodBoolean>;
    strictBuiltinIteratorReturn: Schema.ZodOptional<Schema.ZodBoolean>;
    strictFunctionTypes: Schema.ZodOptional<Schema.ZodBoolean>;
    strictNullChecks: Schema.ZodOptional<Schema.ZodBoolean>;
    strictPropertyInitialization: Schema.ZodOptional<Schema.ZodBoolean>;
    types: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    useUnknownInCatchVariables: Schema.ZodOptional<Schema.ZodBoolean>;
    verbatimModuleSyntax: Schema.ZodOptional<Schema.ZodBoolean>;
  }, Schema.core.$strip>>;
  deploy: Schema.ZodOptional<Schema.ZodObject<{
    org: Schema.ZodOptional<Schema.ZodString>;
    app: Schema.ZodOptional<Schema.ZodString>;
    framework: Schema.ZodOptional<Schema.ZodString>;
    install: Schema.ZodOptional<Schema.ZodString>;
    build: Schema.ZodOptional<Schema.ZodString>;
    predeploy: Schema.ZodOptional<Schema.ZodString>;
    runtime: Schema.ZodOptional<Schema.ZodObject<{
      mode: Schema.ZodOptional<Schema.ZodEnum<{
        dynamic: "dynamic";
        static: "static";
      }>>;
      entrypoint: Schema.ZodOptional<Schema.ZodString>;
      args: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      cwd: Schema.ZodOptional<Schema.ZodString>;
      spa: Schema.ZodOptional<Schema.ZodBoolean>;
    }, Schema.core.$strip>>;
    include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  }, Schema.core.$strip>>;
  importMap: Schema.ZodOptional<Schema.ZodString>;
  catalog: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
  catalogs: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>;
  imports: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>;
  scopes: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>;
  exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  lint: Schema.ZodOptional<Schema.ZodObject<{
    include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    plugins: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    rules: Schema.ZodOptional<Schema.ZodObject<{
      tags: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>>;
    report: Schema.ZodOptional<Schema.ZodEnum<{
      compact: "compact";
      json: "json";
      pretty: "pretty";
    }>>;
  }, Schema.core.$strip>>;
  fmt: Schema.ZodOptional<Schema.ZodObject<{
    include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    useTabs: Schema.ZodOptional<Schema.ZodBoolean>;
    lineWidth: Schema.ZodOptional<Schema.ZodNumber>;
    indentWidth: Schema.ZodOptional<Schema.ZodNumber>;
    singleQuote: Schema.ZodOptional<Schema.ZodBoolean>;
    proseWrap: Schema.ZodOptional<Schema.ZodEnum<{
      always: "always";
      never: "never";
      preserve: "preserve";
    }>>;
    semiColons: Schema.ZodOptional<Schema.ZodBoolean>;
    quoteProps: Schema.ZodOptional<Schema.ZodEnum<{
      asNeeded: "asNeeded";
      consistent: "consistent";
      preserve: "preserve";
    }>>;
    newLineKind: Schema.ZodOptional<Schema.ZodEnum<{
      auto: "auto";
      crlf: "crlf";
      lf: "lf";
      system: "system";
    }>>;
    useBraces: Schema.ZodOptional<Schema.ZodEnum<{
      always: "always";
      maintain: "maintain";
      preferNone: "preferNone";
      whenNotSingleLine: "whenNotSingleLine";
    }>>;
    bracePosition: Schema.ZodOptional<Schema.ZodEnum<{
      maintain: "maintain";
      nextLine: "nextLine";
      sameLine: "sameLine";
      sameLineUnlessHanging: "sameLineUnlessHanging";
    }>>;
    singleBodyPosition: Schema.ZodOptional<Schema.ZodEnum<{
      maintain: "maintain";
      nextLine: "nextLine";
      sameLine: "sameLine";
    }>>;
    nextControlFlowPosition: Schema.ZodOptional<Schema.ZodEnum<{
      maintain: "maintain";
      nextLine: "nextLine";
      sameLine: "sameLine";
    }>>;
    trailingCommas: Schema.ZodOptional<Schema.ZodEnum<{
      always: "always";
      never: "never";
      onlyMultiLine: "onlyMultiLine";
    }>>;
    "json.trailingCommas": Schema.ZodOptional<Schema.ZodEnum<{
      always: "always";
      jsonc: "jsonc";
      maintain: "maintain";
      never: "never";
    }>>;
    operatorPosition: Schema.ZodOptional<Schema.ZodEnum<{
      maintain: "maintain";
      nextLine: "nextLine";
      sameLine: "sameLine";
    }>>;
    "jsx.bracketPosition": Schema.ZodOptional<Schema.ZodEnum<{
      maintain: "maintain";
      nextLine: "nextLine";
      sameLine: "sameLine";
    }>>;
    "jsx.forceNewLinesSurroundingContent": Schema.ZodOptional<Schema.ZodBoolean>;
    "jsx.multiLineParens": Schema.ZodOptional<Schema.ZodEnum<{
      always: "always";
      never: "never";
      prefer: "prefer";
    }>>;
    "typeLiteral.separatorKind": Schema.ZodOptional<Schema.ZodEnum<{
      comma: "comma";
      semiColon: "semiColon";
    }>>;
    spaceAround: Schema.ZodOptional<Schema.ZodBoolean>;
    spaceSurroundingProperties: Schema.ZodOptional<Schema.ZodBoolean>;
    vueComponentCase: Schema.ZodOptional<Schema.ZodEnum<{
      ignore: "ignore";
      "kebab-case": "kebab-case";
      "pascal-case": "pascal-case";
    }>>;
    angularNextControlFlowSameLine: Schema.ZodOptional<Schema.ZodBoolean>;
    sortNamedImports: Schema.ZodOptional<Schema.ZodEnum<{
      caseInsensitive: "caseInsensitive";
      caseSensitive: "caseSensitive";
      maintain: "maintain";
    }>>;
    sortNamedExports: Schema.ZodOptional<Schema.ZodEnum<{
      caseInsensitive: "caseInsensitive";
      caseSensitive: "caseSensitive";
      maintain: "maintain";
    }>>;
    useEditorConfig: Schema.ZodOptional<Schema.ZodBoolean>;
    options: Schema.ZodOptional<Schema.ZodObject<{
      useTabs: Schema.ZodOptional<Schema.ZodBoolean>;
      lineWidth: Schema.ZodOptional<Schema.ZodNumber>;
      indentWidth: Schema.ZodOptional<Schema.ZodNumber>;
      singleQuote: Schema.ZodOptional<Schema.ZodBoolean>;
      proseWrap: Schema.ZodOptional<Schema.ZodEnum<{
        always: "always";
        never: "never";
        preserve: "preserve";
      }>>;
      semiColons: Schema.ZodOptional<Schema.ZodBoolean>;
    }, Schema.core.$strip>>;
  }, Schema.core.$strip>>;
  minimumDependencyAge: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodNumber]>, Schema.ZodObject<{
    age: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodNumber]>>;
    exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  }, Schema.core.$strip>]>>;
  nodeModulesDir: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodEnum<{
    auto: "auto";
    manual: "manual";
    none: "none";
  }>, Schema.ZodBoolean]>>;
  vendor: Schema.ZodOptional<Schema.ZodBoolean>;
  jsrDepsInNodeModules: Schema.ZodOptional<Schema.ZodBoolean>;
  preferPackageJson: Schema.ZodOptional<Schema.ZodBoolean>;
  tasks: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
    description: Schema.ZodOptional<Schema.ZodString>;
    command: Schema.ZodOptional<Schema.ZodString>;
    dependencies: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    files: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    output: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    env: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  }, Schema.core.$strip>]>>>;
  test: Schema.ZodOptional<Schema.ZodObject<{
    include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    permissions: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      all: Schema.ZodOptional<Schema.ZodBoolean>;
      read: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      write: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      import: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      env: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      net: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      run: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      ffi: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      sys: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
    }, Schema.core.$strip>]>>;
    sanitizeOps: Schema.ZodOptional<Schema.ZodBoolean>;
    sanitizeResources: Schema.ZodOptional<Schema.ZodBoolean>;
  }, Schema.core.$strip>>;
  publish: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
    include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  }, Schema.core.$strip>, Schema.ZodLiteral<false>]>>;
  bench: Schema.ZodOptional<Schema.ZodObject<{
    include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    permissions: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      all: Schema.ZodOptional<Schema.ZodBoolean>;
      read: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      write: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      import: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      env: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      net: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      run: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      ffi: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      sys: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
    }, Schema.core.$strip>]>>;
  }, Schema.core.$strip>>;
  coverage: Schema.ZodOptional<Schema.ZodObject<{
    thresholds: Schema.ZodOptional<Schema.ZodObject<{
      lines: Schema.ZodOptional<Schema.ZodNumber>;
      branches: Schema.ZodOptional<Schema.ZodNumber>;
      functions: Schema.ZodOptional<Schema.ZodNumber>;
    }, Schema.core.$strip>>;
  }, Schema.core.$strip>>;
  license: Schema.ZodOptional<Schema.ZodString>;
  lock: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodBoolean, Schema.ZodObject<{
    path: Schema.ZodOptional<Schema.ZodString>;
    frozen: Schema.ZodOptional<Schema.ZodBoolean>;
  }, Schema.core.$strip>]>>;
  unstable: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  name: Schema.ZodOptional<Schema.ZodString>;
  version: Schema.ZodOptional<Schema.ZodString>;
  exports: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodString>]>>;
  permissions: Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodObject<{
    all: Schema.ZodOptional<Schema.ZodBoolean>;
    read: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
      allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
    }, Schema.core.$strip>]>>;
    write: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
      allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
    }, Schema.core.$strip>]>>;
    import: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
      allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
    }, Schema.core.$strip>]>>;
    env: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
      allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
    }, Schema.core.$strip>]>>;
    net: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
      allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
    }, Schema.core.$strip>]>>;
    run: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
      allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
    }, Schema.core.$strip>]>>;
    ffi: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
      allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
    }, Schema.core.$strip>]>>;
    sys: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
      allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
    }, Schema.core.$strip>]>>;
  }, Schema.core.$strip>>>;
  patch: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  links: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  workspace: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodArray<Schema.ZodString>, Schema.ZodObject<{
    members: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
  }, Schema.core.$strip>]>>;
}, Schema.core.$strip>>;
/**
 * Strongly-typed `defineConfig` for authoring a config file.
 *
 * Bound to {@link ConfigObject} with every field optional, so a single
 * `<grouping>.config.ts` or `<grouping>.ts` may declare just its own slice while
 * still being fully checked: known keys are validated, unknown keys are rejected,
 * and editors autocomplete them — no codegen needed.
 *
 * Completeness is then enforced once the loader merges every grouping's file
 * and parses the result against {@link Configs}.
 *
 * ```ts
 * import { defineConfig } from "./src/config.ts";
 * export default defineConfig({ appName: "My App" });
 * ```
 */
export declare const defineConfig: {
  (options: {
    description?: string | undefined;
    keywords?: string[] | undefined;
    homepage?: string | undefined;
    bugs?: string | {
      url?: string | undefined;
      email?: string | undefined;
    } | undefined;
    licenses?: {
      type?: string | undefined;
      url?: string | undefined;
    }[] | undefined;
    author?: string | {
      name: string;
      url?: string | undefined;
      email?: string | undefined;
    } | undefined;
    contributors?: (string | {
      name: string;
      url?: string | undefined;
      email?: string | undefined;
    })[] | undefined;
    maintainers?: (string | {
      name: string;
      url?: string | undefined;
      email?: string | undefined;
    })[] | undefined;
    main?: string | undefined;
    bin?: string | Record<string, string> | undefined;
    type?: "commonjs" | "module" | undefined;
    types?: string | undefined;
    typings?: string | undefined;
    typesVersions?: Record<string, Record<string, string[]>> | undefined;
    man?: string | string[] | undefined;
    directories?: {
      bin?: string | undefined;
      doc?: string | undefined;
      example?: string | undefined;
      lib?: string | undefined;
      man?: string | undefined;
      test?: string | undefined;
    } | undefined;
    repository?: string | {
      type?: string | undefined;
      url?: string | undefined;
      directory?: string | undefined;
    } | undefined;
    funding?: string | (string | {
      url: string;
      type?: string | undefined;
    })[] | {
      url: string;
      type?: string | undefined;
    } | undefined;
    scripts?: Record<string, string> | undefined;
    config?: Record<string, unknown> | undefined;
    dependencies?: Record<string, string> | undefined;
    devDependencies?: Record<string, string> | undefined;
    optionalDependencies?: Record<string, string> | undefined;
    peerDependencies?: Record<string, string> | undefined;
    peerDependenciesMeta?: Record<string, {
      [x: string]: unknown;
      optional?: boolean | undefined;
    }> | undefined;
    bundleDependencies?: boolean | string[] | undefined;
    bundledDependencies?: boolean | string[] | undefined;
    resolutions?: Record<string, unknown> | undefined;
    overrides?: Record<string, unknown> | undefined;
    packageManager?: string | undefined;
    engines?: {
      [x: string]: string;
      node?: string | undefined;
      runtime?: {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      }[] | {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      } | undefined;
    } | undefined;
    volta?: {
      [x: string]: string;
      extends?: string | undefined;
    } | undefined;
    engineStrict?: boolean | undefined;
    os?: string[] | undefined;
    cpu?: string[] | undefined;
    devEngines?: {
      os?: {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      }[] | {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      } | undefined;
      cpu?: {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      }[] | {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      } | undefined;
      libc?: {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      }[] | {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      } | undefined;
      runtime?: {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      }[] | {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      } | undefined;
      packageManager?: {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      }[] | {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      } | undefined;
    } | undefined;
    preferGlobal?: boolean | undefined;
    private?: "false" | "true" | boolean | undefined;
    publishConfig?: {
      [x: string]: unknown;
      access?: "public" | "restricted" | undefined;
      tag?: string | undefined;
      registry?: string | undefined;
      provenance?: boolean | undefined;
      directory?: string | undefined;
      linkDirectory?: boolean | undefined;
      executableFiles?: string[] | undefined;
    } | undefined;
    dist?: {
      shasum?: string | undefined;
      tarball?: string | undefined;
    } | undefined;
    readme?: string | undefined;
    module?: string | undefined;
    esnext?: string | {
      [x: string]: string;
      main?: string | undefined;
      browser?: string | undefined;
    } | undefined;
    workspaces?: string[] | {
      packages?: string[] | undefined;
      nohoist?: string[] | undefined;
    } | undefined;
    sideEffects?: boolean | string[] | undefined;
    compileOnSave?: boolean | null | undefined;
    typeAcquisition?: {
      enable?: boolean | null | undefined;
      include?: string[] | null | undefined;
      exclude?: string[] | null | undefined;
    } | null | undefined;
    extends?: string | string[] | undefined;
    watchOptions?: {
      force?: string | null | undefined;
      watchFile?: string | null | undefined;
      watchDirectory?: string | null | undefined;
      fallbackPolling?: string | null | undefined;
      synchronousWatchDirectory?: boolean | null | undefined;
      excludeFiles?: string[] | null | undefined;
      excludeDirectories?: string[] | null | undefined;
    } | null | undefined;
    buildOptions?: {
      dry?: boolean | null | undefined;
      force?: boolean | null | undefined;
      verbose?: boolean | null | undefined;
      incremental?: boolean | null | undefined;
      assumeChangesOnlyAffectDirectDependencies?: boolean | null | undefined;
      traceResolution?: boolean | null | undefined;
    } | undefined;
    "ts-node"?: Record<string, unknown> | null | undefined;
    files?: string[] | null | undefined;
    include?: string[] | null | undefined;
    references?: {
      path: string;
    }[] | undefined;
    allowScripts?: boolean | string[] | {
      allow?: boolean | string[] | undefined;
      deny?: string[] | undefined;
    } | undefined;
    compile?: {
      include?: string[] | undefined;
      exclude?: string[] | undefined;
      permissions?: string | {
        all?: boolean | undefined;
        read?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
          ignore?: boolean | string[] | undefined;
        } | undefined;
        write?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        import?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        env?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
          ignore?: boolean | string[] | undefined;
        } | undefined;
        net?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        run?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        ffi?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        sys?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
      } | undefined;
    } | undefined;
    desktop?: {
      app?: {
        name?: string | undefined;
        identifier?: string | undefined;
        icons?: {
          macos?: string | undefined;
          windows?: string | undefined;
          linux?: string | undefined;
        } | undefined;
        deepLinks?: string[] | undefined;
      } | undefined;
      backend?: "cef" | "webview" | undefined;
      output?: {
        macos?: string | undefined;
        windows?: string | undefined;
        linux?: string | undefined;
      } | undefined;
      release?: {
        baseUrl?: string | undefined;
      } | undefined;
    } | undefined;
    compilerOptions?: {
      allowJs?: boolean | undefined;
      allowUnreachableCode?: boolean | undefined;
      allowUnusedLabels?: boolean | undefined;
      checkJs?: boolean | undefined;
      emitDecoratorMetadata?: boolean | undefined;
      erasableSyntaxOnly?: boolean | null | undefined;
      exactOptionalPropertyTypes?: boolean | undefined;
      experimentalDecorators?: boolean | undefined;
      isolatedDeclarations?: boolean | undefined;
      jsx?: "precompile" | "preserve" | "react" | "react-jsx" | "react-jsxdev" | "react-native" | undefined;
      jsxFactory?: string | undefined;
      jsxFragmentFactory?: string | undefined;
      jsxImportSource?: string | undefined;
      jsxImportSourceTypes?: string | undefined;
      jsxPrecompileSkipElements?: string[] | undefined;
      lib?: string[] | undefined;
      module?: string | null | undefined;
      moduleResolution?: string | null | undefined;
      noErrorTruncation?: boolean | undefined;
      noFallthroughCasesInSwitch?: boolean | undefined;
      noImplicitAny?: boolean | undefined;
      noImplicitOverride?: boolean | undefined;
      noImplicitReturns?: boolean | undefined;
      noImplicitThis?: boolean | undefined;
      noPropertyAccessFromIndexSignature?: boolean | undefined;
      noUncheckedIndexedAccess?: boolean | undefined;
      noUnusedLocals?: boolean | undefined;
      noUnusedParameters?: boolean | undefined;
      baseUrl?: string | null | undefined;
      paths?: Record<string, (string | null)[] | null> | null | undefined;
      rootDirs?: string[] | undefined;
      skipLibCheck?: boolean | undefined;
      strict?: boolean | undefined;
      strictBindCallApply?: boolean | undefined;
      strictBuiltinIteratorReturn?: boolean | undefined;
      strictFunctionTypes?: boolean | undefined;
      strictNullChecks?: boolean | undefined;
      strictPropertyInitialization?: boolean | undefined;
      types?: string[] | undefined;
      useUnknownInCatchVariables?: boolean | undefined;
      verbatimModuleSyntax?: boolean | undefined;
    } | undefined;
    deploy?: {
      org?: string | undefined;
      app?: string | undefined;
      framework?: string | undefined;
      install?: string | undefined;
      build?: string | undefined;
      predeploy?: string | undefined;
      runtime?: {
        mode?: "dynamic" | "static" | undefined;
        entrypoint?: string | undefined;
        args?: string[] | undefined;
        cwd?: string | undefined;
        spa?: boolean | undefined;
      } | undefined;
      include?: string[] | undefined;
      exclude?: string[] | undefined;
    } | undefined;
    importMap?: string | undefined;
    catalog?: Record<string, string> | undefined;
    catalogs?: Record<string, Record<string, string>> | undefined;
    imports?: Record<string, string> | undefined;
    scopes?: Record<string, Record<string, string>> | undefined;
    exclude?: string[] | undefined;
    lint?: {
      include?: string[] | undefined;
      exclude?: string[] | undefined;
      plugins?: string[] | undefined;
      rules?: {
        tags?: string[] | undefined;
        exclude?: string[] | undefined;
        include?: string[] | undefined;
      } | undefined;
      report?: "compact" | "json" | "pretty" | undefined;
    } | undefined;
    fmt?: {
      include?: string[] | undefined;
      exclude?: string[] | undefined;
      useTabs?: boolean | undefined;
      lineWidth?: number | undefined;
      indentWidth?: number | undefined;
      singleQuote?: boolean | undefined;
      proseWrap?: "always" | "never" | "preserve" | undefined;
      semiColons?: boolean | undefined;
      quoteProps?: "asNeeded" | "consistent" | "preserve" | undefined;
      newLineKind?: "auto" | "crlf" | "lf" | "system" | undefined;
      useBraces?: "always" | "maintain" | "preferNone" | "whenNotSingleLine" | undefined;
      bracePosition?: "maintain" | "nextLine" | "sameLine" | "sameLineUnlessHanging" | undefined;
      singleBodyPosition?: "maintain" | "nextLine" | "sameLine" | undefined;
      nextControlFlowPosition?: "maintain" | "nextLine" | "sameLine" | undefined;
      trailingCommas?: "always" | "never" | "onlyMultiLine" | undefined;
      "json.trailingCommas"?: "always" | "jsonc" | "maintain" | "never" | undefined;
      operatorPosition?: "maintain" | "nextLine" | "sameLine" | undefined;
      "jsx.bracketPosition"?: "maintain" | "nextLine" | "sameLine" | undefined;
      "jsx.forceNewLinesSurroundingContent"?: boolean | undefined;
      "jsx.multiLineParens"?: "always" | "never" | "prefer" | undefined;
      "typeLiteral.separatorKind"?: "comma" | "semiColon" | undefined;
      spaceAround?: boolean | undefined;
      spaceSurroundingProperties?: boolean | undefined;
      vueComponentCase?: "ignore" | "kebab-case" | "pascal-case" | undefined;
      angularNextControlFlowSameLine?: boolean | undefined;
      sortNamedImports?: "caseInsensitive" | "caseSensitive" | "maintain" | undefined;
      sortNamedExports?: "caseInsensitive" | "caseSensitive" | "maintain" | undefined;
      useEditorConfig?: boolean | undefined;
      options?: {
        useTabs?: boolean | undefined;
        lineWidth?: number | undefined;
        indentWidth?: number | undefined;
        singleQuote?: boolean | undefined;
        proseWrap?: "always" | "never" | "preserve" | undefined;
        semiColons?: boolean | undefined;
      } | undefined;
    } | undefined;
    minimumDependencyAge?: string | number | {
      age?: string | number | undefined;
      exclude?: string[] | undefined;
    } | undefined;
    nodeModulesDir?: "auto" | "manual" | "none" | boolean | undefined;
    vendor?: boolean | undefined;
    jsrDepsInNodeModules?: boolean | undefined;
    preferPackageJson?: boolean | undefined;
    tasks?: Record<string, string | {
      description?: string | undefined;
      command?: string | undefined;
      dependencies?: string[] | undefined;
      files?: string[] | undefined;
      output?: string[] | undefined;
      env?: string[] | undefined;
    }> | undefined;
    test?: {
      include?: string[] | undefined;
      exclude?: string[] | undefined;
      permissions?: string | {
        all?: boolean | undefined;
        read?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
          ignore?: boolean | string[] | undefined;
        } | undefined;
        write?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        import?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        env?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
          ignore?: boolean | string[] | undefined;
        } | undefined;
        net?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        run?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        ffi?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        sys?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
      } | undefined;
      sanitizeOps?: boolean | undefined;
      sanitizeResources?: boolean | undefined;
    } | undefined;
    publish?: false | {
      include?: string[] | undefined;
      exclude?: string[] | undefined;
    } | undefined;
    bench?: {
      include?: string[] | undefined;
      exclude?: string[] | undefined;
      permissions?: string | {
        all?: boolean | undefined;
        read?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
          ignore?: boolean | string[] | undefined;
        } | undefined;
        write?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        import?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        env?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
          ignore?: boolean | string[] | undefined;
        } | undefined;
        net?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        run?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        ffi?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        sys?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
      } | undefined;
    } | undefined;
    coverage?: {
      thresholds?: {
        lines?: number | undefined;
        branches?: number | undefined;
        functions?: number | undefined;
      } | undefined;
    } | undefined;
    license?: string | undefined;
    lock?: string | boolean | {
      path?: string | undefined;
      frozen?: boolean | undefined;
    } | undefined;
    unstable?: string[] | undefined;
    name?: string | undefined;
    version?: string | undefined;
    exports?: string | Record<string, string> | undefined;
    permissions?: Record<string, {
      all?: boolean | undefined;
      read?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
        ignore?: boolean | string[] | undefined;
      } | undefined;
      write?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
      } | undefined;
      import?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
      } | undefined;
      env?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
        ignore?: boolean | string[] | undefined;
      } | undefined;
      net?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
      } | undefined;
      run?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
      } | undefined;
      ffi?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
      } | undefined;
      sys?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
      } | undefined;
    }> | undefined;
    patch?: string[] | undefined;
    links?: string[] | undefined;
    workspace?: string[] | {
      members?: string[] | undefined;
    } | undefined;
  }): {
    description?: string | undefined;
    keywords?: string[] | undefined;
    homepage?: string | undefined;
    bugs?: string | {
      url?: string | undefined;
      email?: string | undefined;
    } | undefined;
    licenses?: {
      type?: string | undefined;
      url?: string | undefined;
    }[] | undefined;
    author?: string | {
      name: string;
      url?: string | undefined;
      email?: string | undefined;
    } | undefined;
    contributors?: (string | {
      name: string;
      url?: string | undefined;
      email?: string | undefined;
    })[] | undefined;
    maintainers?: (string | {
      name: string;
      url?: string | undefined;
      email?: string | undefined;
    })[] | undefined;
    main?: string | undefined;
    bin?: string | Record<string, string> | undefined;
    type?: "commonjs" | "module" | undefined;
    types?: string | undefined;
    typings?: string | undefined;
    typesVersions?: Record<string, Record<string, string[]>> | undefined;
    man?: string | string[] | undefined;
    directories?: {
      bin?: string | undefined;
      doc?: string | undefined;
      example?: string | undefined;
      lib?: string | undefined;
      man?: string | undefined;
      test?: string | undefined;
    } | undefined;
    repository?: string | {
      type?: string | undefined;
      url?: string | undefined;
      directory?: string | undefined;
    } | undefined;
    funding?: string | (string | {
      url: string;
      type?: string | undefined;
    })[] | {
      url: string;
      type?: string | undefined;
    } | undefined;
    scripts?: Record<string, string> | undefined;
    config?: Record<string, unknown> | undefined;
    dependencies?: Record<string, string> | undefined;
    devDependencies?: Record<string, string> | undefined;
    optionalDependencies?: Record<string, string> | undefined;
    peerDependencies?: Record<string, string> | undefined;
    peerDependenciesMeta?: Record<string, {
      [x: string]: unknown;
      optional?: boolean | undefined;
    }> | undefined;
    bundleDependencies?: boolean | string[] | undefined;
    bundledDependencies?: boolean | string[] | undefined;
    resolutions?: Record<string, unknown> | undefined;
    overrides?: Record<string, unknown> | undefined;
    packageManager?: string | undefined;
    engines?: {
      [x: string]: string;
      node?: string | undefined;
      runtime?: {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      }[] | {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      } | undefined;
    } | undefined;
    volta?: {
      [x: string]: string;
      extends?: string | undefined;
    } | undefined;
    engineStrict?: boolean | undefined;
    os?: string[] | undefined;
    cpu?: string[] | undefined;
    devEngines?: {
      os?: {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      }[] | {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      } | undefined;
      cpu?: {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      }[] | {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      } | undefined;
      libc?: {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      }[] | {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      } | undefined;
      runtime?: {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      }[] | {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      } | undefined;
      packageManager?: {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      }[] | {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      } | undefined;
    } | undefined;
    preferGlobal?: boolean | undefined;
    private?: "false" | "true" | boolean | undefined;
    publishConfig?: {
      [x: string]: unknown;
      access?: "public" | "restricted" | undefined;
      tag?: string | undefined;
      registry?: string | undefined;
      provenance?: boolean | undefined;
      directory?: string | undefined;
      linkDirectory?: boolean | undefined;
      executableFiles?: string[] | undefined;
    } | undefined;
    dist?: {
      shasum?: string | undefined;
      tarball?: string | undefined;
    } | undefined;
    readme?: string | undefined;
    module?: string | undefined;
    esnext?: string | {
      [x: string]: string;
      main?: string | undefined;
      browser?: string | undefined;
    } | undefined;
    workspaces?: string[] | {
      packages?: string[] | undefined;
      nohoist?: string[] | undefined;
    } | undefined;
    sideEffects?: boolean | string[] | undefined;
    compileOnSave?: boolean | null | undefined;
    typeAcquisition?: {
      enable?: boolean | null | undefined;
      include?: string[] | null | undefined;
      exclude?: string[] | null | undefined;
    } | null | undefined;
    extends?: string | string[] | undefined;
    watchOptions?: {
      force?: string | null | undefined;
      watchFile?: string | null | undefined;
      watchDirectory?: string | null | undefined;
      fallbackPolling?: string | null | undefined;
      synchronousWatchDirectory?: boolean | null | undefined;
      excludeFiles?: string[] | null | undefined;
      excludeDirectories?: string[] | null | undefined;
    } | null | undefined;
    buildOptions?: {
      dry?: boolean | null | undefined;
      force?: boolean | null | undefined;
      verbose?: boolean | null | undefined;
      incremental?: boolean | null | undefined;
      assumeChangesOnlyAffectDirectDependencies?: boolean | null | undefined;
      traceResolution?: boolean | null | undefined;
    } | undefined;
    "ts-node"?: Record<string, unknown> | null | undefined;
    files?: string[] | null | undefined;
    include?: string[] | null | undefined;
    references?: {
      path: string;
    }[] | undefined;
    allowScripts?: boolean | string[] | {
      allow?: boolean | string[] | undefined;
      deny?: string[] | undefined;
    } | undefined;
    compile?: {
      include?: string[] | undefined;
      exclude?: string[] | undefined;
      permissions?: string | {
        all?: boolean | undefined;
        read?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
          ignore?: boolean | string[] | undefined;
        } | undefined;
        write?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        import?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        env?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
          ignore?: boolean | string[] | undefined;
        } | undefined;
        net?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        run?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        ffi?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        sys?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
      } | undefined;
    } | undefined;
    desktop?: {
      app?: {
        name?: string | undefined;
        identifier?: string | undefined;
        icons?: {
          macos?: string | undefined;
          windows?: string | undefined;
          linux?: string | undefined;
        } | undefined;
        deepLinks?: string[] | undefined;
      } | undefined;
      backend?: "cef" | "webview" | undefined;
      output?: {
        macos?: string | undefined;
        windows?: string | undefined;
        linux?: string | undefined;
      } | undefined;
      release?: {
        baseUrl?: string | undefined;
      } | undefined;
    } | undefined;
    compilerOptions?: {
      allowJs?: boolean | undefined;
      allowUnreachableCode?: boolean | undefined;
      allowUnusedLabels?: boolean | undefined;
      checkJs?: boolean | undefined;
      emitDecoratorMetadata?: boolean | undefined;
      erasableSyntaxOnly?: boolean | null | undefined;
      exactOptionalPropertyTypes?: boolean | undefined;
      experimentalDecorators?: boolean | undefined;
      isolatedDeclarations?: boolean | undefined;
      jsx?: "precompile" | "preserve" | "react" | "react-jsx" | "react-jsxdev" | "react-native" | undefined;
      jsxFactory?: string | undefined;
      jsxFragmentFactory?: string | undefined;
      jsxImportSource?: string | undefined;
      jsxImportSourceTypes?: string | undefined;
      jsxPrecompileSkipElements?: string[] | undefined;
      lib?: string[] | undefined;
      module?: string | null | undefined;
      moduleResolution?: string | null | undefined;
      noErrorTruncation?: boolean | undefined;
      noFallthroughCasesInSwitch?: boolean | undefined;
      noImplicitAny?: boolean | undefined;
      noImplicitOverride?: boolean | undefined;
      noImplicitReturns?: boolean | undefined;
      noImplicitThis?: boolean | undefined;
      noPropertyAccessFromIndexSignature?: boolean | undefined;
      noUncheckedIndexedAccess?: boolean | undefined;
      noUnusedLocals?: boolean | undefined;
      noUnusedParameters?: boolean | undefined;
      baseUrl?: string | null | undefined;
      paths?: Record<string, (string | null)[] | null> | null | undefined;
      rootDirs?: string[] | undefined;
      skipLibCheck?: boolean | undefined;
      strict?: boolean | undefined;
      strictBindCallApply?: boolean | undefined;
      strictBuiltinIteratorReturn?: boolean | undefined;
      strictFunctionTypes?: boolean | undefined;
      strictNullChecks?: boolean | undefined;
      strictPropertyInitialization?: boolean | undefined;
      types?: string[] | undefined;
      useUnknownInCatchVariables?: boolean | undefined;
      verbatimModuleSyntax?: boolean | undefined;
    } | undefined;
    deploy?: {
      org?: string | undefined;
      app?: string | undefined;
      framework?: string | undefined;
      install?: string | undefined;
      build?: string | undefined;
      predeploy?: string | undefined;
      runtime?: {
        mode?: "dynamic" | "static" | undefined;
        entrypoint?: string | undefined;
        args?: string[] | undefined;
        cwd?: string | undefined;
        spa?: boolean | undefined;
      } | undefined;
      include?: string[] | undefined;
      exclude?: string[] | undefined;
    } | undefined;
    importMap?: string | undefined;
    catalog?: Record<string, string> | undefined;
    catalogs?: Record<string, Record<string, string>> | undefined;
    imports?: Record<string, string> | undefined;
    scopes?: Record<string, Record<string, string>> | undefined;
    exclude?: string[] | undefined;
    lint?: {
      include?: string[] | undefined;
      exclude?: string[] | undefined;
      plugins?: string[] | undefined;
      rules?: {
        tags?: string[] | undefined;
        exclude?: string[] | undefined;
        include?: string[] | undefined;
      } | undefined;
      report?: "compact" | "json" | "pretty" | undefined;
    } | undefined;
    fmt?: {
      include?: string[] | undefined;
      exclude?: string[] | undefined;
      useTabs?: boolean | undefined;
      lineWidth?: number | undefined;
      indentWidth?: number | undefined;
      singleQuote?: boolean | undefined;
      proseWrap?: "always" | "never" | "preserve" | undefined;
      semiColons?: boolean | undefined;
      quoteProps?: "asNeeded" | "consistent" | "preserve" | undefined;
      newLineKind?: "auto" | "crlf" | "lf" | "system" | undefined;
      useBraces?: "always" | "maintain" | "preferNone" | "whenNotSingleLine" | undefined;
      bracePosition?: "maintain" | "nextLine" | "sameLine" | "sameLineUnlessHanging" | undefined;
      singleBodyPosition?: "maintain" | "nextLine" | "sameLine" | undefined;
      nextControlFlowPosition?: "maintain" | "nextLine" | "sameLine" | undefined;
      trailingCommas?: "always" | "never" | "onlyMultiLine" | undefined;
      "json.trailingCommas"?: "always" | "jsonc" | "maintain" | "never" | undefined;
      operatorPosition?: "maintain" | "nextLine" | "sameLine" | undefined;
      "jsx.bracketPosition"?: "maintain" | "nextLine" | "sameLine" | undefined;
      "jsx.forceNewLinesSurroundingContent"?: boolean | undefined;
      "jsx.multiLineParens"?: "always" | "never" | "prefer" | undefined;
      "typeLiteral.separatorKind"?: "comma" | "semiColon" | undefined;
      spaceAround?: boolean | undefined;
      spaceSurroundingProperties?: boolean | undefined;
      vueComponentCase?: "ignore" | "kebab-case" | "pascal-case" | undefined;
      angularNextControlFlowSameLine?: boolean | undefined;
      sortNamedImports?: "caseInsensitive" | "caseSensitive" | "maintain" | undefined;
      sortNamedExports?: "caseInsensitive" | "caseSensitive" | "maintain" | undefined;
      useEditorConfig?: boolean | undefined;
      options?: {
        useTabs?: boolean | undefined;
        lineWidth?: number | undefined;
        indentWidth?: number | undefined;
        singleQuote?: boolean | undefined;
        proseWrap?: "always" | "never" | "preserve" | undefined;
        semiColons?: boolean | undefined;
      } | undefined;
    } | undefined;
    minimumDependencyAge?: string | number | {
      age?: string | number | undefined;
      exclude?: string[] | undefined;
    } | undefined;
    nodeModulesDir?: "auto" | "manual" | "none" | boolean | undefined;
    vendor?: boolean | undefined;
    jsrDepsInNodeModules?: boolean | undefined;
    preferPackageJson?: boolean | undefined;
    tasks?: Record<string, string | {
      description?: string | undefined;
      command?: string | undefined;
      dependencies?: string[] | undefined;
      files?: string[] | undefined;
      output?: string[] | undefined;
      env?: string[] | undefined;
    }> | undefined;
    test?: {
      include?: string[] | undefined;
      exclude?: string[] | undefined;
      permissions?: string | {
        all?: boolean | undefined;
        read?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
          ignore?: boolean | string[] | undefined;
        } | undefined;
        write?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        import?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        env?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
          ignore?: boolean | string[] | undefined;
        } | undefined;
        net?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        run?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        ffi?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        sys?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
      } | undefined;
      sanitizeOps?: boolean | undefined;
      sanitizeResources?: boolean | undefined;
    } | undefined;
    publish?: false | {
      include?: string[] | undefined;
      exclude?: string[] | undefined;
    } | undefined;
    bench?: {
      include?: string[] | undefined;
      exclude?: string[] | undefined;
      permissions?: string | {
        all?: boolean | undefined;
        read?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
          ignore?: boolean | string[] | undefined;
        } | undefined;
        write?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        import?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        env?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
          ignore?: boolean | string[] | undefined;
        } | undefined;
        net?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        run?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        ffi?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        sys?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
      } | undefined;
    } | undefined;
    coverage?: {
      thresholds?: {
        lines?: number | undefined;
        branches?: number | undefined;
        functions?: number | undefined;
      } | undefined;
    } | undefined;
    license?: string | undefined;
    lock?: string | boolean | {
      path?: string | undefined;
      frozen?: boolean | undefined;
    } | undefined;
    unstable?: string[] | undefined;
    name?: string | undefined;
    version?: string | undefined;
    exports?: string | Record<string, string> | undefined;
    permissions?: Record<string, {
      all?: boolean | undefined;
      read?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
        ignore?: boolean | string[] | undefined;
      } | undefined;
      write?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
      } | undefined;
      import?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
      } | undefined;
      env?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
        ignore?: boolean | string[] | undefined;
      } | undefined;
      net?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
      } | undefined;
      run?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
      } | undefined;
      ffi?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
      } | undefined;
      sys?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
      } | undefined;
    }> | undefined;
    patch?: string[] | undefined;
    links?: string[] | undefined;
    workspace?: string[] | {
      members?: string[] | undefined;
    } | undefined;
  };
  (options: {
    description?: string | undefined;
    keywords?: string[] | undefined;
    homepage?: string | undefined;
    bugs?: string | {
      url?: string | undefined;
      email?: string | undefined;
    } | undefined;
    licenses?: {
      type?: string | undefined;
      url?: string | undefined;
    }[] | undefined;
    author?: string | {
      name: string;
      url?: string | undefined;
      email?: string | undefined;
    } | undefined;
    contributors?: (string | {
      name: string;
      url?: string | undefined;
      email?: string | undefined;
    })[] | undefined;
    maintainers?: (string | {
      name: string;
      url?: string | undefined;
      email?: string | undefined;
    })[] | undefined;
    main?: string | undefined;
    bin?: string | Record<string, string> | undefined;
    type?: "commonjs" | "module" | undefined;
    types?: string | undefined;
    typings?: string | undefined;
    typesVersions?: Record<string, Record<string, string[]>> | undefined;
    man?: string | string[] | undefined;
    directories?: {
      bin?: string | undefined;
      doc?: string | undefined;
      example?: string | undefined;
      lib?: string | undefined;
      man?: string | undefined;
      test?: string | undefined;
    } | undefined;
    repository?: string | {
      type?: string | undefined;
      url?: string | undefined;
      directory?: string | undefined;
    } | undefined;
    funding?: string | (string | {
      url: string;
      type?: string | undefined;
    })[] | {
      url: string;
      type?: string | undefined;
    } | undefined;
    scripts?: Record<string, string> | undefined;
    config?: Record<string, unknown> | undefined;
    dependencies?: Record<string, string> | undefined;
    devDependencies?: Record<string, string> | undefined;
    optionalDependencies?: Record<string, string> | undefined;
    peerDependencies?: Record<string, string> | undefined;
    peerDependenciesMeta?: Record<string, {
      [x: string]: unknown;
      optional?: boolean | undefined;
    }> | undefined;
    bundleDependencies?: boolean | string[] | undefined;
    bundledDependencies?: boolean | string[] | undefined;
    resolutions?: Record<string, unknown> | undefined;
    overrides?: Record<string, unknown> | undefined;
    packageManager?: string | undefined;
    engines?: {
      [x: string]: string;
      node?: string | undefined;
      runtime?: {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      }[] | {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      } | undefined;
    } | undefined;
    volta?: {
      [x: string]: string;
      extends?: string | undefined;
    } | undefined;
    engineStrict?: boolean | undefined;
    os?: string[] | undefined;
    cpu?: string[] | undefined;
    devEngines?: {
      os?: {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      }[] | {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      } | undefined;
      cpu?: {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      }[] | {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      } | undefined;
      libc?: {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      }[] | {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      } | undefined;
      runtime?: {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      }[] | {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      } | undefined;
      packageManager?: {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      }[] | {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      } | undefined;
    } | undefined;
    preferGlobal?: boolean | undefined;
    private?: "false" | "true" | boolean | undefined;
    publishConfig?: {
      [x: string]: unknown;
      access?: "public" | "restricted" | undefined;
      tag?: string | undefined;
      registry?: string | undefined;
      provenance?: boolean | undefined;
      directory?: string | undefined;
      linkDirectory?: boolean | undefined;
      executableFiles?: string[] | undefined;
    } | undefined;
    dist?: {
      shasum?: string | undefined;
      tarball?: string | undefined;
    } | undefined;
    readme?: string | undefined;
    module?: string | undefined;
    esnext?: string | {
      [x: string]: string;
      main?: string | undefined;
      browser?: string | undefined;
    } | undefined;
    workspaces?: string[] | {
      packages?: string[] | undefined;
      nohoist?: string[] | undefined;
    } | undefined;
    sideEffects?: boolean | string[] | undefined;
    compileOnSave?: boolean | null | undefined;
    typeAcquisition?: {
      enable?: boolean | null | undefined;
      include?: string[] | null | undefined;
      exclude?: string[] | null | undefined;
    } | null | undefined;
    extends?: string | string[] | undefined;
    watchOptions?: {
      force?: string | null | undefined;
      watchFile?: string | null | undefined;
      watchDirectory?: string | null | undefined;
      fallbackPolling?: string | null | undefined;
      synchronousWatchDirectory?: boolean | null | undefined;
      excludeFiles?: string[] | null | undefined;
      excludeDirectories?: string[] | null | undefined;
    } | null | undefined;
    buildOptions?: {
      dry?: boolean | null | undefined;
      force?: boolean | null | undefined;
      verbose?: boolean | null | undefined;
      incremental?: boolean | null | undefined;
      assumeChangesOnlyAffectDirectDependencies?: boolean | null | undefined;
      traceResolution?: boolean | null | undefined;
    } | undefined;
    "ts-node"?: Record<string, unknown> | null | undefined;
    files?: string[] | null | undefined;
    include?: string[] | null | undefined;
    references?: {
      path: string;
    }[] | undefined;
    allowScripts?: boolean | string[] | {
      allow?: boolean | string[] | undefined;
      deny?: string[] | undefined;
    } | undefined;
    compile?: {
      include?: string[] | undefined;
      exclude?: string[] | undefined;
      permissions?: string | {
        all?: boolean | undefined;
        read?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
          ignore?: boolean | string[] | undefined;
        } | undefined;
        write?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        import?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        env?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
          ignore?: boolean | string[] | undefined;
        } | undefined;
        net?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        run?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        ffi?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        sys?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
      } | undefined;
    } | undefined;
    desktop?: {
      app?: {
        name?: string | undefined;
        identifier?: string | undefined;
        icons?: {
          macos?: string | undefined;
          windows?: string | undefined;
          linux?: string | undefined;
        } | undefined;
        deepLinks?: string[] | undefined;
      } | undefined;
      backend?: "cef" | "webview" | undefined;
      output?: {
        macos?: string | undefined;
        windows?: string | undefined;
        linux?: string | undefined;
      } | undefined;
      release?: {
        baseUrl?: string | undefined;
      } | undefined;
    } | undefined;
    compilerOptions?: {
      allowJs?: boolean | undefined;
      allowUnreachableCode?: boolean | undefined;
      allowUnusedLabels?: boolean | undefined;
      checkJs?: boolean | undefined;
      emitDecoratorMetadata?: boolean | undefined;
      erasableSyntaxOnly?: boolean | null | undefined;
      exactOptionalPropertyTypes?: boolean | undefined;
      experimentalDecorators?: boolean | undefined;
      isolatedDeclarations?: boolean | undefined;
      jsx?: "precompile" | "preserve" | "react" | "react-jsx" | "react-jsxdev" | "react-native" | undefined;
      jsxFactory?: string | undefined;
      jsxFragmentFactory?: string | undefined;
      jsxImportSource?: string | undefined;
      jsxImportSourceTypes?: string | undefined;
      jsxPrecompileSkipElements?: string[] | undefined;
      lib?: string[] | undefined;
      module?: string | null | undefined;
      moduleResolution?: string | null | undefined;
      noErrorTruncation?: boolean | undefined;
      noFallthroughCasesInSwitch?: boolean | undefined;
      noImplicitAny?: boolean | undefined;
      noImplicitOverride?: boolean | undefined;
      noImplicitReturns?: boolean | undefined;
      noImplicitThis?: boolean | undefined;
      noPropertyAccessFromIndexSignature?: boolean | undefined;
      noUncheckedIndexedAccess?: boolean | undefined;
      noUnusedLocals?: boolean | undefined;
      noUnusedParameters?: boolean | undefined;
      baseUrl?: string | null | undefined;
      paths?: Record<string, (string | null)[] | null> | null | undefined;
      rootDirs?: string[] | undefined;
      skipLibCheck?: boolean | undefined;
      strict?: boolean | undefined;
      strictBindCallApply?: boolean | undefined;
      strictBuiltinIteratorReturn?: boolean | undefined;
      strictFunctionTypes?: boolean | undefined;
      strictNullChecks?: boolean | undefined;
      strictPropertyInitialization?: boolean | undefined;
      types?: string[] | undefined;
      useUnknownInCatchVariables?: boolean | undefined;
      verbatimModuleSyntax?: boolean | undefined;
    } | undefined;
    deploy?: {
      org?: string | undefined;
      app?: string | undefined;
      framework?: string | undefined;
      install?: string | undefined;
      build?: string | undefined;
      predeploy?: string | undefined;
      runtime?: {
        mode?: "dynamic" | "static" | undefined;
        entrypoint?: string | undefined;
        args?: string[] | undefined;
        cwd?: string | undefined;
        spa?: boolean | undefined;
      } | undefined;
      include?: string[] | undefined;
      exclude?: string[] | undefined;
    } | undefined;
    importMap?: string | undefined;
    catalog?: Record<string, string> | undefined;
    catalogs?: Record<string, Record<string, string>> | undefined;
    imports?: Record<string, string> | undefined;
    scopes?: Record<string, Record<string, string>> | undefined;
    exclude?: string[] | undefined;
    lint?: {
      include?: string[] | undefined;
      exclude?: string[] | undefined;
      plugins?: string[] | undefined;
      rules?: {
        tags?: string[] | undefined;
        exclude?: string[] | undefined;
        include?: string[] | undefined;
      } | undefined;
      report?: "compact" | "json" | "pretty" | undefined;
    } | undefined;
    fmt?: {
      include?: string[] | undefined;
      exclude?: string[] | undefined;
      useTabs?: boolean | undefined;
      lineWidth?: number | undefined;
      indentWidth?: number | undefined;
      singleQuote?: boolean | undefined;
      proseWrap?: "always" | "never" | "preserve" | undefined;
      semiColons?: boolean | undefined;
      quoteProps?: "asNeeded" | "consistent" | "preserve" | undefined;
      newLineKind?: "auto" | "crlf" | "lf" | "system" | undefined;
      useBraces?: "always" | "maintain" | "preferNone" | "whenNotSingleLine" | undefined;
      bracePosition?: "maintain" | "nextLine" | "sameLine" | "sameLineUnlessHanging" | undefined;
      singleBodyPosition?: "maintain" | "nextLine" | "sameLine" | undefined;
      nextControlFlowPosition?: "maintain" | "nextLine" | "sameLine" | undefined;
      trailingCommas?: "always" | "never" | "onlyMultiLine" | undefined;
      "json.trailingCommas"?: "always" | "jsonc" | "maintain" | "never" | undefined;
      operatorPosition?: "maintain" | "nextLine" | "sameLine" | undefined;
      "jsx.bracketPosition"?: "maintain" | "nextLine" | "sameLine" | undefined;
      "jsx.forceNewLinesSurroundingContent"?: boolean | undefined;
      "jsx.multiLineParens"?: "always" | "never" | "prefer" | undefined;
      "typeLiteral.separatorKind"?: "comma" | "semiColon" | undefined;
      spaceAround?: boolean | undefined;
      spaceSurroundingProperties?: boolean | undefined;
      vueComponentCase?: "ignore" | "kebab-case" | "pascal-case" | undefined;
      angularNextControlFlowSameLine?: boolean | undefined;
      sortNamedImports?: "caseInsensitive" | "caseSensitive" | "maintain" | undefined;
      sortNamedExports?: "caseInsensitive" | "caseSensitive" | "maintain" | undefined;
      useEditorConfig?: boolean | undefined;
      options?: {
        useTabs?: boolean | undefined;
        lineWidth?: number | undefined;
        indentWidth?: number | undefined;
        singleQuote?: boolean | undefined;
        proseWrap?: "always" | "never" | "preserve" | undefined;
        semiColons?: boolean | undefined;
      } | undefined;
    } | undefined;
    minimumDependencyAge?: string | number | {
      age?: string | number | undefined;
      exclude?: string[] | undefined;
    } | undefined;
    nodeModulesDir?: "auto" | "manual" | "none" | boolean | undefined;
    vendor?: boolean | undefined;
    jsrDepsInNodeModules?: boolean | undefined;
    preferPackageJson?: boolean | undefined;
    tasks?: Record<string, string | {
      description?: string | undefined;
      command?: string | undefined;
      dependencies?: string[] | undefined;
      files?: string[] | undefined;
      output?: string[] | undefined;
      env?: string[] | undefined;
    }> | undefined;
    test?: {
      include?: string[] | undefined;
      exclude?: string[] | undefined;
      permissions?: string | {
        all?: boolean | undefined;
        read?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
          ignore?: boolean | string[] | undefined;
        } | undefined;
        write?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        import?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        env?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
          ignore?: boolean | string[] | undefined;
        } | undefined;
        net?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        run?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        ffi?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        sys?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
      } | undefined;
      sanitizeOps?: boolean | undefined;
      sanitizeResources?: boolean | undefined;
    } | undefined;
    publish?: false | {
      include?: string[] | undefined;
      exclude?: string[] | undefined;
    } | undefined;
    bench?: {
      include?: string[] | undefined;
      exclude?: string[] | undefined;
      permissions?: string | {
        all?: boolean | undefined;
        read?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
          ignore?: boolean | string[] | undefined;
        } | undefined;
        write?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        import?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        env?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
          ignore?: boolean | string[] | undefined;
        } | undefined;
        net?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        run?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        ffi?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        sys?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
      } | undefined;
    } | undefined;
    coverage?: {
      thresholds?: {
        lines?: number | undefined;
        branches?: number | undefined;
        functions?: number | undefined;
      } | undefined;
    } | undefined;
    license?: string | undefined;
    lock?: string | boolean | {
      path?: string | undefined;
      frozen?: boolean | undefined;
    } | undefined;
    unstable?: string[] | undefined;
    name?: string | undefined;
    version?: string | undefined;
    exports?: string | Record<string, string> | undefined;
    permissions?: Record<string, {
      all?: boolean | undefined;
      read?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
        ignore?: boolean | string[] | undefined;
      } | undefined;
      write?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
      } | undefined;
      import?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
      } | undefined;
      env?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
        ignore?: boolean | string[] | undefined;
      } | undefined;
      net?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
      } | undefined;
      run?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
      } | undefined;
      ffi?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
      } | undefined;
      sys?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
      } | undefined;
    }> | undefined;
    patch?: string[] | undefined;
    links?: string[] | undefined;
    workspace?: string[] | {
      members?: string[] | undefined;
    } | undefined;
  }[]): {
    description?: string | undefined;
    keywords?: string[] | undefined;
    homepage?: string | undefined;
    bugs?: string | {
      url?: string | undefined;
      email?: string | undefined;
    } | undefined;
    licenses?: {
      type?: string | undefined;
      url?: string | undefined;
    }[] | undefined;
    author?: string | {
      name: string;
      url?: string | undefined;
      email?: string | undefined;
    } | undefined;
    contributors?: (string | {
      name: string;
      url?: string | undefined;
      email?: string | undefined;
    })[] | undefined;
    maintainers?: (string | {
      name: string;
      url?: string | undefined;
      email?: string | undefined;
    })[] | undefined;
    main?: string | undefined;
    bin?: string | Record<string, string> | undefined;
    type?: "commonjs" | "module" | undefined;
    types?: string | undefined;
    typings?: string | undefined;
    typesVersions?: Record<string, Record<string, string[]>> | undefined;
    man?: string | string[] | undefined;
    directories?: {
      bin?: string | undefined;
      doc?: string | undefined;
      example?: string | undefined;
      lib?: string | undefined;
      man?: string | undefined;
      test?: string | undefined;
    } | undefined;
    repository?: string | {
      type?: string | undefined;
      url?: string | undefined;
      directory?: string | undefined;
    } | undefined;
    funding?: string | (string | {
      url: string;
      type?: string | undefined;
    })[] | {
      url: string;
      type?: string | undefined;
    } | undefined;
    scripts?: Record<string, string> | undefined;
    config?: Record<string, unknown> | undefined;
    dependencies?: Record<string, string> | undefined;
    devDependencies?: Record<string, string> | undefined;
    optionalDependencies?: Record<string, string> | undefined;
    peerDependencies?: Record<string, string> | undefined;
    peerDependenciesMeta?: Record<string, {
      [x: string]: unknown;
      optional?: boolean | undefined;
    }> | undefined;
    bundleDependencies?: boolean | string[] | undefined;
    bundledDependencies?: boolean | string[] | undefined;
    resolutions?: Record<string, unknown> | undefined;
    overrides?: Record<string, unknown> | undefined;
    packageManager?: string | undefined;
    engines?: {
      [x: string]: string;
      node?: string | undefined;
      runtime?: {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      }[] | {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      } | undefined;
    } | undefined;
    volta?: {
      [x: string]: string;
      extends?: string | undefined;
    } | undefined;
    engineStrict?: boolean | undefined;
    os?: string[] | undefined;
    cpu?: string[] | undefined;
    devEngines?: {
      os?: {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      }[] | {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      } | undefined;
      cpu?: {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      }[] | {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      } | undefined;
      libc?: {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      }[] | {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      } | undefined;
      runtime?: {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      }[] | {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      } | undefined;
      packageManager?: {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      }[] | {
        name: string;
        version?: string | undefined;
        onFail?: "download" | "error" | "ignore" | "warn" | undefined;
      } | undefined;
    } | undefined;
    preferGlobal?: boolean | undefined;
    private?: "false" | "true" | boolean | undefined;
    publishConfig?: {
      [x: string]: unknown;
      access?: "public" | "restricted" | undefined;
      tag?: string | undefined;
      registry?: string | undefined;
      provenance?: boolean | undefined;
      directory?: string | undefined;
      linkDirectory?: boolean | undefined;
      executableFiles?: string[] | undefined;
    } | undefined;
    dist?: {
      shasum?: string | undefined;
      tarball?: string | undefined;
    } | undefined;
    readme?: string | undefined;
    module?: string | undefined;
    esnext?: string | {
      [x: string]: string;
      main?: string | undefined;
      browser?: string | undefined;
    } | undefined;
    workspaces?: string[] | {
      packages?: string[] | undefined;
      nohoist?: string[] | undefined;
    } | undefined;
    sideEffects?: boolean | string[] | undefined;
    compileOnSave?: boolean | null | undefined;
    typeAcquisition?: {
      enable?: boolean | null | undefined;
      include?: string[] | null | undefined;
      exclude?: string[] | null | undefined;
    } | null | undefined;
    extends?: string | string[] | undefined;
    watchOptions?: {
      force?: string | null | undefined;
      watchFile?: string | null | undefined;
      watchDirectory?: string | null | undefined;
      fallbackPolling?: string | null | undefined;
      synchronousWatchDirectory?: boolean | null | undefined;
      excludeFiles?: string[] | null | undefined;
      excludeDirectories?: string[] | null | undefined;
    } | null | undefined;
    buildOptions?: {
      dry?: boolean | null | undefined;
      force?: boolean | null | undefined;
      verbose?: boolean | null | undefined;
      incremental?: boolean | null | undefined;
      assumeChangesOnlyAffectDirectDependencies?: boolean | null | undefined;
      traceResolution?: boolean | null | undefined;
    } | undefined;
    "ts-node"?: Record<string, unknown> | null | undefined;
    files?: string[] | null | undefined;
    include?: string[] | null | undefined;
    references?: {
      path: string;
    }[] | undefined;
    allowScripts?: boolean | string[] | {
      allow?: boolean | string[] | undefined;
      deny?: string[] | undefined;
    } | undefined;
    compile?: {
      include?: string[] | undefined;
      exclude?: string[] | undefined;
      permissions?: string | {
        all?: boolean | undefined;
        read?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
          ignore?: boolean | string[] | undefined;
        } | undefined;
        write?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        import?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        env?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
          ignore?: boolean | string[] | undefined;
        } | undefined;
        net?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        run?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        ffi?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        sys?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
      } | undefined;
    } | undefined;
    desktop?: {
      app?: {
        name?: string | undefined;
        identifier?: string | undefined;
        icons?: {
          macos?: string | undefined;
          windows?: string | undefined;
          linux?: string | undefined;
        } | undefined;
        deepLinks?: string[] | undefined;
      } | undefined;
      backend?: "cef" | "webview" | undefined;
      output?: {
        macos?: string | undefined;
        windows?: string | undefined;
        linux?: string | undefined;
      } | undefined;
      release?: {
        baseUrl?: string | undefined;
      } | undefined;
    } | undefined;
    compilerOptions?: {
      allowJs?: boolean | undefined;
      allowUnreachableCode?: boolean | undefined;
      allowUnusedLabels?: boolean | undefined;
      checkJs?: boolean | undefined;
      emitDecoratorMetadata?: boolean | undefined;
      erasableSyntaxOnly?: boolean | null | undefined;
      exactOptionalPropertyTypes?: boolean | undefined;
      experimentalDecorators?: boolean | undefined;
      isolatedDeclarations?: boolean | undefined;
      jsx?: "precompile" | "preserve" | "react" | "react-jsx" | "react-jsxdev" | "react-native" | undefined;
      jsxFactory?: string | undefined;
      jsxFragmentFactory?: string | undefined;
      jsxImportSource?: string | undefined;
      jsxImportSourceTypes?: string | undefined;
      jsxPrecompileSkipElements?: string[] | undefined;
      lib?: string[] | undefined;
      module?: string | null | undefined;
      moduleResolution?: string | null | undefined;
      noErrorTruncation?: boolean | undefined;
      noFallthroughCasesInSwitch?: boolean | undefined;
      noImplicitAny?: boolean | undefined;
      noImplicitOverride?: boolean | undefined;
      noImplicitReturns?: boolean | undefined;
      noImplicitThis?: boolean | undefined;
      noPropertyAccessFromIndexSignature?: boolean | undefined;
      noUncheckedIndexedAccess?: boolean | undefined;
      noUnusedLocals?: boolean | undefined;
      noUnusedParameters?: boolean | undefined;
      baseUrl?: string | null | undefined;
      paths?: Record<string, (string | null)[] | null> | null | undefined;
      rootDirs?: string[] | undefined;
      skipLibCheck?: boolean | undefined;
      strict?: boolean | undefined;
      strictBindCallApply?: boolean | undefined;
      strictBuiltinIteratorReturn?: boolean | undefined;
      strictFunctionTypes?: boolean | undefined;
      strictNullChecks?: boolean | undefined;
      strictPropertyInitialization?: boolean | undefined;
      types?: string[] | undefined;
      useUnknownInCatchVariables?: boolean | undefined;
      verbatimModuleSyntax?: boolean | undefined;
    } | undefined;
    deploy?: {
      org?: string | undefined;
      app?: string | undefined;
      framework?: string | undefined;
      install?: string | undefined;
      build?: string | undefined;
      predeploy?: string | undefined;
      runtime?: {
        mode?: "dynamic" | "static" | undefined;
        entrypoint?: string | undefined;
        args?: string[] | undefined;
        cwd?: string | undefined;
        spa?: boolean | undefined;
      } | undefined;
      include?: string[] | undefined;
      exclude?: string[] | undefined;
    } | undefined;
    importMap?: string | undefined;
    catalog?: Record<string, string> | undefined;
    catalogs?: Record<string, Record<string, string>> | undefined;
    imports?: Record<string, string> | undefined;
    scopes?: Record<string, Record<string, string>> | undefined;
    exclude?: string[] | undefined;
    lint?: {
      include?: string[] | undefined;
      exclude?: string[] | undefined;
      plugins?: string[] | undefined;
      rules?: {
        tags?: string[] | undefined;
        exclude?: string[] | undefined;
        include?: string[] | undefined;
      } | undefined;
      report?: "compact" | "json" | "pretty" | undefined;
    } | undefined;
    fmt?: {
      include?: string[] | undefined;
      exclude?: string[] | undefined;
      useTabs?: boolean | undefined;
      lineWidth?: number | undefined;
      indentWidth?: number | undefined;
      singleQuote?: boolean | undefined;
      proseWrap?: "always" | "never" | "preserve" | undefined;
      semiColons?: boolean | undefined;
      quoteProps?: "asNeeded" | "consistent" | "preserve" | undefined;
      newLineKind?: "auto" | "crlf" | "lf" | "system" | undefined;
      useBraces?: "always" | "maintain" | "preferNone" | "whenNotSingleLine" | undefined;
      bracePosition?: "maintain" | "nextLine" | "sameLine" | "sameLineUnlessHanging" | undefined;
      singleBodyPosition?: "maintain" | "nextLine" | "sameLine" | undefined;
      nextControlFlowPosition?: "maintain" | "nextLine" | "sameLine" | undefined;
      trailingCommas?: "always" | "never" | "onlyMultiLine" | undefined;
      "json.trailingCommas"?: "always" | "jsonc" | "maintain" | "never" | undefined;
      operatorPosition?: "maintain" | "nextLine" | "sameLine" | undefined;
      "jsx.bracketPosition"?: "maintain" | "nextLine" | "sameLine" | undefined;
      "jsx.forceNewLinesSurroundingContent"?: boolean | undefined;
      "jsx.multiLineParens"?: "always" | "never" | "prefer" | undefined;
      "typeLiteral.separatorKind"?: "comma" | "semiColon" | undefined;
      spaceAround?: boolean | undefined;
      spaceSurroundingProperties?: boolean | undefined;
      vueComponentCase?: "ignore" | "kebab-case" | "pascal-case" | undefined;
      angularNextControlFlowSameLine?: boolean | undefined;
      sortNamedImports?: "caseInsensitive" | "caseSensitive" | "maintain" | undefined;
      sortNamedExports?: "caseInsensitive" | "caseSensitive" | "maintain" | undefined;
      useEditorConfig?: boolean | undefined;
      options?: {
        useTabs?: boolean | undefined;
        lineWidth?: number | undefined;
        indentWidth?: number | undefined;
        singleQuote?: boolean | undefined;
        proseWrap?: "always" | "never" | "preserve" | undefined;
        semiColons?: boolean | undefined;
      } | undefined;
    } | undefined;
    minimumDependencyAge?: string | number | {
      age?: string | number | undefined;
      exclude?: string[] | undefined;
    } | undefined;
    nodeModulesDir?: "auto" | "manual" | "none" | boolean | undefined;
    vendor?: boolean | undefined;
    jsrDepsInNodeModules?: boolean | undefined;
    preferPackageJson?: boolean | undefined;
    tasks?: Record<string, string | {
      description?: string | undefined;
      command?: string | undefined;
      dependencies?: string[] | undefined;
      files?: string[] | undefined;
      output?: string[] | undefined;
      env?: string[] | undefined;
    }> | undefined;
    test?: {
      include?: string[] | undefined;
      exclude?: string[] | undefined;
      permissions?: string | {
        all?: boolean | undefined;
        read?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
          ignore?: boolean | string[] | undefined;
        } | undefined;
        write?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        import?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        env?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
          ignore?: boolean | string[] | undefined;
        } | undefined;
        net?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        run?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        ffi?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        sys?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
      } | undefined;
      sanitizeOps?: boolean | undefined;
      sanitizeResources?: boolean | undefined;
    } | undefined;
    publish?: false | {
      include?: string[] | undefined;
      exclude?: string[] | undefined;
    } | undefined;
    bench?: {
      include?: string[] | undefined;
      exclude?: string[] | undefined;
      permissions?: string | {
        all?: boolean | undefined;
        read?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
          ignore?: boolean | string[] | undefined;
        } | undefined;
        write?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        import?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        env?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
          ignore?: boolean | string[] | undefined;
        } | undefined;
        net?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        run?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        ffi?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
        sys?: boolean | string[] | {
          allow?: boolean | string[] | undefined;
          deny?: boolean | string[] | undefined;
        } | undefined;
      } | undefined;
    } | undefined;
    coverage?: {
      thresholds?: {
        lines?: number | undefined;
        branches?: number | undefined;
        functions?: number | undefined;
      } | undefined;
    } | undefined;
    license?: string | undefined;
    lock?: string | boolean | {
      path?: string | undefined;
      frozen?: boolean | undefined;
    } | undefined;
    unstable?: string[] | undefined;
    name?: string | undefined;
    version?: string | undefined;
    exports?: string | Record<string, string> | undefined;
    permissions?: Record<string, {
      all?: boolean | undefined;
      read?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
        ignore?: boolean | string[] | undefined;
      } | undefined;
      write?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
      } | undefined;
      import?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
      } | undefined;
      env?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
        ignore?: boolean | string[] | undefined;
      } | undefined;
      net?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
      } | undefined;
      run?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
      } | undefined;
      ffi?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
      } | undefined;
      sys?: boolean | string[] | {
        allow?: boolean | string[] | undefined;
        deny?: boolean | string[] | undefined;
      } | undefined;
    }> | undefined;
    patch?: string[] | undefined;
    links?: string[] | undefined;
    workspace?: string[] | {
      members?: string[] | undefined;
    } | undefined;
  }[];
  (options: UserConfigFn<Schema.ZodObject<{
    description: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodString>>;
    keywords: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>>;
    homepage: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodString>>;
    bugs: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      url: Schema.ZodOptional<Schema.ZodString>;
      email: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>]>>>;
    licenses: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodArray<Schema.ZodObject<{
      type: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodEnum<{
        "AGPL-3.0-only": "AGPL-3.0-only";
        "Apache-2.0": "Apache-2.0";
        "BSD-2-Clause": "BSD-2-Clause";
        "BSD-3-Clause": "BSD-3-Clause";
        "BSL-1.0": "BSL-1.0";
        "CC0-1.0": "CC0-1.0";
        "CDDL-1.0": "CDDL-1.0";
        "CDDL-1.1": "CDDL-1.1";
        "EPL-1.0": "EPL-1.0";
        "EPL-2.0": "EPL-2.0";
        "GPL-2.0-only": "GPL-2.0-only";
        "GPL-3.0-only": "GPL-3.0-only";
        ISC: "ISC";
        "LGPL-2.0-only": "LGPL-2.0-only";
        "LGPL-2.1-only": "LGPL-2.1-only";
        "LGPL-2.1-or-later": "LGPL-2.1-or-later";
        "LGPL-3.0-only": "LGPL-3.0-only";
        "LGPL-3.0-or-later": "LGPL-3.0-or-later";
        MIT: "MIT";
        "MPL-2.0": "MPL-2.0";
        "MS-PL": "MS-PL";
        UNLICENSED: "UNLICENSED";
      }>]>>;
      url: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>>>>;
    author: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      name: Schema.ZodString;
      url: Schema.ZodOptional<Schema.ZodString>;
      email: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>]>>>;
    contributors: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodArray<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      name: Schema.ZodString;
      url: Schema.ZodOptional<Schema.ZodString>;
      email: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>]>>>>;
    maintainers: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodArray<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      name: Schema.ZodString;
      url: Schema.ZodOptional<Schema.ZodString>;
      email: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>]>>>>;
    main: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodString>>;
    bin: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodString>]>>>;
    type: Schema.ZodOptional<Schema.ZodDefault<Schema.ZodOptional<Schema.ZodEnum<{
      commonjs: "commonjs";
      module: "module";
    }>>>>;
    types: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodString>>;
    typings: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodString>>;
    typesVersions: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodArray<Schema.ZodString>>>>>;
    man: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodArray<Schema.ZodString>]>>>;
    directories: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      bin: Schema.ZodOptional<Schema.ZodString>;
      doc: Schema.ZodOptional<Schema.ZodString>;
      example: Schema.ZodOptional<Schema.ZodString>;
      lib: Schema.ZodOptional<Schema.ZodString>;
      man: Schema.ZodOptional<Schema.ZodString>;
      test: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>>>;
    repository: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      type: Schema.ZodOptional<Schema.ZodString>;
      url: Schema.ZodOptional<Schema.ZodString>;
      directory: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>]>>>;
    funding: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      url: Schema.ZodString;
      type: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      url: Schema.ZodString;
      type: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>]>>]>>>;
    scripts: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>;
    config: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>>;
    dependencies: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>;
    devDependencies: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>;
    optionalDependencies: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>;
    peerDependencies: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>;
    peerDependenciesMeta: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodObject<{
      optional: Schema.ZodOptional<Schema.ZodBoolean>;
    }, Schema.core.$loose>>>>;
    bundleDependencies: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodArray<Schema.ZodString>, Schema.ZodBoolean]>>>;
    bundledDependencies: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodArray<Schema.ZodString>, Schema.ZodBoolean]>>>;
    resolutions: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>>;
    overrides: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>>;
    packageManager: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodString>>;
    engines: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      node: Schema.ZodOptional<Schema.ZodString>;
      runtime: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>>]>>;
    }, Schema.core.$catchall<Schema.ZodString>>>>;
    volta: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      extends: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$catchall<Schema.ZodString>>>>;
    engineStrict: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodBoolean>>;
    os: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>>;
    cpu: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>>;
    devEngines: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      os: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>>]>>;
      cpu: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>>]>>;
      libc: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>>]>>;
      runtime: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>>]>>;
      packageManager: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>>]>>;
    }, Schema.core.$strip>>>;
    preferGlobal: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodBoolean>>;
    private: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodEnum<{
      false: "false";
      true: "true";
    }>]>>>;
    publishConfig: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      access: Schema.ZodOptional<Schema.ZodEnum<{
        public: "public";
        restricted: "restricted";
      }>>;
      tag: Schema.ZodOptional<Schema.ZodString>;
      registry: Schema.ZodOptional<Schema.ZodString>;
      provenance: Schema.ZodOptional<Schema.ZodBoolean>;
      directory: Schema.ZodOptional<Schema.ZodString>;
      linkDirectory: Schema.ZodOptional<Schema.ZodBoolean>;
      executableFiles: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$loose>>>;
    dist: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      shasum: Schema.ZodOptional<Schema.ZodString>;
      tarball: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>>>;
    readme: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodString>>;
    module: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodString>>;
    esnext: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      main: Schema.ZodOptional<Schema.ZodString>;
      browser: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$catchall<Schema.ZodString>>]>>>;
    workspaces: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodArray<Schema.ZodString>, Schema.ZodObject<{
      packages: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      nohoist: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>]>>>;
    sideEffects: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>>;
    compileOnSave: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>>;
    typeAcquisition: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodNullable<Schema.ZodObject<{
      enable: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      include: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
      exclude: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
    }, Schema.core.$strip>>>>;
    extends: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodArray<Schema.ZodString>]>>>;
    watchOptions: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodNullable<Schema.ZodObject<{
      force: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      watchFile: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      watchDirectory: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      fallbackPolling: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      synchronousWatchDirectory: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      excludeFiles: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
      excludeDirectories: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
    }, Schema.core.$strip>>>>;
    buildOptions: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      dry: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      force: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      verbose: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      incremental: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      assumeChangesOnlyAffectDirectDependencies: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      traceResolution: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
    }, Schema.core.$strip>>>;
    "ts-node": Schema.ZodOptional<Schema.ZodOptional<Schema.ZodNullable<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>>>;
    files: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>>;
    include: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>>;
    references: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodArray<Schema.ZodObject<{
      path: Schema.ZodString;
    }, Schema.core.$strip>>>>;
    allowScripts: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>, Schema.ZodObject<{
      allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      deny: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>]>>>;
    compile: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      permissions: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
        all: Schema.ZodOptional<Schema.ZodBoolean>;
        read: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        write: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        import: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        env: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        net: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        run: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        ffi: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        sys: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
      }, Schema.core.$strip>]>>;
    }, Schema.core.$strip>>>;
    desktop: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      app: Schema.ZodOptional<Schema.ZodObject<{
        name: Schema.ZodOptional<Schema.ZodString>;
        identifier: Schema.ZodOptional<Schema.ZodString>;
        icons: Schema.ZodOptional<Schema.ZodObject<{
          macos: Schema.ZodOptional<Schema.ZodString>;
          windows: Schema.ZodOptional<Schema.ZodString>;
          linux: Schema.ZodOptional<Schema.ZodString>;
        }, Schema.core.$strip>>;
        deepLinks: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      }, Schema.core.$strip>>;
      backend: Schema.ZodOptional<Schema.ZodEnum<{
        cef: "cef";
        webview: "webview";
      }>>;
      output: Schema.ZodOptional<Schema.ZodObject<{
        macos: Schema.ZodOptional<Schema.ZodString>;
        windows: Schema.ZodOptional<Schema.ZodString>;
        linux: Schema.ZodOptional<Schema.ZodString>;
      }, Schema.core.$strip>>;
      release: Schema.ZodOptional<Schema.ZodObject<{
        baseUrl: Schema.ZodOptional<Schema.ZodString>;
      }, Schema.core.$strip>>;
    }, Schema.core.$strip>>>;
    compilerOptions: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      allowJs: Schema.ZodOptional<Schema.ZodBoolean>;
      allowUnreachableCode: Schema.ZodOptional<Schema.ZodBoolean>;
      allowUnusedLabels: Schema.ZodOptional<Schema.ZodBoolean>;
      checkJs: Schema.ZodOptional<Schema.ZodBoolean>;
      emitDecoratorMetadata: Schema.ZodOptional<Schema.ZodBoolean>;
      erasableSyntaxOnly: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      exactOptionalPropertyTypes: Schema.ZodOptional<Schema.ZodBoolean>;
      experimentalDecorators: Schema.ZodOptional<Schema.ZodBoolean>;
      isolatedDeclarations: Schema.ZodOptional<Schema.ZodBoolean>;
      jsx: Schema.ZodOptional<Schema.ZodEnum<{
        precompile: "precompile";
        preserve: "preserve";
        react: "react";
        "react-jsx": "react-jsx";
        "react-jsxdev": "react-jsxdev";
        "react-native": "react-native";
      }>>;
      jsxFactory: Schema.ZodOptional<Schema.ZodString>;
      jsxFragmentFactory: Schema.ZodOptional<Schema.ZodString>;
      jsxImportSource: Schema.ZodOptional<Schema.ZodString>;
      jsxImportSourceTypes: Schema.ZodOptional<Schema.ZodString>;
      jsxPrecompileSkipElements: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      lib: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      module: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      moduleResolution: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      noErrorTruncation: Schema.ZodOptional<Schema.ZodBoolean>;
      noFallthroughCasesInSwitch: Schema.ZodOptional<Schema.ZodBoolean>;
      noImplicitAny: Schema.ZodOptional<Schema.ZodBoolean>;
      noImplicitOverride: Schema.ZodOptional<Schema.ZodBoolean>;
      noImplicitReturns: Schema.ZodOptional<Schema.ZodBoolean>;
      noImplicitThis: Schema.ZodOptional<Schema.ZodBoolean>;
      noPropertyAccessFromIndexSignature: Schema.ZodOptional<Schema.ZodBoolean>;
      noUncheckedIndexedAccess: Schema.ZodOptional<Schema.ZodBoolean>;
      noUnusedLocals: Schema.ZodOptional<Schema.ZodBoolean>;
      noUnusedParameters: Schema.ZodOptional<Schema.ZodBoolean>;
      baseUrl: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      paths: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodRecord<Schema.ZodString, Schema.ZodNullable<Schema.ZodArray<Schema.ZodNullable<Schema.ZodString>>>>>>;
      rootDirs: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      skipLibCheck: Schema.ZodOptional<Schema.ZodBoolean>;
      strict: Schema.ZodOptional<Schema.ZodBoolean>;
      strictBindCallApply: Schema.ZodOptional<Schema.ZodBoolean>;
      strictBuiltinIteratorReturn: Schema.ZodOptional<Schema.ZodBoolean>;
      strictFunctionTypes: Schema.ZodOptional<Schema.ZodBoolean>;
      strictNullChecks: Schema.ZodOptional<Schema.ZodBoolean>;
      strictPropertyInitialization: Schema.ZodOptional<Schema.ZodBoolean>;
      types: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      useUnknownInCatchVariables: Schema.ZodOptional<Schema.ZodBoolean>;
      verbatimModuleSyntax: Schema.ZodOptional<Schema.ZodBoolean>;
    }, Schema.core.$strip>>>;
    deploy: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      org: Schema.ZodOptional<Schema.ZodString>;
      app: Schema.ZodOptional<Schema.ZodString>;
      framework: Schema.ZodOptional<Schema.ZodString>;
      install: Schema.ZodOptional<Schema.ZodString>;
      build: Schema.ZodOptional<Schema.ZodString>;
      predeploy: Schema.ZodOptional<Schema.ZodString>;
      runtime: Schema.ZodOptional<Schema.ZodObject<{
        mode: Schema.ZodOptional<Schema.ZodEnum<{
          dynamic: "dynamic";
          static: "static";
        }>>;
        entrypoint: Schema.ZodOptional<Schema.ZodString>;
        args: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
        cwd: Schema.ZodOptional<Schema.ZodString>;
        spa: Schema.ZodOptional<Schema.ZodBoolean>;
      }, Schema.core.$strip>>;
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>>>;
    importMap: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodString>>;
    catalog: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>;
    catalogs: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>>;
    imports: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>;
    scopes: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>>;
    exclude: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>>;
    lint: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      plugins: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      rules: Schema.ZodOptional<Schema.ZodObject<{
        tags: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
        exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
        include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      }, Schema.core.$strip>>;
      report: Schema.ZodOptional<Schema.ZodEnum<{
        compact: "compact";
        json: "json";
        pretty: "pretty";
      }>>;
    }, Schema.core.$strip>>>;
    fmt: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      useTabs: Schema.ZodOptional<Schema.ZodBoolean>;
      lineWidth: Schema.ZodOptional<Schema.ZodNumber>;
      indentWidth: Schema.ZodOptional<Schema.ZodNumber>;
      singleQuote: Schema.ZodOptional<Schema.ZodBoolean>;
      proseWrap: Schema.ZodOptional<Schema.ZodEnum<{
        always: "always";
        never: "never";
        preserve: "preserve";
      }>>;
      semiColons: Schema.ZodOptional<Schema.ZodBoolean>;
      quoteProps: Schema.ZodOptional<Schema.ZodEnum<{
        asNeeded: "asNeeded";
        consistent: "consistent";
        preserve: "preserve";
      }>>;
      newLineKind: Schema.ZodOptional<Schema.ZodEnum<{
        auto: "auto";
        crlf: "crlf";
        lf: "lf";
        system: "system";
      }>>;
      useBraces: Schema.ZodOptional<Schema.ZodEnum<{
        always: "always";
        maintain: "maintain";
        preferNone: "preferNone";
        whenNotSingleLine: "whenNotSingleLine";
      }>>;
      bracePosition: Schema.ZodOptional<Schema.ZodEnum<{
        maintain: "maintain";
        nextLine: "nextLine";
        sameLine: "sameLine";
        sameLineUnlessHanging: "sameLineUnlessHanging";
      }>>;
      singleBodyPosition: Schema.ZodOptional<Schema.ZodEnum<{
        maintain: "maintain";
        nextLine: "nextLine";
        sameLine: "sameLine";
      }>>;
      nextControlFlowPosition: Schema.ZodOptional<Schema.ZodEnum<{
        maintain: "maintain";
        nextLine: "nextLine";
        sameLine: "sameLine";
      }>>;
      trailingCommas: Schema.ZodOptional<Schema.ZodEnum<{
        always: "always";
        never: "never";
        onlyMultiLine: "onlyMultiLine";
      }>>;
      "json.trailingCommas": Schema.ZodOptional<Schema.ZodEnum<{
        always: "always";
        jsonc: "jsonc";
        maintain: "maintain";
        never: "never";
      }>>;
      operatorPosition: Schema.ZodOptional<Schema.ZodEnum<{
        maintain: "maintain";
        nextLine: "nextLine";
        sameLine: "sameLine";
      }>>;
      "jsx.bracketPosition": Schema.ZodOptional<Schema.ZodEnum<{
        maintain: "maintain";
        nextLine: "nextLine";
        sameLine: "sameLine";
      }>>;
      "jsx.forceNewLinesSurroundingContent": Schema.ZodOptional<Schema.ZodBoolean>;
      "jsx.multiLineParens": Schema.ZodOptional<Schema.ZodEnum<{
        always: "always";
        never: "never";
        prefer: "prefer";
      }>>;
      "typeLiteral.separatorKind": Schema.ZodOptional<Schema.ZodEnum<{
        comma: "comma";
        semiColon: "semiColon";
      }>>;
      spaceAround: Schema.ZodOptional<Schema.ZodBoolean>;
      spaceSurroundingProperties: Schema.ZodOptional<Schema.ZodBoolean>;
      vueComponentCase: Schema.ZodOptional<Schema.ZodEnum<{
        ignore: "ignore";
        "kebab-case": "kebab-case";
        "pascal-case": "pascal-case";
      }>>;
      angularNextControlFlowSameLine: Schema.ZodOptional<Schema.ZodBoolean>;
      sortNamedImports: Schema.ZodOptional<Schema.ZodEnum<{
        caseInsensitive: "caseInsensitive";
        caseSensitive: "caseSensitive";
        maintain: "maintain";
      }>>;
      sortNamedExports: Schema.ZodOptional<Schema.ZodEnum<{
        caseInsensitive: "caseInsensitive";
        caseSensitive: "caseSensitive";
        maintain: "maintain";
      }>>;
      useEditorConfig: Schema.ZodOptional<Schema.ZodBoolean>;
      options: Schema.ZodOptional<Schema.ZodObject<{
        useTabs: Schema.ZodOptional<Schema.ZodBoolean>;
        lineWidth: Schema.ZodOptional<Schema.ZodNumber>;
        indentWidth: Schema.ZodOptional<Schema.ZodNumber>;
        singleQuote: Schema.ZodOptional<Schema.ZodBoolean>;
        proseWrap: Schema.ZodOptional<Schema.ZodEnum<{
          always: "always";
          never: "never";
          preserve: "preserve";
        }>>;
        semiColons: Schema.ZodOptional<Schema.ZodBoolean>;
      }, Schema.core.$strip>>;
    }, Schema.core.$strip>>>;
    minimumDependencyAge: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodNumber]>, Schema.ZodObject<{
      age: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodNumber]>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>]>>>;
    nodeModulesDir: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodEnum<{
      auto: "auto";
      manual: "manual";
      none: "none";
    }>, Schema.ZodBoolean]>>>;
    vendor: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodBoolean>>;
    jsrDepsInNodeModules: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodBoolean>>;
    preferPackageJson: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodBoolean>>;
    tasks: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      description: Schema.ZodOptional<Schema.ZodString>;
      command: Schema.ZodOptional<Schema.ZodString>;
      dependencies: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      files: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      output: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      env: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>]>>>>;
    test: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      permissions: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
        all: Schema.ZodOptional<Schema.ZodBoolean>;
        read: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        write: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        import: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        env: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        net: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        run: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        ffi: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        sys: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
      }, Schema.core.$strip>]>>;
      sanitizeOps: Schema.ZodOptional<Schema.ZodBoolean>;
      sanitizeResources: Schema.ZodOptional<Schema.ZodBoolean>;
    }, Schema.core.$strip>>>;
    publish: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>, Schema.ZodLiteral<false>]>>>;
    bench: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      permissions: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
        all: Schema.ZodOptional<Schema.ZodBoolean>;
        read: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        write: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        import: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        env: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        net: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        run: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        ffi: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        sys: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
      }, Schema.core.$strip>]>>;
    }, Schema.core.$strip>>>;
    coverage: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      thresholds: Schema.ZodOptional<Schema.ZodObject<{
        lines: Schema.ZodOptional<Schema.ZodNumber>;
        branches: Schema.ZodOptional<Schema.ZodNumber>;
        functions: Schema.ZodOptional<Schema.ZodNumber>;
      }, Schema.core.$strip>>;
    }, Schema.core.$strip>>>;
    license: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodString>>;
    lock: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodBoolean, Schema.ZodObject<{
      path: Schema.ZodOptional<Schema.ZodString>;
      frozen: Schema.ZodOptional<Schema.ZodBoolean>;
    }, Schema.core.$strip>]>>>;
    unstable: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>>;
    name: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodString>>;
    version: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodString>>;
    exports: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodString>]>>>;
    permissions: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodObject<{
      all: Schema.ZodOptional<Schema.ZodBoolean>;
      read: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      write: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      import: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      env: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      net: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      run: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      ffi: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      sys: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
    }, Schema.core.$strip>>>>;
    patch: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>>;
    links: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>>;
    workspace: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodArray<Schema.ZodString>, Schema.ZodObject<{
      members: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>]>>>;
  }, Schema.core.$strip>>): UserConfigFn<Schema.ZodObject<{
    description: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodString>>;
    keywords: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>>;
    homepage: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodString>>;
    bugs: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      url: Schema.ZodOptional<Schema.ZodString>;
      email: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>]>>>;
    licenses: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodArray<Schema.ZodObject<{
      type: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodEnum<{
        "AGPL-3.0-only": "AGPL-3.0-only";
        "Apache-2.0": "Apache-2.0";
        "BSD-2-Clause": "BSD-2-Clause";
        "BSD-3-Clause": "BSD-3-Clause";
        "BSL-1.0": "BSL-1.0";
        "CC0-1.0": "CC0-1.0";
        "CDDL-1.0": "CDDL-1.0";
        "CDDL-1.1": "CDDL-1.1";
        "EPL-1.0": "EPL-1.0";
        "EPL-2.0": "EPL-2.0";
        "GPL-2.0-only": "GPL-2.0-only";
        "GPL-3.0-only": "GPL-3.0-only";
        ISC: "ISC";
        "LGPL-2.0-only": "LGPL-2.0-only";
        "LGPL-2.1-only": "LGPL-2.1-only";
        "LGPL-2.1-or-later": "LGPL-2.1-or-later";
        "LGPL-3.0-only": "LGPL-3.0-only";
        "LGPL-3.0-or-later": "LGPL-3.0-or-later";
        MIT: "MIT";
        "MPL-2.0": "MPL-2.0";
        "MS-PL": "MS-PL";
        UNLICENSED: "UNLICENSED";
      }>]>>;
      url: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>>>>;
    author: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      name: Schema.ZodString;
      url: Schema.ZodOptional<Schema.ZodString>;
      email: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>]>>>;
    contributors: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodArray<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      name: Schema.ZodString;
      url: Schema.ZodOptional<Schema.ZodString>;
      email: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>]>>>>;
    maintainers: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodArray<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      name: Schema.ZodString;
      url: Schema.ZodOptional<Schema.ZodString>;
      email: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>]>>>>;
    main: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodString>>;
    bin: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodString>]>>>;
    type: Schema.ZodOptional<Schema.ZodDefault<Schema.ZodOptional<Schema.ZodEnum<{
      commonjs: "commonjs";
      module: "module";
    }>>>>;
    types: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodString>>;
    typings: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodString>>;
    typesVersions: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodArray<Schema.ZodString>>>>>;
    man: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodArray<Schema.ZodString>]>>>;
    directories: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      bin: Schema.ZodOptional<Schema.ZodString>;
      doc: Schema.ZodOptional<Schema.ZodString>;
      example: Schema.ZodOptional<Schema.ZodString>;
      lib: Schema.ZodOptional<Schema.ZodString>;
      man: Schema.ZodOptional<Schema.ZodString>;
      test: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>>>;
    repository: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      type: Schema.ZodOptional<Schema.ZodString>;
      url: Schema.ZodOptional<Schema.ZodString>;
      directory: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>]>>>;
    funding: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      url: Schema.ZodString;
      type: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      url: Schema.ZodString;
      type: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>]>>]>>>;
    scripts: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>;
    config: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>>;
    dependencies: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>;
    devDependencies: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>;
    optionalDependencies: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>;
    peerDependencies: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>;
    peerDependenciesMeta: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodObject<{
      optional: Schema.ZodOptional<Schema.ZodBoolean>;
    }, Schema.core.$loose>>>>;
    bundleDependencies: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodArray<Schema.ZodString>, Schema.ZodBoolean]>>>;
    bundledDependencies: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodArray<Schema.ZodString>, Schema.ZodBoolean]>>>;
    resolutions: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>>;
    overrides: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>>;
    packageManager: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodString>>;
    engines: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      node: Schema.ZodOptional<Schema.ZodString>;
      runtime: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>>]>>;
    }, Schema.core.$catchall<Schema.ZodString>>>>;
    volta: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      extends: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$catchall<Schema.ZodString>>>>;
    engineStrict: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodBoolean>>;
    os: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>>;
    cpu: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>>;
    devEngines: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      os: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>>]>>;
      cpu: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>>]>>;
      libc: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>>]>>;
      runtime: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>>]>>;
      packageManager: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>>]>>;
    }, Schema.core.$strip>>>;
    preferGlobal: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodBoolean>>;
    private: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodEnum<{
      false: "false";
      true: "true";
    }>]>>>;
    publishConfig: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      access: Schema.ZodOptional<Schema.ZodEnum<{
        public: "public";
        restricted: "restricted";
      }>>;
      tag: Schema.ZodOptional<Schema.ZodString>;
      registry: Schema.ZodOptional<Schema.ZodString>;
      provenance: Schema.ZodOptional<Schema.ZodBoolean>;
      directory: Schema.ZodOptional<Schema.ZodString>;
      linkDirectory: Schema.ZodOptional<Schema.ZodBoolean>;
      executableFiles: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$loose>>>;
    dist: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      shasum: Schema.ZodOptional<Schema.ZodString>;
      tarball: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>>>;
    readme: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodString>>;
    module: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodString>>;
    esnext: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      main: Schema.ZodOptional<Schema.ZodString>;
      browser: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$catchall<Schema.ZodString>>]>>>;
    workspaces: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodArray<Schema.ZodString>, Schema.ZodObject<{
      packages: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      nohoist: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>]>>>;
    sideEffects: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>>;
    compileOnSave: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>>;
    typeAcquisition: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodNullable<Schema.ZodObject<{
      enable: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      include: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
      exclude: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
    }, Schema.core.$strip>>>>;
    extends: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodArray<Schema.ZodString>]>>>;
    watchOptions: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodNullable<Schema.ZodObject<{
      force: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      watchFile: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      watchDirectory: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      fallbackPolling: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      synchronousWatchDirectory: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      excludeFiles: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
      excludeDirectories: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
    }, Schema.core.$strip>>>>;
    buildOptions: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      dry: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      force: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      verbose: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      incremental: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      assumeChangesOnlyAffectDirectDependencies: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      traceResolution: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
    }, Schema.core.$strip>>>;
    "ts-node": Schema.ZodOptional<Schema.ZodOptional<Schema.ZodNullable<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>>>;
    files: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>>;
    include: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>>;
    references: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodArray<Schema.ZodObject<{
      path: Schema.ZodString;
    }, Schema.core.$strip>>>>;
    allowScripts: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>, Schema.ZodObject<{
      allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      deny: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>]>>>;
    compile: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      permissions: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
        all: Schema.ZodOptional<Schema.ZodBoolean>;
        read: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        write: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        import: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        env: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        net: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        run: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        ffi: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        sys: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
      }, Schema.core.$strip>]>>;
    }, Schema.core.$strip>>>;
    desktop: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      app: Schema.ZodOptional<Schema.ZodObject<{
        name: Schema.ZodOptional<Schema.ZodString>;
        identifier: Schema.ZodOptional<Schema.ZodString>;
        icons: Schema.ZodOptional<Schema.ZodObject<{
          macos: Schema.ZodOptional<Schema.ZodString>;
          windows: Schema.ZodOptional<Schema.ZodString>;
          linux: Schema.ZodOptional<Schema.ZodString>;
        }, Schema.core.$strip>>;
        deepLinks: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      }, Schema.core.$strip>>;
      backend: Schema.ZodOptional<Schema.ZodEnum<{
        cef: "cef";
        webview: "webview";
      }>>;
      output: Schema.ZodOptional<Schema.ZodObject<{
        macos: Schema.ZodOptional<Schema.ZodString>;
        windows: Schema.ZodOptional<Schema.ZodString>;
        linux: Schema.ZodOptional<Schema.ZodString>;
      }, Schema.core.$strip>>;
      release: Schema.ZodOptional<Schema.ZodObject<{
        baseUrl: Schema.ZodOptional<Schema.ZodString>;
      }, Schema.core.$strip>>;
    }, Schema.core.$strip>>>;
    compilerOptions: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      allowJs: Schema.ZodOptional<Schema.ZodBoolean>;
      allowUnreachableCode: Schema.ZodOptional<Schema.ZodBoolean>;
      allowUnusedLabels: Schema.ZodOptional<Schema.ZodBoolean>;
      checkJs: Schema.ZodOptional<Schema.ZodBoolean>;
      emitDecoratorMetadata: Schema.ZodOptional<Schema.ZodBoolean>;
      erasableSyntaxOnly: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      exactOptionalPropertyTypes: Schema.ZodOptional<Schema.ZodBoolean>;
      experimentalDecorators: Schema.ZodOptional<Schema.ZodBoolean>;
      isolatedDeclarations: Schema.ZodOptional<Schema.ZodBoolean>;
      jsx: Schema.ZodOptional<Schema.ZodEnum<{
        precompile: "precompile";
        preserve: "preserve";
        react: "react";
        "react-jsx": "react-jsx";
        "react-jsxdev": "react-jsxdev";
        "react-native": "react-native";
      }>>;
      jsxFactory: Schema.ZodOptional<Schema.ZodString>;
      jsxFragmentFactory: Schema.ZodOptional<Schema.ZodString>;
      jsxImportSource: Schema.ZodOptional<Schema.ZodString>;
      jsxImportSourceTypes: Schema.ZodOptional<Schema.ZodString>;
      jsxPrecompileSkipElements: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      lib: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      module: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      moduleResolution: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      noErrorTruncation: Schema.ZodOptional<Schema.ZodBoolean>;
      noFallthroughCasesInSwitch: Schema.ZodOptional<Schema.ZodBoolean>;
      noImplicitAny: Schema.ZodOptional<Schema.ZodBoolean>;
      noImplicitOverride: Schema.ZodOptional<Schema.ZodBoolean>;
      noImplicitReturns: Schema.ZodOptional<Schema.ZodBoolean>;
      noImplicitThis: Schema.ZodOptional<Schema.ZodBoolean>;
      noPropertyAccessFromIndexSignature: Schema.ZodOptional<Schema.ZodBoolean>;
      noUncheckedIndexedAccess: Schema.ZodOptional<Schema.ZodBoolean>;
      noUnusedLocals: Schema.ZodOptional<Schema.ZodBoolean>;
      noUnusedParameters: Schema.ZodOptional<Schema.ZodBoolean>;
      baseUrl: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      paths: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodRecord<Schema.ZodString, Schema.ZodNullable<Schema.ZodArray<Schema.ZodNullable<Schema.ZodString>>>>>>;
      rootDirs: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      skipLibCheck: Schema.ZodOptional<Schema.ZodBoolean>;
      strict: Schema.ZodOptional<Schema.ZodBoolean>;
      strictBindCallApply: Schema.ZodOptional<Schema.ZodBoolean>;
      strictBuiltinIteratorReturn: Schema.ZodOptional<Schema.ZodBoolean>;
      strictFunctionTypes: Schema.ZodOptional<Schema.ZodBoolean>;
      strictNullChecks: Schema.ZodOptional<Schema.ZodBoolean>;
      strictPropertyInitialization: Schema.ZodOptional<Schema.ZodBoolean>;
      types: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      useUnknownInCatchVariables: Schema.ZodOptional<Schema.ZodBoolean>;
      verbatimModuleSyntax: Schema.ZodOptional<Schema.ZodBoolean>;
    }, Schema.core.$strip>>>;
    deploy: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      org: Schema.ZodOptional<Schema.ZodString>;
      app: Schema.ZodOptional<Schema.ZodString>;
      framework: Schema.ZodOptional<Schema.ZodString>;
      install: Schema.ZodOptional<Schema.ZodString>;
      build: Schema.ZodOptional<Schema.ZodString>;
      predeploy: Schema.ZodOptional<Schema.ZodString>;
      runtime: Schema.ZodOptional<Schema.ZodObject<{
        mode: Schema.ZodOptional<Schema.ZodEnum<{
          dynamic: "dynamic";
          static: "static";
        }>>;
        entrypoint: Schema.ZodOptional<Schema.ZodString>;
        args: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
        cwd: Schema.ZodOptional<Schema.ZodString>;
        spa: Schema.ZodOptional<Schema.ZodBoolean>;
      }, Schema.core.$strip>>;
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>>>;
    importMap: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodString>>;
    catalog: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>;
    catalogs: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>>;
    imports: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>;
    scopes: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>>;
    exclude: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>>;
    lint: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      plugins: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      rules: Schema.ZodOptional<Schema.ZodObject<{
        tags: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
        exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
        include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      }, Schema.core.$strip>>;
      report: Schema.ZodOptional<Schema.ZodEnum<{
        compact: "compact";
        json: "json";
        pretty: "pretty";
      }>>;
    }, Schema.core.$strip>>>;
    fmt: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      useTabs: Schema.ZodOptional<Schema.ZodBoolean>;
      lineWidth: Schema.ZodOptional<Schema.ZodNumber>;
      indentWidth: Schema.ZodOptional<Schema.ZodNumber>;
      singleQuote: Schema.ZodOptional<Schema.ZodBoolean>;
      proseWrap: Schema.ZodOptional<Schema.ZodEnum<{
        always: "always";
        never: "never";
        preserve: "preserve";
      }>>;
      semiColons: Schema.ZodOptional<Schema.ZodBoolean>;
      quoteProps: Schema.ZodOptional<Schema.ZodEnum<{
        asNeeded: "asNeeded";
        consistent: "consistent";
        preserve: "preserve";
      }>>;
      newLineKind: Schema.ZodOptional<Schema.ZodEnum<{
        auto: "auto";
        crlf: "crlf";
        lf: "lf";
        system: "system";
      }>>;
      useBraces: Schema.ZodOptional<Schema.ZodEnum<{
        always: "always";
        maintain: "maintain";
        preferNone: "preferNone";
        whenNotSingleLine: "whenNotSingleLine";
      }>>;
      bracePosition: Schema.ZodOptional<Schema.ZodEnum<{
        maintain: "maintain";
        nextLine: "nextLine";
        sameLine: "sameLine";
        sameLineUnlessHanging: "sameLineUnlessHanging";
      }>>;
      singleBodyPosition: Schema.ZodOptional<Schema.ZodEnum<{
        maintain: "maintain";
        nextLine: "nextLine";
        sameLine: "sameLine";
      }>>;
      nextControlFlowPosition: Schema.ZodOptional<Schema.ZodEnum<{
        maintain: "maintain";
        nextLine: "nextLine";
        sameLine: "sameLine";
      }>>;
      trailingCommas: Schema.ZodOptional<Schema.ZodEnum<{
        always: "always";
        never: "never";
        onlyMultiLine: "onlyMultiLine";
      }>>;
      "json.trailingCommas": Schema.ZodOptional<Schema.ZodEnum<{
        always: "always";
        jsonc: "jsonc";
        maintain: "maintain";
        never: "never";
      }>>;
      operatorPosition: Schema.ZodOptional<Schema.ZodEnum<{
        maintain: "maintain";
        nextLine: "nextLine";
        sameLine: "sameLine";
      }>>;
      "jsx.bracketPosition": Schema.ZodOptional<Schema.ZodEnum<{
        maintain: "maintain";
        nextLine: "nextLine";
        sameLine: "sameLine";
      }>>;
      "jsx.forceNewLinesSurroundingContent": Schema.ZodOptional<Schema.ZodBoolean>;
      "jsx.multiLineParens": Schema.ZodOptional<Schema.ZodEnum<{
        always: "always";
        never: "never";
        prefer: "prefer";
      }>>;
      "typeLiteral.separatorKind": Schema.ZodOptional<Schema.ZodEnum<{
        comma: "comma";
        semiColon: "semiColon";
      }>>;
      spaceAround: Schema.ZodOptional<Schema.ZodBoolean>;
      spaceSurroundingProperties: Schema.ZodOptional<Schema.ZodBoolean>;
      vueComponentCase: Schema.ZodOptional<Schema.ZodEnum<{
        ignore: "ignore";
        "kebab-case": "kebab-case";
        "pascal-case": "pascal-case";
      }>>;
      angularNextControlFlowSameLine: Schema.ZodOptional<Schema.ZodBoolean>;
      sortNamedImports: Schema.ZodOptional<Schema.ZodEnum<{
        caseInsensitive: "caseInsensitive";
        caseSensitive: "caseSensitive";
        maintain: "maintain";
      }>>;
      sortNamedExports: Schema.ZodOptional<Schema.ZodEnum<{
        caseInsensitive: "caseInsensitive";
        caseSensitive: "caseSensitive";
        maintain: "maintain";
      }>>;
      useEditorConfig: Schema.ZodOptional<Schema.ZodBoolean>;
      options: Schema.ZodOptional<Schema.ZodObject<{
        useTabs: Schema.ZodOptional<Schema.ZodBoolean>;
        lineWidth: Schema.ZodOptional<Schema.ZodNumber>;
        indentWidth: Schema.ZodOptional<Schema.ZodNumber>;
        singleQuote: Schema.ZodOptional<Schema.ZodBoolean>;
        proseWrap: Schema.ZodOptional<Schema.ZodEnum<{
          always: "always";
          never: "never";
          preserve: "preserve";
        }>>;
        semiColons: Schema.ZodOptional<Schema.ZodBoolean>;
      }, Schema.core.$strip>>;
    }, Schema.core.$strip>>>;
    minimumDependencyAge: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodNumber]>, Schema.ZodObject<{
      age: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodNumber]>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>]>>>;
    nodeModulesDir: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodEnum<{
      auto: "auto";
      manual: "manual";
      none: "none";
    }>, Schema.ZodBoolean]>>>;
    vendor: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodBoolean>>;
    jsrDepsInNodeModules: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodBoolean>>;
    preferPackageJson: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodBoolean>>;
    tasks: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      description: Schema.ZodOptional<Schema.ZodString>;
      command: Schema.ZodOptional<Schema.ZodString>;
      dependencies: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      files: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      output: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      env: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>]>>>>;
    test: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      permissions: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
        all: Schema.ZodOptional<Schema.ZodBoolean>;
        read: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        write: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        import: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        env: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        net: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        run: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        ffi: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        sys: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
      }, Schema.core.$strip>]>>;
      sanitizeOps: Schema.ZodOptional<Schema.ZodBoolean>;
      sanitizeResources: Schema.ZodOptional<Schema.ZodBoolean>;
    }, Schema.core.$strip>>>;
    publish: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>, Schema.ZodLiteral<false>]>>>;
    bench: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      permissions: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
        all: Schema.ZodOptional<Schema.ZodBoolean>;
        read: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        write: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        import: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        env: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        net: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        run: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        ffi: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        sys: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
      }, Schema.core.$strip>]>>;
    }, Schema.core.$strip>>>;
    coverage: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      thresholds: Schema.ZodOptional<Schema.ZodObject<{
        lines: Schema.ZodOptional<Schema.ZodNumber>;
        branches: Schema.ZodOptional<Schema.ZodNumber>;
        functions: Schema.ZodOptional<Schema.ZodNumber>;
      }, Schema.core.$strip>>;
    }, Schema.core.$strip>>>;
    license: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodString>>;
    lock: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodBoolean, Schema.ZodObject<{
      path: Schema.ZodOptional<Schema.ZodString>;
      frozen: Schema.ZodOptional<Schema.ZodBoolean>;
    }, Schema.core.$strip>]>>>;
    unstable: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>>;
    name: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodString>>;
    version: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodString>>;
    exports: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodString>]>>>;
    permissions: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodObject<{
      all: Schema.ZodOptional<Schema.ZodBoolean>;
      read: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      write: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      import: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      env: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      net: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      run: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      ffi: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      sys: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
    }, Schema.core.$strip>>>>;
    patch: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>>;
    links: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>>;
    workspace: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodArray<Schema.ZodString>, Schema.ZodObject<{
      members: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>]>>>;
  }, Schema.core.$strip>>;
  (options: UserConfigExport<Schema.ZodObject<{
    description: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodString>>;
    keywords: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>>;
    homepage: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodString>>;
    bugs: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      url: Schema.ZodOptional<Schema.ZodString>;
      email: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>]>>>;
    licenses: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodArray<Schema.ZodObject<{
      type: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodEnum<{
        "AGPL-3.0-only": "AGPL-3.0-only";
        "Apache-2.0": "Apache-2.0";
        "BSD-2-Clause": "BSD-2-Clause";
        "BSD-3-Clause": "BSD-3-Clause";
        "BSL-1.0": "BSL-1.0";
        "CC0-1.0": "CC0-1.0";
        "CDDL-1.0": "CDDL-1.0";
        "CDDL-1.1": "CDDL-1.1";
        "EPL-1.0": "EPL-1.0";
        "EPL-2.0": "EPL-2.0";
        "GPL-2.0-only": "GPL-2.0-only";
        "GPL-3.0-only": "GPL-3.0-only";
        ISC: "ISC";
        "LGPL-2.0-only": "LGPL-2.0-only";
        "LGPL-2.1-only": "LGPL-2.1-only";
        "LGPL-2.1-or-later": "LGPL-2.1-or-later";
        "LGPL-3.0-only": "LGPL-3.0-only";
        "LGPL-3.0-or-later": "LGPL-3.0-or-later";
        MIT: "MIT";
        "MPL-2.0": "MPL-2.0";
        "MS-PL": "MS-PL";
        UNLICENSED: "UNLICENSED";
      }>]>>;
      url: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>>>>;
    author: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      name: Schema.ZodString;
      url: Schema.ZodOptional<Schema.ZodString>;
      email: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>]>>>;
    contributors: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodArray<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      name: Schema.ZodString;
      url: Schema.ZodOptional<Schema.ZodString>;
      email: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>]>>>>;
    maintainers: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodArray<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      name: Schema.ZodString;
      url: Schema.ZodOptional<Schema.ZodString>;
      email: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>]>>>>;
    main: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodString>>;
    bin: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodString>]>>>;
    type: Schema.ZodOptional<Schema.ZodDefault<Schema.ZodOptional<Schema.ZodEnum<{
      commonjs: "commonjs";
      module: "module";
    }>>>>;
    types: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodString>>;
    typings: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodString>>;
    typesVersions: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodArray<Schema.ZodString>>>>>;
    man: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodArray<Schema.ZodString>]>>>;
    directories: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      bin: Schema.ZodOptional<Schema.ZodString>;
      doc: Schema.ZodOptional<Schema.ZodString>;
      example: Schema.ZodOptional<Schema.ZodString>;
      lib: Schema.ZodOptional<Schema.ZodString>;
      man: Schema.ZodOptional<Schema.ZodString>;
      test: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>>>;
    repository: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      type: Schema.ZodOptional<Schema.ZodString>;
      url: Schema.ZodOptional<Schema.ZodString>;
      directory: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>]>>>;
    funding: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      url: Schema.ZodString;
      type: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      url: Schema.ZodString;
      type: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>]>>]>>>;
    scripts: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>;
    config: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>>;
    dependencies: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>;
    devDependencies: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>;
    optionalDependencies: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>;
    peerDependencies: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>;
    peerDependenciesMeta: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodObject<{
      optional: Schema.ZodOptional<Schema.ZodBoolean>;
    }, Schema.core.$loose>>>>;
    bundleDependencies: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodArray<Schema.ZodString>, Schema.ZodBoolean]>>>;
    bundledDependencies: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodArray<Schema.ZodString>, Schema.ZodBoolean]>>>;
    resolutions: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>>;
    overrides: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>>;
    packageManager: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodString>>;
    engines: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      node: Schema.ZodOptional<Schema.ZodString>;
      runtime: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>>]>>;
    }, Schema.core.$catchall<Schema.ZodString>>>>;
    volta: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      extends: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$catchall<Schema.ZodString>>>>;
    engineStrict: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodBoolean>>;
    os: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>>;
    cpu: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>>;
    devEngines: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      os: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>>]>>;
      cpu: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>>]>>;
      libc: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>>]>>;
      runtime: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>>]>>;
      packageManager: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>>]>>;
    }, Schema.core.$strip>>>;
    preferGlobal: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodBoolean>>;
    private: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodEnum<{
      false: "false";
      true: "true";
    }>]>>>;
    publishConfig: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      access: Schema.ZodOptional<Schema.ZodEnum<{
        public: "public";
        restricted: "restricted";
      }>>;
      tag: Schema.ZodOptional<Schema.ZodString>;
      registry: Schema.ZodOptional<Schema.ZodString>;
      provenance: Schema.ZodOptional<Schema.ZodBoolean>;
      directory: Schema.ZodOptional<Schema.ZodString>;
      linkDirectory: Schema.ZodOptional<Schema.ZodBoolean>;
      executableFiles: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$loose>>>;
    dist: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      shasum: Schema.ZodOptional<Schema.ZodString>;
      tarball: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>>>;
    readme: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodString>>;
    module: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodString>>;
    esnext: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      main: Schema.ZodOptional<Schema.ZodString>;
      browser: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$catchall<Schema.ZodString>>]>>>;
    workspaces: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodArray<Schema.ZodString>, Schema.ZodObject<{
      packages: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      nohoist: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>]>>>;
    sideEffects: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>>;
    compileOnSave: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>>;
    typeAcquisition: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodNullable<Schema.ZodObject<{
      enable: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      include: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
      exclude: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
    }, Schema.core.$strip>>>>;
    extends: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodArray<Schema.ZodString>]>>>;
    watchOptions: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodNullable<Schema.ZodObject<{
      force: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      watchFile: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      watchDirectory: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      fallbackPolling: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      synchronousWatchDirectory: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      excludeFiles: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
      excludeDirectories: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
    }, Schema.core.$strip>>>>;
    buildOptions: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      dry: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      force: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      verbose: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      incremental: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      assumeChangesOnlyAffectDirectDependencies: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      traceResolution: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
    }, Schema.core.$strip>>>;
    "ts-node": Schema.ZodOptional<Schema.ZodOptional<Schema.ZodNullable<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>>>;
    files: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>>;
    include: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>>;
    references: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodArray<Schema.ZodObject<{
      path: Schema.ZodString;
    }, Schema.core.$strip>>>>;
    allowScripts: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>, Schema.ZodObject<{
      allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      deny: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>]>>>;
    compile: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      permissions: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
        all: Schema.ZodOptional<Schema.ZodBoolean>;
        read: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        write: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        import: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        env: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        net: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        run: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        ffi: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        sys: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
      }, Schema.core.$strip>]>>;
    }, Schema.core.$strip>>>;
    desktop: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      app: Schema.ZodOptional<Schema.ZodObject<{
        name: Schema.ZodOptional<Schema.ZodString>;
        identifier: Schema.ZodOptional<Schema.ZodString>;
        icons: Schema.ZodOptional<Schema.ZodObject<{
          macos: Schema.ZodOptional<Schema.ZodString>;
          windows: Schema.ZodOptional<Schema.ZodString>;
          linux: Schema.ZodOptional<Schema.ZodString>;
        }, Schema.core.$strip>>;
        deepLinks: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      }, Schema.core.$strip>>;
      backend: Schema.ZodOptional<Schema.ZodEnum<{
        cef: "cef";
        webview: "webview";
      }>>;
      output: Schema.ZodOptional<Schema.ZodObject<{
        macos: Schema.ZodOptional<Schema.ZodString>;
        windows: Schema.ZodOptional<Schema.ZodString>;
        linux: Schema.ZodOptional<Schema.ZodString>;
      }, Schema.core.$strip>>;
      release: Schema.ZodOptional<Schema.ZodObject<{
        baseUrl: Schema.ZodOptional<Schema.ZodString>;
      }, Schema.core.$strip>>;
    }, Schema.core.$strip>>>;
    compilerOptions: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      allowJs: Schema.ZodOptional<Schema.ZodBoolean>;
      allowUnreachableCode: Schema.ZodOptional<Schema.ZodBoolean>;
      allowUnusedLabels: Schema.ZodOptional<Schema.ZodBoolean>;
      checkJs: Schema.ZodOptional<Schema.ZodBoolean>;
      emitDecoratorMetadata: Schema.ZodOptional<Schema.ZodBoolean>;
      erasableSyntaxOnly: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      exactOptionalPropertyTypes: Schema.ZodOptional<Schema.ZodBoolean>;
      experimentalDecorators: Schema.ZodOptional<Schema.ZodBoolean>;
      isolatedDeclarations: Schema.ZodOptional<Schema.ZodBoolean>;
      jsx: Schema.ZodOptional<Schema.ZodEnum<{
        precompile: "precompile";
        preserve: "preserve";
        react: "react";
        "react-jsx": "react-jsx";
        "react-jsxdev": "react-jsxdev";
        "react-native": "react-native";
      }>>;
      jsxFactory: Schema.ZodOptional<Schema.ZodString>;
      jsxFragmentFactory: Schema.ZodOptional<Schema.ZodString>;
      jsxImportSource: Schema.ZodOptional<Schema.ZodString>;
      jsxImportSourceTypes: Schema.ZodOptional<Schema.ZodString>;
      jsxPrecompileSkipElements: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      lib: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      module: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      moduleResolution: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      noErrorTruncation: Schema.ZodOptional<Schema.ZodBoolean>;
      noFallthroughCasesInSwitch: Schema.ZodOptional<Schema.ZodBoolean>;
      noImplicitAny: Schema.ZodOptional<Schema.ZodBoolean>;
      noImplicitOverride: Schema.ZodOptional<Schema.ZodBoolean>;
      noImplicitReturns: Schema.ZodOptional<Schema.ZodBoolean>;
      noImplicitThis: Schema.ZodOptional<Schema.ZodBoolean>;
      noPropertyAccessFromIndexSignature: Schema.ZodOptional<Schema.ZodBoolean>;
      noUncheckedIndexedAccess: Schema.ZodOptional<Schema.ZodBoolean>;
      noUnusedLocals: Schema.ZodOptional<Schema.ZodBoolean>;
      noUnusedParameters: Schema.ZodOptional<Schema.ZodBoolean>;
      baseUrl: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      paths: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodRecord<Schema.ZodString, Schema.ZodNullable<Schema.ZodArray<Schema.ZodNullable<Schema.ZodString>>>>>>;
      rootDirs: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      skipLibCheck: Schema.ZodOptional<Schema.ZodBoolean>;
      strict: Schema.ZodOptional<Schema.ZodBoolean>;
      strictBindCallApply: Schema.ZodOptional<Schema.ZodBoolean>;
      strictBuiltinIteratorReturn: Schema.ZodOptional<Schema.ZodBoolean>;
      strictFunctionTypes: Schema.ZodOptional<Schema.ZodBoolean>;
      strictNullChecks: Schema.ZodOptional<Schema.ZodBoolean>;
      strictPropertyInitialization: Schema.ZodOptional<Schema.ZodBoolean>;
      types: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      useUnknownInCatchVariables: Schema.ZodOptional<Schema.ZodBoolean>;
      verbatimModuleSyntax: Schema.ZodOptional<Schema.ZodBoolean>;
    }, Schema.core.$strip>>>;
    deploy: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      org: Schema.ZodOptional<Schema.ZodString>;
      app: Schema.ZodOptional<Schema.ZodString>;
      framework: Schema.ZodOptional<Schema.ZodString>;
      install: Schema.ZodOptional<Schema.ZodString>;
      build: Schema.ZodOptional<Schema.ZodString>;
      predeploy: Schema.ZodOptional<Schema.ZodString>;
      runtime: Schema.ZodOptional<Schema.ZodObject<{
        mode: Schema.ZodOptional<Schema.ZodEnum<{
          dynamic: "dynamic";
          static: "static";
        }>>;
        entrypoint: Schema.ZodOptional<Schema.ZodString>;
        args: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
        cwd: Schema.ZodOptional<Schema.ZodString>;
        spa: Schema.ZodOptional<Schema.ZodBoolean>;
      }, Schema.core.$strip>>;
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>>>;
    importMap: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodString>>;
    catalog: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>;
    catalogs: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>>;
    imports: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>;
    scopes: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>>;
    exclude: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>>;
    lint: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      plugins: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      rules: Schema.ZodOptional<Schema.ZodObject<{
        tags: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
        exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
        include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      }, Schema.core.$strip>>;
      report: Schema.ZodOptional<Schema.ZodEnum<{
        compact: "compact";
        json: "json";
        pretty: "pretty";
      }>>;
    }, Schema.core.$strip>>>;
    fmt: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      useTabs: Schema.ZodOptional<Schema.ZodBoolean>;
      lineWidth: Schema.ZodOptional<Schema.ZodNumber>;
      indentWidth: Schema.ZodOptional<Schema.ZodNumber>;
      singleQuote: Schema.ZodOptional<Schema.ZodBoolean>;
      proseWrap: Schema.ZodOptional<Schema.ZodEnum<{
        always: "always";
        never: "never";
        preserve: "preserve";
      }>>;
      semiColons: Schema.ZodOptional<Schema.ZodBoolean>;
      quoteProps: Schema.ZodOptional<Schema.ZodEnum<{
        asNeeded: "asNeeded";
        consistent: "consistent";
        preserve: "preserve";
      }>>;
      newLineKind: Schema.ZodOptional<Schema.ZodEnum<{
        auto: "auto";
        crlf: "crlf";
        lf: "lf";
        system: "system";
      }>>;
      useBraces: Schema.ZodOptional<Schema.ZodEnum<{
        always: "always";
        maintain: "maintain";
        preferNone: "preferNone";
        whenNotSingleLine: "whenNotSingleLine";
      }>>;
      bracePosition: Schema.ZodOptional<Schema.ZodEnum<{
        maintain: "maintain";
        nextLine: "nextLine";
        sameLine: "sameLine";
        sameLineUnlessHanging: "sameLineUnlessHanging";
      }>>;
      singleBodyPosition: Schema.ZodOptional<Schema.ZodEnum<{
        maintain: "maintain";
        nextLine: "nextLine";
        sameLine: "sameLine";
      }>>;
      nextControlFlowPosition: Schema.ZodOptional<Schema.ZodEnum<{
        maintain: "maintain";
        nextLine: "nextLine";
        sameLine: "sameLine";
      }>>;
      trailingCommas: Schema.ZodOptional<Schema.ZodEnum<{
        always: "always";
        never: "never";
        onlyMultiLine: "onlyMultiLine";
      }>>;
      "json.trailingCommas": Schema.ZodOptional<Schema.ZodEnum<{
        always: "always";
        jsonc: "jsonc";
        maintain: "maintain";
        never: "never";
      }>>;
      operatorPosition: Schema.ZodOptional<Schema.ZodEnum<{
        maintain: "maintain";
        nextLine: "nextLine";
        sameLine: "sameLine";
      }>>;
      "jsx.bracketPosition": Schema.ZodOptional<Schema.ZodEnum<{
        maintain: "maintain";
        nextLine: "nextLine";
        sameLine: "sameLine";
      }>>;
      "jsx.forceNewLinesSurroundingContent": Schema.ZodOptional<Schema.ZodBoolean>;
      "jsx.multiLineParens": Schema.ZodOptional<Schema.ZodEnum<{
        always: "always";
        never: "never";
        prefer: "prefer";
      }>>;
      "typeLiteral.separatorKind": Schema.ZodOptional<Schema.ZodEnum<{
        comma: "comma";
        semiColon: "semiColon";
      }>>;
      spaceAround: Schema.ZodOptional<Schema.ZodBoolean>;
      spaceSurroundingProperties: Schema.ZodOptional<Schema.ZodBoolean>;
      vueComponentCase: Schema.ZodOptional<Schema.ZodEnum<{
        ignore: "ignore";
        "kebab-case": "kebab-case";
        "pascal-case": "pascal-case";
      }>>;
      angularNextControlFlowSameLine: Schema.ZodOptional<Schema.ZodBoolean>;
      sortNamedImports: Schema.ZodOptional<Schema.ZodEnum<{
        caseInsensitive: "caseInsensitive";
        caseSensitive: "caseSensitive";
        maintain: "maintain";
      }>>;
      sortNamedExports: Schema.ZodOptional<Schema.ZodEnum<{
        caseInsensitive: "caseInsensitive";
        caseSensitive: "caseSensitive";
        maintain: "maintain";
      }>>;
      useEditorConfig: Schema.ZodOptional<Schema.ZodBoolean>;
      options: Schema.ZodOptional<Schema.ZodObject<{
        useTabs: Schema.ZodOptional<Schema.ZodBoolean>;
        lineWidth: Schema.ZodOptional<Schema.ZodNumber>;
        indentWidth: Schema.ZodOptional<Schema.ZodNumber>;
        singleQuote: Schema.ZodOptional<Schema.ZodBoolean>;
        proseWrap: Schema.ZodOptional<Schema.ZodEnum<{
          always: "always";
          never: "never";
          preserve: "preserve";
        }>>;
        semiColons: Schema.ZodOptional<Schema.ZodBoolean>;
      }, Schema.core.$strip>>;
    }, Schema.core.$strip>>>;
    minimumDependencyAge: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodNumber]>, Schema.ZodObject<{
      age: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodNumber]>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>]>>>;
    nodeModulesDir: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodEnum<{
      auto: "auto";
      manual: "manual";
      none: "none";
    }>, Schema.ZodBoolean]>>>;
    vendor: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodBoolean>>;
    jsrDepsInNodeModules: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodBoolean>>;
    preferPackageJson: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodBoolean>>;
    tasks: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      description: Schema.ZodOptional<Schema.ZodString>;
      command: Schema.ZodOptional<Schema.ZodString>;
      dependencies: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      files: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      output: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      env: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>]>>>>;
    test: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      permissions: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
        all: Schema.ZodOptional<Schema.ZodBoolean>;
        read: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        write: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        import: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        env: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        net: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        run: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        ffi: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        sys: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
      }, Schema.core.$strip>]>>;
      sanitizeOps: Schema.ZodOptional<Schema.ZodBoolean>;
      sanitizeResources: Schema.ZodOptional<Schema.ZodBoolean>;
    }, Schema.core.$strip>>>;
    publish: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>, Schema.ZodLiteral<false>]>>>;
    bench: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      permissions: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
        all: Schema.ZodOptional<Schema.ZodBoolean>;
        read: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        write: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        import: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        env: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        net: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        run: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        ffi: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        sys: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
      }, Schema.core.$strip>]>>;
    }, Schema.core.$strip>>>;
    coverage: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      thresholds: Schema.ZodOptional<Schema.ZodObject<{
        lines: Schema.ZodOptional<Schema.ZodNumber>;
        branches: Schema.ZodOptional<Schema.ZodNumber>;
        functions: Schema.ZodOptional<Schema.ZodNumber>;
      }, Schema.core.$strip>>;
    }, Schema.core.$strip>>>;
    license: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodString>>;
    lock: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodBoolean, Schema.ZodObject<{
      path: Schema.ZodOptional<Schema.ZodString>;
      frozen: Schema.ZodOptional<Schema.ZodBoolean>;
    }, Schema.core.$strip>]>>>;
    unstable: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>>;
    name: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodString>>;
    version: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodString>>;
    exports: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodString>]>>>;
    permissions: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodObject<{
      all: Schema.ZodOptional<Schema.ZodBoolean>;
      read: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      write: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      import: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      env: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      net: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      run: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      ffi: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      sys: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
    }, Schema.core.$strip>>>>;
    patch: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>>;
    links: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>>;
    workspace: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodArray<Schema.ZodString>, Schema.ZodObject<{
      members: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>]>>>;
  }, Schema.core.$strip>>): UserConfigExport<Schema.ZodObject<{
    description: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodString>>;
    keywords: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>>;
    homepage: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodString>>;
    bugs: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      url: Schema.ZodOptional<Schema.ZodString>;
      email: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>]>>>;
    licenses: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodArray<Schema.ZodObject<{
      type: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodEnum<{
        "AGPL-3.0-only": "AGPL-3.0-only";
        "Apache-2.0": "Apache-2.0";
        "BSD-2-Clause": "BSD-2-Clause";
        "BSD-3-Clause": "BSD-3-Clause";
        "BSL-1.0": "BSL-1.0";
        "CC0-1.0": "CC0-1.0";
        "CDDL-1.0": "CDDL-1.0";
        "CDDL-1.1": "CDDL-1.1";
        "EPL-1.0": "EPL-1.0";
        "EPL-2.0": "EPL-2.0";
        "GPL-2.0-only": "GPL-2.0-only";
        "GPL-3.0-only": "GPL-3.0-only";
        ISC: "ISC";
        "LGPL-2.0-only": "LGPL-2.0-only";
        "LGPL-2.1-only": "LGPL-2.1-only";
        "LGPL-2.1-or-later": "LGPL-2.1-or-later";
        "LGPL-3.0-only": "LGPL-3.0-only";
        "LGPL-3.0-or-later": "LGPL-3.0-or-later";
        MIT: "MIT";
        "MPL-2.0": "MPL-2.0";
        "MS-PL": "MS-PL";
        UNLICENSED: "UNLICENSED";
      }>]>>;
      url: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>>>>;
    author: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      name: Schema.ZodString;
      url: Schema.ZodOptional<Schema.ZodString>;
      email: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>]>>>;
    contributors: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodArray<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      name: Schema.ZodString;
      url: Schema.ZodOptional<Schema.ZodString>;
      email: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>]>>>>;
    maintainers: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodArray<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      name: Schema.ZodString;
      url: Schema.ZodOptional<Schema.ZodString>;
      email: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>]>>>>;
    main: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodString>>;
    bin: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodString>]>>>;
    type: Schema.ZodOptional<Schema.ZodDefault<Schema.ZodOptional<Schema.ZodEnum<{
      commonjs: "commonjs";
      module: "module";
    }>>>>;
    types: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodString>>;
    typings: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodString>>;
    typesVersions: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodArray<Schema.ZodString>>>>>;
    man: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodArray<Schema.ZodString>]>>>;
    directories: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      bin: Schema.ZodOptional<Schema.ZodString>;
      doc: Schema.ZodOptional<Schema.ZodString>;
      example: Schema.ZodOptional<Schema.ZodString>;
      lib: Schema.ZodOptional<Schema.ZodString>;
      man: Schema.ZodOptional<Schema.ZodString>;
      test: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>>>;
    repository: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      type: Schema.ZodOptional<Schema.ZodString>;
      url: Schema.ZodOptional<Schema.ZodString>;
      directory: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>]>>>;
    funding: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      url: Schema.ZodString;
      type: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      url: Schema.ZodString;
      type: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>]>>]>>>;
    scripts: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>;
    config: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>>;
    dependencies: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>;
    devDependencies: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>;
    optionalDependencies: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>;
    peerDependencies: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>;
    peerDependenciesMeta: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodObject<{
      optional: Schema.ZodOptional<Schema.ZodBoolean>;
    }, Schema.core.$loose>>>>;
    bundleDependencies: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodArray<Schema.ZodString>, Schema.ZodBoolean]>>>;
    bundledDependencies: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodArray<Schema.ZodString>, Schema.ZodBoolean]>>>;
    resolutions: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>>;
    overrides: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>>;
    packageManager: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodString>>;
    engines: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      node: Schema.ZodOptional<Schema.ZodString>;
      runtime: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>>]>>;
    }, Schema.core.$catchall<Schema.ZodString>>>>;
    volta: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      extends: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$catchall<Schema.ZodString>>>>;
    engineStrict: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodBoolean>>;
    os: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>>;
    cpu: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>>;
    devEngines: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      os: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>>]>>;
      cpu: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>>]>>;
      libc: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>>]>>;
      runtime: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>>]>>;
      packageManager: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>, Schema.ZodArray<Schema.ZodObject<{
        name: Schema.ZodString;
        version: Schema.ZodOptional<Schema.ZodString>;
        onFail: Schema.ZodOptional<Schema.ZodEnum<{
          download: "download";
          error: "error";
          ignore: "ignore";
          warn: "warn";
        }>>;
      }, Schema.core.$strip>>]>>;
    }, Schema.core.$strip>>>;
    preferGlobal: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodBoolean>>;
    private: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodEnum<{
      false: "false";
      true: "true";
    }>]>>>;
    publishConfig: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      access: Schema.ZodOptional<Schema.ZodEnum<{
        public: "public";
        restricted: "restricted";
      }>>;
      tag: Schema.ZodOptional<Schema.ZodString>;
      registry: Schema.ZodOptional<Schema.ZodString>;
      provenance: Schema.ZodOptional<Schema.ZodBoolean>;
      directory: Schema.ZodOptional<Schema.ZodString>;
      linkDirectory: Schema.ZodOptional<Schema.ZodBoolean>;
      executableFiles: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$loose>>>;
    dist: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      shasum: Schema.ZodOptional<Schema.ZodString>;
      tarball: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$strip>>>;
    readme: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodString>>;
    module: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodString>>;
    esnext: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      main: Schema.ZodOptional<Schema.ZodString>;
      browser: Schema.ZodOptional<Schema.ZodString>;
    }, Schema.core.$catchall<Schema.ZodString>>]>>>;
    workspaces: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodArray<Schema.ZodString>, Schema.ZodObject<{
      packages: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      nohoist: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>]>>>;
    sideEffects: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>>;
    compileOnSave: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>>;
    typeAcquisition: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodNullable<Schema.ZodObject<{
      enable: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      include: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
      exclude: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
    }, Schema.core.$strip>>>>;
    extends: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodArray<Schema.ZodString>]>>>;
    watchOptions: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodNullable<Schema.ZodObject<{
      force: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      watchFile: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      watchDirectory: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      fallbackPolling: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      synchronousWatchDirectory: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      excludeFiles: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
      excludeDirectories: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>;
    }, Schema.core.$strip>>>>;
    buildOptions: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      dry: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      force: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      verbose: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      incremental: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      assumeChangesOnlyAffectDirectDependencies: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      traceResolution: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
    }, Schema.core.$strip>>>;
    "ts-node": Schema.ZodOptional<Schema.ZodOptional<Schema.ZodNullable<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnknown>>>>;
    files: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>>;
    include: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodNullable<Schema.ZodArray<Schema.ZodString>>>>;
    references: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodArray<Schema.ZodObject<{
      path: Schema.ZodString;
    }, Schema.core.$strip>>>>;
    allowScripts: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>, Schema.ZodObject<{
      allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      deny: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>]>>>;
    compile: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      permissions: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
        all: Schema.ZodOptional<Schema.ZodBoolean>;
        read: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        write: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        import: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        env: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        net: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        run: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        ffi: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        sys: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
      }, Schema.core.$strip>]>>;
    }, Schema.core.$strip>>>;
    desktop: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      app: Schema.ZodOptional<Schema.ZodObject<{
        name: Schema.ZodOptional<Schema.ZodString>;
        identifier: Schema.ZodOptional<Schema.ZodString>;
        icons: Schema.ZodOptional<Schema.ZodObject<{
          macos: Schema.ZodOptional<Schema.ZodString>;
          windows: Schema.ZodOptional<Schema.ZodString>;
          linux: Schema.ZodOptional<Schema.ZodString>;
        }, Schema.core.$strip>>;
        deepLinks: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      }, Schema.core.$strip>>;
      backend: Schema.ZodOptional<Schema.ZodEnum<{
        cef: "cef";
        webview: "webview";
      }>>;
      output: Schema.ZodOptional<Schema.ZodObject<{
        macos: Schema.ZodOptional<Schema.ZodString>;
        windows: Schema.ZodOptional<Schema.ZodString>;
        linux: Schema.ZodOptional<Schema.ZodString>;
      }, Schema.core.$strip>>;
      release: Schema.ZodOptional<Schema.ZodObject<{
        baseUrl: Schema.ZodOptional<Schema.ZodString>;
      }, Schema.core.$strip>>;
    }, Schema.core.$strip>>>;
    compilerOptions: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      allowJs: Schema.ZodOptional<Schema.ZodBoolean>;
      allowUnreachableCode: Schema.ZodOptional<Schema.ZodBoolean>;
      allowUnusedLabels: Schema.ZodOptional<Schema.ZodBoolean>;
      checkJs: Schema.ZodOptional<Schema.ZodBoolean>;
      emitDecoratorMetadata: Schema.ZodOptional<Schema.ZodBoolean>;
      erasableSyntaxOnly: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodBoolean>>;
      exactOptionalPropertyTypes: Schema.ZodOptional<Schema.ZodBoolean>;
      experimentalDecorators: Schema.ZodOptional<Schema.ZodBoolean>;
      isolatedDeclarations: Schema.ZodOptional<Schema.ZodBoolean>;
      jsx: Schema.ZodOptional<Schema.ZodEnum<{
        precompile: "precompile";
        preserve: "preserve";
        react: "react";
        "react-jsx": "react-jsx";
        "react-jsxdev": "react-jsxdev";
        "react-native": "react-native";
      }>>;
      jsxFactory: Schema.ZodOptional<Schema.ZodString>;
      jsxFragmentFactory: Schema.ZodOptional<Schema.ZodString>;
      jsxImportSource: Schema.ZodOptional<Schema.ZodString>;
      jsxImportSourceTypes: Schema.ZodOptional<Schema.ZodString>;
      jsxPrecompileSkipElements: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      lib: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      module: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      moduleResolution: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      noErrorTruncation: Schema.ZodOptional<Schema.ZodBoolean>;
      noFallthroughCasesInSwitch: Schema.ZodOptional<Schema.ZodBoolean>;
      noImplicitAny: Schema.ZodOptional<Schema.ZodBoolean>;
      noImplicitOverride: Schema.ZodOptional<Schema.ZodBoolean>;
      noImplicitReturns: Schema.ZodOptional<Schema.ZodBoolean>;
      noImplicitThis: Schema.ZodOptional<Schema.ZodBoolean>;
      noPropertyAccessFromIndexSignature: Schema.ZodOptional<Schema.ZodBoolean>;
      noUncheckedIndexedAccess: Schema.ZodOptional<Schema.ZodBoolean>;
      noUnusedLocals: Schema.ZodOptional<Schema.ZodBoolean>;
      noUnusedParameters: Schema.ZodOptional<Schema.ZodBoolean>;
      baseUrl: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodString>>;
      paths: Schema.ZodOptional<Schema.ZodNullable<Schema.ZodRecord<Schema.ZodString, Schema.ZodNullable<Schema.ZodArray<Schema.ZodNullable<Schema.ZodString>>>>>>;
      rootDirs: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      skipLibCheck: Schema.ZodOptional<Schema.ZodBoolean>;
      strict: Schema.ZodOptional<Schema.ZodBoolean>;
      strictBindCallApply: Schema.ZodOptional<Schema.ZodBoolean>;
      strictBuiltinIteratorReturn: Schema.ZodOptional<Schema.ZodBoolean>;
      strictFunctionTypes: Schema.ZodOptional<Schema.ZodBoolean>;
      strictNullChecks: Schema.ZodOptional<Schema.ZodBoolean>;
      strictPropertyInitialization: Schema.ZodOptional<Schema.ZodBoolean>;
      types: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      useUnknownInCatchVariables: Schema.ZodOptional<Schema.ZodBoolean>;
      verbatimModuleSyntax: Schema.ZodOptional<Schema.ZodBoolean>;
    }, Schema.core.$strip>>>;
    deploy: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      org: Schema.ZodOptional<Schema.ZodString>;
      app: Schema.ZodOptional<Schema.ZodString>;
      framework: Schema.ZodOptional<Schema.ZodString>;
      install: Schema.ZodOptional<Schema.ZodString>;
      build: Schema.ZodOptional<Schema.ZodString>;
      predeploy: Schema.ZodOptional<Schema.ZodString>;
      runtime: Schema.ZodOptional<Schema.ZodObject<{
        mode: Schema.ZodOptional<Schema.ZodEnum<{
          dynamic: "dynamic";
          static: "static";
        }>>;
        entrypoint: Schema.ZodOptional<Schema.ZodString>;
        args: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
        cwd: Schema.ZodOptional<Schema.ZodString>;
        spa: Schema.ZodOptional<Schema.ZodBoolean>;
      }, Schema.core.$strip>>;
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>>>;
    importMap: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodString>>;
    catalog: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>;
    catalogs: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>>;
    imports: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>;
    scopes: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodString>>>>;
    exclude: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>>;
    lint: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      plugins: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      rules: Schema.ZodOptional<Schema.ZodObject<{
        tags: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
        exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
        include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      }, Schema.core.$strip>>;
      report: Schema.ZodOptional<Schema.ZodEnum<{
        compact: "compact";
        json: "json";
        pretty: "pretty";
      }>>;
    }, Schema.core.$strip>>>;
    fmt: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      useTabs: Schema.ZodOptional<Schema.ZodBoolean>;
      lineWidth: Schema.ZodOptional<Schema.ZodNumber>;
      indentWidth: Schema.ZodOptional<Schema.ZodNumber>;
      singleQuote: Schema.ZodOptional<Schema.ZodBoolean>;
      proseWrap: Schema.ZodOptional<Schema.ZodEnum<{
        always: "always";
        never: "never";
        preserve: "preserve";
      }>>;
      semiColons: Schema.ZodOptional<Schema.ZodBoolean>;
      quoteProps: Schema.ZodOptional<Schema.ZodEnum<{
        asNeeded: "asNeeded";
        consistent: "consistent";
        preserve: "preserve";
      }>>;
      newLineKind: Schema.ZodOptional<Schema.ZodEnum<{
        auto: "auto";
        crlf: "crlf";
        lf: "lf";
        system: "system";
      }>>;
      useBraces: Schema.ZodOptional<Schema.ZodEnum<{
        always: "always";
        maintain: "maintain";
        preferNone: "preferNone";
        whenNotSingleLine: "whenNotSingleLine";
      }>>;
      bracePosition: Schema.ZodOptional<Schema.ZodEnum<{
        maintain: "maintain";
        nextLine: "nextLine";
        sameLine: "sameLine";
        sameLineUnlessHanging: "sameLineUnlessHanging";
      }>>;
      singleBodyPosition: Schema.ZodOptional<Schema.ZodEnum<{
        maintain: "maintain";
        nextLine: "nextLine";
        sameLine: "sameLine";
      }>>;
      nextControlFlowPosition: Schema.ZodOptional<Schema.ZodEnum<{
        maintain: "maintain";
        nextLine: "nextLine";
        sameLine: "sameLine";
      }>>;
      trailingCommas: Schema.ZodOptional<Schema.ZodEnum<{
        always: "always";
        never: "never";
        onlyMultiLine: "onlyMultiLine";
      }>>;
      "json.trailingCommas": Schema.ZodOptional<Schema.ZodEnum<{
        always: "always";
        jsonc: "jsonc";
        maintain: "maintain";
        never: "never";
      }>>;
      operatorPosition: Schema.ZodOptional<Schema.ZodEnum<{
        maintain: "maintain";
        nextLine: "nextLine";
        sameLine: "sameLine";
      }>>;
      "jsx.bracketPosition": Schema.ZodOptional<Schema.ZodEnum<{
        maintain: "maintain";
        nextLine: "nextLine";
        sameLine: "sameLine";
      }>>;
      "jsx.forceNewLinesSurroundingContent": Schema.ZodOptional<Schema.ZodBoolean>;
      "jsx.multiLineParens": Schema.ZodOptional<Schema.ZodEnum<{
        always: "always";
        never: "never";
        prefer: "prefer";
      }>>;
      "typeLiteral.separatorKind": Schema.ZodOptional<Schema.ZodEnum<{
        comma: "comma";
        semiColon: "semiColon";
      }>>;
      spaceAround: Schema.ZodOptional<Schema.ZodBoolean>;
      spaceSurroundingProperties: Schema.ZodOptional<Schema.ZodBoolean>;
      vueComponentCase: Schema.ZodOptional<Schema.ZodEnum<{
        ignore: "ignore";
        "kebab-case": "kebab-case";
        "pascal-case": "pascal-case";
      }>>;
      angularNextControlFlowSameLine: Schema.ZodOptional<Schema.ZodBoolean>;
      sortNamedImports: Schema.ZodOptional<Schema.ZodEnum<{
        caseInsensitive: "caseInsensitive";
        caseSensitive: "caseSensitive";
        maintain: "maintain";
      }>>;
      sortNamedExports: Schema.ZodOptional<Schema.ZodEnum<{
        caseInsensitive: "caseInsensitive";
        caseSensitive: "caseSensitive";
        maintain: "maintain";
      }>>;
      useEditorConfig: Schema.ZodOptional<Schema.ZodBoolean>;
      options: Schema.ZodOptional<Schema.ZodObject<{
        useTabs: Schema.ZodOptional<Schema.ZodBoolean>;
        lineWidth: Schema.ZodOptional<Schema.ZodNumber>;
        indentWidth: Schema.ZodOptional<Schema.ZodNumber>;
        singleQuote: Schema.ZodOptional<Schema.ZodBoolean>;
        proseWrap: Schema.ZodOptional<Schema.ZodEnum<{
          always: "always";
          never: "never";
          preserve: "preserve";
        }>>;
        semiColons: Schema.ZodOptional<Schema.ZodBoolean>;
      }, Schema.core.$strip>>;
    }, Schema.core.$strip>>>;
    minimumDependencyAge: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodNumber]>, Schema.ZodObject<{
      age: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodNumber]>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>]>>>;
    nodeModulesDir: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodEnum<{
      auto: "auto";
      manual: "manual";
      none: "none";
    }>, Schema.ZodBoolean]>>>;
    vendor: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodBoolean>>;
    jsrDepsInNodeModules: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodBoolean>>;
    preferPackageJson: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodBoolean>>;
    tasks: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
      description: Schema.ZodOptional<Schema.ZodString>;
      command: Schema.ZodOptional<Schema.ZodString>;
      dependencies: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      files: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      output: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      env: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>]>>>>;
    test: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      permissions: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
        all: Schema.ZodOptional<Schema.ZodBoolean>;
        read: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        write: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        import: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        env: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        net: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        run: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        ffi: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        sys: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
      }, Schema.core.$strip>]>>;
      sanitizeOps: Schema.ZodOptional<Schema.ZodBoolean>;
      sanitizeResources: Schema.ZodOptional<Schema.ZodBoolean>;
    }, Schema.core.$strip>>>;
    publish: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodObject<{
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>, Schema.ZodLiteral<false>]>>>;
    bench: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      include: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      exclude: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
      permissions: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodObject<{
        all: Schema.ZodOptional<Schema.ZodBoolean>;
        read: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        write: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        import: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        env: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        net: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        run: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        ffi: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
        sys: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
          allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
          deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        }, Schema.core.$strip>]>>;
      }, Schema.core.$strip>]>>;
    }, Schema.core.$strip>>>;
    coverage: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodObject<{
      thresholds: Schema.ZodOptional<Schema.ZodObject<{
        lines: Schema.ZodOptional<Schema.ZodNumber>;
        branches: Schema.ZodOptional<Schema.ZodNumber>;
        functions: Schema.ZodOptional<Schema.ZodNumber>;
      }, Schema.core.$strip>>;
    }, Schema.core.$strip>>>;
    license: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodString>>;
    lock: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodBoolean, Schema.ZodObject<{
      path: Schema.ZodOptional<Schema.ZodString>;
      frozen: Schema.ZodOptional<Schema.ZodBoolean>;
    }, Schema.core.$strip>]>>>;
    unstable: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>>;
    name: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodString>>;
    version: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodString>>;
    exports: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodString, Schema.ZodRecord<Schema.ZodString, Schema.ZodString>]>>>;
    permissions: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodRecord<Schema.ZodString, Schema.ZodObject<{
      all: Schema.ZodOptional<Schema.ZodBoolean>;
      read: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      write: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      import: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      env: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        ignore: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      net: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      run: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      ffi: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
      sys: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>, Schema.ZodObject<{
        allow: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
        deny: Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodBoolean, Schema.ZodArray<Schema.ZodString>]>>;
      }, Schema.core.$strip>]>>;
    }, Schema.core.$strip>>>>;
    patch: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>>;
    links: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>>;
    workspace: Schema.ZodOptional<Schema.ZodOptional<Schema.ZodUnion<readonly [Schema.ZodArray<Schema.ZodString>, Schema.ZodObject<{
      members: Schema.ZodOptional<Schema.ZodArray<Schema.ZodString>>;
    }, Schema.core.$strip>]>>>;
  }, Schema.core.$strip>>;
};
/**
 * Configuration interface managing application settings, schema validation,
 * grouping preferences, and runtime configuration access/mutation.
 */
export interface Config {
  /** Flat record of all loaded and merged configuration key-value pairs. */
  values: Record<string, unknown>;
  /** Grouped record mapping group names to their respective key-value configuration pairs. */
  groupValues: Record<string, Record<string, unknown>>;
  /**
   * Get a configuration value by key, or by group and config key.
   *
   * @param key Config key name when single argument, or group name when keyInGroup provided.
   * @param keyInGroup Optional config key name when first argument is group name.
   */
  get<T = unknown>(key: string): T | undefined;
  get<T = unknown>(group: string, key: string): T | undefined;
  /**
   * Set a configuration value for a given group and config key.
   *
   * @param group The configuration group (e.g. "app", "database", "package").
   * @param key The configuration key.
   * @param value The value to set.
   */
  set<T = unknown>(group: string, key: string, value: T): void;
  /**
   * Load configurations from candidates based on grouping preferences.
   *
   * @param preferences Grouping preference lists.
   */
  load(preferences?: Iterable<readonly string[]>): Promise<Record<string, unknown>>;
}
/**
 * Default implementation of the {@link Config} interface.
 */
export declare class ConfigManager implements Config {
  values: Record<string, unknown>;
  groupValues: Record<string, Record<string, unknown>>;
  constructor(initialValues?: Record<string, unknown>, groupFiles?: LoadedConfigFile[]);
  get<T = unknown>(groupOrKey: string, keyInGroup?: string): T | undefined;
  set<T = unknown>(group: string, key: string, value: T): void;
  load(preferences?: Iterable<readonly string[]>): Promise<Record<string, unknown>>;
}
/** Global default configuration instance. */
export declare const defaultConfig: Config;
/**
 * Get a configuration value by key, or by group and config key.
 */
export declare function getConfig<T = unknown>(key: string): T | undefined;
export declare function getConfig<T = unknown>(group: string, key: string): T | undefined;
/**
 * Set a configuration value for a given group and config key.
 *
 * @param group The configuration group (e.g. "app", "database", "package").
 * @param key The configuration key.
 * @param value The value to set.
 */
export declare function setConfig<T = unknown>(group: string, key: string, value: T): void;
//#endregion
//#region src/models/registries.d.ts
/** Metadata base for all registries.*/
type MetadataBase = {
  urn: string;
  title?: string;
  description?: string;
  moduleUrl?: string;
  hash?: string;
  deprecated?: boolean;
  examples?: $output[];
};
/**
 * A grouping, or an ordered list of preferred groupings.
 *
 * An array expresses fallback order: the loader tries each grouping's config
 * file in turn and uses the first one that exists, e.g. `["database", "app"]`
 * loads `database.config.*` when present, otherwise `app.config.*`.
 */
type Grouping = string | readonly string[];
/**
 * Configuration registry.
 * Configurations are key-value pairs within a {@link ZodObject}.
 */
declare const configReg: import("zod/v4/core").$ZodRegistry<{
  key: string;
  grouping?: Grouping;
} & MetadataBase, ZodObject<import("zod/v4/core").$ZodLooseShape, import("zod/v4/core").$strip>>;
/**
 * Ordered, de-duplicated groupings registered for a config schema.
 *
 * A single string is normalised to a one-element array so callers always deal
 * with an ordered preference list.
 */
declare function groupingsOf(schema: ZodObject): readonly string[] | undefined;
//#endregion
//#region src/models/config/index.d.ts
type AppConfig = Awaited<ReturnType<typeof loadAppConfig>>;
export declare function getConfigs(): Promise<AppConfig>;
//#endregion
//#region src/main.d.ts
export declare const main: () => Promise<unknown>;
//#endregion
export { type Grouping, configReg, groupingsOf };