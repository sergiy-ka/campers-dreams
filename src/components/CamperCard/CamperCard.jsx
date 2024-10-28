import {
  VEHICLE_FEATURES,
  VEHICLE_TRANSMISSIONS,
  VEHICLE_ENGINES,
} from "../../constants/constants";
import { formatPrice, getIcon } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../redux/slices/campersSlice";
import { selectFavorites } from "../../redux/selectors";
import styles from "./CamperCard.module.css";

const CamperCard = ({ camper, viewMode }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);
  const isFavorite = favorites.includes(camper.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    dispatch(toggleFavorite(camper.id));
  };

  const handleShowMore = () => {
    window.open(`/catalog/${camper.id}`, "_blank");
  };

  return viewMode === "grid" || viewMode === "list" ? (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={camper.gallery[0].original}
          alt={camper.name}
          className={styles.image}
        />
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.headerTitle}>
              <h2 className={styles.title}>{camper.name}</h2>
            </div>
            <div className={styles.headerFavorite}>
              <p className={styles.price}>€{formatPrice(camper.price)}</p>
              <button
                className={`${styles.favoriteButton} ${
                  isFavorite ? styles.active : ""
                }`}
                onClick={handleFavoriteClick}
                aria-label={
                  isFavorite ? "Remove from favorites" : "Add to favorites"
                }
              >
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <use href={getIcon("heart")} />
                </svg>
              </button>
            </div>
          </div>

          <div className={styles.location}>
            <div className={styles.rating}>
              <div className={styles.star}>
                <svg
                  className={styles.filled}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                >
                  <use href={getIcon("star")} />
                </svg>
              </div>
              <p className={styles.ratingValue}>{camper.rating}</p>
              <p className={styles.reviewsCount}>
                ({camper.reviews.length} Reviews)
              </p>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16">
              <use href={getIcon("map")} />
            </svg>
            <p>{camper.location}</p>
          </div>

          <p className={styles.camperDescription}>{camper.description}</p>

          <div className={styles.featuresContainer}>
            <div className={styles.features}>
              {VEHICLE_FEATURES.map((feature) =>
                camper[feature.id] ? (
                  <div key={feature.id} className={styles.feature}>
                    <svg className={styles.icon}>
                      <use href={getIcon(feature.icon)} />
                    </svg>
                    <p>{feature.label}</p>
                  </div>
                ) : null
              )}
              <div className={styles.transmission}>
                <svg className={styles.icon}>
                  <use
                    href={getIcon(
                      VEHICLE_TRANSMISSIONS.find(
                        (e) => e.id === camper.transmission
                      )?.icon || VEHICLE_TRANSMISSIONS[0].icon
                    )}
                  />
                </svg>
                <p>
                  {VEHICLE_TRANSMISSIONS.find(
                    (t) => t.id === camper.transmission
                  )?.label ||
                    camper.transmission.charAt(0).toUpperCase() +
                      camper.transmission.slice(1)}
                </p>
              </div>
              <div className={styles.engine}>
                <svg className={styles.icon}>
                  <use
                    href={getIcon(
                      VEHICLE_ENGINES.find((e) => e.id === camper.engine)
                        ?.icon || VEHICLE_ENGINES[0].icon
                    )}
                  />
                </svg>
                <p>
                  {VEHICLE_ENGINES.find((e) => e.id === camper.engine)?.label ||
                    camper.engine.charAt(0).toUpperCase() +
                      camper.engine.slice(1)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <button className={styles.showMoreButton} onClick={handleShowMore}>
          Show more
        </button>
      </div>
    </div>
  ) : (
    <div
      className={`${styles.card} ${viewMode === "list1" ? styles.list1 : ""}`}
    >
      <div
        className={`${styles.imageWrapper} ${
          viewMode === "list1" ? styles.list1 : ""
        }`}
      >
        <img
          src={camper.gallery[0].original}
          alt={camper.name}
          className={styles.image}
        />
      </div>

      <div
        className={`${styles.contentContainer} ${
          viewMode === "list1" ? styles.list1 : ""
        }`}
      >
        <div
          className={`${styles.content} ${
            viewMode === "list1" ? styles.list1 : ""
          }`}
        >
          <div className={styles.header}>
            <div className={styles.headerTitle}>
              <h2 className={styles.title}>{camper.name}</h2>
            </div>
            <div className={styles.headerFavorite}>
              <p className={styles.price}>€{formatPrice(camper.price)}</p>
              <button
                className={`${styles.favoriteButton} ${
                  isFavorite ? styles.active : ""
                }`}
                onClick={handleFavoriteClick}
                aria-label={
                  isFavorite ? "Remove from favorites" : "Add to favorites"
                }
              >
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <use href={getIcon("heart")} />
                </svg>
              </button>
            </div>
          </div>

          <div className={styles.location}>
            <div className={styles.rating}>
              <div className={styles.star}>
                <svg
                  className={styles.filled}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                >
                  <use href={getIcon("star")} />
                </svg>
              </div>
              <p className={styles.ratingValue}>{camper.rating}</p>
              <p className={styles.reviewsCount}>
                ({camper.reviews.length} Reviews)
              </p>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16">
              <use href={getIcon("map")} />
            </svg>
            <p>{camper.location}</p>
          </div>

          <p className={styles.camperDescription}>{camper.description}</p>

          <div className={styles.featuresContainer}>
            <div className={styles.features}>
              {VEHICLE_FEATURES.map((feature) =>
                camper[feature.id] ? (
                  <div key={feature.id} className={styles.feature}>
                    <svg className={styles.icon}>
                      <use href={getIcon(feature.icon)} />
                    </svg>
                    <p>{feature.label}</p>
                  </div>
                ) : null
              )}
              <div className={styles.transmission}>
                <svg className={styles.icon}>
                  <use
                    href={getIcon(
                      VEHICLE_TRANSMISSIONS.find(
                        (e) => e.id === camper.transmission
                      )?.icon || VEHICLE_TRANSMISSIONS[0].icon
                    )}
                  />
                </svg>
                <p>
                  {VEHICLE_TRANSMISSIONS.find(
                    (t) => t.id === camper.transmission
                  )?.label ||
                    camper.transmission.charAt(0).toUpperCase() +
                      camper.transmission.slice(1)}
                </p>
              </div>
              <div className={styles.engine}>
                <svg className={styles.icon}>
                  <use
                    href={getIcon(
                      VEHICLE_ENGINES.find((e) => e.id === camper.engine)
                        ?.icon || VEHICLE_ENGINES[0].icon
                    )}
                  />
                </svg>
                <p>
                  {VEHICLE_ENGINES.find((e) => e.id === camper.engine)?.label ||
                    camper.engine.charAt(0).toUpperCase() +
                      camper.engine.slice(1)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <button
          className={`${styles.showMoreButton} ${
            viewMode === "list1" ? styles.list1 : ""
          }`}
          onClick={handleShowMore}
        >
          Show more
        </button>
      </div>
    </div>
  );
};

export default CamperCard;
