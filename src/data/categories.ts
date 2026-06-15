export interface NoReason {
  id: number;
  reason: string;
  category: Category;
  severity: Severity;
}

export type Category =
  | 'professional'
  | 'existential'
  | 'technical'
  | 'lazy'
  | 'cosmic'
  | 'legal'
  | 'passive-aggressive'
  | 'philosophical'
  | 'medical'
  | 'financial'
  | 'temporal'
  | 'bureaucratic'
  | 'environmental'
  | 'culinary'
  | 'historical'
  | 'scientific'
  | 'diplomatic'
  | 'theatrical'
  | 'mythological'
  | 'literary';

export type Severity = 'gentle' | 'firm' | 'nuclear';

export const CATEGORIES: Category[] = [
  'professional', 'existential', 'technical', 'lazy', 'cosmic', 'legal',
  'passive-aggressive', 'philosophical', 'medical', 'financial', 'temporal',
  'bureaucratic', 'environmental', 'culinary', 'historical', 'scientific',
  'diplomatic', 'theatrical', 'mythological', 'literary'
];
