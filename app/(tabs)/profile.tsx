import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeToggle } from "../../components/ThemeToggle";
import { useTheme } from "../../contexts/ThemeContext";

// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

interface UserProfile {
  id: string;
  username: string;
  full_name: string;
  bio?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

interface UserPost {
  id: string;
  content: string;
  image_url?: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  likes_count?: number;
  comments_count?: number;
  is_liked?: boolean;
}

interface FriendUser {
  id: string;
  username: string;
  full_name: string;
  avatar_url?: string;
}

export default function ProfileScreen() {
    const { colors } = useTheme();
    return (
        <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
            <View className="flex-row justify-between items-center px-4 py-2 border-b" style={{ borderBottomColor: colors.border }}>
                <Text className="text-2xl font-bold" style={{ color: colors.text }}>Profile</Text>
            </View>
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                <Text className="text-lg" style={{ color: colors.text }}>User profile and posts will be displayed here.</Text>
            </ScrollView>
        </SafeAreaView>
    )
}