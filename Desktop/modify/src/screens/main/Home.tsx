import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

// Duygu durumları verisi
const moodData = [
  {
    id: 'mutlu',
    emoji: '😊',
    title: 'Mutlu',
    description: 'Neşeli ve pozitif hissettiğiniz anlar için',
    color: '#FFCC33', // Sarı
  },
  {
    id: 'huzunlu',
    emoji: '😢',
    title: 'Hüzünlü',
    description: 'Duygusal ve melankolik hissettiğiniz zamanlar için',
    color: '#66A3FF', // Mavi
  },
  {
    id: 'enerjik',
    emoji: '⚡',
    title: 'Enerjik',
    description: 'Enerji dolu ve aktif hissettiğiniz zamanlar için',
    color: '#FF9933', // Turuncu
  },
  {
    id: 'sakin',
    emoji: '😌',
    title: 'Sakin',
    description: 'Huzurlu ve sakin hissettiğiniz zamanlar için',
    color: '#33CC99', // Yeşil
  },
  {
    id: 'stresli',
    emoji: '😰',
    title: 'Stresli',
    description: 'Gergin ve stresli hissettiğiniz zamanlar için',
    color: '#FF6666', // Kırmızı
  },
  {
    id: 'romantik',
    emoji: '❤️',
    title: 'Romantik',
    description: 'Aşık ve romantik hissettiğiniz zamanlar için',
    color: '#FF66B2', // Pembe
  },
  {
    id: 'nostaljik',
    emoji: '🕰️',
    title: 'Nostaljik',
    description: 'Geçmişi özlediğiniz ve hatırladığınız zamanlar için',
    color: '#9966FF', // Mor
  },
  {
    id: 'yalniz',
    emoji: '🌙',
    title: 'Yalnız',
    description: 'Yalnız ve düşünceli hissettiğiniz zamanlar için',
    color: '#8899AA', // Gri-mavi
  }
];

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Home() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const selectMood = (mood) => {
    // Duygu durumuna göre içerik önerileri ekranına geçiş yap
    // mood.id'yi MoodCategory formatına çevir
    let moodCategory;
    switch(mood.id) {
      case 'mutlu': moodCategory = 'happy'; break;
      case 'huzunlu': moodCategory = 'sad'; break;
      case 'enerjik': moodCategory = 'energetic'; break;
      case 'sakin': moodCategory = 'calm'; break;
      case 'stresli': moodCategory = 'stressed'; break;
      case 'romantik': moodCategory = 'romantic'; break;
      case 'nostaljik': moodCategory = 'nostalgic'; break;
      case 'yalniz': moodCategory = 'lonely'; break;
      default: moodCategory = 'happy';
    }
    navigation.navigate('MoodContent', { mood: moodCategory });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Bugün nasıl hissediyorsun?</Text>
        </View>
        
        <View style={styles.moodGrid}>
          {moodData.map((mood) => (
            <TouchableOpacity
              key={mood.id}
              style={[styles.moodCard, { backgroundColor: mood.color }]}
              onPress={() => selectMood(mood)}
            >
              <Text style={styles.moodEmoji}>{mood.emoji}</Text>
              <Text style={styles.moodTitle}>{mood.title}</Text>
              <Text style={styles.moodDescription}>{mood.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    padding: 16,
    marginTop: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    justifyContent: 'space-between',
  },
  moodCard: {
    width: '48%',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    minHeight: 160,
  },
  moodEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  moodTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  moodDescription: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
  },
}); 