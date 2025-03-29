import { fakerES as faker } from "@faker-js/faker";
import { createHash } from "../common/utils/hashPassword.js";
import { userModel } from "../modules/users/user.model.js";


export const generateMockUsers = async (count = 50) => {
  const hashedPassword = await createHash("coder123"); 
  
  return Array.from({ length: count }, (_, i) => ({
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: `mockuser${i}@${faker.internet.domainName()}`,
    age: faker.number.int({ min: 18, max: 70 }),
    password: hashedPassword,
    role: faker.helpers.arrayElement(["user", "admin"]),
    pets: [], 
    createdAt: faker.date.past({ years: 1 }),
    updatedAt: faker.date.recent()
  }));
};


export const insertMockUsers = async (count) => {
  const mockUsers = await generateMockUsers(count);
  return await userModel.insertMany(mockUsers);
};