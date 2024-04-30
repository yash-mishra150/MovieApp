import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import TrendingMovies from '../component/TrendingMovies';
import MovieList from '../component/MovieList';
import { useNavigation } from '@react-navigation/native';
import Loading from './Loading';
import { fetchTrendingMovies,fetchUpcomingMovies,fetchTopRatedMovies } from '../api/moviedb';

export default function HomePage() {
    const [trending, setTrending] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const navigation = useNavigation();
    const [loading, setloading] = useState(true);
    useEffect(()=>{
        getTrendingMovies();
        getUpcomingMovies();
        getTopRatedMovies();
    },[])
    const getUpcomingMovies = async() =>{
        const data = await fetchUpcomingMovies();
        if(data || data.results){
            setUpcoming(data.results)
            // console.log(data.results.poster_path)
        }
        setloading(false)
    }
    const getTrendingMovies = async() =>{
        const data = await fetchTrendingMovies();
        if(data || data.results){
            setTrending(data.results)
            // console.log(data.results.poster_path)
        }
        // setloading(false)
    }
    const getTopRatedMovies = async() =>{
        const data = await fetchTopRatedMovies();
        if(data || data.results){
            setTopRated(data.results)
            // console.log(data.results.poster_path)
        }
        // setloading(false)
    }
    return (
        <View className="flex-1 bg-neutral-800">
            <View className="mt-[4vh] mb-[1vh]">
                <StatusBar style="light" />
                <View className="flex-row items-center justify-between mx-4">
                    <Bars3CenterLeftIcon size={40} color="#fff" strokeWidth={2} />
                    <Text className="text-3xl font-bold text-white"><Text className="text-[#eab308]">M</Text>ovies</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                        <MagnifyingGlassIcon size={30} color='#fff' strokeWidth={2} />
                    </TouchableOpacity>
                </View>
            </View>
            {
                !loading ?
                    (
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: 10 }}
                        >
                            {/* Trending Movies Carousel */}
                            { trending.length>0 && <TrendingMovies data={trending} />}

                            {/* upcoming movie row */}
                            {upcoming.length>0 && <MovieList title="Upcoming" data={upcoming} />}

                            {/* Top rated movie row */}
                            {topRated.length>0 && <MovieList title="Top Rated" data={topRated} />}
                        </ScrollView>
                    ):
                    (
                        <Loading/>
                    )
            }
        </View>
    )
}