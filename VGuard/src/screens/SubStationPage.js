import React, { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { Text, Center, NativeBaseProvider, Container,Box , Pressable, Button, ScrollView, StatusBar,Heading } from 'native-base';
import SBar from '../components/StatusBar';
// import icon from "../util/icon.jpg";
import Image from "../components/Image";
import icon from "../util/logo.jpg";
const SubStationPage = ({ navigation, route }) => {
  const [updateSubStation, setUpdateSubStation] = useState([]);
  const [loading, setLoading] = useState(true);
  const workStation = route.params;
  useEffect(() => {
    GetData();
  }, [])

  const GetData = async () => {
    var today = new Date();
    let month = today.getMonth() + 1
    let tod = today.getDate();
    if(tod<10){
      tod = "0"+tod;
    }
    if (month < 10) {
      month = "0" + month;
    }
    var collection = today.getFullYear() + "-" + month + "-" + tod;
    const formValues = [];
    await firestore()
      .collection(collection).where("workstation","==",workStation.workStation)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          formValues.push(documentSnapshot.data());

        });
      });
    setUpdateSubStation(formValues);
    setLoading(false);
  }
  const updateCount = (props) => {
    navigation.navigate("UpdateCount", { model: props, workStation: workStation.workStation });

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
  if(updateSubStation.length==0){
    return (
      <NativeBaseProvider>
       <SBar />
      <Center>
        <Heading>No Work Found in the WorkStation</Heading>
        <Button mt={5} onPress={() => navigation.goBack()} >Go Back</Button>

        </Center>
      </NativeBaseProvider>
    )
  }

  return (
    <NativeBaseProvider >
     <SBar />
      <Image />
      <Center mt={10} flex={1} px="3">
        <Container>
          <ScrollView>
            <Text>Select Substation</Text>
            {
              updateSubStation.map((element, index) => (
                <Pressable  
                key={index} 
                onPress={(e) => { updateCount(element.substation) }}>
                <Box
                minWidth="200"
                mt={5}
                bg="primary.500"
                p="2"
                
                borderRadius={5}
                _text={{
                  fontSize: "md",
                  fontWeight: "bold",
                  color: "white",
                  textAlign:"center",
                }}
                
              >
                
               {element.substation}
               {"Planned Count : "+element.count}
               {"Planned Time : "+element.time+" hrs"}
               
              </Box></Pressable>
                // <Button minWidth="200" mt={5} s key={index} onPress={(e) => { updateCount(element.substation) }}>{element.substation}</Button>
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
