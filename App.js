import React from 'react';
import {StyleSheet, Text, StatusBar, View, Platform} from 'react-native';
import AddEntry from './components/AddEntry';
import History from './components/History'
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers';
import {white, purple} from './utils/colors';
import {FontAwesome, Ionicons} from '@expo/vector-icons';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import Constants from 'expo-constants';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

function AppStatusBar({
  backgroundColor,
  ...props
}) {
  return (
    <View
      style={{
      backgroundColor,
      height: Constants.statusBarHeight
    }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )

}
const tabBarOptions = {
  activeTintColor: Platform.OS === "ios"
    ? purple
    : white,
  style: {
    height: 80,
    showLabel: false,
    backgroundColor: Platform.OS === "ios"
      ? white
      : purple,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 6,
    shadowOpacity: 1
  }
}

export default function App() {
  return (
    <Provider store={createStore(reducer)}>
      <NavigationContainer>
        <View style={{
          flex: 1
        }}>
          <AppStatusBar backgroundColor={purple} barStyle='light-content'/>

          <Tab.Navigator tabBarOptions={tabBarOptions}>
            <Tab.Screen
              options={{
              tabBarLabel: 'History',
              tabBarIcon: ({tintColor}) =>< Ionicons name = "ios-bookmarks" size = {
                30
              }
              color = {
                tintColor
              } />
            }}
              name="History"
              component={History}/>
            <Tab.Screen
              options={{
              tabBarLabel: 'Add Entry',
              tabBarIcon: ({tintColor}) =>< FontAwesome name = "plus-square" size = {
                30
              }
              color = {
                tintColor
              } />
            }}
              component={AddEntry}name="Add Entry"/>
          </Tab.Navigator>
        </View>
      </NavigationContainer>
    </Provider>
  )
}