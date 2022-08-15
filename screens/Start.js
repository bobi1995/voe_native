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

          <Text style={styles.textStyle}>Подай сигнал за проблем</Text>
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

          <Text style={styles.textStyle}>
            Изпрати предложение за подобрение
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Suggestion")}
          style={{ marginTop: 25 }}
        >
          <Text
            style={{
              fontSize: 19,
              color: "gray",
            }}
          >
            Влез в профила си{" "}
            <AntDesign name="arrowright" size={19} color="gray" />
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
    height: "65%",
    width: "50%",
  },
  btnImg: {
    width: 80,
    height: 70,
  },
  textStyle: {
    fontSize: 19,
    color: "white",
    flexShrink: 1,
  },
});

export default Start;
