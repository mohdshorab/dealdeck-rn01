import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import LogInForm from "../screens/LogIn/login";
import SignUpForm from "../screens/SignUp";
import Main from "../screens/Main/main";

const Stack = createNativeStackNavigator();

const unProtectedRoutes = [
    { name: "logInForm", component: LogInForm },
    { name: "signUpForm", component: SignUpForm },
    { name:"mainScreen", component: Main }
];

const AppStackNavigation = (isLoggedIn) => {
    const initialRouteName = isLoggedIn ? 'logInForm' : 'logInForm';
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{ drawer: false, headerShown: false}} >
                {unProtectedRoutes.map((route) =>
                    <Stack.Screen
                        key={route.name}
                        name={route.name}
                        component={route.component}
                    />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppStackNavigation;