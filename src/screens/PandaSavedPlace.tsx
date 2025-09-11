import {
    SafeAreaView as PandaSafe,
    View as PandaView,
    TouchableWithoutFeedback,
    Text as PandaText,
    Dimensions,
    Platform,
} from 'react-native';
import PandaOpenedPlace from '../components/PandaOpenedPlace';
import { fonts as pandaFonts } from '../fonts';
import PandaPlaceForOpen from '../components/PandaPlaceForOpen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState as usePandaState, useEffect as usePandaEffect, } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

type PandaSavedProps = {
    setPandaPage: (page: string) => void;
};

const PandaSavedPlace: React.FC<PandaSavedProps> = ({ setPandaPage }) => {
    const [favPlaces, setFavPlaces] = usePandaState<any[]>([]);
    const pandaSzs = Dimensions.get('window');
    const [selectedPandaPlace, setSelectedPandaPlace] = usePandaState<any | null>(null);

    usePandaEffect(() => {
        const loadFavPlaces = async () => {
            try {
                const raw = await AsyncStorage.getItem('myPandaFavPlaces');
                if (raw) {
                    setFavPlaces(JSON.parse(raw));
                } else {
                    setFavPlaces([]);
                }
            } catch {
                setFavPlaces([]);
            }
        };
        loadFavPlaces();
    }, [selectedPandaPlace]);

    return (
        <PandaSafe style={{ flex: 1 }}>
            <PandaText
                style={{
                    alignSelf: 'flex-start',
                    fontFamily: pandaFonts.legendsADLaMDisplayRegular,
                    fontSize: pandaSzs.width * 0.07,
                    paddingBottom: pandaSzs.height * 0.021,
                    fontWeight: 'bold',
                    marginLeft: pandaSzs.width * 0.05,
                    textAlign: 'left',
                    color: 'white',
                }}
            >
                Saved {Platform.OS === 'android' ? 'Crazy ' : ''}place
            </PandaText>

            {!selectedPandaPlace ? (
                <ScrollView
                    contentContainerStyle={{
                        paddingBottom: pandaSzs.height * 0.1,
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    <PandaView>
                        {favPlaces.length === 0 ? (
                            <PandaText
                                style={{
                                    marginTop: pandaSzs.height * 0.05,
                                    color: 'white',
                                    textAlign: 'center',
                                    fontSize: pandaSzs.width * 0.05,
                                    fontFamily: pandaFonts.legendsADLaMDisplayRegular,
                                }}
                            >
                                No saved places yet.
                            </PandaText>
                        ) : (
                            favPlaces.map((place, idx) => (
                                <TouchableWithoutFeedback
                                    key={idx}
                                    onPress={() => setSelectedPandaPlace(place)}
                                >
                                    <PandaView>
                                        <PandaPlaceForOpen
                                            pandaSzs={pandaSzs}
                                            onPandaOpen={() => setSelectedPandaPlace(place)}
                                            pandaPlace={place}
                                        />
                                    </PandaView>
                                </TouchableWithoutFeedback>
                            ))
                        )}
                    </PandaView>
                </ScrollView>
            ) : (
                <PandaOpenedPlace
                    onPandaClose={() => setSelectedPandaPlace(null)}
                    pandaSzs={pandaSzs}
                    pandaPlace={selectedPandaPlace}
                />
            )}
        </PandaSafe>
    );
};

export default PandaSavedPlace;
