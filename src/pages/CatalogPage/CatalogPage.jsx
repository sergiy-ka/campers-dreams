import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/operations";
import { resetCampers } from "../../redux/slices/campersSlice";
import {
  selectCampers,
  selectIsLoading,
  selectHasMore,
  selectCurrentPage,
} from "../../redux/selectors";
import FilterBar from "../../components/FilterBar/FilterBar";
import CamperCard from "../../components/CamperCard/CamperCard";
import { getIcon } from "../../utils/utils";
import styles from "./CatalogPage.module.css";

const initialFilters = {
  location: "",
  vehicleType: "",
  vehicleTransmission: "",
  vehicleEngine: "",
  features: [],
};

const CatalogPage = () => {
  const dispatch = useDispatch();
  const campers = useSelector(selectCampers);
  const isLoading = useSelector(selectIsLoading);
  const hasMore = useSelector(selectHasMore);
  const currentPage = useSelector(selectCurrentPage);
  const [viewMode, setViewMode] = useState("grid");
  const [currentFilters, setCurrentFilters] = useState(initialFilters);

  const loadCampers = useCallback(
    (page, filters = initialFilters) => {
      dispatch(
        fetchCampers({
          page,
          limit: 4,
          filter: {
            location: filters.location,
            form: filters.vehicleType ? filters.vehicleType : "",
            ...(filters.features || []).reduce(
              (acc, feature) => ({
                ...acc,
                [feature]: true,
              }),
              {}
            ),
            transmission: filters.vehicleTransmission
              ? filters.vehicleTransmission
              : "",
            ...(filters.features || []).reduce(
              (acc, feature) => ({
                ...acc,
                [feature]: true,
              }),
              {}
            ),
            engine: filters.vehicleEngine ? filters.vehicleEngine : "",
            ...(filters.features || []).reduce(
              (acc, feature) => ({
                ...acc,
                [feature]: true,
              }),
              {}
            ),
          },
        })
      );
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(resetCampers());
    loadCampers(1, initialFilters);

    return () => {
      dispatch(resetCampers());
    };
  }, [dispatch, loadCampers]);

  const handleFilterApply = useCallback(
    (filters) => {
      dispatch(resetCampers());
      setCurrentFilters(filters);
      loadCampers(1, filters);
    },
    [dispatch, loadCampers]
  );

  const handleLoadMore = useCallback(() => {
    loadCampers(currentPage + 1, currentFilters);
  }, [currentPage, currentFilters, loadCampers]);

  const toggleViewMode = (mode) => {
    setViewMode(mode);
  };

  return (
    <div className={styles.catalogPage}>
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <FilterBar onFilterApply={handleFilterApply} />
        </aside>

        <div className={styles.content}>
          <div className={styles.toolbar}>
            <div className={styles.results}>
              {campers.length} {campers.length === 1 ? "camper" : "campers"}{" "}
              found
            </div>
            <div className={styles.viewToggle}>
              <button
                className={`${styles.viewButton} ${
                  viewMode === "grid" ? styles.active : ""
                }`}
                onClick={() => toggleViewMode("grid")}
                aria-label="Grid view"
              >
                <svg width="24" height="24">
                  <use href={getIcon("grid_4")}></use>
                </svg>
              </button>
              <button
                className={`${styles.viewButton} ${
                  viewMode === "list" ? styles.active : ""
                }`}
                onClick={() => toggleViewMode("list")}
                aria-label="List view"
              >
                <svg width="24" height="24">
                  <use href={getIcon("grid_2")} />
                </svg>
              </button>
              <button
                className={`${styles.viewButton} ${
                  viewMode === "list1" ? styles.active : ""
                }`}
                onClick={() => toggleViewMode("list1")}
                aria-label="List view"
              >
                <svg width="24" height="24">
                  <use href={getIcon("list1")} />
                </svg>
              </button>
            </div>
          </div>

          <div className={`${styles.campersGrid} ${styles[viewMode]}`}>
            {campers.map((camper, index) => (
              <CamperCard
                key={`${camper.id}-${index}`}
                camper={camper}
                viewMode={viewMode}
              />
            ))}
          </div>

          {isLoading && (
            <div className={styles.loader}>
              <div className={styles.spinnerWrapper}>
                <div className={styles.spinner}></div>
              </div>
              <p>Loading campers...</p>
            </div>
          )}

          {hasMore && !isLoading && campers.length > 0 && (
            <button
              className={styles.loadMoreButton}
              onClick={handleLoadMore}
              disabled={isLoading}
            >
              Load more
            </button>
          )}

          {!isLoading && campers.length === 0 && (
            <div className={styles.noResults}>
              <div className={styles.noResultsContent}>
                <h2>No results found</h2>
                <p>Try adjusting your search filters or browse all campers</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
