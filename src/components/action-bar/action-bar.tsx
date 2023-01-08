import React, {FC} from 'react';
import {useAppDispatch} from "../../store/hooks";
import {moveCell, deleteCell, Direction} from "../../store/cellSlice";
import arrowUp from '../../assets/arrow-up.png';
import arrowDown from '../../assets/arrow-down.png';
import trash from '../../assets/cancel.png';

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

  return (
    <div className={`opacity-0 absolute rounded px-2 py-[2px] z-40 left-0 -top-4 shadow-md shadow-black
        flex flex-row gap-4
        bg-neutral-800 text-amber-50 text-sm
        group-hover/action-bar:opacity-100 transition duration-200
    `}>
      <img
        src={arrowUp}
        alt={'arrow-up'}
        className={'action-bar-btn'}
        onClick={() => moveCellHandler('up')}
      />
      <img
        src={arrowDown}
        alt={'arrow-down'}
        className={'action-bar-btn'}
        onClick={() => moveCellHandler('down')}
      />
      <img
        src={trash}
        alt={'trash'}
        className={'action-bar-btn'}
        onClick={deleteCellHandler}
      />
    </div>);
};

export default ActionBar;