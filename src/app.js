import express from "express";
import envsConfig from "./config/envs.config.js";
import { connectDB } from "./config/mongoDb.config.js";
import router from "./common/router.js";
import { customError } from "./common/errors/customError.js";
import mocksRouter from '../mock/mocks.router.js';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './modules/users/user.swagger.js'; 

const app = express();


connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(
  '/api-docs/users',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customSiteTitle: "Users API Documentation",
    customfavIcon: "/favicon.ico",
    customCss: '.swagger-ui .topbar { background-color: #2c3e50 }' 
  })
);

app.use("/api", router);
app.use("/api/mocks", mocksRouter);


app.use(customError);


app.listen(envsConfig.PORT, () => {
  console.log(`✅ Servidor activo en puerto ${envsConfig.PORT}`);
  console.log(`📚 Users API Docs: http://localhost:${envsConfig.PORT}/api-docs/users`);
  console.log(`🔌 Mocks: http://localhost:${envsConfig.PORT}/api/mocks`);
});

export default app;