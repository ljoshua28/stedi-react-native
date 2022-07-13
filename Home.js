import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Icons from './Icons.js';
import Bar  from './Bar.js';
import { clickProps } from 'react-native-web/dist/cjs/modules/forwardedProps/index.js';

const Home = (props) => {
  return (
    <View style = {{flex: 1, marginTop: 30, justifyContent: 'flext-start'}}>
      <Bar loggedInUser={props.loggedInUser}/>
      <Icons />
    </View>
  );
};

export default Home;
