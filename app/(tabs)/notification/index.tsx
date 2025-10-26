import { FontAwesome5 } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator,
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
import { INotification } from "interfaces/notification";
export default function Home() {
    const { 
            notifications, 
            notificationsUnRead, 
            readNotification,
            fetchMoreNotificationsAll,
            isLoadingMoreAll,
            hasNextPageAll,
            fetchMoreNotificationsUnRead,
            isLoadingMoreUnRead,
            hasNextPageUnRead
        } = useSSE();
    const { colors } = useTheme();
    const [loading, setLoading] = useState(false);
    const { setToken } = useAuth();
    const [isActive, setIsActive] = useState<'All' | 'UnRead'>('All');

    const renderNotificationItem = ({ item }: { item: INotification }) => (
        <Notification
            key={item.id}
            id={item.id}
            createdAt={new Date(item.createdAt)}
            type={item.type}
            target={item.target}
            isRead={item.isRead}
            content={item.content}
            readNotification={() => {
                readNotification(item.id)
            }}
        />
    );

    const renderFooter = (isLoading: boolean) => {
        if (!isLoading) return null;
        return <ActivityIndicator size="large" color={colors.text} style={{ marginVertical: 20 }} />;
    };
    return (
        <View style={{ backgroundColor: colors.background }} className="flex-col pt-4 h-full">
            <View className="flex-row h-12 w-[94%] justify-around items-center border m-[3%] rounded-[10px]" style={{ borderColor: colors.border }}>
                <TouchableOpacity
                    style={[ isActive === 'All' ? { backgroundColor: colors.surface } : {}]}
                    className="w-1/2 h-full justify-center items-center rounded-tl-[10px] rounded-bl-[10px]"
                    onPress={() => { setIsActive('All') }}
                >
                    <Text style={{color: colors.text}} className="font-bold text-[16px]">All</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[ isActive === 'UnRead' ? { backgroundColor: colors.surface } : {}]}
                    className="w-1/2 h-full justify-center items-center rounded-tr-[10px] rounded-br-[10px]"
                    onPress={() => { setIsActive('UnRead') }}
                >
                    <Text style={{color: colors.text}} className="font-bold text-[16px]">Un Read</Text>
                </TouchableOpacity>
            </View>
            
            {isActive === 'All' ? (
                <FlatList
                    data={notifications}
                    renderItem={renderNotificationItem}
                    keyExtractor={(item) => item.id}
                    style={{ flex: 1, width: '100%' }}
                    contentContainerStyle={{ paddingHorizontal: 12 }} // Tương đương px-3
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        if (!isLoadingMoreAll && hasNextPageAll) {
                            fetchMoreNotificationsAll();
                        }
                    }}
                    ListFooterComponent={() => renderFooter(isLoadingMoreAll)}
                />
            ) : (
                <FlatList
                    data={notificationsUnRead}
                    renderItem={renderNotificationItem}
                    keyExtractor={(item) => item.id}
                    style={{ flex: 1, width: '100%' }}
                    contentContainerStyle={{ paddingHorizontal: 12 }}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        if (!isLoadingMoreUnRead && hasNextPageUnRead) {
                            fetchMoreNotificationsUnRead();
                        }
                    }}
                    ListFooterComponent={() => renderFooter(isLoadingMoreUnRead)}
                />
            )}
        </View>
    )
}