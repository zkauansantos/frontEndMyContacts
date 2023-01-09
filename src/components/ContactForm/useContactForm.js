import {
  useEffect, useState, useImperativeHandle,
 } from 'react';
import isEmailValid from '../../utils/isEmailValid';
import useErrors from '../../hooks/useErrors';
import formatPhone from '../../utils/formatPhone';
import CategoriesServices from '../../services/CategoriesServices';
import useSafeAsyncState from '../../hooks/useSafeAsyncState';

export default function useContactForm(onSubmit, ref) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useSafeAsyncState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useSafeAsyncState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
  } = useErrors();

  const isFormValid = (name && errors.length === 0);

  useImperativeHandle(ref, () => ({
      setFieldsValues: (contact) => {
        setName(contact.name ?? '');
        setEmail(contact.email ?? '');
        setPhone(formatPhone(contact.phone ?? ''));
        setCategoryId(contact.category.id ?? '');
      },
      resetFields: () => {
        setName('');
        setEmail('');
        setPhone('');
        setCategoryId('');
      },
  }), []);

  useEffect(() => {
    async function loadCategories() {
      try {
        const categoriesList = await CategoriesServices.listCategories();

        setCategories(categoriesList);
      } catch {} finally {
        setIsLoadingCategories(false);
      }
    }

    loadCategories();
  }, [setCategories, setIsLoadingCategories]);

  function handleNameChange(event) {
    setName(event.target.value);

    if (!event.target.value) {
      setError({ field: 'name', message: 'O nome é obrigatório' });
    } else {
      removeError('name');
      }
    }

  function handleNameBlur(event) {
    if (!event.target.value) {
      setError({ field: 'name', message: 'O nome é obrigatório' });
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'Este e-mail não é válido' });
    } else {
      removeError('email');
    }
  }

  function handlePhoneChange(event) {
    setPhone(formatPhone(event.target.value));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    await onSubmit({
      name,
      email,
      phone,
      categoryId,
    });
    setIsSubmitting(false);
  }

  return {
    name,
    email,
    phone,
    categoryId,
    categories,
    isLoadingCategories,
    isFormValid,
    isSubmitting,
    handleSubmit,
    getErrorMessageByFieldName,
    handleEmailChange,
    handlePhoneChange,
    handleNameBlur,
    handleNameChange,
    setCategoryId,
  };
}
