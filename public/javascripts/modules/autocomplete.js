function autocomplete(input, latInput, lngInput) {
  if(!input) return;

  const dropdown = new google.maps.places.Autocomplete(input);

  dropdown.addListener('place_changed', () => {
    const place = dropdown.getPlace();
    console.log(place)
    latInput.value = place.geometry.location.lat();
    lngInput.value = place.geometry.location.lng();
  });

  // when the user hits enter on address field, prevent form submission
  input.on('keydown', (event) => {
    if(event.keyCode === 13) {
      event.preventDefault();
    }
  })
}

export default autocomplete;