import cities from "indian-cities-database";

export const getAllCities = () => {
  return cities.map(city => city.city);
};
