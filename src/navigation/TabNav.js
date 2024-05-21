import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductDetail from '../screens/ProductDetail';
import OrderDetail from '../screens/OrderDetails';
import HomeScreen from '../screens/HomeScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import ProductsOfCategory from '../screens/ProductsOfCategory';
import Category from '../screens/Category';

const Tab = createBottomTabNavigator();

export default TabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Main') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Category') {
            iconName = focused ? 'apps-sharp' : 'apps-sharp';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}

    >
      <Tab.Screen
        name="Main"
        component={HomeScreen}
        options={{ tabBarLabel: 'Home', unmountOnBlur: true }}
      />
      <Tab.Screen
        name="Category"
        component={Category}
        options={{ tabBarLabel: 'Category' }}
      />
      <Tab.Screen
        name="OrderDetail"
        component={OrderDetail}
        options={{tabBarShowLabel:false }}
      />
    </Tab.Navigator>
  );
};