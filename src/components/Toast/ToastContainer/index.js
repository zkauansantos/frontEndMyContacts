import { useState, useEffect, useCallback } from 'react';
import ToastMessage from '../ToastMessage';
import { Container } from './styles';
import { toastEventManager } from '../../../utils/toast';

export default function ToastContainer() {
  const [messages, setMessages] = useState([]);
  const [pedingRemovalMessagesIds, setPedingRemovalMessagesIds] = useState([]);

  useEffect(() => {
    function handleAddToast({ type, text, duration }) {
      setMessages((prevState) => [
        ...prevState,
        {
          id: Math.random(), text, type, duration,
        }]);
    }

    toastEventManager.on('addtoast', handleAddToast);

    return () => toastEventManager.removeListeners('addtoast', handleAddToast);
  }, []);

  const handleRemoveToast = useCallback((id) => {
    setPedingRemovalMessagesIds(
      (prevState) => [...prevState, id],
    );
  }, []);

  const handleAnimationEnd = useCallback((id) => {
    setMessages(
      (prevState) => prevState.filter((message) => message.id !== id),
    );

    setPedingRemovalMessagesIds(
      (prevState) => prevState.filter((messageId) => messageId !== id),
    );
  }, []);

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveToast={handleRemoveToast}
          isLeaving={pedingRemovalMessagesIds.includes(message.id)}
          onAnimationEnd={handleAnimationEnd}
        />
        ))}
    </Container>
  );
}
