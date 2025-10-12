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
import { ThemeToggle } from "../../../../components/ThemeToggle";
import { useTheme } from "../../../../contexts/ThemeContext";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faCircleLeft } from '@fortawesome/free-regular-svg-icons';
import { useLayoutEffect } from 'react';
import MenuPopup from "components/menuPopup";
import Post from "components/post";
import { useUser } from "contexts/UserContext";
import axiosInstance from "lib/axios";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { getUserFollowers, getUserFollowersByUsername, getUserFollowingByUsername, getUserFollowings } from "apis/user";
import UserItem from "components/userItem";
import { Follower, Following } from "interfaces/follow";

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

export default function FollowScreen() {
    const { user } = useUser();
    const params = useLocalSearchParams();
    const username = params.id as string;
    const tab = params.tab as string;
    const isUserProfile = user?.username === username;  

    const { colors } = useTheme();
    const [isMenuVisible, setMenuVisible] = useState(false);
    const [isActive, setIsActive] = useState(tab);
    const [followers, setFollowers] = useState<Follower>();
    const [followings, setFollowings] = useState<Following>();
    const navigation = useNavigation();
    
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
            <TouchableOpacity className="flex-row items-center gap-2" onPress={() => router.back()}>
                <FontAwesomeIcon icon={faCircleLeft} size={24} color={colors.icon} />
                <Text style={{ color: colors.text }}>{username}</Text>
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
    const getUserFollower = async () => {
      try {
        if (isUserProfile) {
          const response = await getUserFollowers();
          setFollowers(response.data);
        } else {
          const response = await getUserFollowersByUsername(username);
          setFollowers(response.data);
        }
      } catch (error) {
        console.error("Error fetching followers:", error);
      }
    }

    const getUserFollowing = async () => {
      try {
        if (isUserProfile) {
          const response = await getUserFollowings();
          setFollowings(response.data);
        } else {
          const response = await getUserFollowingByUsername(username);
          setFollowings(response.data);
        }
      } catch (error) {
        console.error("Error fetching following:", error);
      }
    }

    React.useEffect(() => {
      if (isActive === 'followers') {
        getUserFollower();
      } else if (isActive === 'following') {
        getUserFollowing();
      }
    }, []);

    React.useEffect(() => {
      if (isActive === 'followers') {
        getUserFollower();
      } else if (isActive === 'following') {
        getUserFollowing();
      }
    }, [isActive]);
    
    return (
        <View className="flex- pt-4 " style={{ backgroundColor: colors.background }}>
          <View className="flex-row h-11 w-[94%] justify-around items-center border m-[3%] rounded-[10px]" style={{ borderColor: colors.border }}>
            <TouchableOpacity
              style={[ isActive === 'followers' ? { backgroundColor: colors.surface } : {}]}
              className="w-1/2 h-full justify-center items-center rounded-tl-[10px] rounded-bl-[10px]"
              onPress={() => { setIsActive('followers') }}
            >
              <Text style={{color: colors.text}} className="font-bold text-[16px]">Followers</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[ isActive === 'following' ? { backgroundColor: colors.surface } : {}]}
              className="w-1/2 h-full justify-center items-center rounded-tr-[10px] rounded-br-[10px]"
              onPress={() => { setIsActive('following') }}>
              <Text style={{color: colors.text}} className="font-bold text-[16px]">Following</Text>
            </TouchableOpacity>
          </View>
            <ScrollView className="px-3 w-full h-full" showsVerticalScrollIndicator={false}>
              {
                isActive === 'followers' ? (
                  followers?.followerList && followers?.followerList.length > 0 ? (
                    followers.followerList.map((followerItem) => (
                      <UserItem 
                        key={followerItem.follower.id}
                        username={followerItem.follower.username}
                        canFollow={followerItem.canFollow}
                      />
                    ))
                  ) : (
                    <Text style={{ color: colors.text, textAlign: 'center', marginTop: 20 }}>No followers found.</Text>
                  )
                ) : (
                  followings?.followingList && followings?.followingList.length > 0 ? (
                    followings.followingList.map((followingItem) => (
                      <UserItem 
                        key={followingItem.followee.id}
                        username={followingItem.followee.username}
                        canFollow={followingItem.canFollow}
                      />
                    ))
                  ) : (
                    <Text style={{ color: colors.text, textAlign: 'center', marginTop: 20 }}>No followings found.</Text>
                  )
                )
              }
            </ScrollView>
        </View>
    )
}