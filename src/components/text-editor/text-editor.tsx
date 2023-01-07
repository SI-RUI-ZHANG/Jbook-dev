import React, {FC, useState, useEffect, useRef} from 'react';
import MDEditor from "@uiw/react-md-editor";
import './text-editor.css';
import {Cell} from "../../store/cellSlice";
import {useAppDispatch} from "../../store/hooks";
import {updateCell} from "../../store/cellSlice";

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: FC<TextEditorProps> = ({cell}) => {
  const {id, content} = cell;
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);
  const dispatch = useAppDispatch();


  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (ref.current && event.target && ref.current.contains(event.target as Node)) {
        return;
      }
      setEditing(false);
    };
    // TODO: why capture must be true?
    document.addEventListener('click', listener, {capture: true});

    return () => {
      document.removeEventListener('click', listener, {capture: true});
    };
  }, []);

  if (editing) {
    return (
      <div id={'text-editor'} ref={ref} className={'text-editor'}>
        <MDEditor
          value={content}
          onChange={(value) => {dispatch(updateCell({id, content: value ?? ''}));}}
        />
      </div>
    );
  }

  return (
    <div
      onClick={() => {setEditing(true);}}
      className={'text-editor'}
    >
      <MDEditor.Markdown source={content || '## Click to edit'}/>
    </div>
  );
};

export default TextEditor;