import { useState, useEffect, useRef } from 'react';
import Section from 'components/Section';
import ContactForm from './components/ContactForm';
import ContactsList from './components/ContactsList';
import Filter from './components/Filter';

function App() {
  const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
  const [contacts, setContacts] = useState(parsedContacts ?? []);
  const [filter, setFilter] = useState('');
  const isFirstRender = useRef(true);

  // useEffect(() => {
  //   // console.log('читаємо дані');
  //   const parsedContacts = JSON.parse(localStorage.getItem('contacts'));

  //   if (parsedContacts) {
  //     setContacts(parsedContacts);
  //   }
  // }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // console.log('записуємо дані');
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = contact => {
    const isContactInList = contacts.some(
      item => item.name.toLocaleLowerCase() === contact.name.toLocaleLowerCase()
    );

    isContactInList
      ? alert(`${contact.name} is already in contacts!`)
      : setContacts(contacts => [contact, ...contacts]);
  };

  const deleteContact = id => {
    setContacts(contacts => contacts.filter(contact => contact.id !== id));
  };

  const filterHandler = event => {
    const { value } = event.currentTarget;
    setFilter(value);
  };

  const filterReset = () => {
    setFilter('');
  };

  const contactFiltration = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <>
      <Section title="Phonebook">
        <ContactForm onSubmit={addContact} />
      </Section>
      <Section title="Contacts">
        <Filter
          filter={filter}
          onChange={filterHandler}
          onClick={filterReset}
        />
        <ContactsList
          contacts={contactFiltration()}
          clickHandler={deleteContact}
        ></ContactsList>
      </Section>
    </>
  );
}

export default App;
