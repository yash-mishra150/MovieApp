import { View, Text, Image, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Dimensions } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

var { width, height } = Dimensions.get('window');

export default function MovieList({ title, data, hideSeeAll }) {
  const navigation = useNavigation();
  let movieName = "Stranger Things";
  return (
    <View className="mb-8 space-y-4">
      <View className="flex-row items-center justify-between mx-4">
        <Text className="text-xl text-white">{title}</Text>
        {!hideSeeAll &&
          <TouchableOpacity>
            <Text className="text-[#eab308] text-lg">See All</Text>
          </TouchableOpacity>
        }
      </View>
      {/* movie row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}

      >
        {
          data.map((item, index) => {
            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigation.push('Movie', item)}
              >
                <View className="items-center mr-4 space-y-1">
                  <Image
                    source={require('../assets/Movieposter2.png')}
                    className="rounded-3xl"
                    style={{ width: width * 0.33, height: height * 0.22 }}
                  />
                  <Text className="text-neutral-300">
                    {
                      movieName.length > 14 ? movieName.slice(0, 14) + '...' : movieName
                    }
                  </Text>
                </View>

              </TouchableWithoutFeedback>
            )
          })
        }
      </ScrollView>


    </View>
  )
}