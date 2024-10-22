import ContactForm from "../components/ContactForm";
import ContactList from "../components/ContactList";
import SearchBox from "../components/SearchBox";
import css from "./ContactsPage.module.css";

const ContactsPage = () => {
  return (
    <div className={css.container}>
      <h1>Contacts</h1>
      <ContactForm />
      <SearchBox />
      <ContactList />
    </div>
  );
};

export default ContactsPage;
