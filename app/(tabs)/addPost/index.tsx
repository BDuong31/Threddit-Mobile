import { router, useFocusEffect, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import { useTheme } from "../../../contexts/ThemeContext";
import { View, TextInput, Text, FlatList, TouchableOpacity, StyleSheet, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { SafeAreaView } from "react-native";
import { useUser } from "contexts/UserContext";
import { getUserFollowings } from "apis/user";
import { Following } from "interfaces/follow";
import { CreatePost } from "interfaces/post";
import { createPost } from "apis/post";

export default function AddPostScreen() {
  const { user } = useUser()
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mentionQuery, setMentionQuery] = useState('');
  const navigation = useNavigation();
  const hiddenInputRef = useRef(null);

  const [followings, setFollowings] = useState<Following>();

  const getUserFollowing = async () => {
    try {
      const response = await getUserFollowings(null);

      const newFollowers = response.data.followingList || [];
      const newCursor = response.data.cursor;

      setFollowings({
        cursor: newCursor,
        followingList: newFollowers,
      });
    } catch (error) {
      console.error("Error fetching following users:", error);
    }
  }; 

  const createPosts = async (dto: CreatePost) => {
    setLoading(true);
    try {
      const response = await createPost(dto);
      console.log("Bài viết đã được tạo:", response);
      setText('');
      setShowSuggestions(false);
      setMentionQuery('');
      navigation.goBack();
    } catch (error) {
      console.error("Lỗi khi tạo bài viết:", error);
      Alert.alert("Lỗi", "Không thể tạo bài viết. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUserFollowing();
  }, []);

  // const filteredUsers = users.filter(u => u.name.toLowerCase().includes(mentionQuery.toLowerCase()));
  const filteredUsers = followings?.followingList
    .map(f => f.followee)
    .filter(u => u.username.toLowerCase().includes(mentionQuery.toLowerCase()))
    .map(u => ({ id: u.id, name: u.username })) || [];
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => {
        return (
          <Text style={{ color: colors.text, fontSize: 18, fontWeight: 'bold' }}>
            Threaddit mới
          </Text>
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
  }, [colors]);

  const handleChangeText = (val: string) => {
    setText(val);

    const parts = val.split(/\s/);
    const lastWord = parts.pop() || '';

    if (lastWord.startsWith('@')) {
      const query = lastWord.slice(1);
      setMentionQuery(query);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setMentionQuery('');
    }
  };

  const handleSelectUser = (user: { id: string; name: string }) => {
    const parts = text.split(/\s/);
    parts.pop();
    parts.push(`@${user.name}`);
    setText(parts.join(' ') + ' ');
    setShowSuggestions(false);
    setMentionQuery('');
    hiddenInputRef.current?.focus();
  };

  const renderItem = ({ item }: { item: { id: string; name: string } }) => (
    <TouchableOpacity
      style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: colors.border }}
      onPress={() => handleSelectUser(item)}
    >
      <Text style={{ color: colors.text }}>@<Text style={{ fontWeight: 'bold' }}>{item.name}</Text></Text>
    </TouchableOpacity>
  );

  const renderTextWithTags = () => {
    if (!text.trim() && !text.includes(' ')) {
      return (
        <Text style={{ color: colors.textSecondary, fontSize: 16 }}>
            Tin gì mới ?
        </Text>
      );
    }

    const words = text.split(/(\s+)/);

    return words.map((word, index) => {
      if (word.match(/\s+/)) {
        return <Text key={index}>{word}</Text>;
      }
      
      const isTag = word.startsWith('@');
      const username = word.slice(1);
      const userExists = filteredUsers.some(u => u.name === username);

      if (isTag && userExists) {
        return (
          <Text key={index} style={{ fontWeight: 'bold', color: colors.primary }}>
            {word}
          </Text>
        );
      } else {
        return (
          <Text key={index} style={{ color: colors.text }}>
            {word}
          </Text>
        );
      }
    });
  };

  const handlePost = () => {
    const taggedUsers = [];
    const words = text.split(/\s+/);
    console.log("Words:", words);

    words.forEach(word => {
      if (word.startsWith('@')) {
        const username = word.slice(1);
        if (filteredUsers.some(u => u.name === username)) {
          taggedUsers.push(username);
        }
      }
    });

    const dto: CreatePost = {
      content: text,
      mentionedUser: taggedUsers,
    };

    createPosts(dto);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0} 
        >
          <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 16 }}> 
            
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
              <View style={{ flex: 1 }}> 
                <View className="flex-row">
                  <View className="flex-1">
                    <Text className="font-bold text-base mb-1" style={{ color: colors.text }}>
                      {user?.username}
                    </Text>
                    
                    <TouchableOpacity 
                      activeOpacity={1} 
                      onPress={() => hiddenInputRef.current?.focus()} 
                      style={{ 
                        minHeight: 10, 
                        maxHeight: 100, 
                        paddingTop: 0, 
                        paddingBottom: 0, 
                      }}
                    >
                      <Text style={{ fontSize: 16, lineHeight: 24, minHeight: 10 }} selectable={false}>
                        {renderTextWithTags()}
                      </Text>
                    </TouchableOpacity>
                    
                    <TextInput
                      ref={hiddenInputRef}
                      value={text}
                      onChangeText={handleChangeText}
                      style={{
                        position: 'absolute',
                        top: 40,
                        left: 0,
                        right: 0,
                        height: 10,
                        fontSize: 16,
                        color: 'transparent',
                        zIndex: -1,
                        backgroundColor: 'transparent'
                      }}
                      multiline={true}
                      caretHidden={true}
                    />
                  </View>
                </View>

                {showSuggestions && filteredUsers.length > 0 && (
                  <View style={{
                    maxHeight: 150,
                    borderColor: colors.border,
                    borderWidth: 1,
                    borderRadius: 8,
                    marginTop: 10,
                    backgroundColor: colors.background
                  }}>
                    <FlatList
                      data={filteredUsers}
                      keyExtractor={(item) => item.id}
                      renderItem={renderItem}
                      keyboardShouldPersistTaps="always" 
                    />
                  </View>
                )}
              </View>
            </TouchableWithoutFeedback>

            <View style={{ paddingBottom: 0 }}> 
              <View className="flex-row justify-between items-center">
                <Text style={{ color: colors.textSecondary }} className="text-sm mb-2">
                  Mọi người có thể trả lời
                </Text>
                <View className="px-3 items-center">
                  <TouchableOpacity
                    style={{
                      backgroundColor: colors.primary || 'white',
                      opacity: loading || !text.trim() ? 0.5 : 1,
                    }}
                    className="rounded-lg py-3 px-6"
                    onPress={() => {
                      console.log("Đăng bài");
                      handlePost();
                    }}
                    disabled={loading || !text.trim()}
                  >
                    <Text style={{ color: colors.background }} className="text-center font-bold text-[20px]">
                      {loading
                        ? "Đang xử lý..."
                        : "Đăng"
                      }
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
    </SafeAreaView>
  );
}