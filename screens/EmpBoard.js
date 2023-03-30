import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { Octicons } from "@expo/vector-icons";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import * as SecureStore from "expo-secure-store";
import { Table, TableWrapper, Row, Cell } from "react-native-table-component";
import UserAvatar from "react-native-user-avatar";
import { AirbnbRating } from "react-native-ratings";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const GET_USER = gql`
  query ExampleQuery($getSingleUserId: String!) {
    getSingleUser(id: $getSingleUserId) {
      _id
      username
      name
      regCaseIds {
        _id
        date
        priority
        type
        description
        status
        rating
        categoryId {
          name
        }
        answerId {
          _id
          approved {
            _id
          }
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

const OpenElement = (navigation, userId, token, caseId) => {
  return (
    <AntDesign
      name="folderopen"
      size={height * 0.04}
      color="#5A607A"
      style={{ alignSelf: "center" }}
      onPress={() =>
        navigation.navigate("IndividualCase", {
          userId,
          token,
          caseId,
        })
      }
    />
  );
};
const EmpBoard = ({ navigation, route }) => {
  const { userId, token } = route.params;
  const [tableData, setTableData] = useState([]);
  const [renderTableData, setRenderTableData] = useState([]);
  const [favCategory, setFavCategory] = useState(null);
  const [answers, setAnswers] = useState(0);
  const [empRate, setEmpRate] = useState(null);
  const {
    loading: loadUser,
    error: errorUser,
    data: userData,
  } = useQuery(GET_USER, {
    variables: {
      getSingleUserId: userId,
    },
  });

  useEffect(() => {
    if (userData) {
      let votes = 0;
      let rating = 0;
      let closed = 0;
      const tempData = userData.getSingleUser.regCaseIds.map((el) => {
        if (el.status === 1) {
          closed = closed + 1;
        }
        if (el.rating && el.rating.length > 0) {
          el.rating.map((vote) => {
            const toObject = JSON.parse(vote);
            votes++;
            return (rating = rating + toObject.rating);
          });
        }

        const categories = el.categoryId.map((cat) => cat.name);

        return {
          priority: el.priority,
          type: el.type === 1 ? "Проблем" : "Предложение",
          categories: categories.join(","),
          description: el.description,
          status: el.status === 0 ? "Отворен" : "Разрешен",
          date: el.date,
          _id: el._id,
        };
      });
      setAnswers(closed);
      setEmpRate(rating / votes);
      tempData.sort((a, b) => a.date < b.date);

      //Favourite category
      const cat = tempData
        .map((el) => el.categories)
        .toString()
        .split(",");
      const most = cat.reduce(
        (a, b, i, arr) =>
          arr.filter((v) => v === a).length >= arr.filter((v) => v === b).length
            ? a
            : b,
        null
      );
      setFavCategory(most);

      setTableData(tempData);
      setRenderTableData(tempData);
    }
  }, [userData]);

  if (errorUser) {
    console.log(errorUser);
    return Alert.alert(errorUser.message);
  }

  if (loadUser)
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#EB1C24" />
      </View>
    );

  const tableHead = [
    "Приоритет",
    "Тип",
    "Категория",
    "Описание",
    "Статус",
    <Ionicons
      name="menu"
      size={height * 0.05}
      color="white"
      style={{ alignSelf: "center" }}
    />,
  ];
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
            Потребителски Профил
          </Text>
        </View>
        <View style={styles.headerContainer}>
          <View
            style={{
              flexDirection: "row",
              height: height * 0.09,
              borderWidth: 1,
              borderRadius: 5,
              borderColor: "#AAAEBF",
              width: width * 0.3,
              alignItems: "center",
            }}
          >
            <FontAwesome
              name="search"
              size={24}
              color="#AAAEBF"
              style={{ marginLeft: 10 }}
            />
            <TextInput
              style={{
                width: "100%",
                flex: 1,
                paddingLeft: 5,
                fontSize: height * 0.03,
              }}
              onChangeText={(value) => {
                setRenderTableData(tableData);
                if (value) {
                  const filtered = tableData.filter((el) =>
                    el.description.toLowerCase().includes(value.toLowerCase())
                  );
                  setRenderTableData(filtered);
                }
              }}
              placeholder="Търсене по описание"
              autoCapitalize="none"
            />
            <FontAwesome
              name="filter"
              size={24}
              color="#AAAEBF"
              style={{ marginRight: 10 }}
            />
          </View>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={() => navigation.navigate("Start")}
          >
            <Text style={styles.btnText}>Изход</Text>
          </TouchableOpacity>
        </View>
      </View>

      {userData && userData.getSingleUser ? (
        <>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 16,
              borderRadius: 5,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "white",
                padding: 10,
                elevation: 10,
                width: width * 0.2,
                borderRadius: 5,
              }}
            >
              <UserAvatar
                size={height * 0.06}
                name={userData.getSingleUser.name}
                style={{
                  marginRight: 10,
                }}
              />
              <View>
                <Text style={styles.smallInfoHeading}>
                  {userData.getSingleUser.username}
                </Text>
                <Text style={styles.smallInfoText}>
                  {userData.getSingleUser.name}
                </Text>
              </View>
            </View>
            <View style={styles.smallInfoContainer}>
              <Text style={styles.smallInfoHeading}>
                Рейтинг - {empRate ? empRate.toFixed(2) : "N/A"}
              </Text>
              <AirbnbRating
                count={5}
                reviews={[
                  "Слаб",
                  "Незадоволително",
                  "Средно",
                  "Добре",
                  "Страхотен",
                ]}
                defaultRating={Math.round(empRate)}
                size={height * 0.025}
                reviewSize={height * 0.025}
                showRating={false}
                isDisabled
                starContainerStyle={{
                  alignSelf: "flex-start",
                }}
              />
            </View>
            <View style={styles.smallInfoContainer}>
              <Text style={styles.smallInfoHeading}>Отговори/Сигнали</Text>
              <Text style={styles.smallInfoText}>
                {answers}/{userData.getSingleUser.regCaseIds.length}
              </Text>
            </View>
            <View style={styles.smallInfoContainer}>
              <Text style={styles.smallInfoHeading}>Любима категория</Text>
              <Text style={styles.smallInfoText}>{favCategory}</Text>
            </View>
          </View>
          <ScrollView>
            <View style={styles.tableContainer}>
              <Table
                borderStyle={{
                  borderWidth: 2,
                  borderColor: "white",
                  borderRadius: 5,
                }}
              >
                <Row
                  data={tableHead}
                  style={styles.tableHead}
                  textStyle={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: height * 0.02,
                    paddingHorizontal: 10,
                    // alignSelf: "center",
                  }}
                  widthArr={[220, 220, 220, 220, 220, 150]}
                />
                {renderTableData.map((tableRow, index) => (
                  <TableWrapper
                    key={index}
                    style={
                      index % 2 !== 0
                        ? styles.row
                        : {
                            backgroundColor: "#EDEEF2",
                            flexDirection: "row",
                            backgroundColor: "white",
                          }
                    }
                  >
                    <Cell
                      data={priorityElement(tableRow.priority)}
                      textStyle={styles.rowText}
                      numberOfLines={1}
                      width={220}
                    />
                    <Cell
                      data={tableRow.type}
                      textStyle={styles.rowText}
                      numberOfLines={1}
                      width={220}
                    />
                    <Cell
                      data={tableRow.categories}
                      textStyle={styles.rowText}
                      numberOfLines={1}
                      width={220}
                    />
                    <Cell
                      data={tableRow.description}
                      textStyle={styles.rowText}
                      numberOfLines={1}
                      width={220}
                    />
                    <Cell
                      data={tableRow.status}
                      textStyle={styles.rowText}
                      numberOfLines={1}
                      width={220}
                    />
                    <Cell
                      data={OpenElement(
                        navigation,
                        userId,
                        token,
                        tableRow._id
                      )}
                      textStyle={{
                        justifyContent: "center",
                        color: "#5A607A",
                        fontFamily: "mulish",
                        overflow: "hidden",
                        paddingHorizontal: 10,
                        fontSize: height * 0.02,
                      }}
                      numberOfLines={1}
                      width={150}
                    />
                  </TableWrapper>
                ))}
              </Table>
            </View>
          </ScrollView>
        </>
      ) : (
        <Text>Няма данни за потребителя!</Text>
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
  btnStyle: {
    backgroundColor: "#EB1C24",
    paddingHorizontal: 20,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    height: height * 0.09,
    borderRadius: 5,
    marginHorizontal: 3,
    width: width * 0.1,
  },
  btnText: {
    color: "white",
    fontSize: height * 0.035,
    fontFamily: "mulish",
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: "#AAAEBF",
    height: 50,
    width: 250,
  },
  tableContainer: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: "#F4F4F4",
    elevation: 10,
    borderRadius: 5,
  },
  tableHead: { height: 40, backgroundColor: "#5A607A" },
  tableText: { margin: 6 },
  row: { flexDirection: "row", backgroundColor: "white" },
  rowText: {
    color: "#5A607A",
    fontFamily: "mulish",
    overflow: "hidden",
    paddingHorizontal: 10,
    fontSize: height * 0.02,
  },
  smallInfoContainer: {
    backgroundColor: "white",
    padding: 10,
    elevation: 10,
    width: width * 0.2,
    borderRadius: 5,
  },
  smallInfoHeading: {
    color: "#5A607A",
    fontFamily: "mulish",
    fontSize: height * 0.02,
  },
  smallInfoText: {
    color: "#5A607A",
    fontFamily: "mulish",
    fontSize: height * 0.02,
    fontWeight: "bold",
  },
});

export default EmpBoard;
