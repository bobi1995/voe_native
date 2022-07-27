import { StyleSheet, Text, View } from "react-native";

const Suggestison = () => {
  return (
    <View style={styles.container}>
      <Text>Suggestison!</Text>
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

export default Suggestison;
