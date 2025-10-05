import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../contexts/AuthContext'; 
import { signOut } from '../apis/auth';
import { Alert } from 'react-native';
import { useTheme } from 'contexts/ThemeContext';
interface MenuPopupProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function MenuPopup({ isVisible, onClose }: MenuPopupProps) {
  const { setToken, isAuthenticated, isLoading} = useAuth();
  const { colors } = useTheme();
  
  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, isLoading]);

  const handleLogout = async () => {
    try {
      const res = await signOut();
      if (res?.statusCode === 200) {
        Alert.alert('Đăng xuất', 'Bạn đã đăng xuất thành công.',
          [
            {
              text: 'OK',
              onPress: () => {
                setToken(null);
              }
            }
          ]
        );
      }
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert(
        'Lỗi',
        'Đăng xuất thất bại. Vui lòng thử lại.',
        [
          {
            text: 'OK',
            onPress: () => {}
          } 
        ]
      );
    }
  };
  
  const handleNavigate = (path: string) => {
    onClose();
    router.push(path);
  };

  return (
    <Modal
      animationType="fade" 
      transparent={true}    
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        className="flex-1 justify-end items-end pt-12 pr-4" 
        activeOpacity={1}
        onPress={onClose}
      >
        <View 
          style={{ backgroundColor: colors.surface, borderColor: colors.border }}
          className="absolute top-[8rem] right-[1rem] w-52 rounded-lg shadow-xl" 
        >
            <MenuItem 
                text="Thông tin cá nhân" 
                onPress={() => handleNavigate('/editProfile')} 
                hasArrow={true}
            />
            <MenuItem
                text="Đổi mật khẩu"
                onPress={() => handleNavigate('/changePassword')}
                hasArrow={true}
            />
            <MenuItem text="Đăng xuất" onPress={handleLogout} isDanger={true} />
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

interface MenuItemProps {
    text: string;
    onPress: () => void;
    isDanger?: boolean;
    hasArrow?: boolean;
}

const MenuItem = ({ text, onPress, isDanger = false, hasArrow = false }: MenuItemProps) => {
    const { colors } = useTheme();
    return (
      <TouchableOpacity 
          onPress={onPress} 
          className="p-3 flex-row justify-between items-center"
      >
          <Text 
              style={{ color: isDanger ? colors.error : colors.text }}
              className={`text-base `}
          >
              {text}
          </Text>
          {hasArrow && <Text style={{ color: colors.text }} className="text-sm">❯</Text>}
      </TouchableOpacity>
    );
};

