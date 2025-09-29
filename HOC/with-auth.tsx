import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'expo-router';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

const withAuth = <P extends object>(
    WrappedComponent: React.ComponentType<P>
) => {
    const ComponentWithAuth = (props: P) => {
        const { isAuthenticated, isLoading, token } = useAuth(); 
        const router = useRouter();

        useEffect(() => {
            console.log("Auth State Changed: ", { isAuthenticated, token });
            if (!isLoading && !isAuthenticated) {
                router.replace('/login');
            }
        }, [isAuthenticated, isLoading, router]);

        if (isLoading) {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        }
        if (!isAuthenticated) {
            return null; 
        }

        return <WrappedComponent {...props} />;
    };
    
    const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    ComponentWithAuth.displayName = `withAuth(${wrappedComponentName})`;

    return ComponentWithAuth;
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default withAuth;