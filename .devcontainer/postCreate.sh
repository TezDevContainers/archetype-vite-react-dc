#!/bin/sh
sudo apt-get update -y
sudo apt-get install software-properties-common -y
sudo add-apt-repository -y "ppa:serokell/tezos"
sudo apt-get update -y
sudo apt-get install -y tezos-client
yarn install
npx completium-cli init
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash