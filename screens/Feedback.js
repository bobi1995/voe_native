import { StyleSheet, Text, View } from "react-native";

const Feedback = () => {
  return (
    <View style={styles.container}>
      <Text>Feedback!</Text>
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

export default Feedback;
