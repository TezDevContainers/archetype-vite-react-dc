#!/bin/bash

# Step 1: Set the endpoint
npx completium-cli set endpoint https://ghostnet.smartpy.io

# Step 2: Deploy the contract
npx completium-cli deploy contracts/count.arl --parameters '{"start":0}' --force

# Step 3: Retrieve the contract address
CONTRACT_ADDRESS=$(npx completium-cli show address count | grep KT1)

# Step 4: Update the .env file in the frontend folder
sed -i "s|VITE_GHOST_CONTRACT_ADDRESS=.*|VITE_GHOST_CONTRACT_ADDRESS=$CONTRACT_ADDRESS|" ../frontend/.env

# Step 5: Run yarn dapp-bind
yarn dapp-bind
