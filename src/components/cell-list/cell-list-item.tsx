import React, {FC} from 'react';
import {Cell} from "../../store/cellSlice";
import CodeCell from "../code-cell/code-cell";
import TextEditor from "../text-editor/text-editor";
import ActionBar from "../action-bar/action-bar";

interface CellListItemProps {
  cell: Cell;
}

const CellListItem: FC<CellListItemProps> = ({cell}) => {
  const {id, type} = cell;
  let child: JSX.Element;
  if (type === 'code') {
    child = <CodeCell cell={cell}/>;
  } else {
    child = <TextEditor cell={cell}/>;
  }

  return (
    <div className={'relative group/action-bar'}>
      <ActionBar id={id}/>
      <div className={'group/editor shadow-md shadow-gray-800 '}>
        {child}
      </div>
    </div>
  );
};

export default CellListItem;