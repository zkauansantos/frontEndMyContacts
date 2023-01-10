import { useEffect, useRef, useState } from 'react';

export default function useAnimatedUnmount(visible) {
  const [shouldRender, setShouldRender] = useState(visible);
  const animatedElementRef = useRef(null);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
    }

    function handleAnimationEnd() {
      setShouldRender(false);
    }
    const elementRef = animatedElementRef.current;
    if (!visible && animatedElementRef.current) {
      elementRef.addEventListener('animationend', handleAnimationEnd);
    }

    return () => elementRef && elementRef.removeEventListener('animationend', handleAnimationEnd);
  }, [visible]);

  return { shouldRender, animatedElementRef };
}
