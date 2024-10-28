import {
  VEHICLE_DETAILS,
  VEHICLE_FEATURES,
  VEHICLE_TRANSMISSIONS,
  VEHICLE_ENGINES,
} from "../../constants/constants";
import { formatPrice, getIcon } from "../../utils/utils";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCamperById } from "../../redux/operations";
import { selectCurrentCamper, selectIsLoading } from "../../redux/selectors";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import BookingForm from "../../components/BookingForm/BookingForm";
import styles from "./DetailPage.module.css";

const DetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const camper = useSelector(selectCurrentCamper);
  const isLoading = useSelector(selectIsLoading);
  const [activeTab, setActiveTab] = useState("features");

  useEffect(() => {
    dispatch(fetchCamperById(id));
  }, [dispatch, id]);

  if (isLoading || !camper) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.detailPage}>
      <div className={styles.container}>
        <div className={styles.gallery}>
          <h2 className={styles.camperTitle}>{camper.name}</h2>
          
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

            <svg width="20" height="20">
              <use href={getIcon("map")} />
            </svg>
            {camper.location}
          </div>

          <p className={styles.price}>€{formatPrice(camper.price)}</p>

          <div className={styles.thumbnails}>
            {camper.gallery.map((image, index) => (
              <div key={index} className={styles.thumbnail}>
                <img
                  src={image.thumb}
                  alt={`${camper.name} view ${index + 1}`}
                />
              </div>
            ))}
          </div>
          <p className={styles.camperDescription}>{camper.description}</p>
        </div>

        <div className={styles.content}>

          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${
                activeTab === "features" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("features")}
            >
              Features
            </button>
            <button
              className={`${styles.tab} ${
                activeTab === "reviews" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews
            </button>
          </div>

          {activeTab === "features" && (
            <div className={styles.features}>
              <div className={styles.section}>

                <div className={styles.featuresContainer}>
                  <div className={styles.featuresItems}>
                    {VEHICLE_FEATURES.map((feature) =>
                      camper[feature.id] ? (
                        <div key={feature.id} className={styles.feature}>
                          <svg className={styles.icon}>
                            <use
                              href={getIcon(feature.icon)}
                            />
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
                        {VEHICLE_ENGINES.find((e) => e.id === camper.engine)
                          ?.label ||
                          camper.engine.charAt(0).toUpperCase() +
                            camper.engine.slice(1)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Vehicle Details</h2>
                <div className={styles.tabs}></div>
                <div className={styles.detailsGrid}>
                  {VEHICLE_DETAILS.map((detail) =>
                    camper[detail.id] ? (
                      <div key={detail.label} className={styles.detailItem}>
                        <span className={styles.label}>{detail.label}</span>
                        <span className={styles.value}>
                          {camper[detail.id].charAt(0).toUpperCase() +
                            camper[detail.id].slice(1)}
                        </span>
                      </div>
                    ) : null
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className={styles.reviews}>
              {camper.reviews.map((review, index) => (
                <ReviewCard key={index} review={review} />
              ))}
            </div>
          )}
        </div>

        <aside className={styles.sidebar}>
          <BookingForm camper={camper} />
        </aside>
      </div>
    </div>
  );
};

export default DetailPage;
