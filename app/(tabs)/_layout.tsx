import { FontAwesome } from "@expo/vector-icons";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faBars, faUser, faCog, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faHome as faHomeSolid, faUser as faUserSolid } from '@fortawesome/free-solid-svg-icons';
import { faHome as faHomeRegular, faUser as faUserRegular } from '@fortawesome/free-regular-svg-icons';
import { Stack, Tabs, usePathname } from "expo-router";
import React, { Children, useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, Image, View, Text } from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import MenuPopup from "../../components/menuPopup";
import { router } from "expo-router";
import { ProfileProvider } from "contexts/UserContext";
import NavigationBar from "layouts/navigationBar";
import { hide } from "expo-router/build/utils/splash";
import { SSEProvider } from "contexts/SSEContext";

function TabLayout() {
  const { colors } = useTheme();
  const [pendingRequestCount, setPendingRequestCount] = useState(0);
  const [isMenuVisible, setMenuVisible] = useState(false); 
  const pathname = usePathname();
  const [hideNavigationBar, setHideNavigationBar] = useState(false);

  console.log("Current pathname:", pathname);

  React.useEffect(() => {
    if (pathname.includes('/follow') || pathname.includes('/addPost')) {
      setHideNavigationBar(true);
    } else {
      setHideNavigationBar(false);
    }
  }, [pathname]);

  return (
    <SSEProvider>
      <ProfileProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerBackVisible: false,
              title: "",
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
              headerTitle: () => {
                return (
                    <Image
                      source={require('../../assets/icon.png')}
                      style={{ width: 32, height: 32 }}
                    />
                );
              },
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="search/index"
            options={{
              headerBackVisible: false,
              title: "",
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
              headerTitle: () => {
                return (
                    <Image
                      source={require('../../assets/icon.png')}
                      style={{ width: 32, height: 32 }}
                    />
                );
              },
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="addPost/index"
            options={{
              headerBackVisible: false,
              title: "",
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
              headerTitle: () => {
                return (
                    <Image
                      source={require('../../assets/icon.png')}
                      style={{ width: 32, height: 32 }}
                    />
                );
              },
              headerLeft: () => {
                return (
                    <TouchableOpacity className="flex-row items-center gap-2" onPress={() => router.back()}>
                        <Text style={{ color: colors.text }} className="font-bold text-[16px]">Hủy</Text>
                    </TouchableOpacity>
                )
              },
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="notification/index"
            options={{
              headerBackVisible: false,
              title: "",
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
              headerTitle: () => {
                return (
                    <Image
                      source={require('../../assets/icon.png')}
                      style={{ width: 32, height: 32 }}
                    />
                );
              },
              headerLeft: () => {
                return (
                    <Text className="font-bold text-[16px]" style={{ color: colors.text }}>Notification</Text>
                )
              },
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="profile/index"
            options={{
              headerBackVisible: false,
              title: "",
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
              headerTitle: () => {
                return (
                    <Image
                      source={require('../../assets/icon.png')}
                      style={{ width: 32, height: 32 }}
                    />
                );
              },
              headerShadowVisible: false,

              headerRight: () => (
                <TouchableOpacity onPress={() => setMenuVisible(true)}>
                  <FontAwesomeIcon icon={faBars} size={24} color={colors.icon} />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
          />
        </Stack>
        {!hideNavigationBar && <NavigationBar />}
        <MenuPopup isVisible={isMenuVisible} onClose={() => setMenuVisible(false)} />
      {/* <Tabs
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
      </Tabs> */}
      </ProfileProvider>
    </SSEProvider>
  );
}

export default TabLayout;