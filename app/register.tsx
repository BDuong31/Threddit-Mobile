import { FontAwesome5 } from "@expo/vector-icons";
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
import { signUp, verifyAccount } from "apis/auth";

export default function AuthScreen() {
    const { colors } = useTheme();
    const [username, setUsername] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmedPassword, setConfirmedPassword ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const [ showPassword, setShowPassword ] = useState(false);
    const [ showConfirmedPassword, setShowConfirmedPassword ] = useState(false);
    const [ verificationCode, setVerificationCode ] = useState("");
    const [ isSuccess, setIsSuccess ] = useState(false);

    const isValidEmail = (input: string) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(input);
    };

    
    const handleRegister = async () => {
        setLoading(true);
        if (!username || !email || !password || !confirmedPassword) {
            Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin.");
            setLoading(false);
            return;
        }

        if (password.length < 4 || password.length >= 16) {
            Alert.alert("Lỗi", "Mật khẩu phải từ 4 đến 20 ký tự.");
            setLoading(false);
            return;
        }

        if (password !== confirmedPassword) {
            Alert.alert("Lỗi", "Mật khẩu không khớp.");
            setLoading(false);
            return;
        }

        if (!isValidEmail(email)) {
            Alert.alert("Lỗi", "Email không hợp lệ.");
            setLoading(false);
            return;
        }

        try {
            const response = await signUp(username, email, password, confirmedPassword);
            console.log("Register successful:", response);
            if (response?.statusCode === 200) {
                setIsSuccess(true);
                Alert.alert("Thông báo", response.message);                
            }
        } catch (error) {
            Alert.alert("Lỗi", error?.message || "Đã xảy ra lỗi. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    }

    const handleVerify = async () => {
        if (!verificationCode) {
            Alert.alert("Lỗi", "Vui lòng nhập mã xác nhận.");
            return;
        }

        try {
            const response = await verifyAccount(email, verificationCode);
            if (response.statusCode === 200) {
                Alert.alert("Thông báo", 
                  response.message,
                  [{
                    text: "OK", 
                    onPress: () =>{
                      router.push("/login");
                    }
                  }]
                );
            }
        } catch (error) {
            Alert.alert("Lỗi", error?.message || "Đã xảy ra lỗi. Vui lòng thử lại.");
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
                  {isSuccess ? "Xác minh tài khoản" : "Đăng ký vào Threddit"}
              </Text>
            </View>
            {
              isSuccess ? (
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
                      returnKeyType="done"
                    />
                  </View>

                  <TouchableOpacity
                    style={{ 
                      backgroundColor: colors.primary,
                      opacity: loading ? 0.5 : 1
                    }}
                    className="rounded-lg py-4"
                    onPress={() => {  handleVerify(); }}
                    disabled={loading}
                  >
                    <Text style={{ color: colors.textButton }} className=" text-center font-bold text-[20px]">
                      {loading
                        ? "Đang xác minh..."
                        : "Xác minh"
                    }
                    </Text>
                  </TouchableOpacity>
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
                        placeholder="Tên hiển thị"
                        placeholderTextColor={colors.textSecondary}
                        value={username}
                        onChangeText={setUsername}
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
                            name={!showPassword ? "eye-slash" : "eye"}
                            size={20}
                            color={colors.icon}
                          />
                        </TouchableOpacity>
                      </View>
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
                          placeholder="Nhập lại mật khẩu"
                          placeholderTextColor={colors.textSecondary}
                          value={confirmedPassword}
                          onChangeText={setConfirmedPassword}
                          secureTextEntry={!showConfirmedPassword}
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
                          onPress={() => setShowConfirmedPassword(!showConfirmedPassword)}
                        >
                          <FontAwesome5
                            name={!showConfirmedPassword ? "eye-slash" : "eye"}
                            size={20}
                            color={colors.icon}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>

                    <TouchableOpacity
                      style={{ 
                        backgroundColor: colors.primary,
                        opacity: loading ? 0.5 : 1
                      }}
                      className="rounded-lg py-4"
                      onPress={() => {  handleRegister(); }}
                      disabled={loading}
                    >
                      <Text style={{ color: colors.textButton }} className="text-center font-bold text-[20px]">
                        {loading
                          ? "Đang đăng ký..."
                          : "Đăng ký"
                      }
                      </Text>
                    </TouchableOpacity>

                    <View style={{borderColor: colors.border}} className="border-b h-[1px]"></View>
                  </View>

                  <View className="flex-row gap-[10px] items-center justify-center pt-[10px] pb-[10px] mt-[10px]">
                    <Text style={{ color: colors.textSecondary }} className="text-[14px]">
                      Bạn đã có tài khoản?
                    </Text>
                    <TouchableOpacity
                      style={{ 
                        backgroundColor: colors.primary,
                        opacity: loading ? 0.5 : 1
                      }}
                      className ="rounded-lg py-[12px] px-[40px]"
                      onPress={() => { router.push("/login") }}>
                      <Text style={{ color: colors.textButton }} className="font-bold text-center text-[16px]">
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