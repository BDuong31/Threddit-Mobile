import { FontAwesome5 } from "@expo/vector-icons";
import { Redirect, router } from "expo-router";
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
import { signIn } from "../apis/auth"
import { useAuth } from "contexts/AuthContext";
import { text } from "@fortawesome/fontawesome-svg-core";

export default function AuthScreen() {
    const { colors } = useTheme();
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const [ showPassword, setShowPassword ] = useState(false);
    const { setToken } = useAuth();

    const isValidEmail = (e: string) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(e);
    }
    const handleSignIn = async () => {
        setLoading(true);

        if (!email || !password) {
            Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin.");
            setLoading(false);
            return;
        }

        if (!isValidEmail(email)) {
            Alert.alert("Lỗi", "Email không hợp lệ.");
            setLoading(false);
            return;
        }

        if (password.length < 4 || password.length >= 16) {
            Alert.alert("Lỗi", "Mật khẩu phải từ 4 đến 16 ký tự.");
            setLoading(false);
            return;
        }

        console.log(email + " " + password);

        try {
            const response = await signIn(email, password);
            console.log("Login successful:", response);
            Alert.alert("Thành công", "Đăng nhập thành công.", 
             [ 
              {
                text: "OK",
                onPress: () => { 
                  setToken(response?.data?.accessToken);
                  router.replace("/(tabs)");
                 }
              }
             ]
            );
        } catch (error) {
            console.error("Login error:", error?.message);
            Alert.alert("Lỗi", error?.message || "Đã xảy ra lỗi. Vui lòng thử lại.");
            setLoading(false);
            return;
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
                  Đăng nhập vào Threddit
              </Text>
            </View>

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

              <View>
                <View style={{ position: 'relative' }}>
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
                    placeholder="Mật khẩu"
                    placeholderTextColor={colors.textSecondary}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    returnKeyType="done"
                    onSubmitEditing={() => {}}
                  />
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      right: 16,
                      top: 16,
                      padding: 4
                    }}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <FontAwesome5
                      name={showPassword ? "eye-slash" : "eye"}
                      size={20}
                      color={colors.border}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                style={{ 
                  backgroundColor: colors.text,
                  opacity: loading ? 0.5 : 1
                }}
                className="rounded-lg py-4"
                onPress={() => { handleSignIn(); }}
                disabled={loading}
              >
                <Text className="text-white text-center font-bold text-[20px]">
                  {loading
                    ? "Đang đăng nhập..."
                    : "Đăng nhập"
                }
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { router.push("/forgotPassword") }}>
                <Text style={{ color: colors.border }} className="text-[20px] text-center">
                  Forgot Password?
                </Text>
              </TouchableOpacity>

              <View style={{borderColor: colors.border}} className="border-b h-[1px]"></View>
            </View>

            <View className="flex-row gap-[10px] items-center justify-center pt-[20px] pb-[10px]">
              <Text style={{ color: colors.textSecondary }} className="text-[14px]">
                Bạn chưa có tài khoản?
              </Text>
              <TouchableOpacity
                style={{ 
                  backgroundColor: colors.text,
                  opacity: loading ? 0.5 : 1
                }}
                className ="rounded-lg py-[12px] px-[40px]"
                onPress={() => { router.push("/register") }}>
                <Text style={{ color: colors.primary }} className="text-white font-bold text-center text-[16px]">
                  Đăng ký
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
} 