// src/components/ContactsForm/ContactsForm.jsx
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, selectContacts } from '../../redux/contactsSlice';
import styles from './ContactsForm.module.css';

const ContactsForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const initialValues = {
    name: '',
    number: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Мінімум 3 символи')
      .max(50, 'Максимум 50 символів')
      .required('Обов\'язкове поле'),
    number: Yup.string()
      .min(3, 'Мінімум 3 символи')
      .max(50, 'Максимум 50 символів')
      .required('Обов\'язкове поле'),
  });

  const handleSubmit = (values, { resetForm }) => {
    const isExist = contacts.some(
      contact => contact.name.toLowerCase() === values.name.toLowerCase()
    );
    if (isExist) {
      alert(`${values.name} вже є у телефонній книзі.`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name: values.name.trim(),
      number: values.number.trim(),
    };
    dispatch(addContact(newContact));
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form}>
        <div className={styles.fieldContainer}>
          <label htmlFor="name" className={styles.label}>
            Name
          </label>
          <Field
            type="text"
            id="name"
            name="name"
            className={styles.input}
            placeholder="Enter name"
          />
          <ErrorMessage name="name" component="div" className={styles.error} />
        </div>

        <div className={styles.fieldContainer}>
          <label htmlFor="number" className={styles.label}>
            Number
          </label>
          <Field
            type="text"
            id="number"
            name="number"
            className={styles.input}
            placeholder="Enter phone number"
          />
          <ErrorMessage name="number" component="div" className={styles.error} />
        </div>

        <button type="submit" className={styles.button}>
          Add Contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactsForm;
