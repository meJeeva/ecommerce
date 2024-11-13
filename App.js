import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import StackScreen from './src/navigation/StackScreen'
import BottomTabScreen from './src/navigation/BottomTabScreen'

const App = () => {
  return (
    <NavigationContainer>
      <BottomTabScreen />
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})