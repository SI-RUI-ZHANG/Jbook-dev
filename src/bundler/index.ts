import * as esbuild from 'esbuild-wasm';
import {unpkgPathPlugin} from "./plugins/unpkg-path-plugins";
import {fetchPlugin} from "./plugins/fetch-plugin";

let initialized = false;

type bundleResult = Promise<{
  result: string,
  err: boolean
}>

const bundle = async (rawCode: string): bundleResult => {
  // initialize esbuild
  if (!initialized) {
    initialized = true;
    await esbuild.initialize({
      worker: true,
      wasmURL: '/node_modules/esbuild-wasm/esbuild.wasm',
    });
  }

  let result: esbuild.BuildResult;

  try {
    result = await esbuild.build({
      entryPoints: ['index.ts'],
      bundle: true,
      write: false,
      plugins: [
        unpkgPathPlugin(),
        fetchPlugin(rawCode)
      ],
    });
  } catch (err) {
    if (err instanceof Error) {
      return {
        result: err.message,
        err: true
      };
    }
    throw err;
  }

  return {
    result: result.outputFiles ? result.outputFiles[0].text : '',
    err: false
  };

};

export default bundle;