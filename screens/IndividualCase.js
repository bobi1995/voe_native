import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import * as SecureStore from "expo-secure-store";
import { Octicons } from "@expo/vector-icons";
import moment from "moment";

const { width, height } = Dimensions.get("window");

const GET_CASE = gql`
  query GetSingleCase($caseId: String) {
    getSingleCase(caseId: $caseId) {
      _id
      description
      type
      date
      priority
      status
      userId {
        name
      }
      categoryId {
        name
      }
      answerId {
        _id
        approved {
          _id
        }
        description
        date
        userId {
          _id
          name
        }
      }
    }
  }
`;

const priorityElement = (priority) => {
  const params = {
    text: priority === 1 ? "Нисък" : priority === 2 ? "Среден" : "Висок",
    color: priority === 1 ? "#62DF90" : priority === 2 ? "#F6C274" : "#EB1C24",
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 3,
        paddingHorizontal: 10,
      }}
    >
      <Octicons name="dot-fill" size={height * 0.035} color={params.color} />
      <Text
        style={{
          fontSize: 15,
          fontFamily: "mulish",
          marginLeft: 5,
          color: "#5A607A",
          fontSize: height * 0.02,
        }}
      >
        {params.text}
      </Text>
    </View>
  );
};

const IndividualCase = ({ navigation, route }) => {
  const { userId, token, caseId } = route.params;
  const { loading, error, data } = useQuery(GET_CASE, {
    variables: {
      caseId,
    },
    context: {
      headers: {
        Authorization: `Basic ${token}`,
      },
    },
  });
  if (error) {
    return Alert.alert("Грешка с аутентикацията", error.message, [
      { text: "Затвори", onPress: () => navigation.navigate("Login") },
    ]);
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#EB1C24" />
      </View>
    );
  }

  return (
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
              textAlign: "center",
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
            Съдържание на връзката
          </Text>
        </View>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={() =>
              navigation.navigate("EmpBoard", {
                userId,
                token,
              })
            }
          >
            <AntDesign name="arrowleft" size={height * 0.035} color="white" />
            <Text style={styles.btnText}>Назад</Text>
          </TouchableOpacity>
        </View>
      </View>
      {data ? (
        <ScrollView>
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 5,
              marginHorizontal: width * 0.05,
              padding: width * 0.01,
            }}
          >
            <View style={styles.headerContainer}>
              <View>
                <Text style={styles.infoHeading}>
                  Изпратено {data.getSingleCase.date}
                </Text>
                <Text style={styles.infoValue}>
                  {data.getSingleCase.userId.name}
                </Text>
              </View>
              <View>
                <Text style={styles.infoHeading}>Категория</Text>
                <Text style={styles.infoValue}>
                  {data.getSingleCase.categoryId &&
                  data.getSingleCase.categoryId.length > 0
                    ? data.getSingleCase.categoryId.map((category, index) =>
                        data.getSingleCase.categoryId.length - 1 === index
                          ? category.name
                          : category.name + ", "
                      )
                    : null}
                </Text>
              </View>
              <View>
                <Text style={styles.infoHeading}>Тип</Text>
                <Text style={styles.infoValue}>
                  {data.getSingleCase.type === 1 ? "Проблем" : "Предложение"}
                </Text>
              </View>
              <View>
                <Text style={styles.infoHeading}>Приоритет</Text>
                <Text style={styles.infoValue}>
                  {priorityElement(data.getSingleCase.priority)}
                </Text>
              </View>
              <View>
                <Text style={styles.infoHeading}>Стаутс</Text>
                <Text style={styles.infoValue}>
                  {data.getSingleCase.status === 0 ? "Отворен" : "Разрешен"}
                </Text>
              </View>
            </View>
            <Text style={styles.infoValue}>
              {data.getSingleCase.description}
            </Text>
          </View>
          {data.getSingleCase &&
          data.getSingleCase.answerId &&
          data.getSingleCase.answerId.length > 0
            ? data.getSingleCase.answerId.map((answer) =>
                answer.approved ? (
                  <View
                    key={answer._id}
                    style={{
                      backgroundColor: "white",
                      borderRadius: 5,
                      marginHorizontal: width * 0.05,
                      padding: width * 0.01,
                      marginTop: width * 0.02,
                    }}
                  >
                    <Text
                      style={[
                        styles.infoValue,
                        {
                          fontSize: height * 0.03,
                          marginBottom: height * 0.02,
                          fontWeight: "bold",
                        },
                      ]}
                    >
                      Отговор
                    </Text>
                    <Text
                      style={[
                        styles.infoValue,
                        { marginBottom: height * 0.05 },
                      ]}
                    >
                      {answer.description}
                    </Text>
                    <View
                      style={{
                        right: 10,
                        position: "absolute",
                        bottom: 5,
                        fontSize: height * 0.025,
                        flexDirection: "row",
                      }}
                    >
                      <AntDesign
                        name="checkcircleo"
                        size={height * 0.025}
                        color="#AAAEBF"
                      />
                      <Text style={[styles.infoHeading, { marginLeft: 10 }]}>
                        {answer.userId.name}
                      </Text>
                      <Text style={[styles.infoHeading, { marginLeft: 10 }]}>
                        {moment(new Date(answer.date)).format("DD-MM-YY")}
                      </Text>
                    </View>
                  </View>
                ) : null
              )
            : null}
        </ScrollView>
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            marginTop: height * 0.3,
          }}
        >
          <Text
            style={{
              fontSize: height * 0.05,
              fontWeight: "bold",
              color: "#3D4461",
              fontFamily: "mulish",
              opacity: 1,
              textAlign: "center",
            }}
          >
            Няма данни за тази връзка
          </Text>
        </View>
      )}
    </View>
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
  infoHeading: {
    color: "#AAAEBF",
    fontSize: height * 0.02,
    fontFamily: "mulish",
  },
  infoValue: { fontSize: height * 0.025, fontFamily: "mulish" },
  btnStyle: {
    backgroundColor: "#AAAEBF",
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    height: height * 0.09,
    borderRadius: 5,
    marginHorizontal: 3,
    width: width * 0.15,
    justifyContent: "center",
  },
  btnText: {
    color: "white",
    fontSize: height * 0.035,
    fontFamily: "mulish",
  },
});

export default IndividualCase;
