import { NavLink } from "react-router-dom";
import { getIcon } from "../../utils/utils";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.logo}>
          <svg className={styles.logoIcon}>
            {/* <use href="../src/assets/icons/_sprite.svg#logo"></use> */}
            <use href={getIcon("logo")}></use>
          </svg>
        </NavLink>
        <nav className={styles.nav}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/catalog"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            Catalog
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
