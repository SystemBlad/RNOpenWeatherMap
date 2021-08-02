import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import APPStyles from '../../../theme/styles';
import {TEMPERATURE_UNITS} from '../../../utils/enums';
import {useDispatch, useSelector} from 'react-redux';
import {getDailyForecastByCoordinates} from '../../../api/weather';
import {convertTemperature} from '../../../utils/helpers';

export type Props = {
  currentLocation: any;
};

function DailyForecast(props: Props) {
  const [dailyForecastData, setDailyForecastData] = useState([]);
  const dispatch = useDispatch();
  const temperatureUnit = useSelector(
    (state: any) => state.rootReducer.temperatureUnit,
  );

  useEffect(() => {
    if (
      props.currentLocation.latitude !== 0 &&
      props.currentLocation.longitude !== 0
    ) {
      getDailyForecastByCoordinates(
        props.currentLocation.latitude,
        props.currentLocation.longitude,
      ).then(result => {
        if (result.cod !== 200) {
          Alert.alert('Error Forecast daily', result.message, [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        }
        setDailyForecastData(result);
      });
    }
  }, [props.currentLocation]);

  return <View style={styles.DailyForecast} />;
}

const styles = StyleSheet.create({
  DailyForecast: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default DailyForecast;
