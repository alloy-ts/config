import * as Schema from "zod";
import { configReg } from "../registries.ts";
import { createDefineConfig } from "../../config.ts";

/* -------------------------------------------------------------------------- */
/*                                Sub-Schemas                                 */
/* -------------------------------------------------------------------------- */

export const NamedExtensionSchema = Schema.object({
  name: Schema.string(),
  extension: Schema.unknown().optional(),
});

export const PreferencesSchema = Schema.object({
  colors: Schema.boolean().optional(),
  extensions: Schema.array(NamedExtensionSchema).optional(),
});

export const ClusterSchema = Schema.object({
  server: Schema.string().optional(),
  "tls-server-name": Schema.string().optional(),
  tlsServerName: Schema.string().optional(),
  "insecure-skip-tls-verify": Schema.boolean().optional(),
  insecureSkipTlsVerify: Schema.boolean().optional(),
  "certificate-authority": Schema.string().optional(),
  certificateAuthority: Schema.string().optional(),
  "certificate-authority-data": Schema.string().optional(),
  certificateAuthorityData: Schema.string().optional(),
  "proxy-url": Schema.string().optional(),
  proxyUrl: Schema.string().optional(),
  "disable-compression": Schema.boolean().optional(),
  disableCompression: Schema.boolean().optional(),
  extensions: Schema.array(NamedExtensionSchema).optional(),
});

export const NamedClusterSchema = Schema.object({
  name: Schema.string(),
  cluster: ClusterSchema,
});

export const ExecEnvVarSchema = Schema.object({
  name: Schema.string(),
  value: Schema.string(),
});

export const ExecConfigSchema = Schema.object({
  apiVersion: Schema.string().optional(),
  command: Schema.string(),
  args: Schema.array(Schema.string()).optional(),
  env: Schema.array(ExecEnvVarSchema).optional(),
  installHint: Schema.string().optional(),
  provideClusterInfo: Schema.boolean().optional(),
  interactiveMode: Schema.union([
    Schema.enum(["Never", "IfAvailable", "Always"]),
    Schema.string(),
  ]).optional(),
});

export const AuthProviderConfigSchema = Schema.object({
  name: Schema.string(),
  config: Schema.record(Schema.string(), Schema.string()).optional(),
});

export const AuthInfoSchema = Schema.object({
  "client-certificate": Schema.string().optional(),
  clientCertificate: Schema.string().optional(),
  "client-certificate-data": Schema.string().optional(),
  clientCertificateData: Schema.string().optional(),
  "client-key": Schema.string().optional(),
  clientKey: Schema.string().optional(),
  "client-key-data": Schema.string().optional(),
  clientKeyData: Schema.string().optional(),
  token: Schema.string().optional(),
  tokenFile: Schema.string().optional(),
  as: Schema.string().optional(),
  "as-uid": Schema.string().optional(),
  asUid: Schema.string().optional(),
  "as-groups": Schema.array(Schema.string()).optional(),
  asGroups: Schema.array(Schema.string()).optional(),
  "as-user-extra": Schema.record(Schema.string(), Schema.array(Schema.string()))
    .optional(),
  asUserExtra: Schema.record(Schema.string(), Schema.array(Schema.string()))
    .optional(),
  username: Schema.string().optional(),
  password: Schema.string().optional(),
  "auth-provider": AuthProviderConfigSchema.optional(),
  authProvider: AuthProviderConfigSchema.optional(),
  exec: ExecConfigSchema.optional(),
  extensions: Schema.array(NamedExtensionSchema).optional(),
});

export const NamedAuthInfoSchema = Schema.object({
  name: Schema.string(),
  user: AuthInfoSchema,
});

export const ContextSchema = Schema.object({
  cluster: Schema.string(),
  user: Schema.string(),
  namespace: Schema.string().optional(),
  extensions: Schema.array(NamedExtensionSchema).optional(),
});

export const NamedContextSchema = Schema.object({
  name: Schema.string(),
  context: ContextSchema,
});

/* -------------------------------------------------------------------------- */
/*                             KubeConfig Schema                              */
/* -------------------------------------------------------------------------- */

export const KubeConfig = Schema.object({
  kind: Schema.string().optional(),
  apiVersion: Schema.string().optional(),
  preferences: PreferencesSchema.optional(),
  clusters: Schema.array(NamedClusterSchema).optional(),
  users: Schema.array(NamedAuthInfoSchema).optional(),
  contexts: Schema.array(NamedContextSchema).optional(),
  "current-context": Schema.string().optional(),
  currentContext: Schema.string().optional(),
  extensions: Schema.array(NamedExtensionSchema).optional(),
}).register(configReg, {
  urn: "model:config.kube",
  key: "kube",
  title: "Kubernetes Kubeconfig Configuration",
  description: "A JSON or YAML representation of a Kubernetes kubeconfig file.",
  grouping: "kube",
  moduleUrl: import.meta.url,
});

export type Kube = Schema.infer<typeof KubeConfig>;

/** Strongly-typed `defineKubeConfig` for authoring a `kube.config.ts` file. */
export const defineKubeConfig = createDefineConfig(KubeConfig.partial());
