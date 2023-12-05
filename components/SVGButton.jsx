import { useEffect,useState } from "react"
import styles from "../app/styles/mainContainer.module.scss";
import MixpanelTracking from "../service/mixpanel";


export default function SVGButton() {
    const [timer, setTimer] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [clickCount, setClickCount] = useState(0);
  
    const handleButtonClick = () => {
      setClickCount((prevCount) => prevCount + 1);
      if (clickCount === 1 && timer <= 4) {
        MixpanelTracking.getInstance().impatientClickery();
        console.log("MixpanelTracking for impatientClickery");
        setClickCount(0);
      } else {
        MixpanelTracking.getInstance().buttonPushed();
        setTimer(0); // Reset the timer for subsequent clicks
        setIsRunning(true);
      }
    };
  
    useEffect(() => {
      let interval;
  
      if (isRunning) {
        interval = setInterval(() => {
          setTimer((prevTimer) => prevTimer + 1);
        }, 1000);
      } else {
        clearInterval(interval);
      }
  
      if (timer >= 7) {
        // If timer exceeds 7 seconds, reset the timer and click count
        setTimer(0);
        setClickCount(0);
        setIsRunning(false);
      }
  
      return () => clearInterval(interval);
    }, [isRunning, timer]);

    return (<>
        <svg className={styles.svgButton} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve"
            viewBox="0 0 127 158.7" width="100%">
            <defs>
                <linearGradient id="a">
                    <stop offset={0} style={{ stopColor: "#4343e1", stopOpacity: 1, }} />
                    <stop offset={1} style={{ stopColor: "#161674", stopOpacity: 1, }} />
                </linearGradient>
                <linearGradient xlinkHref="#a" id="b" x1={36.15} x2={36.15} y1={121.5} y2={135.4}
                    gradientTransform="translate(49.99 209.6)" gradientUnits="userSpaceOnUse" />
            </defs>
            <g transform="translate(-49.99 -209.6)">
                <path d="M165.6 237.3v20.9H65.95v-20.9z" style={{
                    fill: "none", fillRule: "evenodd", stroke: "#544fb2",
                    strokeWidth: 1.4422, strokeDasharray: "none", strokeOpacity: 1,
                }} />
                <ellipse cx={36.15} cy={124.5} rx={17.83} ry={12.16} style={{
                    fill: "#2626dd", fillOpacity: 1, fillRule: "evenodd"
                    , strokeWidth: 0.2646,
                }} />
                <circle cx={127.2} cy={103.2} r={27.86} style={{ fill: "red", fillRule: "evenodd", strokeWidth: 0.2646, }} />
                <path
                    d="M52.67 123.8a16.57 11.59 0 0 1-16.51 11.6 16.57 11.59 0 0 1-16.57-11.6 16.57 11.59 0 0 1 16.57-11.6 16.57 11.59 0 0 1 16.51 11.6z"
                    style={{ fill: "none", fillRule: "evenodd", stroke: "#000", strokeWidth: 0.169348, }} />
                <path
                    d="M105 19.99a21.65 21.65 0 0 0-21.65 21.65A21.65 21.65 0 0 0 105 63.29a21.65 21.65 0 0 0 21.6-21.65A21.65 21.65 0 0 0 105 19.99zm0 5.15a16.55 14.71 0 0 1 16.5 14.72A16.55 14.71 0 0 1 105 54.57a16.55 14.71 0 0 1-16.59-14.71A16.55 14.71 0 0 1 105 25.14z"
                    style={{
                        fill: "#4343e1", fillOpacity: 1, fillRule: "evenodd", stroke: "#1e1ec1", strokeWidth: 0.2646,
                        strokeOpacity: 1,
                    }} transform="matrix(1.001 0 0 .7881 -68.95 92.39)" />
                <path d="M20.89 121.5h30.53v15.75H20.89z" style={{
                    fill: "url(#b)", fillOpacity: 1, fillRule: "evenodd",
                    stroke: "none", strokeWidth: 0.210321, strokeOpacity: 1,
                }} />
                <path
                    d="M51.36 121.4a15.26 12.02 0 0 1-15.2 12.1 15.26 12.02 0 0 1-15.26-12.1 15.26 12.02 0 0 1 15.26-12 15.26 12.02 0 0 1 15.2 12z"
                    style={{ fill: "#5252e4", fillOpacity: 1, fillRule: "evenodd", stroke: "none", strokeWidth: 0.165477, }} />
                <path
                    d="M46.97 120.9a10.86 8.558 0 0 1-10.82 8.6 10.86 8.558 0 0 1-10.86-8.6 10.86 8.558 0 0 1 10.86-8.6 10.86 8.558 0 0 1 10.82 8.6z"
                    style={{ fill: "#4343e1", fillOpacity: 1, fillRule: "evenodd", stroke: "none", strokeWidth: 0.117817, }} />
                <path
                    d="M51.09 129c-1.83 2.9-4.96 4.6-8.09 5.7-3.45 1-7.13 1.3-10.67.6-3.52-.6-7.08-1.9-9.66-4.4-.63-.7-1.17-1.4-1.72-2.1-.88 1.9-1.8 3.8-2.67 5.6 2.83 2.8 6.03 5.4 9.89 6.5 3.09.8 6.34 1.2 9.55 1.1 3.06-.2 6.15-1 8.99-2.2 2.55-1.2 4.81-2.9 6.72-4.9.45-.4.89-.7.36-1.3-.81-1.6-1.63-3.3-2.45-4.9-.1.1-.17.2-.25.3z"
                    style={{
                        fill: "#4343e1", fillOpacity: 1, stroke: "none", strokeWidth: ".2646px", strokeLinecap: "butt",
                        strokeLinejoin: "miter", strokeOpacity: 1,
                    }} />
                <path
                    d="M36.29 108.6c-3.36.1-6.76.5-9.89 1.9-4.37 1.6-8.4 5-10.06 9.6-1.2 3.1-1.17 6.6.19 9.6 1.8 4.3 5.6 7.6 9.86 9.3 6.5 2.8 14.27 2.5 20.58-.8 4.29-2 8.3-5.8 9.27-10.8.8-3.7-.14-7.7-2.38-10.7-3.64-5-9.75-7.8-15.81-8.1h-1.76zm-.21.6c5.67.1 11.57 2.1 15.48 6.5 3.11 3.4 4.08 8.8 1.63 12.9-2.31 4.1-6.67 6.6-11.06 7.7-7.18 1.8-15.42.4-21-4.7-3.03-2.9-4.64-7.6-3.17-11.7 1.5-4.3 5.37-7.5 9.55-8.9 2.73-1.2 5.65-1.7 8.57-1.8z"
                    style={{
                        fill: "#fff", fillOpacity: 0.0792, fillRule: "evenodd", stroke: "none", strokeWidth: 0.243762,
                        strokeOpacity: 1,
                    }} />
                <path
                    d="M49.15 121.4a13.05 10.28 0 0 1-12.99 10.4 13.05 10.28 0 0 1-13.05-10.4 13.05 10.28 0 0 1 13.05-10.3 13.05 10.28 0 0 1 12.99 10.3z"
                    style={{
                        opacity: 0.0414, fill: "none", fillOpacity: 1, fillRule: "evenodd", stroke: "#fff", strokeWidth:
                            1.2967, strokeDasharray: "none", strokeOpacity: 1,
                    }} />
                <path onClick={handleButtonClick}
                    d="m114.8 304.7-12.5.8-10.71 3.1-5.85 2.3-1.27 3.3-.1 7.9-7.09 1.2-8.1 4.1-3.58 3.2-.46 4.9 3.42 5.2 6.71 2.8 10.61 3.8 10.64 2.7 11.98.7 12.2-1.5 13.2-1.2 12-2.1 10-4.4 5.4-4.9 1.7-6.3-3.3-4.8-5.6-3.4-6.7-2.1h-2.2l-1.1-7.1-4.4-5.3-7.9-2.7-10.1-1.3z"
                    style={{
                        mixBlendMode: "normal", fill: "#8984d7", fillOpacity: 1, stroke: "#000", strokeWidth: ".2646px",
                        strokeLinecap: "butt", strokeLinejoin: "miter", strokeOpacity: 1,
                    }} />
                <path
                    d="m104.1 324.3-.5 13.8-7.99 2.4-1.67 5.2 1.67 3.2-13.39-3.5-8.91-2.9-7.28-4.4-.92-6.6 5.47-4.5 10.61-3.9 2.43.4 1.3-9.9 3.73 4.7 8.04 4.2z"
                    style={{
                        opacity: 1, mixBlendMode: "normal", fill: "#544dc3", fillOpacity: 1, stroke: "none",
                        strokeWidth: ".2646px", strokeLinecap: "butt", strokeLinejoin: "miter", strokeOpacity: 1,
                    }} />
                <path
                    d="M49.4 164.4c-.26 0-.54.1-.77 0-.25 0 .52.1.77 0 4.36-1.6-2.69.2 2.82-1.1 3.5-.8 7.14-1.2 10.74-1.3 6.25 0 13.05.8 18.44 4.3.84.6 2.22 1.6 1.56 2.7-1.06 1.9-6.05 1.9-7.76 2.1-4.86.6-9.78 1.1-14.64.7-2.06-.1-4.12-.4-6.16-.9-.92-.2-8.28-2.7-6.79-4.7.74-1 4.51-1.6 5.5-1.7 5.89-1.1 12.1-1.9 18.12-1.1-.26-.3-.5-.5-.78-.8-1.32-1.2-7.89-.4-9.45-.2-.68.2-3.53.5-4.19.7-1.49.3-5.13.8-6.16 2.1-1.31 1.6 1.69 4.2 2.86 4.9 4.32 2.6 12.06 2.2 16.85 1.3 2.06-.4 4.68-1 6.06-2.8 1.31-1.7 0-3.8-1.58-4.7-.89-.5-2.48-1-3.41-1.2-7.05-1.3-15.63.2-21.7 3.9"
                    style={{
                        fill: "none", stroke: "#000", strokeWidth: ".2646px", strokeLinecap: "butt", strokeLinejoin: "miter"
                        , strokeOpacity: 1,
                    }} transform="translate(-23.68 -46.61) scale(2.156)" />
                <path
                    d="M74.66 163.1c2.14.8 3.85 2.3 3.74 4.7 0 .4-.12 1.1-.48 1.3-.55.4-1.95.9-2.67 1.1-.28 0 .48-.4.7-.7.53-.5 1.5-1.5 1.56-2.4 0-.8-.41-1.5-.9-2-.12-.2-.5-.6-.37-.5 1.24 1 1.14 4.1-.12 5-.51.4-1.35.5-1.94.6M53.53 162.8c-2.1.9-3.83 3-2.99 5.4.54 1.5 4.94 1.6 4.45 2.3-.79 1-3.76.1-4.22-1-.48-1-.24-2.4.14-3.5.13-.5.18-.7.54-.9.1 0 .15-.2.12-.1 0 .1-.41.4-.49.6-.43 1-.34 1.7.67 2.3 0 0 1.48.6 1.35.7-1.3 0-2.02-1.2-1.71-2.4.1-.4.23-.9.46-1.3.1-.4.85-.1.85-.1-.44 1.1-2.39 2.1-.76 3.2"
                    style={{
                        fill: "none", stroke: "#000", strokeWidth: ".2646px", strokeLinecap: "butt", strokeLinejoin: "miter"
                        , strokeOpacity: 1,
                    }} transform="translate(-23.68 -46.61) scale(2.156)" />
                <path
                    d="M49.91 166.6c-.29 2.9-.55 5.9-.86 8.8 0 .3-.1.7-.1 1.1 0 0-.1.2 0 .1.33-2.1.26-4.4.52-6.5.15-1.2.31-2.4.47-3.5.23-.9.48-1.4.38-1.4-.17-.1-.72 5.2-1.47 8.3-.39 1.8 1.25-5.2 1.3-5.4.1-.3-.16.6-.24.9-.15.6-.44 2.5-.57 3.1-.16 1-.33 1.7-.21 1.4.36-.8.4-2.1.5-2.9.13-1 .31-2.1.47-3.2v-.1c-.31 1.1-.14 2.3-.16 3.5-.1.6-.31 2.1 0 1.6.54-.8.21-2.6.16-3.5M78.91 170.3c-.23-.8-.49-1.6-.71-2.3-.13 0-.41 0-.36.1.22.8.82 1.4 1.07 2.2.15.5.1 1 .15 1.4l.1.1c-.1-.5-.1-1-.2-1.5-.28-1.2-.66-2.3-.97-3.4-.1-.2-.15-.6-.12-.5 0 1.5.68 3.2 1.08 4.5.18.8.44 1.5.64 2.3.1.1.1.4 0 .3-1-1.8-.99-4.3-1.45-6.2-.1-.3-.35-1.2-.28-1 .89 5.4.13.4.84 5.1.15 1.2.14 2.7.5 3.9 0 .1.1-.3 0-.5 0-.4-.16-.8-.23-1.3-.38-2-.32-4.4-.83-6.5-.1-.1-.33-.6-.36-.4-.25 1.4.23 2.9.4 4.3.11.6.21 1.4.33 2 1.19 6.8-.42-5.2-.9-5.2-.19-.1-.2.4-.16.6 0 .5.25 2.4.43 3.2.25 1.1.74 1.6.43.3"
                    style={{
                        fill: "none", stroke: "#000", strokeWidth: ".2646px", strokeLinecap: "butt", strokeLinejoin: "miter"
                        , strokeOpacity: 1,
                    }} transform="translate(-23.68 -46.61) scale(2.156)" />
                <path
                    d="M45.42 174.9c2.03 1.1 3.82 2.3 6.13 2.8 1.05.2 2.1.3 3.17.3 1.56.3 3.12.5 4.68.7 1.43.2 2.87.6 4.34.6 3.69.1 7.24-.6 10.88-1.3 2.1-.4 4.53-1.3 5.97-3 .33-.4 1.18-1.8.82-1.8"
                    style={{
                        fill: "none", stroke: "#000", strokeWidth: ".2646px", strokeLinecap: "butt", strokeLinejoin: "miter"
                        , strokeOpacity: 1,
                    }} transform="translate(-23.68 -46.61) scale(2.156)" />
                <path
                    d="M78.53 167.8c-.39 2.2-1.37 4.2-1.6 6.4 0 .1 0-.1.1-.1.53-2.5-.42 1.5.31-1.6.31-1.2.51-2.5.82-3.5.11-.4.51-1.5.41-1.2-.49 2.3-1.55 5.1-1.62 7.4 0 .4.16-1 .25-1.5.11-1.4.26-2.8.68-4.3.1-.4.1-1.2.28-1 .26.2-.93 5-.88 5.8 0 .4.16-.6.21-1.6.16-1.5.18-3.4 1.03-4.8zM49.32 168c.38 2.1.7 4.2 1.08 6.4.1.4.25.9.41 1.5.1.1.38.7.31.6-.51-2.2-1.28-4.4-1.78-6.6-.1-.4-.1-.8-.18-1.1l-.1-.1c-.26.9.4 3 .56 3.8.18.8.33 1.7.48 2.6 0 0 .1.2.1.1-.25-2-1.5-5.4-.85-7.2.13-.5 0 .9.1 1.4.23 1.6.76 5.7 1.7 7.1.1.1-.11-.4-.15-.6-.77-1.9-.72-1.5-1.3-4.5-.1-.4 0-.9-.1-1.4v-.2c.35 2.4.79 5.1 2.06 7.2.1.1-.14-.2-.19-.4-.19-.4-.43-.9-.6-1.4-.33-1-.86-3.3-.99-4-.1-.5-.1-1.1-.16-1.7 0-.1.1-.2 0-.4-.1 0-.1.3 0 .4.23 1.5.38 3.5 1.22 5 .15.3-.12-.5-.2-.9-.58-1.8-1.01-3.7-1.29-5.6 0-.4-.25-1.8-.18-1.4.28 2.2.71 4.3 1.29 6.5.16.6.38 1.2.59 1.9.12.3.5.5.4.9 0 .1 0-.1-.1-.1-.16-.5-.34-.9-.49-1.4-.18-.6-.33-1.2-.48-1.9-.79-3 0-.1-.59-3v.4c.1.6.17 1.3.28 1.9.24 1.8.42 3.6 1.29 5 .15.3-.18-.5-.31-.8-.2-.5-.43-1.1-.63-1.7-.77-2.2-1.1-3.1-1.37-5.4-.15-1.1.13-2.7-.18-3.8"
                    style={{
                        fill: "none", stroke: "#000", strokeWidth: ".2646px", strokeLinecap: "butt", strokeLinejoin: "miter"
                        , strokeOpacity: 1,
                    }} transform="translate(-23.68 -46.61) scale(2.156)" />
                <path
                    d="M49.54 170.3c-.43-2.2-.91-2.8 1.19-4.4.97-.7 1.61-1.1 2.71-1.7.77-.4 2.15-.7 2.79-1.4.12-.1-.28 0-.41.1-.76.3-1.33.7-2.07 1.1-1.06.7-2.13 1.5-3.28 2-.71.4.56-.8.72-.9 2.94-1.7 6.17-2.6 9.55-3 .4 0 .87-.2 1.27-.1.23 0-.4.3-.61.3-.74.4-.84.3-1.43.5"
                    style={{
                        fill: "none", stroke: "#000", strokeWidth: ".2646px", strokeLinecap: "butt", strokeLinejoin: "miter"
                        , strokeOpacity: 1,
                    }} transform="translate(-23.68 -46.61) scale(2.156)" />
                <path d="M57.44 163.3c6.75-2.4-6.32 1.9-5.14.8.82-.7 2.99-1.1 3.81-1.3 5.04-1.3 8.54-.6 13.53-.5" style={{
                    fill: "none", stroke: "#000", strokeWidth: ".2646px", strokeLinecap: "butt", strokeLinejoin: "miter",
                    strokeOpacity: 1,
                }} transform="translate(-23.68 -46.61) scale(2.156)" />
                <path
                    d="M56.81 163.7c-.79.2-1.59.5-2.41.7-.32.1.64-.2.95-.3.77-.3 1.54-.6 2.31-.8 2.96-1.1 6-2.3 9.15-2.7 2.75-.5 2.86-.5.53.3"
                    style={{
                        fill: "none", stroke: "#000", strokeWidth: ".2646px", strokeLinecap: "butt", strokeLinejoin: "miter"
                        , strokeOpacity: 1,
                    }} transform="translate(-23.68 -46.61) scale(2.156)" />
                <path
                    d="M61.48 162.2c-5.65 1.2 3.73.4 6.67.7M49.99 173.5c-.38 0-3.06 1.8-3.09 2.5l1.07-.7s1.03-.5.92-.8c-.25-.3-2.87 1.1-1.28.4.21-.1.42-.2.61-.3.65-.3 2.47-1.4 1.77-1.1-.59.1-1.07.6-1.63 1-.26.1-.54.4-.82.5-1.16.7 1.43-.4 1.1-.6-.26-.3-1.95.5-.72 1.5 1.66 1.5 6.59 2.4 8.74 2.6 4.4.4 8.57.7 12.95 0 .79-.2 1.54-.5 2.3-.7 1.07-.3 2.18-.5 3.2-.9 1.18-.5 6.86-2.1 6.51-3.7-.18-.8-1.9-1.1-2.49-1.1-.2 0-.86.2-.66.1.23-.2.82-.1 1.07-.1 1.9 0 .53 2.9-.2 3-.21 0 .1-.4.15-.6.13-.5.51-1.1.26-1.7-.29-.5-1.23-.4-1.69-.4-.16 0-.54 0-.41.1.38.1 1.1.3 1.46 0 .12 0-.24 0-.36.1-.18-.1-1.64.1-1.74 0-.1-.2.43 0 .67 0 .58-.1 2.27-.2 2.01.7-.59 2.2-2.53 3.2-4.71 3.6-2.74.5-5.65 1.4-8.52 1.5-2.84.1-5.68-.2-8.52-.2-3.47-.1-6.95-.1-10.2-1.6-.64-.3-1.84-.7-1.87-1.5 0-1.2 2.87-1.8 2.92-1.9.1-.3-.46.1-.66.2-.31.2-1.82.8-1.9 1.1-.1.3.52 0 .77-.2.48-.2 1.46-.4 1.82-.7.17-.2-.52.1-.74.3-.46.3-1.71.7-1.41 1.4.89 2.2 7.3 3 9.23 3.3 5.08.7 10.22.5 15.29-.5.85-.1 1.77-.2 2.61-.4.72-.3 1.41-.8 2.13-1.1 1.54-.7 3.3-1.1 3.82-3.1"
                    style={{
                        fill: "none", stroke: "#000", strokeWidth: ".2646px", strokeLinecap: "butt", strokeLinejoin: "miter"
                        , strokeOpacity: 1,
                    }} transform="translate(-23.68 -46.61) scale(2.156)" />
                <path
                    d="M78.67 182.1c-2.36 1.5-9.4 1.7-12.26 1.6-2.91 0-5.9.2-8.81 0-1.16-.1-2.25-.4-3.38-.5-2.91-.5-5.77-.8-8.55-1.8-2.04-.8-4.9-3.1-3.57-5.6.63-1.2 2.14-2.1 3.2-2.8.26-.2 3.81-2 3.81-1.7 0 0-.45 0-.77.1-.53.2-1.16.4-1.66.6-2.2 1-5.64 3.6-6.22 6.1-.43 1.9 3.44 4.1 4.73 4.7 1.19.4 2.39.8 3.63 1.1 1.53.4 3.12.7 4.68.9 1.06.1 2.17.1 3.23.1 1.11-.1 2.22-.1 3.31-.2 2.8-.1 5.55-.5 8.33-.8 1.33-.1 2.65-.1 3.97-.2 2.62-.3 7.25-1.6 9.47-2.9 3.44-2.1 5.59-3.9 3.05-7.6-.45-.7-.77-1.4-1.38-2-1.03-.9-2.7-.9-3.99-1 1.39 1.4 3.95 1.6 5.21 3 .38.5.5 1 .87 1.5.15.2.37.8.31.6-.48-1.9-2.77-3.1-4.48-3.6-.42-.1-.72-.2-1.02-.5 0 0-.14-.1-.1-.1.27.1 3.16 1.1 3.49 1.3.1 0 1.47.7 1.44.7-.23.3-.59-.2-.88-.4-1.35-.6-2.44-1.2-3.63-2.1-.34-.3-1.6-.6-1.22-.4.57.3 1.21.4 1.8.6.54.2 1 .6 1.52.9.92.5 1.17.5 1.14.6-.3.2-2.05-.8-2.22-.9-.31-.1-.62-.3-.92-.5 0 0-.17-.1-.12-.1.33-.1 2.01.9 2.32 1.1 4.31 2.1 4.86 5.3.82 8.1-.75.5-3.21 2.2-4.1 2.3-.36 0-.72-.3-1.06-.2-.45.2-.69.7-1.1.9-1.03.7-4.11.8-5.42 1-3.43.6-6.66.6-10.11.5-2.83 0-5.86-.1-8.63-.8-1.72-.4-3.37-1.2-5.06-1.7-2.21-.7-7.47-2.9-7.76-5.7-.18-1.7 4.78-4.4 5.96-5 .52-.2.88-.2 1.37-.4.73-.2-.5.2-.58.3-.18.1-1.5.9-1.64 1-.46.4-3.89 3.4-4.32 3.4-.1 0 .1-.1.11-.2.77-.7.63-.6 1.5-1.3 1.16-.9 2.24-1.7 3.5-2.4.44-.3 1.03-.5 1.49-.6.17-.1.7-.2.51-.2-.63 0-1.27.5-1.79.8-1.77.9-3.85 1.8-4.77 3.8-1.18 2.5.61 4.3 2.62 5.4.85.5 1.83.8 2.72 1.2.51.2 1.26.3.95.4-1.21.3-3.6-1.9-4.54-2.5-.45-.3-.95-.4-1.39-.7-.11 0-.19-.2-.32-.2-.34 0 .49.5.78.6.58.4 1.19.7 1.77 1.1 1.46 1 5.21 2 6.97 2.1.88 0 1.73.1 2.6.2.74.1 1.6.2 1.27.4-.88.3-4.08-1-5.11-1.2-1.33-.3-3.3-.2-4.41-1.3-.12-.1.27.2.4.3.66.5.77.6 1.59.9 2.14.7 4.39.6 6.61.7.8 0 1.23.1 1.98.1.21 0 .83.1.62.1-1.51.1-3.07-1-4.56-1.2-.44-.1-.56-.1-.95-.1-.1 0-.2-.1-.19 0 .36 1.3 5.52 2.2 6.75 2.2.66.1 1.32 0 1.98.1.34 0 1.32-.1 1 0-1.15.4-5.3-1.4-6.97-1.4-.5 0 .85.6 1.33.7 1.92.5 3.79.7 5.76.7.48-.1.96-.1 1.44-.1 5.31-.7-5.54-1.4-1.87-.5 2.64.6 5.8.2 8.44-.2.11-.1 4.23-1.4 2.78-1-.1 0-1.38.5-1.32.6.23.4 1.99.1 2.33.1 1.12-.1 4.18-1.1 4.97-1.1.25.1.48.3.71.2.46-.1.79-.5 1.21-.8.64-.3 1.38-.4 2.04-.7.82-.3 1.56-.8 2.33-1.3.77-.4 1.85-1.2 2.26-2.1.14-.2.11-.8.11-1.1 0-2.2-1.43-4.4-3.32-5.6-.88-.6-2.03-.9-3.06-1-.45 0-.9.1-1.34.1h-.28c.83 0 .4.5.87.6 1.3-.3.95-.4 1.77-.2 1.36.3 2.15 1.2 3.33 1.7 1.08.5 1.75 1.3 2 2.4 0 .1.27 1.2.21 1.2-.1 0-2.12-2.7-2.11-2.7.12-.2.43.5.98 1.1.1.1 0-.2-.1-.3-.21-.4-.61-.7-.91-1-.65-.8-1.03-1.1-1.98-1.3-.36-.1-.7-.2-1.03-.4 0 0-.17-.1-.12-.1 1.55.2 4.27 2.4 5.11 3.8.37.6.18 1.8-.1 2.4-.21.4-.64.7-1.06 1-.25.1-.94.2-.73.4.1.1 1.9-1 1.38-1.5"
                    style={{
                        fill: "none", stroke: "#000", strokeWidth: ".2646px", strokeLinecap: "butt", strokeLinejoin: "miter"
                        , strokeOpacity: 1,
                    }} transform="translate(-23.68 -46.61) scale(2.156)" />
                <path
                    d="M65.51 184.2c2.76.6 5.35-.2 8.02-.8 3.07-.7 6.19-.7 8.89-2.6.4-.3.69-.8 1.09-1.1.9-.8 1.85-1.4 2.64-2.3.19-.2-.1-.8.24-.8.1 0-.39.9-.5 1.1-.77.9-1.8 1.8-2.75 2.5-.61.5-1.25 1-1.91 1.4-.74.4-1.66.6-2.46.8-2.25.7-4.05 1.3-6.43 1M41.91 175.6c-.1.3-.31 1-.26 1.5.37 3.7 6.06 4.7 8.81 5.4 0 0 3.54.8 2.99.3"
                    style={{
                        fill: "none", stroke: "#000", strokeWidth: ".2646px", strokeLinecap: "butt", strokeLinejoin: "miter"
                        , strokeOpacity: 1,
                    }} transform="translate(-23.68 -46.61) scale(2.156)" />
                <path d="M42.26 178.3c3.01 2.1 6.74 3.1 10.18 4.2 1.01.4 2.01.4 2.91 1" style={{
                    fill: "none", stroke: "#000",
                    strokeWidth: ".2646px", strokeLinecap: "butt", strokeLinejoin: "miter", strokeOpacity: 1,
                }}
                    transform="translate(-23.68 -46.61) scale(2.156)" />
                <path
                    d="M45.56 180.4c3.71 2.6 8.87 1.8 12.68 3.9M78.35 167.6c-1.27 6.9-.58 3.9-1.4 7.1-.1.3-.16.9-.16.7 0-1.5.18-3 .61-4.4.21-.9.47-1.7.71-2.5.1-.3.26-1.2.24-.9-.19 1.1-.45 2.1-.66 3.3-.11.6-.24 1.2-.37 1.9-.11.5-.22 1.1-.32 1.7-.11.4-.24.9-.35 1.4l-.1.1c.13 0 0-.2 0-.3 0-.2.1-.4.11-.6.34-2.1.63-4.2 1.16-6.2.13-.4.27-1.8.48-1.3.1.2-.56 3.2-.61 3.4-.21 1.1-.42 2.4-.48 3.6M50.01 167.8c.4 1.9.79 3.8 1.16 5.7.1.3.11.7.24 1.1v-.3c0-.2-.29-1-.32-1.1-.31-1.2-.84-2.3-1-3.5-.11-.6.1-1.3-.1-1.9-.11-.4-.11 1 0 1.5.23 1.7.84 3.5 1.24 5.3 0 .3.13.5.21.8 0 .1.11.4.11.3-.1-1.5-.93-3.1-1.3-4.5-.16-.7-.63-2.6-.42-2 .58 1.7.92 3.4 1.35 5.1.34 1.4.24.9.55 2.1.1.1 0 .5.11.4.32-.4-1.91-6.5-1.99-7.3 0-.6.37-1.1.19-1.7-.16-.4-.32 1-.27 1.5.1.8.45 1.6.69 2.5.29 1.1.77 4.6 1.62 5.3"
                    style={{
                        fill: "none", stroke: "#000", strokeWidth: ".2646px", strokeLinecap: "butt", strokeLinejoin: "miter"
                        , strokeOpacity: 1,
                    }} transform="translate(-23.68 -46.61) scale(2.156)" />
                <path
                    d="M78.24 172.3c1.09-1.8-1.11 1.7-.9 1.5.51-.2 1.3-2.7.9-1.5-.16.4-.24.8-.39 1.2-.19.3-.93 1.1-.93 1.6 0 .3.34-.4.53-.6.32-.4.66-.9 1-1.3.77-.8-1.03 1.7-1.08 1.8-.1.1.26-.2.37-.3.32-.3.63-.6.95-.9.19-.2.82-.7.53-.7-.21 0-1.06 1.5-1.19 1.6-.21.3-.79.8-.48.9.19.1 1.54-1.5 1.83-1.8.13-.2.34-.6.45-.4.11.2-1.38 1.8-1.16 1.8.71 0 .97-1.6 1.61-1.4M49.03 174.5c-.37.3-.74.9-1.24 1.2-.37.1 1.27-2.1 1.24-1.2 0 .4-1.16 1.4-.77 1.1.69-.4.74-1.4.77-1.1 0 1-.42 1.9-.42 1.9.13 0 .76-.9.76-1 0-1.1-1.13-1.1.69-.9.19.1-.55.8-.87 1.7 0 .2-.19.6-.1.4.53-.5.87-1.1 1.43-1.6.1-.1-.11.2-.16.3-.16.3-.9 1.3-.64 1.6.24.3 1.25-1.4 1.46-.1.11.7-1.43-.6-1.35-.5.13 0 1.22.7 1.09.8-.4.4-1.41 0-1.41-.6 0-.1.27.3.43.3.13.1.5.1.37.1-.51.4-.96-.6-.51-.3"
                    style={{
                        fill: "none", stroke: "#000", strokeWidth: ".2646px", strokeLinecap: "butt", strokeLinejoin: "miter"
                        , strokeOpacity: 1,
                    }} transform="translate(-23.68 -46.61) scale(2.156)" />
                <path
                    d="M76.97 175.8c-.1.2-.21.7-.1.9.16.4.29-.7.39-1.1.4-1.9.4-4.1.59-6.1.1-.9.1-.8.18-1.7 0 2.1-1.83 5.2-1.5 7.1 0 .3.29.6.44.9zM55.94 170.2c2.75 1.5 6.19.7 9.07 0"
                    style={{
                        fill: "none", stroke: "#000", strokeWidth: ".2646px", strokeLinecap: "butt", strokeLinejoin: "miter"
                        , strokeOpacity: 1,
                    }} transform="translate(-23.68 -46.61) scale(2.156)" />
                <path
                    d="M74.06 166.8c-1.06 1.4-1.06 2-2.49 2.5-1.9.7-4.04.9-6.06 1-.74.1-1.4-.1-1.37-.1.53-.2 3.28-.1 3.92-.1.52-.1 1.11-.2 1.64-.3M63.58 170.7c2.04 0 7.7 1.1 9.16-.6"
                    style={{
                        fill: "none", stroke: "#000", strokeWidth: ".2646px", strokeLinecap: "butt", strokeLinejoin: "miter"
                        , strokeOpacity: 1,
                    }} transform="translate(-23.68 -46.61) scale(2.156)" />
                <path
                    d="M66.04 171.3c-.47 0-.95.1-1.42.1-1.01.1-1.99.1-2.99.1-.3 0-1.09-.3-.82-.3 1.03 0 1.79.4 2.88.3 2.86-.1 5.69-.6 8.41-1.4"
                    style={{
                        fill: "none", stroke: "#000", strokeWidth: ".2646px", strokeLinecap: "butt", strokeLinejoin: "miter"
                        , strokeOpacity: 1,
                    }} transform="translate(-23.68 -46.61) scale(2.156)" />
                <path
                    d="M69.43 170.4c-2.46.5-5.11 1.7-7.57 1.2h.16c1.3-.1.69 0 2.44-.2 2.38-.4 4.76-.9 7.11-1.5.69-.1 2.02-.5 2.76-.7.37-.1 1.37-.8 1-.7-1.56.6-2.83 1.8-4.55 2-.45.1-.9-.2-1.35-.1-.69.1-1.27.6-1.93.7-2.91.6-6.46.4-9.37 0-.82-.1-1.58-.3-2.41-.5-1.16-.3-1.79-.1-2.27-1.4"
                    style={{
                        fill: "none", stroke: "#000", strokeWidth: ".2646px", strokeLinecap: "butt", strokeLinejoin: "miter"
                        , strokeOpacity: 1,
                    }} transform="translate(-23.68 -46.61) scale(2.156)" />
                <path
                    d="M52.87 170.7c3.41 2.5 7.46 1.2 11.3 1 3.25-.2 6.53-.5 9.55-1.9.74-.3 2.86-1.2 2.78-2.3-.11-1.1-1.86-1.7-2.65-2-.74-.3-1.43-.8-2.22-1-2.2-.6-4.37-.5-6.59-.6-2.62-.1-4.61-.2-7.22.4-1.54.3-3.23.6-4.71 1.2-.4.1-.83.3-1.2.5-.15.1-.66.2-.47.2.32 0 3.09-1.2 3.73-1.4 3.17-.9 6.8-1.7 10.11-1.6 1.45 0 8.15.8 8.91 1.7.19.3-.53-.2-.82-.3-.63-.2-1.08-.2-1.74-.3-1.56-.2-3.05-.6-4.58-.9-.64-.1-1.4 0-2.01-.1-.13-.1.29 0 .42 0 .74 0 .95.1 1.75.3 1.77.4 3.73.7 5.4 1.4.5.2.92.8 1.45.9 0 0-.26-.4-.69-.6-.68-.4-1.37-.6-2.11-.9-.32-.1-1.19-.1-.9-.2.55-.2 3.25 1.6 3.44 1.5.13-.1-1.48-1.1-1.56-1.1-1.49-.7-3.36-.9-4.98-1-4.84-.4-9.95-.2-14.39 1.9-.53.3-2.41 1.1-2.68 1.7 0 .1.14-.1.19-.2.24-.1 1.03-.6 1.22-.7 1.69-1 3.57-1.6 5.45-2.1 4.1-1 12.04-1.2 15.95.1.56.2.85.7 1.33.9.26.1-.51-.4-.8-.5-1.03-.5-2.14-.7-3.23-.9-2.4-.4-4.84-.3-7.27-.4-.74 0-1.35 0-1.27-.2.1-.2 1.66 0 2.35 0 2.54.1 5.16 0 7.68.3 1.85.2 3.28 1.3 5.08 1.5M64.27 172c0 1.9 0 3.9.24 5.9M61.89 172.8c-.29 2 .1 3.9.13 5.9"
                    style={{
                        fill: "none", stroke: "#000", strokeWidth: ".2646px", strokeLinecap: "butt", strokeLinejoin: "miter"
                        , strokeOpacity: 1,
                    }} transform="translate(-23.68 -46.61) scale(2.156)" />
                <path
                    d="M59.01 172.3c.1 1.8.26 3.6.26 5.4M56.15 172.4c-.19 1.6.24 3.2.21 4.8M53.79 171.7c.1 2.1.61 4.1.66 6.1M51.7 170.4c.29 2.4.74 4.7.93 7M60.12 172.3c-.27 1.8 0 3.4.1 5.2M57.66 172.1c-.24 1.7 0 3.3 0 5M54.64 171.8c-.26 1.7.4 3.3.4 5M52.89 172c0 1.5.64 3 .72 4.5M50.88 169.7c.1 2.3.64 4.6 1.17 6.8M58.08 171.9c0 1.9.11 3.7.18 5.6M56.25 172.5c.14 1.6.4 3.2.51 4.8M55.12 171.8c-.1 1.8.31 3.6.29 5.4M54.11 171.2c-.18 1.8.74 3.5.48 5.3"
                    style={{
                        fill: "none", stroke: "#000", strokeWidth: ".2646px", strokeLinecap: "butt", strokeLinejoin: "miter"
                        , strokeOpacity: 1,
                    }} transform="translate(-23.68 -46.61) scale(2.156)" />
                <path d="M53.05 171.3c-.21 1.8.72 3.5.66 5.3M52.23 171.5c0 1.4 1.19 3.5.8 4.5M51.28 170.4c.11 1.9.45 3.8.77 5.7"
                    style={{
                        fill: "none", stroke: "#000", strokeWidth: ".2646px", strokeLinecap: "butt", strokeLinejoin: "miter"
                        , strokeOpacity: 1,
                    }} transform="translate(-23.68 -46.61) scale(2.156)" />
                <path
                    d="M53.26 171.7c-.1 1.9.48 3.7.56 5.6M52.97 177.4c-.1-1.9-1-3.7-.9-5.6.21 1.6.83 3.2 1.21 4.8M53.77 172.3c.66 4.8.45 3.1.68 5.2M55.01 172.6c.69 4 .48 2.5.74 4.6M56.07 173c0 1.6.61 3.1.87 4.7M57.47 173.9v1.3M58.77 173.6c.42 2.8.1 1.3 1 4.4M61.39 174.2c.16 1.6 0 .7.47 2.8M63.27 172.4c.15 1.2.31 2.5.5 3.7M65.57 172.8c.1 1.4.1 2.8.1 4.2M65.59 166c-2.96 1.2-.55.2-7.38 2.6M67.34 167c-1.96.6-1.06.3-2.67.9M65.47 165.1c-3.81.8-1.45.3-7.04 1.8M72.66 165.5c-1.61.7-3.26 1.3-4.87 2"
                    style={{
                        fill: "none", stroke: "#000", strokeWidth: ".2646px", strokeLinecap: "butt", strokeLinejoin: "miter"
                        , strokeOpacity: 1,
                    }} transform="translate(-23.68 -46.61) scale(2.156)" />
            </g>
        </svg>
    </>)
}
