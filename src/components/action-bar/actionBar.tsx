import React, {FC} from 'react';
import {useAppDispatch} from "../../store/hooks";
import {moveCell, deleteCell, Direction} from "../../store/cellSlice";


interface ActionBarProps {
  id: string;
}

const ActionBar: FC<ActionBarProps> = ({id}) => {
  const dispatch = useAppDispatch();
  const moveCellHandler = (direction: Direction) => {
    dispatch(moveCell({id, direction}));
  };

  const deleteCellHandler = () => {
    dispatch(deleteCell({id}));
  };

  return <div className={'flex flex-row gap-4 bg-neutral-500 text-amber-50'}>
    <button
      onClick={() => moveCellHandler('down')}>
      DOWN
    </button>
    <button
      onClick={() => moveCellHandler('up')}>
      UP
    </button>
    <button
      onClick={() => deleteCellHandler()}>
      DELETE
    </button>
  </div>;
};

export default ActionBar;