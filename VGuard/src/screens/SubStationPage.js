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
const SubStationPage = ({navigation,route}) => {
  const [updateSubStation, setUpdateSubStation] = useState([]);
  const workStation = route.params;
  console.log(workStation);
  useEffect(() => {
    GetData();
  },[])

  const GetData = async()=>{
    const formValues = [];
    await firestore()
    .collection(workStation.workStation)
    .get()
    .then(querySnapshot => {
     

      querySnapshot.forEach(documentSnapshot => {
        console.log(documentSnapshot.data());
        formValues.push(documentSnapshot.data());

      });
    });
     setUpdateSubStation(formValues);
  }

  const updateCount = (props) =>{
    console.log(props);
    navigation.navigate("UpdateCount",{model:props,workStation:workStation.workStation});

  }

  return (
    <NativeBaseProvider>
      <Center mt={10} flex={1} px="3">
      <Container>
        <ScrollView>
      <Text>Select Substation</Text>
      {
        updateSubStation.map((element,index)=>(
          <Button minWidth="200" mt={5}s key={index} onPress={(e)=>{updateCount(element.model)}}>{element.model}</Button>
        ))
      }
      <Button mt={5} onPress={() => navigation.goBack()} >Go Back</Button>
      </ScrollView>
    </Container>
      </Center>
    </NativeBaseProvider>
  );
};
export default SubStationPage;
