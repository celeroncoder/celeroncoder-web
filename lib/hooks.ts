export const useRedirect = () => {
  return (url: string, target?: string) => {
    window.open(url, target);
  };
};
