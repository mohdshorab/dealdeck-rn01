import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import LogInForm from "../screens/LogIn/login";
import SignUpForm from "../screens/SignUp/signUpForm";
import Profile from "../screens/Profile";
import HomeScreen from "../screens/HomeScreen";
import TabNav from "./TabNav";
import ProductDetail from "../screens/ProductDetail";
import ProductsOfCategory from "../screens/ProductsOfCategory";

const Stack = createNativeStackNavigator();

const unProtectedRoutes = [
    { name: "logInForm", component: LogInForm },
    { name: "signUpForm", component: SignUpForm },
];

const protectedRoutes = [
    { name: "logInForm", component: LogInForm },
    { name: "HomeScreen", component: HomeScreen },
    { name: "profile", component: Profile },
];

const AppStackNavigation = (isLoggedIn) => {
    const initialRouteName = isLoggedIn ? 'mainScreen' : 'logInForm';

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={'TabNav'} screenOptions={{ drawer: false, headerShown: false }} >
                {/* {isLoggedIn ? protectedRoutes.map((route) => (
                    <Stack.Screen
                        key={route.name}
                        name={route.name}
                        component={route.component}
                    />
                )) : unProtectedRoutes.map((route) => (
                    <Stack.Screen
                        key={route.name}
                        name={route.name}
                        component={route.component}
                    />
                ))} */}
                <Stack.Screen
                    name="TabNav"
                    component={TabNav}
                />
                <Stack.Screen
                    name="Categories"
                    component={ProductsOfCategory}
                />
                <Stack.Screen
                    name="Products"
                    component={ProductDetail}
                />
                <Stack.Screen
                    name="logInForm"
                    component={LogInForm}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppStackNavigation;