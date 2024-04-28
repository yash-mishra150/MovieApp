import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import TrendingMovies from '../component/TrendingMovies';
import MovieList from '../component/MovieList';

export default function HomePage() {
    const [trending, setTrending] = useState([1, 2, 3]);
    const [upcoming, setUpcoming] = useState([1, 2, 3]);
    const [topRated, setTopRated] = useState([1, 2, 3]);
    return (
        <View className="flex-1 bg-neutral-800">
            <View className="my-[4vh]">
                <StatusBar style="light" />
                <View className="flex-row items-center justify-between mx-4">
                    <Bars3CenterLeftIcon size={40} color="#fff" strokeWidth={2} />
                    <Text className="text-3xl font-bold text-white"><Text className="text-[#eab308]">M</Text>ovies</Text>
                    <TouchableOpacity>
                        <MagnifyingGlassIcon size={30} color='#fff' strokeWidth={2} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 10 }}
            >
                {/* Trending Movies Carousel */}
                <TrendingMovies data={trending} />
                
                {/* upcoming movie row */}
                <MovieList title="Upcoming" data={upcoming}/>
            </ScrollView>
        </View>
    )
}