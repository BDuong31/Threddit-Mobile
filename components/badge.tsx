import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import { useTheme } from 'contexts/ThemeContext';


type Props = {
    content?: string | number;
};

const Badge = ({ content }: Props) => {
    const { colors } = useTheme();
    if (content) {
        return (
            <View className='relative z-20'>
                <View className='h-5 w-5 text-center rounded-full flex items-center justify-center' style={{ backgroundColor: colors.error }} >
                    <Text className="text-center text-[12px]" >{content}</Text>
                </View>
            </View>
        );
    }

    return (
        <View className="relative z-20 rounded-full" style={{ backgroundColor: colors.error }}>
            <View className="h-4 w-4 flex items-center justify-center rounded-full" />
        </View>
    );
};
export default Badge;