export type SchoolKey = "information" | "motion" | "minimalism" | "experimental" | "eastern";

export interface Philosophy {
  number: number;
  name_en: string;
  studio_or_subtitle: string;
  school_key: SchoolKey;
  school_zh: string;
  school_en: string;
  philosophy_cn: string;
  philosophy_en: string;
  features_cn: string[];
  features_en: string[];
  prompt_dna: string;
  rep_work: string;
  search_keywords: string;
  scene_scores: { web?: number; ppt?: number; pdf?: number; infographic?: number; cover?: number };
  ai_generation_score: number;
  best_path: string;
}

export type Lang = "cn" | "en" | "both";
export type Scene = "web" | "ppt" | "pdf" | "infographic" | "cover";
