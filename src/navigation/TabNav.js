import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather'
import Category from '../screens/Category';
import Profile from '../screens/Profile';
import { CartScreen } from '../screens/Cart';

const Tab = createBottomTabNavigator();

const tabScreens = [
  {
    name: 'HomeScreen',
    component: HomeScreen,
    label: 'Home',
    icon: 'home',
    unmountOnBlur: true,
  },
  {
    name: 'Category',
    component: Category,
    label: 'Category',
    icon: 'grid',
  },
  {
    name: 'Profile',
    component: Profile,
    label: 'Profile',
    icon: 'user',
  },
  {
    name: 'Cart',
    component: CartScreen,
    label: 'Cart',
    icon: 'shopping-cart',
  },
];

const TabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 50,
          paddingHorizontal: 10,
          paddingTop: 5,
          paddingBottom: 5,
          backgroundColor: '#fff',
          borderTopWidth: 0.5,
          borderTopColor: '#e0e0e0',
        },
        tabBarActiveTintColor: '#01BDFB',
        tabBarInactiveTintColor: '#888',
        tabBarShowLabel: false,
      }}
    >
      {tabScreens.map(({ name, component, label, icon, unmountOnBlur }) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{
            tabBarLabel: label,
            unmountOnBlur,
            tabBarIcon: ({ color, size }) => (
              <FeatherIcon name={icon} color={color} size={size} />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabNav;