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
            <View className='relative z-20 p-[1px]'>
                <View className='text-center rounded-full flex justify-center items-center h-5 w-5 p-1' style={{ backgroundColor: colors.error}} >
                    <Text className="text-center text-[10px]" >{content}</Text>
                </View>
            </View>
        );
    }

    return (
        <View className="relative z-20 rounded-full" style={{ backgroundColor: colors.error }}>
            <View className="h-2 w-2 flex items-center justify-center rounded-full" />
        </View>
    );
};
export default Badge;