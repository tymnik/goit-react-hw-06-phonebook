import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { addContact, deleteContact, setFilter } from '../store/reducer';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filter);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleFilterChange = filterValue => {
    dispatch(setFilter(filterValue));
  };

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  const handleAddContact = contact => {
    dispatch(addContact({ ...contact, id: nanoid() }));
  };

  const filteredContacts = Array.isArray(contacts)
    ? contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      )
    : [];

  return (
    <div>
      <h1 style={{ color: '#121849', fontSize: '24px', textAlign: 'center' }}>
        Phonebook
      </h1>
      <ContactForm onSubmit={handleAddContact} />
      <h2 style={{ color: '#121849', fontSize: '24px', textAlign: 'center' }}>
        Contacts
      </h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <ContactList contacts={filteredContacts} onDelete={handleDeleteContact} />
    </div>
  );
};

export default App;
