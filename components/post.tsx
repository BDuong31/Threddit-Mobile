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
  time: string;
  content: string;
  likes?: number;
  comments?: number;
  shares?: number;
  saves?: number;
}

const Post: React.FC<PostProps> = ({
  username,
  time,
  content,
  likes = 0,
  comments = 0,
  shares = 0,
  saves = 0,
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
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-row gap-[10px] items-center text-[16px]">
          <TouchableOpacity
            onPress={() => {
              router.push("profile/123");
              }
            }
          >
            <Text style={{ color: colors.text }} className="font-bold">{username}</Text>
          </TouchableOpacity>
          <Text style={{ color: colors.textSecondary }} className="text-xs">{time}</Text>
        </View>
        <FontAwesomeIcon
          icon={faEllipsisH} 
          size={20} 
          color={colors.icon} 
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          router.push("home/post/123");
        }}
      >
        <Text style={{ color: colors.text }} className="text-sm leading-5 mb-4">{content}</Text>
      </TouchableOpacity>

      <View className="flex-row gap-[5px]">
        <View style={{ stroke: colors.icon, backgroundColor: isLiked19 ? colors.surface : isLiked ? colors.success : colors.error }} className="flex-row items-center space-x-1 p-[10px] rounded-[50px] gap-[5px]">
          <TouchableOpacity 
            className="flex-row items-center space-x-1"
            onPress={handleLike}
          >
            <FontAwesomeIcon
              icon={faArrowUp}
              size={18}
              style={{
                color: isLiked ? colors.icon : "transparent",
                stroke: colors.icon,
                strokeWidth: 30,
              }}
            />
          </TouchableOpacity>
          <Text style={{ color: colors.text }} className="text-xs">{likes}+</Text>
          <TouchableOpacity 
            className="flex-row items-center space-x-1"
            onPress={handleDislike}
          >
            <FontAwesomeIcon
              icon={faArrowDown}
              size={18}
              style={{
                color: isDisliked ? colors.icon : "transparent",
                stroke: colors.icon,
                strokeWidth: 30,
              }}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={{ stroke: colors.icon, backgroundColor: colors.surface }} className="flex-row items-center space-x-1 p-[10px] rounded-[50px] gap-[5px]">
            <FontAwesomeIcon 
              icon={faCommentRegular} 
              size={18} 
              color={colors.icon}
            />
          <Text style={{ color: colors.text}} className="text-xs">{comments}+</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ stroke: colors.icon, backgroundColor: colors.surface }} className="flex-row items-center space-x-1 p-[10px] rounded-[50px] gap-[5px]">
          <FontAwesomeIcon 
            icon={faPaperPlaneRegular} 
            size={18} 
            color={colors.icon}
          />
          <Text style={{ color: colors.text }} className="text-xs">{shares}+</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={{ stroke: colors.icon, backgroundColor: colors.surface }} className="flex-row items-center space-x-1 p-[10px] rounded-[50px] gap-[5px]"
          onPress={handleBookmark}
        >
          <FontAwesomeIcon
            icon={isBookmarked ? faBookmarkSoild : faBookmarkRegular} 
            size={18} 
            color={isBookmarked ? colors.warning : colors.icon}
          />
          <Text style={{ color: colors.text }} className="text-xs">{shares}+</Text>
        </TouchableOpacity>
      </View>
      <View className="border-b my-3" style={{ borderColor: colors.border }}></View>
    </View>
  );
};

export default Post;
