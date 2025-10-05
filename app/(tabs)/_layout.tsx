import { FontAwesome } from "@expo/vector-icons";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faBars, faUser, faCog, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faHome as faHomeSolid, faUser as faUserSolid } from '@fortawesome/free-solid-svg-icons';
import { faHome as faHomeRegular, faUser as faUserRegular } from '@fortawesome/free-regular-svg-icons';
import { Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, Image, View } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import MenuPopup from "../../components/menuPopup";
import { router } from "expo-router";
import { ProfileProvider } from "contexts/UserContext";
import withAuth from "../../HOC/with-auth";

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
          position: "absolute",
          borderTopWidth: 0,
          elevation: 0, 
        },
        headerTitleContainerStyle: {
          paddingVertical: 12,
        },
        headerShown: true,

        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: "transparent",
          shadowColor: "transparent",
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
          position: "absolute",
          borderTopWidth: 0,
          elevation: 0, 
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({focused, color, size }) => (
            <View className="p-2">
              <FontAwesomeIcon 
                icon={focused ? faHomeSolid : faHomeRegular}  
                size={24}      
                color={colors.icon}       
              /> 
            </View>         
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
                  color={colors.icon}
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
                    color={colors.icon}
                  />          
                </TouchableOpacity>
              ),
          }}
      /> 
      <Tabs.Screen
          name="changePassword" 
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
                    color={colors.icon}
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

export default withAuth(TabLayout);