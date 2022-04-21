async function getAllRestaurants() {
  const response = await fetch('https://restaurant-api.dicoding.dev/list');
  const { restaurants } = await response.json();
  return restaurants;
}

function getRestaurantPicture(pictureId) {
  return `https://restaurant-api.dicoding.dev/images/medium/${pictureId}`;
}

export { getAllRestaurants, getRestaurantPicture };
