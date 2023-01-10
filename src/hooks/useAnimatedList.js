import { useCallback, useState } from 'react';

export default function useAnimatedList() {
  const [items, setItems] = useState([]);
  const [pedingRemovalItemsIds, setPedingRemovalItemsIds] = useState([]);

  const handleRemoveItem = useCallback((id) => {
    setPedingRemovalItemsIds(
      (prevState) => [...prevState, id],
    );
  }, []);

  const handleAnimationEnd = useCallback((id) => {
    setItems(
      (prevState) => prevState.filter((item) => item.id !== id),
    );
    setPedingRemovalItemsIds(
      (prevState) => prevState.filter((itemId) => itemId !== id),
    );
  }, []);

  const renderList = useCallback((renderItem) => (
    items.map((item) => renderItem(item, {
      isLeaving: pedingRemovalItemsIds.includes(item.id),
    }))
  ), [items, pedingRemovalItemsIds]);

  return {
    items,
    handleRemoveItem,
    handleAnimationEnd,
    setItems,
    renderList,
  };
}
