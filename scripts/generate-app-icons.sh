# Exit the script on any command with non 0 return code
set -e

pnpm dlx sharp-cli -i ./src/images/app-icons/logo.png -o ./static/icons/16x16.png resize 16
pnpm dlx sharp-cli -i ./src/images/app-icons/logo.png -o ./static/icons/32x32.png resize 32
pnpm dlx sharp-cli -i ./src/images/app-icons/logo.png -o ./static/icons/96x96.png resize 96
pnpm dlx sharp-cli -i ./src/images/app-icons/logo.png -o ./static/icons/512x512.png resize 512
pnpm dlx sharp-cli -i ./src/images/app-icons/logo.png -o ./static/icons/384x384.png resize 384
pnpm dlx sharp-cli -i ./src/images/app-icons/logo.png -o ./static/icons/256x256.png resize 256
pnpm dlx sharp-cli -i ./src/images/app-icons/logo.png -o ./static/icons/192x192.png resize 192
pnpm dlx sharp-cli -i ./src/images/app-icons/logo.png -o ./static/icons/144x144.png resize 144
pnpm dlx sharp-cli -i ./src/images/app-icons/logo.png -o ./static/icons/96x96.png resize 96
pnpm dlx sharp-cli -i ./src/images/app-icons/logo.png -o ./static/icons/48x48.png resize 48
pnpm dlx sharp-cli -i ./src/images/app-icons/logo.png -o ./static/icons/180x180.png resize 180
pnpm dlx sharp-cli -i ./src/images/app-icons/logo.png -o ./static/icons/152x152.png resize 152
pnpm dlx sharp-cli -i ./src/images/app-icons/logo.png -o ./static/icons/144x144.png resize 144
pnpm dlx sharp-cli -i ./src/images/app-icons/logo.png -o ./static/icons/120x120.png resize 120
pnpm dlx sharp-cli -i ./src/images/app-icons/logo.png -o ./static/icons/114x114.png resize 114
pnpm dlx sharp-cli -i ./src/images/app-icons/logo.png -o ./static/icons/76x76.png resize 76
pnpm dlx sharp-cli -i ./src/images/app-icons/logo.png -o ./static/icons/72x72.png resize 72
pnpm dlx sharp-cli -i ./src/images/app-icons/logo.png -o ./static/icons/60x60.png resize 60
pnpm dlx sharp-cli -i ./src/images/app-icons/logo.png -o ./static/icons/57x57.png resize 57
