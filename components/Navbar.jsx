import Link from "next/link";
import styles from "./navbar.module.scss";

function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.title}>Mixpanel <span className="relative text-lg top-2 opacity-50">demo</span></div>
            <div className={styles.navMenu}>
                
                <div className="menuItem">
                    <Link href="/">
                        resum&eacute;
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;