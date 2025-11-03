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
import UserItem from "components/userItem";
export default function SearchScreen() {
    const { colors } = useTheme();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const { setToken } = useAuth();
    const [isActive, setIsActive] = useState<'Post' | 'People'>('Post');
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getUserProfile();
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        }
        fetchUser();
    }, []);

    return (
        <View style={{ backgroundColor: colors.background }} className="flex-col pt-4 h-full">
            <View className="w-full h-12 px-4 mb-2">
              <View style={{ position: 'relative' }}>
                <TextInput
                  style={{ 
                    backgroundColor: 'transparent', 
                    borderColor: colors.border, 
                    color: "#A6A6A6",
                    paddingHorizontal: 50,
                    paddingVertical: 16,
                    borderRadius: 10,
                    borderWidth: 1,
                    fontSize: 20
                  }}
                  placeholder="Tìm kiếm"
                  placeholderTextColor={colors.textSecondary}
                  value={''}
                  onChangeText={(text) => {}}
                  secureTextEntry={false}
                  returnKeyType="done"
                  onSubmitEditing={() => {}}
                />
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    left: 16,
                    top: 7,
                    padding: 4
                  }}
                  onPress={() => {}}
                >
                  <FontAwesome5
                    name={"search"}
                    size={20}
                    color={colors.icon}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View className="flex-row h-12 w-[94%] justify-around items-center border m-[3%] rounded-[10px]" style={{ borderColor: colors.border }}>
                <TouchableOpacity
                style={[ isActive === 'Post' ? { backgroundColor: colors.surface } : {}]}
                className="w-1/2 h-full justify-center items-center rounded-tl-[10px] rounded-bl-[10px]"
                onPress={() => { setIsActive('Post') }}
                >
                <Text style={{color: colors.text}} className="font-bold text-[16px]">Bài viết</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={[ isActive === 'People' ? { backgroundColor: colors.surface } : {}]}
                className="w-1/2 h-full justify-center items-center rounded-tr-[10px] rounded-br-[10px]"
                onPress={() => { setIsActive('People') }}>
                <Text style={{color: colors.text}} className="font-bold text-[16px]">Người dùng</Text>
                </TouchableOpacity>
            </View>
            <ScrollView className="px-3 w-full h-full" style={{ backgroundColor: colors.background }} showsVerticalScrollIndicator={false}>
                { isActive === 'Post' ? (
                    Array.from({ length: 5 }).map((_, i) => (
                        <Post
                        key={`placeholder-post-${i}`} 
                        id={`placeholder-post-${i}`}  
                        username="john_doe"
                        content="Hello, this is my first post!"
                        isPinned={false}
                        time="2 hours ago"
                        commentCount={0}
                        saveCount={0}
                        mentionedUser={[]}
                        upvoteNumber={0}
                        downvoteNumber={0}
                        />
                    ))
                ) : (
                    Array.from({ length: 5 }).map((_, i) => (
                        <UserItem
                            key={`placeholder-user-${i}`}
                            username={`user_${i}`}
                            canFollow={i % 2 === 0}
                        />
                    ))
                )}
            </ScrollView>
        </View>
    )
}