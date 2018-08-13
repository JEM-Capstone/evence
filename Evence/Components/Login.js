import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { AuthSession, WebBrowser } from 'expo'
import axios from 'axios'

const LI_APP_ID = '867abnxmxsh4a0'
const LI_APP_SECRET = 'R5xYPXLjHE6BVNBj'
// this is something we make up & is supposed to be "hard to guess" - See the following under Step 2 and look for the parameters table
// https://developer.linkedin.com/docs/oauth2
const LI_APP_STATE = 'HsdHSD89SAD3'

export default class Login extends React.Component {
  state = {
    result: null,
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

  handleOAuthLogin = async () => {
    // // gets the url to direct back to the app after any request to linkedin
    let redirectUrl = AuthSession.getRedirectUrl()
    let authUrl = `http://172.17.20.3:8080/auth/linkedin`

    WebBrowser.openAuthSessionAsync(authUrl)



    // await this.getAuthCode(redirectUrl)
    //
    // // this check gaurds against CSRF attacks
    // if (this.state.result.params.state !== LI_APP_STATE) {
    //   // this should be a more useful message and also throw a HTTP 401 error
    //   console.log('Not Authorized!')
    // } else {
    //   await this.getAccessToken(redirectUrl)
    // }

    // make an api call with our auth code
    // this should get the user an access Token
    // await axios.post(apiCall, {
    //   accessCode: this.state.result.params.code
    // })
  }

  // Get an auth code for LinkedIn
  getAuthCode = async (redirectUrl) => {
    // make a browser request to get an Auth Code from LinkedIn
    // The auth code is necessary to receive an access token
    let result = await AuthSession.startAsync({
      authUrl:
      `https://www.linkedin.com/oauth/v2/authorization` +
      `?response_type=code` +
      `&client_id=${LI_APP_ID}` +
      `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
      `&state=${LI_APP_STATE}`,
    })
    // save the data we get back, including the auth code
    await this.setState({ result })
    // console.log('here is my state', this.state.result.params.code)
  }

  // Get an access Token from linkedin
  getAccessToken = async (redirectUrl) => {

    // Get the actual access token from LinkedIn
    // let accessTokenResponse = await AuthSession.startAsync({
    //   authUrl:
    //   `https://www.linkedin.com/oauth/v2/accessToken` +
    //   `?grant_type=authorization_code` +
    //   `&code=${this.state.result.params.code}` +
    //   `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
    //   `&client_id=${LI_APP_ID}` +
    //   `&client_secret=${LI_APP_SECRET}`
    // })

    let apiCall = 'http://localhost:8080/auth/linkedin'
    let getTokenUrl =
      `https://www.linkedin.com/oauth/v2/accessToken` +
      `?grant_type=authorization_code` +
      `&code=${this.state.result.params.code}` +
      `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
      `&client_id=${LI_APP_ID}` +
      `&client_secret=${LI_APP_SECRET}`

    // let res = await axios.post(getTokenUrl)
    try {
      let res = await axios.get('http://localhost:8080/auth/linkedin', {
        code: this.state.result.params.code
      })
      console.log('here is my axios post response', res)

    } catch (err) {
      console.log(err)
    }


    // await axios.post('http://localhost:8080/auth/linkedin')

    // console.log('accessTokenResponse',accessTokenResponse)
    // console.log('accessTokenResponse', accessTokenResponse)
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
