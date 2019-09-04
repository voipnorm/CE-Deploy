[![published](https://static.production.devnetcloud.com/codeexchange/assets/images/devnet-published.svg)](https://developer.cisco.com/codeexchange/github/repo/voipnorm/InRoom-Macro-Deployer)
# CE Macro RoomControl Deployment Tool (CEDeploy)

Deployment desktop application for deploying Macros and In-Room control to Webex Room Kit devices.


## Business/Technical Challenge

As Webex Room Device are deployed leveraging Macros and In-Room controls allows customers to leverage more functionality by building custom interfaces and function on Room Kit devices. Today, cloud registered devices have no way of deploying Macros and In-Room control files en-mass. Every endpoint has to be accessed via a web admin interface to upload or update
macro or in-room control files. A slow and painful process for a video administrator when there are large numbers of endpoints. 

This is also a problems for administrator of on-premise deployment by requiring complex server infastructure and processes to deploy files.

## Proposed Solution

Utilizing open source technologies and the Webex Room Kit API's build a desktop application capable of delivering macro and in-room control files to endpoints easily. This would reduce the time to deploy and update endpoint files and give administrators more control of cloud and on-premise endpoint deployments.

### Cisco Products Technologies/ Services
Our solution will levegerage the following Cisco technologies
* [Cisco Webex Room Devices](https://www.cisco.com/c/en/us/products/collaboration-endpoints/webex-room-series/index.html)
* [Cisco Webex Cloud](https://collaborationhelp.cisco.com/article/en-us/n4lhv2s)
* [Cisco Webex Room API's](https://www.cisco.com/c/dam/en/us/td/docs/telepresence/endpoint/ce96/collaboration-endpoint-software-api-reference-guide-ce96.pdf)
* [Nodejs](https://nodejs.org/en/)
* [Electron Framework](https://electronjs.org/)

## Team Members

* Steve Greenberg <stgreenb@cisco.com> - America's Partner Org
* Chris Norman <christno@cisco.com> - Enterprise

## Solution Components


<!-- This does not need to be completed during the initial submission phase  

Provide a brief overview of the components involved with this project. e.g Python /  -->

This solution is based on Electron which is built on JavaScript, HTML, and CSS. The desktop application
CE-Deploy is compatible with Cisco video devices running CE firmware 9.x and greater. While some
features may support earlier versions of firmware including TC formware trains.

For documentation of tool usage clone the repo, perform a npm install to install all dependencies. and build the solution using
    
    git clone https://github.com/voipnorm/InRoom-Macro-Deployer.git
    npm install
    npm run dist
  
To run the project before performing a build:

    npm start


## Usage

<!-- This does not need to be completed during the initial submission phase  

Provide a brief overview of how to use the solution  -->

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

Components required to depoly various features:

* CSV file formated with endpoints to be deployed
* Local user name and password for admin enabled account.






## Installation

To download and install this project:

    git clone https://github.com/voipnorm/InRoom-Macro-Deployer.git
    npm install
    npm run dist
  
To run the project before performing a build:

    npm start



## Documentation

Documention on tool usage are part of the actual build. 


## License

Provided under Cisco Sample Code License, for details see [LICENSE](./LICENSE.md)

## Code of Conduct

Our code of conduct is available [here](./CODE_OF_CONDUCT.md)

## Contributing

See our contributing guidelines [here](./CONTRIBUTING.md)
