import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { AuthSession } from 'expo';

const LI_APP_ID = '867abnxmxsh4a0';
// this is something we make up & is supposed to be "hard to guess" - See the following under Step 2 and look for the parameters table
// https://developer.linkedin.com/docs/oauth2
const LI_APP_STATE = 'HsdHSD89SAD3';

export default class Login extends React.Component {
  state = {
    result: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Open LinkedIn Auth" onPress={this.handleOAuthLogin} />
        {this.state.result ? (
          <Text>{JSON.stringify(this.state.result)}</Text>
        ) : null}
      </View>
    )
  }

  handleOAuthLogin = async () => {
    let redirectUrl = AuthSession.getRedirectUrl()
    let result = await AuthSession.startAsync({
      authUrl:
      `https://www.linkedin.com/oauth/v2/authorization` +
      `?response_type=code` +
      `&client_id=${LI_APP_ID}` +
      `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
      `&state=${LI_APP_STATE}`,
    })
    await this.setState({ result })
    console.log('here is my state', this.state)
    if (this.state.result.params.state === LI_APP_STATE) console.log('so its true!')
  }



}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


//   authUrl:
//   `https://www.linkedin.com/uas/oauth2/authorization` +
//   `?client_id=${LI_APP_ID}` +
//   `&redirect_uri=${encodeURIComponent(redirectUrl)}`,



// `https://www.facebook.com/v2.8/dialog/oauth?response_type=token` +
// `&client_id=${LI_APP_ID}` +
// `&redirect_uri=${encodeURIComponent(redirectUrl)}`,


// `https://www.linkedin.com/uas/oauth2/authorization?client_id=759dczzx23nyic&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Flinkedin%2Fcallback&response_type=code&scope=r_basicprofile+r_emailaddress&state=8da572e31a8e66e6b1de54acddd14937d976ed06d7ed3217&client_id=*`
