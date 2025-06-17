export type Exercise = {
  name: string;
  sets: number;
  reps: number;
  obs?: string;
  rest?: string;
};

export type WorkoutDTO = {
  name: string;
  trainerId: number;
  exercises: Exercise[];
};
