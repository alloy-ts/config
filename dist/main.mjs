import { createRequire } from "node:module";
//#region src/main.ts
const native = createRequire(import.meta.url)("../dist/index.js");
function makeChainable(cls, methods) {
	for (const method of methods) {
		const orig = cls.prototype[method];
		if (typeof orig === "function") cls.prototype[method] = function(...args) {
			orig.apply(this, args);
			return this;
		};
	}
}
makeChainable(native.ConfigBuilder, [
	"setDefault",
	"setOverride",
	"setOverrideOption",
	"addSource"
]);
makeChainable(native.Environment, [
	"prefix",
	"separator",
	"ignoreEmpty",
	"keepPrefix"
]);
makeChainable(native.File, ["format", "required"]);
const FileFormat = native.FileFormat;
const Config = native.Config;
const ConfigBuilder = native.ConfigBuilder;
const File = native.File;
const Environment = native.Environment;
const Value = native.Value;
File.Format = FileFormat;
Config.File = File;
//#endregion
export { Config, ConfigBuilder, Environment, File, FileFormat, Value };
