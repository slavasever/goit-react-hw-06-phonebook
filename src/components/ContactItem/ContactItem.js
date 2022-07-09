import { useDispatch } from 'react-redux';
import { removeItem } from 'Redux/items/slice';
import PropTypes from 'prop-types';
import s from './ContactItem.module.css';

const ContactItem = ({ id, name, number }) => {
  const dispatch = useDispatch();

  const deleteContact = id => {
    dispatch(removeItem(id));
  };

  return (
    <li className={s.item}>
      <p className={s.text}>
        - {name}: {number}
      </p>
      <button
        type="button"
        className={s.button}
        onClick={() => {
          deleteContact(id);
        }}
      >
        Delete
      </button>
    </li>
  );
};

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};

export default ContactItem;
