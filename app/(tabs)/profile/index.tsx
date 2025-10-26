import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect, useNavigation } from "expo-router";
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
import { useUser } from "contexts/UserContext";
import { Posts } from "interfaces/post";
import { getPostSave, getPostsUser } from "apis/post";
import { relativeTime } from "lib/relative-time";

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
    const { user } = useUser();
    const { colors } = useTheme();
    const [isMenuVisible, setMenuVisible] = useState(false);
    const [isActive, setIsActive] = useState('Post');
    const [ posts, setPosts ] = useState<Posts>();
    const [ savedPosts, setSavedPosts ] = useState<Posts>();
    const [ loading, setLoading ] = useState(false);

    React.useEffect(() => {
        const fetchPosts = async () => {
          setLoading(true);
          try {
            const response = await getPostsUser();
            setPosts(response.data);
          } catch (error) {
            console.error("Error fetching posts:", error);
            Alert.alert("Error", "There was an error fetching posts.");
            setLoading(false);
          } finally {
            setLoading(false);
          }
        }

        const fetchSavedPosts = async () => {
          setLoading(true);
          try {
            const response = await getPostSave(null);
            setSavedPosts(response.data);
          } catch (error) {
            console.error("Error fetching saved posts:", error);
            Alert.alert("Error", "There was an error fetching saved posts.");
            setLoading(false);
          } finally {
            setLoading(false);
          }
        }

        if (isActive === 'Post') {
          fetchPosts();
        } else if (isActive === 'Bookmark') {
          fetchSavedPosts();
        }

        fetchPosts();
      }, [isActive]);

    return (
        <View className="flex- pt-4 " style={{ backgroundColor: colors.background }}>
          <View className="flex px-3" >          
            <Text className="font-bold text-[24px]" style={{ color: colors.text }}>{user?.username}</Text>
            <View className="flex px-2">
              <TouchableOpacity
                onPress={() => { router.push(`/profile/${user?.username}/follow?tab=followers`) }}
              >
                <Text className="font-light text-[14px]" style={{ color: colors.text }}>{user?.followerNumber} followers</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => { router.push(`/profile/${user?.username}/follow?tab=following`) }}
              >
                <Text className="font-light text-[14px]" style={{ color: colors.text }}>{user?.followingNumber} following</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex-row h-12 w-[94%] justify-around items-center border m-[3%] rounded-[10px]" style={{ borderColor: colors.border }}>
            <TouchableOpacity
              style={[ isActive === 'Post' ? { backgroundColor: colors.surface } : {}]}
              className="w-1/2 h-full justify-center items-center rounded-tl-[10px] rounded-bl-[10px]"
              onPress={() => { setIsActive('Post') }}
            >
              <Text style={{color: colors.text}} className="font-bold text-[16px]">Post</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[ isActive === 'Bookmark' ? { backgroundColor: colors.surface } : {}]}
              className="w-1/2 h-full justify-center items-center rounded-tr-[10px] rounded-br-[10px]"
              onPress={() => { setIsActive('Bookmark') }}>
              <Text style={{color: colors.text}} className="font-bold text-[16px]">Bookmark</Text>
            </TouchableOpacity>
          </View>
            <ScrollView className="px-3 w-full h-full" showsVerticalScrollIndicator={false}>
              { isActive === 'Post' ? (
                  !posts ? (
                    <Text style={{ color: colors.text }} className="text-center mt-5">No posts available.</Text>
                  ) : (
                    posts.posts?.map((post) => (
                      <Post
                       key={post.id}
                       id={post.id}
                       username={user?.username || "Unknown"}
                       content={post.content}
                       isPinned={post.isPinned}
                       time={relativeTime(post.createdAt, Date.now())}
                       commentCount={post.commentNumber || 0}
                       saveCount={post.saveNumber || 0}
                       mentionedUser={post.mentionedUser || []}
                       upvoteNumber={post.upvoteNumber || 0}
                       downvoteNumber={post.downvoteNumber || 0}
                      />
                    ))
                  )
                ) : (
                  !savedPosts ? (
                    <Text style={{ color: colors.text }} className="text-center mt-5">No saved posts available.</Text>
                  ) : (
                    savedPosts.posts?.map((post) => (
                      <Post
                       key={post.id}
                       id={post.id}
                       username={user?.username || "Unknown"}
                       content={post.content}
                       isPinned={post.isPinned}
                       time={relativeTime(post.createdAt, Date.now())}
                       commentCount={post.commentNumber || 0}
                       saveCount={post.saveNumber || 0}
                       mentionedUser={post.mentionedUser || []}
                       upvoteNumber={post.upvoteNumber || 0}
                       downvoteNumber={post.downvoteNumber || 0}
                      />
                    ))
                  )
                )
              }
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
        </View>
    )
}