import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { gql, useQuery, useLazyQuery } from "@apollo/client";

const LOGIN_QUERY = gql`
  query ExampleQuery($username: String, $password: String) {
    login(username: $username, password: $password) {
      userId
      token
      tokenExpiration
    }
  }
`;

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [getLogin, { loading, error, data }] = useLazyQuery(LOGIN_QUERY, {
    onError: (e) => Alert.alert(e.message),
  });

  if (data) {
    console.log(data);
  }

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View
          style={{
            flexDirection: "row",
            height: 40,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: "#AAAEBF",
            width: "60%",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <TextInput
            style={{
              width: "100%",
              flex: 1,
              paddingLeft: 10,
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
            height: 40,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: "#AAAEBF",
            width: "60%",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <TextInput
            style={{
              width: "100%",
              flex: 1,
              paddingLeft: 10,
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
              fontSize: 18,
              flexShrink: 1,
              textAlign: "center",
            }}
          >
            Влез
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Start")}
          style={{ marginTop: 36 }}
        >
          <Text
            style={{
              fontFamily: "mulish",
              color: "#3D4461",
              fontSize: 18,
              flexShrink: 1,
            }}
          >
            <AntDesign name="arrowleft" size={18} color="#3D4461" />
            Върни се обратно
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.subContainer}>
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
    width: "60%",
    marginBottom: 10,
    borderRadius: 5,
    height: 40,
  },
  announcerImg: {
    height: 300,
    width: 350,
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
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: "#AAAEBF",
    width: "60%",
  },
});

export default Login;
