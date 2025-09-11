import React, {
  useContext as usePandaCtx,
  useLayoutEffect as usePandaLayout,
} from 'react';
import DeviceInfo from 'react-native-device-info';
import { useNavigation as usePandaNav } from '@react-navigation/native';
import {
  View as PandaView,
  Text as PandaText,
  Platform,
} from 'react-native';
import PandaEatingAnimation from '../components/PandaEatingAnimation';
import { PandaIdentityContext } from '../context/PandaIdentityContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fonts as pandaFonts } from '../fonts';

const KEY_PANDA_ONBOARD = 'panda_onboard_flow_flag';
const KEY_PANDA_USER = 'panda_user_storage_prefix';

const PandaLoading: React.FC = () => {
  const { updateUser: setPandaUser } = usePandaCtx(PandaIdentityContext);
  const pandaNav = usePandaNav();

  

  return (
    <PandaView style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ABD583'
    }}>
      <PandaView style={{ alignSelf: 'center' }}>
        <PandaEatingAnimation />
      </PandaView>

      {Platform.OS === 'android' && (
        <PandaText style={{
          fontFamily: pandaFonts.legendsADLaMDisplayRegular,
          fontSize: 25,
          color: '#1D4200',
          position: 'absolute',
          bottom: 100,
          textAlign: 'center'
        }}>
          Legends of Crazy Panda Kingdoms
        </PandaText>
      )}
    </PandaView>
  );
};

export default PandaLoading;
