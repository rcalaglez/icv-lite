
import { useEffect } from 'react';

export const useDynamicStyles = (styles: string) => {
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = styles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, [styles]);
};
