#!/bin/bash

# Add the alias to .bashrc
echo 'alias ccli="npx completium-cli"' >> ~/.bashrc

# Source the .bashrc to apply changes
source ~/.bashrc

echo "Setting executable permissions"
chmod +x /workspaces/archetype-vite-react-dc/backend/scripts/deploy_and_update_vite_env.sh

echo "Done"