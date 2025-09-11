import React, { useEffect, useState } from 'react';
import { View, Image, Text, Share } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { fonts } from '../fonts';
import GoldButton from './GoldButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

type PandaPlace = {
  pandaName: string;
  pandaCoordinates: { latitude: number; longitude: number };
  pandaDescrip: string;
  pandaImg: any;
};

interface Props {
  pandaPlace: PandaPlace | null;
  pandaSzs: { width: number; height: number };
  onPandaClose: () => void;
}

const PandaOpenedPlace: React.FC<Props> = ({ pandaPlace, pandaSzs, onPandaClose }) => {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const checkSaved = async () => {
      if (!pandaPlace) return;
      const raw = await AsyncStorage.getItem('myPandaFavPlaces');
      if (raw) {
        try {
          const arr = JSON.parse(raw);
          setIsSaved(arr.some((p: any) => p.pandaName === pandaPlace.pandaName));
        } catch { }
      } else {
        setIsSaved(false);
      }
    };
    checkSaved();
  }, [pandaPlace]);

  const handleToggleSave = async () => {
    if (!pandaPlace) return;
    const raw = await AsyncStorage.getItem('myPandaFavPlaces');
    let arr: any[] = [];
    if (raw) {
      try {
        arr = JSON.parse(raw);
      } catch { }
    }
    if (isSaved) {
      arr = arr.filter((p: any) => p.pandaName !== pandaPlace.pandaName);
    } else {
      arr.push(pandaPlace);
    }
    await AsyncStorage.setItem('myPandaFavPlaces', JSON.stringify(arr));
    setIsSaved(!isSaved);
  };

  return (
    <View style={{
      width: pandaSzs.width * 0.90545,
      backgroundColor: '#CAEBC7',
      marginTop: pandaSzs.height * 0.025,
      alignSelf: 'center',
      alignItems: 'center',
      borderWidth: pandaSzs.width * 0.014,
      borderColor: '#6DC167',
      padding: pandaSzs.width * 0.025,
    }}>
      <Image
        source={
          pandaPlace?.pandaImg
            ? pandaPlace.pandaImg
            : require('../assets/images/zooImage.png')
        }
        style={{
          width: '100%',
          height: pandaSzs.height * 0.2104534,
        }}
        resizeMode='cover'
      />

      <Text style={{
        color: '#1D4200',
        fontFamily: fonts.legendsADLaMDisplayRegular,
        fontSize: pandaSzs.width * 0.05,
        marginTop: pandaSzs.height * 0.012,
        fontWeight: 'bold',
        textAlign: 'left',
        alignSelf: 'flex-start'
      }}>
        {pandaPlace?.pandaName ?? ''}
      </Text>

      <View style={{
        flexDirection: 'row',
        alignSelf: 'flex-start',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginVertical: pandaSzs.height * 0.01
      }}>
        <Image
          source={require('../assets/icons/pandaCoordinatesIcon.png')}
          style={{
            width: pandaSzs.height * 0.04,
            height: pandaSzs.height * 0.04,
            marginRight: pandaSzs.width * 0.03,
          }}
        />

        <Text
          style={{
            color: '#1D4200',
            fontSize: pandaSzs.width * 0.031,
            textAlign: 'left',
          }}
        >
          {pandaPlace
            ? `${Math.abs(pandaPlace.pandaCoordinates.latitude).toFixed(4)}° ${pandaPlace.pandaCoordinates.latitude >= 0 ? 'N' : 'S'}, ${Math.abs(pandaPlace.pandaCoordinates.longitude).toFixed(4)}° ${pandaPlace.pandaCoordinates.longitude >= 0 ? 'E' : 'W'}`
            : ''}
        </Text>
      </View>

      <Text style={{
        color: '#1D4200',
        fontSize: pandaSzs.width * 0.035,
        textAlign: 'left',
        alignSelf: 'flex-start',
      }} >
        {pandaPlace?.pandaDescrip}
      </Text>

      <View style={{
        marginTop: pandaSzs.height * 0.05,
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        <GoldButton
          onPress={onPandaClose}
          isLinearVisible={true}
          width={pandaSzs.width * 0.3}
          height={pandaSzs.height * 0.061}
          borderWidth={pandaSzs.width * 0.008}
          borderColor="#1D4200"
          style={{}}
        >
          <Text style={{
            color: '#1D4200',
            fontFamily: fonts.legendsADLaMDisplayRegular,
            fontSize: pandaSzs.width * 0.05,
            fontWeight: 'bold',
            textAlign: 'center'
          }}>
            Close
          </Text>
        </GoldButton>

        <GoldButton
          onPress={handleToggleSave}
          isLinearVisible={!isSaved}
          width={pandaSzs.height * 0.064}
          height={pandaSzs.height * 0.061}
          borderWidth={pandaSzs.width * 0.008}
          borderColor="#1D4200"
          style={{
            marginLeft: pandaSzs.width * 0.03,
            backgroundColor: isSaved ? 'white' : 'transparent',
          }}
        >
          <Image
            source={require('../assets/icons/pandaIconsGreenPages/pandaStar.png')}
            style={{
              width: pandaSzs.height * 0.03,
              height: pandaSzs.height * 0.03,
              tintColor: '#1D4200'
            }}
            resizeMode='contain'
          />
        </GoldButton>

        <GoldButton
          onPress={() => {
            Share.share({
              message: `Let's visit ${pandaPlace?.pandaName ?? ''}! It placed here: ${pandaPlace?.pandaCoordinates.latitude ?? ''}, ${pandaPlace?.pandaCoordinates.longitude ?? ''}`
            })
          }}
          isLinearVisible={true}
          width={pandaSzs.height * 0.064}
          height={pandaSzs.height * 0.061}
          borderWidth={pandaSzs.width * 0.008}
          borderColor="#1D4200"
          style={{ marginLeft: pandaSzs.width * 0.03 }}
        >
          <Image
            source={require('../assets/icons/pandaShare.png')}
            style={{
              width: pandaSzs.height * 0.021,
              height: pandaSzs.height * 0.021,
            }}
            resizeMode='contain'
          />
        </GoldButton>
      </View>
    </View>
  );
};

export default PandaOpenedPlace;
