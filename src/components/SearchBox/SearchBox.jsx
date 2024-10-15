import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilter, selectNameFilter } from '../../redux/filtersSlice';
import styles from './SearchBox.module.css';

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);

  const handleChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={styles.searchBox}>
      <label htmlFor="filter" className={styles.label}>
        Find contacts by name
      </label>
      <input
        type="text"
        id="filter"
        value={filter}
        onChange={handleChange}
        className={styles.input}
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBox;
