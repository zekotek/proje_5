import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { mockContents, CONTENT_CATEGORIES } from '../../constants';
import { ContentItem } from '../../types';

// Müzik platformları
const musicPlatforms = [
  { name: 'Spotify', icon: 'spotify', color: '#1DB954', url: 'https://open.spotify.com/search/' },
  { name: 'YouTube Music', icon: 'youtube', color: '#FF0000', url: 'https://music.youtube.com/search?q=' },
  { name: 'Apple Music', icon: 'apple', color: '#FB233B', url: 'https://music.apple.com/us/search?term=' },
  { name: 'Deezer', icon: 'music-note', color: '#00C7F2', url: 'https://www.deezer.com/search/' },
];

// Film platformları
const moviePlatforms = [
  { name: 'Netflix', icon: 'netflix', color: '#E50914', url: 'https://www.netflix.com/search?q=' },
  { name: 'Amazon Prime', icon: 'shopping', color: '#00A8E1', url: 'https://www.amazon.com/s?k=' },
  { name: 'Disney+', icon: 'television-classic', color: '#0063E5', url: 'https://www.disneyplus.com/search?q=' },
  { name: 'YouTube', icon: 'youtube', color: '#FF0000', url: 'https://www.youtube.com/results?search_query=' },
];

// Kitap platformları
const bookPlatforms = [
  { name: 'Goodreads', icon: 'book-open-page-variant', color: '#553B08', url: 'https://www.goodreads.com/search?q=' },
  { name: 'Amazon', icon: 'shopping', color: '#FF9900', url: 'https://www.amazon.com/s?k=' },
  { name: 'Google Books', icon: 'google', color: '#4285F4', url: 'https://www.google.com/search?tbm=bks&q=' },
];

// Meditasyon platformları
const meditationPlatforms = [
  { name: 'Headspace', icon: 'meditation', color: '#F47D31', url: 'https://www.headspace.com/search?query=' },
  { name: 'Calm', icon: 'wave', color: '#4BBAE6', url: 'https://www.calm.com/search?query=' },
  { name: 'YouTube', icon: 'youtube', color: '#FF0000', url: 'https://www.youtube.com/results?search_query=' },
];

// Egzersiz platformları
const exercisePlatforms = [
  { name: 'YouTube', icon: 'youtube', color: '#FF0000', url: 'https://www.youtube.com/results?search_query=' },
  { name: 'Fitness Blender', icon: 'dumbbell', color: '#1C92D2', url: 'https://www.fitnessblender.com/videos?keywords=' },
];

type ContentDetailScreenRouteProp = RouteProp<{
  ContentDetail: {
    item: ContentItem;
  };
}, 'ContentDetail'>;

