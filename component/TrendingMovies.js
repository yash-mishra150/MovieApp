import { View, Text, TouchableWithoutFeedback, Dimensions, Image } from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel'
import {useNavigation} from '@react-navigation/native';
import { Images500 } from '../api/moviedb';

var { width, height } = Dimensions.get('window');

export default function TrendingMovies({data}) {
  const navigation = useNavigation();
  const handleClick = (item) =>{
    navigation.navigate('Movie', item);
  }
  return (
    <View className="mb-[5vh]">
      <Text className="text-xl text-white mx-4 mb-[2vh]">Trending</Text>
      <Carousel 
      data={data}
      renderItem={({ item }) => <MovieCard item={item} handleClick={handleClick}/>}
      firstItem={1}
      inactiveSlideOpacity={0.60}
      sliderWidth={width}
      itemWidth={width*0.66}
      slideStyle={{display: 'flex', alignItems: 'center'}}
      />
    </View>
  )
}

const MovieCard = ({item, handleClick}) =>{
  // console.log("poster path: ",item.poster_path);
  return(
    <TouchableWithoutFeedback onPress={()=> handleClick(item)}>
        <Image
        // source={require('../assets/Movieposter1.png')}
        source={{uri: Images500(item.poster_path)}}
        style={{
          width: width*0.65,
          height: height*0.45
        }}
        className="rounded-3xl"
        />
    </TouchableWithoutFeedback>  
  )
}