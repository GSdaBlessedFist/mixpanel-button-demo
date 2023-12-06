import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import styles from "../app/styles/mainContainer.module.scss";
import svg from "../components/svgButton.module.scss";
import MixpanelTracking from "../service/mixpanel";


export default function SVGButton({ buttonPressed, updateButtonPressed }) {
    const button = useRef();
    const buttonShadow = useRef();
    const alertLight = useRef();

    const [timer, setTimer] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [clickCount, setClickCount] = useState(0);

    const [lightStatus, setLightStatus] = useState(null)
    const [lightColor, setLightColor] = useState();



    const handleButtonClick = () => {
        updateButtonPressed(true);
        if (!gsap.isTweening([button.current, buttonShadow.current])) {
            gsap.to([button.current, buttonShadow.current], {
                y: "+=2.5",
                duration: .45,
                ease: "power2.inOut",
                onComplete: () => {
                    gsap.to([button.current, buttonShadow.current], {
                        y: "-=2.5",
                        duration: 0.5,
                        ease: "power2.inOut"
                    })
                }

            });
        }
        setClickCount((prevCount) => prevCount + 1);
        if (clickCount === 1 && timer <= 4) {
            MixpanelTracking.getInstance().impatientClickery();
            console.log("MixpanelTracking for impatientClickery");
            setClickCount(0);
        } else {
            MixpanelTracking.getInstance().buttonPushed();
            setTimer(0);
            setIsRunning(true);
        }
    };
    useEffect(() => {
        const buttonPressed = 0;

        const animationTimeout = setTimeout(() => {
            if (buttonPressed === 0) {
                gsap.to(alertLight.current, {
                    duration: 1,
                    attr: {
                        class: `${svg.redLight}`,
                    },
                    onComplete: () => {
                        if (buttonPressed === 0) {
                            setTimeout(() => {
                                gsap.to(alertLight.current, {
                                    duration: 1,
                                    attr: {
                                        class: `${svg.greenLight}`,
                                    },
                                });
                            }, 3000);
                        }
                    },
                });
            }
        }, 8000);

        return () => clearTimeout(animationTimeout);
    }, [buttonPressed]);

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
            setTimer(0);
            setClickCount(0);
            setIsRunning(false);
        }

        return () => clearInterval(interval);
    }, [isRunning, timer]);


    useEffect(() => {

        switch (lightStatus) {
            case 'red':
                setLightColor(`${svg.redLight}`);
                break;
            case 'green':
                setLightColor(`${svg.greenLight}`);
                break;
            default:
                setLightColor(`${svg.light}`);
                break;
        }
    }, [lightStatus]);


    return (<>
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve" id="svgButton" className={svg.svgButton} width="95.51mm" height="66.86mm" viewBox="0 0 95.51 66.86" >
            <defs id="defs1">
                <linearGradient id="green_light"  >
                    <stop id="stop4" offset={0} style={{ stopColor: "#16f300", stopOpacity: .751, }} />
                    <stop id="stop8" offset={0.7531} style={{ stopColor: "#1d9c00", stopOpacity: .751, }} />
                    <stop id="stop7" offset={1} style={{ stopColor: "#0f3600", stopOpacity: .751, }} />
                </linearGradient>
                <linearGradient id="red_light" >
                    <stop id="stop1" offset={0} style={{ stopColor: "#f34700", stopOpacity: .751, }} />
                    <stop id="stop3" offset={0.7604} style={{ stopColor: "#8e0d00", stopOpacity: .751, }} />
                    <stop id="stop2" offset={1} style={{ stopColor: "#2c0000", stopOpacity: .751, }} />
                </linearGradient>
                <linearGradient id="bg-line-grad">
                    <stop id="stop38" offset={0} style={{ stopColor: "#ffffff", stopOpacity: 1, }} />
                    <stop id="stop39" offset={1} style={{ stopColor: "#ffffff", stopOpacity: 0, }} />
                </linearGradient>
                <linearGradient id="linearGradient12">
                    <stop id="stop12" offset={0} style={{ stopColor: "#000000", stopOpacity: 0.519, }} />
                    <stop id="stop13" offset={1} style={{ stopColor: "#000000", stopOpacity: 0, }} />
                </linearGradient>
                <linearGradient xlinkHref="#linearGradient12" id="linearGradient13" x1={108.7} x2={129.4} y1={210.6} y2={210} gradientUnits="userSpaceOnUse" />
                <linearGradient xlinkHref="#linearGradient12" id="linearGradient39" x1={108.7} x2={129.4} y1={210.6} y2={210} gradientTransform="translate(55.33 113.7) scale(.4709)" gradientUnits="userSpaceOnUse" />
                <clipPath id="clipPath21" clipPathUnits="userSpaceOnUse">
                    <path id="path21" d="M156.1 201v11c-2.6 1.6-5.6 2.6-8.6 3.3-4.3 1.2-8.8 1.4-13.3 1.7-3.6.1-7.1.1-10.6-.4-4.3-.5-8.5-1.4-12.5-3.1-1-.5-2.5-.7-3.2-1.5l.1-11.3c-3.4 1.2-6.6 2.7-9.07 5.4-1.38 1.5-2.36 3.6-1.75 5.7.35 1.9 1.83 3.2 3.22 4.4 3.9 2.9 8.6 4.4 13.3 5.5 5.6 1.4 11.3 1.8 17 1.9 4.1.1 8.2-.1 12.2-.6 3.6-.4 7.1-1.3 10.6-2.1 3.2-.8 6.3-2.3 9.1-4 1.8-1.3 3.7-2.9 4.2-5.1.4-1.7 0-3.4-1.1-4.8-1.7-2.4-4.4-3.9-7-5.1-1-.4-2.6-2.4-2.6-1.3z" style={{ display: "inline", opacity: 1, fill: "#ffffff", fillOpacity: 1, stroke: "#ffffff", strokeWidth: 0.529201, strokeLinecap: "butt", strokeLinejoin: "miter", strokeDasharray: "none", strokeOpacity: 1, }} />
                </clipPath>
                <clipPath id="clipPath36" clipPathUnits="userSpaceOnUse">
                    <path id="path37" d="m156 199.2-.1 12.6s-1.6.9-2.5 1.3c-.9.4-1.8.8-2.8 1.1-2 .6-4 1.1-6 1.5-2 .4-4.2.7-6.3.8-2.1.2-4.2.3-6.3.3-2.3 0-4.7-.1-7-.3-2.3-.2-4.5-.6-6.8-1-1.1-.2-2.3-.5-3.5-.9-1.1-.3-2.1-.7-3.2-1.1-.6-.3-1.3-.5-1.9-.9-.4-.2-.9-.6-1.4-1l.1-11.2H94.8v28.4h13.3l49.4-1.2h11.8v-28.4z" style={{ display: "inline", opacity: 1, fill: "#ffffff", fillOpacity: 0.9979, fillRule: "evenodd", stroke: "#ffffff", strokeWidth: 0.264599, strokeOpacity: 1, }} />
                </clipPath>
                <clipPath id="b_Mask" clipPathUnits="userSpaceOnUse">
                    <path id="path1" d="M155.7 212.5v-17.1s-.5-1.5-1-2.2c-.5-.6-1.1-1.3-1.7-1.8-.7-.6-1.5-1.2-2.3-1.5-1.7-.8-3.7-1.3-5.6-1.8-2.1-.5-4.4-.9-6.5-1.2-2.2-.2-4.3-.2-6.4-.2-2.3 0-4.5 0-6.7.3-2.1.2-4.1.6-6.2 1-1 .2-2 .5-3 .8-1.2.4-2.3.8-3.4 1.4-.7.4-1.4.8-2.1 1.4-.4.3-.8.8-1.2 1.2-.3.5-.7 1-.9 1.6-.2.3 0 1 0 1l-.2 17.1s3.3 1.6 5 2.2c2 .7 4 1.2 6.1 1.6 2.4.4 4.8.6 7.2.8 1.8.2 3.6.2 5.4.2 2.1 0 4.3-.2 6.5-.3 2.2-.2 4.5-.2 6.6-.6 2-.4 5.9-1.7 5.9-1.7" style={{ fill: "#ffffff", fillOpacity: 1, stroke: "#ffffff", strokeWidth: "0.561901px", strokeLinecap: "butt", strokeLinejoin: "miter", strokeOpacity: 1, }} />
                </clipPath>
                <path id="rect39" d="M30.01 10.75h309.9v92.7H30.01z" />
            </defs>
            <g onClick={handleButtonClick} ref={button} id="button" style={{ display: "inline", }} transform="translate(-84.54 -170.4)" >
                <g id="buttonParts" clipPath="url(#b_Mask)" style={{ strokeWidth: 0.5292, strokeDasharray: "none", }} transform="translate(55.33 113.7) scale(.4709)" >
                    <path id="buttonBody" d="M108.5 195.4h47.06v24.37H108.5z" style={{ fillOpacity: 1, fillRule: "evenodd", stroke: "none", strokeWidth: 0.5292, strokeDasharray: "none", strokeOpacity: 1, }} className={svg.buttonBody} />
                    <ellipse id="buttonTop" cx={132} cy={195.4} rx={23.53} ry={7.969} style={{ fillOpacity: 1, fillRule: "evenodd", stroke: "none", strokeWidth: 0.5292, strokeDasharray: "none", strokeOpacity: 1, }} className={svg.buttonTop} />
                    <ellipse id="buttonEdge" cx={132} cy={194.4} rx={22.83} ry={7.731} style={{ fillOpacity: 1, fillRule: "evenodd", stroke: "none", strokeWidth: 0.5292, strokeDasharray: "none", strokeOpacity: 1, }} className={svg.buttonEdge} />
                </g>
            </g>
            <g id="buttonRing" style={{ display: "inline", strokeWidth: 0.5292, strokeDasharray: "none", }} transform="translate(-84.54 -170.4)">
                <g id="g23" clipPath="url(#clipPath36)" transform="translate(55.33 113.7) scale(.4709)" >
                    <ellipse id="buttonRingInside" cx={131.6} cy={209.4} rx={31.64} ry={11.05} style={{ fillOpacity: 1, fillRule: "evenodd", strokeWidth: 0.148436, }} className={svg.buttonRingInside} />
                    <path id="buttonRingOutside" d="M132 197.6a34.68 12.92 0 0 0-34.68 12.9A34.68 12.92 0 0 0 132 223.4a34.68 12.92 0 0 0 34.7-12.9 34.68 12.92 0 0 0-34.7-12.9zm0 1.7a26.53 8.984 0 0 1 26.5 9 26.53 8.984 0 0 1-26.5 9 26.53 8.984 0 0 1-26.5-9 26.53 8.984 0 0 1 26.5-9z" clipPath="none" style={{ fillOpacity: 1, fillRule: "evenodd", stroke: "none", strokeWidth: 0.5292, strokeDasharray: "none", strokeOpacity: 1, }} className={svg.buttonRingOutside} />
                </g>
            </g>
            <g id="shadow" style={{ fill: "url(#linearGradient13)", fillOpacity: 1, stroke: "none", }} transform="translate(-84.54 -170.4)" >
                <path id="path35" className="fill-primary-dark" d="M106.4 209.4s-1 .3-1.4.7c-.4.4-.7.9-.8 1.5 0 .4.1.8.2 1.1.2.4.5.7.8.9.3.3.8.6 1.2.8.7.3 1.5.5 2.3.7 1 .3 3 .5 3 .5l-2.4-.7s-1.5-.4-2.1-.8c-.5-.2-1-.4-1.4-.8-.3-.4-.7-.8-.7-1.3-.1-.5 0-.9.2-1.4.3-.3 1.1-.8 1.1-.8z" style={{ mixBlendMode: "multiply", fillOpacity: 1, stroke: "none", strokeWidth: "0.12459px", strokeLinecap: "butt", strokeLinejoin: "miter", strokeOpacity: 1, }} />
                <path id="path12" ref={buttonShadow} d="M106.9 204.6s-.1.4-.1.6v.5c0 .1.1.2.2.3 0 .1.1.2.2.3.4.3.7.6 1.1.8.4.3.9.4 1.4.6.4.2.9.3 1.3.4.5.2 1 .3 1.5.4.7.1 1.5.2 2.3.3.9.1 2.7.1 2.7.1v7.1s-.2.3-.3.5c-.1.3-.2.5-.2.7-.1.3-.1.6-.1 1 0 .2.1.7.1.7s-1.3-.1-2.1-.1c-.6-.1-1.2-.1-1.8-.2-1.3-.1-2.6-.2-3.8-.5-.9-.2-1.8-.5-2.7-.8-.8-.3-1.5-.5-2.2-.9-.4-.2-.8-.3-1.1-.6l-.9-.6c-.2-.3-.4-.5-.6-.7-.2-.3-.4-.5-.5-.8-.1-.3-.1-.6-.1-.9 0-.3.1-.7.2-1 .1-.3.3-.5.5-.8.2-.3.5-.5.8-.8.8-.5 2.5-1.4 2.5-1.4l1.2-.5v-2.6s.1-.4.1-.5c.1-.2.4-.6.4-.6z" style={{ fill: "url(#linearGradient39)", fillOpacity: 1, stroke: "none", strokeWidth: "0.12459px", strokeLinecap: "butt", strokeLinejoin: "miter", strokeOpacity: 1, }} />
            </g>
            <g id="g35" transform="translate(-84.54 -170.4)">
                <g id="alertLight" style={{ strokeWidth: 1.50634, }} transform="matrix(.3142 0 0 .311 95.59 162.8)" >
                    <ellipse id="lightBorder" cx={184.1} cy={162.6} rx={23.55} ry={8.268} style={{ fillOpacity: 1, fillRule: "evenodd", stroke: "none", strokeWidth: 0.797156, strokeDasharray: "none", strokeOpacity: 1, }} className={svg.lightBorder} />
                    <ellipse id="light" ref={alertLight} cx={184.1} cy={161.6} rx={17.18} ry={6.033} style={{ fillOpacity: 1, fillRule: "evenodd", stroke: "#000000", strokeWidth: 0.398577, strokeDasharray: "none", strokeOpacity: 1, }} className={lightColor} />
                </g>
            </g>
            <g >
                <path id="warning" className={svg.warning} d="m11.59 24.31 5.8-10.7h2.41c.17 0 .26.12.3.26 0 .18 0 .41-.17.66l-4.09 8.46c-.17.35-.38.66-.63.92-.27.24-.5.36-.69.36zm1.78-1.65h1.43c.13 0 .21-.13.34-.2.14-.13.24-.28.33-.46l3.33-6.68c.14-.15.14-.28.14-.37 0-.13 0-.15-.14-.15h-1.25zm3.25 1.6c-.17 0-.27-.12-.3-.36 0-.25.13-.57.23-.93l3.99-8.44c.12-.25.29-.48.49-.66.19-.17.37-.26.52-.26h1.8c.19 0 .29.12.32.26 0 .18 0 .4-.12.66l-3.5 8.42c-.15.36-.35.66-.57.91-.24.25-.46.36-.68.38zm1.29-1.63h1.06c.13 0 .23-.12.34-.19.13-.13.23-.28.3-.47l2.86-6.65c.13-.15.13-.28.13-.37 0-.13-.13-.15-.15-.15h-.92c-.13 0-.18 0-.28.15-.13.12-.2.22-.27.37l-3.07 6.67c-.13.19-.13.34-.13.47 0 .12.13.19.16.19zM22 24.2l2.99-7.93h1.76c.15 0 .25.12.3.29.13.18 0 .42 0 .71l-2.3 6.89h-.91l2.12-6.04c0-.18.13-.3 0-.4 0-.13-.12-.17-.16-.17h-.48l-2.39 6.57zm3.87 0c-.18 0-.3-.13-.34-.35-.13-.27 0-.57.13-.91l1.84-5.6c.12-.29.22-.53.42-.72.17-.2.33-.3.49-.3h1.17c.15 0 .27.12.3.31.12.19 0 .43 0 .71l-1.59 5.58c-.13.34-.25.64-.47.91-.19.24-.38.37-.57.37zm1.07-1.64h.17c.13 0 .2 0 .32-.2.12-.12.17-.27.22-.44l1.13-3.77v-.38c0-.13-.13-.17-.18-.15h-.16c-.13 0-.18 0-.28.16-.12.13-.16.23-.21.38l-1.18 3.78c0 .17-.12.3 0 .42 0 .14.13.2.18.2zm1.66 1.61 2.98-10.85.81-.25-.83 3.23h.96l-.5 1.33h-.8l-1.69 6.53zm4.04 0 2.18-10.45h2.34c.14 0 .25.13.34.25.13.18.13.4.13.65l-.45 2.92c0 .29-.16.54-.31.76-.17.2-.32.32-.47.32h-1.76l-1.08 5.54zm2.22-6.9h1.25c.13 0 .15 0 .22-.17.12-.13.12-.22.15-.36l.24-1.39v-.34c0-.13-.13-.14-.15-.14h-1.2zm1.81 6.87 1.52-10.42h2.31c.15 0 .28.13.38.25.12.18.12.4.12.65l-.26 2.9c0 .3-.13.55-.23.75-.14.22-.3.32-.47.32h-.15l.25 5.5h-.83l-.22-5.5h-.78l-.73 5.52zm1.78-6.89h1.23c.12 0 .16 0 .24-.17.12-.12.12-.21.12-.35l.15-1.36v-.36c0-.13-.14-.14-.2-.14h-1.17zm2.34 6.84.84-10.37h2.84v1.15h-2.2l-.17 2.35h1.54l-.25 1.35h-1.37l-.27 3.9h2.52v1.58zm4.6 0c-.18 0-.34-.13-.47-.36-.13-.24-.16-.54-.16-.88v-2.52l.81.33v1.23c0 .17 0 .32.12.44 0 .13.15.19.25.19h1c.12 0 .15-.13.22-.19 0-.12.13-.28.13-.44v-2.74c0-.16 0-.29-.13-.39 0-.12-.14-.16-.22-.16h-1.4c-.17 0-.31-.13-.44-.32-.12-.2-.16-.44-.14-.73v-2.89c0-.25 0-.47.15-.64.13-.19.26-.26.41-.26h1.74c.15 0 .27.12.38.24.13.17.18.41.19.66v1.41l-.74-.3v-.36c0-.14 0-.27-.13-.34-.12-.14-.12-.16-.22-.16h-.87c-.13 0-.15 0-.2.16 0 .12-.13.2-.13.34v1.36c0 .13 0 .25.13.35 0 .13.14.15.22.15h1.4c.16 0 .29.13.4.28.13.21.19.45.2.73l.17 4.53c0 .35 0 .65-.17.9-.12.22-.25.35-.43.35zm4.09 0c-.19 0-.35-.13-.48-.34-.13-.26-.22-.54-.23-.89l-.14-2.5.83.33.12 1.21c0 .17 0 .31.13.44 0 .13.14.19.21.19h1.02c.13 0 .15-.12.19-.19v-.44l-.23-2.72c0-.17 0-.29-.12-.37-.13-.14-.15-.17-.2-.17h-1.44c-.16 0-.3-.12-.41-.31-.15-.2-.2-.45-.22-.73l-.13-2.88c0-.25 0-.47.13-.65.12-.17.22-.25.37-.25h1.72c.15 0 .28.13.39.25.13.18.2.4.23.65l.15 1.4-.76-.29v-.36c0-.15 0-.27-.13-.35 0-.14-.12-.15-.19-.15h-.9c-.12 0-.12 0-.16.15 0 .12-.12.22 0 .35l.13 1.35c0 .13 0 .25.12.35.13.13.13.15.2.15h1.39c.16 0 .3.13.41.28.14.21.23.45.25.73l.46 4.51c0 .33 0 .64-.12.88-.14.24-.22.35-.41.35zm6.25-.13-1.41-9.03h-1.07l-.17-1.16h2.78l.22 1.16h-1.05l1.52 9.03zm2.49 0L56.23 13.8h.69l.73 3.47h1.44l-.81-3.46h.7l2.51 10.12h-.81l-1.27-5.36h-1.49l1.13 5.36zm4 0-2.64-10.13h2.74l.35 1.14h-2.11l.63 2.32h1.47l.2 1.31h-1.32l1.04 3.81h2.4l.49 1.54zm5.52 0-3.51-10.08h1.83c.16 0 .32.14.49.27.17.17.3.38.41.62l1.01 2.6c.14.13.27.22.41.36.13.16.23.37.32.57l1.76 4.42c.13.33.19.62.15.86 0 .23-.13.34-.28.34zm-1.58-6.64h.78c.13 0 .13 0 .14-.15v-.33l-.51-1.33c0-.14-.12-.26-.21-.34-.13-.13-.18-.15-.24-.15h-.76zm1.83 5.09h1.27c.12 0 .12-.12.12-.18v-.43l-1.04-2.68c0-.14-.12-.26-.22-.36-.13-.12-.18-.16-.25-.16h-1.18zm4.01 1.5c-.18 0-.36-.13-.56-.35-.22-.23-.4-.51-.53-.84l-3.59-8.82h.67l3.33 7.89c.12.16.15.3.26.42.13.12.2.17.29.17h.95c.13 0 .13 0 .13-.17 0-.14 0-.26-.13-.42l-3.51-7.87h.68l4.02 8.76c.15.33.22.63.2.86 0 .23-.13.34-.27.34zm4.16 0-4.26-8.82h-1.03l-.51-1.14h2.65l.6 1.12h-1.03l4.38 8.81zm3.61 0-4.75-8.79h-1.01L73.42 14h2.64l.64 1.12h-1l4.86 8.78zm2.96 0c-.15 0-.34-.13-.61-.33-.25-.22-.48-.52-.66-.85l-4.54-7.83c-.15-.24-.22-.46-.2-.62 0-.16.12-.24.2-.24h1.61c.14 0 .31.13.49.24.22.16.4.38.56.62l4.91 7.81c.21.33.32.6.34.85 0 .21 0 .32-.19.34zm-.42-1.5h.92c.13 0 .14 0 .13-.18 0-.12-.13-.26-.18-.42l-3.8-6.19c-.12-.14-.2-.27-.31-.35-.12-.12-.2-.13-.29-.13h-.81c-.13 0-.13 0-.13.13 0 .14 0 .22.13.36l3.66 6.19c.13.17.22.31.34.42.13.12.23.17.29.17zm3.54 1.46-6.29-9.83h.65l5.48 6.17-4.18-6.17h.65l6.77 9.81h-.75l-6.06-6.9 4.5 6.92z" aria-label="DO not PRESS THE BUTTON" style={{ fontSize: "26.665px", lineHeight: 1.25, fontFamily: "'Odibee Sans'", InkscapeFontSpecification: "'Odibee Sans, Normal'", textAlign: "center", letterSpacing: 0, wordSpacing: 0, textAnchor: "middle", whiteSpace: "pre", strokeWidth: 0.276209, }} />
            </g>
        </svg>
    </>)
}
