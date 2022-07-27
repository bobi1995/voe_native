import { StyleSheet, Text, View } from "react-native";

const Problem = () => {
  return (
    <View style={styles.container}>
      <Text>Problem!</Text>
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

export default Problem;
