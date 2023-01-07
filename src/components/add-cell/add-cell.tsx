import React, {FC} from 'react';
import {useAppDispatch} from "../../store/hooks";
import {insertCellAfter} from "../../store/cellSlice";
import {CellTypes} from "../../store/cellSlice";

interface AddCellProps {
  nextCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: FC<AddCellProps> = ({nextCellId, forceVisible}) => {
  const dispatch = useAppDispatch();

  const insertCell = (type: CellTypes) => {
    dispatch(insertCellAfter({id: nextCellId, type}));
  }

  const forceVisibleClass = forceVisible ? '!opacity-100' : '';

  return (
    <div className={`add-cell-group ${forceVisibleClass}`}>
      <button className={'add-cell-btn'}
        onClick={() => insertCell('code')}>CODE
      </button>
      <button className={'add-cell-btn'}
        onClick={() => insertCell('text')}>TEXT
      </button>
      <hr className={'absolute w-full z-0 place-self-center group-hover:!opacity-100 transition duration-100'}/>
    </div>
  );
};

export default AddCell;