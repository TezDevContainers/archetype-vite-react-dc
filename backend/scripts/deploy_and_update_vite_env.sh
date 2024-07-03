#!/bin/bash

# Check if a parameter is provided
if [ $# -eq 0 ]; then
    echo "Please provide a parameter: sandbox, ghost, or main"
    exit 1
fi

# Step 1: Load the backend .env file
source ../backend/.env

# Set variables based on the parameter
case $1 in
    sandbox)
        RPC_VAR="SANDBOX_TEZOS_RPC"
        NETWORK_VAR="SANDBOX_TEZOS_NETWORK_NAME"
        ;;
    ghost)
        RPC_VAR="GHOST_TEZOS_RPC"
        NETWORK_VAR="GHOST_TEZOS_NETWORK_NAME"
        ;;
    main)
        RPC_VAR="MAINNET_TEZOS_RPC"
        NETWORK_VAR="MAINNET_TEZOS_NETWORK_NAME"
        # Add confirmation for mainnet deployment
        echo "You are about to deploy a contract to mainnet. Are you sure you want to continue? (y/N)"
        read -r REPLY
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            echo "Deployment cancelled"
            exit 1
        fi
        ;;
    *)
        echo "Invalid parameter. Please use sandbox, ghost, or main"
        exit 1
        ;;
esac



# Step 2: Set the endpoint
npx completium-cli set endpoint ${!RPC_VAR}

# Step 3: Deploy the contract
if [ "$1" = "main" ]; then
    npx completium-cli deploy contracts/count.arl --parameters '{"start":0}'
else
    npx completium-cli deploy contracts/count.arl --parameters '{"start":0}' --force
fi

# Step 4: Retrieve the contract address
CONTRACT_ADDRESS=$(npx completium-cli show address count | grep KT1)

# Step 5: Update the .env file in the frontend folder
sed -i "s|VITE_CONTRACT_ADDRESS=.*|VITE_CONTRACT_ADDRESS=$CONTRACT_ADDRESS|" ../frontend/.env
sed -i "s|VITE_TEZOS_RPC=.*|VITE_TEZOS_RPC=${!RPC_VAR}|" ../frontend/.env
sed -i "s|VITE_TEZOS_NETWORK_NAME=.*|VITE_TEZOS_NETWORK_NAME=${!NETWORK_VAR}|" ../frontend/.env

