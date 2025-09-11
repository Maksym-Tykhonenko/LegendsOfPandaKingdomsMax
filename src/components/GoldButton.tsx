import React from 'react';
import { TouchableOpacity, ViewStyle, StyleProp } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface GoldButtonProps {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    onPress?: () => void;
    borderColor?: string;
    borderWidth?: number;
    height?: number;
    width?: number;
    isLinearVisible?: boolean;
}

const GoldButton: React.FC<GoldButtonProps> = ({
    children,
    style,
    onPress,
    borderColor = '#1D4200',
    borderWidth = 3,
    height = 48,
    width = 120,
    isLinearVisible,
}) => (
    <TouchableOpacity
        style={[
            {
                width,
                height,
                borderWidth,
                borderColor,
                overflow: 'hidden',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#1D4200',
                shadowOffset: { width: 2, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 4,
                backgroundColor: isLinearVisible ? 'transparent' : 'white',
            },
            style,
        ]}
        onPress={onPress}
        activeOpacity={0.85}
    >
        {isLinearVisible && (
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
        )}
        {children}
    </TouchableOpacity>
);

export default GoldButton;
