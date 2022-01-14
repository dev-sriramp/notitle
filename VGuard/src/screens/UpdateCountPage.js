import React, { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import {Text,StatusBar,Center,NativeBaseProvider,Button,ScrollView,Stack,Input,FormControl,Box,} from 'native-base';
const UpdateCountPage = ({ navigation, route }) => {
  const [updateCount, setUpdateCount] = useState([]);
  const [inputValues, setInputValues] = useState({ count: "", time: "" })
  const model = route.params;
  useEffect(() => {
    GetData();
  }, [])

  const GetData = async () => {
    const formValues = [];
    var today = new Date();
    let month = today.getMonth() + 1
    if (month < 10) {
      month = "0" + month;
    }
    var collection = today.getFullYear() + "-" + month + "-" + today.getDate();
    await firestore()
      .collection(collection).where("substation", "==", model.model).where("workstation", "==", model.workStation)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          formValues.push(documentSnapshot.data());

        });
      });
    setUpdateCount(formValues[0]);
  }
  const DataPush = async () => {
    var today = new Date();
    let month = today.getMonth() + 1
    if (month < 10) {
      month = "0" + month;
    }
    var collection = today.getFullYear() + "-" + month + "-" + today.getDate();
    if (updateCount.actualCount.length > 0 && updateCount.actualTime.length > 0) {
      alert("Value Already Updated");
      navigation.goBack()

    }
    else {
      if (inputValues.count.length > 0 && inputValues.time.length > 0) {

        await firestore()
          .collection(collection)
          .doc(updateCount.id)
          .update({
            actualCount: inputValues.count,
            actualTime: inputValues.time,
          })
          .then(() => {
            alert('Updated');
            navigation.goBack();
          });
      }
      else {
        alert("Check the count and time")
      }
    }

  }
  const setValue = (e, props) => {
    let newFormValues = { ...inputValues };
    newFormValues[props] = e.nativeEvent.text;
    setInputValues(newFormValues);

  }

  return (
    <NativeBaseProvider>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#ffffff"
        translucent={false}
        networkActivityIndicatorVisible={true}
      />
      <Stack mt={10} flex={1} px="3">
        {/* <Container> */}
        <ScrollView>
          <Center>
            <Text fontSize="4xl" bold>Task List</Text></Center>
          <Text fontSize="3xl" bold mt={1}>workstation Name : </Text>
          <Text fontSize="2xl">{model.workStation}</Text>
          <Text fontSize="3xl" bold mt={1}>Model Name : </Text>
          <Text fontSize="2xl">{model.model}</Text>
          <Text fontSize="3xl" bold mt={1}>Date : </Text>
          <Text fontSize="2xl">{updateCount.date}</Text>
          <Text fontSize="3xl" bold mt={1} >Count : </Text>
          <Text fontSize="2xl">{updateCount.count}</Text>
          <Text fontSize="3xl" bold mt={1}>Time Allocated : </Text>
          <Text fontSize="2xl">{updateCount.time} HRS</Text>
          <Box w={{ base: "100%", md: "25%", }} mt={1}>
            <FormControl isRequired>
              <FormControl.Label><Text fontSize="3xl" bold>Actual Count</Text></FormControl.Label>
              <Input type="number" placeholder="Actual Count" value={updateCount && updateCount.actualCount && updateCount.actualCount.length > 0 ? updateCount.actualCount : inputValues.count} onChange={(e) => { setValue(e, "count") }}
              />
            </FormControl>
          </Box>
          <Box w={{ base: "100%", md: "25%", }} mt={1}>
            <FormControl isRequired>
              <FormControl.Label><Text fontSize="3xl" bold>Actual Time</Text></FormControl.Label>
              <Input type="time" placeholder="Actual Time" value={updateCount && updateCount.actualTime && updateCount.actualTime.length > 0 ? updateCount.actualTime : inputValues.time} onChange={(e) => { setValue(e, "time") }} />
            </FormControl>
          </Box>
          <Button mt={5} onPress={() => { DataPush() }} >Submit</Button>
        </ScrollView>
        {/* </Container> */}
      </Stack>
    </NativeBaseProvider>
  );
};
export default UpdateCountPage;
