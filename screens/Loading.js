import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';

var { width, height } = Dimensions.get('window');

export default function Loading() {
  return (
    <View style={{ height: height, width: width }} className="flex-row items-center justify-center ">
      <Progress.CircleSnail thickness={12} size={160}  color={'#eab308'}/>
    </View>
  )
}