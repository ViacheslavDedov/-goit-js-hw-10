const BASE_URL = `https://restcountries.com`;

export const fetchCountries = (name) => {
  return fetch(`${BASE_URL}/v3.1/name/${name}?fields=flags,name,capital,population,languages`).then(response => {
    if (!response.ok) {
      Promise.reject(response.status);
    }

    return response.json();
  });
}; 