import React, { Component } from "react";
import PhoneBook from "./components/PhoneBook";
import ContactList from "./components/ContactList";
import Filter from "./components/Filter";
import { v4 as uuidv4 } from "uuid";

export default class App extends Component {
  state = {
    contacts: [],
    filter: ""
  };

  componentDidMount() {
    const prevContacts = localStorage.getItem("contacts");
    if (prevContacts) {
      this.setState({
        contacts: JSON.parse(prevContacts)
      });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  onAddContacts = (name, number) => {
    const contact = {
      id: uuidv4(),
      name,
      number
    };
    const contactCheck = this.state.contacts.some(
      contact => contact.name === name
    );
    if (contactCheck) {
      alert("exisits");
      return contact;
    } else {
      this.setState(prevState => {
        return {
          contacts: [...prevState.contacts, contact]
        };
      });
    }
  };

  changeFilter = filter => {
    this.setState({ filter });
  };

  removeContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== contactId)
      };
    });
    this.setState({ filter: "" });
  };

  visibleContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLocaleLowerCase())
    );
  };

  render() {
    const { filter } = this.state;
    const visContacts = this.visibleContacts();
    return (
      <>
        <PhoneBook onAddContact={this.onAddContacts} />
        <Filter value={filter} filterChange={this.changeFilter} />
        <ContactList contacts={visContacts} onRemove={this.removeContact} />
      </>
    );
  }
}
