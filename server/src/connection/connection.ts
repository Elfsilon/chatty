import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export default new Sequelize('chatty', String(process.env.DB_USER), String(process.env.DB_PASSWORD), {
    host: String(process.env.DB_HOST),
    dialect: 'postgres'
});