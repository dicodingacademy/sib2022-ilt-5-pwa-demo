import { getAllRestaurants } from './data-source.js';
import { renderRestaurantsList } from './dom-manipulation.js';

(async () => {
  const restaurants = await getAllRestaurants();
  renderRestaurantsList(restaurants);
})();
