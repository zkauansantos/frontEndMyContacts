import HttpClient from './utils/HttpClient';

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  listContacts(orderBy = 'asc') {
    return this.httpClient.get(`/contacts?orderBy=${orderBy}`);
  }

  createContact(contact) {
    return this.httpClient.post('/contacts', { body: contact });
  }

  getContactById(id) {
    return this.httpClient.get(`/contacts/${id}`);
  }

  updateContact(id, contactEdited) {
    return this.httpClient.put(`/contacts/${id}`, { body: contactEdited });
  }
}

export default new ContactsService();
