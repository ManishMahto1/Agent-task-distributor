import { z } from 'zod';
//import { env } from 'node:process';
// Define the schema for environment variables
const envSchema = z.object({
    MONGO_URI: z.string().min(1, "MONGO_URI is required"),
    JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
    PORT: z.string().default("5000"),
});
// Validate environment variables
const env = envSchema.parse(process.env);
export { env };
