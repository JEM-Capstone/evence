import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import {
  StyleSheet, Text, View, Button,
} from 'react-native';


const getEventQuery = gql`
  {
    event (id: 1) {
      eventName
      date
      time
      eventGroup
      eventCity
      description
    }
  }
`;


class FetchEvent extends Component {
  displayEvent() {
    const { data } = this.props;
    if (data.loading) { // this loading prop is provided by apollo
      return (<Text>Loading Event...</Text>);
    }
    const {
      eventName, date, time, eventGroup, eventCity, description,
    } = this.props.data.event;
    return (
      <View style={styles.container}>
        <Text>{eventName}</Text>
        <Text>{`Date: ${date} | Time: ${time}`}</Text>
      </View>
    );
  }

  render() {
    return (
      this.displayEvent()
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

// this stores the event data within the component's props
export default graphql(getEventQuery)(FetchEvent);
