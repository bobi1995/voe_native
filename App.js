import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Start from "./screens/Start";
import Problem from "./screens/Problem";
import Suggestison from "./screens/Suggestion";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" hidden={true} />
      <Stack.Navigator>
        <Stack.Screen
          name="Start"
          component={Start}
          options={{
            headerTitle: "СИСТЕМА ЗА ОБРАТНА ВРЪЗКА",
            headerStyle: {
              backgroundColor: "#1b1461",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 25,
            },
          }}
        />
        <Stack.Screen
          name="Problem"
          component={Problem}
          options={{
            headerTitle: "Проблем",
          }}
        />
        <Stack.Screen
          name="Suggestion"
          component={Suggestison}
          options={{
            headerTitle: "Предложение",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
