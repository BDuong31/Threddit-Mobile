import { FontAwesome5 } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../../contexts/ThemeContext";
import axiosInstance, { endpoints } from "lib/axios";
import { getUserProfile } from "apis/user";
import { signOut } from "apis/auth";
import { useAuth } from "contexts/AuthContext";
import Post from "components/post";
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

    return (
        <SafeAreaView style={{ backgroundColor: colors.background }} className="flex-row">
            <ScrollView className="px-4 pt-4 w-full" style={{ backgroundColor: colors.background }} showsVerticalScrollIndicator={false}>
                {Array.from({ length: 5 }).map((_, i) => (
                    <Post
                        key={i}
                        username="Name_User"
                        time="99 giờ trước"
                        content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                        likes={999}
                        comments={999}
                        shares={999}
                        saves={999}
                    />
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}