import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductDetail from '../screens/ProductDetail';
import OrderDetail from '../screens/OrderDetails';
import HomeScreen from '../screens/HomeScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import Categories from '../screens/Categories';

const Tab = createBottomTabNavigator();

export default TabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={        ({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Main') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Categories') {
            iconName = focused ? 'th' : 'th';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'cog' : 'cog';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Main"
        component={HomeScreen}
        options={{ tabBarLabel: 'Home' }}
      />
         <Tab.Screen
        name="Categories"
        component={Categories}
        options={{ tabBarLabel: 'Category' }}
      />
      <Tab.Screen
        name="Settings"
        component={OrderDetail}
        options={{ tabBarLabel: 'Orders' }}
      />
    </Tab.Navigator>
  );
};