import './app.css';
import React, {FC} from 'react';
import {useState} from "react";
import {useRef} from "react";
import CodeEditor from "./components/code-editor/code-editor";
import Preview from "./components/preview/preview";
import bundler from "./bundler";

const App: FC = () => {
  const [input, setInput] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const onClick = async () => {
    // validate if esbuild is loaded
    const output = await bundler(input);
    setCode(output);
  };

  return (
    <div>
      <CodeEditor
        initialValue={'console.log("Hello World!")'}
        onChange={(value) => setInput(value??"")}
      />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code}/>
    </div>
  );
};

export default App;
