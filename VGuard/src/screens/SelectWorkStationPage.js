import React, { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import {Picker} from '@react-native-picker/picker';
import icon from "../util/icon.jpg";
import { Center, NativeBaseProvider, Image, FormControl, Container, Button, StatusBar, Heading, } from 'native-base';
const SelectWorkStationPage = ({ navigation }) => {
  const [workStation, setWorkStation] = React.useState("");
  const [updateWorkStation, setUpdateWorkStation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const valueSelected = () => {
    if (workStation.length === 0) {

      setError(
        "Please make a selection!"
      );
    }
    else {
      setError(null);
      navigation.navigate("LandScreen", { workStation: workStation })
    }
  }
  useEffect(() => {
    GetData();
  }, [])
  const GetData = async () => {
    const formValues = [];
    await firestore()
      .collection('workstation')
      .get()
      .then(querySnapshot => {


        querySnapshot.forEach(documentSnapshot => {
          formValues.push(documentSnapshot.data().workstation);

        });
      });
    setUpdateWorkStation(formValues);
    setLoading(false);
  }

  if (loading) {
    return (
      <NativeBaseProvider>
        <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#ffffff"
        translucent={false}
        networkActivityIndicatorVisible={true}
      />
      <Center>
        <Heading>Loading</Heading>
        </Center>
      </NativeBaseProvider>
    )
  }

  const selectWorkStation = (props) => {
    setWorkStation(props);
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
      <Center>
      <Image
       size={250}
       resizeMode="center"
      source={icon}
      alt="Alternate Text"
    />
      </Center>
      <Center flex={1} px="3">
      
        <Container>
          <FormControl isRequired isInvalid>
            <FormControl.Label><Heading>Choose Workstation </Heading></FormControl.Label>
            <Picker
              selectedValue={workStation}
              onValueChange={(itemValue, itemIndex) =>
                selectWorkStation(itemValue)
              }>
                <Picker.Item label="" value="" />
              {
                updateWorkStation.map((element, index) => (
                  <Picker.Item key={index} label={element} value={element} />
                  
                ))
              }
            </Picker>
            {error}
          </FormControl>

          <Button mt={5} minWidth="200"
            minHeight={12}
            onPress={valueSelected}
            colorScheme="success">Next</Button>
        </Container>
      </Center>
    </NativeBaseProvider>
  );
};
export default SelectWorkStationPage;
