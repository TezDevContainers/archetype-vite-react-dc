A few final setup commands that must be run in an interactive shell:

```
//ccli is a recommended alias for convenience
echo 'alias ccli="npx completium-cli"' >> ~/.bashrc
source ~/.bashrc
// Downgrading to node version 16 is necessary for compatibility with flextesa sandbox (as of July 3 2024)
nvm install 16
nvm use 16
//Completium initialisation
ccli init
ccli mockup init
```


### Backend
yarn scripts in the backend tend to be prepended with s, g or main for sandbox, ghostnet and mainnet.

test - generates new typescript bindings from the contract in the contract folder and runs the tests in the test folder locally on the mockup chain
test-only - just runs the test without gener
s:start - starts the sandbox
s:update - deploys the contract to the sandbox and updates the vite env variables in the frontend to reflect the sandbox network name, network address and the contract address.


The yarn update commands in the backend call the `deploy_and_update_vite_env.sh` script which explicitly defines how to deploy the contract. When you change the name of your contract, you will have to update the lines in this script that deploy the contract and send it the parameters. See https://completium.com/docs/dapp-first/contract/.

### Frontend

yarn dev - starts local vite server
yarn build - creates dist folder for deployment.

### Github pages deployment

By default, the deploy.yml file in .github/workflows automatically attempts to build and deploy to the github page for that repo on push. To activate this, change the 'pages' settings in the repo to select the "deploy with actions" option. 


Sandbox resource:

https://claudebarde.medium.com/flextesa-the-swiss-army-knife-of-development-on-tezos-f2783fad966e



Archetype
Vite
React
Typescript
Tezos
Devcontainer




- vite polyfill issue handled (common blocker)
- scripts for handling ghost vs sandbox testing and deployment and automating updating contract variables and bindings for front end
- working test and deploy to sandbox
- sandbox issues with node handled (common blocker)
- Aspects covered in dev cycle: writing contract, mockup test, deploy and bind to frontend automated with script, interact on sandbox, deploy to ghostnet, build, preview and deploy with vite 
- missing: front end tests that include interaction with ghostnet or sandbox - simulating user interactions via wallet
- events and emit example in frontend

TODO 

- Update pages deployment to always run yarn g:update from backend before deployment so that the environment variables always refer to a ghostnet contract. More robust solution preferable but that should work. That will also need to run with node version 16 to work. Simple alternative - check if frontend .env network variable name is not 'sandbox' and do not permit deployment if it is.
