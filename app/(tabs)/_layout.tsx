import { FontAwesome } from "@expo/vector-icons";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faBars } from '@fortawesome/free-solid-svg-icons';
import { Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, Image } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";

export default function TabLayout() {
  const { colors } = useTheme();
  const [pendingRequestCount, setPendingRequestCount] = useState(0);

  return (
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
    </Tabs>
  );
}