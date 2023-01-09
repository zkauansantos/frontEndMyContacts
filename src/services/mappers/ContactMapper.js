class ContactMapper {
  toPersistence(domainContact) {
    return {
      name: domainContact.name,
      phone: domainContact.phone,
      email: domainContact.email,
      category_id: domainContact.categoryId,
    };
  }

  // toDomain(persistenceContact) {
  //   return {};
  // }
}

export default new ContactMapper();
