import React from 'react';
import { StyleSheet, ProgressBarAndroid, Image, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function Home() {

  return (

    <View style={styles.container}>

        <NavigationContainer>

            <Stack.Navigator>

                <Stack.Screen name="Home" component={Home} options={{title: 'Welcome'}} />

            </Stack.Navigator>

        </NavigationContainer>

      <Text>This is Home Page....</Text>

    </View>

  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
