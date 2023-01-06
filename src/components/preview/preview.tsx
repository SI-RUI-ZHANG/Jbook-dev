import React, {FC, useEffect, useRef} from 'react';
import './preview.css'

interface PreviewProps {
  code: string;
}

const html = `
<html lang="en" >
<head> <title>frame</title> </head>
<body>
<div id="root">Hi there</div>
<script>
<!-- receive message event posted my parent frame --> 
 window.addEventListener('message', (event) => {
   try {
     eval(event.data);
   } catch (e) {
     const root = document.querySelector('#root');
     root.innerHTML = '<div style="color:red;"><h4>Runtime Error</h4>' + e + '</div>'
     // log error so that user can see detailed information in the console
     console.error(e);
   }
 }, false);
</script>
</body>
</html>
`;

const Preview: FC<PreviewProps> = ({code}) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    iframe.current.contentWindow.postMessage(code, '*');
  }, [code]);

  return (
    <div className={'iframe-wrapper grow h-full'}>
      <iframe
        className={'h-full w-full bg-white'}
        ref={iframe}
        sandbox={"allow-scripts"}
        srcDoc={html}
      />
    </div>
  );
};

export default Preview;