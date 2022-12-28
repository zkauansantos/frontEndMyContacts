import HttpClient from './utils/HttpClient';

class ContactsService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async listContacts(orderBy = 'asc') {
    return this.httpClient.get(`/contacts/76852171-95c5-4540-a4b4-f4f92088d6e2?orderBy=${orderBy}`);
  }
}

export default new ContactsService();
