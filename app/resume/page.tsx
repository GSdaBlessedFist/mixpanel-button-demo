import Head from "next/head";

function Resume() {
    return (<>
        <Head>
            <title>Jason Zamora - Support Engineer</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="w-full lg:w-2/3 mx-auto">
            <iframe width="90%" height="900px" frameBorder="0" src="/Jason_Zamora(Mixpanel Support Engineer).pdf"/>
        </div>    
    </>);
}

export default Resume;