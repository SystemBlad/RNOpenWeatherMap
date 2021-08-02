import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import APPStyles from '../../theme/styles';
import {goBack} from '../../navigation/actions';
import {getWeatherByCityId} from '../../api/weather';
import {Icity} from '../../models/data';
import {convertTemperature} from '../../utils/helpers';
import {useSelector} from 'react-redux';

export interface IProps {
  route: any;
}

function DetailsView(props: IProps) {
  const [currentCity, setCurrentCity] = useState<Icity>({} as Icity);
  const temperatureUnit = useSelector(
    (state: any) => state.rootReducer.temperatureUnit,
  );

  const onPress = () => {
    goBack();
  };

  useEffect(() => {
    if (props.route && props.route.params.cityId) {
      getWeatherByCityId(props.route.params.cityId).then(result => {
        console.log(result);
        setCurrentCity(result);
      });
    }
  }, [props.route]);

  return (
    <View style={styles.details}>
      <Text>
        {'Current Temperature: ' +
          (currentCity.main
            ? convertTemperature(
                currentCity.main.temp,
                temperatureUnit,
              ).toString()
            : '')}
      </Text>
      <Text>
        {'Thermal sensation: ' +
          (currentCity.main
            ? convertTemperature(
                currentCity.main.feels_like,
                temperatureUnit,
              ).toString()
            : '')}
      </Text>
      <Text>
        {'temp_max: ' +
          (currentCity.main
            ? convertTemperature(
                currentCity.main.temp_max,
                temperatureUnit,
              ).toString()
            : '')}
      </Text>
      <Text>
        {'temp_min: ' +
          (currentCity.main
            ? convertTemperature(
                currentCity.main.temp_min,
                temperatureUnit,
              ).toString()
            : '')}
      </Text>
      <Text>
        {'Humidity: ' +
          (currentCity.main ? currentCity.main.humidity.toString() : '')}
      </Text>
      <Text>
        {'grnd_level: ' +
          (currentCity.main && currentCity.main.grnd_level
            ? currentCity.main.grnd_level.toString()
            : '')}
      </Text>
      <Text>
        {'sea_level: ' +
          (currentCity.main && currentCity.main.sea_level
            ? currentCity.main.sea_level.toString()
            : '')}
      </Text>
      <Text>
        {'pressure: ' +
          (currentCity.main ? currentCity.main.pressure.toString() : '')}
      </Text>
      <TouchableOpacity style={APPStyles.button} onPress={onPress}>
        <Text>{'Go Back'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  details: {
    margin: 10,
  },
});

export default DetailsView;
