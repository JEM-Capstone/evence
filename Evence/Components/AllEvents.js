import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import {
  StyleSheet, Text, View, Button,
} from 'react-native';
import FetchEvent from './FetchEvent';


const client = new ApolloClient({
  uri: `http://localhost:8080/graphql`,
});

class AllEvents extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          <Text>All Events?</Text>
          <FetchEvent />
        </View>
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `#fff`,
    alignItems: `center`,
    justifyContent: `center`,
  },
});

export default AllEvents;
