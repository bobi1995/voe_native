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
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { Octicons } from "@expo/vector-icons";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import * as SecureStore from "expo-secure-store";
import {
  Table,
  TableWrapper,
  Row,
  Cell,
  Rows,
} from "react-native-table-component";

const GET_USER = gql`
  query ExampleQuery($getSingleUserId: String!) {
    getSingleUser(id: $getSingleUserId) {
      _id
      username
      regCaseIds {
        date
        priority
        type
        description
        status
        categoryId {
          name
        }
      }
    }
  }
`;
const getValue = async (key) => {
  const result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else return null;
};

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
      }}
    >
      <Octicons name="dot-fill" size={30} color={params.color} />
      <Text
        style={{
          fontSize: 15,
          fontFamily: "mulish",
          marginLeft: 5,
          color: "#3D4461",
        }}
      >
        {params.text}
      </Text>
    </View>
  );
};

const EmpBoard = ({ navigation }) => {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [tableData, setTableData] = useState([]);

  const [getUser, { loading: loadUser, error: errorUser, data: userData }] =
    useLazyQuery(GET_USER, {
      onCompleted: (data) => {
        const tempData = data.getSingleUser.regCaseIds.map((el) => {
          const categories = el.categoryId.map((cat) => cat.name);
          return {
            priority: el.priority,
            type: el.type === 1 ? "Проблем" : "Предложение",
            categories: categories.join(","),
            description: el.description,
            status: el.status === 0 ? "Отворен" : "Разрешен",
            date: el.date,
          };
        });
        tempData.sort((a, b) => a.date < b.date);
        setTableData(tempData);
      },
    });

  useEffect(() => {
    getValue("token")
      .then((data) => setToken(data))
      .catch((err) => console.log(err));

    getValue("userId")
      .then((data) => {
        if (data) {
          getUser({
            variables: {
              getSingleUserId: data,
            },
          });
        }
        setUserId(data);
      })
      .catch((err) => console.log(err));
  }, []);

  if (loadUser)
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#EB1C24" />
      </View>
    );

  const tableHead = ["Приоритет", "Тип", "Категория", "Описание", "Статус"];

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
              fontSize: 21,
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
              fontSize: 15,
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
              height: 50,
              borderWidth: 1,
              borderRadius: 5,
              borderColor: "#AAAEBF",
              width: 250,
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
              }}
              //   onChangeText={setPassword}
              //   value={password}
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
        <ScrollView>
          <View style={styles.tableContainer}>
            <Table borderStyle={{ borderWidth: 2, borderColor: "#c8e1ff" }}>
              <Row
                data={tableHead}
                style={styles.tableHead}
                textStyle={styles.tableText}
              />
              {/* <Rows data={tableData} textStyle={styles.tableText} /> */}
              {tableData.map((tableRow, index) => (
                <TableWrapper key={index} style={styles.row}>
                  <Cell
                    data={priorityElement(tableRow.priority)}
                    textStyle={styles.text}
                  />
                  <Cell data={tableRow.type} textStyle={styles.text} />
                  <Cell data={tableRow.categories} textStyle={styles.text} />
                  <Cell data={tableRow.description} textStyle={styles.text} />
                  <Cell data={tableRow.status} textStyle={styles.text} />
                </TableWrapper>
              ))}
            </Table>
          </View>
        </ScrollView>
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
    height: 50,
    borderRadius: 5,
    marginHorizontal: 3,
  },
  btnText: {
    color: "white",
    fontSize: 19,
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
    backgroundColor: "#fff",
  },
  tableHead: { height: 40, backgroundColor: "#f1f8ff" },
  tableText: { margin: 6 },
  row: { flexDirection: "row", backgroundColor: "#FFF1C1" },
});

export default EmpBoard;
