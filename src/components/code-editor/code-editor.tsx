import MonacoEditor, {OnChange} from '@monaco-editor/react';
import React, {FC, useRef} from 'react';
import {editor} from "monaco-editor";
import {useCallback} from "react";
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;
import './code-editor.scss';
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

  const handleEditorDidMount = useCallback((editor: any, monaco: any) => {
    editorRef.current = editor;
    onChange(initialValue);
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.Preserve,
      target: monaco.languages.typescript.ScriptTarget.ES2020,
      esModuleInterop: true
    });

    const monacoJsxSyntaxHighlight = new MonacoJsxSyntaxHighlight(
      getWorker(),
      monaco
    );

    // editor is the result of monaco.editor.create
    const {
      highlighter,
      dispose
    } = monacoJsxSyntaxHighlight.highlighterBuilder({
      editor: editor
    });
    // init highlight
    highlighter();

    editor.onDidChangeModelContent(() => {
      // content change, highlight
      highlighter();
    });

    return dispose;
  }, []);

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
    <div className={'group/editor fade h-full w-[calc(100%-6px)]'}>
      <button
        id={'formatter'}
        onClick={onFormatHandler}
        className={`absolute z-10 right-2 bottom-2 btn-group-fade`}
      >
        FORMAT
      </button>
      <MonacoEditor
        className={'editor'}
        onChange={onChangeHandler}
        // onMount={(editor) => {editorRef.current = editor;}}
        onMount={handleEditorDidMount}
        value={initialValue}
        height={'100%'}
        language={'typescript'}
        theme={'vs-dark'}
        path={"file:///index.tsx"}
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