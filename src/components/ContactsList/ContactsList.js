// import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ContactItem from 'components/ContactItem';

const ContactList = () => {
  const contacts = useSelector(state => state.items);
  const filter = useSelector(state => state.filter);

  // useEffect(() => {
  //   // console.log('записуємо дані в localStorage');
  //   localStorage.setItem('contacts', JSON.stringify(contacts));
  // }, [contacts]);

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

        return <ContactItem key={id} id={id} name={name} number={number} />;
      })}
    </ul>
  );
};

export default ContactList;
