import React, {FC} from 'react';
import {Cell} from "../../store/cellSlice";
import CodeCell from "../code-cell/code-cell";
import TextEditor from "../text-editor/text-editor";
import ActionBar from "../action-bar/actionBar";

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
    <div className={'group/editor shadow-md shadow-gray-800 '}>
      <ActionBar id={id}/>
      {child}
    </div>
  );
};

export default CellListItem;