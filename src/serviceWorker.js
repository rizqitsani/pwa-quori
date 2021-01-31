export const register = () => {
  const swURL = `${process.env.PUBLIC_URL}/sw.js`;

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(swURL);
  }
};
