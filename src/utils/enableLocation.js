const location = {
  latitude: 0,
  longitude: 0,
  accuracy: 0,
  hasError: false,
};

const enableLocation = () => {
  window.navigator.geolocation.getCurrentPosition(
    (pos) => {
      const crd = pos.coords;
      location.latitude = crd.latitude;
      location.longitude = crd.longitude;
      location.accuracy = crd.accuracy;
    },
    (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
      location.hasError = true;
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    },
  );

  return !location.hasError ? location : null;
}

export default enableLocation;