import { ContactForm } from './ContactsForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList/ContactList';
import React from 'react';

export class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFormSubmit = e => {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const number = e.target.elements.number.value;
    if (this.state.contacts.find(el => el.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    }
    this.setState(prevState => ({
      contacts: [
        ...prevState.contacts,
        { name: name, number: number, id: `${Date.now()}` },
      ],
    }));
  };

  onSearch = () => {
    return this.state.contacts.filter(el =>
      el.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };
  onDelete = id => {
    const contacts = [...this.state.contacts];
    const newContacts = contacts.filter(el => el.id !== id);
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
