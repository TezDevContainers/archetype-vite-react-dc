#!/bin/sh
sudo apt-get update -y
sudo apt-get install software-properties-common -y
sudo add-apt-repository -y "ppa:serokell/tezos"
sudo apt-get update -y
sudo apt-get install -y tezos-client