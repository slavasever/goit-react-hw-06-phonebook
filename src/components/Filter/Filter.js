import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from 'Redux/filter/slice';
import s from './Filter.module.css';

const Filter = () => {
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const inputHandler = event => {
    const { value } = event.currentTarget;
    dispatch(setFilter(value));
  };

  const filterReset = () => {
    dispatch(setFilter(''));
  };

  return (
    <div className={s.wrapper}>
      <label htmlFor="filter" className={s.label}>
        Find contacts by name
      </label>
      <input
        type="text"
        name="filter"
        value={filter}
        className={s.input}
        onChange={inputHandler}
      />
      <button type="button" className={s.button} onClick={filterReset}>
        Clear
      </button>
    </div>
  );
};

export default Filter;
