import React, {
    useState as usePandaState,
    useEffect as usePandaEffect,
} from 'react';
import {
    TouchableOpacity,
    Dimensions as PandaDims,
    View as PandaBox,
    Image,
    SafeAreaView as PandaSafe,
    Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import PandaStamps from './PandaStamps';
import PandaSavedPlace from './PandaSavedPlace';
import PandaExplorerMap from './PandaExplorerMap';
import PandaMainHomeCont from './PandaMainHomeCont';

const pandaBottomBar = [
    {
        pandaName: 'Panda Content Of Home',
        pandaWhite: require('../assets/icons/pandaIconsWhitePages/pandaHome.png'),
        pandaGreen: require('../assets/icons/pandaIconsGreenPages/pandaHome.png'),
    },
    {
        pandaName: 'Panda Map Places',
        pandaWhite: require('../assets/icons/pandaIconsWhitePages/pandaMap.png'),
        pandaGreen: require('../assets/icons/pandaIconsGreenPages/pandaMap.png'),
    },
    {
        pandaName: 'Panda Saved Places',
        pandaWhite: require('../assets/icons/pandaIconsWhitePages/pandaStar.png'),
        pandaGreen: require('../assets/icons/pandaIconsGreenPages/pandaStar.png'),
    },
    {
        pandaName: 'Panda Spamps Of Places',
        pandaWhite: require('../assets/icons/pandaIconsWhitePages/pandaCollection.png'),
        pandaGreen: require('../assets/icons/pandaIconsGreenPages/pandaCollection.png'),
    },
];

// Тип для екранів
type TPandaScreen =
    | 'Panda Content Of Home'
    | 'Panda Map Places'
    | 'Panda Saved Places'
    | 'Panda Spamps Of Places'
    | 'FREE FLIGHT';

const PandaRouterOfPages: React.FC = () => {

    const [activeScreen, setActiveScreen] = usePandaState<TPandaScreen>('Panda Content Of Home');
    const [pandaUser, setPandaUser] = usePandaState<{
        pandaUserName: string;
        pandaUserAvatarUri: string;
    } | null>(null);
    const [pandaSzs, setPandaSzs] = usePandaState(PandaDims.get('window'));

    // Завантаження даних користувача
    const loadPandaUser = async () => {
        try {
            const raw = await AsyncStorage.getItem('pandaUserInfo');
            if (!raw) return null;

            const parsed = JSON.parse(raw);
            if (!parsed.pandaUserName || !parsed.pandaUserAvatarUri) return null;

            return parsed;
        } catch (err) {
            if (__DEV__) console.error('PandaRouterOfPages: load user failed', err);
            return null;
        }
    };

    usePandaEffect(() => {
        const init = async () => {
            const userData = await loadPandaUser();
            setPandaUser(userData);
        };
        init();
    }, [activeScreen]);

    // Контент залежно від екрана
    let screenContent: React.ReactNode = null;

    switch (activeScreen) {
        case 'Panda Content Of Home':
            screenContent = (
                <PandaMainHomeCont
                    setPandaPage={setActiveScreen}
                />
            );
            break;
        case 'Panda Map Places':
            screenContent = (
                <PandaExplorerMap
                    setPandaPage={setActiveScreen}
                />
            );
            break;
        case 'Panda Saved Places':
            screenContent = <PandaSavedPlace setPandaPage={setActiveScreen} />;
            break;
        case 'Panda Spamps Of Places':
            screenContent = <PandaStamps setPandaPage={setActiveScreen} />;
            break;
    }

    return (
        <PandaBox
            style={{
                width: pandaSzs.width,
                flex: 1,
                height: pandaSzs.height,
            }}
        >
            <Image
                source={require('../assets/images/appBackgroundPanda.png')}
                style={{
                    bottom: 0,
                    top: 0,
                    right: 0,
                    left: 0,
                    position: 'absolute',
                }}
                resizeMode="cover"
            />
            {activeScreen !== 'Panda Content Of Home' && (
                <PandaSafe style={{
                    paddingTop: Platform.OS === 'android' ? pandaSzs.height * 0.023456 : 0,
                }}>
                    {/* тут можна додати заголовок */}
                </PandaSafe>
            )}
            {screenContent}

            <PandaBox
                style={{
                    borderWidth: pandaSzs.width * 0.01,
                    width: pandaSzs.width * 0.8053,
                    alignSelf: 'center',
                    position: 'absolute',
                    alignItems: 'center',
                    backgroundColor: '#19BD58',
                    bottom: pandaSzs.height * 0.04,
                    borderColor: '#008433',
                    flexDirection: 'row',
                    paddingHorizontal: pandaSzs.width * 0.05,
                    height: pandaSzs.height * 0.095,
                    justifyContent: 'space-between',
                }}
            >
                {pandaBottomBar.map((panda, index) => (
                    <TouchableOpacity key={index} onPress={() => setActiveScreen(panda.pandaName)}>
                        <Image
                            source={activeScreen === panda.pandaName ? panda.pandaWhite : panda.pandaGreen}
                            style={{
                                height: pandaSzs.height * 0.05,
                                width: pandaSzs.height * 0.05,
                            }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                ))}
            </PandaBox>
        </PandaBox>
    );
};

export default PandaRouterOfPages;
