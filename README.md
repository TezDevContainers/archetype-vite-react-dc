A few final setup commands that must be run in an interactive shell:

```
echo 'alias ccli="npx completium-cli"' >> ~/.bashrc
source ~/.bashrc
nvm install 16
nvm use 16
ccli init
ccli mockup init
```

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