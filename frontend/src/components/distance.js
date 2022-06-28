navigator.geolocation.getCurrentPosition((position) => {
    Geocode.fromLatLng(
      position.coords.latitude,
      position.coords.longitude
    ).then(
      (response) => {
        const address = response.results[0].formatted_address;
        addressRef.current.value = address
        console.log("Current location address-->", address);
      },
      (error) => {
        console.error(error);
      }
    )
  })
Geocode.fromAddress("Soldiner Str. 36, 13359 Berlin, Germany").then(
    (response) => {
      const { lat, lng } = response.results[0].geometry.location;
      console.log("Current location lat & lng -->", lat, lng);
    },
    (error) => {
      console.error(error);
    }
  )
