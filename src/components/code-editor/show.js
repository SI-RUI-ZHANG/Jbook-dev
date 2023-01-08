import _React from 'react';
import _ReactDOM from 'react-dom/client';
const rootDiv = document.getElementById('root');


const show = (value) => {
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
}
