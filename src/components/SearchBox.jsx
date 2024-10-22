import css from "./SearchBox.module.css";
import { useSelector, useDispatch } from "react-redux";
import { selectNameFilter } from "../redux/filters/selectors";
import { changeFilter } from "../redux/filters/slice";

const SearchBox = () => {
  const filter = useSelector(selectNameFilter);
  const dispatch = useDispatch();

  const handleFilterChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <label className={css.label}>
      Find contacts by name
      <input
        className={css.input}
        type="text"
        value={filter}
        onChange={handleFilterChange}
      />
    </label>
  );
};

export default SearchBox;
