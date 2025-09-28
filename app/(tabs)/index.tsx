import { FontAwesome5 } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../contexts/ThemeContext";
import axiosInstance, { endpoints } from "lib/axios";
import { getUserProfile } from "apis/user";
import { signOut } from "apis/auth";
import { useAuth } from "contexts/AuthContext";
export default function HomeScreen() {
    const { colors } = useTheme();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const { setToken } = useAuth();
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getUserProfile();
                console.log("User profile fetched:", response.data);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        }
        fetchUser();
    }, []);

    const handleLogout = async () => {
        try {
            const response = await signOut();
            console.log("Logout successful:", response);

            if (response?.statusCode === 200) {
                setToken(null);
                router.push("/login");
            }
        } catch (error) {
            Alert.alert("Lỗi", "Đăng xuất thất bại. Vui lòng thử lại.");
            console.error("Logout error:", error);
        }
    };
    return (
        <SafeAreaView className="flex-1">
            <Text>Home Screen</Text>
            <TouchableOpacity onPress={handleLogout}>
                <Text>Logout</Text>
            </TouchableOpacity>


        </SafeAreaView>
    )
}