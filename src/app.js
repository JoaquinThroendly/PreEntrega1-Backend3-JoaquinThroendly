import express from "express";
import envsConfig from "./config/envs.config.js";
import { connectDB } from "./config/mongoDb.config.js";
import router from "./common/router.js";
import { customError } from "./common/errors/customError.js";
import mocksRouter from '../mock/mocks.router.js';

const app = express();


connectDB();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api", router); 
app.use("/api/mocks", mocksRouter); 


app.use(customError);


app.listen(envsConfig.PORT, () => {
  console.log(`✅ Servidor activo en puerto ${envsConfig.PORT}`);
  console.log(`🔌 Mocks disponibles en /api/mocks`);
});

export default app; 