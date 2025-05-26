import { readdir, rename } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const folderPath = join(__dirname, '../public/lotus');

try {
    const files = await readdir(folderPath);

    for (const file of files) {
        const oldPath = join(folderPath, file);
        const newFileName = `lotus_${file}`;
        const newPath = join(folderPath, newFileName);

        await rename(oldPath, newPath);
        console.log(`Renamed ${file} to ${newFileName}`);
    }
} catch (err) {
    console.error('Error:', err);
}



// to run this
// -> cd "/home/lucentinnovation/Other Files/Work/Practical Task/real-walk/scripts"
// // node rename_images.mjs