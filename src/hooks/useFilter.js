import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { debounce } from "../utils/utils";
import { resetCampers } from "../redux/slices/campersSlice";

export const useFilter = (onFilterApply) => {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    location: "",
    vehicleType: "",
    vehicleTransmission: "",
    vehicleEngine: "",
    features: [],
  });

  const handleFilterChange = useCallback(
    debounce((newFilters) => {
      dispatch(resetCampers());
      onFilterApply(newFilters);
    }, 500),
    [dispatch, onFilterApply]
  );

  const handleLocationChange = (location) => {
    const newFilters = {
      ...filters,
      location,
    };
    setFilters(newFilters);
    // handleFilterChange(newFilters);
  };

  const handleFeatureToggle = (feature) => {
    const newFilters = {
      ...filters,
      features: filters.features.includes(feature)
        ? filters.features.filter((f) => f !== feature)
        : [...filters.features, feature],
    };
    setFilters(newFilters);
    // handleFilterChange(newFilters);
  };

  const handleVehicleTransmissionChange = (vehicleTransmission) => {
    const newFilters = {
      ...filters,
      vehicleTransmission:
        filters.vehicleTransmission === vehicleTransmission
          ? ""
          : vehicleTransmission,
    };
    setFilters(newFilters);
    // handleFilterChange(newFilters);
  };

  const handleVehicleEngineChange = (vehicleEngine) => {
    const newFilters = {
      ...filters,
      vehicleEngine:
        filters.vehicleEngine === vehicleEngine ? "" : vehicleEngine,
    };
    setFilters(newFilters);
    // handleFilterChange(newFilters);
  };

  const handleVehicleTypeChange = (vehicleType) => {
    const newFilters = {
      ...filters,
      vehicleType: filters.vehicleType === vehicleType ? "" : vehicleType,
    };
    setFilters(newFilters);
    // handleFilterChange(newFilters);
  };

  const handleSearch = () => {
    const newFilters = {
      location: filters.location || "",
      features: filters.features || [],
      vehicleTransmission: filters.vehicleTransmission || "",
      vehicleEngine: filters.vehicleEngine || "",
      vehicleType: filters.vehicleType || "",
    };
    setFilters(newFilters);
    handleFilterChange(newFilters);
  };

  const handleReset = () => {
    const newFilters = {
      location: "",
      vehicleType: "",
      vehicleTransmission: "",
      vehicleEngine: "",
      features: [],
    };
    setFilters(newFilters);
    handleFilterChange(newFilters);
  };

  return {
    filters,
    handleLocationChange,
    handleVehicleTypeChange,
    handleVehicleTransmissionChange,
    handleVehicleEngineChange,
    handleFeatureToggle,
    handleReset,
    handleSearch,
  };
};
