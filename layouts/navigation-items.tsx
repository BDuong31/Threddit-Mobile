import React, { JSX } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faAdd, faBell as faBellSolid, faHome as faHomeSolid, faSearch, faUser as faUserSolid } from '@fortawesome/free-solid-svg-icons';
import { faBell as faBellRegular, faHome as faHomeRegular, faUser as faUserRegular } from '@fortawesome/free-regular-svg-icons';
import { useTheme } from 'contexts/ThemeContext';
    

  
  export const NAVIGATION_ITEMS = () => {
    const { colors } = useTheme();

    const navItems: NavigationItem[] = [
      {
        title: "Home",
        IconSolid: <FontAwesomeIcon icon={faHomeSolid} size={24} color={colors.text} />,
        IconRegular: <FontAwesomeIcon icon={faHomeRegular} size={24} color={colors.text} />,
        path: '/',
      },

      {
        title: "Search",
        IconSolid: <FontAwesomeIcon icon={faSearch} size={24} color={colors.text} />,
        IconRegular: <FontAwesomeIcon icon={faSearch} size={24} color={colors.text} />,
        path: '/search',
      },

      {
        title: "Add Post",
        IconSolid: <FontAwesomeIcon icon={faAdd} size={24} color={colors.text} />,
        IconRegular: <FontAwesomeIcon icon={faAdd} size={24} color={colors.text} />,
        path: '/add-post',
      },

      {
        title: "Notification",
        update: { status: true, count: 0 },
        IconSolid: <FontAwesomeIcon icon={faBellSolid} size={24} color={colors.text} />,
        IconRegular: <FontAwesomeIcon icon={faBellRegular} size={24} color={colors.text} />,
        path: '/notifications',
      },

      {
        title: "Profile",
        IconSolid: <FontAwesomeIcon icon={faUserSolid} size={24} color={colors.text} />,
        IconRegular: <FontAwesomeIcon icon={faUserRegular} size={24} color={colors.text} />,
        path: '/profile',
      }
    ];

    return navItems;
  }
  
  export type NavigationItem = {
    update?: { status: boolean; count: number };
    title: string;
    IconSolid?: JSX.Element;
    IconRegular?: JSX.Element;
    path: string;
  };
  