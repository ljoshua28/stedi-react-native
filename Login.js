import {useState} from "react";
import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Text } from "react-native";

async function sendText(phoneNumber){
  console.log("PhoneNumber: ",phoneNumber);
  const tokenResponse = await fetch('https://dev.stedi.me/twofactorlogin/' +phoneNumber,{
    method: 'POST',
    headers:{
      'content-type':'application/text'
    }
  });
  const tokenResponseText = await tokenResponse.text()
}



const getToken = async ({phoneNumber, oneTimePassword, setUserLoggedIn, setUserEmail}) =>{
  const tokenResponse = await fetch('https://dev.stedi.me/twofactorlogin',{
    method: 'POST',
    body:JSON.stringify({oneTimePassword, phoneNumber}),
    headers: {
      'content-type':'application/json'

    }
  });

  const responseCode = tokenResponse.status;//200 means logged in successfully
  console.log("Response Status Code", responseCode);
  if(responseCode==200){
    const token = await tokenResponse.text();
    console.log(token);
    const emailResponse = await fetch('https://dev.stedi.me/validate/'+token);
    const tokenEmail = await emailResponse.text();
    console.log('tokenEmail: '+ tokenEmail);
    setUserEmail(tokenEmail);
    setUserLoggedIn(true);
  }
  const tokenResponseString = await tokenResponse.text();
}

const Login = (props) => {
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
      <Text>Send Text</Text>
      </TouchableOpacity>

      <TouchableOpacity
      style={styles.button}
      onPress={()=>{
        getToken({phoneNumber, oneTimePassword, setUserLoggedIn:props.setUserLoggedIn, setUserEmail:props.setUserEmail});        
      }}

      >
      <Text>Login</Text>
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