import { MoodCategory, MoodCategoryDetails } from '../types';

export const API_BASE_URL = 'http://localhost:3000/api';

export const MOODS: { id: string; name: string; category: MoodCategory; icon: string; color: string; backgroundColor: string; textColor: string }[] = [
  {
    id: '33333333-3333-3333-3333-333333333333',
    name: 'Mutlu',
    category: 'happy',
    icon: 'smile',
    color: '#FFD700',
    backgroundColor: '#FFF8DC',
    textColor: '#000000',
  },
  {
    id: '44444444-4444-4444-4444-444444444444',
    name: 'Hüzünlü',
    category: 'sad',
    icon: 'sad',
    color: '#4682B4',
    backgroundColor: '#F0F8FF',
    textColor: '#000000',
  },
  {
    id: '55555555-5555-5555-5555-555555555555',
    name: 'Enerjik',
    category: 'energetic',
    icon: 'bolt',
    color: '#FF4500',
    backgroundColor: '#FFDAB9',
    textColor: '#000000',
  },
  {
    id: '66666666-6666-6666-6666-666666666666',
    name: 'Sakin',
    category: 'calm',
    icon: 'peace',
    color: '#98FB98',
    backgroundColor: '#F0FFF0',
    textColor: '#000000',
  },
  {
    id: '77777777-7777-7777-7777-777777777777',
    name: 'Stresli',
    category: 'stressed',
    icon: 'frown',
    color: '#DC143C',
    backgroundColor: '#FFF0F5',
    textColor: '#000000',
  },
  {
    id: '88888888-8888-8888-8888-888888888888',
    name: 'Romantik',
    category: 'romantic',
    icon: 'heart',
    color: '#FF69B4',
    backgroundColor: '#FFF0F5',
    textColor: '#000000',
  },
  {
    id: '99999999-9999-9999-9999-999999999999',
    name: 'Nostaljik',
    category: 'nostalgic',
    icon: 'clock',
    color: '#DEB887',
    backgroundColor: '#FFF8DC',
    textColor: '#000000',
  },
  {
    id: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    name: 'Yalnız',
    category: 'lonely',
    icon: 'user',
    color: '#778899',
    backgroundColor: '#F5F5F5',
    textColor: '#000000',
  },
];

export const CONTENT_CATEGORIES = [
  { id: 'music', name: 'Müzik', icon: 'music' },
  { id: 'movie', name: 'Film', icon: 'film' },
  { id: 'book', name: 'Kitap', icon: 'book' },
  { id: 'exercise', name: 'Egzersiz', icon: 'dumbbell' },
  { id: 'meditation', name: 'Meditasyon', icon: 'spa' },
];

export const STORAGE_KEYS = {
  USER_TOKEN: '@user_token',
  USER_DATA: '@user_data',
  USER_PREFERENCES: '@user_preferences',
  THEME: '@theme',
};

export const DEFAULT_PREFERENCES = {
  theme: 'system' as const,
  contentCategories: ['music', 'movie', 'book', 'exercise', 'meditation'],
  notificationsEnabled: true,
  emailNotificationsEnabled: true,
  language: 'tr',
};

export const moodCategories: MoodCategoryDetails[] = [
  {
    id: 'happy',
    name: 'Mutlu',
    description: 'Neşeli ve keyifli hissediyorum',
    icon: 'sun',
    emoji: '☀️',
    color: '#FFD700',
    backgroundColor: '#FFEB3B',
    textColor: '#000000'
  },
  {
    id: 'sad',
    name: 'Hüzünlü',
    description: 'Melankolik ve duygusal hissediyorum',
    icon: 'cloud-rain',
    emoji: '🌧️',
    color: '#4682B4',
    backgroundColor: '#64B5F6',
    textColor: '#FFFFFF'
  },
  {
    id: 'energetic',
    name: 'Enerjik',
    description: 'Enerjik ve dinamik hissediyorum',
    icon: 'flash',
    emoji: '⚡',
    color: '#FF8C00',
    backgroundColor: '#FF9800',
    textColor: '#000000'
  },
  {
    id: 'calm',
    name: 'Sakin',
    description: 'Sakin ve huzurlu hissediyorum',
    icon: 'leaf',
    emoji: '🍃',
    color: '#2E8B57',
    backgroundColor: '#4CAF50',
    textColor: '#FFFFFF'
  },
  {
    id: 'stressed',
    name: 'Stresli',
    description: 'Stresli ve gergin hissediyorum',
    icon: 'fire',
    emoji: '🔥',
    color: '#B22222',
    backgroundColor: '#F44336',
    textColor: '#FFFFFF'
  },
  {
    id: 'romantic',
    name: 'Romantik',
    description: 'Romantik ve duygusal hissediyorum',
    icon: 'heart',
    emoji: '❤️',
    color: '#FF1493',
    backgroundColor: '#E91E63',
    textColor: '#FFFFFF'
  },
  {
    id: 'nostalgic',
    name: 'Nostaljik',
    description: 'Nostaljik ve hatıralara dalmış hissediyorum',
    icon: 'film',
    emoji: '🎬',
    color: '#9370DB',
    backgroundColor: '#9C27B0',
    textColor: '#FFFFFF'
  },
  {
    id: 'lonely',
    name: 'Yalnız',
    description: 'Yalnız ve izole hissediyorum',
    icon: 'cloud',
    emoji: '☁️',
    color: '#708090',
    backgroundColor: '#9E9E9E',
    textColor: '#FFFFFF'
  },
  {
    id: 'random',
    name: 'Rastgele',
    description: 'Karışık öneriler istiyorum',
    icon: 'dice',
    emoji: '🎲',
    color: '#00BFFF',
    backgroundColor: '#03A9F4',
    textColor: '#FFFFFF'
  }
];

