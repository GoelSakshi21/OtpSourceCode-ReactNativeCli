import React from 'react';
// import '@okta/okta-auth-js/polyfill';
import './okta/Globals';
import 'react-native-get-random-values';
import PolyfillCrypto from 'react-native-webview-crypto';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import OktaAuthRN from './okta/OktaAuthRN';
import Config from './okta/Config';
require('fast-text-encoding');
// window.location = {protocol: 'https:'};
// document = {domain: 'mckdotcomdev-idp.okta.com'};
// console.log('@@@@',Uint8Array);
// console.log(typeof webcrypto !== 'undefined');
const CustomButton = ({title, onClick}) => {
  return (
    <TouchableOpacity onPress={onClick}>
      <Text style={styles.button}>{title}</Text>
    </TouchableOpacity>
  );
};

const sendOtp = async () => {
    const oktaAuthRN = new OktaAuthRN(Config);
    await oktaAuthRN.initialAuthClient();
    const transaction = await oktaAuthRN.oktaAuth.idx.authenticate({
      username: 'tom1@yopmail.com',
      authenticator: 'okta_email',
    });

    oktaAuthRN.oktaAuth.idx
      .proceed({
        authenticator: {
          methodType: 'email',
          id: transaction?.nextStep?.authenticator?.id,
        },
      })
      .then(res => {
        console.log('proceed response - ' + JSON.stringify(res));
      })
      .catch(err => {
        console.log('proceed error - ' + JSON.stringify(err));
      });
  };

const RenderView = () => {
  return (
    <View style={styles.root}>
      <PolyfillCrypto />
      <View style={styles.root}>
        <TextInput placeholder="Enter email" style={styles.textInput} />
        <CustomButton title="Send OTP" onClick={sendOtp} />
        <TextInput placeholder="Enter OTP" style={styles.textInput} />
        <CustomButton title="Verify OTP" onClick={sendOtp} />
      </View>
    </View>
  );
};

const App = initialProps => {
  return RenderView();
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    margin: 10,
  },

  textInput: {
    width: '100%',
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
  },

  button: {
    width: '100%',
    height: 50,
    backgroundColor: 'blue',
    marginTop: 10,
    padding: 10,
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
