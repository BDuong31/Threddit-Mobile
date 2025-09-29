import React, { useState } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, Alert, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Stack, router } from 'expo-router';
import { useTheme } from 'contexts/ThemeContext';
import { useUser } from 'contexts/UserContext';
import { signOut } from 'apis/auth';
import { useAuth } from '../../contexts/AuthContext'
import { updateUsername } from 'apis/user';
export default function UserInfoScreen() {
  const { user } = useUser();
  console.log("User data in EditProfileScreen:", user);
  const { setToken } = useAuth();
  const { colors } = useTheme();
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [loading, setLoading] = useState(false);

  const isEmailChanged = email !== user?.email;
  const isUsernameChanged = username !== user?.username;

  const handleSave = async () => {
    setLoading(true);
        try {
          const res = await updateUsername(username);
          Alert.alert('Thành công', 'Thông tin đã được cập nhật. Vui lòng đăng nhập lại.', [
            {
              text: 'OK',
              onPress: async () => {
                try {
                  const res = await signOut();
                  if (res?.statusCode === 200) {
                    Alert.alert('Đăng xuất', 'Bạn đã đăng xuất thành công.',
                      [
                        {
                          text: 'OK',
                          onPress: () => {
                            setToken(null);
                            router.push('/login');
                          }
                        }
                      ]
                    );
                  }
                } catch (error) {
                  console.error('Error signing out:', error);
                }
              }
            }
          ]);
        } catch (error) {
          Alert.alert('Error', 'Failed to update user information.');
        } finally {
          setLoading(false);
        }
      };

  return (
        <View className="flex h-full gap-[10px] pt-4" style={{ backgroundColor: colors.background }}>
          <Stack.Screen
            options={{
              headerTitle: () => {
                return (
                  <TouchableOpacity onPress={() => {  }}>
                    <Image
                      source={require('../../assets/icon.png')}
                      style={{ width: 32, height: 32 }}
                    />
                  </TouchableOpacity>
                );
              },
              headerTitleStyle: { color: colors.text },
              headerStyle: { backgroundColor: colors.background },

              tabBarStyle: { display: 'none' },
            }}
            />

            <Text style={{ color: colors.text }} className="text-center font-bold text-[30px]">
              Thông tin cá nhân
            </Text>
            <View className="flex gap-[25px] border-[1px] border-[#A6A6A6] py-[20px] px-[10px] mx-[24px]" style={{ borderRadius: 20 }}>
              <View className="flex gap-[10px]">
                <Text style={{ color: colors.textSecondary }} className="text-[25px] font-light">
                  Tên Người dùng
                </Text>
                <TextInput
                  style={{ 
                    backgroundColor: 'transparent', 
                    borderColor: colors.border, 
                    color: "#A6A6A6",
                    paddingHorizontal: 30,
                    paddingVertical: 16,
                    borderRadius: 10,
                    borderWidth: 1,
                  }}
                  placeholder="Tên người dùng"
                  placeholderTextColor={colors.textSecondary}
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                />
              </View>
              <View className="flex gap-[10px]">
                <Text style={{ color: colors.textSecondary }} className="text-[25px] font-light">
                  Email
                </Text>
                <TextInput
                  style={{ 
                    backgroundColor: 'transparent', 
                    borderColor: colors.border, 
                    color: "#A6A6A6",
                    paddingHorizontal: 30,
                    paddingVertical: 16,
                    borderRadius: 10,
                    borderWidth: 1,
                  }}
                  placeholder="Tên người dùng"
                  placeholderTextColor={colors.textSecondary}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                  editable={false}
                />
              </View>
              <View className="w-full items-center">
                <TouchableOpacity
                  style={{ 
                    backgroundColor: colors.text,
                    opacity: loading ? 0.5 : 1,
                  }}
                  className="rounded-lg py-5 px-[50px]"
                  onPress={() => { handleSave(); }}
                  disabled={loading}
                >
                  <Text className="text-white text-center font-bold text-[20px]">
                    {loading
                      ? "Đang lưu..."
                      : "Lưu"
                    }
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
        </View>
  );
}