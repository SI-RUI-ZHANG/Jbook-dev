import MonacoEditor from '@monaco-editor/react';
import React, {FC, useRef} from 'react';
import {editor} from "monaco-editor";
import {useCallback} from "react";
import IStandaloneCodeEditor = editor.IStandaloneCodeEditor;
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {Cell, updateCell} from "../../store/cellSlice";
import {createBundle} from "../../store/bundleSlice";
import {useCumulativeCode} from "../../hooks/use-cumulative-code";
import './code-editor.scss';
import {
  MonacoJsxSyntaxHighlight,
  getWorker
} from "monaco-jsx-syntax-highlight";

interface CodeEditorProps {
  cell: Cell;
}


const CodeEditor: FC<CodeEditorProps> = ({cell}) => {
  const editorRef = useRef<IStandaloneCodeEditor>();
  const dispatch = useAppDispatch();
  const code = useAppSelector(state => state.cells.data[cell.id].content);
  const cumulativeCode = useCumulativeCode(cell.id);

  const handleEditorDidMount = useCallback((editor: any, monaco: any) => {
    editorRef.current = editor;
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      jsx: monaco.languages.typescript.JsxEmit.Preserve,
      target: monaco.languages.typescript.ScriptTarget.ES2020,
      esModuleInterop: true
    });

    const monacoJsxSyntaxHighlight = new MonacoJsxSyntaxHighlight(getWorker(), monaco);
    // editor is the result of monaco.editor.create
    const {highlighter, dispose} = monacoJsxSyntaxHighlight.highlighterBuilder({editor: editor});
    // init highlight
    highlighter();
    // content change highlight
    editor.onDidChangeModelContent(() => { highlighter(); });
    return dispose;
  }, []);

  const onFormatHandler = () => {
    if (!editorRef.current) {
      return;
    }
    editorRef.current.getAction('editor.action.formatDocument').run();
  };

  const onCodeRunHandler = async () => {
    dispatch(createBundle({
      cellId: cell.id,
      input: cumulativeCode
    }));
  };


  return (
    <div className={'group/editor fade h-full w-[calc(100%-3px)]'}>
      <div className={'absolute z-10 right-2 bottom-2 flex gap-1'}>
        <button onClick={onCodeRunHandler} className={`btn-group-fade`}>
          RUN
        </button>
        <button onClick={onFormatHandler} className={`btn-group-fade`}>
          FORMAT
        </button>
      </div>
      <MonacoEditor
        className={'editor'}
        onChange={(value) => {
          dispatch(updateCell({id: cell.id, content: value ?? ''}));
        }}
        onMount={handleEditorDidMount}
        value={cell.content}
        height={'100%'}
        language={'typescript'}
        theme={'vs-dark'}
        path={`file:///${cell.id}.jsx`}
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
          padding: {top: 15, bottom: 5,}
        }}
      />
    </div>
  );
};

export default CodeEditor;