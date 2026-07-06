import { config as conf } from "dotenv";

conf();

const _config = {
    server_port: process.env.SERVER_PORT
}

export const config = Object.freeze(_config);