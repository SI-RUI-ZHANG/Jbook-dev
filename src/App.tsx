import './app.css';
import React, {FC} from 'react';
import CodeCell from "./components/code-cell/code-cell";
import TextEditor from "./components/text-editor/text-editor";
import {Provider} from "react-redux";
import {store} from "./store";

const App: FC = () => {
  return (
    <Provider store={store}>
      <div className={'pt-6 px-[3%] flex flex-col gap-10'}>
        <CodeCell/>
        <TextEditor/>
      </div>
    </Provider>
  );
};

export default App;
