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
import { fetchMoviesCredits, fetchMoviesDetails, fetchSimilarMovies, Images500 } from '../api/moviedb';

var { width, height } = Dimensions.get('window');
import Loading from './Loading';
export default function MovieScreen() {
    const { params: item } = useRoute();
    useEffect(() => {
        // console.log('item id: ', item.id)
        setloading(true);
        getMovieDetails(item.id);
        getMovieCredits(item.id);
        getMovieSimilar(item.id);
        
    }, [item])

    const getMovieDetails = async (id) => {
        const data = await fetchMoviesDetails(id);
        if (data) setmovie(data)
        // console.log(data)
        setloading(false)
    }
    const getMovieCredits = async (id) => {
        const data = await fetchMoviesCredits(id);
        if (data && data.cast) setcast(data.cast);
        // console.log('got credits:',data)
        setloading(false)
    }
    const getMovieSimilar = async (id) => {
        const data = await fetchSimilarMovies(id);
        if (data && data.results) setsimilarMovies(data.results);
        // console.log('got:',data)
        setloading(false)
    }

    const navigation = useNavigation();
    const [isFavorite, toogleFavorite] = useState(false);
    const [cast, setcast] = useState([]);
    const [similarMovies, setsimilarMovies] = useState([]);
    const [loading, setloading] = useState(true);
    const [movie, setmovie] = useState({});
    let movieName = "Stranger Things";
    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            className="flex-1 bg-neutral-900"
        >
            <View className="w-full">
                <View className="absolute z-20 flex-row items-center justify-between w-full px-4 mt-[4vh] mb-[1vh]">
                    <TouchableOpacity className="p-1 rounded-xl bg-[#eab308]" onPress={() => navigation.navigate('Home')}>
                        <ChevronLeftIcon size="28" color="white" strokeWidth={2.5} />
                    </TouchableOpacity>
                    <TouchableOpacity className="p-1 rounded-xl" onPress={() => toogleFavorite(!isFavorite)}>
                        <HeartIcon size="35" color={isFavorite ? '#eab308' : 'white'} strokeWidth={2.5} />
                    </TouchableOpacity>
                </View>
                {
                    loading ?
                        (
                            <Loading />
                        ) :
                        (
                            
                            <View>
                                <View>
                                    <View>
                                        {movie && <Image
                                            // source={require('../assets/Movieposter2.png')}
                                            source={{ uri: Images500(movie?.poster_path) || 'https://skydomepictures.com/wp-content/uploads/2018/08/movie-poster-coming-soon-2.png' }}
                                            style={{ width: width, height: height * 0.55 }}
                                        />}
                                        <LinearGradient
                                            colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                                            style={{ height: height * 0.40, width: width }}
                                            start={{ x: 0.5, y: 0 }}
                                            end={{ x: 0.5, y: 1 }}
                                            className="absolute bottom-0"
                                        />
                                    </View>
                                </View>



                                <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
                                    {/* title */}
                                    <Text className="text-3xl font-bold tracking-wider text-center text-white">
                                        {movie?.title}
                                    </Text>
                                    {
                                        movie?.id ? (
                                            <Text className="text-base font-semibold text-center text-neutral-400">
                                                {movie?.status} • {movie?.release_date?.split('-')[0]} • {movie?.runtime} min
                                            </Text>
                                        ) : null
                                    }




                                    <View className="flex-row justify-center mx-4 space-x-2">

                                    {movie && movie?.genres?.map((genre,id)=>{
                                        let showDot = id + 1 != movie.genres.length; 
                                        return(
                                            <Text key={id} className="text-base font-semibold text-center text-neutral-400"> {genre?.name} {showDot? ' •' : ''} </Text>
                                        )
                                    })}


                                    </View>
                                    {/* description */}
                                    <Text className='mx-4 tracking-wide text-neutral-400'>
                                        {movie?.overview}
                                    </Text>
                                </View>


                                { cast.length>0 && <Cast navigation={navigation} cast={cast} />}


                                {similarMovies.length>0 && <MovieList title="Similar Movies" hideSeeAll="true" data={similarMovies}/>}
                            </View>
                        )
                }
            </View>
        </ScrollView>
    )
}