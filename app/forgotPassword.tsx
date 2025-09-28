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

export default function AuthScreen() {
    const { colors } = useTheme();
    const [ email, setEmail ] = useState("");
    const [ loading, setLoading ] = useState(false);
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
                  Quên mật khẩu
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

              <TouchableOpacity
                style={{ 
                  backgroundColor: colors.text,
                  opacity: loading ? 0.5 : 1
                }}
                className="rounded-lg py-4"
                onPress={() => {}}
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
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
} 