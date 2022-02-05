import React, { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import {Picker} from '@react-native-picker/picker';
import {Text,StatusBar,Center,NativeBaseProvider,Button,ScrollView,Stack,Input,FormControl,Box, Heading,} from 'native-base';
import SBar from '../components/StatusBar';
import {PRIMARY_COLOR} from "../util/constants";
import Image from "../components/Image";
const UpdateCountPage = ({ navigation, route }) => {
  const [updateCount, setUpdateCount] = useState([]);
  const [inputValues, setInputValues] = useState({ count: "", time: "" })
  const [reason,setReason] = useState([]);
  const [workStation, setWorkStation] = React.useState("");
  const [loading, setLoading] = useState(true);
  const model = route.params;
  useEffect(() => {
    GetData();
  }, [])
  const selectWorkStation = (props) => {
    setWorkStation(props);
  }
  const GetData = async () => {
    const formValues = [];
    var today = new Date();
    let month = today.getMonth() + 1;
    let tod = today.getDate();
    if(tod<10){
      tod = "0"+tod;
    }
    if (month < 10) {
      month = "0" + month;
    }
    var collection = today.getFullYear() + "-" + month + "-" + tod;
    await firestore()
      .collection(collection).where("substation", "==", model.model).where("workstation", "==", model.workStation)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          formValues.push(documentSnapshot.data());

        });
      });
    setUpdateCount(formValues[0]);
    const tempReason = [];
    await firestore()
      .collection('Reasons')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          tempReason.push(documentSnapshot.data().reason);
          console.log(tempReason);
        });
      });
    setReason(tempReason);
    setLoading(false);
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
  if (loading) {
    return (
      <NativeBaseProvider>
        <SBar />
      <Center>
        <Heading>Loading</Heading>
        </Center>
      </NativeBaseProvider>
    )
  }
  if(updateCount===undefined){
    return(
      <NativeBaseProvider>
        <SBar />
      <Center>
        <Heading>No Data Found</Heading>
        <Button mt={5} onPress={() => navigation.goBack()} >Go Back</Button>
        </Center>
      </NativeBaseProvider>
    )
  }
  return (
    <NativeBaseProvider>
     <SBar />
     <Image />
      <Stack mt={5} flex={1} px="3">
       
        {/* <Container> */}
        <ScrollView>
          <Center>
            <Text fontSize="4xl" bold>Task List</Text>
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
          {/* <Box w={{ base: "100%", md: "25%", }} mt={1}> */}

            <FormControl isRequired>
              <FormControl.Label  ml={20} width={80}><Text fontSize="3xl" bold >Actual Count</Text></FormControl.Label>
              <Input  ml={10} width={80} type="number" placeholder="Actual Count" value={updateCount && updateCount.actualCount && updateCount.actualCount.length > 0 ? updateCount.actualCount : inputValues.count} onChange={(e) => { setValue(e, "count") }}
              />
            </FormControl>
          {/* </Box> */}
          <Center>
          <FormControl isRequired isInvalid>
            <Center>
            <FormControl.Label><Heading>Reason </Heading></FormControl.Label>
            </Center>
            <Box borderRadius="md" width={80} borderWidth={2} borderColor={PRIMARY_COLOR}>
            <Picker
              selectedValue={workStation}
              onValueChange={(itemValue) =>
                selectWorkStation(itemValue)
              }>
                <Picker.Item label="" value="" />
              {
                reason.map((element, index) => (
                  <Picker.Item key={index} label={element} value={element} /> 
                ))
              }
            </Picker>
            </Box>
          </FormControl>
          </Center>
          <Box w={{ base: "100%", md: "25%", }} mt={1}>
            <FormControl isRequired>
              <FormControl.Label ml={20} width={80}><Text fontSize="3xl" bold>Actual Time</Text></FormControl.Label>
              <Input ml={10} width={80} type="time" placeholder="Actual Time" value={updateCount && updateCount.actualTime && updateCount.actualTime.length > 0 ? updateCount.actualTime : inputValues.time} onChange={(e) => { setValue(e, "time") }} />
            </FormControl>
          </Box>
          <Button  bg={PRIMARY_COLOR} mt={5} onPress={() => { DataPush() }} >Submit</Button>
          <Button  bg={PRIMARY_COLOR} mt={5} onPress={() => navigation.goBack()} >Go Back</Button>
          </Center>
        </ScrollView>
        {/* </Container> */}
      </Stack>
    </NativeBaseProvider>
  );
};
export default UpdateCountPage;
