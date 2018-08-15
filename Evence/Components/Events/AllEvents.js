import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Text, View, Button } from 'react-native';
import FetchAllEvents from './FetchAllEvents';
import styles from '../styles';
import { SafeAreaView } from 'react-navigation';


const client = new ApolloClient({
  uri: `http://localhost:8080/graphql`,
});

class AllEvents extends Component {
  static navigationOptions = {
    header: null, // { height: 0 },
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <SafeAreaView style={styles.container}>
          <FetchAllEvents />
        </SafeAreaView>
      </ApolloProvider>
    );
  }
}

export default AllEvents;
