import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { moodCategories, mockContents, CONTENT_CATEGORIES } from '../../constants';
import { MoodCategory, ContentItem } from '../../types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type MoodContentRouteProp = RouteProp<{
  MoodContent: {
    mood: MoodCategory;
  };
}, 'MoodContent'>;

const MoodContent = () => {
  const route = useRoute<MoodContentRouteProp>();
  const navigation = useNavigation();
  const [contents, setContents] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { mood } = route.params || { mood: 'happy' as MoodCategory };

  useEffect(() => {
    // Gerçek uygulamada burada seçilen ruh haline göre API'den içerik çekilecek
    // Şimdilik seçilen ruh haline göre mockContents'dan filtreleme yapıyoruz
    const filteredContents = mockContents.filter(item => 
      item.moodTags.includes(mood)
    );
    setContents(filteredContents);
    
    // Header başlığını ayarla
    const currentMood = moodCategories.find(m => m.id === mood);
    if (currentMood) {
      navigation.setOptions({
        title: `${currentMood.emoji} ${currentMood.name} Ruh Halin İçin Öneriler`,
      });
    }
  }, [mood, navigation]);

  const filterContentsByCategory = (category: string | null) => {
    setSelectedCategory(category);
  };

  const getFilteredContents = () => {
    if (!selectedCategory) return contents;
    return contents.filter(item => item.category === selectedCategory);
  };

  const renderContentItem = ({ item }) => (
    <TouchableOpacity 
      className="bg-white rounded-lg p-4 mb-4 shadow-sm"
      onPress={() => navigateToContentDetail(item)}
    >
      <View className="flex-row">
        <Image 
          source={{ uri: item.imageUrl }} 
          className="w-20 h-20 rounded-md mr-4" 
        />
        <View className="flex-1">
          <Text className="text-lg font-bold mb-1">{item.title}</Text>
          <View className="flex-row items-center mb-2">
            <Text className="text-gray-500 mr-1">{getCategoryName(item.category)}</Text>
            <Text className="text-gray-400 mx-1">•</Text>
            <Text className="text-gray-500">
              {item.category === 'book' 
                ? `${item.duration} sayfa` 
                : `${item.duration} ${item.duration === 1 ? 'dakika' : 'dakika'}`}
            </Text>
          </View>
          <Text className="text-sm text-gray-600" numberOfLines={2}>{item.description}</Text>
          <View className="flex-row mt-2">
            <View className="bg-blue-100 rounded-full px-2 py-1 mr-1">
              <Text className="text-xs text-blue-700">{item.source}</Text>
            </View>
            {item.tags.slice(0, 2).map((tag, index) => (
              <View key={index} className="bg-gray-100 rounded-full px-2 py-1 mr-1">
                <Text className="text-xs text-gray-600">#{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const navigateToContentDetail = (item: any) => {
    // ContentDetail ekranına yönlendir
    navigation.navigate('ContentDetail' as never, { item } as never);
  };

  const getCategoryName = (categoryId: string) => {
    const category = CONTENT_CATEGORIES.find(c => c.id === categoryId);
    return category ? category.name : categoryId;
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = CONTENT_CATEGORIES.find(c => c.id === categoryId);
    return category ? category.icon : 'help-circle';
  };

  const categories = [
    { id: null, name: 'Tümü', icon: 'view-grid' },
    ...CONTENT_CATEGORIES
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="px-4 pt-4 pb-2">
        <Text className="text-base text-gray-600 mb-2">Kategoriye göre filtrele:</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => String(item.id || 'all')}
          renderItem={({ item }) => (
            <TouchableOpacity
              className={`px-4 py-2 mr-2 rounded-full flex-row items-center ${selectedCategory === item.id ? 'bg-blue-500' : 'bg-gray-200'}`}
              onPress={() => filterContentsByCategory(item.id)}
            >
              <Icon 
                name={item.id === null ? 'view-grid' : getCategoryIcon(item.id)} 
                size={16} 
                color={selectedCategory === item.id ? 'white' : '#4b5563'} 
                style={{ marginRight: 6 }}
              />
              <Text 
                className={`${selectedCategory === item.id ? 'text-white' : 'text-gray-800'}`}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          className="mb-4"
        />
      </View>

      <View className="px-4 flex-1">
        {getFilteredContents().length > 0 ? (
          <FlatList
            data={getFilteredContents()}
            renderItem={renderContentItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            <Icon name="emoticon-sad-outline" size={48} color="#9ca3af" />
            <Text className="text-lg text-gray-500 mt-4">Bu kategoride içerik bulunamadı.</Text>
            <Text className="text-sm text-gray-400 mt-2">Başka bir kategori seçmeyi deneyin.</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default MoodContent; 