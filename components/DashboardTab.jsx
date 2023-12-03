import styles from "./dashboardTab.module.scss";

function DashboardTab() {
    return (
        <div className={styles.dashboardTab}>
            <div className="font-mono"> check out the code</div>
            <div className={styles.codeblock}>
                
            </div>
        </div>
    );
}

export default DashboardTab;