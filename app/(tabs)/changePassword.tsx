import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Stack, router } from 'expo-router';
import { useTheme } from 'contexts/ThemeContext';
import { useUser } from 'contexts/UserContext';
import { signOut } from 'apis/auth';
import { useAuth } from '../../contexts/AuthContext'
import { changePassword, updateUsername } from 'apis/user';
export default function ChangePasswordScreen() {
    const { colors } = useTheme();
    const [ loading, setLoading ] = useState(false);
    const [ passwordOld, setPasswordOld ] = useState("");
    const [ newPassword, setNewPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const { setToken } = useAuth();

    const handlerChangePassword = async () => {
        setLoading(true);
        try {
            const response = await changePassword(passwordOld, newPassword, confirmPassword);
            if (response?.statusCode === 200) {
                Alert.alert('Thành công', 'Đổi mật khẩu thành công. Vui lòng đăng nhập lại.', [
                    {
                        text: 'OK',
                        onPress: async () => {
                            setToken(null);
                            router.push('/login');
                        }
                    }
                ]);
            } 
        } catch (error) {
            console.error('Error changing password:', error);
            Alert.alert('Lỗi', 'Đổi mật khẩu thất bại. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    }

    return (
            <View className="flex h-full gap-[10px] pt-4" style={{ backgroundColor: colors.background }}>
            <Stack.Screen
                options={{
                headerTitleStyle: { color: colors.text },
                headerStyle: { backgroundColor: colors.background },

                tabBarStyle: { display: 'none' },
                }}
                />

                <Text style={{ color: colors.text }} className="text-center font-bold text-[30px]">
                Đổi mật khẩu
                </Text>
                <View className="space-y-4 flex gap-[25px]">
                <View>
                    <TextInput
                    style={{ 
                        backgroundColor: 'transparent', 
                        borderColor: colors.border, 
                        color: "#A6A6A6",
                        paddingHorizontal: 30,
                        paddingVertical: 16,
                        borderRadius: 10,
                        borderWidth: 1,
                        fontSize: 20
                    }}
                    placeholder="Mật khẩu cũ"
                    placeholderTextColor={colors.textSecondary}
                    value={passwordOld}
                    onChangeText={setPasswordOld}
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    />
                </View>

                <View>
                    <TextInput
                    style={{ 
                        backgroundColor: 'transparent', 
                        borderColor: colors.border, 
                        color: "#A6A6A6",
                        paddingHorizontal: 30,
                        paddingVertical: 16,
                        borderRadius: 10,
                        borderWidth: 1,
                        fontSize: 20
                    }}
                    placeholder="Mật khẩu mới"
                    placeholderTextColor={colors.textSecondary}
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    />
                </View>

                <View>
                    <TextInput
                    style={{ 
                        backgroundColor: 'transparent', 
                        borderColor: colors.border, 
                        color: "#A6A6A6",
                        paddingHorizontal: 30,
                        paddingVertical: 16,
                        borderRadius: 10,
                        borderWidth: 1,
                        fontSize: 20
                    }}
                    placeholder="Xác nhận mật khẩu mới"
                    placeholderTextColor={colors.textSecondary}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    />
                </View>

                <TouchableOpacity
                    style={{ 
                    backgroundColor: colors.text,
                    opacity: loading ? 0.5 : 1
                    }}
                    className="rounded-lg py-4"
                    onPress={() => { handlerChangePassword(); }}
                    disabled={loading}
                >
                    <Text className="text-white text-center font-bold text-[20px]">
                    {loading
                        ? "Đang đổi..."
                        : "Xác nhận đổi mật khẩu"
                    }
                    </Text>
                </TouchableOpacity>
                </View>
            </View>
    );
}