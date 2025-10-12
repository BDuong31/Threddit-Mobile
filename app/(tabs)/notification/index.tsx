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
import Notification from "../../../components/notificationItem";
import { useSSE } from "contexts/SSEContext";
export default function Home() {
    const { notifications, readNotification } = useSSE();
    const { colors } = useTheme();
    const [loading, setLoading] = useState(false);
    const { setToken } = useAuth();
    const [isActive, setIsActive] = useState<'All' | 'Read' | 'UnRead'>('All');

    return (
        <View style={{ backgroundColor: colors.background }} className="flex-col pt-4 h-full">
            <View className="flex-row h-11 w-[94%] justify-around items-center border m-[3%] rounded-[10px]" style={{ borderColor: colors.border }}>
                <TouchableOpacity
                    style={[ isActive === 'All' ? { backgroundColor: colors.surface } : {}]}
                    className="w-1/3 h-full justify-center items-center rounded-tl-[10px] rounded-bl-[10px]"
                    onPress={() => { setIsActive('All') }}
                >
                    <Text style={{color: colors.text}} className="font-bold text-[16px]">All</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[ isActive === 'Read' ? { backgroundColor: colors.surface } : {}]}
                    className="w-1/3 h-full justify-center items-center rounded-tr-[10px] rounded-br-[10px]"
                    onPress={() => { setIsActive('Read') }}
                >
                    <Text style={{color: colors.text}} className="font-bold text-[16px]">Read</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[ isActive === 'UnRead' ? { backgroundColor: colors.surface } : {}]}
                    className="w-1/3 h-full justify-center items-center rounded-tr-[10px] rounded-br-[10px]"
                    onPress={() => { setIsActive('UnRead') }}
                >
                    <Text style={{color: colors.text}} className="font-bold text-[16px]">Un Read</Text>
                </TouchableOpacity>
            </View>
            <ScrollView className="px-3 w-full h-full" style={{ backgroundColor: colors.background }} showsVerticalScrollIndicator={false}>
                {/* {Array.from({ length: 5 }).map((_, i) => (
                    <Notification
                        key={i}
                        id="1"
                        createdAt={new Date()}
                        type="like"
                        target="post"
                        isRead={false}
                        content="User A liked your post."
                        readNotification={() => {
                            readNotification("1")
                        }}
                    />
                ))} */}
                {
                    notifications.filter(n => {
                        if (isActive === 'All') return true;
                        if (isActive === 'Read') return n.isRead;
                        if (isActive === 'UnRead') return !n.isRead;
                    }).map((notification) => (
                        <Notification
                            key={notification.id}
                            id={notification.id}
                            createdAt={new Date(notification.createdAt)}
                            type={notification.type}
                            target={notification.target}
                            isRead={notification.isRead}
                            content={notification.content}
                            readNotification={() => {
                                readNotification(notification.id)
                            }}
                        />
                    ))
                }
            </ScrollView>
        </View>
    )
}