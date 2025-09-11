import {
  TouchableOpacity as PandaTouchable,
  Share as PandaShare,
  SafeAreaView as PandaSafeArea,
  Dimensions as PandaDims,
  ImageBackground as PandaBg,
  Image as PandaImage,
  Text as PandaText,
  StyleSheet as PandaStyle,
  View as PandaView,
  Platform,
} from 'react-native';
import PandaPlaceForOpen from '../components/PandaPlaceForOpen';
import { fonts as pandaFonts } from '../fonts';
import LinearGradient from 'react-native-linear-gradient';
import React, { useEffect as usePandaEffect, useState as usePandaState } from 'react';
import pandaFactsData from '../assets/pandaData/pandaFacts';
import pandaPlacesData from '../assets/pandaData/pandaPlaces';
import PandaOpenedPlace from '../components/PandaOpenedPlace';

const PandaMainHomeCont: React.FC = () => {
  
  const [openedPlace, setOpenedPlace] = usePandaState(false);
  const [highlightPlace, setHighlightPlace] = usePandaState<typeof pandaPlacesData[0] | null>(null);
  const pandaScreen = PandaDims.get('window');
  usePandaEffect(() => {
    const randomPick = pandaPlacesData[Math.floor(Math.random() * pandaPlacesData.length)];
    setHighlightPlace(randomPick);
  }, []);

  const getDailyPandaFact = () => {
    const now = new Date();
    const yearStart = new Date(now.getFullYear(), 0, 1);
    const dayIdx = Math.floor((now.getTime() - yearStart.getTime()) / (1000 * 60 * 60 * 24));
    return pandaFactsData[dayIdx % pandaFactsData.length];
  };

  return (
    <PandaSafeArea style={{ flex: 1 }}>
      {!openedPlace ? (
        <>
          <PandaImage
            source={require('../assets/images/pandaImage.png')}
            style={{
              alignSelf: 'center',
              height: pandaScreen.height * 0.28,
              width: pandaScreen.width * 0.5,
            }}
            resizeMode="contain"
          />

          <PandaView style={{
            marginTop: -pandaScreen.height * 0.14,
            alignItems: 'center',
            width: pandaScreen.width,
            alignSelf: 'center',
          }}>
            <PandaBg
              source={require('../assets/images/templateImage.png')}
              style={{
                alignItems: 'center',
                width: pandaScreen.width * 0.91,
                justifyContent: 'center',
                height: pandaScreen.height * 0.3,
                alignSelf: 'center',
              }}
              resizeMode="stretch"
            >
              <PandaView style={{
                justifyContent: 'center',
                zIndex: 10,
                height: '100%',
                alignItems: 'center',
                width: '100%',
              }}>
                <PandaText style={{
                  fontWeight: 'bold',
                  fontSize: pandaScreen.width * 0.05,
                  fontFamily: pandaFonts.legendsADLaMDisplayRegular,
                  color: '#08530B',
                }}>
                  Daily facts
                </PandaText>

                <PandaText style={{
                  maxWidth: '64%',
                  textAlign: 'center',
                  fontFamily: pandaFonts.legendsPathwayExtremeRegular,
                  fontSize: pandaScreen.width * 0.04,
                  color: '#08530B',
                }}>
                  {getDailyPandaFact()}
                </PandaText>

                <PandaTouchable
                  style={{
                    justifyContent: 'center',
                    height: pandaScreen.height * 0.064,
                    overflow: 'hidden',
                    borderColor: '#1D4200',
                    marginTop: pandaScreen.height * 0.01,
                    width: pandaScreen.width * 0.3,
                    alignItems: 'center',
                    borderWidth: pandaScreen.width * 0.008,
                  }}
                  onPress={() => {
                    PandaShare.share({
                      message: getDailyPandaFact()
                    });
                  }}
                >
                  <LinearGradient
                    colors={['#BD9C19', '#C0C941', '#49570C']}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    locations={[0, 0.43, 1]}
                    style={{
                      width: '100%',
                      position: 'absolute',
                      height: '110%',
                      left: 0,
                      right: 0,
                      bottom: 0,
                      top: 0,
                    }}
                  />
                  <PandaText style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontFamily: pandaFonts.legendsADLaMDisplayRegular,
                    fontSize: pandaScreen.width * 0.05,
                    color: '#1D4200',
                  }}>
                    Share
                  </PandaText>
                </PandaTouchable>
              </PandaView>
            </PandaBg>
          </PandaView>

          <PandaText style={{
            textAlign: 'left',
            marginTop: pandaScreen.height * 0.03,
            fontFamily: pandaFonts.legendsADLaMDisplayRegular,
            fontWeight: 'bold',
            marginLeft: pandaScreen.width * 0.05,
            fontSize: pandaScreen.width * 0.07,
            color: 'white',
          }}>
            Popular {Platform.OS === 'android' ? 'Crazy ' : ''}Place
          </PandaText>

          <PandaPlaceForOpen pandaPlace={highlightPlace} pandaSzs={pandaScreen} onPandaOpen={() => setOpenedPlace(true)} />
        </>
      ) : (
        <PandaOpenedPlace
          pandaPlace={highlightPlace}
          pandaSzs={pandaScreen}
          onPandaClose={() => setOpenedPlace(false)}
        />
      )}
    </PandaSafeArea>
  );
};

export default PandaMainHomeCont;
