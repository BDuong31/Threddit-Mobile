import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import axiosInstance, { endpoints } from '../lib/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IUser } from '../interfaces/user';

interface AuthContextType {
    token: string | null;
    setToken: (token: string | null) => void;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setTokenState] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('token');
                setTokenState(storedToken);
            } catch (error) {
                console.error('Failed to load token from storage:', error);
            } finally {
                setIsLoading(false);
            }
        };
        loadToken();
    }, []);

    const setToken = async (newToken: string | null) => {
        try {
            if (newToken) {
                await AsyncStorage.setItem('token', newToken);
            } else {
                await AsyncStorage.removeItem('token');
            }
            setTokenState(newToken);
        } catch (error) {
            console.error('Failed to set token in storage:', error);
        }
    };

    const isAuthenticated = useMemo(() => !!token, [token]);
    
    const value = {
        token,
        setToken,
        isAuthenticated,
        isLoading,
    };

    if (isLoading) {
        return null; // or a loading spinner
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};