import api from '../api';
import { WorkoutDTO }  from './workoutTypes';

export const getTrainerWorkout = async (trainerId: number) => {
  const response = await api.get('/workouts', {
    params: { id: trainerId },
  });
  return response.data;
}

export const saveWorkout = async (workout: WorkoutDTO) => {
  const response = await api.post('/workouts', workout);
  return response.data;
}

export const deleteWorkout = async (id: string | number) => {
  return api.delete(`/workouts/${id}`);
}

export const getWorkoutById = async (id: string | number) => {
  const response = await api.get(`/workouts/${id}`);
  return response.data;
};

export const updateWorkout = async (id: string | number, updatedData: Partial<WorkoutDTO>) => {
  const response = await api.put(`/workouts/${id}`, updatedData);
  return response.data;
}
