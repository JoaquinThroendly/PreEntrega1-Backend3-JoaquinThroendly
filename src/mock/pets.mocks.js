import { fakerES as faker } from "@faker-js/faker";
import { petModel } from "../modules/pets/pet.model.js";


export const generateMockPets = (count = 50) => {
  return Array.from({ length: count }, () => ({
    name: faker.person.firstName(),
    type: faker.helpers.arrayElement(["dog", "cat", "rabbit", "bear", "bird", "capybara"]), // Usar type en inglés para consistencia con DB
    age: Math.floor(Math.random() * 15) + 1,
    birthDate: faker.date.past({ years: 15 }),
    image: faker.image.urlLoremFlickr({ category: "animals" }),
    createdAt: new Date(),
    updatedAt: new Date()
  }));
};


export const insertMockPets = async (count) => {
  const mockPets = generateMockPets(count);
  return await petModel.insertMany(mockPets);
};