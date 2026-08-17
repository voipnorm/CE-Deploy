<h1 align="center">CE-Deploy</h1>

<p align="center">
  <strong>Bulk deployment and management for Cisco collaboration endpoints</strong>
</p>

<p align="center">
  <a href="https://github.com/voipnorm/CE-Deploy/releases/latest"><img src="https://img.shields.io/github/v/release/voipnorm/CE-Deploy?style=flat-square&color=0078D4" alt="Latest release"></a>
  <a href="https://github.com/voipnorm/CE-Deploy/releases"><img src="https://img.shields.io/github/downloads/voipnorm/CE-Deploy/total?style=flat-square&color=2ea44f" alt="Downloads"></a>
  <img src="https://img.shields.io/badge/platform-macOS%20%7C%20Windows-lightgrey?style=flat-square" alt="macOS and Windows">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="MIT License"></a>
</p>

<p align="center">
  <a href="https://github.com/voipnorm/CE-Deploy/releases/latest"><strong>Download the latest release</strong></a>
</p>

## Official release repository

This is the official public distribution repository for **CE-Deploy**. It hosts supported installers, release notes, and the metadata used by the application's auto-update service.

CE-Deploy's source code is maintained separately and is not published in this repository. You do not need to clone this repository, install npm packages, or build the application to use CE-Deploy.

## About CE-Deploy

CE-Deploy is a desktop application for deploying configurations, content, and customizations across fleets of Cisco collaboration endpoints. It supports:

- cloud-registered devices through the Webex Cloud API and OAuth;
- on-premises devices through direct IP connectivity; and
- RoomOS video devices and Cisco 9800 Series phones.

## Features

### Deployment

- JavaScript macros, including enable/disable, removal, and drift detection
- Branding packages, wallpapers, and UI Extensions
- Device configurations and digital-signage settings
- Contacts and phonebooks
- Device tags
- CA and service certificates

### Fleet management

- **PhonePilot** for remote interaction with Cisco 9800 Series phones
- **Config Auditor** for baseline comparison, drift detection, compliance scoring, and CSV export
- Reusable deployment templates and multi-step template chains
- Deployment history and scheduled or recurring jobs
- Multi-organization management
- SSH access for on-premises troubleshooting

## Download and install

Download CE-Deploy only from the [GitHub Releases page](https://github.com/voipnorm/CE-Deploy/releases/latest).

| Platform | Release asset |
| --- | --- |
| macOS (Apple silicon and Intel) | `CE-Deploy-{version}-universal.dmg` |
| Windows installer | `CE-Deploy-Installer.{version}.exe` |
| Windows portable | `CE-Deploy-Portable.{version}.exe` |

On macOS, open the DMG and drag CE-Deploy to Applications. On Windows, run the installer or use the portable executable.

## Connect

- **Webex cloud:** Sign in with a Webex administrator account through OAuth. CE-Deploy discovers the registered devices available to that account.
- **On-premises:** Add devices by IP address, range, or CSV import and provide appropriate local administrator credentials.

## Supported devices

CE-Deploy supports current Cisco collaboration endpoints running RoomOS and supported Cisco 9800 Series firmware, including:

- Room, Board, and Desk Series endpoints;
- Cisco Room Navigator controllers;
- Cisco 9800 Series desk and wireless phones; and
- supported legacy SX, MX, and DX endpoints running CE 9.x or later.

Device capabilities and Cisco platform support vary by model, firmware, and deployment mode.

## System requirements

- macOS 12 Monterey or later, on Apple silicon or Intel
- Windows 10 or later, 64-bit
- a Webex Full Administrator or Device Administrator account for cloud deployments
- HTTP/HTTPS and SSH network access for applicable on-premises operations

## Updates

CE-Deploy checks this repository's published releases for updates. Release assets include the installers and updater metadata required for supported macOS and Windows update paths. After the initial installation, the application can notify you when a newer release is available.

## Support and maintenance

CE-Deploy is maintained by **Chris Norman**. For release questions or support, use the contact options on the [maintainer's GitHub profile](https://github.com/voipnorm). When reporting a problem, include the CE-Deploy version, operating system, device model, and relevant non-sensitive error details.

## License

The repository materials are available under the [MIT License](LICENSE). Copyright © Chris Norman.

## Independent project

CE-Deploy is an independent project maintained and owned by Chris Norman. It is not affiliated with, endorsed by, sponsored by, or supported by Cisco Systems, Inc.
