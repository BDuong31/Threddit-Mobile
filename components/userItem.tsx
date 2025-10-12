import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useTheme } from "../contexts/ThemeContext";
import { faArrowDown, faArrowUp, faArrowUp19, faBookmark, faComment, faCommentDots, faEllipsisH, faMessage, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faCommentDots as faCommentSoild, faPaperPlane as faPaperPlaneSoild, faBookmark as faBookmarkSoild } from "@fortawesome/free-solid-svg-icons";
import { faCommentDots as faCommentRegular, faPaperPlane as faPaperPlaneRegular, faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import { router } from "expo-router";

interface PostProps {
  username: string;
  canFollow?: boolean;
  loading?: boolean;
}

const UserItem: React.FC<PostProps> = ({
    username,
    canFollow = false,
    loading = false,
}) => {
  const { colors } = useTheme();
  const [isLiked, setIsLiked] = React.useState(false);
  const [isDisliked, setIsDisliked] = React.useState(false);
  const [isLiked19, setIsLiked19] = React.useState(true);
  const [isBookmarked, setIsBookmarked] = React.useState(false);

  React.useEffect(() => {
    if(!isLiked && !isDisliked) {
      setIsLiked19(true);
    }
    else {
      setIsLiked19(false);
    }
  })
  const handleLike = () => {
    setIsLiked(!isLiked);
    if (isDisliked && !isLiked) {
      setIsDisliked(false);
    }
  }

  const handleDislike = () => {
    setIsDisliked(!isDisliked);
    if (isLiked && !isDisliked) {
      setIsLiked(false);
    }
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  }
  return (
    <View className="rounded-2xl">
      <View className="flex-row justify-between items-center py-[16px]">
        <View className="flex-row items-center text-[16px] h-[36px]">
          <TouchableOpacity
            onPress={() => {
              router.push(`profile/${username}`);
              }
            }
          >
            <Text style={{ color: colors.text }} className="font-bold text-[16px]">{username}</Text>
          </TouchableOpacity>
        </View>
        {canFollow && (
            <View className="px-3 items-center">
                <TouchableOpacity
                    style={{ 
                        backgroundColor: colors.primary,
                        opacity: loading ? 0.5 : 1,
                    }}
                    className="rounded-lg py-3 px-6"
                    onPress={() => {}}
                    disabled={loading}
                >
                    <Text style={{ color: colors.textButton }} className="text-center font-bold text-[20px]">
                        {loading
                            ? "Đang xử lý..."
                            : "Theo dõi"
                        }
                    </Text>
                </TouchableOpacity>
            </View>
        )}
      </View>
      <View className="border-b my-3" style={{ borderColor: colors.border }}></View>
    </View>
  );
};

export default UserItem;
