import { FontAwesome } from "@expo/vector-icons";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faBars, faUser, faCog, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, Image, View } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import MenuPopup from "../../components/menuPopup";
import { router } from "expo-router";
import { ProfileProvider } from "contexts/UserContext";

export default function TabLayout() {
  const { colors } = useTheme();
  const [pendingRequestCount, setPendingRequestCount] = useState(0);
  const [isMenuVisible, setMenuVisible] = useState(false); 

  return (
    <ProfileProvider>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          borderTopWidth: StyleSheet.hairlineWidth,
          height: 55,
          paddingBottom: 5,
        },
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerShown: true,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon 
              icon={faHome}  
              size={24}      
              color="#CDCCCD"
            />          
          ),
          headerTitle: () => {
            return (
              <TouchableOpacity onPress={() => alert('Mở Menu/Sidebar!')}>
                <Image
                  source={require('../../assets/icon.png')}
                  style={{ width: 32, height: 32 }}
                />
              </TouchableOpacity>
            );
          }
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon 
              icon={faUser}  
              size={24}      
              color="#CDCCCD"
            />          
          ),
          headerTitle: () => {
            return (
              <TouchableOpacity onPress={() => alert('Mở Menu/Sidebar!')}>
                <Image
                  source={require('../../assets/icon.png')}
                  style={{ width: 32, height: 32 }}
                />
              </TouchableOpacity>
            );
          },

          headerRight: () => {
            return (
              <TouchableOpacity onPress={() => setMenuVisible(true)} style={{ marginRight: 15 }}>
                <FontAwesomeIcon 
                  icon={faBars}  
                  size={24}      
                  color="#CDCCCD"
                />          
              </TouchableOpacity>
            );
          }
        }}
      />
      <Tabs.Screen
          name="editProfile" 
          options={{
              title: "",
              href: null,
              headerBackground: () => (
                <View style={{ flex: 1, backgroundColor: colors.background }} />
              ),
              headerTitle: () => {
                return (
                  <TouchableOpacity onPress={() => {  }}>
                    <Image
                      source={require('../../assets/icon.png')}
                      style={{ width: 32, height: 32 }}
                    />
                  </TouchableOpacity>
                );
              },
              headerLeft: () => (
                <TouchableOpacity onPress={() => { router.back(); }} style={{ marginLeft: 15 }}>
                  <FontAwesomeIcon 
                    icon={faArrowLeft}  
                    size={24}      
                    color="#CDCCCD"
                  />          
                </TouchableOpacity>
              ),
          }}
      /> 
    </Tabs>
    <MenuPopup 
        isVisible={isMenuVisible} 
        onClose={() => setMenuVisible(false)} 
      />
    </ProfileProvider>
  );
}