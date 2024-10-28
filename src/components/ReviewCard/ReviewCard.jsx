import { getIcon } from "../../utils/utils";
import styles from "./ReviewCard.module.css";

const ReviewCard = ({ review }) => {
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`${styles.star} ${index < rating ? styles.filled : ""}`}
      >
        {/* <use href={`../src/assets/icons/_sprite.svg#star`} /> */}
        <use href={getIcon("star")} />
      </svg>
    ));
  };

  return (
    <div className={styles.reviewCard}>
      <div className={styles.header}>
        <div className={styles.reviewer}>
          <div className={styles.avatar}>{review.reviewer_name.charAt(0)}</div>
        </div>
        <div className={styles.rating}>
          <h3 className={styles.name}>{review.reviewer_name}</h3>
          <div className={styles.stars}>
            {renderStars(review.reviewer_rating)}
          </div>
        </div>
      </div>
      <p className={styles.comment}>{review.comment}</p>
    </div>
  );
};

export default ReviewCard;
