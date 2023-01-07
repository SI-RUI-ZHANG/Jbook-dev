import './app.css';
import React, {FC} from 'react';
import {Provider} from "react-redux";
import {store} from "./store";
import CellList from "./components/cell-list/cell-list";

const App: FC = () => {
  return (
    <Provider store={store}>
      <div className={'pt-6 px-[3%] flex flex-col gap-10'}>
        <CellList />
      </div>
    </Provider>
  );
};

export default App;
