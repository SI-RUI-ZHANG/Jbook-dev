import {useAppSelector} from "../store/hooks";


export const useCumulativeCode = (cellId: string): string => {
  return useAppSelector(state => {
    const {data, order} = state.cells;
    const orderedCells = order.map(id => data[id]);
    const showFunc = `
import _React from 'react';
import _ReactDOM from 'react-dom/client';
const rootDiv = document.getElementById('root');
var show = (value) => {
  const isReactElement = _React.isValidElement(value);
  if (!rootDiv) return
  if (typeof value === 'object') {
    if (isReactElement) {
      _ReactDOM.createRoot(rootDiv).render(value);
      return
    }
    return rootDiv.innerHTML = JSON.stringify(value);
  }
  if (typeof value === 'string') {
    return rootDiv.innerHTML = value;
  }
  if (typeof value === 'number') {
    return rootDiv.innerHTML = value.toString();
  }
}`
    const showFuncNoop = 'var show = () => {}';
    const cumulativeCode = [];
    for (let c of orderedCells) {
      if (c.type === 'code') {
        if (c.id === cellId) {
          cumulativeCode.push(showFunc);
        } else {
          cumulativeCode.push(showFuncNoop);
        }
        cumulativeCode.push(c.content);
      }
      if (c.id === cellId) {
        break;
      }
    }
    return cumulativeCode;
  }).join('\n');
}