import { View, Text, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { useNavigation, useRoute } from '@react-navigation/native';
import MovieList from '../component/MovieList';
import Loading from './Loading';
import { fetchPersonDetails, fetchPersonMovies } from '../api/moviedb';
import {Images500} from '../api/moviedb';
var { width, height } = Dimensions.get('window');
export default function PersonScreen() {
  const { params: item} = useRoute();
  const [isFavorite, toogleFavorite] = useState(false);
  const navigation = useNavigation();
  const [personDetails, setPersonDetails] = useState({});
  const [personMOvies, setPersonmovies] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(()=>{
    setloading(true);
    // console.log(item);
    getPersonDetails(item.id);
    getPersonMovies(item.id);
  },[item])

  const getPersonDetails = async(id) => {
    const data = await fetchPersonDetails(id);
    // console.log(data);
    if(data) setPersonDetails(data)
    setloading(false);
  }

  const getPersonMovies = async(id) => {
    const data = await fetchPersonMovies(id);
    console.log(data.cast);
    if(data && data.cast) setPersonmovies(data.cast)
    setloading(false);
  }
  return (
    <ScrollView className="flex-1 bg-neutral-900" contentContainerStyle={{ paddingBottom: 20 }}>
      {/* Back Button and heart icon */}
      <View className="w-full">
        <View className="z-20 flex-row items-center justify-between w-full px-4 mt-[5vh] mb-[1vh]">
          <TouchableOpacity className="p-1 rounded-xl bg-[#eab308]" onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size="28" color="white" strokeWidth={2.5} />
          </TouchableOpacity>
          <TouchableOpacity className="p-1 rounded-xl" onPress={() => toogleFavorite(!isFavorite)}>
            <HeartIcon size="35" color={isFavorite ? 'red' : 'white'} strokeWidth={2.5} />
          </TouchableOpacity>
        </View>
        <View>
          {
            !loading ?
              (
                <View>
                  <View>
                    <View className="flex-row justify-center mt-[1.5vh] ">
                      <View className="items-center overflow-hidden border-2 rounded-full h-72 w-72 border-neutral-500 ">
                        <Image
                          // source={require('../assets/CastPerson1.png')}
                          source={{uri: Images500(personDetails.profile_path)}}
                          style={{ height: height * 0.4, width: width * 0.64 }}
                        />
                      </View>
                    </View>
                  </View>
                  <View className="mt-6">
                    <Text className="text-3xl font-bold text-center text-white">
                      {personDetails?.name}
                    </Text>
                    <Text className="text-base text-center text-neutral-500">
                      {personDetails?.place_of_birth}
                    </Text>
                  </View>
                  <View className="flex-row items-center justify-between p-3 mx-3 mt-6 rounded-full bg-neutral-700 ">
                    <View className="items-center px-2 border-r-2 border-r-neutral-400">
                      <Text className="font-semibold text-white">
                        Gender
                      </Text>
                      <Text className="text-sm text-neutral-300">
                        {personDetails?.gender==1 ? 'Female' : 'Male'}
                      </Text>
                    </View>
                    <View className="items-center px-2 border-r-2 border-r-neutral-400">
                      <Text className="font-semibold text-white">
                        Birthday
                      </Text>
                      <Text className="text-sm text-neutral-300">
                        {personDetails?.birthday}
                      </Text>
                    </View>
                    <View className="items-center px-2 border-r-2 border-r-neutral-400">
                      <Text className="font-semibold text-white">
                        Known for
                      </Text>
                      <Text className="text-sm text-neutral-300">
                        {personDetails?.known_for_department}
                      </Text>
                    </View>
                    <View className="items-center px-2 ">
                      <Text className="font-semibold text-white">
                        Popularity
                      </Text>
                      <Text className="text-sm text-neutral-300">
                        {personDetails?.popularity}
                      </Text>
                    </View>
                  </View>
                  <View className="mx-4 my-6 space-y-2">
                    <Text className="text-lg text-white">Biography</Text>
                    <Text className="tracking-wide text-neutral-400">
                      {personDetails?.biography}
                    </Text>
                  </View>
                  <MovieList title="Movies" hideSeeAll="true" data={personMOvies} />
                </View>
              ) : (
                <Loading />
              )
          }
        </View>
      </View>
    </ScrollView>
  )
}