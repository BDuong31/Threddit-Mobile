import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NAVIGATION_ITEMS, NavigationItem } from './navigation-items';
import { usePathname, useRouter } from 'expo-router';
import { useTheme } from 'contexts/ThemeContext';
import Badge from 'components/badge';
import { useSSE } from 'contexts/SSEContext';

export default function NavigationBar() {
  const { notificationCount } = useSSE();
  const navItems = NAVIGATION_ITEMS().map((item) => 
      item.title === 'Notification'
          ? { ...item, update: { status: true, count: notificationCount } }
          : item
  );

//   const navItems = NAVIGATION_ITEMS().filter(
//     (item) => 
//         {
//             item.title !== 'My Profile',
//             item.title === 'Notification'
//                 ? { ...item, update: { status: true, count: notificationCount } }
//                 : item
//         }
//   );
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
            <View className='flex items-center  p-1.5 relative z-1'>
                    <View className="relative inline-flex p-1">
                        {update && (
                            <View className="absolute z-20 -top-[4px] -right-[4px]">
                                {update.count > 1 ? <Badge content={update.count} /> : <Badge />}
                            </View>
                        )}
                        {isActive ? IconSolid : IconRegular}
                    </View>
            </View>
        </TouchableOpacity>
    );
}