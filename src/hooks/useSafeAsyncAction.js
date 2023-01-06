import { useCallback } from 'react';
import useIsMounted from './useIsMounted';

export default function useSafeAsyncAction() {
  const isMounted = useIsMounted();

  const runSafeAsyncAction = useCallback((callBack) => {
    if (isMounted()) {
      callBack();
    }
  }, [isMounted]);

  return runSafeAsyncAction;
}
