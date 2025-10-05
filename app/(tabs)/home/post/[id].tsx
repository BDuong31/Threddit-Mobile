import { View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from 'react';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useTheme } from 'contexts/ThemeContext';
import Post from 'components/post';
import Comment from 'components/comment';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleRight } from '@fortawesome/free-regular-svg-icons';

export default function PostDetailScreen() {
  const { colors } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [comment, setComment] = useState("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
      style={{ backgroundColor: colors.background }}
      keyboardVerticalOffset={0}
    >
      <SafeAreaView className="flex-1">
          <Post
            key={id || 'main-post'}
            username="Name_User"
            time="99 giờ trước"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            likes={999}
            comments={999}
            shares={999}
            saves={999}
          />
        <ScrollView>
          <View className="h-[1px] mx-4 mt-2" style={{ backgroundColor: colors.border }} />
          
          <View className="px-4 pt-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Comment
                key={`comment-${i}`}
                username="Comment_User"
                time="10 giờ trước"
                content="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                likes={99}
                comments={9}
                shares={9}
                saves={9}
              />
            ))}
          </View>
        </ScrollView>

        <View className="px-4 pt-2 pb-8 border-t" style={{ borderTopColor: colors.border }}>
          <View className="relative justify-center">
            <TextInput
              className="bg-transparent px-4 py-3 rounded-2xl border text-base pr-14"
              style={{ borderColor: colors.border, color: colors.text }}
              placeholder="Trả lời Name_User..."
              placeholderTextColor={colors.textSecondary}
              value={comment}
              onChangeText={setComment}
              returnKeyType="send"
              onSubmitEditing={() => {  }}
            />
            {comment.length > 0 && (
              <TouchableOpacity
                className="absolute right-3 h-full justify-center items-center"
                onPress={() => { }}
              >
                <FontAwesomeIcon 
                  icon={faCircleRight}
                  size={28}
                  color={colors.primary}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}