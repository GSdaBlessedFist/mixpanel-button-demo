"use client";
import Image from 'next/image';
import Navbar from "../components/Navbar";
import styles from "./styles/mainContainer.module.scss";
import SVGButton from "../components/SVGButton";
import { useEffect, useRef, useState } from 'react';

type HomeProps = {};

export default function Home(props: HomeProps) {

  useEffect(() => {



  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.mainContainer}>
        
      </div>


    </>
  );
}
