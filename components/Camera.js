import React, { useState, useEffect } from "react";
import { Modal, Text, TouchableOpacity, View, Image } from "react-native";
import { Camera } from "expo-camera";
import { Feather } from "@expo/vector-icons";

const CameraModule = (props) => {
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={() => {
        props.setModalVisible();
      }}
    >
      <Camera
        style={{ flex: 1 }}
        ratio="16:9"
        flashMode={Camera.Constants.FlashMode.on}
        type={type}
        ref={(ref) => {
          setCameraRef(ref);
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              backgroundColor: "black",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              icon="close"
              style={{
                marginLeft: 12,
                backgroundColor: "white",
                padding: 10,
                borderRadius: 5,
                width: 80,
              }}
              mode="outlined"
              color="white"
              onPress={() => {
                props.setModalVisible();
              }}
            >
              <Text style={{ textAlign: "center" }}>Затвори</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                if (cameraRef) {
                  let photo = await cameraRef.takePictureAsync({
                    base64: true,
                  });
                  props.setImage(photo);
                  props.setModalVisible();
                }
              }}
            >
              <View
                style={{
                  borderWidth: 2,
                  borderRadius: 50,
                  borderColor: "white",
                  height: 50,
                  width: 50,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 16,
                  marginTop: 16,
                }}
              >
                <View
                  style={{
                    borderWidth: 2,
                    borderRadius: 50,
                    borderColor: "white",
                    height: 40,
                    width: 40,
                    backgroundColor: "white",
                  }}
                ></View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              icon="axis-z-rotate-clockwise"
              style={{
                marginRight: 12,
                backgroundColor: "white",
                padding: 10,
                borderRadius: 5,
                width: 80,
              }}
              mode="outlined"
              color="white"
              onPress={async () => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
              title="Снимай"
            >
              <Text style={{ textAlign: "center" }}>
                {type === Camera.Constants.Type.back ? "Предна" : "Задна "}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Camera>
    </Modal>
  );
};
export default function ImagePickerExample({ image, setImage }) {
  //const [] = useState(null);
  const [camera, setShowCamera] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* <View
        style={{
          backgroundColor: "#eeee",
          width: 120,
          height: 120,
          borderRadius: 100,
          marginBottom: 8,
        }}
      >
        <Image
          source={{ uri: image }}
          style={{ width: 120, height: 120, borderRadius: 100 }}
        />
      </View> */}

      <TouchableOpacity
        style={{
          backgroundColor: "#AAAEBF",
          flexDirection: "row",
          alignItems: "center",
          borderRadius: 5,
          width: "49%",
          height: 30,
          justifyContent: "center",
        }}
        onPress={() => {
          setShowCamera(true);
        }}
      >
        <Feather
          name="camera"
          size={15}
          color="white"
          style={{ marginRight: 5 }}
        />
        <Text
          style={{
            color: "white",
            fontSize: 19,
            fontFamily: "mulish",
            fontSize: 15,
          }}
        >
          Снимка
        </Text>
      </TouchableOpacity>
      {camera && (
        <CameraModule
          showModal={camera}
          setModalVisible={() => setShowCamera(false)}
          setImage={(result) => {
            setImage(result);
          }}
        />
      )}
    </View>
  );
}
