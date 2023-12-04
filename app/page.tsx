"use client";
import Image from 'next/image';
import Navbar from "../components/Navbar";
import styles from "./styles/mainContainer.module.scss";
import SVGButton from "../components/SVGButton";
import { useEffect, useRef, useState } from 'react';
import MixpanelTracking from '@/service/mixpanel';

type HomeProps = {};



export default function Home(props: HomeProps) {
  const [hasTrackedPageView, setHasTrackedPageView] = useState(false);
  const [mixpanelData, setMixpanelData] = useState(null);

  

  useEffect(() => {
    if (!hasTrackedPageView) {
      MixpanelTracking.getInstance().pageViewed();
      setHasTrackedPageView(true);
    }

  }, [hasTrackedPageView]);

  return (
    <>
      <Navbar />
      <div className={styles.mainContainer}>
        <div className={styles.svgButtonContainer}>
          <SVGButton />
        </div>
        

      </div>


    </>
  );
}
