import { copyFile } from 'node:fs';
import { glob } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, URL } from 'node:url';

const giftExchangeUmdFiles = glob(
  'node_modules/gift-exchange/dist/giftexchange.umd.*',
);

let copiedFiles = 0;

for await (const filePath of giftExchangeUmdFiles) {
  const { base } = path.parse(filePath);

  const source = fileURLToPath(new URL(`./${filePath}`, import.meta.url));
  const dest = fileURLToPath(new URL(`./public/${base}`, import.meta.url));

  copyFile(source, dest, (err) => {
    if (err) throw err;
  });
  copiedFiles += 1;
}

console.log(
  `copied ${copiedFiles} files from gift-exchange to public directory`,
);
