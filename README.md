[![published](https://static.production.devnetcloud.com/codeexchange/assets/images/devnet-published.svg)](https://developer.cisco.com/codeexchange/github/repo/voipnorm/InRoom-Macro-Deployer)
# CE Feature Deployment Tool (CE-Deploy)

Desktop application for deploying CE based device features to Webex Room devices.

Supports deployment of the following features:

* Wallpapers
* Macro Files
* Touch 10 UI controls
* Download logs for troubleshooting
* Digital Signage
* Branding
* Webex Board Touch 10 enablement
* Disable Webex Assistant

## Business/Technical Challenge

Not every feature and function of Webex Room devices is controllable from an administrative interface regardless of whether it is on-premise or in the cloud. 
CE-Deploy helps to automate pushing some of the most common or hard to deploy features at a large scale with a simple desktop tool.

### Cisco Products Technologies/ Services

CE-Deploy leverages the following technologies:

* [Cisco Webex Room Devices](https://www.cisco.com/c/en/us/products/collaboration-endpoints/webex-room-series/index.html)
* [Cisco Webex Cloud](https://collaborationhelp.cisco.com/article/en-us/n4lhv2s)
* [Cisco Webex Room xAPI's](https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/ce96/collaboration-endpoint-software-api-reference-guide-ce96.pdf)
* [Nodejs](https://nodejs.org/en/)
* [Electron Framework](https://electronjs.org/)

## Team Members

* Steve Greenberg <stgreenb@cisco.com> - America's Partner Org
* Chris Norman <christno@cisco.com> - Enterprise

## Solution Components

This solution is based on [Electron](https://www.electronjs.org/) which is built on JavaScript, Google Chrome and Nodejs.

CE-Deploy is compatible with Cisco video devices running CE firmware 9.x and greater. Some features may support earlier versions of firmware including TC firmware trains, but this has not been tested or supported.

## Installation:

```bash
git clone https://github.com/voipnorm/CE-Deploy.git
npm install
cd CE-Deploy
```
    
To run the project:

```bash
npm start
```

To perform a build:

```bash
npm run dist
```

## Usage

CE-Deploy provides a desktop application for deploying the following features to CE firmware based Cisco video endpoints _en masse_:

* Wallpapers
* Macro Files
* Touch 10 UI controls
* Download logs for toubleshooting
* Digital Signage
* Branding

Many of these components can be deployed from CUCM or TMC but typically it is not an easy task to perform or takes multiple configuration steps to complete. CE-Deploy makes it simple to deploy to multiple endpoints.

Components required to deploy various features:

* CSV file with endpoints to be deployed.
* Local user name and password for admin enabled account.

## User Documentation

User documentation for CE-Deploy is built into the tool. For reference check `docs.html` 

## License

[CISCO SAMPLE CODE LICENSE](LICENSE.md) 

