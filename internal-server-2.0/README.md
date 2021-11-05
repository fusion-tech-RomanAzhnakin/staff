# Fusion tech internal server

## Setup project:
### Dependencies:
1. Run `npm install`
2. You can seturp env variables in two ways. Using `.json` file or `.env` file.
    - **Using `.json`:** Create file `localConfig.json` in the `./config/` directory. Add required fields to this file in the root of the object (without the env keys). Check the `./config/defaultConfig.json` file as a sample.
    - **Using `.env`:** Create file `.env` in the root directory. Add required fields to this file. Check the `./.env_sample` file as a sample.
3. Required dependencies:
    - Postgres

    **Optional** You need to have a Docker installed on the your machine. Use `npm run runRelations` script to up all required dependencies in the Docker.
4. Run `npm run migrate` script.

## Run in `dev` mode:
1. Run `npm start`

## Run in `production` mode:
1. Run `pm2 start ecosystem.config.js`