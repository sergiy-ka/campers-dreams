import icons from "../assets/icons/_sprite.svg";

export const formatPrice = (price) => {
  return Math.round(price);
};

// export const createFilterParams = (filters) => {
//   const params = new URLSearchParams();

//   if (filters.location) {
//     params.append("location", filters.location);
//   }

//   if (filters.vehicleType) {
//     params.append("form", filters.vehicleType.toLowerCase());
//   }

//   filters.features.forEach((feature) => {
//     params.append(feature.toLowerCase(), "true");
//   });

//   return params;
// };

export const debounce = (func, wait) => {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const getIcon = (name) => {
  return `${icons}#${name}`;
};
