# mcskinviewer
![sample text: mlg 360 noscope](https://github.com/SinanAkkoyun/mcskinviewer/blob/main/assets/preview_window.png?raw=true)

Display Minecraft Skins from the comfort of your CLI!

```sh
mcskinviewer ./path/to/steve.png --name=Steve --on-top
```

Currently only supports PNG files (no auto-fetching of usernames right now)

## Installation

### Install from releases
Download the latest release from [releases](https://github.com/SinanAkkoyun/mcskinviewer/releases) page and install it with `dpkg`:
```sh
wget https://github.com/SinanAkkoyun/mcskinviewer/releases/download/{latest_release}/mcskinviewer_{your_version}_amd64.deb
dpkg -i mcskinviewer_{your_version}_amd64.deb
```

### Building from source
```sh
git clone https://github.com/SinanAkkoyun/mcskinviewer
cd mcskinviewer

npm i
npm run dist

sudo dpkg -i dist/mcskinviewer_{your_version}_amd64.deb
```

## DISCLAIMER
This project was quickly hacked together and has not been tested in any way. Use at your own risk.
