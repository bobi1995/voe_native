import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");

const Start = ({ navigation, route }) => {
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
            Моля, избери опция
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Problem")}
          style={[styles.touchableStyle, { backgroundColor: "#EB1C24" }]}
        >
          <AntDesign
            name="exclamationcircleo"
            size={height * 0.07}
            color="white"
            style={{ marginHorizontal: 15 }}
          />

          <Text
            style={{
              fontFamily: "mulish",
              color: "white",
              fontSize: height * 0.05,
              flexShrink: 1,
            }}
          >
            Подай сигнал за проблем
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Suggestion")}
          style={[styles.touchableStyle, { backgroundColor: "#62DF90" }]}
        >
          <AntDesign
            name="checkcircleo"
            size={height * 0.07}
            color="white"
            style={{ marginHorizontal: 15 }}
          />

          <Text
            style={{
              fontFamily: "mulish",
              color: "white",
              fontSize: height * 0.05,
              flexShrink: 1,
            }}
          >
            Изпрати предложение за подобрение
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
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
            Влез в профила си
            <AntDesign name="arrowright" size={height * 0.04} color="#3D4461" />
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
    width: width * 0.45,
    marginBottom: 10,
    borderRadius: 5,
    height: height * 0.15,
  },
  announcerImg: {
    flex: 1,
    width: 650,
    resizeMode: "contain",
  },

  textStyle: {
    fontSize: 19,
    color: "white",
    flexShrink: 1,
  },
});

export default Start;
