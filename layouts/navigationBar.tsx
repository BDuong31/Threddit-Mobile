import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NAVIGATION_ITEMS, NavigationItem } from './navigation-items';
import { usePathname, useRouter } from 'expo-router';
import { useTheme } from 'contexts/ThemeContext';
import Badge from 'components/badge';

export default function NavigationBar() {
  const navItems = NAVIGATION_ITEMS().filter(
    (item) => item.title !== 'My Profile'
  );
  return (
        <View className="relative z-10 flex-row items-center pt-4 justify-around">
            {navItems.map((item, index) => (
                <BottomNavItem key={index} navItem={item} />
            ))}
        </View>
  );
};

type BottomNavItemProps = {
  navItem: NavigationItem;
};

const BottomNavItem = ({ navItem }: BottomNavItemProps) => {
    const { IconSolid, IconRegular, path, update, title } = navItem;
    const { colors } = useTheme();
    const router = useRouter();
    const pathname = usePathname();
    const isActive = pathname === path;
    const isAddPost = title === "Add Post";
    console.log(update);
    return (
        <TouchableOpacity
            onPress={() => router.push(path)}
            style={{
                backgroundColor: isAddPost ? colors.surface : 'transparent',
                paddingVertical: isAddPost ? 12 : 0,
                paddingHorizontal: isAddPost ? 25 : 0,
                borderRadius: isAddPost ? 200 : 0,
                marginBottom: 20,
            }}
        >
            <View className='relative z-1 flex items-center justify-center p-1.5'>
                    <View className="relative inline-flex p-1">
                        {update && (
                            <View className="absolute z-10">
                                {update.count > 1 ? <Badge content={update.count} /> : <Badge />}
                            </View>
                        )}
                        {isActive ? IconSolid : IconRegular}
                    </View>
            </View>
        </TouchableOpacity>
    );
}