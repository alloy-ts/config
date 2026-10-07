import { createRequire } from "module";
//#region index.js
const require = createRequire(import.meta.url);
const { readFileSync } = require("fs");
let nativeBinding = null;
const loadErrors = [];
const isMusl = () => {
	let musl = false;
	if (process.platform === "linux") {
		musl = isMuslFromFilesystem();
		if (musl === null) musl = isMuslFromReport();
		if (musl === null) musl = isMuslFromChildProcess();
	}
	return musl;
};
const isFileMusl = (f) => f.includes("libc.musl-") || f.includes("ld-musl-");
const isMuslFromFilesystem = () => {
	try {
		return readFileSync("/usr/bin/ldd", "utf-8").includes("musl");
	} catch {
		return null;
	}
};
const isMuslFromReport = () => {
	let report = null;
	if (process.report && typeof process.report.getReport === "function") {
		process.report.excludeNetwork = true;
		report = process.report.getReport();
	}
	if (!report) return null;
	if (report.header && report.header.glibcVersionRuntime) return false;
	if (Array.isArray(report.sharedObjects)) {
		if (report.sharedObjects.some(isFileMusl)) return true;
	}
	return false;
};
const isMuslFromChildProcess = () => {
	try {
		return require("child_process").execSync("ldd --version", { encoding: "utf8" }).includes("musl");
	} catch (e) {
		return false;
	}
};
function requireNative() {
	if (process.env.NAPI_RS_NATIVE_LIBRARY_PATH) try {
		const overrideBinding = require(process.env.NAPI_RS_NATIVE_LIBRARY_PATH);
		overrideBinding && typeof overrideBinding.__napiBindingTarget === "string" && overrideBinding.__napiBindingTarget;
		return overrideBinding;
	} catch (err) {
		loadErrors.push(err);
	}
	else if (process.platform === "android") {
		if (process.arch === "arm64") {
			try {
				return require("./alloy_config.android-arm64.node");
			} catch (e) {
				loadErrors.push(e);
			}
			try {
				const binding = require("@alloy-ts/config-android-arm64");
				const bindingPackageVersion = require("@alloy-ts/config-android-arm64/package.json").version;
				if (bindingPackageVersion !== "0.0.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 0.0.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
				return binding;
			} catch (e) {
				loadErrors.push(e);
			}
		} else if (process.arch === "arm") {
			try {
				return require("./alloy_config.android-arm-eabi.node");
			} catch (e) {
				loadErrors.push(e);
			}
			try {
				const binding = require("@alloy-ts/config-android-arm-eabi");
				const bindingPackageVersion = require("@alloy-ts/config-android-arm-eabi/package.json").version;
				if (bindingPackageVersion !== "0.0.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 0.0.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
				return binding;
			} catch (e) {
				loadErrors.push(e);
			}
		} else loadErrors.push(/* @__PURE__ */ new Error(`Unsupported architecture on Android ${process.arch}`));
	} else if (process.platform === "win32") {
		if (process.arch === "x64") {
			if (process.config && process.config.variables && process.config.variables.shlib_suffix === "dll.a" || process.config && process.config.variables && process.config.variables.node_target_type === "shared_library") {
				try {
					return require("./alloy_config.win32-x64-gnu.node");
				} catch (e) {
					loadErrors.push(e);
				}
				try {
					const binding = require("@alloy-ts/config-win32-x64-gnu");
					const bindingPackageVersion = require("@alloy-ts/config-win32-x64-gnu/package.json").version;
					if (bindingPackageVersion !== "0.0.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 0.0.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
					return binding;
				} catch (e) {
					loadErrors.push(e);
				}
			} else {
				try {
					return require("./alloy_config.win32-x64-msvc.node");
				} catch (e) {
					loadErrors.push(e);
				}
				try {
					const binding = require("@alloy-ts/config-win32-x64-msvc");
					const bindingPackageVersion = require("@alloy-ts/config-win32-x64-msvc/package.json").version;
					if (bindingPackageVersion !== "0.0.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 0.0.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
					return binding;
				} catch (e) {
					loadErrors.push(e);
				}
			}
		} else if (process.arch === "ia32") {
			try {
				return require("./alloy_config.win32-ia32-msvc.node");
			} catch (e) {
				loadErrors.push(e);
			}
			try {
				const binding = require("@alloy-ts/config-win32-ia32-msvc");
				const bindingPackageVersion = require("@alloy-ts/config-win32-ia32-msvc/package.json").version;
				if (bindingPackageVersion !== "0.0.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 0.0.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
				return binding;
			} catch (e) {
				loadErrors.push(e);
			}
		} else if (process.arch === "arm64") {
			try {
				return require("./alloy_config.win32-arm64-msvc.node");
			} catch (e) {
				loadErrors.push(e);
			}
			try {
				const binding = require("@alloy-ts/config-win32-arm64-msvc");
				const bindingPackageVersion = require("@alloy-ts/config-win32-arm64-msvc/package.json").version;
				if (bindingPackageVersion !== "0.0.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 0.0.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
				return binding;
			} catch (e) {
				loadErrors.push(e);
			}
		} else loadErrors.push(/* @__PURE__ */ new Error(`Unsupported architecture on Windows: ${process.arch}`));
	} else if (process.platform === "darwin") {
		try {
			return require("./alloy_config.darwin-universal.node");
		} catch (e) {
			loadErrors.push(e);
		}
		try {
			const binding = require("@alloy-ts/config-darwin-universal");
			const bindingPackageVersion = require("@alloy-ts/config-darwin-universal/package.json").version;
			if (bindingPackageVersion !== "0.0.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 0.0.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
			return binding;
		} catch (e) {
			loadErrors.push(e);
		}
		if (process.arch === "x64") {
			try {
				return require("./alloy_config.darwin-x64.node");
			} catch (e) {
				loadErrors.push(e);
			}
			try {
				const binding = require("@alloy-ts/config-darwin-x64");
				const bindingPackageVersion = require("@alloy-ts/config-darwin-x64/package.json").version;
				if (bindingPackageVersion !== "0.0.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 0.0.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
				return binding;
			} catch (e) {
				loadErrors.push(e);
			}
		} else if (process.arch === "arm64") {
			try {
				return require("./alloy_config.darwin-arm64.node");
			} catch (e) {
				loadErrors.push(e);
			}
			try {
				const binding = require("@alloy-ts/config-darwin-arm64");
				const bindingPackageVersion = require("@alloy-ts/config-darwin-arm64/package.json").version;
				if (bindingPackageVersion !== "0.0.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 0.0.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
				return binding;
			} catch (e) {
				loadErrors.push(e);
			}
		} else loadErrors.push(/* @__PURE__ */ new Error(`Unsupported architecture on macOS: ${process.arch}`));
	} else if (process.platform === "freebsd") {
		if (process.arch === "x64") {
			try {
				return require("./alloy_config.freebsd-x64.node");
			} catch (e) {
				loadErrors.push(e);
			}
			try {
				const binding = require("@alloy-ts/config-freebsd-x64");
				const bindingPackageVersion = require("@alloy-ts/config-freebsd-x64/package.json").version;
				if (bindingPackageVersion !== "0.0.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 0.0.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
				return binding;
			} catch (e) {
				loadErrors.push(e);
			}
		} else if (process.arch === "arm64") {
			try {
				return require("./alloy_config.freebsd-arm64.node");
			} catch (e) {
				loadErrors.push(e);
			}
			try {
				const binding = require("@alloy-ts/config-freebsd-arm64");
				const bindingPackageVersion = require("@alloy-ts/config-freebsd-arm64/package.json").version;
				if (bindingPackageVersion !== "0.0.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 0.0.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
				return binding;
			} catch (e) {
				loadErrors.push(e);
			}
		} else loadErrors.push(/* @__PURE__ */ new Error(`Unsupported architecture on FreeBSD: ${process.arch}`));
	} else if (process.platform === "linux") {
		if (process.arch === "x64") {
			if (isMusl()) {
				try {
					return require("./alloy_config.linux-x64-musl.node");
				} catch (e) {
					loadErrors.push(e);
				}
				try {
					const binding = require("@alloy-ts/config-linux-x64-musl");
					const bindingPackageVersion = require("@alloy-ts/config-linux-x64-musl/package.json").version;
					if (bindingPackageVersion !== "0.0.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 0.0.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
					return binding;
				} catch (e) {
					loadErrors.push(e);
				}
			} else {
				try {
					return require("./alloy_config.linux-x64-gnu.node");
				} catch (e) {
					loadErrors.push(e);
				}
				try {
					const binding = require("@alloy-ts/config-linux-x64-gnu");
					const bindingPackageVersion = require("@alloy-ts/config-linux-x64-gnu/package.json").version;
					if (bindingPackageVersion !== "0.0.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 0.0.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
					return binding;
				} catch (e) {
					loadErrors.push(e);
				}
			}
		} else if (process.arch === "arm64") {
			if (isMusl()) {
				try {
					return require("./alloy_config.linux-arm64-musl.node");
				} catch (e) {
					loadErrors.push(e);
				}
				try {
					const binding = require("@alloy-ts/config-linux-arm64-musl");
					const bindingPackageVersion = require("@alloy-ts/config-linux-arm64-musl/package.json").version;
					if (bindingPackageVersion !== "0.0.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 0.0.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
					return binding;
				} catch (e) {
					loadErrors.push(e);
				}
			} else {
				try {
					return require("./alloy_config.linux-arm64-gnu.node");
				} catch (e) {
					loadErrors.push(e);
				}
				try {
					const binding = require("@alloy-ts/config-linux-arm64-gnu");
					const bindingPackageVersion = require("@alloy-ts/config-linux-arm64-gnu/package.json").version;
					if (bindingPackageVersion !== "0.0.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 0.0.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
					return binding;
				} catch (e) {
					loadErrors.push(e);
				}
			}
		} else if (process.arch === "arm") {
			if (isMusl()) {
				try {
					return require("./alloy_config.linux-arm-musleabihf.node");
				} catch (e) {
					loadErrors.push(e);
				}
				try {
					const binding = require("@alloy-ts/config-linux-arm-musleabihf");
					const bindingPackageVersion = require("@alloy-ts/config-linux-arm-musleabihf/package.json").version;
					if (bindingPackageVersion !== "0.0.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 0.0.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
					return binding;
				} catch (e) {
					loadErrors.push(e);
				}
			} else {
				try {
					return require("./alloy_config.linux-arm-gnueabihf.node");
				} catch (e) {
					loadErrors.push(e);
				}
				try {
					const binding = require("@alloy-ts/config-linux-arm-gnueabihf");
					const bindingPackageVersion = require("@alloy-ts/config-linux-arm-gnueabihf/package.json").version;
					if (bindingPackageVersion !== "0.0.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 0.0.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
					return binding;
				} catch (e) {
					loadErrors.push(e);
				}
			}
		} else if (process.arch === "loong64") {
			if (isMusl()) {
				try {
					return require("./alloy_config.linux-loong64-musl.node");
				} catch (e) {
					loadErrors.push(e);
				}
				try {
					const binding = require("@alloy-ts/config-linux-loong64-musl");
					const bindingPackageVersion = require("@alloy-ts/config-linux-loong64-musl/package.json").version;
					if (bindingPackageVersion !== "0.0.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 0.0.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
					return binding;
				} catch (e) {
					loadErrors.push(e);
				}
			} else {
				try {
					return require("./alloy_config.linux-loong64-gnu.node");
				} catch (e) {
					loadErrors.push(e);
				}
				try {
					const binding = require("@alloy-ts/config-linux-loong64-gnu");
					const bindingPackageVersion = require("@alloy-ts/config-linux-loong64-gnu/package.json").version;
					if (bindingPackageVersion !== "0.0.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 0.0.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
					return binding;
				} catch (e) {
					loadErrors.push(e);
				}
			}
		} else if (process.arch === "riscv64") {
			if (isMusl()) {
				try {
					return require("./alloy_config.linux-riscv64-musl.node");
				} catch (e) {
					loadErrors.push(e);
				}
				try {
					const binding = require("@alloy-ts/config-linux-riscv64-musl");
					const bindingPackageVersion = require("@alloy-ts/config-linux-riscv64-musl/package.json").version;
					if (bindingPackageVersion !== "0.0.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 0.0.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
					return binding;
				} catch (e) {
					loadErrors.push(e);
				}
			} else {
				try {
					return require("./alloy_config.linux-riscv64-gnu.node");
				} catch (e) {
					loadErrors.push(e);
				}
				try {
					const binding = require("@alloy-ts/config-linux-riscv64-gnu");
					const bindingPackageVersion = require("@alloy-ts/config-linux-riscv64-gnu/package.json").version;
					if (bindingPackageVersion !== "0.0.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 0.0.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
					return binding;
				} catch (e) {
					loadErrors.push(e);
				}
			}
		} else if (process.arch === "ppc64") {
			try {
				return require("./alloy_config.linux-ppc64-gnu.node");
			} catch (e) {
				loadErrors.push(e);
			}
			try {
				const binding = require("@alloy-ts/config-linux-ppc64-gnu");
				const bindingPackageVersion = require("@alloy-ts/config-linux-ppc64-gnu/package.json").version;
				if (bindingPackageVersion !== "0.0.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 0.0.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
				return binding;
			} catch (e) {
				loadErrors.push(e);
			}
		} else if (process.arch === "s390x") {
			try {
				return require("./alloy_config.linux-s390x-gnu.node");
			} catch (e) {
				loadErrors.push(e);
			}
			try {
				const binding = require("@alloy-ts/config-linux-s390x-gnu");
				const bindingPackageVersion = require("@alloy-ts/config-linux-s390x-gnu/package.json").version;
				if (bindingPackageVersion !== "0.0.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 0.0.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
				return binding;
			} catch (e) {
				loadErrors.push(e);
			}
		} else loadErrors.push(/* @__PURE__ */ new Error(`Unsupported architecture on Linux: ${process.arch}`));
	} else if (process.platform === "openharmony") {
		if (process.arch === "arm64") {
			try {
				return require("./alloy_config.openharmony-arm64.node");
			} catch (e) {
				loadErrors.push(e);
			}
			try {
				const binding = require("@alloy-ts/config-openharmony-arm64");
				const bindingPackageVersion = require("@alloy-ts/config-openharmony-arm64/package.json").version;
				if (bindingPackageVersion !== "0.0.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 0.0.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
				return binding;
			} catch (e) {
				loadErrors.push(e);
			}
		} else if (process.arch === "x64") {
			try {
				return require("./alloy_config.openharmony-x64.node");
			} catch (e) {
				loadErrors.push(e);
			}
			try {
				const binding = require("@alloy-ts/config-openharmony-x64");
				const bindingPackageVersion = require("@alloy-ts/config-openharmony-x64/package.json").version;
				if (bindingPackageVersion !== "0.0.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 0.0.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
				return binding;
			} catch (e) {
				loadErrors.push(e);
			}
		} else if (process.arch === "arm") {
			try {
				return require("./alloy_config.openharmony-arm.node");
			} catch (e) {
				loadErrors.push(e);
			}
			try {
				const binding = require("@alloy-ts/config-openharmony-arm");
				const bindingPackageVersion = require("@alloy-ts/config-openharmony-arm/package.json").version;
				if (bindingPackageVersion !== "0.0.0" && process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") throw new Error(`Native binding package version mismatch, expected 0.0.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
				return binding;
			} catch (e) {
				loadErrors.push(e);
			}
		} else loadErrors.push(/* @__PURE__ */ new Error(`Unsupported architecture on OpenHarmony: ${process.arch}`));
	} else loadErrors.push(/* @__PURE__ */ new Error(`Unsupported OS: ${process.platform}, architecture: ${process.arch}`));
}
function createLoadErrorChain(errors) {
	return errors.reduce((previous, current) => {
		let message;
		try {
			message = current && typeof current.message === "string" ? current.message : String(current);
		} catch {
			message = "Unknown error";
		}
		const error = new Error(message);
		error.cause = previous;
		return error;
	}, null);
}
const __napiWasiFlavors = ["wasm32-wasi"];
const __napiWasiFlavor = process.env.NAPI_RS_WASI_FLAVOR;
const __napiWasiFlavorRequested = typeof __napiWasiFlavor === "string" && __napiWasiFlavor.length > 0;
if (__napiWasiFlavorRequested && __napiWasiFlavors.indexOf(__napiWasiFlavor) === -1) throw new Error("Unsupported WASI flavor \"" + __napiWasiFlavor + "\". Available flavors: " + __napiWasiFlavors.join(", "));
const forceWasiError = process.env.NAPI_RS_FORCE_WASI === "error";
const forceWasi = process.env.NAPI_RS_FORCE_WASI === "true" || forceWasiError || __napiWasiFlavorRequested;
if (!forceWasi) nativeBinding = requireNative();
if (!nativeBinding || forceWasi) {
	let wasiBinding = null;
	let wasiBindingLoaded = false;
	const wasiBindingErrors = [];
	const __napiWasiResolveCandidate = (specifier, isPackage, localArtifacts) => {
		try {
			require.resolve(specifier);
		} catch (resolveError) {
			if (!resolveError || resolveError.code !== "MODULE_NOT_FOUND") throw resolveError;
			if (isPackage) {
				try {
					require.resolve(specifier + "/package.json");
				} catch (packageError) {
					if (packageError && packageError.code === "MODULE_NOT_FOUND") return resolveError;
					throw resolveError;
				}
				throw resolveError;
			}
			return resolveError;
		}
		if (localArtifacts) {
			let artifactError = null;
			for (let i = 0; i < localArtifacts.length; i++) try {
				require.resolve(localArtifacts[i]);
				return null;
			} catch (resolveError) {
				if (!resolveError || resolveError.code !== "MODULE_NOT_FOUND") throw resolveError;
				artifactError = resolveError;
			}
			return artifactError;
		}
		return null;
	};
	if (!wasiBindingLoaded && (!__napiWasiFlavorRequested || __napiWasiFlavor === "wasm32-wasi")) {
		let candidateError = null;
		let candidateFailed = false;
		try {
			candidateError = __napiWasiResolveCandidate("./alloy_config.wasi.cjs", false, ["./alloy_config.wasm32-wasi.debug.wasm", "./alloy_config.wasm32-wasi.wasm"]);
			candidateFailed = candidateError !== null;
			if (!candidateFailed) {
				wasiBinding = require("./alloy_config.wasi.cjs");
				nativeBinding = wasiBinding;
				wasiBindingLoaded = true;
			}
		} catch (err) {
			candidateError = err;
			candidateFailed = true;
		}
		if (candidateFailed) {
			wasiBindingErrors.push(candidateError);
			loadErrors.push(candidateError);
		}
	}
	if (!wasiBindingLoaded && (!__napiWasiFlavorRequested || __napiWasiFlavor === "wasm32-wasi")) {
		let candidateError = null;
		let candidateFailed = false;
		try {
			candidateError = __napiWasiResolveCandidate("@alloy-ts/config-wasm32-wasi", true, void 0);
			candidateFailed = candidateError !== null;
			if (!candidateFailed) {
				if (process.env.NAPI_RS_ENFORCE_VERSION_CHECK && process.env.NAPI_RS_ENFORCE_VERSION_CHECK !== "0") {
					const bindingPackageVersion = require("@alloy-ts/config-wasm32-wasi/package.json").version;
					if (bindingPackageVersion !== "0.0.0") throw new Error(`WASI binding package version mismatch, expected 0.0.0 but got ${bindingPackageVersion}. You can reinstall dependencies to fix this issue.`);
				}
				wasiBinding = require("@alloy-ts/config-wasm32-wasi");
				nativeBinding = wasiBinding;
				wasiBindingLoaded = true;
			}
		} catch (err) {
			candidateError = err;
			candidateFailed = true;
		}
		if (candidateFailed) {
			wasiBindingErrors.push(candidateError);
			loadErrors.push(candidateError);
		}
	}
	if (!wasiBindingLoaded && forceWasi && !forceWasiError && !__napiWasiFlavorRequested) nativeBinding = requireNative();
	if ((forceWasiError || __napiWasiFlavorRequested) && !wasiBindingLoaded) {
		const error = /* @__PURE__ */ new Error(__napiWasiFlavorRequested ? "WASI binding for flavor \"" + __napiWasiFlavor + "\" not found" : "WASI binding not found and NAPI_RS_FORCE_WASI is set to error");
		error.cause = createLoadErrorChain(wasiBindingErrors);
		throw error;
	}
}
if (!nativeBinding) {
	if (loadErrors.length > 0) {
		const error = /* @__PURE__ */ new Error("Cannot find native binding. npm has a bug related to optional dependencies (https://github.com/npm/cli/issues/4828). Please try `npm i` again after removing both package-lock.json and node_modules directory.");
		error.cause = createLoadErrorChain(loadErrors);
		throw error;
	}
	throw new Error(`Failed to load native binding`);
}
const { Config, ConfigBuilder, Environment, File, Value, FileFormat, ValueKind } = nativeBinding;
//#endregion
export { Config, ConfigBuilder, Environment, File, Value };
