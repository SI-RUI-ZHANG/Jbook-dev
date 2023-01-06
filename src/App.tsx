import './app.css';
import React, {FC} from 'react';
import CodeCell from "./components/code-cell/code-cell";

const App: FC = () => {
  return (
    <div>
      <CodeCell/>
    </div>
  );
};

export default App;
