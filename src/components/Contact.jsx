import css from "./Contact.module.css";
import { FaUser } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteContact } from "../redux/contacts/operations";
import toast from "react-hot-toast";

const Contact = ({ contact }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(contact.id))
      .unwrap()
      .then(() => {
        toast.success("Contact deleted!", {
          duration: 2500,
          position: "top-center",
        });
      })
      .catch(() => {
        toast.error("Failed to delete contact. Please try again.", {
          duration: 2500,
          position: "top-center",
        });
      });
  };

  return (
    <div className={css.contact}>
      <div className={css.contact__container}>
        <div className={css.contact__name}>
          <FaUser className={css.contact__icon} />
          <p className={css.name}>{contact.name}</p>
        </div>
        <div className={css.contact__number}>
          <FaPhoneAlt className={css.contact__icon} />
          <p className={css.number}>{contact.number}</p>
        </div>
      </div>
      <div className={css.contact__actions}>
        <button className={css.contact__actionsBtn} onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Contact;
