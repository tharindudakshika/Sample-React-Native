import React, {useRef, useState, useEffect} from 'react';
import { StyleSheet, ProgressBarAndroid, Image, Text, View, Dimensions,Animated } from 'react-native';
import Constants from 'expo-constants';
import {NavigationContainer,useNavigation} from '@react-navigation/native';

export default function App() {

  function useInterval(callback, delay) {

    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => {

      savedCallback.current = callback;

    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {

      function tick() {

        savedCallback.current();

      }

      if (delay !== null) {

        let id = setInterval(tick, delay);

        return () => clearInterval(id);

      }

    }, [delay]);

  }

  let animation = useRef(new Animated.Value(0));

  const [progress, setProgress] = useState(0);

  useInterval(() => {

    if(progress < 100) {

      setProgress(progress + 20);

    }

    if(progress === 100) {

      //console.log("foo");
      const navigation = useNavigation();
      navigation.navigate('Home/Home');

    }
    
  }, 1000);

  useEffect(() => {

    Animated.timing(animation.current, {

      toValue: progress,

      duration: 500

    }).start();

  },[progress]);

  const width = animation.current.interpolate({

    inputRange: [0, 100],

    outputRange: ["0%", "100%"],

    extrapolate: "clamp"

  });
 
  return (

    <View style={styles.container}>

        <Image
          style={styles.tinyLogo}
          source={require('./assets/logo.png')}
        />

        <View style={styles.progressBar}>

          <Animated.View style={[StyleSheet.absoluteFill], {backgroundColor: "red", width }}/>
          
        </View>

        <Text style={styles.progressBarvalue}>
          
          {`${progress}%`}

        </Text> 

        <View style={styles.grid}>

          <View style={[styles.item, styles.item1]} />

          <View style={styles.item} />

          <View style={styles.item} />

        </View>

      </View>

  );

}

const win = Dimensions.get('window');

const ratio = win.width/1000;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  tinyLogo: {
    width: win.width,
    height: 180 * ratio,
  },
  progressBar: {
    flexDirection: 'row',
    height: 5,
    width: '50%',
    backgroundColor: 'white',
    borderColor: 'red',
    borderWidth: 1,
    position: 'absolute',
    bottom: 20,
  },
  progressBarvalue: {
    display: 'none',
  },
  grid: {
    flex: 1, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'none',
  },
  item: {
    width: 50, 
    height: 50,
    backgroundColor: 'red',
  },
  item1: {
    backgroundColor: 'green',
  },
});
