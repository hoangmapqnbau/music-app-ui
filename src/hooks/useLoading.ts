import React from 'react';

const useLoading = (ms = 1000): [boolean, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const timeout: any = React.useRef(0);

  const handleLoading = React.useCallback(async () => {
    try {
      timeout.current = setTimeout(() => setIsLoading(false), ms);
    } catch (error) {
      console.error('Error while loading:', error);
    }
  }, [ms]);

  React.useEffect(() => {
    handleLoading();

    return () => {
      timeout.current = 0;
    };
  }, [isLoading]);

  return [isLoading, setIsLoading];
};

export default useLoading;
