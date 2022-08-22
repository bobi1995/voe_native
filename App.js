import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Start from "./screens/Start";
import SendCase from "./screens/SendCase";
import Login from "./screens/Login";
import EmpBoard from "./screens/EmpBoard";
import React, { useCallback, useEffect } from "react";
import { useFonts } from "@expo-google-fonts/mulish";
import * as SplashScreen from "expo-splash-screen";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import * as ScreenOrientation from "expo-screen-orientation";

const Stack = createNativeStackNavigator();

// Initialize Apollo Client
const client = new ApolloClient({
  link: createUploadLink({
    uri: "http://192.168.55.93:3001/graphql",
    headers: {
      "apollo-require-preflight": true,
      "Content-Type": "application/json",
    },
  }),
  cache: new InMemoryCache(),
});

export default function App() {
  const [mulishFont] = useFonts({
    mulish: require("./globals/Mulish/Mulish-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (mulishFont) {
      await SplashScreen.hideAsync();
    }
  }, [mulishFont]);

  if (!mulishFont) {
    return null;
  }

  async function changeScreenOrientation() {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
    );
  }

  return (
    <ApolloProvider client={client}>
      <NavigationContainer onLayout={onLayoutRootView}>
        <StatusBar style="auto" hidden={true} />
        <Stack.Navigator>
          <Stack.Screen
            name="Start"
            component={Start}
            options={{
              headerTitle: "СИСТЕМА ЗА ОБРАТНА ВРЪЗКА",
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: "#5A607A",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontSize: 25,
                fontFamily: "mulish",
              },
            }}
          />
          <Stack.Screen
            name="Problem"
            component={SendCase}
            initialParams={{
              reportType: 1,
            }}
            options={{
              //headerTitle: "Подаване на сигнал за проблем",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Suggestion"
            component={SendCase}
            initialParams={{
              reportType: 2,
            }}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="EmpBoard"
            component={EmpBoard}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
