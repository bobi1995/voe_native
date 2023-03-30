import React, { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import {
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Modal,
  SafeAreaView,
  Dimensions,
  View,
  Image,
} from "react-native";
const { width, height } = Dimensions.get("window");

const AttachedImage = ({ image, setImage }) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <SafeAreaView>
      <TouchableOpacity
        style={[
          styles.button,
          styles.buttonOpen,
          {
            width: width * 0.2,
            alignSelf: "center",
            bottom: 10,
            flexDirection: "row",
            justifyContent: "center",
          },
        ]}
        onPress={() => setOpenModal(true)}
      >
        <FontAwesome name="image" size={24} color="white" />
        <Text
          style={{
            fontSize: 15,
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
            textAlignVertical: "center",
            marginLeft: 10,
          }}
        >
          Прикачена снимка
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        supportedOrientations={["portrait", "landscape"]}
        transparent={true}
        visible={openModal}
        onRequestClose={() => {
          setOpenModal();
        }}
      >
        <View style={styles.centeredView}>
          <View
            style={[
              styles.modalView,
              {
                padding: 10,
                height: height * 0.7,
                width: width * 0.7,
              },
            ]}
          >
            <Image
              source={{
                uri: image.uri,
              }}
              style={styles.imageStyle}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              <Pressable
                style={[
                  styles.button,
                  styles.buttonOpen,
                  {
                    width: width * 0.15,
                    bottom: 10,
                  },
                ]}
                onPress={() => setOpenModal(!openModal)}
              >
                <Text style={styles.textStyle}>Продължи</Text>
              </Pressable>

              <Pressable
                style={[
                  styles.button,
                  styles.buttonClose,
                  {
                    backgroundColor: "#EB1C24",
                    width: width * 0.15,
                    bottom: 10,
                  },
                ]}
                onPress={() => {
                  setImage(null);

                  setOpenModal(!openModal);
                }}
              >
                <Text style={styles.textStyle}>Изтрий</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: "90%",
    width: "90%",
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    width: 100,
    marginTop: 15,
  },
  buttonOpen: {
    backgroundColor: "#008000",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: height * 0.03,
  },

  imageStyle: {
    height: height * 0.6,
    width: width * 0.6,
  },
});

export default AttachedImage;
