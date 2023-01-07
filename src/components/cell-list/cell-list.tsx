import React, {FC} from 'react';
import {useAppSelector} from "../../store/hooks";
import CellListItem from "./cell-list-item";
import AddCell from "../add-cell/add-cell";

const CellList: FC = () => {
  const cells = useAppSelector(({cells: {order, data}}) => order.map(id => data[id]));

  const renderedCells = cells.map(cell =>
    <React.Fragment key={cell.id}>
      <CellListItem key={cell.id} cell={cell}/>
      <AddCell nextCellId={cell.id}/>
    </React.Fragment>
  );

  return (
    <div className={`flex flex-col gap-2 `}>
      <AddCell forceVisible={cells.length === 0} nextCellId={null}/>
      {renderedCells}
    </div>
  );
};

export default CellList;