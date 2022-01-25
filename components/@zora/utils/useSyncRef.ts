import { ForwardedRef, RefObject, useCallback } from "react";

/**
 * Helper function to sync forwardRefs to object refs.
 */
export function useSyncRef<T>(source: RefObject<T>, target: ForwardedRef<T>) {
  useCallback(() => {
    if (source && source.current && target) {
      if (typeof target === "function") {
        target(source.current);
      } else {
        target.current = source.current;
      }
    }
  }, [source, target]);
}
