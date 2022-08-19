import React, { useState, useRef } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Platform,
} from "react-native";
import Signature from "react-native-signature-canvas";
import { gql, useMutation } from "@apollo/client";
import { AntDesign } from "@expo/vector-icons";

const SEND_CASE = gql`
  mutation CreateCase($input: CreateCase!, $attachments: Upload) {
    createCase(input: $input, attachments: $attachments) {
      _id
    }
  }
`;

const ConfirmModal = ({
  modalVisible,
  setModalVisible,
  description,
  priority,
  userId,
  categoryId,
  navigate,
  reportType,
}) => {
  const ref = useRef();
  const [signature, setSign] = useState(null);

  const [
    createCase,
    { data: caseData, loading: caseLoading, error: caseError },
  ] = useMutation(SEND_CASE);

  const handleConfirm = () => {
    const temp = ref.current.readSignature();
    setSign(temp);
  };

  const handleEmpty = () => {
    ref.current.clearSignature();
  };

  const handleOK = (signature) => {
    setSign(signature);
  };

  const sendCase = () => {
    if (!signature) {
      return Alert.alert("Подпиши се");
    } else {
      createCase({
        variables: {
          input: {
            description,
            date: new Date().toDateString(),
            priority,
            userId,
            categoryId,
            signature,
            type: reportType,
          },
        },
      });
      if (caseError) {
        setModalVisible(!modalVisible);

        Alert.alert("Неуспешно записване на кейс. Потърси администратор");
      }
    }
  };

  if (!userId || !description || categoryId.length < 1) {
    return (
      <Modal
        supportedOrientations={["portrait", "landscape"]}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View
            style={[
              styles.modalView,
              {
                padding: 35,
                justifyContent: "center",
                height: 300,
                width: 350,
              },
            ]}
          >
            <Text style={styles.modalText}>Попълни липсващите полета:</Text>
            {!userId ? (
              <Text style={styles.modalSubText}> - Съществуващ потребител</Text>
            ) : null}
            {!description ? (
              <Text style={styles.modalSubText}> - Описание на проблема</Text>
            ) : null}
            {categoryId.length < 1 ? (
              <Text style={styles.modalSubText}> - Категории</Text>
            ) : null}

            <Pressable
              style={[
                styles.button,
                styles.buttonClose,
                { backgroundColor: "#EB1C24" },
              ]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Затвори</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <Modal
      supportedOrientations={["portrait", "landscape"]}
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        {caseData ? (
          <View style={[styles.modalView, { padding: 20 }]}>
            <AntDesign name="checkcircleo" size={120} color="#EEEFF2" />
            <View style={{ paddingHorizontal: 30 }}>
              <Text style={styles.modalText}>
                Успешно изпратихте вашето предложение за подобрение
              </Text>
              <Text style={styles.modalSubText}>
                Вашето съобщение е записано и в момента се обработва. Ще
                получите обратна връзка за напредъка в срок, според избрания от
                вас приоритет. Ако имате други предложения за подобрения и/или
                сигнали за проблем, моля не се колебайте да ги споделите.
              </Text>
            </View>
            <Pressable
              style={[
                styles.button,
                styles.buttonClose,
                { backgroundColor: "#EB1C24" },
              ]}
              onPress={() => navigate("Start")}
            >
              <Text style={styles.textStyle}>Затоври</Text>
            </Pressable>
          </View>
        ) : caseLoading ? (
          <View style={styles.modalView}>
            <ActivityIndicator size="large" color="#EB1C24" />
          </View>
        ) : (
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Моля, потвърдете самоличността си
            </Text>
            <Text style={styles.modalSubText}>
              Подпишете се с пръст върху оказаното на екрана място
            </Text>

            <View>
              {signature ? (
                <View style={styles.preview}>
                  <Image
                    resizeMode={"contain"}
                    style={{ width: 335, height: 114 }}
                    source={{ uri: signature }}
                  />

                  <View style={styles.row}>
                    <TouchableOpacity
                      onPress={() => setModalVisible(!modalVisible)}
                      style={styles.confirmBtn}
                    >
                      <Text style={styles.textStyle}>Откажи се</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setSign(null)}
                      style={styles.confirmBtn}
                    >
                      <Text style={styles.textStyle}>Нов</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={sendCase}
                      style={styles.confirmBtn}
                    >
                      <Text style={styles.textStyle}>Изпрати</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View style={styles.preview}>
                  <Signature ref={ref} onOK={handleOK} webStyle={style} />

                  <View style={styles.row}>
                    <TouchableOpacity
                      onPress={() => setModalVisible(!modalVisible)}
                      style={styles.confirmBtn}
                    >
                      <Text style={{ color: "white" }}>Откажи се</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleEmpty()}
                      style={styles.confirmBtn}
                    >
                      <Text style={{ color: "white" }}>Изчисти</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleConfirm()}
                      style={styles.confirmBtn}
                    >
                      <Text style={{ color: "white" }}>Потвърди</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  confirmBtn: {
    backgroundColor: "#AAAEBF",
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginHorizontal: 3,
    width: 100,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "50%",
    alignItems: "center",
    marginTop: 5,
  },
  preview: {
    width: 500,
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },
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
  textContainer: {
    textAlign: "center",
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    width: 100,
    marginTop: 10,
    marginHorizontal: 5,
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
  },
  modalText: {
    fontSize: 19,
    fontFamily: "mulish",
    color: "#3D4461",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalSubText: {
    fontFamily: "mulish",
    color: "#3D4461",
    fontSize: 15,
    textAlign: "center",
  },
});
const style = `
.m-signature-pad {
  width: ${Platform.OS === "android" ? `400px` : `500px`};
  height:165px;
  border: 1px solid #e8e8e8;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.08) inset;
}
.m-signature-pad--body {border: none; }
.m-signature-pad--footer.m-signature-pad--footer
.save {
 right:0;
 background-color:green
}
.description{
  display:none;
}
.m-signature-pad--footer.m-signature-pad--footer
.clear {
  background-color:red;
  left:0;
  position:relative
}
.m-signature-pad--footer {
  display:none;
  }
`;
export default ConfirmModal;
