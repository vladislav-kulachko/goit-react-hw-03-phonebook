import {Component} from 'react';
import {v4 as uuidv4} from 'uuid';
import s from './App.module.scss';
import ContactForm from './components/Form/ContactForm';
import ContactFilter from './components/Filter/ContactFilter';
import ContactList from './components/List/ContactList';

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    if (contacts) {
      this.setState({contacts: JSON.parse(contacts)});
    }
  }
  onSubmit = ({name, number}) => {
    if (this.state.contacts.find(contact => contact.number === number)) {
      alert('Этот номер уже есть в списке');
    } else if (this.state.contacts.find(contact => contact.name === name)) {
      alert('Это имя уже есть в списке');
    } else {
      this.setState(prevState => ({
        contacts: [
          {id: uuidv4(), name: name, number: number},
          ...prevState.contacts,
        ],
      }));
    }
  };
  handlerFindContact = e => {
    this.setState({filter: e.target.value});
  };
  handlerDelContact = e => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(
        contact => contact.id !== e.target.id,
      ),
    }));
  };

  render() {
    return (
      <section className={s.container}>
        <h1 className={s.title}>Phonebook</h1>
        <ContactForm onSubmit={this.onSubmit}></ContactForm>
        <section className={s.contactsSection}>
          <h2 className={s.titleList}>Contacts list</h2>
          <ContactFilter
            filterValue={this.state.filter}
            handlerFindContact={this.handlerFindContact}
          ></ContactFilter>
          <ContactList
            filter={this.state.filter}
            contacts={this.state.contacts}
            handlerDelContact={this.handlerDelContact}
          ></ContactList>
        </section>
      </section>
    );
  }
}
