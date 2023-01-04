import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localForage from "localforage";

const fileCache = localForage.createInstance({
  name: 'fileCache'
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {
      // handle root entry file of 'index.js'
      build.onLoad({filter: /(^index\.js$)/}, async (args: any) => {
        return {
          loader: 'jsx',
          contents: inputCode,
        };
      });

      // handle cached files
      build.onLoad({filter: /.*/}, async (args: any) => {
        // check to see if we have already fetched this file
        // and if it is in the cache
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);

        // if it is, return it immediately
        if (cachedResult) {
          return cachedResult;
        }
      });

      // handle .css file
      build.onLoad({filter: /.css$/}, async (args: any) => {
        const {data, request} = await axios.get(args.path);

        const escaped = data
          .replace(/\n/g, '')
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");

        const contents = `
          const style = document.createElement('style');
          style.innerText = '${escaped}';
          document.head.appendChild(style);
        `;

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents,
          // this is for caching
          resolveDir: new URL('./', request.responseURL).pathname,
        };

        // store response in cache
        await fileCache.setItem(args.path, result);

        return result;
      });


      // handle .js file
      build.onLoad({filter: /.*/}, async (args: any) => {
        const {data, request} = await axios.get(args.path);

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          // resolveDir: the directory where the file was found
          // this variable will be provided to the onResolve function
          resolveDir: new URL('./', request.responseURL).pathname,
        };

        // store response in cache
        await fileCache.setItem<esbuild.OnLoadResult>(args.path, result);

        return result;
      });
    }
  };
};