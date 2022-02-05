import React, { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { Picker } from '@react-native-picker/picker';
import icon from "../util/logo.jpg";
import SBar from '../components/StatusBar';
import Image from "../components/Image";
import { StyleSheet } from 'react-native';
import { PRIMARY_COLOR, BLACK, WHITE } from '../util/constants';
import { Center, NativeBaseProvider, FormControl, Container, Button, StatusBar, Heading, Box, Text, } from 'native-base';
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
    console.log(formValues);
    setLoading(false);
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

  const selectWorkStation = (props) => {
    setWorkStation(props);
  }
  return (
    <NativeBaseProvider>
      <Center flex={1} bg={BLACK}>
        <SBar />
        <Image />
        <Center flex={1} px="3">
          <FormControl mb={10} isRequired isInvalid>
            <FormControl.Label><Heading color={WHITE}>Choose Workstation </Heading></FormControl.Label>
            <Box borderRadius="md" width={80} borderWidth={2} borderColor={PRIMARY_COLOR}>
              <Picker style={{ color: WHITE }}
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
            </Box>
            <Text color={"#8e0000"}>{error}</Text>
          </FormControl>
          <Center>
            <Button mt={5} minWidth="200"
              minHeight={12}
              onPress={valueSelected}
              bg={PRIMARY_COLOR}>Next</Button></Center>

        </Center>
      </Center>
    </NativeBaseProvider>
  );
};
export default SelectWorkStationPage;
