import { supabase } from './supabase';

export type Fortune = {
  level: string;
  color: string;
  descriptions: string[];
};

export const fortunes: Fortune[] = [
  { level: '大吉', color: 'text-red-500', descriptions: [] },
  { level: '中吉', color: 'text-orange-500', descriptions: [] },
  { level: '小吉', color: 'text-yellow-500', descriptions: [] },
  { level: '吉', color: 'text-green-500', descriptions: [] },
  { level: '末吉', color: 'text-blue-500', descriptions: [] }
];

export async function getFortuneDescriptions(level: string): Promise<string[]> {
  const { data, error } = await supabase
    .from('fortune_descriptions')
    .select('description')
    .eq('level', level);

  if (error) {
    console.error('Error fetching fortune descriptions:', error);
    return [];
  }

  return data.map(item => item.description);
} 