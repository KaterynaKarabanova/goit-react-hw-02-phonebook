import { ContactForm } from './ContactsForm/ContactForm';
import { Filter } from './ContactList/Filter/Filter';
import { ContactList } from './ContactList/ContactList/ContactList';
import React from 'react';

export class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.name);
  };

  reset = e => {
    this.setState({ name: '', number: '' });
    e.target.elements.name.value = '';
    e.target.elements.number.value = '';
  };

  onFormSubmit = e => {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const isInclude = this.state.contacts.filter(el => el.name === name);
    if (isInclude.length !== 0) {
      alert(`${name} is already in contacts`);
      return;
    }
    this.setState(prevState => ({
      contacts: [
        ...prevState.contacts,
        { name: prevState.name, number: prevState.number, id: `${Date.now()}` },
      ],
    }));
    this.reset(e);
  };

  onSearch = () => {
    return this.state.contacts.filter(el =>
      el.name.toLowerCase().includes(this.state.filter)
    );
  };
  onDelete = id => {
    const newContacts = this.onSearch().filter(el => el.id !== id);
    this.setState({ contacts: newContacts });
  };
  render() {
    return (
      <div
        style={{
          height: '100vh',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm
          onInputChange={this.onInputChange}
          onFormSubmit={this.onFormSubmit}
        />
        <h2>Contacts</h2>
        <Filter onChange={this.onInputChange} />
        <ContactList contacts={this.onSearch()} onDelete={this.onDelete} />
      </div>
    );
  }
}
