import { Router } from 'express';
import { generateMockPets } from './pets.mocks.js';
import { generateMockUsers } from './user.mock.js';
import { insertMockData } from './mock.service.js';

const router = Router();

router.get('/mockingpets', (req, res) => {
  try {
    const pets = generateMockPets();
    res.json({
      status: 'success',
      payload: pets,
      message: `${pets.length} mascotas generadas`
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});


router.get('/mockingusers', async (req, res) => {
  try {
    const users = await generateMockUsers();
    res.json({
      status: 'success',
      payload: users,
      message: `${users.length} usuarios generados`
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});


router.post('/generateData', async (req, res) => {
  try {
    const { users = 0, pets = 0 } = req.body;
    
    if (users === 0 && pets === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Debe especificar al menos users o pets'
      });
    }

    const result = await insertMockData(users, pets);
    
    res.json({
      status: 'success',
      payload: result,
      message: `Datos insertados: ${users} usuarios, ${pets} mascotas`
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

export default router;