import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const Start = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Problem")}>
        <Text>Проблем</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Suggestion")}>
        <Text>Предложение</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Start;
