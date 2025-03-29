import { generateMockPets } from './pets.mocks.js';
import { generateMockUsers } from './user.mock.js';
import { petModel } from '../modules/pets/pet.model.js';
import { userModel } from '../modules/users/user.model.js';


export const insertMockData = async (usersCount = 0, petsCount = 0) => {
  const results = { users: [], pets: [] };
  

  if (usersCount > 0) {
    const mockUsers = await generateMockUsers(usersCount);
    results.users = await userModel.insertMany(mockUsers);
  }

  if (petsCount > 0) {
    const mockPets = generateMockPets(petsCount);
    results.pets = await petModel.insertMany(mockPets);
  }

  return results;
};


export const generateMockUsers = async (count = 50) => {
  
};


export const generateMockPets = (count = 50) => {
 
};