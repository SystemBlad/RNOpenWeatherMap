import React, {useCallback, useRef, useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MapView, {LatLng, PROVIDER_GOOGLE} from 'react-native-maps';
import APPStyles from '../../theme/styles';

function HomeView() {
  const [mapIsReady, setMapIsReady] = useState(false);
  const [myPosition, setMyPosition] = useState<LatLng>({
    latitude: 0,
    longitude: 0,
  });
  let mapViewRef = useRef(null);

  useEffect(() => {
    if (myPosition.latitude !== 0 && myPosition.longitude !== 0) {
      fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=7883132d28ed57417ef54381006af2a2',
      )
        .then(response => response.json())
        .then(json => {
          console.log(json);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [myPosition]);

  const _onMapReady = useCallback(() => {
    setMapIsReady(true);
  }, []);

  const onPress = () => console.log('pressed');

  const onUserLocationChange = useCallback(
    event => {
      if (event.nativeEvent && event.nativeEvent.coordinate) {
        let mapLocal = mapViewRef;
        if (
          mapLocal.current &&
          myPosition.latitude === 0 &&
          myPosition.longitude === 0
        ) {
          console.log('onUserLocationChange');
          // @ts-ignore
          mapLocal.current.animateCamera(
            {
              center: {
                latitude: event.nativeEvent.coordinate.latitude,
                longitude: event.nativeEvent.coordinate.longitude,
              },
              pitch: 0,
              zoom: 8,
              heading: 0,
            },
            {duration: 0},
          );

          setMyPosition({
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude,
          });
        }
      }
    },
    [mapViewRef, myPosition],
  );

  return (
    <View>
      <TouchableOpacity style={APPStyles.button} onPress={onPress}>
        <Text>Temperature Unit °F: °C</Text>
      </TouchableOpacity>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={mapViewRef}
        showsUserLocation={true}
        style={mapIsReady ? styles.mapReady : styles.mapLoading}
        onMapReady={_onMapReady}
        onUserLocationChange={onUserLocationChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mapReady: {
    height: 300,
  },
  mapLoading: {
    height: 299,
  },
});

export default HomeView;
