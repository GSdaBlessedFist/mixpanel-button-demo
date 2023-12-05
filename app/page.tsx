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
      <Grid >
        <Navbar />

        <div className={styles.mainContainer}>
          <div className={styles.dashboardLink}>
            <a href="https://mixpanel.com/p/TFy5N9adR8zjK1qQ2R4v5F"
              className='text-primary'>check out the dashboard</a>
          </div>
          <div className={styles.svgButtonContainer}>
            <SVGButton />
          </div>
        </div>

        <Footer />
      </Grid>



    </>
  );
}

function Grid({children} ) {
  return (<>
    <div className="w-full lg:w-2/3 grid grid-rows-[85px_1fr_65px] h-screen ">{children}</div>
  </>
  )
}