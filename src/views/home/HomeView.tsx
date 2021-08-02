import React, {useCallback, useRef, useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MapView, {LatLng, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import APPStyles from '../../theme/styles';
import {getCitiesInCircle} from '../../api/weather';
import {Icity} from '../../models/data';

function HomeView() {
  const [mapIsReady, setMapIsReady] = useState(false);
  const [citiesIncircle, setCitiesIncircle] = useState<Array<Icity>>([]);
  const [myPosition, setMyPosition] = useState<LatLng>({
    latitude: 0,
    longitude: 0,
  });
  let mapViewRef = useRef(null);

  useEffect(() => {
    if (myPosition.latitude !== 0 && myPosition.longitude !== 0) {
      getCitiesInCircle(myPosition.latitude, myPosition.longitude).then(
        result => {
          setCitiesIncircle(result);
          console.log(result);
        },
      );
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

  const _renderCityMarker = (city: Icity) => {
    let marker: LatLng = {latitude: city.coord.lat, longitude: city.coord.lon};

    return (
      <Marker
        key={city.id}
        tracksViewChanges={false}
        coordinate={marker}
        title={city.name}
        description={city.name}
      />
    );
  };

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
        onUserLocationChange={onUserLocationChange}>
        {mapIsReady && citiesIncircle && citiesIncircle.length > 0
          ? citiesIncircle.map((city: Icity) => _renderCityMarker(city))
          : null}
      </MapView>
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
