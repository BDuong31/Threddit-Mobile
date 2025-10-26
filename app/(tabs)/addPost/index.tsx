import { router, useFocusEffect, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useState, useLayoutEffect } from 'react';
import { useTheme } from "../../../contexts/ThemeContext";
import { View, TextInput, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native";
import { useUser } from "contexts/UserContext";

export default function AddPostScreen() {
  const { user } = useUser()
  const [text, setText] = useState('');
  const [ loading, setLoading ] = useState(false);
  const { colors } = useTheme();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mentionQuery, setMentionQuery] = useState('');
  const navigation = useNavigation();
  
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
    })
  const users = [
    { id: '1', name: 'john_doe' },
    { id: '2', name: 'jane_smith' },
    { id: '3', name: 'alice' },
  ];

  const filteredUsers = users.filter(u => u.name.includes(mentionQuery));

  const handleChangeText = (val: string) => {
    setText(val);
    const lastWord = val.split(/\s/).pop() || '';
    if (lastWord.startsWith('@')) {
      setMentionQuery(lastWord.slice(1));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelectUser = (user: { id: string; name: string }) => {
    const parts = text.split(/\s/);
    parts.pop(); 
    parts.push(`@${user.name}`);
    setText(parts.join(' ') + ' ');
    setShowSuggestions(false);
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      <View className="flex-1 p-4 justify-between">
        
        <View>
          <View className="flex-row">
            <View className="flex-1">
              <Text className="font-bold text-base mb-1" style={{ color: colors.text }}>
                {user?.username}
              </Text>
              <TextInput
                placeholder="Tin gì mới ?"
                placeholderTextColor="gray"
                value={text}
                onChangeText={handleChangeText}
                style={{ color: colors.textSecondary, minHeight: 100, maxHeight: 300 }}
                className="text-base"
                multiline={true} 
                autoFocus={true} 
              />
            </View>
          </View>
        </View>

        <View>
          <View className="flex-row justify-between items-center">
            <Text style={{ color: colors.textSecondary }} className="text-sm mb-2">
              Mọi người có thể trả lời
            </Text>
            <View className="px-3 items-center">
              <TouchableOpacity
                style={{ 
                    backgroundColor: 'white',
                    opacity: loading ? 0.5 : 1,
                }}
                className="rounded-lg py-3 px-6"
                onPress={() => {}}
                disabled={loading}
              >
                <Text style={{ color: 'black' }} className="text-center font-bold text-[20px]">
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
    </SafeAreaView>
  );
}