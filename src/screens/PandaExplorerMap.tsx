import React, { useEffect as usePandaEffect, useState as usePandaState } from 'react';
import {
  View as PandaBox,
  Dimensions as PandaScreen,
  TouchableOpacity as PandaButton,
  SafeAreaView as PandaSafe,
  Text as PandaLabel,
  StyleSheet,
  Image as PandaPic,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fonts as pandaFonts } from '../fonts';
import MapView, { Marker } from 'react-native-maps';
import pandaPlacesData from '../assets/pandaData/pandaPlaces';
import PandaPlaceForOpen from '../components/PandaPlaceForOpen';
import PandaOpenedPlace from '../components/PandaOpenedPlace';
import LinearGradient from 'react-native-linear-gradient';
import { Platform } from 'react-native';

type PandaMapProps = {
  setPandaPage: (page: string) => void;
};

const PandaExplorerMap: React.FC<PandaMapProps> = ({ setPandaPage }) => {
  const screenDims = PandaScreen.get('window');
  const [activePlace, setActivePlace] = usePandaState<any>(null);
  const [isPlaceOpen, setIsPlaceOpen] = usePandaState(false);
  const [visited, setVisited] = usePandaState<string[]>([]);

  usePandaEffect(() => {
    const loadVisitedPlaces = async () => {
      const rawVisited = await AsyncStorage.getItem('pandaVisitedPlaces');
      if (rawVisited) {
        try {
          setVisited(JSON.parse(rawVisited));
        } catch {
          setVisited([]);
        }
      } else {
        setVisited([]);
      }
    };
    loadVisitedPlaces();
  }, []);

  return (
    <PandaSafe style={{ flex: 1 }}>
      <PandaLabel style={{
        color: 'white',
        fontFamily: pandaFonts.legendsADLaMDisplayRegular,
        fontSize: screenDims.width * 0.07,
        marginLeft: screenDims.width * 0.05,
        fontWeight: 'bold',
        textAlign: 'left',
        alignSelf: 'flex-start'
      }}>
        Interactive map
      </PandaLabel>

      {isPlaceOpen && activePlace ? (
        <PandaOpenedPlace
          pandaPlace={activePlace}
          pandaSzs={screenDims}
          onPandaClose={() => {
            setIsPlaceOpen(false);
            setActivePlace(null);
          }}
        />
      ) : (
        <PandaBox style={{
          width: screenDims.width * 0.90546,
          backgroundColor: '#CAEBC7',
          borderWidth: screenDims.width * 0.014,
          borderColor: '#6DC167',
          height: screenDims.height * 0.7,
          alignSelf: 'center',
          marginTop: screenDims.height * 0.028056,
          overflow: 'hidden'
        }}>
          {activePlace && (
            <PandaBox style={{ marginTop: -screenDims.height * 0.03 }}>
              <PandaPlaceForOpen
                pandaPlace={activePlace}
                pandaSzs={screenDims}
                onPandaOpen={async () => {
                  if (activePlace && !visited.includes(activePlace.pandaName)) {
                    const updatedVisited = [...visited, activePlace.pandaName];
                    setVisited(updatedVisited);
                    await AsyncStorage.setItem('pandaVisitedPlaces', JSON.stringify(updatedVisited));

                    const storedStamps = await AsyncStorage.getItem('pandaStampsAmount');
                    const currentStamps = storedStamps ? Number(storedStamps) : 0;
                    await AsyncStorage.setItem('pandaStampsAmount', String(currentStamps + 1));
                  }
                  setIsPlaceOpen(true);
                }}
              />
            </PandaBox>
          )}

          <MapView
            style={{ width: '100%', height: '100%' }}
            initialRegion={{
              latitude: 30.7330,
              longitude: 104.1466,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            {pandaPlacesData.map((place, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: place.pandaCoordinates.latitude,
                  longitude: place.pandaCoordinates.longitude,
                }}
                anchor={{ x: 0.5, y: 0.5 }}
                onPress={() => {
                  setActivePlace(place);
                  setIsPlaceOpen(false);
                }}
                {...(Platform.OS !== 'android' ? {
                  // Для iOS та інших платформ: кастомний пін через дочірній елемент
                  children: (
                    <PandaPic
                      source={require('../assets/icons/pandaPin.png')}
                      style={{ width: 40, height: 40, borderRadius: 20 }}
                      resizeMode="contain"
                    />
                  )
                } : {})}
              />
            ))}
          </MapView>

          {activePlace && (
            <PandaButton
              style={{
                width: screenDims.width * 0.3,
                height: screenDims.height * 0.055,
                borderWidth: screenDims.width * 0.008,
                borderColor: '#1D4200',
                marginTop: screenDims.height * 0.01,
                overflow: 'hidden',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                position: 'absolute',
                bottom: screenDims.height * 0.03,
              }}
              onPress={() => setActivePlace(null)}
            >
              <LinearGradient
                colors={['#BD9C19', '#C0C941', '#49570C']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                locations={[0, 0.43, 1]}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  width: '100%',
                  height: '110%',
                }}
              />
              <PandaLabel style={{
                color: '#1D4200',
                fontFamily: pandaFonts.legendsADLaMDisplayRegular,
                fontSize: screenDims.width * 0.05,
                fontWeight: 'bold',
                textAlign: 'center'
              }}>
                Close
              </PandaLabel>
            </PandaButton>
          )}
        </PandaBox>
      )}
    </PandaSafe>
  );
};

export default PandaExplorerMap;
