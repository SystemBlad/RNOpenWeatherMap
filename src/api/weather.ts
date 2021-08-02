import {baseUrl, openWeatherKey} from '../utils/constants';

export const getCitiesInCircle = (latitude: number, longitude: number) => {
  let URL = `${baseUrl}/find?lat=${latitude}&lon=${longitude}&cnt=${20}&appid=${openWeatherKey}`;
  console.log(URL);
  return fetch(URL)
    .then(response => response.json())
    .then(json => {
      console.log(json);
      return json.list;
    })
    .catch(error => {
      console.error(error);
    });
};
