import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

const Start = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Image
          style={styles.announcerImg}
          source={require("../images/announcer_sized.png")}
        />
      </View>
      <View style={styles.subContainer}>
        <Image
          style={styles.announcerImg}
          source={require("../images/tinywow_remove_bg_3811817.png")}
        />
      </View>
      <View style={styles.subContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Problem")}
          style={styles.touchableStyle}
        >
          <Image
            style={styles.btnImg}
            source={require("../images/alarm.png")}
          />
          <Text style={styles.textStyle}>Проблем</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Suggestion")}
          style={styles.touchableStyle}
        >
          <Image
            style={styles.btnImg}
            source={require("../images/idea2.png")}
          />
          <Text style={styles.textStyle}>Предложение</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Feedback")}
          style={styles.touchableStyle}
        >
          <Image
            style={styles.btnImg}
            source={require("../images/button_3.png")}
          />
          <Text style={styles.textStyle}>Виж мнение</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#496cb2",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  subContainer: {
    height: "100%",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  touchableStyle: {
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "white",
    borderWidth: 3,
    width: "65%",
    marginRight: 10,
    marginBottom: 10,
  },
  announcerImg: {
    height: "75%",
    width: "50%",
  },
  btnImg: {
    width: 80,
    height: 70,
  },
  textStyle: {
    fontSize: 23,
    color: "white",
  },
});

export default Start;
