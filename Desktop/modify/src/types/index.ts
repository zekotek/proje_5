export type ContentCategory = 'music' | 'movie' | 'book' | 'exercise' | 'meditation';
export type MoodCategory = 'happy' | 'sad' | 'energetic' | 'calm' | 'stressed' | 'romantic' | 'nostalgic' | 'lonely' | 'random';
export type ThemePreference = 'light' | 'dark' | 'system';
export type ExternalLinkType = 'spotify' | 'youtube' | 'netflix' | 'amazon' | 'apple_music' | 'google_books' | 'custom';

export interface MoodCategoryDetails {
  id: MoodCategory;
  name: string;
  description: string;
  icon: string;
  emoji: string;
  color: string;
  backgroundColor: string;
  textColor: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  profilePictureUrl?: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  isActive: boolean;
}

export interface UserPreferences {
  userId: string;
  theme: ThemePreference;
  contentCategories: ContentCategory[];
  notificationsEnabled: boolean;
  emailNotificationsEnabled: boolean;
  language: string;
  updatedAt: string;
}

export interface Mood {
  id: string;
  name: string;
  emoji: string;
  intensity: number;
  note?: string;
  createdAt: Date;
}

export interface UserMoodSelection {
  id: string;
  userId: string;
  moodId: MoodCategory;
  timestamp: Date;
  notes?: string;
}

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: ContentCategory;
  tags: string[];
  moodTags: MoodCategory[];
  source: string;
  externalUrl?: string;
  duration?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ExternalLink {
  id: string;
  contentId: string;
  type: ExternalLinkType;
  url: string;
  label: string;
}

export interface MusicDetails {
  contentId: string;
  artist: string;
  album?: string;
  releaseYear?: number;
  spotifyId?: string;
  appleMusicId?: string;
}

export interface MovieDetails {
  contentId: string;
  director: string;
  cast: string[];
  releaseYear: number;
  imdbRating?: number;
  netflixId?: string;
  amazonPrimeId?: string;
}

export interface BookDetails {
  contentId: string;
  author: string;
  publisher?: string;
  releaseYear: number;
  pageCount?: number;
  isbn?: string;
  goodreadsId?: string;
}

export interface ExerciseDetails {
  contentId: string;
  intensity: 'low' | 'medium' | 'high';
  targetMuscles?: string[];
  equipmentNeeded?: string[];
  instructor?: string;
}

export interface MeditationDetails {
  contentId: string;
  guidedBy?: string;
  focusAreas: string[];
}

export interface UserContentInteraction {
  id: string;
  userId: string;
  contentId: string;
  interactionType: 'view' | 'favorite' | 'like' | 'complete';
  createdAt: string;
}

export interface ContentCompletion {
  id: string;
  userId: string;
  contentId: string;
  progress: number;
  completedAt: string;
}

export interface Recommendation {
  id: string;
  userId: string;
  moodId: string;
  createdAt: string;
  isActive: boolean;
}

export interface RecommendationItem {
  recommendationId: string;
  contentId: string;
  position: number;
}

export interface RecommendationFeedback {
  id: string;
  userId: string;
  recommendationId: string;
  contentId: string;
  rating: number;
  feedback?: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'mood_reminder' | 'new_content' | 'recommendation' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
} 