import styles from "../components/footer.module.scss";


function Footer() {
    return (
        <div className={styles.footer}>
            <div>
                <a href="https://github.com/GSdaBlessedFist/mixpanel-button-demo" target="blank" className="text-primary-light hover:text-white">[github]</a>
            </div>
            <div>Thank you for your consideration.</div>
        </div>
    );
}

export default Footer;