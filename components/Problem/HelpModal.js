import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  FlatList,
  SafeAreaView,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import RenderHtml from "react-native-render-html";

const { width, height } = Dimensions.get("window");

const Item = ({ description, name, reportType }) => {
  return (
    <View style={styles.item}>
      <Text
        style={[
          styles.title,
          { color: reportType === 1 ? "#EB1C24" : "#62DF90" },
        ]}
      >
        {name}
      </Text>
      {/* <Text style={styles.description}>{description}</Text> */}
      <RenderHtml
        contentWidth={useWindowDimensions().width}
        source={{
          html: description,
        }}
      />
    </View>
  );
};

const HelpModal = ({
  modalVisible,
  setModalVisible,
  categories,
  reportType,
}) => {
  const selected = categories.filter((el) => el !== undefined);

  return (
    <Modal
      supportedOrientations={["portrait", "landscape"]}
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {selected && selected.length > 0 ? (
            <SafeAreaView style={styles.container}>
              <FlatList
                data={selected}
                renderItem={({ item }) => (
                  <Item
                    reportType={reportType}
                    description={
                      reportType === 1
                        ? item.descriptionProblem
                        : item.descriptionSuggestion
                    }
                    name={item.name}
                  />
                )}
                keyExtractor={(item) => item._id}
              />
            </SafeAreaView>
          ) : (
            <Text
              style={[styles.title, { marginBottom: 25, color: "#AAAEBF" }]}
            >
              Маркирай категория и избери бутон "Помощ", за да видиш описанието
              и.
            </Text>
          )}
          <Pressable
            style={[
              styles.button,
              styles.buttonClose,
              { backgroundColor: reportType === 1 ? "#EB1C24" : "#62DF90" },
            ]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Затвори</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  item: {
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: height * 0.04,
    fontFamily: "mulish",
    color: "#EB1C24",
  },
  description: {
    fontSize: height * 0.03,
    fontFamily: "mulish",
    color: "#AAAEBF",
  },
  container: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "mulish",
    fontSize: height * 0.04,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "mulish",
  },
});

export default HelpModal;
