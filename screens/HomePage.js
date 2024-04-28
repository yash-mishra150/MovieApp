import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import TrendingMovies from '../component/TrendingMovies';
import MovieList from '../component/MovieList';
import { useNavigation } from '@react-navigation/native';
import Loading from './Loading';

export default function HomePage() {
    const [trending, setTrending] = useState([1, 2, 3]);
    const [upcoming, setUpcoming] = useState([1, 2, 3]);
    const [topRated, setTopRated] = useState([1, 2, 3]);
    const navigation = useNavigation();
    const [loading, setloading] = useState(true);
    return (
        <View className="flex-1 bg-neutral-800">
            <View className="mt-[6vh] mb-[1vh]">
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
                loading ?
                    (
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: 10 }}
                        >
                            {/* Trending Movies Carousel */}
                            <TrendingMovies data={trending} />

                            {/* upcoming movie row */}
                            <MovieList title="Upcoming" data={upcoming} />

                            {/* Top rated movie row */}
                            <MovieList title="Top Rated" data={topRated} />
                        </ScrollView>
                    ):
                    (
                        <Loading/>
                    )
            }
        </View>
    )
}