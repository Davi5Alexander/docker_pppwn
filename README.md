# PPPwn in Docker

This repository contains Docker files to run PPPwn, developed by TheOfficialFloW, easily using an Alpine image. It's ideal for running on a Raspberry Pi with a dedicated USB to Ethernet port for the PS4. PPPwn is a kernel remote code execution exploit for PlayStation 4 up to FW 11.00. It's a proof-of-concept exploit for [CVE-2006-4304](https://hackerone.com/reports/2177925) that was responsibly reported to PlayStation. I was inspired by [PI-Pwn](https://github.com/stooged/PI-Pwn).

## Requirements

- Docker installed on your system.
- Ethernet cable.
- USB with [GoldHen](https://github.com/GoldHEN/GoldHEN) (only for the first time).

## Usage

1. Copy the `Dockerfile.pppwn` and `docker-compose.yml` files.
2. Edit `docker-compose.yml` and change the values of INTERFACE and FIRMWAREVERSION.
3. Run `docker-compose up -d`.
4. Turn on the PS4.

On your PS4 (first time):

1. Insert the USB with `goldhen.bin` into the PS4.
2. Go to Settings and then to Network.
3. Select Set Up Internet Connection and choose Use a LAN Cable.
4. Choose Custom Setup and select PPPoE for IP Address Settings.
5. Enter anything for PPPoE User ID and PPPoE Password.
6. Choose Automatic for DNS Settings and MTU Settings.
7. Choose Do Not Use for Proxy Server.