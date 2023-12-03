"use client";
import { useEffect } from "react";
import styles from "./resultGroup.module.scss";

function ResultGroup({ finding }) {
    useEffect(() => {
        
    }, [])

    return (<>
        <div className={styles.resultGroup}>
            <NumberDisplay result={finding.result}/>
            <QueryDisplay query={finding.query} />
        </div>
    </>);
}


function NumberDisplay({result}) {
    return (<>
        <div className={styles.numberDisplay}>
            {result}
        </div>
    </>)
}

function QueryDisplay({ query }) {
    return (<>
        <div className={styles.queryDisplay}>
            {query}
        </div>
    </>)
}


export default ResultGroup;