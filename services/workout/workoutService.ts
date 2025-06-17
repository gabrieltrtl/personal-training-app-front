import api from '../api';
import { WorkoutDTO }  from './workoutTypes';

export const saveWorkout = async (workout: WorkoutDTO) => {
  const response = await api.post('/workouts', workout);
  return response.data;
}