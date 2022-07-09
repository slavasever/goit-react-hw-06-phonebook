import { useSelector, useDispatch } from 'react-redux';
import { addItem } from 'Redux/items/slice';
import { customAlphabet } from 'nanoid';
import { toast } from 'react-toastify';
import s from './ContactForm.module.css';

const nanoid = customAlphabet('1234567890abcdef', 5);

function ContactForm() {
  const contacts = useSelector(state => state.items);
  const dispatch = useDispatch();

  const submitHandler = event => {
    event.preventDefault();

    const form = event.currentTarget;
    const id = nanoid();
    const name = form.elements.name.value;
    const number = form.elements.number.value;
    const contact = { id, name, number };

    const isContactInList = contacts.some(
      item => item.name.toLowerCase() === name.toLowerCase()
    );

    if (isContactInList) {
      toast.warning(`"${contact.name}" is already in contacts!`);
      return;
    }
    dispatch(addItem(contact));
    form.reset();
  };

  return (
    <form onSubmit={submitHandler} className={s.form}>
      <label htmlFor="name" className={s.label}>
        Name
      </label>
      <input
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        className={s.input}
      />

      <label htmlFor="number" className={s.label}>
        Number
      </label>
      <input
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        className={s.input}
      />

      <button type="submit" className={s.button}>
        Add contact
      </button>
    </form>
  );
}

export default ContactForm;
