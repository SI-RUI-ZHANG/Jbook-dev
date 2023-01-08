import React, {FC, useEffect, useRef, useState} from 'react';
import {Cell} from "../../store/cellSlice";
import {useAppSelector} from "../../store/hooks";
import './preview.css';
import loader from "../loader/loader";
import Loader from "../loader/loader";

interface PreviewProps {
  cell: Cell;
}

const html = `
<html lang="en" style="color: white">
<head> <title>frame</title> </head>
<body>
<div id="root"></div>
<script>
<!-- receive message event posted my parent frame --> 
const handleError = (err) => {
  const root = document.querySelector('#root');
  root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
  console.error(err);
};

window.addEventListener('error', (event) => {
  event.preventDefault();
  handleError(event.error);
})

window.addEventListener('message', (event) => {
   try {
      eval(event.data);
   } catch (e) {
      handleError(e);
   }
 }, false);
</script>
</body>
</html>
`;

const Preview: FC<PreviewProps> = ({cell}) => {
  const iframe = useRef<any>();
  const [showLoading, setShowLoading] = useState<boolean>(true);
  const bundle = useAppSelector(state => state.bundles[cell.id]);

  useEffect(() => {
    setShowLoading(true);
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(bundle?.result, '*');
    }, 30);

    setTimeout(() => {
      setShowLoading(false);
    }, 50);
  }, [bundle]);

  return (
    <div className={'relative iframe-wrapper grow h-full bg-neutral-800 z-20'}>
      <iframe
        className={`h-full w-full bg-neutral-800 relative`}
        ref={iframe}
        sandbox={"allow-scripts"}
        srcDoc={html}
      />
      {(showLoading || (bundle && bundle.loading)) &&
      <div className={'bg-neutral-800 absolute top-0 bottom-0 left-0 right-0'}>
        <div className={'relative w-full h-full flex items-center'}>
          <Loader/>
        </div>
      </div>
      }
      {bundle?.err && <div className={'preview-error'}>{bundle?.result}</div>}
    </div>
  );
};

export default Preview;