import React, {FC, useState} from 'react';
import bundler from "../../bundler";
import CodeEditor from "../code-editor/code-editor";
import Preview from "../preview/preview";
import Resizable from "../resizable/resizable";

const CodeCell: FC = () => {
  const [input, setInput] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const onClick = async () => {
    // validate if esbuild is loaded
    const output = await bundler(input);
    setCode(output);
  };

  return (
    <div className={'h-full pb-4 m-4 shadow-md shadow-gray-800 transition'}>
      <Resizable direction={"vertical"}>
        <div className={'flex h-full'}>
          <Resizable direction={"horizontal"}>
            <CodeEditor
              initialValue={'console.log("Hello World!")'}
              onChange={(value) => setInput(value??"")}
            />
          </Resizable>
          <Preview code={code}/>
        </div>
      </Resizable>
    </div>
  );
};

export default CodeCell;