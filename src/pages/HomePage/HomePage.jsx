import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const navigate = useNavigate();

  const handleViewNow = () => {
    navigate("/catalog");
  };

  return (
    <div className={styles.homePage}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Campers of your dreams</h1>
          <p className={styles.description}>
            You can find everything you want in our catalog
          </p>
          <button className={styles.viewNowButton} onClick={handleViewNow}>
            View Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
