import React, {FC, useState, useEffect, useRef} from 'react';
import MDEditor from "@uiw/react-md-editor";
import './text-editor.css';

const TextEditor: FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState<string | undefined>('# Header');
  const [editing, setEditing] = useState(false);


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
    }
  }, [])

  if (editing) {
    return (
      <div id={'text-editor'} ref={ref} className={'shadow-md shadow-gray-800 text-editor'}>
        <MDEditor
          height={200}
          value={value}
          onChange={setValue}
        />
      </div>
    )
  }

  return (
    <div
      onClick={() => {setEditing(true)}}
      className={'shadow-md shadow-gray-800 text-editor'}
    >
      <MDEditor.Markdown source={value}/>
    </div>
  );
};

export default TextEditor;