import React, {FC} from 'react';
import {useAppSelector} from "../../store/hooks"
import CellListItem from "./cell-list-item";

const CellList: FC = () => {
  const cells = useAppSelector(({cells: {order, data}}) => order.map(id => data[id]));

  const renderedCells = cells.map(cell => <CellListItem key={cell.id} cell={cell} />);

  return (<div className={'flex flex-col gap-8'}>
    {renderedCells}
  </div>)
};

export default CellList;