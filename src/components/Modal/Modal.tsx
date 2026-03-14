import { useEffect, type ReactNode } from 'react';
import css from './Modal.module.css';

interface Props {
  children: ReactNode;
  onClose: () => void;
}

export const Modal = ({ children, onClose }: Props) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Закриваємо тільки якщо клік саме на бекдропі, а не на контенті
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>{children}</div>
    </div>
  );
};
