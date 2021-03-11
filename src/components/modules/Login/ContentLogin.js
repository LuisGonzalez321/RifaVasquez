import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Svg, {Ellipse} from 'react-native-svg';

const ContentLogin = (props) => {
  return (
    <>
      <View style={styles.rect2}>
        <Text style={styles.loginAdministrador}>{props.title}</Text>
        <View style={styles.rect3}>
          <View style={styles.ellipseStack}>
            <Svg viewBox="0 0 200.46 200" style={styles.ellipse}>
              <Ellipse
                stroke="rgba(230, 230, 230,1)"
                strokeWidth={0}
                fill="rgba(151,203,220,1)"
                cx={100}
                cy={100}
                rx={100}
                ry={100}
              />
            </Svg>
            <Image
              source={require('../../../assets/img/logo_.png')}
              resizeMode="contain"
              style={styles.image}
            />
          </View>
        </View>
      </View>
      <View style={styles.rect2Filler}></View>
    </>
  );
};

const styles = StyleSheet.create({
  rect2: {
    height: 303,
    backgroundColor: 'rgba(255,255,255,1)',
    justifyContent: 'space-between',
    marginTop: 67,
  },
  loginAdministrador: {
    fontFamily: 'roboto-700',
    color: 'rgba(151,203,220,1)',
    textAlign: 'center',
    fontSize: 20,
    height: 26,
    alignSelf: 'center',
  },
  rect3: {
    height: 245,
    backgroundColor: 'rgba(255,255,255,1)',
    alignSelf: 'stretch',
  },
  ellipse: {
    width: 200,
    height: 200,
    position: 'absolute',
    top: 0,
  },
  image: {
    width: 205,
    height: 39,
    position: 'absolute',
    top: 80,
    left: 0,
  },
  ellipseStack: {
    alignSelf: 'center',
    width: 205,
    height: 200,
    marginTop: 39,
  },
  rect2Filler: {
    flex: 1,
  },
});

export default ContentLogin;
