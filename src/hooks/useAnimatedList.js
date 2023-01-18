import {
 createRef, useCallback, useRef, useState,
} from 'react';

export default function useAnimatedList() {
  const [items, setItems] = useState([]);
  const [pedingRemovalItemsIds, setPedingRemovalItemsIds] = useState([]);
  const animatedRefs = useRef(new Map());

  const handleRemoveItem = useCallback((id) => {
    setPedingRemovalItemsIds(
      (prevState) => [...prevState, id],
    );
  }, []);

  // const handleAnimationEnd = useCallback((id) => {
  //   setItems(
  //     (prevState) => prevState.filter((item) => item.id !== id),
  //   );

  //   setPedingRemovalItemsIds(
  //     (prevState) => prevState.filter((itemId) => itemId !== id),
  //   );
  // }, []);

  const getAnimatedRef = useCallback((itemId) => {
    let animatedRef = animatedRefs.current.get(itemId);

    if (!animatedRef) {
      animatedRef = createRef();
      animatedRefs.current.set(itemId, animatedRef);
    }
    return animatedRef;
  }, []);

  const renderList = useCallback((renderItem) => (
    items.map((item) => {
      const isLeaving = pedingRemovalItemsIds.includes(item.id);
      const animatedRef = getAnimatedRef(item.id);

      return renderItem(item, { isLeaving, animatedRef });
    })
  ), [items, pedingRemovalItemsIds, getAnimatedRef]);

  return {
    items,
    handleRemoveItem,
    // handleAnimationEnd,
    setItems,
    renderList,
  };
}
