import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { AuthSession, WebBrowser, Linking } from 'expo'
import axios from 'axios'

const LI_APP_ID = '867abnxmxsh4a0'
const LI_APP_SECRET = 'R5xYPXLjHE6BVNBj'
// this is something we make up & is supposed to be "hard to guess" - See the following under Step 2 and look for the parameters table
// https://developer.linkedin.com/docs/oauth2
const LI_APP_STATE = 'HsdHSD89SAD3'

export default class Login extends React.Component {
  state = {
    result: null,
    redirectData: null,
    authResult: null,
  };

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <Button title="Login with LinkedIn" onPress={this.handleOAuthLogin} />
        {this.state.result ? ( <Text>{JSON.stringify(this.state.result.type)}</Text> ) : null}
      </View>
    )
  }


  handleRedirect = async event => {
    console.log('handle redirect event', event)
    WebBrowser.dismissBrowser()
    let data = Linking.parse(event.url)
    await this.setState({ redirectData: data })
    console.log('data in handleRedirect', data)
  }

  handleOAuthLogin = async () => {
    // gets the url to direct back to the app after any request to linkedin
    // let redirectUrl = Linking.makeUrl()
    let redirectUrl = await Linking.getInitialURL()

    console.log('redirecturl',redirectUrl)
    // this should change depending on where the server is running
    let authUrl = `http://172.17.20.3:8080/auth/linkedin`

    this.addLinkingListener()

    try {
      // let authResult = WebBrowser.openAuthSessionAsync(`http://172.17.20.3:8080/auth/linkedin`, `exp://8k-xp5.veryspry.evence.exp.direct:80`)
      let authResult = await WebBrowser.openAuthSessionAsync(`http://172.17.20.3:8080/auth/linkedin`)
      await console.log('inside handleOauthLogin', authResult)
      await this.setState({ authResult })
    } catch (err) {
      console.log('A MASSIVE ERROR', err)
    }

    this.removeLinkingListener()

  }

  addLinkingListener = () => {
    console.log('add linking listener')
    Linking.addEventListener('url', this.handleRedirect)
  }

  removeLinkingListener = () => {
    console.log('remove linking listener')
    Linking.removeEventListener('url', this.handleRedirect)
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
