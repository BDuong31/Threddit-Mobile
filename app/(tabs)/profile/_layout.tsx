import { Stack } from 'expo-router';
import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, Image, View } from "react-native";
import { useTheme } from "../../../contexts/ThemeContext";
import MenuPopup from "../../../components/menuPopup";
import { router } from "expo-router";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default function HomeStackLayout() {
    const { colors } = useTheme();
    
  return (
    <>
    <Stack
        screenOptions={{
            headerStyle: {
                backgroundColor: colors.background,
            },
            headerTintColor: colors.text,
            headerTitleStyle: {
                fontWeight: 'bold',

            },
            headerShadowVisible: false, 
        }}
    >
        <Stack.Screen 
            name="index" 
            options={{
                headerShown: true,
            }}
        />
        <Stack.Screen name="editProfile" options={{ headerShown: true }} />
        <Stack.Screen name="changePassword" options={{ headerShown: true }} />
    </Stack>
    </>
  );
}