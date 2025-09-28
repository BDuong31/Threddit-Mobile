import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../contexts/ThemeContext";
import { resetPassword, verifyResetPassword } from "apis/auth";

export default function AuthScreen() {
    const { colors } = useTheme();
    const [ email, setEmail ] = useState("");
    const [ newPassword, setNewPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [ verificationCode, setVerificationCode ] = useState("");
    const [ isSuccess, setIsSuccess ] = useState(false);
    const [ loading, setLoading ] = useState(false);

    const handleRequestResetPassword = async () => {
        if (!email) {
            Alert.alert("Lỗi", "Vui lòng nhập email.");
            return;
        }

        setLoading(true);
        try {
          const response = await resetPassword(email);
          if (response?.statusCode === 200) {
            Alert.alert("Thành công", response.message);
            setIsSuccess(true);
          }
        } catch (error) {
            console.error("Error requesting password reset:", error);
            Alert.alert("Lỗi", error?.message);
        } finally {
            setLoading(false);
        }
    }

    const handleResetPassword = async () => {
        if (!verificationCode || !newPassword || !confirmPassword) {
            Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin.");
            return;
        }
        if (newPassword !== confirmPassword) {
            Alert.alert("Lỗi", "Mật khẩu xác nhận không khớp.");
            return;
        }
        
        setLoading(true);
        try {
          const response = await verifyResetPassword(email, verificationCode, newPassword, confirmPassword);
          console.log(response);
          if (response?.statusCode === 200) {
            Alert.alert("Thành công", response.message);
            router.push("/login");
          }
        } catch (error) {
          console.error("Error verifying reset password:", error);
          Alert.alert("Lỗi");
        } finally {
          setLoading(false);
        }
    }
  return (
    <SafeAreaView style={{ backgroundColor: colors.background }} className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={{ 
            flexGrow: 1,
            paddingBottom: 100 
          }}
          style={{ backgroundColor: colors.background }}
          className="px-[25px] py-8"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 justify-center">
            <View className="items-center mb-[10px]">
              <Text style={{ color: colors.text }} className="text-center font-bold text-[30px]">
                  { isSuccess ? "Làm mới mật khẩu" : "Quên mật khẩu" }
              </Text>
            </View>
            { isSuccess ? (
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
                  placeholder="Mã xác nhận"
                  placeholderTextColor={colors.textSecondary}
                  value={verificationCode}
                  onChangeText={setVerificationCode}
                  keyboardType="number-pad"
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
                  placeholder="Xác nhận mật khẩu"
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
                onPress={() => { handleResetPassword(); }}
                disabled={loading}
              >
                <Text className="text-white text-center font-bold text-[20px]">
                  {loading
                    ? "Đang làm mới..."
                    : "Làm mới mật khẩu"
                }
                </Text>
              </TouchableOpacity>

              <View style={{borderColor: colors.border}} className="border-b h-[1px]"></View>
            </View>
            ) : (
              <>
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
                      placeholder="Email"
                      placeholderTextColor={colors.textSecondary}
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
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
                    onPress={() => { handleRequestResetPassword();  }}
                    disabled={loading}
                  >
                    <Text className="text-white text-center font-bold text-[20px]">
                      {loading
                        ? "Đang yêu cầu..."
                        : "Yêu cầu nhận lại mật khẩu"
                    }
                    </Text>
                  </TouchableOpacity>

                  <View style={{borderColor: colors.border}} className="border-b h-[1px]"></View>
                </View>

                <View className="flex-row gap-[10px] items-center justify-center pt-[10px] pb-[10px]">
                  <Text style={{ color: colors.textSecondary }} className="text-[14px]">
                    Quay về đăng nhập
                  </Text>
                  <TouchableOpacity
                    style={{ 
                      backgroundColor: colors.text,
                      opacity: loading ? 0.5 : 1
                    }}
                    className ="rounded-lg py-[12px] px-[40px]"
                    onPress={() => { router.push("/login") }}>
                    <Text style={{ color: colors.primary }} className="text-white font-bold text-center text-[16px]">
                      Đăng nhập
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
} 