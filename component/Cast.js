import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'

export default function Cast({ cast, navigation }) {
  let personName = 'Keanu Reevs';
  let CharacterName = 'John Wick';
  return (
    <View className="my-6">
      <Text className="mx-4 mb-5 text-lg text-white">Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {cast && cast.map((person, index) => {
          return (
            <TouchableOpacity
              key={index}
              className="items-center mr-4"
              onPress={()=> navigation.navigate('Person',person)}
            >
              <View className="items-center w-20 h-20 overflow-hidden border rounded-full border-neutral-500">
                <Image
                  className="w-20 h-24 rounded-2xl"
                  source={require('../assets/CastPerson1.png')}
                />
              </View>
              <Text className="mt-1 text-xs text-white">
                {
                  CharacterName.length > 10 ? CharacterName.slice(0, 10) + '...' : CharacterName
                }
              </Text>
              <Text className="mt-1 text-xs text-neutral-400">
                {
                  personName.length > 10 ? personName.slice(0, 10) + '...' : personName
                }
              </Text>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    </View>
  )
}