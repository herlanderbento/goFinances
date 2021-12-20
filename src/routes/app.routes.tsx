import React from "react";
import { Platform } from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components";

const { Navigator, Screen } = createBottomTabNavigator();

import { Dashboard } from "../screens/Dashboard";
import { Register } from "../screens/Register";

export function AppRoutes() {
  const theme = useTheme();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.secondary,
        tabBarInactiveTintColor: theme.colors.text,
        tabBarLabelPosition: "beside-icon",
        tabBarStyle: {
          height: 72,
          paddingTop: Platform.OS === "ios" ? 10 : 0,
          paddingBottom: Platform.OS === "ios" ? 12 : 0,
        },
      }}
    >
      <Screen
        name="Listagem"
        component={Dashboard}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="format-list-bulleted"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Screen
        name="Cadastrar"
        component={Register}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="dollar-sign" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="Resumo"
        component={Dashboard}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="pie-chart" size={size} color={color} />
          ),
        }}
      />
    </Navigator>
  );
}
