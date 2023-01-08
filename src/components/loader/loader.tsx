import React, {FC} from 'react';
import './loader.css';

const Loader: FC = () => {
  return (
      <div className={'loader w-[90%]'}>
        <div className={'loaderBar'}></div>
    </div>
  );
};

export default Loader;