export interface Workout {
  id: string | number;
  name: string;
  image: string;
  category?: string[];
  equipment?: string;
  duration: string | number;
  calories: string | number;
  rating?: number;
  description?: string;
  difficulty?: string;
  sets?: number | string;
  reps?: number | string;
  instructions?: string[];
}

export type PlanWorkout = Workout & {
  done?: boolean;
};

export type SortOption = "duration" | "calories" | "rating";
