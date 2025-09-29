import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../contexts/AuthContext'; 
import { signOut } from '../apis/auth';
import { Alert } from 'react-native';
interface MenuPopupProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function MenuPopup({ isVisible, onClose }: MenuPopupProps) {
  const { setToken } = useAuth(); 

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
                onClose();
                router.push('/login');
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
        className="flex-1 bg-black/20 justify-end items-end pt-12 pr-4" 
        activeOpacity={1}
        onPress={onClose}
      >
        <View 
          className="absolute top-[8rem] right-[1rem] w-52 bg-[#39393C] rounded-lg shadow-xl" 
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

const MenuItem = ({ text, onPress, isDanger = false, hasArrow = false }: MenuItemProps) => (
    <TouchableOpacity 
        onPress={onPress} 
        className="p-3 flex-row justify-between items-center"
    >
        <Text 
            className={`text-base ${isDanger ? 'font-bold text-red-600' : 'text-[#ffffff]'}`}
        >
            {text}
        </Text>
        {hasArrow && <Text className="text-[#ffffff] text-sm">❯</Text>}
    </TouchableOpacity>
);

