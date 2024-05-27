import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OrderDetail from '../screens/OrderDetails';
import HomeScreen from '../screens/HomeScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Category from '../screens/Category';

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
    icon: 'apps',
  },
  {
    name: 'OrderDetail',
    component: OrderDetail,
    label: 'Orders',
    icon: 'shopping-cart',
  },
];

const TabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          paddingHorizontal: 10,
          paddingTop: 5,
          paddingBottom: 5,
          backgroundColor: '#fff',
          borderTopWidth: 0.5,
          borderTopColor: '#e0e0e0',
        },
        tabBarActiveTintColor: '#ff6600',
        tabBarInactiveTintColor: '#888',
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
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
              <MaterialIcons name={icon} color={color} size={size} />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabNav;