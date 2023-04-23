[![published](https://static.production.devnetcloud.com/codeexchange/assets/images/devnet-published.svg)](https://developer.cisco.com/codeexchange/github/repo/voipnorm/InRoom-Macro-Deployer)
# CE Feature Deployment Tool (CE-Deploy)

# This code is for demonstration purposes only and not regularly maintained. Check the releases section to find the latest build for Mac and Windows which have a regular release cycle.

[Releases](https://github.com/voipnorm/CE-Deploy/releases)

# The code for the releases is maintained in a seperate private repo.

Desktop application for deploying CE based device features to Webex Room devices.

Deployment of the following features:
* Wallpapers
* Macro Files
* Touch 10 UI controls
* Download logs for troubleshooting
* Digital Signage
* Branding
* Webex Board Touch 10 enablement
* Disable Webex Assistant


## Business/Technical Challenge

Not every feature and function of Webex Room devices is controllable from a administrative interface regardless of on-premise or in the cloud. 
CE-Deploy helps to solve some of the most common or hard to deploy features at a large scale with a simple desktop tool.


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

This solution is based on Electron which is built on JavaScript, Chrome and Nodejs.
CE-Deploy is compatible with Cisco video devices running CE firmware 9.x and greater. Some
features may support earlier versions of firmware including TC formware trains 
but this has not been tested or supported.

##Installation:

    git clone https://github.com/voipnorm/CE-Deploy.git
    cd CE-Deploy
    npm install
    
To run the project:

    npm start

To perform a build:

    npm run dist
    
## Usage

CE-Deploy provides a desktop application for deploying the following features to CE 
firmware based Cisco video endpoints in mass:

* Wallpapers
* Macro Files
* Touch 10 UI controls
* Download logs for toubleshooting
* Digital Signage
* Branding

Many of these components can be deployed from CUCM or TMC but typically it is not an easy
Task to perform or take multiple configuratio steps to complete. CE-Deploy makes it simple to 
deploy to multiple endpoints.

Components required to deploy various features:

* CSV file with endpoints to be deployed.
* Local user name and password for admin enabled account.
## User Documentation
User documentation for CE-Deploy is built into the tool. For reference check docs.html. 

##License
[CISCO SAMPLE CODE LICENSE](LICENSE.md) 

