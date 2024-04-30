const { openSkin } = require('./index.js');

const skinPath = process.argv[2] ?? '/home/ai/.mc/ai/skin/minecraft_skin_generator/kieling.png';
const name = process.argv[3] ?? 'Andreas_Kieling';

openSkin(skinPath, name);