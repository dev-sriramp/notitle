import React, { useState ,useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  Text,
  Center,
  NativeBaseProvider,  
  Container,
  Button,
  ScrollView,
} from 'native-base';
const UpdateCountPage = ({navigation,route}) => {
const [updateCount, setUpdateCount] = useState([]);
  const model = route.params;
  console.log(model)
  useEffect(() => {
    GetData();
  },[])

  const GetData = async()=>{
    const formValues = [];
    var today = new Date();
    let month = today.getMonth()+1
    if(month<10){
        month = "0"+month;
    }
    var collection = today.getFullYear()+"-"+month+"-"+today.getDate();
    console.log(collection);
    await firestore()
    .collection(collection).where("substation","==",model.model).where("workstation","==",model.workStation)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        console.log(documentSnapshot.data());
        formValues.push(documentSnapshot.data());

      });
    });
      setUpdateCount(formValues);
  }

  return (
    <NativeBaseProvider>
      <Center mt={10} flex={1} px="3">
      <Container>
        <ScrollView>
      <Text>Select Substation</Text>
      <Button mt={5} onPress={() => navigation.goBack()} >Go Back</Button>
      </ScrollView>
    </Container>
      </Center>
    </NativeBaseProvider>
  );
};
export default UpdateCountPage;
