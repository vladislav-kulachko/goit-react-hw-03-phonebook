import {Component} from 'react';
import s from './ContactForm.module.css';
export default class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };
  handlerContactAdd = e => {
    this.setState({[e.target.name]: e.target.value});
  };
  handlerSubmitFormClick = e => {
    const {name, number} = this.state;
    if (name !== '' && number !== '') {
      e.preventDefault();
      this.props.onSubmit(this.state);
      this.setState({name: '', number: ''});
    }
  };
  handlerSubmitFormEnter = e => {
    const {name, number} = this.state;
    if (e.key === 'Enter' && name !== '' && number !== '') {
      e.preventDefault();
      this.props.onSubmit(this.state);
      this.setState({name: '', number: ''});
    }
  };
  render() {
    return (
      <form
        className={s.form}
        onSubmit={this.handlerSubmitFormClick}
        onKeyPress={this.handlerSubmitFormEnter}
      >
        <label className={s.label}>
          Name
          <input
            className={s.input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
            value={this.state.name}
            onChange={this.handlerContactAdd}
          />
        </label>
        <label className={s.label}>
          Number
          <input
            className={s.input}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
            value={this.state.number}
            onChange={this.handlerContactAdd}
          />
        </label>
        <button className={s.button} type="submit">
          Add Contact
        </button>
      </form>
    );
  }
}
