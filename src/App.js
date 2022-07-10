import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Section from 'components/Section';
import ContactForm from 'components/ContactForm';
import ContactsList from 'components/ContactsList';
import Filter from 'components/Filter';

function App() {
  return (
    <>
      <Section title="Phonebook">
        <ContactForm />
      </Section>
      <Section title="Contacts">
        <Filter />
        <ContactsList />
      </Section>
      <ToastContainer autoClose={3000} theme={'colored'} />
    </>
  );
}

export default App;
