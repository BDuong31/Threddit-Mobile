import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect, useLocalSearchParams, useNavigation } from "expo-router";
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
    Image
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeToggle } from "../../../components/ThemeToggle";
import { useTheme } from "../../../contexts/ThemeContext";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useLayoutEffect } from 'react';
import MenuPopup from "components/menuPopup";
import Post from "components/post";

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
    const navigation = useNavigation();
    const { colors } = useTheme();
    const [isMenuVisible, setMenuVisible] = useState(false);
    const [isActive, setIsActive] = useState('Post');
    const [loading, setLoading] = useState(false);
    const [ isFollow, setIsFollow ] = useState(false);
    const { id } = useLocalSearchParams<{ id: string }>();
    

    console.log(id);
    useLayoutEffect(() => {
      navigation.setOptions({
        headerTitle: () => (
          <Image
            source={require('../../../assets/icon.png')}
            style={{ width: 32, height: 32 }}
          />
        ),
      });
    }, [navigation, colors]);
    return (
        <SafeAreaView edges={['bottom']} className="flex-1 " style={{ backgroundColor: colors.background }}>
          <View className="flex-row pt-2 justify-between" >
            <View className="flex px-3 pb-3" >          
                <Text className="font-bold text-[24px]" style={{ color: colors.text }}>Name_user</Text>
                <View className="flex px-2">
                <Text className="font-light text-[14px]" style={{ color: colors.text }}>999+ followers</Text>
                <Text className="font-light text-[14px]" style={{ color: colors.text }}>999+ following</Text>
                </View>
            </View>
            <View className="px-3 items-center">
                <TouchableOpacity
                    style={{ 
                        backgroundColor: colors.primary,
                        opacity: loading ? 0.5 : 1,
                    }}
                    className="rounded-lg py-3 px-6"
                    onPress={() => {}}
                    disabled={loading}
                >
                    <Text style={{ color: colors.textButton }} className="text-center font-bold text-[20px]">
                        {loading
                            ? "Đang xử lý..."
                            : "Theo dõi"
                        }
                    </Text>
                </TouchableOpacity>
            </View>
          </View>
            <ScrollView>
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