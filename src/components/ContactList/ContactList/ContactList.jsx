import { StyledContactList } from './ContactList.styled';
import { ContactItem } from './ContactItem/ContactItem';
import PropTypes from 'prop-types';
export const ContactList = ({ contacts, onDelete }) => {
  return (
    <StyledContactList>
      {contacts.map(el => (
        <ContactItem
          id={el.id}
          name={el.name}
          number={el.number}
          onDelete={onDelete}
        />
      ))}
    </StyledContactList>
  );
};
ContactList.propTypes = {
  contacts: PropTypes.array,
  onDelete: PropTypes.func,
};
