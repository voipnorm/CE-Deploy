<h1 align="center">CE-Deploy</h1>

<p align="center">
  <strong>Bulk deployment and management tool for Cisco Webex collaboration endpoints</strong>
</p>

<p align="center">
  <a href="https://github.com/voipnorm/CE-Deploy/releases/latest"><img src="https://img.shields.io/github/v/release/voipnorm/CE-Deploy?style=flat-square&color=0078D4" alt="Latest Release"></a>
  <a href="https://github.com/voipnorm/CE-Deploy/releases"><img src="https://img.shields.io/github/downloads/voipnorm/CE-Deploy/total?style=flat-square&color=2ea44f" alt="Downloads"></a>
  <a href="https://github.com/voipnorm/CE-Deploy/stargazers"><img src="https://img.shields.io/github/stars/voipnorm/CE-Deploy?style=flat-square" alt="Stars"></a>
  <img src="https://img.shields.io/badge/platform-macOS%20%7C%20Windows-lightgrey?style=flat-square" alt="Platform">
  <a href="LICENSE.md"><img src="https://img.shields.io/badge/license-Cisco%20Sample%20Code-blue?style=flat-square" alt="License"></a>
</p>

<p align="center">
  <a href="https://github.com/voipnorm/CE-Deploy/releases/latest">Download Latest Release</a> ·
  <a href="#features">Features</a> ·
  <a href="#getting-started">Getting Started</a> ·
  <a href="#supported-devices">Supported Devices</a>
</p>

---

## What is CE-Deploy?

CE-Deploy is a desktop application for **bulk deploying configurations, content, and customizations** to Cisco Webex collaboration endpoints — RoomOS video devices and 9800 series phones alike. It eliminates the need to configure devices one at a time through Control Hub or CUCM by providing a single interface to push changes to your entire fleet.

Whether you're managing 10 devices or 10,000, CE-Deploy handles:
- **Cloud-registered** devices via the Webex Cloud API (OAuth)
- **On-premises** devices via direct IP connectivity (SSH/HTTP)

> **This is a pre-built desktop application.** Download the installer from the [Releases](https://github.com/voipnorm/CE-Deploy/releases/latest) page — no source code, `npm install`, or build steps required.

---

## Features

### Deployment Capabilities

| Feature | Cloud | On-Prem | Description |
|---------|:-----:|:-------:|-------------|
| **Macros** | ✅ | ✅ | Deploy JavaScript macros to devices in bulk. Supports macro enable/disable, removal, and drift detection. |
| **Branding** | ✅ | ✅ | Push custom branding packages (logos, background images, color schemes) to your fleet. |
| **Wallpapers** | ✅ | ✅ | Deploy custom wallpaper images to device screens. |
| **UI Extensions** | ✅ | ✅ | Deploy Touch 10 / Navigator custom panels and controls. |
| **Device Configuration** | ✅ | ✅ | Push xConfiguration settings in bulk — audio, video, network, peripherals, and more. |
| **Digital Signage** | ✅ | ✅ | Configure web-based signage URLs, refresh intervals, and schedules for lobby displays. |
| **Contacts / Phonebook** | ✅ | ✅ | Create and deploy phonebook directory structures with nested folders and speed dials. |
| **Device Tags** | ✅ | ❌ | Manage and deploy Webex device tags at scale with tag schema templates. |
| **Certificates** | ✅ | ❌ | Deploy CA and service certificates to devices in bulk. |

### Management Tools

- **PhonePilot** — Live, interactive phone emulator for Webex 9800 series phones. View the screen, press buttons, and take screenshots remotely.
- **Config Auditor** — Compare device configurations against a golden baseline. Detect drift across your fleet with category-level compliance scoring and CSV export.
- **Macro Drift Detection** — Identify devices running out-of-date macros vs. approved baselines. View diffs and push corrections.
- **Deployment Templates** — Save and reuse deployment configurations. Apply consistent settings across organizations with a single click.
- **Template Chains** — Sequence multiple deployment templates into automated multi-step workflows.
- **Deployment History** — Browse, search, and repeat past deployments. Full audit trail with one-click re-deploy.
- **Tag Schema Builder** — Build structured tag schemas from cloud metadata (locations, products, room types) for organized fleet management.
- **Deployment Scheduler** — Schedule deployments for future execution or set up recurring jobs.
- **SSH Terminal** — Direct SSH access to on-premises devices for troubleshooting and ad-hoc commands.

### Operational Features

- **Multi-Organization Support** — Switch between multiple Webex orgs and on-prem environments from a single app instance.
- **Auto-Update** — Built-in update mechanism keeps CE-Deploy current with the latest features and fixes.
- **Built-in Documentation** — Comprehensive help docs accessible directly within the application.
- **What's New** — Version-gated feature announcements highlight new capabilities after each update.
- **Office Hours & Scheduling** — Configure display standby schedules and office hours policies.

---

## Getting Started

### 1. Download

Go to the **[Releases](https://github.com/voipnorm/CE-Deploy/releases/latest)** page and download the installer for your platform:

| Platform | File |
|----------|------|
| **macOS** (Apple Silicon & Intel) | `CE-Deploy-{version}-universal.dmg` |
| **Windows** | `CE-Deploy-{version}-win-x64.exe` |

### 2. Install

- **macOS**: Open the `.dmg` and drag CE-Deploy to your Applications folder.
- **Windows**: Run the `.exe` installer. CE-Deploy will be added to your Start Menu.

### 3. Connect

- **Cloud (Webex)**: Sign in with your Webex admin account via OAuth. CE-Deploy will automatically discover your registered devices.
- **On-Premises**: Add an organization with device IPs (single IP, range, or CSV import) and local admin credentials.

---

## Supported Devices

CE-Deploy works with Cisco collaboration endpoints running **RoomOS** and **9800 series** firmware:

- **Webex Room Series** — Room Kit, Room Kit Mini, Room Kit Plus, Room Kit Pro, Room 55, Room 70, Room Panorama
- **Webex Board Series** — Board 55, Board 70, Board 85, Board Pro
- **Webex Desk Series** — Desk, Desk Pro, Desk Mini, Desk Hub
- **Cisco 9800 Series Phones** — 9841, 9851, 9861, 9871 (desk and wireless)
- **Cisco Room Navigator** — Touch panel controller
- **Legacy CE Devices** — SX, MX, and DX series (CE 9.x firmware or later)

---

## Requirements

- **macOS** 12 (Monterey) or later — Apple Silicon and Intel supported
- **Windows** 10 or later (64-bit)
- **Webex Admin Account** (for cloud deployments) with Full Administrator or Device Administrator role
- **Network Access** to devices (for on-premises deployments) — HTTP/HTTPS and SSH

---

## Auto-Update

CE-Deploy includes a built-in auto-update service. When a new release is published here, the application will detect it and prompt you to update. No manual download required after initial install.

---

## Source Code

The source code for CE-Deploy is maintained in a **private repository**. This public repository hosts the release binaries, changelogs, and auto-update feed. If you have questions or feature requests, please open an [Issue](https://github.com/voipnorm/CE-Deploy/issues).

---

## Team

| Name | Role |
|------|------|
| **Chris Norman** | Lead Developer — Enterprise |

---

## License

This project is licensed under the [Cisco Sample Code License](LICENSE.md).

---

<p align="center">
  <sub>Built with Electron · Powered by the Webex Cloud API and xAPI</sub>
</p>