export const mockContents = [
  {
    id: '1',
    title: 'Weightless',
    description: 'Bu sakin ambient parça, stres seviyenizi düşürmek ve rahatlamanıza yardımcı olmak için bilimsel olarak tasarlanmıştır.',
    imageUrl: 'https://via.placeholder.com/150',
    category: 'music',
    tags: ['ambient', 'relaxing', 'sleep'],
    moodTags: ['calm', 'stressed'],
    source: 'Spotify',
    externalUrl: 'https://open.spotify.com/track/0FjdBvWzOEYlG6bGYiTZt3',
    duration: 8,
    createdAt: new Date(),
    updatedAt: new Date(),
    artist: 'Marconi Union',
    album: 'Ambient 1: Music for Airports',
    releaseYear: 2008
  },
  {
    id: '2',
    title: 'The Secret Life of Walter Mitty',
    description: 'Walter Mitty, sıradan hayatından kaçmak için hayal dünyasına dalan bir adamın gerçek bir maceraya atılma hikayesi.',
    imageUrl: 'https://via.placeholder.com/150',
    category: 'movie',
    tags: ['adventure', 'comedy', 'drama'],
    moodTags: ['nostalgic', 'calm', 'lonely'],
    source: 'Netflix',
    externalUrl: 'https://www.netflix.com/title/70275482',
    duration: 114,
    createdAt: new Date(),
    updatedAt: new Date(),
    director: 'Ben Stiller',
    cast: ['Ben Stiller', 'Kristen Wiig'],
    releaseYear: 2013,
    imdbRating: 7.3
  },
  {
    id: '3',
    title: '5 Dakikalık Nefes Meditasyonu',
    description: 'Bu kısa nefes meditasyonu, zihninizi sakinleştirmenize ve anı yaşamanıza yardımcı olacaktır.',
    imageUrl: 'https://via.placeholder.com/150',
    category: 'meditation',
    tags: ['breathing', 'beginner', 'mindfulness'],
    moodTags: ['stressed', 'calm'],
    source: 'YouTube',
    externalUrl: 'https://www.youtube.com/watch?v=inpok4MKVLM',
    duration: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
    guidedBy: 'Sarah Williams',
    focusAreas: ['stress', 'focus']
  },
  {
    id: '4',
    title: 'Midnight Library',
    description: 'Nora Seed kendini hayatındaki pişmanlıklarla dolu bir kütüphanede bulur ve farklı yaşam yollarını deneme fırsatı elde eder.',
    imageUrl: 'https://via.placeholder.com/150',
    category: 'book',
    tags: ['fiction', 'philosophy', 'life choices'],
    moodTags: ['sad', 'nostalgic', 'lonely'],
    source: 'Goodreads',
    externalUrl: 'https://www.goodreads.com/book/show/52578297-the-midnight-library',
    duration: 304, // sayfalar
    createdAt: new Date(),
    updatedAt: new Date(),
    author: 'Matt Haig',
    releaseYear: 2020
  },
  {
    id: '5',
    title: 'Evde Yapılabilecek 15 Dakikalık Egzersiz',
    description: 'Ekipman gerektirmeyen, tüm vücudu çalıştıran hızlı bir egzersiz rutini.',
    imageUrl: 'https://via.placeholder.com/150',
    category: 'exercise',
    tags: ['home workout', 'no equipment', 'full body'],
    moodTags: ['energetic', 'stressed'],
    source: 'YouTube',
    externalUrl: 'https://www.youtube.com/watch?v=sample-exercise',
    duration: 15,
    createdAt: new Date(),
    updatedAt: new Date(),
    intensity: 'medium',
    equipmentNeeded: []
  },
  {
    id: '6',
    title: 'Happy - Pharrell Williams',
    description: 'Pozitif enerji veren, neşeli bir pop şarkısı.',
    imageUrl: 'https://via.placeholder.com/150',
    category: 'music',
    tags: ['pop', 'upbeat', 'motivational'],
    moodTags: ['happy', 'energetic'],
    source: 'Spotify',
    externalUrl: 'https://open.spotify.com/track/60nZcImufyMA1MKQY3dcCH',
    duration: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
    artist: 'Pharrell Williams',
    album: 'G I R L',
    releaseYear: 2013
  },
  {
    id: '7',
    title: 'Pride and Prejudice',
    description: 'Jane Austen\'in klasik romantik romanı, sosyal sınıflar ve yanlış anlaşılmalar üzerine.',
    imageUrl: 'https://via.placeholder.com/150',
    category: 'book',
    tags: ['classic', 'romance', 'social commentary'],
    moodTags: ['romantic', 'calm'],
    source: 'Goodreads',
    externalUrl: 'https://www.goodreads.com/book/show/1885.Pride_and_Prejudice',
    duration: 279, // sayfalar
    createdAt: new Date(),
    updatedAt: new Date(),
    author: 'Jane Austen',
    releaseYear: 1813
  },
  {
    id: '8',
    title: 'La La Land',
    description: 'Los Angeles\'ta hayallerinin peşinden koşan bir aktris ve bir caz müzisyeninin hikayesi.',
    imageUrl: 'https://via.placeholder.com/150',
    category: 'movie',
    tags: ['musical', 'romance', 'drama'],
    moodTags: ['romantic', 'nostalgic'],
    source: 'Amazon Prime',
    externalUrl: 'https://www.amazon.com/La-Land-Ryan-Gosling/dp/B01MZGLQGF',
    duration: 128,
    createdAt: new Date(),
    updatedAt: new Date(),
    director: 'Damien Chazelle',
    cast: ['Ryan Gosling', 'Emma Stone'],
    releaseYear: 2016,
    imdbRating: 8.0
  }
]; 