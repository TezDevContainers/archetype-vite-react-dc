# Archetype tezos mini dApp

If you want to build a small working blockchain project fast, this is the repo for you.

This repo provides a complete developer workflow for a small tezos decentralised app (dApp)

The sample dapp is deployed to github pages: [tezdevcontainers.github.io/archetype-vite-react-dc/](https://tezdevcontainers.github.io/archetype-vite-react-dc/)

## Tech Stack

| **Stack**                       | **Tech**                                                                                                     |
|---------------------------------|-------------------------------------------------------------------------------------------------------------|
| **Blockchain**                  | [Tezos](https://tezos.com/)                                                                                  |
| **Contract**                    | [Archetype](https://archetype-lang.org/)                                                                     |
| **Contract Unit Testing**       | ts-mocha + [Completium](https://completium.com/)                                                             |
| **Wallet Integration**          | [Beacon](https://docs.walletbeacon.io/supported-wallets)                                                     |
| **Frontend UI**                 | [React](https://react.dev/learn) + Typescript                                                                |
| **Contract Dev Deployment**     | [Flextesa](https://claudebarde.medium.com/flextesa-the-swiss-army-knife-of-development-on-tezos-f2783fad966e) sandbox and/or ghostnet deployment via [Completium](https://completium.com/) |
| **Contract-Frontend Integration** | [Completium](https://completium.com/) typescript bindings + custom scripts                                  |
| **Frontend Dev Server**         | [Vite](https://vitejs.dev/)                                                                                  |
| **Frontend Unit Testing**       | Not implemented                                                                                              |
| **Serverless Deployment**       | [Vite](https://vitejs.dev/) + Github Pages                                                                   |

- Vite Polyfill issues handled with vite-plugin-node-polyfills
- Frontend State management uses react hooks e.g useContext and providers
- Sandbox compatibility issues handled with node version manager (nvm) 
 
Regarding the frontend unit testing, A PR including a basic frontend test that mocks a user connecting and making an entrypoint call would be welcomed. I'm thinking Jest but I haven't looked into the tools for unit tests related to mocking contract calls and on chain interactions.

## Development flow

The project is a yarn monorepo divided into two workspaces, frontend and backend.

**Backend Workspace:**
- Write your contract in archetype in the contracts file (the example contract is count.arl)
- Test your contract on a mockup chain using completium and ts-mocha with `yarn test` in the backend
- Start sandbox if using with `yarn s:start`
- Deploy your contract to a flextesa sandbox or ghostnet with completium. with `yarn s:deploy`. A script provided by this repo integrates your deployed contract with the frontend by updating relevant vite environment variables

**Frontend Workspace:**
- Run dApp locally with `yarn dev`
- Connect a wallet in your browswer to the sandbox or ghostnet. I found [temple wallet](https://templewallet.com/download) to be good for development as it is possible to turn off constant requests for your password. If using sandbox, get private key for user account (from backend workspace) with `yarn s:show-keys`
- Preview build with `yarn build && yarn preview`

**Deployment:**
- If you update your repo github pages settings to use github actions for deployment, the deploy.yaml script in the .github folder will automatically deploy your page to the github-page for that repo with every commit. Feel free to delete this file or change your repo settings to prevent this action. 

##  Devcontainers

This repo should be loaded as a devcontainer. Devcontainers are compatible with VScode and many other other IDEs.

You can run it straight from a repo using codespaces, or you can run it locally. I have tested it on both an m1 mac and an intel chip. For running the container locally, I recommend using the "Clone Repository in Container Volume" option from the vscode command palette when starting a devcontainer, otherwise file access can be laggy.

Most of the setup is handled by the devcontainer and associated scripts, but you do need to run a few commands yourself after creation...

If you are VERY new to practical development, VSCode, or devcontainers, Have a look at this [step-by-step guide](https://github.com/TezDevContainers/smartpy-dc) to getting a devcontainer running in your own repo on codespaces or locally on your own machine for a smartpy devcontainer. The instructions should be identical, just for a different repo.  

## Finalising the setup
A few final setup commands that must be run by you, dear reader, in an interactive shell after the devcontainer has been built.

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

## Running the dapp locally with a sandbox

As developing in a sandbox adds a potential point of failure, I recommend developing on ghostnet unless your project is especially sensitive. However, I have set this repo up so that you can develop on a sandbox if you like. I will walk through that example here. If developing on ghostnet, you can simply ignore the sandbox steps and substitute `s:deploy` for `g:deploy`

To test the sample dapp locally on the sandbox:

```
cd backend
// Test contract on mockup chain
yarn test
// Start the sandbox
yarn s:start
// This will start the sandbox and also print out private keys for the alice and bob accounts. Use one of these accounts to sign into your browser wallet on the sandbox. The default sandbox rpc is http://localhost:20000.
// Deploy the contract on the sandbox and integrate with your react dapp in the frontend
yarn s:deploy
// Start the frontend dev server
cd ..
cd frontend
yarn dev
// Now you should be able to view the dapp locally in your browser
```
## Scripts

### Backend
yarn scripts in the backend tend to be prepended with s, g or main for sandbox, ghostnet and mainnet.

**test-bind** - generates new typescript test bindings.
**test-only** - runs the local contract tests in the backend test folder with the completium mockup chain. If this is failing, try running `npx completium-cli mockup init` first.

**s:start** - starts the sandbox
**s:stop** - stops the sandbox
**s:show-keys** - shows the private keys for alice and bob so you can login with their accounts on your browser wallet.

**s:deploy, g:deploy, main:deploy** - Deploys your contract, and integrates it with your front end. Specifically, it calls `deploy_and_update_vite_env.sh` for the given network, then runs `yarn dapp-bind`. 

**deploy_and_update_vite_env.sh** - Deploys the contract to the sandbox, ghostnet or mainnet. This updates the frontend vite .env variables to reflect the appropriate network name, network address and the contract address. Set your preferred sandbox, ghostnet and mainnet RPC address in the backend .env file

**dapp-bind** - Creates the bindings that allow interaction with the contract from your react dapp. These bindings are saved into frontend/contract-bindings.  Note that these bindings are distinct from the bindings used for testing. 

The yarn deploy commands in the backend call the `deploy_and_update_vite_env.sh` script which explicitly defines how to deploy the contract. When you change the name of your contract, you will have to update the lines in this script that deploy the contract and send it the parameters. See https://completium.com/docs/dapp-first/contract/.

### Frontend

**yarn dev** - starts local vite server
**yarn build** - creates dist folder for deployment
**yarn preview** - preview your deployment build


### Github pages deployment

By default, the deploy.yml file in .github/workflows automatically attempts to build and deploy to the github page for that repo on push. To activate this, change the 'pages' settings in the repo to select the "deploy with actions" option. 

IMPORTANT: If you have been developing locally with a sandbox version of your contract the sandbox, and then deploy to github pages, your vite env variables will point to the sandbox network and sandbox contract in deployment, which will not work! You must run g:deploy (or main:deploy if you are truly finished!) immediately before deploying your app. Note that with the default workflow, the github page is redeployed with every push!

#### TODO 

- Update pages deployment to always run yarn g:deploy from backend before deployment so that the environment variables always refer to a ghostnet contract. More robust solution preferable but that should work. That will also need to run with node version 16 to work. Simple alternative - check if frontend .env network variable name is not 'sandbox' and do not permit deployment if it is.
