import { readFile, writeFile } from 'fs/promises';

const json = await readFile('./db.json');

const o = JSON.parse(json);

let lastId = 1;
for (const movie of o.movies) {
  if (movie.id) {
    lastId = movie.id;
    continue;
  }
  lastId++;
  movie.id = lastId;
}

await writeFile('./db.json', JSON.stringify(o));
