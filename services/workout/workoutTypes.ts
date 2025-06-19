export type Exercise = {
  name: string;
  sets: string;
  reps: string;
  obs?: string;
  rest?: string;
};

export type WorkoutDTO = {
  name: string;
  trainerId: number;
  exercises: Exercise[];
};
