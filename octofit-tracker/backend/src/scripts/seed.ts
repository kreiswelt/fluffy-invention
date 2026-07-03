import mongoose from 'mongoose';
import { UserModel } from '../models/user.model';
import { TeamModel } from '../models/team.model';
import { ActivityModel } from '../models/activity.model';
import { LeaderboardModel } from '../models/leaderboard.model';
import { WorkoutModel } from '../models/workout.model';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      UserModel.deleteMany({}),
      TeamModel.deleteMany({}),
      ActivityModel.deleteMany({}),
      LeaderboardModel.deleteMany({}),
      WorkoutModel.deleteMany({})
    ]);

    const users = await UserModel.create([
      { name: 'Avery Athlete', email: 'avery@example.com', role: 'member' },
      { name: 'Jordan Jogger', email: 'jordan@example.com', role: 'trainer' },
      { name: 'Mia Marathon', email: 'mia@example.com', role: 'member' }
    ]);

    const workouts = await WorkoutModel.create([
      {
        name: 'Morning HIIT',
        description: 'High-intensity interval training to kick off the day.',
        durationMinutes: 25,
        difficulty: 'hard',
        exercises: ['burpees', 'jump squats', 'mountain climbers']
      },
      {
        name: 'Recovery Stretch',
        description: 'Gentle stretching to improve mobility and recovery.',
        durationMinutes: 20,
        difficulty: 'easy',
        exercises: ['hamstring stretch', 'quad stretch', 'shoulder rolls']
      }
    ]);

    const teams = await TeamModel.create([
      {
        name: 'Cardio Crew',
        description: 'Team focused on endurance training and runs.',
        captainId: users[1]._id,
        memberIds: [users[0]._id, users[2]._id]
      },
      {
        name: 'Strength Squad',
        description: 'A group dedicated to strength-building workouts.',
        captainId: users[2]._id,
        memberIds: [users[0]._id]
      }
    ]);

    const activities = await ActivityModel.create([
      {
        userId: users[0]._id,
        type: 'Run',
        durationMinutes: 35,
        caloriesBurned: 320,
        distanceKm: 6.2,
        notes: 'Steady moderate run with hills.'
      },
      {
        userId: users[2]._id,
        type: 'Yoga',
        durationMinutes: 45,
        caloriesBurned: 190,
        notes: 'Recovery session focusing on flexibility.'
      },
      {
        userId: users[0]._id,
        type: 'HIIT',
        durationMinutes: 25,
        caloriesBurned: 310,
        notes: 'Morning interval workout.'
      }
    ]);

    const leaderboard = await LeaderboardModel.create([
      { userId: users[0]._id, score: 980, rank: 1, category: 'overall' },
      { userId: users[2]._id, score: 860, rank: 2, category: 'overall' },
      { userId: users[1]._id, score: 760, rank: 3, category: 'overall' }
    ]);

    console.log('Inserted sample data:', {
      users: users.length,
      teams: teams.length,
      workouts: workouts.length,
      activities: activities.length,
      leaderboard: leaderboard.length
    });
    console.log('Database seeding complete');

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
