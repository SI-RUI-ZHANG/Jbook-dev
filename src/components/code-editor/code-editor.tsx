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
import bundler from "../../bundler";


interface CodeEditorProps {
  initialValue: string;

  setCode: React.Dispatch<string>;
  setBundleErr: React.Dispatch<string | null>;
}

const CodeEditor: FC<CodeEditorProps> = ({initialValue, setCode, setBundleErr}) => {
  const editorRef = useRef<IStandaloneCodeEditor>();
  const [input, setInput] = React.useState(initialValue);

  const handleEditorDidMount = useCallback((editor: any, monaco: any) => {
    editorRef.current = editor;
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
    setInput(value ?? '');
  };

  const onFormatHandler = () => {
    if (!editorRef.current) {
      return;
    }
    editorRef.current.getAction('editor.action.formatDocument').run();
  };

  const onCodeRunHandler = async () => {
    const output = await bundler(input);
    if (output.err) {
      setCode('');
      return setBundleErr(output.result);
    }
    setBundleErr(null);
    setCode(output.result);
  }
  return (
    <div className={'group/editor fade h-full w-[calc(100%-2px)]'}>
      <div className={'absolute z-10 right-2 bottom-2 flex gap-1'}>
        <button
          onClick={onCodeRunHandler}
          className={`btn-group-fade`}
        >
          RUN
        </button>
        <button
          onClick={onFormatHandler}
          className={`btn-group-fade`}
        >
          FORMAT
        </button>
      </div>
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