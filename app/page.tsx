"use client";
import Image from 'next/image';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import styles from "./styles/mainContainer.module.scss";
import SVGButton from "../components/SVGButton";
import { useEffect, useRef, useState } from 'react';
import MixpanelTracking from '@/service/mixpanel';
import Link from 'next/link';

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
      <div className="sm:w-full flex flex-col h-screen">
      <Navbar />
      <div className={styles.mainContainer}>
        <Link href="/" className="relative h-12 p-2 top-32 text-primary border-2 border-primary">
          Check out the dashboard
        </Link>
        
        <div className={styles.svgButtonContainer}>
          <SVGButton />
        </div>
        

      </div>
      <Footer/>
      </div>

    </>
  );
}
