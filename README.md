# Card Races

A serverless social card game

### Prerequisites

#### Install Node & NPM
Windows  
1. Open Powershell
2. Run `Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))`
3. Run `choco install -y node-lts`

Mac OSX
1. Open terminal
2. Run `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
3. Run `brew install node`  

#### Install .NET
Windows
1. Download .NET https://learn.microsoft.com/en-us/dotnet/core/install/windows

Mac OSX
1. Download .NET https://learn.microsoft.com/en-us/dotnet/core/install/macos

#### Install Azure CLI
Windows
1. Open Powershell
2. Run `choco install azure-cli`

Mac OSX
1. Open terminal
1. Run `brew update && brew install azure-cli`

### Setting up Azure Functions
1. Run `az functionapp create -g card-races-functions-dev -n card-races-function-app --consumption-plan-location eastus2 --runtime dotnet --functions-version 4 --storage-account card-races-storage-account`

### Setting up Angular app
1. In shell run cd ~/your/project/location/client
2. Run `npm ci`

### Developing
Backend
1. Repeat step `az functionapp create -g card-races-functions-dev -n card-races-function-app --consumption-plan-location eastus2 --runtime dotnet --functions-version 4 --storage-account card-races-storage-account` after changes OR remote debug function app

Front end
1. Replace functionApp url with url of your function app
2. Run `npm start`

### To use the GitHub Actions

1. You will need to generate an azure service principal and add it into the the repositories secrets under `AZURE_CREDENTIALS`
2. You will also need to add a `AZURE_SUBSCRIPTION_ID` of your Azure subscription id

### Deployment
#### Development
After configuring GitHub Actions, run the `Provision Environment` action under the development environment.  Once this has been ran anytime a pull request is merged into main the action will automatically deploy to development environment in Azure the changes.

#### Test or Production
1. You will need to manually run `Build and deploy angular app` action and then choose the enviroment you wish to deploy to (test or production).
2. You will need to manually run `Build and deploy azure functions` action and then choose the environment you wish to deploy to (test or production).

### Teardown
To tear down the environment, simply choose run the `Teardown environment` action and choose the environment you wish to teardown.


