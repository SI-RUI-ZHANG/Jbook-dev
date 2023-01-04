import MonacoEditor, {OnChange} from '@monaco-editor/react';
import React, {FC, useRef} from 'react';
import {editor} from "monaco-editor";
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;

interface CodeEditorProps {
  initialValue: string;

  onChange(value?: string): void;
}

const CodeEditor: FC<CodeEditorProps> = ({initialValue, onChange}) => {
  const editorRef = useRef<IStandaloneCodeEditor>();

  // TODO: add typescript support
  const onChangeHandler: OnChange = (value) => {
    onChange(value);
  };

  const onFormatHandler = () => {
    if (!editorRef.current) {
      return;
    }
    editorRef.current.getAction('editor.action.formatDocument').run();
  };
  return (
    <div>
      <button id={'formatter'} onClick={onFormatHandler}>Format</button>
      <MonacoEditor
        onChange={onChangeHandler}
        onMount={(editor) => {editorRef.current = editor;}}
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