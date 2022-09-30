import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import * as SecureStore from "expo-secure-store";
const { width, height } = Dimensions.get("window");

const LOGIN_QUERY = gql`
  query ExampleQuery($username: String, $password: String) {
    login(username: $username, password: $password) {
      userId
      token
      tokenExpiration
    }
  }
`;
const saveData = async (key, value) => {
  await SecureStore.setItemAsync(key, value);
};

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [getLogin, { loading, error, data }] = useLazyQuery(LOGIN_QUERY, {
    onError: (e) => Alert.alert(e.message),
    onCompleted: (result) => {
      saveData("token", result.login.token);
      saveData("userId", result.login.userId);
      navigation.navigate("EmpBoard", {
        userId: result.login.userId,
        token: result.login.token,
      });
    },
  });

  return (
    <View style={styles.container}>
      <View style={[styles.subContainer, { width: "50%" }]}>
        <View
          style={{
            padding: 10,
            alignItems: "center",
            width: width * 0.3,
            marginBottom: height * 0.05,
          }}
        >
          <Text
            style={{
              fontSize: height * 0.05,
              fontWeight: "bold",
              color: "#3D4461",
              fontFamily: "mulish",
              opacity: 1,
              textAlign: "center",
            }}
          >
            Система за обратна връзка
          </Text>
          <Text
            style={{
              fontSize: height * 0.035,
              color: "#231F20",
              fontFamily: "mulish",
              opacity: 1,
              textAlign: "center",
            }}
          >
            Моля, влез в профила си
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            borderWidth: 1,
            borderRadius: 5,
            borderColor: "#AAAEBF",
            alignItems: "center",
            marginBottom: 10,
            height: height * 0.1,
            width: width * 0.4,
          }}
        >
          <TextInput
            style={{
              width: "100%",
              flex: 1,
              paddingLeft: 10,
              fontSize: height * 0.05,
            }}
            onChangeText={setUsername}
            value={username}
            placeholder="Потребител"
            autoCapitalize="none"
          />
          <Ionicons
            name="person"
            size={24}
            color="#AAAEBF"
            style={{ marginRight: 10 }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            borderWidth: 1,
            borderRadius: 5,
            borderColor: "#AAAEBF",
            alignItems: "center",
            marginBottom: 10,
            height: height * 0.1,
            width: width * 0.4,
          }}
        >
          <TextInput
            style={{
              width: "100%",
              flex: 1,
              paddingLeft: 10,
              fontSize: height * 0.05,
            }}
            onChangeText={setPassword}
            value={password}
            placeholder="Парола"
            autoCapitalize="none"
            secureTextEntry={true}
          />
          <Ionicons
            name="lock-closed"
            size={24}
            color="#AAAEBF"
            style={{ marginRight: 10 }}
          />
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#EB1C24" />
        ) : (
          <TouchableOpacity
            onPress={() => {
              getLogin({
                variables: {
                  username,
                  password,
                },
              });
            }}
            style={[
              styles.touchableStyle,
              { backgroundColor: "#EB1C24", justifyContent: "center" },
            ]}
          >
            <Text
              style={{
                fontFamily: "mulish",
                color: "white",
                fontSize: height * 0.05,
                flexShrink: 1,
              }}
            >
              Влез
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          onPress={() => navigation.navigate("Start")}
          style={{ marginTop: 36 }}
        >
          <Text
            style={{
              fontFamily: "mulish",
              color: "#3D4461",
              fontSize: height * 0.04,
              flexShrink: 1,
            }}
          >
            <AntDesign name="arrowleft" size={height * 0.04} color="#3D4461" />
            Върни се обратно
          </Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.subContainer, { width: "50%" }]}>
        <Image
          style={styles.announcerImg}
          source={require("../images/Illustration-Red.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  subContainer: {
    width: 550,
    alignItems: "center",
    justifyContent: "center",
  },
  touchableStyle: {
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    width: width * 0.4,
    marginBottom: 10,
    borderRadius: 5,
    height: height * 0.1,
  },
  announcerImg: {
    flex: 1,
    width: 650,
    resizeMode: "contain",
  },
  btnImg: {
    width: 540,
    height: 104,
  },
  textStyle: {
    fontSize: 19,
    color: "white",
    flexShrink: 1,
  },
  input: {
    height: height * 0.1,
    width: width * 0.4,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: "#AAAEBF",
  },
});

export default Login;
