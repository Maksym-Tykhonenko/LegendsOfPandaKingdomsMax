import GoldButton from '../components/GoldButton';
import { useNavigation as usePandaNav } from '@react-navigation/native';
import { fonts as pandaFonts } from '../fonts';
import {
  Text as PandaTxt,
  Dimensions as PandaDims,
  Image as PandaImg,
  View as PandaBox,
} from 'react-native';
import React, { useState as usePandaState } from 'react';
const pandaScreens = [
  require('../assets/images/pandaOnScreens/screen1.png'),
  require('../assets/images/pandaOnScreens/screen2.png'),
  require('../assets/images/pandaOnScreens/screen3.png'),
  require('../assets/images/pandaOnScreens/screen4.png'),
];


const PandaOnboarding: React.FC = () => {
  const [slideIndex, setSlideIndex] = usePandaState(0);
  const nav = usePandaNav();
  const { width, height } = PandaDims.get('window');

  const handlePandaProceed = () => {
    setSlideIndex(prev => {
      if (prev < pandaScreens.length - 1) {
        return prev + 1;
      }
      nav.replace?.('PandaRouterOfPages');
      return prev;
    });
  };

  return (
    <PandaBox style={{ flex: 1, backgroundColor: '#000' }}>
      <PandaImg
        source={pandaScreens[slideIndex]}
        style={{
          height: height,
          alignSelf: 'center',
          borderBottomLeftRadius: width * 0.080234,
          width: width,
        }}
        resizeMode="cover"
      />

      <GoldButton
        height={height * 0.09}
        onPress={handlePandaProceed}
        borderWidth={width * 0.008}
        width={width * 0.4}
        isLinearVisible={true}
        borderColor="#1D4200"
        style={{
          position: 'absolute',
          bottom: height * 0.05,
          alignSelf: 'center',
        }}
      >
        <PandaTxt style={{
          fontWeight: 'bold',
          color: '#1D4200',
          fontSize: width * 0.05,
          fontFamily: pandaFonts.legendsADLaMDisplayRegular,
          textAlign: 'center',
        }}>
          Next
        </PandaTxt>
      </GoldButton>
    </PandaBox>
  );
};

export default PandaOnboarding;
