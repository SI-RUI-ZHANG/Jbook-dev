import React, {FC, useEffect, useRef, useState} from 'react';
import './preview.css'

interface PreviewProps {
  code: string;
  bundleErr: string | null;
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

const Preview: FC<PreviewProps> = ({code, bundleErr}) => {
  const iframe = useRef<any>();
  const [hide, setHide] = useState<boolean>(true);

  useEffect(() => {
    setHide(true);
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, '*');
    }, 30)

    setTimeout(() => {
      setHide(false);
    },50)
  }, [code]);

  return (
    <div className={'relative iframe-wrapper grow h-full bg-neutral-800'}>
      <iframe
        style={{display: hide ? 'none' : 'block'}}
        className={`h-full w-full bg-neutral-800 relative`}
        ref={iframe}
        sandbox={"allow-scripts"}
        srcDoc={html}
      />
      {bundleErr && <div className={'preview-error'}>{bundleErr}</div>}
    </div>
  );
};

export default Preview;