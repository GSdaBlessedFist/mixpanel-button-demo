"use client";
import Image from 'next/image';
import Navbar from "../components/Navbar";
import styles from "./styles/mainContainer.module.scss";
import SVGButton from "../components/SVGButton";
import ResultGroup from "../components/ResultGroup";
import DashboardTab from "../components/DashboardTab";
import { useEffect, useRef, useState } from 'react';
import mixpanel from "mixpanel-browser";

type HomeProps = {};

export default function Home(props: HomeProps) {

  const findings = [
    {
      query: "How many people have visited?",
      result: 50
    },{
      query: "How many times repeated?",
      result: 85
    },{
      query: "How many visited a few more?",
      result: 150
    },{
      query: "Which witches visited?",
      result: 50
    },{
      query: "How many visited a few more?",
      result: 150
    },{
      query: "Which witches visited?",
      result: 50
    }
  ]
  useEffect(()=>{
    mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_ID || "",
    {
        debug: true, 
        track_pageview: true, 
        persistence: 'localStorage',
        ignore_dnt: true,
    }
    )
    mixpanel.identify('Jason Z')
    mixpanel.track("page_view")
},[])

  return (
    <>
      <Navbar />
      <div className={styles.mainContainer}>
        <div className={styles.svgButtonContainer}>
          <SVGButton/>
        </div>
        <div className={styles.dashboardContainer}>
          {findings.map((finding,i)=>(
             <div key={i}>
                <ResultGroup finding={finding}/>
             </div>
              
          ))}
          <DashboardTab/>
        </div>
        
      </div>


    </>
  );
}
