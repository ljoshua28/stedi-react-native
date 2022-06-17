import {useState} from "react";
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Text } from "react-native";

async function sendText(phoneNumber){
  console.log("PhoneNumber: ",phoneNumber);
  await fetch('https://dev.stedi.me/twofactorlogin/' +phoneNumber,{
    method: 'POST',
    headers:{
      'content-type':'application/text'
    }
  });
}

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [oneTimePassword, setOneTimePassword] = useState(null);

  return (
    <SafeAreaView style={styles.margin}>
      <TextInput
        style={styles.input}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholderTextColor={'#196393'}
        placeholder="123-456-7890"
      />
      <TextInput
        style={styles.input}
        onChangeText={setOneTimePassword}
        value={oneTimePassword}
        placeholder="1234"
        placeholderTextColor={'#196393'}
        keyboardType="numeric"
        secureTextEntry={true}
      />
      <TouchableOpacity
      style={styles.button}
      onPress={()=>{
        sendText(phoneNumber);
      }}
      >
      <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
      style={styles.button}
      onPress={()=>{
        sendText(phoneNumber);
      }}
      >
      <Text>Help</Text>
      </TouchableOpacity>


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  margin:{
    marginTop:200
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  }
});

export default Login;