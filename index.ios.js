import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Animated, Easing, TouchableWithoutFeedback, PanResponder } from 'react-native';

export default class animation extends Component {
  constructor(props) {
    super(props);
    this.handlePressIn = this.handlePressIn.bind(this);
    this.handlePressOut = this.handlePressOut.bind(this);
  }

  componentWillMount() {
      this.animatedValue = new Animated.Value(100);
      this.pressAnimatedValue = new Animated.Value(1);

      this.dragAnimatedValue = new Animated.ValueXY();
      this._value = {x: 0, y: 0};
      this.dragAnimatedValue.addListener(value => {this._value = value});
      this.panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderGrant: (e, gestureState) => {
          this.dragAnimatedValue.setOffset({
            x: this._value.x,
            y: this._value.y
          });
          this.dragAnimatedValue.setValue({x: 0, y: 0});
        },
        onPanResponderMove: Animated.event([
          null, {dx: this.dragAnimatedValue.x, dy: this.dragAnimatedValue.y}
        ]),
        onPanResponderRelease: (e, gestureState) => {
          this.dragAnimatedValue.flattenOffset();
          Animated.decay(this.dragAnimatedValue, {
            deceleration: 0.997,
            velocity: {x: gestureState.vx, y: gestureState.vy}
          }).start();
        }
      });
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

    const dragAnimatedStyle = {
      transform: this.dragAnimatedValue.getTranslateTransform()
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

        <Animated.View
          style={[styles.box, dragAnimatedStyle]}
          {...this.panResponder.panHandlers}
        >
          <Text style={styles.text}>Dray me</Text>
        </Animated.View>
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
    height: 100,
    marginBottom: 100
  },
  button: {
    backgroundColor: 'black',
    width: 100,
    height: 50,
    marginBottom: 100
  },
  text: {
    color: 'white',
    fontSize: 18
  }
});

AppRegistry.registerComponent('animation', () => animation);
