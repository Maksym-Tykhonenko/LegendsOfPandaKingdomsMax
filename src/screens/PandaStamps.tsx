import {
    Text as PandaText,
    Dimensions,
    ImageBackground as PandaImageBg,
    SafeAreaView as PandaSafe,
    Image as PandaImage,
    View as PandaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fonts as pandaFonts } from '../fonts';
import React, { useEffect as usePandaEffect, useState as usePandaState } from 'react';

const PandaStamps: React.FC = () => {
    const [stampsAmount, setStampsAmount] = usePandaState(0);
    const pandaSzs = Dimensions.get('window');

    usePandaEffect(() => {
        const loadStamps = async () => {
            try {
                const raw = await AsyncStorage.getItem('pandaStampsAmount');
                setStampsAmount(raw ? Number(raw) : 0);
            } catch {
                setStampsAmount(0);
            }
        };
        loadStamps();
    }, []);

    const stamps = Array.from({ length: stampsAmount }, (_, i) => i);

    return (
        <PandaSafe style={{ flex: 1 }}>
            <PandaText
                style={{
                    marginLeft: pandaSzs.width * 0.05,
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: 'left',
                    fontSize: pandaSzs.width * 0.07,
                    fontFamily: pandaFonts.legendsADLaMDisplayRegular,
                }}
            >
                COLLECTION
            </PandaText>

            <PandaView
                style={{
                    height: pandaSzs.height * 0.75,
                    marginTop: pandaSzs.height * 0.01,
                    width: pandaSzs.width * 0.9,
                    alignItems: 'center',
                    justifyContent: 'center',
                    alignSelf: 'center',
                }}
            >
                <PandaImageBg
                    source={require('../assets/images/stampsTemplate.png')}
                    style={{
                        width: pandaSzs.width * 0.98,
                        height: pandaSzs.height * 0.64,
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                    }}
                    resizeMode="stretch"
                >
                    <PandaView
                        style={{
                            bottom: pandaSzs.height * 0.09,
                            top: pandaSzs.height * 0.13,
                            left: pandaSzs.width * 0.07,
                            alignItems: 'center',
                            right: pandaSzs.width * 0.07,
                            justifyContent: 'flex-start',
                            position: 'absolute',
                        }}
                    >
                        {stampsAmount === 0 ? (
                            <PandaText
                                style={{
                                    opacity: 0.7,
                                    color: '#1D4200',
                                    textAlign: 'center',
                                    fontSize: pandaSzs.width * 0.045,
                                    marginTop: pandaSzs.height * 0.15,
                                    fontFamily: pandaFonts.legendsPathwayExtremeRegular,
                                }}
                            >
                                There is no stamp...
                            </PandaText>
                        ) : (
                            <PandaView
                                style={{
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    justifyContent: 'center',
                                }}
                            >
                                {stamps.map((_, idx) => (
                                    <PandaView
                                        key={idx}
                                        style={{
                                            height: pandaSzs.width * 0.18,
                                            margin: pandaSzs.width * 0.018,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: pandaSzs.width * 0.18,
                                        }}
                                    >
                                        <PandaImage
                                            source={require('../assets/images/pandaStamp.png')}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                            }}
                                            resizeMode="contain"
                                        />
                                    </PandaView>
                                ))}
                            </PandaView>
                        )}
                    </PandaView>
                </PandaImageBg>
            </PandaView>
        </PandaSafe>
    );
};

export default PandaStamps;
