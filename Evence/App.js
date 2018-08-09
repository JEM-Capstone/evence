import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from 'react-navigation'
import expo from 'expo'
import { Test } from './Components/index'

const RootStack = createStackNavigator(
  {
    Test: Test,
    // Home: Home,
  },
  {
    initialRouteName: 'Test'
  }
)

class App extends React.Component {


  render() {
    console.log('this is the test object', Test)
    return (
      <RootStack />
    )
  }
}

export default App

// export default class App extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Open up App.js to start working on your app!</Text>
//         <Text>Changes you make will automatically reload.</Text>
//         <Text>Shake your phone to open the developer menu.</Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
