import s from './ContactFilter.module.scss';
export default function ContactFilter({filterValue, handlerFindContact}) {
  return (
    <label className={s.label}>
      Find contact by name
      <input
        className={s.input}
        name="find"
        title="Введите имя или название контакта"
        value={filterValue}
        onChange={handlerFindContact}
      />
    </label>
  );
}
