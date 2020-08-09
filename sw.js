const mapSpeedToQuality = () => {
  if (navigator.connection) {
    switch (navigator.connection.effectiveType) {
      case 'slow-2g':
      case '2g':
        return 5;
      case '3g':
        return 50;
      default:
        return 100;
    }
  }
  return 100;
};

addEventListener('fetch', (event) => {
  event.respondWith(
    new Promise(async (resolve) => {
      const url = event.request.url.replace('q_100', `q_${mapSpeedToQuality()}`);
      const request = new Request(url, event.requet);

      const response = await fetch(request);
      resolve(response);
    })
  );
});
