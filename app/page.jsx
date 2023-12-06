"use client";
import Image from 'next/image';
import gsap from "gsap";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./styles/mainContainer.module.scss";
import SVGButton from "../components/SVGButton";
import { useEffect, useRef, useState } from 'react';
import MixpanelTracking from '@/service/mixpanel';
import Link from 'next/link';

export default function Home(props) {
  const [hasTrackedPageView, setHasTrackedPageView] = useState(false);
  const [mixpanelData, setMixpanelData] = useState(null);

  const [buttonPressed, setButtonPressed] = useState(false);
  const [buttonPressCount, setButtonPressCount] = useState(0);

  const dashboardLink = useRef();
  const [dashLinkDisplayed, setDashLinkDisplayed] = useState(false);

  const updateButtonPressed = (isPressed) => {
    setButtonPressed(isPressed);
    setButtonPressCount(prev => prev + 1);

  };

  const displayLink = () => {
    if (!dashLinkDisplayed) {
      gsap.fromTo(dashboardLink.current, {
        y: "+=70",
        scale: 0.55,
        opacity: 0,
        duration: 2
      }, {
        y: "+-=50",
        scale: 1,
        opacity: 1,
        duration: 2,
        ease: "power2.in"
      })
    }
    setDashLinkDisplayed(true)



  }



  useEffect(() => {
    if (!hasTrackedPageView) {
      MixpanelTracking.getInstance().pageViewed();
      setHasTrackedPageView(true);
    }
  }, [hasTrackedPageView]);

  useEffect(() => {
    if (buttonPressCount !== 0) {
      displayLink();
    }
  }, [buttonPressCount,displayLink])
  return (
    <>
      <div className="sm:w-full flex flex-col h-screen">
        <Navbar />
        <div className={styles.mainContainer}>
          <Link ref={dashboardLink} href="https://mixpanel.com/p/91i4pT5DuBCG3a22cwXfjm" target="_blank" className={dashLinkDisplayed ? "opacity-0 relative h-12 p-2 top-32 text-primary border-2 border-primary" : ""}>
            Check out the dashboard
          </Link>

          <div className={styles.svgButtonContainer}>
            <SVGButton buttonPressed={buttonPressed} updateButtonPressed={updateButtonPressed} />
          </div>


        </div>
        <Footer />
      </div>

    </>
  );
}
