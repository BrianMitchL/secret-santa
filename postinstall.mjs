import fs from 'node:fs';
import path from 'node:path';
import { URL, fileURLToPath } from 'node:url';
import { glob } from 'glob';

const giftExchangeUmdFiles = await glob(
  'node_modules/gift-exchange/dist/giftexchange.umd.*'
);

for (const filePath of giftExchangeUmdFiles) {
  const { base } = path.parse(filePath);

  const source = fileURLToPath(new URL(`./${filePath}`, import.meta.url));
  const dest = fileURLToPath(new URL(`./public/${base}`, import.meta.url));

  fs.copyFile(source, dest, (err) => {
    if (err) throw err;
  });
}

console.log(
  `copied ${giftExchangeUmdFiles.length} files from gift-exchange to public directory`
);
