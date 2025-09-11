import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { fonts } from '../fonts';

type PandaPlace = {
  pandaName: string;
  pandaCoordinates: { latitude: number; longitude: number };
  pandaDescrip: string;
  pandaImg: any;
};

interface Props {
  pandaPlace: PandaPlace | null;
  pandaSzs: { width: number; height: number };
  onPandaOpen: () => void;
}

const PandaPlaceForOpen: React.FC<Props> = ({ pandaPlace, pandaSzs, onPandaOpen }) => (
  <View style={{
    width: pandaSzs.width * 0.90545,
    height: pandaSzs.height * 0.21,
    backgroundColor: '#CAEBC7',
    marginTop: pandaSzs.height * 0.025,
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: pandaSzs.width * 0.014,
    borderColor: '#6DC167',
    flexDirection: 'row',
    padding: pandaSzs.width * 0.025,
  }}>
    <Image
      source={
        pandaPlace?.pandaImg
          ? pandaPlace.pandaImg
          : require('../assets/images/zooImage.png')
      }
      style={{
        width: '48%',
        height: '95%',
      }}
      resizeMode='cover'
    />

    <View style={{
      width: '48%',
      height: '95%',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Text style={{
        color: '#1D4200',
        fontFamily: fonts.legendsADLaMDisplayRegular,
        fontSize: pandaSzs.width * 0.044,
        fontWeight: 'bold',
        textAlign: 'left',
        alignSelf: 'flex-start'
      }}
        numberOfLines={1}
        ellipsizeMode='tail'
      >
        {pandaPlace?.pandaName ?? ''}
      </Text>

      <Text style={{
        color: '#1D4200',
        fontSize: pandaSzs.width * 0.031,
        textAlign: 'left',
        alignSelf: 'flex-start',
      }} adjustsFontSizeToFit numberOfLines={3}>
        {pandaPlace?.pandaDescrip?.split('.')[0] + '.' ?? ''}
      </Text>

      <TouchableOpacity style={{
        width: pandaSzs.width * 0.3,
        height: pandaSzs.height * 0.055,
        borderWidth: pandaSzs.width * 0.008,
        borderColor: '#1D4200',
        marginTop: pandaSzs.height * 0.01,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start'
      }}
        onPress={onPandaOpen}
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
        <Text style={{
          color: '#1D4200',
          fontFamily: fonts.legendsADLaMDisplayRegular,
          fontSize: pandaSzs.width * 0.05,
          fontWeight: 'bold',
          textAlign: 'center'
        }}>
          Open
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default PandaPlaceForOpen;
