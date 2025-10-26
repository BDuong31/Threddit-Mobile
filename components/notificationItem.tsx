import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useTheme } from "../contexts/ThemeContext";
import { faArrowDown, faArrowUp, faArrowUp19, faBookmark, faComment, faCommentDots, faEllipsisH, faMessage, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faCommentDots as faCommentSoild, faPaperPlane as faPaperPlaneSoild, faBookmark as faBookmarkSoild } from "@fortawesome/free-solid-svg-icons";
import { faCommentDots as faCommentRegular, faPaperPlane as faPaperPlaneRegular, faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import { router } from "expo-router";
import { relativeTime } from "lib/relative-time";

interface NotificationProps {
  id: string;
  createdAt: Date;
  type: string;
  target: string;
  isRead: boolean;
  content: string; 
  readNotification?: (id: string) => void;
}

const Notification: React.FC<NotificationProps> = ({
  id,
  createdAt,
  type,
  target,
  isRead,
  content,
  readNotification,
}) => {
  const { colors } = useTheme();

  return (
    // <View className="rounded-2xl">
    //   <View className="flex-col items-start mb-2">
    //         <Text style={{ color: colors.text }} className="text-sm leading-5 mb-4">{content}</Text>
    //         <Text style={{ color: colors.textSecondary }} className="text-xs leading-4">{relativeTime(createdAt, new Date())}</Text>
    //   </View>
    //   <View className="border-b my-3" style={{ borderColor: colors.border }}></View>
    // </View>
    <>
        <TouchableOpacity
        className="rounded-2xl"
        style={{ backgroundColor: isRead ? colors.background : colors.surface }}
        onPress={() => {
            if (!isRead) {
                readNotification && readNotification(id);
            }
            if (type === 'follow') {
                router.push(`profile/${target}`);
                return;
            }
            if (type === 'like' || type === 'comment') {
                router.push(`post/${target}`);
                return;
            }
        }}
        >
            {
                isRead ? null : <View className="absolute w-2 h-2 bg-blue-500 rounded-full right-2 top-2"></View>
            }
        <View className="flex-col items-start mb-2 p-3">
                <Text style={{ color: colors.text }} className="text-sm leading-5 mb-4">{content}</Text>
                <Text style={{ color: colors.textSecondary }} className="text-xs leading-4">{relativeTime(createdAt, new Date())}</Text>
        </View>
        </TouchableOpacity>
        <View className="border-b my-3" style={{ borderColor: colors.border }}></View>

    </>
  );
};

export default Notification;
