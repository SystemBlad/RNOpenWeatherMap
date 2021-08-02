import React, {useCallback, useRef, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';
import MapView, {LatLng, Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {getCitiesInCircle} from '../../api/weather';
import {Icity} from '../../models/data';
import {convertTemperature} from '../../utils/helpers';
import {useSelector} from 'react-redux';
import HomeHeader from './components/HomeHeader';
import {navigateToDetails} from '../../navigation/actions';
import APPStyles from '../../theme/styles';
import {TEMPERATURE_UNITS} from '../../utils/enums';

function HomeView() {
  const [mapIsReady, setMapIsReady] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [citiesIncircle, setCitiesIncircle] = useState<Array<Icity>>([]);
  const [myPosition, setMyPosition] = useState<LatLng>({
    latitude: 0,
    longitude: 0,
  });
  const mapViewRef = useRef(null);
  const textInputRef = useRef(null);

  const temperatureUnit = useSelector(
    (state: any) => state.rootReducer.temperatureUnit,
  );

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

  const cityPressed = useCallback(event => {
    console.log('markerClick', {cityId: event.nativeEvent.id});
    navigateToDetails({cityId: event.nativeEvent.id});
  }, []);

  const _renderCityMarker = (city: Icity) => {
    let marker: LatLng = {latitude: city.coord.lat, longitude: city.coord.lon};

    return (
      <Marker
        key={city.id.toString()}
        identifier={city.id.toString()}
        tracksViewChanges={false}
        coordinate={marker}
        title={city.name}
        onPress={cityPressed}
        description={convertTemperature(
          city.main.temp,
          temperatureUnit,
        ).toString()}
      />
    );
  };

  const renderItem = (event: any) => (
    <TouchableOpacity style={styles.item}>
      <Text style={styles.title}>{event.item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      {!isSearchMode ? <HomeHeader currentLocation={myPosition} /> : null}
      <View style={isSearchMode ? styles.containerFull : styles.container}>
        <TextInput
          onFocus={() => setIsSearchMode(true)}
          onChangeText={search => setSearchText(search)}
          style={styles.searchBar}
          placeholder={'Search city'}
          value={searchText}
          ref={textInputRef}
        />
        {isSearchMode ? (
          <TouchableOpacity
            style={[
              APPStyles.button,
              {position: 'absolute', top: 5, right: 10},
            ]}
            onPress={() => {
              setIsSearchMode(false);
              // @ts-ignore
              textInputRef.current.blur();
              setSearchText('');
            }}>
            <Text>{'X'}</Text>
          </TouchableOpacity>
        ) : null}
        <FlatList
          data={
            searchText
              ? citiesIncircle.filter(listItem =>
                  listItem.name
                    .toLowerCase()
                    .includes(searchText.toLowerCase()),
                )
              : null
          }
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
      {!isSearchMode ? (
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
      ) : null}
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
  searchBar: {
    fontSize: 20,
    margin: 10,
    width: '90%',
    height: 50,
    backgroundColor: 'white',
  },
  container: {
    alignItems: 'center',
  },
  containerFull: {
    alignItems: 'center',
    height: 600,
    width: '100%',
    backgroundColor: '#DDDDDD',
  },
  item: {
    backgroundColor: 'white',
    padding: 5,
    marginVertical: 4,
    width: 250,
  },
  title: {
    fontSize: 20,
  },
});

export default HomeView;
