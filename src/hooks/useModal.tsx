import { useCallback, useState } from "react";

interface UseModalOptions {
  show?: boolean;
  defaultShow?: boolean;
}

export interface UseModalReturn {
  show: boolean;
  onHide: () => void;
  onShow: () => void;
}

export const useModal = (options?: UseModalOptions): UseModalReturn => {
  const { show: defaultShow = false } = options || {};

  const [show, setShow] = useState(defaultShow);

  const onHide = useCallback(() => setShow(false), []);
  const onShow = useCallback(() => setShow(true), []);

  return {
    show,
    onHide,
    onShow,
  } as const;
};
