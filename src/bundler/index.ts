import * as esbuild from 'esbuild-wasm';
import {unpkgPathPlugin} from "../plugins/unpkg-path-plugins";
import {fetchPlugin} from "../plugins/fetch-plugin";

let initialized = false;

export default async (rawCode: string) => {
  // initialize esbuild
  if (!initialized) {
    await esbuild.initialize({
      worker: true,
      wasmURL: '/node_modules/esbuild-wasm/esbuild.wasm',
    });
    initialized = true;
  }

  const result = await esbuild.build({
    entryPoints: ['index.ts'],
    bundle: true,
    write: false,
    plugins: [
      unpkgPathPlugin(),
      fetchPlugin(rawCode)
    ],
  });

  return result.outputFiles[0].text;

}