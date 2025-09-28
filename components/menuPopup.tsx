import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../contexts/AuthContext'; 

interface MenuPopupProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function MenuPopup({ isVisible, onClose }: MenuPopupProps) {
  const { setToken } = useAuth(); 

  const handleLogout = async () => {
    try {
        await setToken(null); 
        router.replace('/login');
    } catch (error) {
        console.error("Logout failed:", error);
        await setToken(null); 
        router.replace('/login');
    } finally {
        onClose(); 
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
        // Thay thế styles.backdrop
        className="flex-1 bg-black/20 justify-end items-end pt-12 pr-4" 
        activeOpacity={1}
        onPress={onClose}
      >
        <View 
          className="absolute top-[8rem] right-[1rem] w-52 bg-[#ffffff] rounded-lg shadow-xl" 
        >
            <MenuItem 
                text="Thông tin chi tiết" 
                onPress={() => handleNavigate('/editProfile')} 
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
            className={`text-base ${isDanger ? 'font-bold text-red-600' : 'text-gray-800'}`}
        >
            {text}
        </Text>
        {hasArrow && <Text className="text-gray-400 text-sm">❯</Text>}
    </TouchableOpacity>
);

