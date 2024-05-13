import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import LogInForm from "../screens/LogIn/login";
import SignUpForm from "../screens/SignUp/signUpForm";
import Profile from "../screens/Profile";
import HomeScreen from "../screens/HomeScreen";
import TabNav from "./TabNav";

const Stack = createNativeStackNavigator();

const unProtectedRoutes = [
    { name: "logInForm", component: LogInForm },
    { name: "signUpForm", component: SignUpForm },
];

const protectedRoutes = [
    { name: "HomeScreen", component: HomeScreen },
    { name: "profile", component: Profile },
];

const AppStackNavigation = (isLoggedIn) => {
    const initialRouteName = isLoggedIn ? 'mainScreen' : 'logInForm';

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{ drawer: false, headerShown: false }} >
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
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppStackNavigation;