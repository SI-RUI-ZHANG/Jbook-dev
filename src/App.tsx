import './app.css';
import * as esbuild from 'esbuild-wasm';
import React, {FC} from 'react';
import {useState} from "react";
import {useEffect} from "react";
import {useRef} from "react";
import {unpkgPathPlugin} from "./plugins/unpkg-path-plugins";
import {fetchPlugin} from "./plugins/fetch-plugin";
import CodeEditor from "./components/code-editor";

const App: FC = () => {
  const ref = useRef<boolean>(false);
  const iframe = useRef<any>();
  const [input, setInput] = useState<string|undefined>("");

  const onClick = async () => {
    // validate if esbuild is loaded
    if (!ref.current || !input) {
      return;
    }

    iframe.current.srcdoc = html;

    // TODO: add typescript support
    const result = await esbuild.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [
        unpkgPathPlugin(),
        fetchPlugin(input)
      ],
    });

    const output = result.outputFiles[0].text;
    // post message to iframe
    // *: specify any origin can send message to iframe
    iframe.current.contentWindow.postMessage(output, '*');
  };

  const startService = async () => {
    // initialize esbuild
    await esbuild.initialize({
      worker: true,
      wasmURL: '/node_modules/esbuild-wasm/esbuild.wasm',
    });

    // set ref to true for onClick validation
    ref.current = true;
  };

  useEffect(() => {
    // load esbuild.wasm when the component is mounted
    if (!ref.current) {
      startService();
    }
  }, []);

  const html = `
<html lang="en">
<head> <title>frame</title> </head>
<body>
<div id="root"></div>
<script>
<!-- receive message event posted my parent frame --> 
 window.addEventListener('message', (event) => {
   try {
     eval(event.data);
   } catch (e) {
     const root = document.querySelector('#root');
     root.innerHTML = '<div style="color:red;"><h4>Runtime Error</h4>' + e + '</div>'
     // log error so that user can see detailed information in the console
     console.error(e);
   }
 }, false);
</script>
</body>
</html>
`;

  return (
    <div>
      <CodeEditor
        initialValue={'console.log("Hello World!")'}
        onChange={(value) => setInput(value)}
      />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <iframe ref={iframe} sandbox={"allow-scripts"} srcDoc={html}></iframe>
    </div>
  );
};

export default App;
