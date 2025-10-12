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
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useLayoutEffect } from 'react';
import MenuPopup from "components/menuPopup";
import { Posts }  from "interfaces/post";
import Post from "components/post";
import { IUser, IUserProfile } from "interfaces/user";
import { followUser, getUserFollowByUsername, getUserStateByUsername, unfollowUser } from "apis/user";
import { getPostsByUsername } from "apis/post";
import { relativeTime } from "lib/relative-time";
import post from "components/post";

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

// interface UserPost {
//   id: string;
//   content: string;
//   image_url?: string;
//   user_id: string;
//   created_at: string;
//   updated_at: string;
//   likes_count?: number;
//   comments_count?: number;
//   is_liked?: boolean;
// }

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
    const username  = useLocalSearchParams().id as string;
    const [ UserProfile, setUserProfile ] = useState<IUserProfile>();
    const [ posts, setPosts ] = useState<Posts>();
    

    useLayoutEffect(() => {
      navigation.setOptions({
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: colors.background,
          borderBottomColor: "transparent",
          shadowColor: "transparent",
          height: 50,
          paddingBottom: 0,
          paddingTop: 0,
          borderTopWidth: 0,
          elevation: 0, 
        },
        headerTitle: () => (
          <Image
            source={require('../../../../assets/icon.png')}
            style={{ width: 32, height: 32 }}
          />
        ),
        headerBackVisible: false,
      });
    }, [navigation, colors]);

    React.useEffect(() => {
      const fetchUserProfile = async () => {
        try {
          const responseUser = await getUserStateByUsername(username);
          const responseFollowCount = await getUserFollowByUsername(username);
          const data = {
            ...responseUser.data,
            ...responseFollowCount.data,
          }
          setIsFollow(responseUser.data.isFollow);
          console.log("User Profile Data:", data);
          setUserProfile(data);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }

      const fetchUserPosts = async () => {
        try {
          const response = await getPostsByUsername(username, null);
          console.log("User Posts:", response);
          setPosts(response.data);
        } catch (error) {
          console.error("Error fetching user posts:", error);
        }
      };

      fetchUserPosts();
      fetchUserProfile();
    }, [username, isFollow]);

    const toggleFollow = async () => {
      setLoading(true);
      try {
        if (isFollow) {
          const response = await unfollowUser(username);
          console.log("Unfollow Response:", response.message);
          setIsFollow(!isFollow);
          return;
        } else {
          const response = await followUser(username);
          console.log("Follow Response:", response.message);
          setIsFollow(!isFollow);
        }
      } catch (error) {
        console.error("Error toggling follow status:", error);
      } finally {
        setLoading(false);
      }
    }

    console.log("UserProfile:", UserProfile);
    console.log("Posts Data:", posts);

    return (
        <SafeAreaView edges={['bottom']} className="flex-1 " style={{ backgroundColor: colors.background }}>
          <View className="flex-row pt-2 justify-between" >
            <View className="flex px-3 pb-3" >          
                <Text className="font-bold text-[24px]" style={{ color: colors.text }}>{UserProfile?.username}</Text>
                <View className="flex px-2">
                <TouchableOpacity onPress={() => {
                    router.push(`profile/${username}/follow?tab=followers`);
                }}> 
                  <Text className="font-light text-[14px]" style={{ color: colors.text }}>{UserProfile?.followerNumber} followers</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    router.push(`profile/${username}/follow?tab=following`);
                }}>
                  <Text className="font-light text-[14px]" style={{ color: colors.text }}>{UserProfile?.followingNumber} following</Text>
                </TouchableOpacity>
                </View>
            </View>
            <View className="px-3 items-center">
                <TouchableOpacity
                    style={{ 
                        backgroundColor: colors.primary,
                        opacity: loading ? 0.5 : 1,
                    }}
                    className="rounded-lg py-3 px-6"
                    onPress={() => {
                        toggleFollow();
                    }}
                    disabled={loading}
                >
                    <Text style={{ color: colors.textButton }} className="text-center font-bold text-[20px]">
                        { loading ?
                            "Đang xử lý..."
                            : isFollow
                            ? "Đang theo dõi"
                            : "Theo dõi"
                        }
                    </Text>
                </TouchableOpacity>
            </View>
          </View>
            <ScrollView className="px-3">
              {
                posts ? (
                  console.log("Posts Data:", posts.posts),
                  posts.posts?.map((item) => (
                    console.log("Post Item:", item),
                    <Post
                      key={item.id}
                      id={item.id}
                      username={UserProfile?.username || "Unknown"}
                      content={item.content}
                      isPinned={item.isPinned}
                      time={relativeTime(item.createdAt, Date.now())}
                      commentCount={item.commentNumber || 0}
                      saveCount={item.saveNumber || 0}
                      mentionedUser={item.mentionedUser || []}
                      upvoteNumber={item.upvoteNumber || 0}
                      downvoteNumber={item.downvoteNumber || 0}
                    />
                  ))
                ) : (
                  <Text className="text-center mt-10" style={{ color: colors.text }}>No posts available.</Text>
              )}
                {/* {Array.from({ length: 5 }).map((_, i) => (
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
                ))} */}
            </ScrollView>
        </SafeAreaView>
    )
}