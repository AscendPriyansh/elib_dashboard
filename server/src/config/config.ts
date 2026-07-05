import { config as conf } from "dotenv";

conf();

const _config = {
    port: process.env.PORT,
    db_uri: process.env.MONGO_CONNECTION_STRING,
    env: process.env.NODE_ENV,
    jwt_secret: process.env.JWT_SECRET,
    cloud_name: process.env.CLOUD_NAME,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
    frontend_domain: process.env.FRONTEND_DOMAIN
}

export const config = Object.freeze(_config);
