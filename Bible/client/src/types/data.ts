/* 末世監控系統數據類型定義 */

export interface SuddenDeathRecord {
  id: string;
  date: string;
  title: string;
  url: string;
  category: 'work-related' | 'exercise' | 'medical' | 'other';
  age?: number;
  gender?: 'M' | 'F' | 'Unknown';
  location?: string;
  description?: string;
}

export interface RadarData {
  workRelated: number;
  exercise: number;
  medical: number;
  other: number;
  total: number;
}

export interface StatisticsData {
  totalDeaths: number;
  weeklyAverage: number;
  monthlyTrend: number[];
  categoryBreakdown: {
    [key: string]: number;
  };
}

export interface BibleResourceLink {
  id: string;
  title: string;
  description: string;
  url: string;
  language: 'Cantonese' | 'Mandarin' | 'English';
  category: 'Information' | 'Prophecy' | 'Reset' | 'Scripture';
}

export interface NewsItem {
  id: string;
  date: string;
  title: string;
  url: string;
  source: string;
  category: string;
  isSuddenDeath: boolean;
}
