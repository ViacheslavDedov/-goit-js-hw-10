const URL = `https://restcountries.com/`;

export const fetchCountries = () => {
    return fetch(`${URL}/v3.1/name/${name}?fields=flags,name,capital,population,languages`).then(response => {
      if (!response.ok) {
        Promise.reject(response.status);
      }
  
      return response.json();
    });
  };