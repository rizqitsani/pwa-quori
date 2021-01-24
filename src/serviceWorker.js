export const register = () => {
  const swURL = `${process.env.PUBLIC_URL}/sw.js`;

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register(swURL)
      .then(() => console.log('service worker registered'))
      .catch(() => console.log('service worker not registered'));
  }
};
