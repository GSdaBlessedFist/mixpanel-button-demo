"use client";
import Image from 'next/image';
import Navbar from "../components/Navbar";
import styles from "./styles/mainContainer.module.scss";
import SVGButton from "../components/SVGButton";
import ResultGroup from "../components/ResultGroup";
import DashboardTab from "../components/DashboardTab";
import { useEffect, useRef, useState } from 'react';
import MixpanelTracking from '@/service/mixpanel';
import axios from 'axios';

type HomeProps = {};



export default function Home(props: HomeProps) {
  const [hasTrackedPageView, setHasTrackedPageView] = useState(false);
  const [mixpanelData, setMixpanelData] = useState(null);

  const findings = [
    {
      query: "How many people have visited?",
      result: 50
    }, {
      query: "How many times repeated?",
      result: 85
    }, {
      query: "How many visited a few more?",
      result: 150
    }, {
      query: "Which witches visited?",
      result: 50
    }, {
      query: "How many visited a few more?",
      result: 150
    }, {
      query: "Which witches visited?",
      result: 50
    }
  ]

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
        <div className={styles.dashboardContainer}>
          {findings.map((finding, i) => (
            <div key={i}>
              <ResultGroup finding={finding} />
            </div>

          ))}
          <DashboardTab />
        </div>

      </div>


    </>
  );
}
