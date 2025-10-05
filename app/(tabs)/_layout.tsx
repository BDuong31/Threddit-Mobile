import { FontAwesome } from "@expo/vector-icons";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faBars, faUser, faCog, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faHome as faHomeSolid, faUser as faUserSolid } from '@fortawesome/free-solid-svg-icons';
import { faHome as faHomeRegular, faUser as faUserRegular } from '@fortawesome/free-regular-svg-icons';
import { Stack, Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, Image, View } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import MenuPopup from "../../components/menuPopup";
import { router } from "expo-router";
import { ProfileProvider } from "contexts/UserContext";

function TabLayout() {
  const { colors } = useTheme();
  const [pendingRequestCount, setPendingRequestCount] = useState(0);
  const [isMenuVisible, setMenuVisible] = useState(false); 

  return (
    <ProfileProvider>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        headerStyle: {
          backgroundColor: colors.background,
          borderBottomColor: "transparent",
          shadowColor: "transparent",
          height: 50,
          paddingBottom: 0,
          paddingTop: 0,
          borderTopWidth: 0,
          elevation: 0, 
        },
        headerTitleContainerStyle: {
          paddingVertical: 12,
        },
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: "transparent",
          shadowColor: "transparent",
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
          position: 'absolute',
          borderTopWidth: 0,
          elevation: 0, 
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          href: null,
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: "",
          tabBarIcon: ({focused, color, size }) => (
              <FontAwesomeIcon 
                icon={focused ? faHomeSolid : faHomeRegular}  
                size={24}      
                color={colors.icon}       
              /> 
          ),
          headerTitle: () => {
            return (
                <Image
                  source={require('../../assets/icon.png')}
                  style={{ width: 32, height: 32 }}
                />
            );
          }
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "",
          tabBarIcon: ({focused, color, size }) => (
              <FontAwesomeIcon 
                icon={focused ? faUserSolid : faUserRegular}  
                size={24}      
                color={colors.icon}            
              />    
          ),
        }}
      />
    </Tabs>
    </ProfileProvider>
  );
}

export default TabLayout;