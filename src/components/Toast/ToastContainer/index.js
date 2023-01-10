import { useEffect } from 'react';
import ToastMessage from '../ToastMessage';
import { Container } from './styles';
import { toastEventManager } from '../../../utils/toast';
import useAnimatedList from '../../../hooks/useAnimatedList';

export default function ToastContainer() {
  const {
    setItems: setMessages,
    handleRemoveItem: handleRemoveToast,
    handleAnimationEnd,
    renderList,
  } = useAnimatedList();

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
  }, [setMessages]);

  return (
    <Container>
      {renderList((message, { isLeaving }) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveToast={handleRemoveToast}
          isLeaving={isLeaving}
          onAnimationEnd={handleAnimationEnd}
        />
    ))}
    </Container>
  );
}
