import React, {FC, useState} from 'react';
import CodeEditor from "../code-editor/code-editor";
import Preview from "../preview/preview";
import Resizable from "../resizable/resizable";

const CodeCell: FC = () => {
  const [code, setCode] = useState<string>("");
  const [bundleErr, setBundleErr] = useState<string | null>(null);


  return (
    <div className={'h-full pb-2 shadow-md shadow-gray-800 transition'}>
      <Resizable direction={"vertical"}>
        <div className={'flex h-full'}>
          <Resizable direction={"horizontal"}>
            <CodeEditor
              initialValue={'console.log("Hello World!")'}
              setCode={setCode}
              setBundleErr={setBundleErr}
            />
          </Resizable>
          <Preview code={code} bundleErr={bundleErr}/>
        </div>
      </Resizable>
    </div>
  );
};

export default CodeCell;