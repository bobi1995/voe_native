import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
const Start = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Problem")}
          style={[styles.touchableStyle, { backgroundColor: "#EB1C24" }]}
        >
          <AntDesign
            name="exclamationcircleo"
            size={35}
            color="white"
            style={{ marginHorizontal: 15 }}
          />

          <Text
            style={{
              fontFamily: "mulish",
              color: "white",
              fontSize: 18,
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
            size={35}
            color="white"
            style={{ marginHorizontal: 15 }}
          />

          <Text
            style={{
              fontFamily: "mulish",
              color: "white",
              fontSize: 18,
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
              fontSize: 18,
              flexShrink: 1,
            }}
          >
            Влез в профила си
            <AntDesign name="arrowright" size={18} color="#3D4461" />
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
    width: "65%",
    marginBottom: 10,
    borderRadius: 5,
    height: 70,
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
});

export default Start;
