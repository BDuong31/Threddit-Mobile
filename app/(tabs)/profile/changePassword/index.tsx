import React, { useLayoutEffect, useState } from 'react';
import { Image, View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Stack, router, useNavigation } from 'expo-router';
import { useTheme } from 'contexts/ThemeContext';
import { useUser } from 'contexts/UserContext';
import { signOut } from 'apis/auth';
import { useAuth } from '../../../../contexts/AuthContext'
import { changePassword, updateUsername } from 'apis/user';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { FontAwesome5 } from '@expo/vector-icons';
export default function ChangePasswordScreen() {
    const navigation = useNavigation();
    const { colors } = useTheme();
    const [ loading, setLoading ] = useState(false);
    const [ passwordOld, setPasswordOld ] = useState("");
    const [ newPassword, setNewPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ isShowPasswordOld, setShowPasswordOld ] = useState(false);
    const [ isShowNewPassword, setShowNewPassword ] = useState(false);
    const [ isShowConfirmPassword, setShowConfirmPassword ] = useState(false);
    const { setToken } = useAuth();

      useLayoutEffect(() => {
        navigation.setOptions({
          headerTitle: () => {
            return (
              <TouchableOpacity onPress={() => {  }}>
                <Image
                  source={require('../../../../assets/icon.png')}
                  style={{ width: 32, height: 32 }}
                />
              </TouchableOpacity>
            );
          },
    
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => router.back()}>
                <FontAwesomeIcon icon={faArrowLeft} size={24} color={colors.icon} />
              </TouchableOpacity>
            );
          },
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerShadowVisible: false, 
        });
      })
    
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
                            router.replace('/login');
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
                <View className="space-y-4 flex gap-[25px] px-[25px]">
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
                    secureTextEntry={!isShowPasswordOld}
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    />
                    <TouchableOpacity
                        style={{
                        position: 'absolute',
                        right: 16,
                        top: 16,
                        padding: 4
                        }}
                        onPress={() => setShowPasswordOld(!isShowPasswordOld)}
                    >
                        <FontAwesome5
                        name={!isShowPasswordOld ? "eye-slash" : "eye"}
                        size={20}
                        color={colors.icon}
                        />
                    </TouchableOpacity>
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
                    secureTextEntry={!isShowNewPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    />
                    <TouchableOpacity
                        style={{
                        position: 'absolute',
                        right: 16,
                        top: 16,
                        padding: 4
                        }}
                        onPress={() => setShowNewPassword(!isShowNewPassword)}
                    >
                        <FontAwesome5
                        name={!isShowNewPassword ? "eye-slash" : "eye"}
                        size={20}
                        color={colors.icon}
                        />
                  </TouchableOpacity>
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
                    secureTextEntry={!isShowConfirmPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="next"
                    />
                        <TouchableOpacity
                        style={{
                        position: 'absolute',
                        right: 16,
                        top: 16,
                        padding: 4
                        }}
                        onPress={() => setShowConfirmPassword(!isShowConfirmPassword)}
                    >
                        <FontAwesome5
                        name={!isShowConfirmPassword ? "eye-slash" : "eye"}
                        size={20}
                        color={colors.icon}
                        />
                  </TouchableOpacity>
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
                    <Text style={{ color: colors.textButton }} className="text-center font-bold text-[20px]">
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