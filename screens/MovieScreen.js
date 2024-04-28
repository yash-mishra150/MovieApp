import { View, Text, TouchableOpacity, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ScrollView } from 'react-native';
import { SafeAreaFrameContext } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../component/Cast';
import MovieList from '../component/MovieList';
var { width, height } = Dimensions.get('window');

export default function MovieScreen() {
    const { params: item } = useRoute();
    useEffect(() => {
        // Call the api here for movie details
    })
    
    const navigation = useNavigation();
    const [isFavorite, toogleFavorite] = useState(false);
    const [cast, setcast] = useState([1,2,3,4,5]);
    const [similarMovies, setsimilarMovies] = useState([1,2,3,4]);
    let movieName = "Stranger Things";
    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            className="flex-1 bg-neutral-900"
        >
            <View className="w-full">
                <View className="absolute z-20 flex-row items-center justify-between w-full px-4 mt-[5vh] mb-[1vh]">
                    <TouchableOpacity className="p-1 rounded-xl bg-[#eab308]" onPress={() => navigation.goBack()}>
                        <ChevronLeftIcon size="28" color="white" strokeWidth={2.5} />
                    </TouchableOpacity>
                    <TouchableOpacity className="p-1 rounded-xl" onPress={() => toogleFavorite(!isFavorite)}>
                        <HeartIcon size="35" color={isFavorite ? '#eab308' : 'white'} strokeWidth={2.5} />
                    </TouchableOpacity>
                </View>
                <View>
                    <Image
                        source={require('../assets/Movieposter2.png')}
                        style={{ width: width, height: height * 0.55 }}
                    />
                    <LinearGradient
                        colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                        style={{ height: height * 0.40, width: width }}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        className="absolute bottom-0"
                    />
                </View>
            </View>

            {/* movie details */}

            <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
                {/* title */}
                <Text className="text-3xl font-bold tracking-wider text-center text-white">
                    {movieName}
                </Text>
                <Text className="text-base font-semibold text-center text-neutral-400">
                    Released • 2010 • 180 min
                </Text>

                {/* genres */}

                <View className="flex-row justify-center mx-4 space-x-2">
                    <Text className="text-base font-semibold text-center text-neutral-400 ">
                        Sci-fi • Horror • Drama
                    </Text>
                </View>
                {/* description */}
                <Text className='mx-4 tracking-wide text-neutral-400'>
                In 1980s Indiana, a group of young friends witness supernatural forces and secret government exploits. As they search for answers, the children unravel a series of extraordinary mysteries.
                </Text>
            </View>
            
            {/* cast */}
            <Cast navigation={navigation} cast={cast} />

            {/* Similar Movies */}
            <MovieList title="Similar Movies" hideSeeAll="true" data={similarMovies}/>
        </ScrollView>
    )
}