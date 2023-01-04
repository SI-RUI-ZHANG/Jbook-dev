import MonacoEditor, {OnChange} from '@monaco-editor/react';
import React, {FC, MouseEventHandler} from 'react';
// import prettier from 'prettier';
// import parser from 'prettier/parser-babel';
import {Connect} from "vite";
// import HandleFunction = Connect.HandleFunction;

interface CodeEditorProps {
  initialValue: string;

  onChange(value?: string): void;
}

const CodeEditor: FC<CodeEditorProps> = ({initialValue, onChange}) => {
  // TODO: add typescript support
  // const onChangeHandler: OnChange = (value) => {
  //   onChange(value);
  // };
  //
  // const onFormatHandler
  //   : MouseEventHandler<HTMLButtonElement> = (event) => {
  // }
  return (
    <div>
      {/*<button onClick={onFormatHandler}>Format</button>*/}
      <MonacoEditor
        // onChange={onChangeHandler}
        value={initialValue}
        height={'50vh'}
        language={'javascript'}
        theme={'vs-dark'}
        options={{
          minimap: {enabled: false},
          wordWrap: 'on',
          showUnused: false,
          tabSize: 2,
          folding: false,
          lineNumbersMinChars: 2,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: {top: 5, bottom: 5,}
        }}
      />
    </div>
  );
};

export default CodeEditor;