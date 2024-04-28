import { View, Text, Image, TouchableOpacity, Dimensions, TextInput, ScrollView, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import Loading from '../screens/Loading';

var { width, height } = Dimensions.get('window');

export default function SearchScreen() {
  const [isFavorite, toogleFavorite] = useState(false);
  const [results, setresults] = useState([1,2,3,4,5]);
  const navigation = useNavigation();
  const MovieName = 'Stranger Things';
  const [loading, setloading] = useState(true);

  return (
    <View className="flex-1 bg-neutral-900">
      <View className="flex-row items-center justify-between mx-4 mt-[6vh] mb-3 border rounded-full border-neutral-500">
        <TextInput
          placeholder='Search Movie '
          placeholderTextColor={'lightgray'}
          className="flex-1 pb-1 pl-6 text-base font-semibold tracking-wider text-white placeholder:text-lg" />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-3 m-1 rounded-full bg-neutral-500">
          <XMarkIcon color={'white'} strokeWidth={2} size={25} />
        </TouchableOpacity>
      </View>
      {/* results */}
      {
        loading? (
          
            results.length > 0 ?
              (
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 15 }}
                  className="space-y-3"
                >
                  <Text className="ml-1 font-semibold text-white">Results ({results.length})</Text>
                  <View className="flex-row flex-wrap justify-between">
                    {
                      results.map((item, index) => {
                        return (
                          <TouchableWithoutFeedback
                            key={index}
                            onPress={() => navigation.navigate('Movie', item)}
                          >
                            <View className="mb-4 space-y-2">
                              <Image className="rounded-3xl" source={require('../assets/Movieposter2.png')} style={{ width: width * 0.44, height: height * 0.3 }} />
                              <Text className="ml-1 text-center text-neutral-300">
                                {
                                  MovieName.length > 22 ? MovieName.slice(0, 22) + '...' : MovieName
                                }
                              </Text>
                            </View>
                          </TouchableWithoutFeedback>
                        )
                      })
                    }
                  </View>
                </ScrollView>
              ) :
              (
              <View className="flex-row justify-center">
                <Image source={require('../assets/NoSearchResults.png')}
                className="h-72 w-96 mt-[8vh]"/>
              </View>
            )
        ):
            (
              <Loading/>
          
        )
      }
    </View>
  )
}