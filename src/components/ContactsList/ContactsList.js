import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem } from 'Redux/items/slice';
import ContactItem from 'components/ContactItem';

const ContactList = () => {
  const contacts = useSelector(state => state.items);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // console.log('записуємо дані в localStorage');
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const deleteContact = id => {
    dispatch(removeItem(id));
  };

  const contactsFiltration = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <ul>
      {contactsFiltration().map(contact => {
        const { id, name, number } = contact;

        return (
          <ContactItem
            key={id}
            id={id}
            name={name}
            number={number}
            onClick={deleteContact}
          />
        );
      })}
    </ul>
  );
};

export default ContactList;
