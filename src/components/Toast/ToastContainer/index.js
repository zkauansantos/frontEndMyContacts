import { useState, useEffect } from 'react';
import ToastMessage from '../ToastMessage';
import { Container } from './styles';

export default function ToastContainer() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function handleAddToast(event) {
      const { text, type } = event.detail;

      setMessages((prevState) => [
        ...prevState,
        { id: Math.random(), text, type },
        ]);
    }

    document.addEventListener('addtoast', handleAddToast);

    return () => document.removeEventListener('addtoast', handleAddToast);
  }, []);

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          type={message.type}
          text={message.text}
        />
        ))}
    </Container>
  );
}
