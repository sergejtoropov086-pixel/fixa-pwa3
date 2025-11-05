// @ts-check
/**
 * This file defines a factory function that creates an instance of the
 * SqlJs module.
 *
 * The module is a WebAssembly module that contains the SQLite3 database
 * engine compiled from C to WebAssembly.
 *
 * The factory function is asynchronous because it needs to fetch the
 * WebAssembly binary file.
 *
 * See https://sql.js.org/#/api for the full API documentation.
 *
 * @param {object} [config]
 * @param {string} [config.locateFile] - A function that returns the path to
 * the WebAssembly binary file. By default, it assumes that the binary file
 * is in the same directory as this file.
 * @returns {Promise<SqlJs>}
 */
// prettier-ignore
export default function initSqlJs(config) {
  config = config || {};
  const locateFile = config.locateFile || ((file) => file);

  let wasmBinary;
  if (typeof window !== "undefined" && window.Sqljs) {
    wasmBinary = window.Sqljs.wasmBinary;
  }

  const Module = {
    noInitialRun: true,
    preRun: [],
    postRun: [],
    print: console.log,
    printErr: console.warn,
    wasmBinary,
    instantiateWasm(info, receiveInstance) {
      const wasmUrl = locateFile("sql-wasm.wasm");
      fetch(wasmUrl)
        .then((response) => response.arrayBuffer())
        .then((bytes) => WebAssembly.instantiate(bytes, info))
        .then((results) => receiveInstance(results.instance));
      return {};
    },
  };

  return new Promise((resolve, reject) => {
    Module.onRuntimeInitialized = () => {
      resolve(Module);
    };
    Module.onAbort = reject;
    /** @type {any} */
    const SqlJs = Module;
    SqlJs["FS_createPath"]("/", "sql", true, true);
  });
}
