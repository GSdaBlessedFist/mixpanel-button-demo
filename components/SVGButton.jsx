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
                duration: .15,
                ease: "power2.inOut",
                onComplete: () => {
                    gsap.to([button.current, buttonShadow.current], {
                        y: "-=2.5",
                        duration: 0.15,
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

        if (lightStatus === 'green') {
            MixpanelTracking.getInstance().buttonPressedAfterGreenLight();
        }
    };
    useEffect(() => {

        const animationTimeout = setTimeout(() => {
            if (buttonPressed === false) {
                gsap.to(alertLight.current, {
                    duration: 5,
                    attr: {
                        class: `${svg.redLight}`,
                    },
                    onComplete: () => {
                        if (buttonPressed === false) {
                            setTimeout(() => {
                                gsap.to(alertLight.current, {
                                    duration: 5,
                                    attr: {
                                        class: `${svg.greenLight}`,
                                    },
                                });
                                setLightStatus("green");
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
            <g id="warning" className="warning">
                <path id="_warning2"  d="M35.61 18.55v3.06h1.73c.11 0 .2-.03.27-.1.06-.05.12-.1.19-.17s.1-.15.1-.24v-1.96c0-.09-.03-.16-.1-.23-.04-.05-.1-.1-.19-.17-.07-.07-.16-.11-.27-.11h-.32l-1.41-.08zm3.26.08c-.1.01-.19.04-.27.11-.06.04-.12.1-.19.17s-.1.14-.1.23v1.96c0 .09.03.17.1.24.05.05.11.1.19.17s.17.1.27.1h1.25c.11 0 .2-.03.28-.1.06-.05.12-.1.19-.17s.1-.15.1-.24v-1.96c0-.09-.03-.16-.1-.23-.05-.05-.12-.1-.19-.17-.08-.07-.17-.11-.28-.11h-1.25zm-2.58.36h.57c.08 0 .15.03.22.1.07.03.1.08.1.15v1.74c0 .03-.03.08-.1.15-.05.07-.13.1-.22.1h-.57v-2.24zm3 0h.32c.07 0 .14.03.21.1.07.03.1.08.1.15v1.84c0 .03-.03.08-.1.15-.05.07-.12.1-.21.1h-.32c-.08 0-.15-.03-.22-.1-.07-.03-.1-.08-.1-.15v-1.84c0-.03.03-.08.1-.15.05-.07.13-.1.22-.1zm9.31.03v.52h-.42v.4h.42v1.33c0 .09.03.17.1.24.05.05.11.1.19.17s.17.1.27.1h.65v-.41h-.18c-.08 0-.15-.03-.22-.1-.07-.03-.1-.08-.1-.15v-1.27h.44v-.4l-.44.09v-.52h-.71zm-5.8.39v2.28h.7l.03-1.61v-.11c0-.07.03-.1.1-.1.02-.07.06-.1.13-.1h.34c.08 0 .15.03.22.1.07.03.1.08.1.15v1.67h.7v-1.74c0-.09-.03-.16-.1-.23-.05-.05-.11-.1-.19-.17s-.17-.11-.27-.11h-.86c-.07 0-.13.03-.2.1v-.13h-.7zm3.32.02c-.11.01-.2.04-.27.11-.06.05-.12.1-.19.17s-.1.15-.1.24v1.19c0 .09.03.17.1.24.05.05.11.1.19.17.07.07.16.1.27.1h1.14c.1 0 .19-.03.27-.1.06-.05.12-.1.19-.17s.1-.15.1-.24v-1.19c0-.09-.03-.17-.1-.24-.05-.05-.11-.1-.19-.17s-.17-.11-.27-.11h-1.14zm.42.37h.21c.07 0 .14.03.21.1.07.03.1.08.1.15v1.07c0 .03-.03.08-.1.15-.05.07-.12.1-.21.1h-.21c-.08 0-.15-.03-.22-.1-.07-.03-.1-.08-.1-.15v-1.07c0-.03.03-.08.1-.15.05-.07.13-.1.22-.1zm-13.23 3.56v3.06h1.67c.1-.01.19-.04.27-.11.06-.05.12-.1.19-.17s.1-.14.1-.23l-.07-.7v-.13l-.1-.1c-.01-.07-.04-.1-.11-.1l-.1-.1.1-.1.1-.1.1-.1v-.61c0-.09-.03-.16-.1-.23-.05-.05-.11-.1-.19-.17s-.17-.11-.28-.11h-1.58zm-25.11.03v3.06l.701-.07v-1.35H9.93c.1-.01.19-.04.27-.11.06-.05.12-.1.19-.17s.1-.15.1-.24v-.61c0-.09-.03-.16-.1-.23-.05-.05-.11-.1-.19-.17s-.17-.11-.27-.11H8.2zm2.79 0v3.06h.7v-1.33l.98 1.33h.74l-1.01-1.36v-.07h.32c.11 0 .2-.03.28-.1l.18-.18c.07-.07.1-.14.1-.23v-.61c0-.09-.03-.16-.1-.23-.05-.05-.11-.1-.19-.17s-.17-.11-.27-.11h-1.73zm2.69 0v3.06h2.1v-.41h-1.4v-1.01h1.1v-.41h-1.1v-.82h1.4v-.41h-2.1zm9.74 0v.41h.83v2.65h.71V23.8h.83v-.41h-2.37zm2.74 0v3.06h.7v-1.4h1.04v1.4h.71v-3.06h-.71v1.25h-1.04v-1.25h-.7zm2.96 0v3.06h2.09v-.41h-1.39v-1.01h1.09v-.41h-1.09v-.82h1.39v-.41h-2.09zm6.92 0-.02 2.52c0 .09.03.16.1.23.05.05.11.1.19.17s.17.11.27.11h1.25c.11-.01.2-.04.28-.11.06-.05.12-.1.19-.17s.1-.14.1-.23v-2.52h-.71v2.45c0 .1-.03.15-.1.15-.05.07-.12.1-.21.1h-.32c-.08 0-.15-.03-.22-.1-.07-.03-.1-.08-.1-.15v-2.45h-.7zm2.76 0v.41h.83v2.65h.71V23.8h.83v-.41H38.8zm2.62 0v.41h.83v2.65h.71V23.8h.83v-.41h-2.37zm5.62.03v3.06h.7v-1.84l1.09 1.84h.73v-3.05h-.71v1.86l-1.09-1.87h-.72zm-2.33.01c-.11.01-.2.04-.27.11-.06.05-.12.1-.19.17s-.1.14-.1.23v1.97c0 .09.03.16.1.23.05.05.11.1.19.17.07.07.16.11.27.11h1.24c.11-.01.21-.04.28-.11.06-.05.12-.1.19-.17s.1-.14.1-.23v-1.97c0-.09-.03-.16-.1-.23-.05-.05-.11-.1-.19-.17-.07-.07-.17-.11-.28-.11h-1.24zm-27.88.03c-.11.01-.2.04-.27.11-.06.05-.12.1-.19.17s-.1.14-.1.23v.49c0 .09.03.16.1.23.05.05.11.11.19.18.07.07.16.1.27.1h.33l.42-.1c.08 0 .15.03.22.1.07.03.1.09.1.16v.66c0 .1-.03.15-.1.15-.06.07-.13.1-.22.1h-.3c-.07 0-.14-.03-.21-.1-.07-.03-.1-.08-.1-.15v-.34h-.7v.41c0 .09.03.16.1.23.05.05.11.1.19.17.07.07.16.11.27.11h1.22c.11-.01.2-.04.27-.11.06-.05.12-.1.19-.17s.1-.14.1-.23v-.8c0-.09-.03-.16-.1-.23-.04-.05-.1-.1-.19-.17-.07-.07-.16-.11-.27-.11h-.76c-.07.07-.14.07-.21 0-.07-.03-.1-.09-.1-.16v-.35c0-.04.03-.09.1-.16.05-.07.12-.1.21-.1h.3c.08 0 .15.03.22.1.07.04.1.09.1.16v.23h.7v-.3c0-.09-.03-.16-.1-.23-.04-.05-.1-.1-.19-.17-.07-.07-.16-.11-.27-.11h-1.22zm2.81 0c-.1.01-.19.04-.27.11-.06.05-.12.1-.19.17s-.1.14-.1.23v.49c0 .09.03.16.1.23.05.05.12.11.19.18.08.07.17.1.27.1h.33l.43-.1c.08 0 .15.03.22.1.07.03.1.09.1.16v.66c0 .1-.03.15-.1.15-.05.07-.13.1-.22.1h-.29c-.08 0-.15-.03-.22-.1-.07-.03-.1-.08-.1-.15v-.34h-.7v.41c0 .09.03.16.1.23.05.05.12.1.19.17.08.07.17.11.27.11h1.23c.1-.01.19-.04.27-.11.06-.05.12-.1.19-.17s.1-.14.1-.23v-.8c0-.09-.03-.16-.1-.23-.05-.05-.11-.1-.19-.17s-.17-.11-.27-.11h-.76c-.08.07-.15.07-.22 0-.07-.03-.1-.09-.1-.16v-.35c0-.04.03-.09.1-.16.05-.07.13-.1.22-.1h.29c.08 0 .15.03.22.1.07.04.1.09.1.16v.23h.7v-.3c0-.09-.03-.16-.1-.23-.05-.05-.11-.1-.19-.17s-.17-.11-.27-.11h-1.23zm-10.739.29h.562c.093 0 .166.03.219.1.053.04.08.09.08.16v.38c0 .03-.027.08-.08.15-.054.07-.127.1-.219.1h-.562v-.89zm2.769 0h.56c.08 0 .15.03.22.1.07.04.1.09.1.16v.37c0 .04-.03.09-.1.16-.05.07-.13.1-.22.1h-.56v-.89zm22.35 0h.42c.07 0 .14.03.21.1.07.04.1.09.1.16v.34c-.01.03-.04.07-.09.12-.05.07-.12.1-.22.1h-.42v-.82zm11.11.03h.33c.07 0 .14.03.21.1.07.04.1.09.1.16v1.83c0 .1-.03.15-.1.15-.05.07-.12.1-.21.1h-.33c-.08 0-.15-.03-.22-.1-.07-.03-.1-.08-.1-.15v-1.83c0-.04.03-.09.1-.16.06-.07.13-.1.22-.1zm-11.1 1.16h.52c.07 0 .14.03.21.1.07.03.1.07.1.14v.61c0 .1-.03.15-.1.15-.05.07-.12.1-.21.1l-.52-.09v-1.01z" className="fill-orange-800"/>
            </g>
        </svg>
    </>)
}
