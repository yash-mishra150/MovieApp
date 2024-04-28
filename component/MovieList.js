import { View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function MovieList({title, data}) {
    const navigation = useNavigation();
  return (
    <View className="mb-8 space-y-4">
      <View className="flex-row items-center justify-between mx-4">
        <Text className="text-xl text-white">{title}</Text>
        <TouchableOpacity>
            <Text className="text-[#eab308] text-lg">See All</Text>
            {/* movie row */}
            <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 15}}
            
            >
                {data.map((item, index) => {
                    <TouchableWithoutFeedback
                        key={index}
                        onPress={()=> navigation.navigate('Movie', item)}
                    >
                        <Text>MovieName</Text>
                    </TouchableWithoutFeedback>
                })}
            </ScrollView>
        </TouchableOpacity>
      </View>
    </View>
  )
}