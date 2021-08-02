import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import APPStyles from '../../../theme/styles';
import {TEMPERATURE_UNITS} from '../../../utils/enums';
import {useDispatch, useSelector} from 'react-redux';
import {getByWeatherByGeographicCoordinates} from '../../../api/weather';
import {updateTemperatureUnit} from '../../../redux/root/actions';
import {Icity} from '../../../models/data';
import {convertTemperature} from '../../../utils/helpers';

export type Props = {
  currentLocation: any;
};

function HomeHeader(props: Props) {
  const [currentCity, setCurrentCity] = useState<Icity>({} as Icity);
  const dispatch = useDispatch();
  const temperatureUnit = useSelector(
    (state: any) => state.rootReducer.temperatureUnit,
  );

  useEffect(() => {
    if (
      props.currentLocation.latitude !== 0 &&
      props.currentLocation.longitude !== 0
    ) {
      getByWeatherByGeographicCoordinates(
        props.currentLocation.latitude,
        props.currentLocation.longitude,
      ).then(result => {
        console.log(result);
        setCurrentCity(result);
      });
    }
  }, [props.currentLocation]);

  const onPress = () => {
    dispatch(
      updateTemperatureUnit(
        temperatureUnit === TEMPERATURE_UNITS.CELSIUS
          ? TEMPERATURE_UNITS.FAHRENHEIT
          : TEMPERATURE_UNITS.CELSIUS,
      ),
    );
  };

  return (
    <View style={styles.homeHeader}>
      <View>
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
      </View>
      <TouchableOpacity style={APPStyles.button} onPress={onPress}>
        <Text>
          {temperatureUnit === TEMPERATURE_UNITS.CELSIUS ? '°C' : '°F'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  homeHeader: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default HomeHeader;