export default function ContentDetail() {
  const navigation = useNavigation();
  const route = useRoute<ContentDetailScreenRouteProp>();
  const { item } = route.params;
  
  const [isFavorite, setIsFavorite] = useState(false);
  const [contentDetails, setContentDetails] = useState<ContentItem | null>(null);
  
  useEffect(() => {
    // mockContents'dan gelen item'ın id'sine göre detayları al
    if (item && item.id) {
      const details = mockContents.find(content => content.id === item.id);
      if (details) {
        setContentDetails(details);
      }
    }
    
    // Header başlığını içerik kategorisine göre ayarla
    const categoryName = getCategoryName(item.category);
    navigation.setOptions({
      title: categoryName + ' Detayı',
    });
  }, [item, navigation]);
  
  // Platformlara göre uygun link listesi seç
  const getPlatforms = () => {
    switch(item.category) {
      case 'music': return musicPlatforms;
      case 'movie': return moviePlatforms;
      case 'book': return bookPlatforms;
      case 'meditation': return meditationPlatforms;
      case 'exercise': return exercisePlatforms;
      default: return musicPlatforms;
    }
  };
  
  const getCategoryName = (categoryId: string) => {
    const category = CONTENT_CATEGORIES.find(c => c.id === categoryId);
    return category ? category.name : categoryId;
  };
  
  // Platform arama linki oluştur
  const getSearchUrl = (platform, title) => {
    return platform.url + encodeURIComponent(title);
  };
  
  // Favorilere ekle/çıkar
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // TODO: Favorileri kaydetme fonksiyonu
  };
  
  // İçeriği paylaş
  const shareContent = async () => {
    try {
      await Share.share({
        message: `${item.title}\n${item.description}\nRuh halime uygun bu içeriği keşfettim!`,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  
  // Benzer içerikler - aynı mood tag'leri olan, farklı içerikler
  const getSimilarContent = () => {
    if (!contentDetails || !contentDetails.moodTags) return [];
    
    return mockContents
      .filter(content => 
        content.id !== item.id && 
        content.moodTags.some(tag => contentDetails.moodTags.includes(tag))
      )
      .slice(0, 4); // İlk 4 benzer içeriği göster
  };
  
  // Category-specific details
  const renderCategorySpecificDetails = () => {
    if (!contentDetails) return null;
    
    switch(contentDetails.category) {
      case 'music':
        return (
          <View>
            <View className="flex-row justify-between items-center my-2">
              <Text className="text-base text-gray-700">Sanatçı:</Text>
              <Text className="text-base font-medium">{contentDetails.artist}</Text>
            </View>
            {contentDetails.album && (
              <View className="flex-row justify-between items-center my-2">
                <Text className="text-base text-gray-700">Albüm:</Text>
                <Text className="text-base">{contentDetails.album}</Text>
              </View>
            )}
            {contentDetails.releaseYear && (
              <View className="flex-row justify-between items-center my-2">
                <Text className="text-base text-gray-700">Yıl:</Text>
                <Text className="text-base">{contentDetails.releaseYear}</Text>
              </View>
            )}
          </View>
        );
      case 'movie':
        return (
          <View>
            <View className="flex-row justify-between items-center my-2">
              <Text className="text-base text-gray-700">Yönetmen:</Text>
              <Text className="text-base font-medium">{contentDetails.director}</Text>
            </View>
            {contentDetails.cast && contentDetails.cast.length > 0 && (
              <View className="flex-row justify-between items-center my-2">
                <Text className="text-base text-gray-700">Oyuncular:</Text>
                <Text className="text-base">{contentDetails.cast.join(', ')}</Text>
              </View>
            )}
            {contentDetails.releaseYear && (
              <View className="flex-row justify-between items-center my-2">
                <Text className="text-base text-gray-700">Yıl:</Text>
                <Text className="text-base">{contentDetails.releaseYear}</Text>
              </View>
            )}
            {contentDetails.imdbRating && (
              <View className="flex-row justify-between items-center my-2">
                <Text className="text-base text-gray-700">IMDB:</Text>
                <View className="flex-row items-center">
                  <Icon name="star" size={16} color="#FFD700" />
                  <Text className="text-base ml-1">{contentDetails.imdbRating}/10</Text>
                </View>
              </View>
            )}
          </View>
        );
      case 'book':
        return (
          <View>
            <View className="flex-row justify-between items-center my-2">
              <Text className="text-base text-gray-700">Yazar:</Text>
              <Text className="text-base font-medium">{contentDetails.author}</Text>
            </View>
            {contentDetails.releaseYear && (
              <View className="flex-row justify-between items-center my-2">
                <Text className="text-base text-gray-700">Yayın Yılı:</Text>
                <Text className="text-base">{contentDetails.releaseYear}</Text>
              </View>
            )}
          </View>
        );
      case 'exercise':
        return (
          <View>
            {contentDetails.intensity && (
              <View className="flex-row justify-between items-center my-2">
                <Text className="text-base text-gray-700">Zorluk:</Text>
                <View className="bg-blue-100 rounded-full px-3 py-1">
                  <Text className="text-blue-700 font-medium">
                    {contentDetails.intensity === 'low' 
                      ? 'Kolay' 
                      : contentDetails.intensity === 'medium' 
                      ? 'Orta' 
                      : 'Zor'}
                  </Text>
                </View>
              </View>
            )}
            {contentDetails.equipmentNeeded && contentDetails.equipmentNeeded.length === 0 && (
              <View className="flex-row justify-between items-center my-2">
                <Text className="text-base text-gray-700">Ekipman:</Text>
                <Text className="text-base">Ekipman gerektirmez</Text>
              </View>
            )}
          </View>
        );
      case 'meditation':
        return (
          <View>
            {contentDetails.guidedBy && (
              <View className="flex-row justify-between items-center my-2">
                <Text className="text-base text-gray-700">Rehberlik Eden:</Text>
                <Text className="text-base font-medium">{contentDetails.guidedBy}</Text>
              </View>
            )}
            {contentDetails.focusAreas && contentDetails.focusAreas.length > 0 && (
              <View className="my-2">
                <Text className="text-base text-gray-700 mb-2">Odaklanma Alanları:</Text>
                <View className="flex-row flex-wrap">
                  {contentDetails.focusAreas.map((area, index) => (
                    <View key={index} className="bg-purple-100 rounded-full px-3 py-1 mr-2 mb-2">
                      <Text className="text-purple-700">{area}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        );
      default:
        return null;
    }
  };

  const getActionButtonText = () => {
    switch(item.category) {
      case 'music': return 'DİNLE';
      case 'movie': return 'İZLE';
      case 'book': return 'OKU';
      case 'exercise': return 'BAŞLAT';
      case 'meditation': return 'BAŞLAT';
      default: return 'GÖRÜNTÜLE';
    }
  };

  if (!contentDetails) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <Text>Yükleniyor...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-200">
        <TouchableOpacity 
          className="p-1"
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text className="text-lg font-bold">{getCategoryName(item.category)} Detayı</Text>
        <View className="flex-row">
          <TouchableOpacity 
            className="p-1 mr-2"
            onPress={toggleFavorite}
          >
            <Icon name={isFavorite ? "heart" : "heart-outline"} size={24} color={isFavorite ? "#FF6B6B" : "#333"} />
          </TouchableOpacity>
          <TouchableOpacity 
            className="p-1"
            onPress={shareContent}
          >
            <Icon name="share-variant" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView className="flex-1">
        {/* İçerik Görseli */}
        <View className="items-center justify-center py-6 bg-gray-50">
          <Image 
            source={{ uri: contentDetails.imageUrl }} 
            className="w-48 h-48 rounded-lg"
            resizeMode="cover"
          />
        </View>
        
        {/* İçerik Başlığı ve Detayları */}
        <View className="px-4 pt-4">
          <Text className="text-2xl font-bold text-gray-800">{contentDetails.title}</Text>
          
          {contentDetails.category === 'music' && contentDetails.artist && (
            <Text className="text-lg text-gray-600 mt-1">{contentDetails.artist}</Text>
          )}
          
          <View className="flex-row items-center mt-2">
            <View className="bg-blue-100 rounded-full px-3 py-1">
              <Text className="text-blue-700">{getCategoryName(contentDetails.category)}</Text>
            </View>
            <Text className="text-gray-500 mx-2">•</Text>
            <Text className="text-gray-500">
              {contentDetails.category === 'book' 
                ? `${contentDetails.duration} sayfa` 
                : `${contentDetails.duration} dk`}
            </Text>
          </View>
          
          <Text className="text-gray-700 mt-4 leading-6">{contentDetails.description}</Text>
          
          {/* Kategoriye Özel Detaylar */}
          <View className="my-4 px-2 py-3 bg-gray-50 rounded-lg">
            {renderCategorySpecificDetails()}
          </View>
          
          {/* Etiketler */}
          <View className="mt-3 mb-4">
            <Text className="text-base font-medium text-gray-700 mb-2">Etiketler:</Text>
            <View className="flex-row flex-wrap">
              {contentDetails.tags.map((tag, index) => (
                <View key={index} className="bg-gray-100 rounded-full px-3 py-1 mr-2 mb-2">
                  <Text className="text-gray-800">#{tag}</Text>
                </View>
              ))}
              {contentDetails.moodTags.map((tag, index) => (
                <View key={index} className="bg-pink-100 rounded-full px-3 py-1 mr-2 mb-2">
                  <Text className="text-pink-700">{tag}</Text>
                </View>
              ))}
            </View>
          </View>
          
          {/* CTA Butonları */}
          <View className="my-4">
            <TouchableOpacity
              className="bg-blue-500 rounded-lg py-3 items-center mb-3"
              onPress={() => contentDetails.externalUrl && Linking.openURL(contentDetails.externalUrl)}
            >
              <Text className="text-white font-bold text-lg">{getActionButtonText()}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              className="border border-blue-500 rounded-lg py-3 items-center"
              onPress={toggleFavorite}
            >
              <Text className="text-blue-500 font-bold text-lg">
                {isFavorite ? 'FAVORİLERDEN ÇIKAR' : 'FAVORİLERE EKLE'}
              </Text>
            </TouchableOpacity>
          </View>
          
          {/* Platform Linkleri */}
          <View className="my-4">
            <Text className="text-lg font-bold text-gray-800 mb-3">Platformlar</Text>
            
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 10 }}
            >
              {getPlatforms().map((platform, index) => (
                <TouchableOpacity
                  key={index}
                  className="mr-3 items-center"
                  onPress={() => Linking.openURL(getSearchUrl(platform, contentDetails.title))}
                >
                  <View 
                    style={{ backgroundColor: platform.color }}
                    className="w-16 h-16 rounded-full items-center justify-center mb-1"
                  >
                    <Icon name={platform.icon} size={28} color="white" />
                  </View>
                  <Text className="text-xs text-center">{platform.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          
          {/* Benzer İçerikler */}
          <View className="my-4 mb-8">
            <Text className="text-lg font-bold text-gray-800 mb-3">Benzer İçerikler</Text>
            
            {getSimilarContent().length > 0 ? (
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 10 }}
              >
                {getSimilarContent().map((content, index) => (
                  <TouchableOpacity
                    key={index}
                    className="mr-4 w-36"
                    onPress={() => navigation.navigate('ContentDetail' as never, { item: content } as never)}
                  >
                    <Image 
                      source={{ uri: content.imageUrl }} 
                      className="w-36 h-20 rounded-lg mb-2"
                      resizeMode="cover"
                    />
                    <Text className="font-medium" numberOfLines={1}>{content.title}</Text>
                    <Text className="text-xs text-gray-500">{getCategoryName(content.category)}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            ) : (
              <Text className="text-gray-500 italic">Benzer içerik bulunamadı.</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 