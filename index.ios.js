import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Animated, Easing, TouchableWithoutFeedback } from 'react-native';

export default class animation extends Component {
  constructor(props) {
    super(props);
    this.handlePressIn = this.handlePressIn.bind(this);
    this.handlePressOut = this.handlePressOut.bind(this);
  }

  componentWillMount() {
      this.animatedValue = new Animated.Value(100);
      this.pressAnimatedValue = new Animated.Value(1);
  }

  componentDidMount() {
    Animated.timing(this.animatedValue, {
      toValue: 150,
      duration: 1000,
      easing: Easing.bounce
    }).start()
  }

  handlePressIn() {
    Animated.spring(this.pressAnimatedValue, {
      toValue: 0.5
    }).start()
  }

  handlePressOut() {
    Animated.spring(this.pressAnimatedValue, {
      toValue: 1,
      friction: 3,
      tension: 40
    }).start();
  }

  render() {
    const animatedStyle = {height: this.animatedValue};
    const pressAnimatedStyle = {
      transform: [{scale: this.pressAnimatedValue}]
    };

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.box, animatedStyle]} />
        <TouchableWithoutFeedback
          onPressIn={this.handlePressIn}
          onPressOut={this.handlePressOut}
        >
          <Animated.View style={[styles.button, pressAnimatedStyle]}>
            <Text style={styles.text}>Press me</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  box: {
    backgroundColor: 'black',
    width: 100,
    height: 100
  },
  button: {
    backgroundColor: 'black',
    width: 100,
    height: 50
  },
  text: {
    color: 'white',
    fontSize: 18
  }
});

AppRegistry.registerComponent('animation', () => animation);
