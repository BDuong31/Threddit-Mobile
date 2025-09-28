import { useAuth } from "contexts/AuthContext";
import { Redirect } from "expo-router";
import React, { useState, useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";


export default function Index() {
    const { isAuthenticated, token} = useAuth();

    console.log("Token in Index:", token);

    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        setTimeout(() => {
            setLoading(false); 
        }, 500);
    }, []);

    if (loading) { 
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}>
            <ActivityIndicator size="large" color="#3b82f6" />
            <Text style={{ marginTop: 16, color: '#666' }}>Loading...</Text>
          </View>
        );
    }


    if (isAuthenticated) {
        return <Redirect href="/(tabs)" />;
    } else {
        return <Redirect href="/login" />;
    }
}
