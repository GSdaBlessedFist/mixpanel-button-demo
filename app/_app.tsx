import "./globals.scss";

import type { AppProps } from "next/app";
import { useEffect } from "react";
import mixpanel from "mixpanel-browser";

function MyApp({Component,pageProps}:AppProps) {
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
    return <Component {...pageProps}/>;
}

export default MyApp;
