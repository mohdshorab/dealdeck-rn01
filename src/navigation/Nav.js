import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import LogInForm from "../screens/LogIn";
import SignUpForm from "../screens/SignUp";
import Profile from "../screens/Profile";
import HomeScreen from "../screens/HomeScreen";
import TabNav from "./TabNav";
import ProductDetail from "../screens/ProductDetail";
import ProductsOfCategory from "../screens/ProductsOfCategory";
import { ProductsYouMayLike } from "../screens/ProductsYouMayLike";
import { CartScreen } from "../screens/Cart";
import Forgotpass from "../screens/ForgotPassword";
import FavProducts from "../screens/FavProducts";
import { SavedCards } from "../screens/SavedCards";
import { MyAddresses } from "../screens/SavedAddresses";

const Stack = createNativeStackNavigator();

const unProtectedRoutes = [
  { name: "logInForm", component: LogInForm },
  { name: "signUpForm", component: SignUpForm },
];

const protectedRoutes = [
  { name: "logInForm", component: LogInForm },
  { name: "signUpForm", component: SignUpForm },
  { name: "Home", component: TabNav },
  { name: "ProductsYouMayLike", component: ProductsYouMayLike },
  { name: "ProductsOfCategory", component: ProductsOfCategory },
  { name: "ProductDetail", component: ProductDetail },
  { name: "profile", component: Profile },
  { name: "CartScreen", component: CartScreen },
  { name: 'Forgotpass', component: Forgotpass },
  { name: "favProds", component: FavProducts},
  { name: "savedCards", component: SavedCards},
  { name: 'myAddresses', component: MyAddresses}
];


const AppStackNavigation = (isLoggedIn) => {
  const initialRouteName = isLoggedIn ? "Home" : "logInForm";

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'logInForm'}
        screenOptions={{ headerShown: false }}
      >
        {protectedRoutes.map(({ name, component }) => (
          <Stack.Screen key={name} name={name} component={component} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStackNavigation;