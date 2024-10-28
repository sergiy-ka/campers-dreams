import {
  VEHICLE_TYPES,
  VEHICLE_FEATURES,
  VEHICLE_TRANSMISSIONS,
  VEHICLE_ENGINES,
} from "../../constants/constants";
import { getIcon } from "../../utils/utils";
import { useFilter } from "../../hooks/useFilter";
import styles from "./FilterBar.module.css";

const FilterBar = ({ onFilterApply }) => {
  const {
    filters,
    handleLocationChange,
    handleVehicleTypeChange,
    handleVehicleTransmissionChange,
    handleVehicleEngineChange,
    handleFeatureToggle,
    handleSearch,
    handleReset,
  } = useFilter(onFilterApply);

  return (
    <div className={styles.filterBar}>
      <div className={styles.section}>
        <p>Location</p>
        <div className={styles.location}>
          <svg className={styles.icon20}>
            {/* <use href="./src/assets/icons/_sprite.svg#map" /> */}
            <use href={getIcon("map")} />
          </svg>
          <input
            type="text"
            placeholder="City, Country"
            value={filters.location}
            onChange={(e) => handleLocationChange(e.target.value)}
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.section}>
        <p>Filters</p>
      </div>

      <div className={styles.section}>
        <label className={styles.label}>Vehicle equipment</label>
        <div className={styles.tabs}></div>
        <div className={styles.vehicleFeatures}>
          {VEHICLE_FEATURES.map((feature) => (
            <button
              key={feature.id}
              className={`${styles.featureButton} ${
                filters.features.includes(feature.id) ? styles.active : ""
              }`}
              onClick={() => handleFeatureToggle(feature.id)}
            >
              <svg className={styles.icon}>
                <use href={getIcon(feature.icon)} />
              </svg>
              {feature.label}
            </button>
          ))}
        </div>

        <div className={styles.section}>
          <select
            className={styles.select}
            value={filters.vehicleTransmission}
            onChange={(e) => handleVehicleTransmissionChange(e.target.value)}
          >
            <option value="">Select transmission</option>
            {VEHICLE_TRANSMISSIONS.map((transmission) => (
              <option key={transmission.id} value={transmission.id}>
                {transmission.label}
              </option>
            ))}
          </select>
          <select
            className={styles.select}
            value={filters.vehicleEngine}
            onChange={(e) => handleVehicleEngineChange(e.target.value)}
          >
            <option value="">Select engine</option>
            {VEHICLE_ENGINES.map((engine) => (
              <option key={engine.id} value={engine.id}>
                {engine.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.section}>
          <label className={styles.label}>Vehicle type</label>
          <div className={styles.tabs}></div>
          <div className={styles.vehicleTypes}>
            {VEHICLE_TYPES.map((type) => (
              <button
                key={type.id}
                className={`${styles.typeButton} ${
                  filters.vehicleType === type.id ? styles.active : ""
                }`}
                onClick={() => handleVehicleTypeChange(type.id)}
              >
                <svg className={styles.icon}>
                  <use href={getIcon(type.icon)} />
                </svg>
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.searchButton} onClick={handleSearch}>
          Search
        </button>
        <button className={styles.resetButton} onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
