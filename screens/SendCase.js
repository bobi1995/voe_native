import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
  Button,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import Checkbox from "expo-checkbox";
import ConfirmModal from "../components/Problem/ConfirmModal";
import HelpModal from "../components/Problem/HelpModal";
import Camera from "../components/Camera";
import AttachedImage from "./SendCase/AttachedImage";
const { width, height } = Dimensions.get("window");

const GET_CATEGORIES = gql`
  query ExampleQuery {
    getAllCategories {
      _id
      name
      descriptionProblem
      descriptionSuggestion
    }
  }
`;

const GET_USER = gql`
  query ExampleQuery1($username: String!) {
    getSingleUserByUsername(username: $username) {
      _id
      username
      password
      name
      email
      position
      admin
      avatar
    }
  }
`;

const SendCase = ({ navigation, route }) => {
  const type = route.params.reportType;
  const mainColor = route.params.reportType === 1 ? "#EB1C24" : "#62DF90";
  const [emp, setEmp] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isChecked, setChecked] = useState(1);
  const [categories, setCategories] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [helpVisible, setHelpVisible] = useState(false);
  const { loading, error, data } = useQuery(GET_CATEGORIES);
  const [getUser, { loading: loadUser, error: errorUser, data: userData }] =
    useLazyQuery(GET_USER);

  useEffect(() => {
    if (errorUser) {
      setName("");
      alert(errorUser.message);
    }
    if (userData) {
      setName(userData.getSingleUserByUsername[0].name);
      Keyboard.dismiss();
    }
  }, [loadUser, userData]);

  if (loading || loadUser) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color={mainColor} />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={[styles.container, styles.horizontal, { alignItems: "center" }]}
      >
        <Text
          style={{
            fontSize: 21,
            fontWeight: "bold",
            color: "#3D4461",
            fontFamily: "mulish",
            opacity: 1,
          }}
        >
          Категориите не могат да бъдат заредени
          {error.message}
        </Text>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View
            style={{
              padding: 10,
            }}
          >
            <Text
              style={{
                fontSize: height * 0.05,
                fontWeight: "bold",
                color: "#3D4461",
                fontFamily: "mulish",
                opacity: 1,
              }}
            >
              Система за обратна връзка
            </Text>
            <Text
              style={{
                fontSize: height * 0.035,
                color: "#231F20",
                fontFamily: "mulish",
                opacity: 1,
              }}
            >
              Подаване на сигнал за проблем
            </Text>
          </View>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.btnStyle}
              onPress={() => navigation.navigate("Start")}
            >
              <AntDesign
                name="arrowleft"
                size={height * 0.04}
                color="white"
                style={{ marginRight: 5 }}
              />
              <Text style={styles.btnText}>Назад</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnStyle}
              onPress={() => setHelpVisible(!helpVisible)}
            >
              <AntDesign
                name="questioncircleo"
                size={height * 0.04}
                color="white"
                style={{ marginRight: 5 }}
              />
              <Text style={styles.btnText}>Помощ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btnStyle, { backgroundColor: mainColor }]}
              onPress={() => {
                setModalVisible(true);
              }}
            >
              <Text style={styles.btnText}>Напред</Text>
              <AntDesign
                name="arrowright"
                size={height * 0.04}
                color="white"
                style={{ marginLeft: 5 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.headerContainer}>
          <View style={styles.innerBodyContainer}>
            <SafeAreaView
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ width: "35%" }}>
                <Text style={styles.label}>Потребител</Text>
                <View
                  style={{
                    flexDirection: "row",
                    height: height * 0.1,
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: "#AAAEBF",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "black",
                      fontSize: height * 0.05,
                    }}
                  >
                    emp
                  </Text>

                  <TextInput
                    keyboardType="numeric"
                    maxLength={3}
                    style={{
                      width: "100%",
                      flex: 1,
                      fontSize: height * 0.05,
                    }}
                    onChangeText={(value) => {
                      if (value.length === 3) {
                        getUser({
                          variables: {
                            username: `emp${value}`,
                          },
                        });
                      }

                      setEmp(value);
                    }}
                    value={emp}
                    placeholder="100"
                  />
                </View>
              </View>
              <View style={{ width: "60%" }}>
                <Text style={styles.label}>Име и Фамилия</Text>
                <TextInput style={styles.input} value={name} placeholder="" />
              </View>
            </SafeAreaView>
            <SafeAreaView>
              <Text style={styles.label}>Описание на проблема</Text>
              <TextInput
                multiline={true}
                style={{
                  width: "99%",
                  borderWidth: 1,
                  borderRadius: 5,
                  borderColor: "#AAAEBF",
                  height: height * 0.4,
                  textAlignVertical: "top",
                  fontSize: height * 0.05,
                }}
                value={description}
                onChangeText={setDescription}
                placeholder="Опиши възникналият проблем..."
              />
            </SafeAreaView>
            {image ? <AttachedImage image={image} setImage={setImage} /> : null}
            <Camera image={image} setImage={setImage} />
          </View>
          <View style={styles.innerBodyContainer}>
            <View>
              <Text style={styles.label}>Приоритет</Text>

              <SafeAreaView
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={styles.section}>
                  <Checkbox
                    style={styles.checkbox}
                    value={isChecked === 1}
                    onValueChange={() => setChecked(1)}
                  />
                  <Octicons
                    name="dot-fill"
                    size={height * 0.05}
                    color="#62DF90"
                  />
                  <Text style={styles.paragraph}>Нисък</Text>
                </View>
                <View style={styles.section}>
                  <Checkbox
                    style={styles.checkbox}
                    value={isChecked === 2}
                    onValueChange={() => setChecked(2)}
                  />
                  <Octicons
                    name="dot-fill"
                    size={height * 0.05}
                    color="#F6C274"
                  />
                  <Text style={styles.paragraph}>Среден</Text>
                </View>
                <View style={styles.section}>
                  <Checkbox
                    style={styles.checkbox}
                    value={isChecked === 3}
                    onValueChange={() => setChecked(3)}
                  />
                  <Octicons
                    name="dot-fill"
                    size={height * 0.05}
                    color="#EB1C24"
                  />
                  <Text style={styles.paragraph}>Висок</Text>
                </View>
              </SafeAreaView>
            </View>
            <View
              style={[
                styles.horizontal,
                {
                  justifyContent: "flex-start",
                  flexWrap: "wrap",
                },
              ]}
            >
              {data && data.getAllCategories
                ? data.getAllCategories.map((el) => (
                    <TouchableOpacity
                      style={
                        categories.includes(el._id)
                          ? [
                              styles.touchableCategory,
                              {
                                backgroundColor: mainColor,
                                borderColor: mainColor,
                              },
                            ]
                          : styles.touchableCategory
                      }
                      key={el._id}
                      onPress={() => {
                        if (categories.includes(el._id)) {
                          const temp = categories.filter(
                            (item) => item !== el._id
                          );
                          return setCategories(temp);
                        } else return setCategories([...categories, el._id]);
                      }}
                    >
                      <Text
                        style={
                          categories.includes(el._id)
                            ? [styles.categoryText, { color: "#FFFFFF" }]
                            : styles.categoryText
                        }
                      >
                        {el.name}
                      </Text>
                    </TouchableOpacity>
                  ))
                : null}
            </View>
          </View>
        </View>
        <ConfirmModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          description={description}
          userId={
            userData && userData.getSingleUserByUsername[0]
              ? userData.getSingleUserByUsername[0]._id
              : ""
          }
          categoryId={categories}
          priority={isChecked}
          navigate={navigation.navigate}
          attachment={image}
          reportType={type}
        />
        <HelpModal
          modalVisible={helpVisible}
          setModalVisible={setHelpVisible}
          reportType={type}
          categories={
            data && data.getAllCategories
              ? data.getAllCategories.map((el) => {
                  if (categories.includes(el._id)) {
                    return el;
                  } else return;
                })
              : []
          }
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  headerContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  btnStyle: {
    backgroundColor: "#AAAEBF",
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    height: height * 0.12,
    borderRadius: 5,
    marginHorizontal: 3,
    width: width * 0.17,
  },
  picBtn: {
    backgroundColor: "#AAAEBF",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    width: "49%",
    height: 30,
    justifyContent: "center",
  },
  btnText: {
    color: "white",
    fontSize: height * 0.05,
    fontFamily: "mulish",
  },
  innerBodyContainer: {
    backgroundColor: "white",
    width: "49%",
    elevation: 10,
    borderRadius: 5,
    padding: 15,
    marginTop: height * 0.05,
  },
  input: {
    height: height * 0.05,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: "#AAAEBF",
    fontSize: height * 0.05,
    flex: 1,
  },
  label: {
    fontSize: height * 0.04,
    fontWeight: "bold",
    color: "#3D4461",
    fontFamily: "mulish",
    opacity: 1,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  touchableCategory: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#AAAEBF",
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 5,
    padding: 5,
  },
  paragraph: {
    fontSize: height * 0.045,
    fontFamily: "mulish",
    marginLeft: 5,
    color: "#3D4461",
  },
  categoryText: {
    fontSize: width * 0.02,
    fontFamily: "mulish",
    marginLeft: 5,
    color: "#3D4461",
  },
  checkbox: {
    margin: 8,
    height: width * 0.03,
    width: width * 0.03,
  },
});

export default SendCase;
