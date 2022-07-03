// Варіант 1
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem } from 'Redux/items/slice';
import { setFilter } from 'Redux/filter/slice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Section from 'components/Section';
import ContactForm from './components/ContactForm';
import ContactsList from './components/ContactsList';
import Filter from './components/Filter';

function App() {
  const contacts = useSelector(state => state.items);
  const filter = useSelector(state => state.filter);
  const isFirstRender = useRef(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // console.log('записуємо дані в localStorage');
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = contact => {
    const isContactInList = contacts.some(
      item => item.name.toLocaleLowerCase() === contact.name.toLocaleLowerCase()
    );

    isContactInList
      ? toast.warning(`"${contact.name}" is already in contacts!`)
      : dispatch(addItem(contact));
  };

  const deleteContact = id => {
    dispatch(removeItem(id));
  };

  const filterHandler = event => {
    const { value } = event.currentTarget;
    dispatch(setFilter(value));
  };

  const filterReset = () => {
    dispatch(setFilter(''));
  };

  const filteredContacts = () => {
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
          contacts={filteredContacts()}
          clickHandler={deleteContact}
        ></ContactsList>
      </Section>
      <ToastContainer autoClose={3000} theme={'colored'} />
    </>
  );
}

export default App;

// Варіант 2
// import { useEffect, useRef } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { addItem, removeItem, setFilter } from 'Redux/store';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Section from 'components/Section';
// import ContactForm from './components/ContactForm';
// import ContactsList from './components/ContactsList';
// import Filter from './components/Filter';

// function App() {
//   const contacts = useSelector(state => state.items);
//   const filter = useSelector(state => state.filter);
//   const isFirstRender = useRef(true);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (isFirstRender.current) {
//       isFirstRender.current = false;
//       return;
//     }
//     // console.log('записуємо дані в localStorage');
//     localStorage.setItem('contacts', JSON.stringify(contacts));
//   }, [contacts]);

//   const addContact = contact => {
//     const isContactInList = contacts.some(
//       item => item.name.toLocaleLowerCase() === contact.name.toLocaleLowerCase()
//     );

//     isContactInList
//       ? toast.warning(`"${contact.name}" is already in contacts!`)
//       : dispatch(addItem(contact));
//   };

//   const deleteContact = id => {
//     dispatch(removeItem(id));
//   };

//   const filterHandler = event => {
//     const { value } = event.currentTarget;
//     dispatch(setFilter(value));
//   };

//   const filterReset = () => {
//     dispatch(setFilter(''));
//   };

//   const filteredContacts = () => {
//     const normalizedFilter = filter.toLowerCase();

//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );
//   };

//   return (
//     <>
//       <Section title="Phonebook">
//         <ContactForm onSubmit={addContact} />
//       </Section>
//       <Section title="Contacts">
//         <Filter
//           filter={filter}
//           onChange={filterHandler}
//           onClick={filterReset}
//         />
//         <ContactsList
//           contacts={filteredContacts()}
//           clickHandler={deleteContact}
//         ></ContactsList>
//       </Section>
//       <ToastContainer autoClose={3000} theme={'colored'} />
//     </>
//   );
// }

// export default App;
