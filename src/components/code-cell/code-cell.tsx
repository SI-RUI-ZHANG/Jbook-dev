import React, {FC, useState} from 'react';
import CodeEditor from "../code-editor/code-editor";
import Preview from "../preview/preview";
import Resizable from "../resizable/resizable";
import {Cell} from "../../store/cellSlice";

interface CodeCellProps {
  cell: Cell
}

const CodeCell: FC<CodeCellProps> = ({cell}) => {
  const [code, setCode] = useState<string>("");
  const [bundleErr, setBundleErr] = useState<string | null>(null);

  return (
    <div className={'h-full pb-2 transition'}>
      <Resizable direction={"vertical"}>
        <div className={'flex h-full'}>
          <Resizable direction={"horizontal"}>
            <CodeEditor
              cell={cell}
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