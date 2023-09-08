import { ContactForm } from './ContactsForm/ContactForm';
import { Filter } from './ContactList/Filter';
import { ContactList } from './ContactList/ContactList';
import React from 'react';

export class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    name: '',
    number: '',
    filter: '',
  };

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  reset = e => {
    this.setState({ name: '', number: '' });
    e.target.elements.name.value = '';
    e.target.elements.number.value = '';
  };

  onFormSubmit = e => {
    e.preventDefault();
    this.setState(prevState => ({
      contacts: [
        ...prevState.contacts,
        { name: prevState.name, number: prevState.number, id: Date.now() },
      ],
    }));
    this.reset(e);
  };

  onSearch = e => {
    this.setState({ filter: e.target.value });
    console.log(this.state.filter);
    this.setState({
      contacts: this.state.contacts.filter(el =>
        el.name.includes(this.state.filter)
      ),
    });
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
        <Filter onSearch={this.onSearch} />
        <ContactList contacts={this.state.contacts} />
      </div>
    );
  }
}
