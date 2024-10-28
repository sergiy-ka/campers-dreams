import { useState } from "react";
import styles from "./BookingForm.module.css";

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bookingDate: "",
    comment: "",
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [isDateSelected, setIsDateSelected] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "bookingDate" && value) {
      setIsDateSelected(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Валідація полів форми
    // TBD

    // Імітація відправки даних на сервер
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        bookingDate: "",
        comment: "",
      });
      setIsDateSelected(false);

      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Booking error:", error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.title}>Book your campervan now</h3>
      <p className={styles.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <div className={styles.grid}>
        <div className={styles.field}>
          <label htmlFor="name"></label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Name*"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="email"></label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Email*"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="phone"></label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="Phone*"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="bookingDate"></label>
          <input
            type={isDateSelected ? "date" : "text"}
            id="bookingDate"
            name="bookingDate"
            value={formData.bookingDate}
            onChange={handleChange}
            onFocus={() => setIsDateSelected(true)}
            placeholder="Booking date*"
            onBlur={() => {
              if (!formData.bookingDate) setIsDateSelected(false);
            }}
            required
          />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="comment"></label>
        <textarea
          id="comment"
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          rows="4"
          placeholder="Comment"
          style={{ resize: "none" }}
        />
      </div>

      <button type="submit" className={styles.submitButton}>
        Send
      </button>

      {isSuccess && (
        <div className={styles.success}>
          Booking successful! We will contact you soon.
        </div>
      )}
    </form>
  );
};

export default BookingForm;
