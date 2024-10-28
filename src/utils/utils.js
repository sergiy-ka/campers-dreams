import icons from "../assets/icons/_sprite.svg";

export const formatPrice = (price) => {
  return Math.round(price);
};

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
