# Home Assistant Add-on: eufy-security-ws-plus

![Logo][logo]

[![Release][release-shield]][release] ![Project Maintenance][maintenance-shield]

![Supports aarch64 Architecture][aarch64-shield] [![Docker aarch64 Pulls][docker-aarch64-shield]][docker-aarch64]

![Supports amd64 Architecture][amd64-shield] [![Docker amd64 Pulls][docker-amd64-shield]][docker-amd64]

![Supports armhf Architecture][armhf-shield] [![Docker armhf Pulls][docker-armhf-shield]][docker-armhf]

![Supports armv7 Architecture][armv7-shield] [![Docker armv7 Pulls][docker-armv7-shield]][docker-armv7]

![Supports i386 Architecture][i386-shield] [![Docker i386 Pulls][docker-i386-shield]][docker-i386]

This is a local fork of `bropat/hassio-eufy-security-ws` with an experimental
compatibility patch for Eufy T85L1 smart locks.

The patch teaches the bundled `eufy-security-client` that device type `211`
and serial prefix `T85L1` should be handled like the newer Wi-Fi smart lock
family for metadata, websocket properties, and smart-lock P2P commands.

The immediate target is to expose working Home Assistant entities for:

- lock state
- lock/unlock
- battery percentage
- low battery
- lock settings exposed by the Eufy websocket API

Install this as a Home Assistant local add-on or publish it as an add-on
repository, then point the HACS `eufy_security` integration at the add-on port.
For side-by-side testing with the stock add-on, use port `3006`.

For GitHub publishing, use a local `.env` based on `.env.example`. That file is
only for repo publishing credentials and is separate from any Home Assistant or
Eufy account settings.

See Documentation tab for the inherited upstream add-on options.

[logo]: https://raw.githubusercontent.com/bropat/hassio-eufy-security-ws/master/eufy-security-ws/logo.png
[docker-amd64-shield]: https://img.shields.io/docker/pulls/bropat/hassio-eufy-security-ws-amd64?label=docker%20pulls%20amd64&logo=docker
[docker-amd64]: https://hub.docker.com/repository/docker/bropat/hassio-eufy-security-ws-amd64/general
[docker-aarch64-shield]: https://img.shields.io/docker/pulls/bropat/hassio-eufy-security-ws-aarch64?label=docker%20pulls%20aarch64&logo=docker
[docker-aarch64]: https://hub.docker.com/repository/docker/bropat/hassio-eufy-security-ws-aarch64/general
[docker-armhf-shield]: https://img.shields.io/docker/pulls/bropat/hassio-eufy-security-ws-armhf?label=docker%20pulls%20armhf&logo=docker
[docker-armhf]: https://hub.docker.com/repository/docker/bropat/hassio-eufy-security-ws-armhf/general
[docker-armv7-shield]: https://img.shields.io/docker/pulls/bropat/hassio-eufy-security-ws-armv7?label=docker%20pulls%20armv7&logo=docker
[docker-armv7]: https://hub.docker.com/repository/docker/bropat/hassio-eufy-security-ws-armv7/general
[docker-i386-shield]: https://img.shields.io/docker/pulls/bropat/hassio-eufy-security-ws-i386?label=docker%20pulls%20i386&logo=docker
[docker-i386]: https://hub.docker.com/repository/docker/bropat/hassio-eufy-security-ws-i386/general
[aarch64-shield]: https://img.shields.io/badge/aarch64-yes-green.svg
[amd64-shield]: https://img.shields.io/badge/amd64-yes-green.svg
[armhf-shield]: https://img.shields.io/badge/armhf-yes-green.svg
[armv7-shield]: https://img.shields.io/badge/armv7-yes-green.svg
[i386-shield]: https://img.shields.io/badge/i386-yes-green.svg
[maintenance-shield]: https://img.shields.io/maintenance/yes/2024.svg
[release-shield]: https://img.shields.io/badge/version-v1.9.3-blue.svg
[release]: https://github.com/bropat/eufy-security-ws/releases/tag/1.9.3
Join us on Discord:

<a target="_blank" href="https://discord.gg/5wjQ2asb64"><img src="https://dcbadge.limes.pink/api/server/5wjQ2asb64" alt="" /></a>
