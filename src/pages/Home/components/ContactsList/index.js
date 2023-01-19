import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { ListHeader, Card } from './styles';
import arrow from '../../../../assets/imgs/icons/arrow.svg';
import edit from '../../../../assets/imgs/icons/edit.svg';
import trash from '../../../../assets/imgs/icons/trash.svg';

 function ContactsList({
  filteredContacts,
  orderBy,
  onToggleOrderBy,
  onDeleteContact,
}) {
 return (
   <>
     {filteredContacts.length > 0 && (
     <ListHeader order={orderBy}>
       <button
         type="button"
         onClick={onToggleOrderBy}
       >
         <span>Nome</span>
         <img src={arrow} alt="arrow" />
       </button>
     </ListHeader>
          )}

     {filteredContacts.map((contact) => (
       <Card key={contact.id}>
         <div className="info">
           <div className="contact-name">
             <strong>{contact.name}</strong>
             {contact.category.name && (
             <small>{contact.category.name}</small>
                )}
           </div>
           <span>{contact.email}</span>
           <span>{contact.phone}</span>
         </div>

         <div className="actions">
           <Link to={`/edit/${contact.id}`}>
             <img style={{ marginTop: 3 }} src={edit} alt="edit" />
           </Link>
           <button onClick={() => onDeleteContact(contact)} type="button">
             <img src={trash} alt="delete" />
           </button>
         </div>
       </Card>
          ))}

   </>

 );
}

ContactsList.propTypes = {
  filteredContacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string,
    phone: PropTypes.string,
    category: PropTypes.shape({
      name: PropTypes.string,
    }),
  })).isRequired,
  orderBy: PropTypes.string.isRequired,
  contactBeingDeleted: PropTypes.shape({
    name: PropTypes.string,
  }),
  onToggleOrderBy: PropTypes.func.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

ContactsList.defaultProps = {
  contactBeingDeleted: null,
};

export default memo(ContactsList);
