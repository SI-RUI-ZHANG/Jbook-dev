import MonacoEditor, {OnChange} from '@monaco-editor/react';
import React, {FC, useRef} from 'react';
import {editor} from "monaco-editor";
import {useCallback} from "react";
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;
import {
  MonacoJsxSyntaxHighlight,
  getWorker
} from "monaco-jsx-syntax-highlight";


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
    <div className={'group z-0'}>
      <button
        id={'formatter'}
        onClick={onFormatHandler}
        className={`
        absolute z-10 right-2 top-2 text-white bg-red-400 px-2 py-1 opacity-0 rounded-sm
        group-hover:opacity-60 transition duration-200 font-medium
        hover:!opacity-100 active:bg-red-500
        `}
      >
        Format
      </button>
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