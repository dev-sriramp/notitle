import React, { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  Center,
  NativeBaseProvider,
  CheckIcon,
  Select,
  FormControl,
  Container,
  Button,
  WarningOutlineIcon,
  Text,
  ScrollView,


} from 'native-base';
const SelectWorkStationPage = ({ navigation }) => {
  const [workStation, setWorkStation] = React.useState("");
  const [updateWorkStation, setUpdateWorkStation] = useState([]);
  const [error, setError] = useState(null);
  const valueSelected = () => {
    console.log(workStation.length)
    if (workStation.length === 0) {
      
      setError(<FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        Please make a selection!
      </FormControl.ErrorMessage>);
      console.log(updateWorkStation);
    }
    else {
      setError(null);
      navigation.navigate("LandScreen",{workStation:workStation})
    }
  }
  useEffect(() => {
    GetData();
  },[])

  const GetData = async()=>{
    const formValues = [];
    await firestore()
    .collection('workstation')
    .get()
    .then(querySnapshot => {
     

      querySnapshot.forEach(documentSnapshot => {
        console.log(documentSnapshot.data().workstation);
        formValues.push(documentSnapshot.data().workstation);

      });
    });
     setUpdateWorkStation(formValues);
  }
 
 
  
  const selectWorkStation = (props) => {
    setWorkStation(props);
    console.log(updateWorkStation)

  }
  return (
    <NativeBaseProvider>
      {/* <ScrollView> */}
      <Center flex={1} px="3">
        <Container>
          <FormControl isRequired isInvalid>
            <FormControl.Label>Choose Workstation</FormControl.Label>
            <Select
              minWidth="200"
              selectedValue={workStation}
              accessibilityLabel="Choose Workstation"
              placeholder="Choose Workstation"
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size={5} />,
              }}
              mt="1"
              mb="1"
              onValueChange={(itemValue) => selectWorkStation(itemValue)}
            >
             {
               updateWorkStation.map((element,index)=>(
                <Select.Item key={index} label={element} value={element} />
               ))
             }
             
            </Select>
            {error}
          </FormControl>
          
          <Button minWidth="200"
            minHeight={12}
            onPress={valueSelected}
            colorScheme="success">Next</Button>
        </Container>
      </Center>
      {/* </ScrollView> */}
    </NativeBaseProvider>
  );
};
export default SelectWorkStationPage;
