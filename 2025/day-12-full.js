import { readFileSync } from 'node:fs';

const input = readFileSync('./day-12-input.txt', 'utf8').trimEnd();

function gridToCoords(grid) {
  const coords = [];
  for (let y = 0; y < grid.length; y++) {
    const row = grid[y];
    for (let x = 0; x < row.length; x++)
      if (row[x] === '#') coords.push([x, y]);
  }
  return coords;
}

function normalizeCoords(coords) {
  const minX = Math.min(...coords.map((c) => c[0]));
  const maxX = Math.max(...coords.map((c) => c[0]));
  const minY = Math.min(...coords.map((c) => c[1]));
  const maxY = Math.max(...coords.map((c) => c[1]));
  const shifted = coords.map(([x, y]) => [x - minX, y - minY]);
  shifted.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const key = shifted.map((coord) => coord.join()).join(';');
  return { coords: shifted, w: maxX - minX + 1, h: maxY - minY + 1, key };
}

function rotate(a, b, r) {
  if (r === 0) return [a, b];
  if (r === 1) return [-b, a];
  if (r === 2) return [-a, -b];
  return [b, -a];
}

function genVariants(baseCoords) {
  const map = {};
  for (let rot = 0; rot < 4; rot++) {
    for (let scaleX = 1; scaleX >= -1; scaleX -= 2) {
      const out = [];
      for (const [x0, y0] of baseCoords) {
        let [a, b] = rotate(x0, y0, rot);
        a *= scaleX;
        out.push([a, b]);
      }
      const norm = normalizeCoords(out);
      map[norm.key] = { coords: norm.coords, w: norm.w, h: norm.h };
    }
  }
  return Object.values(map);
}

// Placement: sparse word masks + explicit cells (for area updates only)
function makePlacement(cells) {
  const map = new Map(); // wordIndex -> mask
  for (const p of cells) {
    const wi = (p / 32) | 0;
    const bi = p & 31;
    map.set(wi, (map.get(wi) || 0) | (1 << bi));
  }
  const pairs = [...map.entries()].sort((a, b) => a[0] - b[0]);
  const wordIdx = new Int16Array(pairs.length);
  const wordMask = new Uint32Array(pairs.length);
  for (let i = 0; i < pairs.length; i++) {
    wordIdx[i] = pairs[i][0];
    wordMask[i] = pairs[i][1] >>> 0;
  }
  return { cells: new Int16Array(cells), wordIdx, wordMask };
}

// Build CSR cover lists per shape: offsets[cell]..offsets[cell+1] in flat[]
function buildCacheForSize(W, H, variantsByShape, areas) {
  const nCells = W * H;

  const placementsByShape = new Array(variantsByShape.length);
  const coverOffsetsByShape = new Array(variantsByShape.length);
  const coverFlatByShape = new Array(variantsByShape.length);

  for (let si = 0; si < variantsByShape.length; si++) {
    const variants = variantsByShape[si];
    const placements = [];

    // 1) enumerate placements
    for (const v of variants) {
      for (let oy = 0; oy <= H - v.h; oy++) {
        for (let ox = 0; ox <= W - v.w; ox++) {
          const cells = v.coords.map(([dx, dy]) => (oy + dy) * W + (ox + dx));
          placements.push(makePlacement(cells));
        }
      }
    }
    placementsByShape[si] = placements;

    // 2) CSR build
    const counts = new Uint32Array(nCells);
    for (let pi = 0; pi < placements.length; pi++) {
      const pcs = placements[pi].cells;
      for (let k = 0; k < pcs.length; k++) counts[pcs[k]]++;
    }

    const offsets = new Uint32Array(nCells + 1);
    let total = 0;
    for (let c = 0; c < nCells; c++) {
      offsets[c] = total;
      total += counts[c];
    }
    offsets[nCells] = total;

    const flat = new Int32Array(total);
    const cursor = new Uint32Array(offsets); // copy
    for (let pi = 0; pi < placements.length; pi++) {
      const pcs = placements[pi].cells;
      for (let k = 0; k < pcs.length; k++) {
        const cell = pcs[k];
        flat[cursor[cell]++] = pi;
      }
    }

    coverOffsetsByShape[si] = offsets;
    coverFlatByShape[si] = flat;
  }

  return {
    W,
    H,
    nCells,
    areas,
    placementsByShape,
    coverOffsetsByShape,
    coverFlatByShape,
  };
}

function solveRegion(region, cache) {
  const {
    nCells,
    areas,
    placementsByShape,
    coverOffsetsByShape,
    coverFlatByShape,
  } = cache;
  const K = areas.length;

  const counts = Array.from({ length: K }, (_, i) => region.counts[i] ?? 0);

  let remArea = 0;
  let remPieces = 0;
  for (let i = 0; i < K; i++) {
    remArea += counts[i] * areas[i];
    remPieces += counts[i];
    if (placementsByShape[i].length === 0) return false; // cannot place required shape
  }

  const emptyLeft0 = nCells - remArea;
  if (emptyLeft0 < 0) return false;

  const occ = new Uint32Array((nCells + 31) >>> 5); // assigned cells (empty or filled)
  let assigned = 0;
  let emptyLeft = emptyLeft0;

  function isSet(cell) {
    return (occ[cell >>> 5] >>> (cell & 31)) & 1;
  }
  function setCell(cell) {
    occ[cell >>> 5] |= 1 << (cell & 31);
  }
  function unsetCell(cell) {
    occ[cell >>> 5] ^= 1 << (cell & 31);
  }

  function canPlace(p) {
    const idxs = p.wordIdx,
      masks = p.wordMask;
    for (let t = 0; t < idxs.length; t++) {
      const wi = idxs[t];
      if ((occ[wi] & masks[t]) !== 0) return false;
    }
    return true;
  }
  function place(p) {
    const idxs = p.wordIdx,
      masks = p.wordMask;
    for (let t = 0; t < idxs.length; t++) occ[idxs[t]] ^= masks[t];
    assigned += p.cells.length;
  }
  function unplace(p) {
    const idxs = p.wordIdx,
      masks = p.wordMask;
    for (let t = 0; t < idxs.length; t++) occ[idxs[t]] ^= masks[t];
    assigned -= p.cells.length;
  }

  function pickBestCell() {
    let bestCell = -1;
    let bestOpts = 1e9;

    for (let cell = 0; cell < nCells; cell++) {
      if (isSet(cell)) continue;

      let opts = emptyLeft > 0 ? 1 : 0;
      for (let si = 0; si < K; si++) {
        if (counts[si] <= 0) continue;
        const off = coverOffsetsByShape[si];
        opts += off[cell + 1] - off[cell];
      }
      if (opts === 0) return -1; // dead end
      if (opts < bestOpts) {
        bestOpts = opts;
        bestCell = cell;
        if (bestOpts <= 1) break;
      }
    }
    return bestCell;
  }

  function dfs(remAreaLocal, remPiecesLocal) {
    const remainingCells = nCells - assigned;
    if (remAreaLocal + emptyLeft !== remainingCells) return false;
    if (emptyLeft < 0) return false;

    if (remPiecesLocal === 0) return emptyLeft === remainingCells;

    const cell = pickBestCell();
    if (cell < 0) return false;

    // Place present first
    for (let si = 0; si < K; si++) {
      if (counts[si] <= 0) continue;

      const off = coverOffsetsByShape[si];
      let a = off[cell],
        b = off[cell + 1];
      if (a === b) continue;

      const flat = coverFlatByShape[si];
      const plist = placementsByShape[si];

      for (let idx = a; idx < b; idx++) {
        const p = plist[flat[idx]];
        if (!canPlace(p)) continue;

        counts[si]--;
        place(p);
        if (dfs(remAreaLocal - areas[si], remPiecesLocal - 1)) return true;
        unplace(p);
        counts[si]++;
      }
    }

    // Mark empty
    if (emptyLeft > 0) {
      setCell(cell);
      assigned++;
      emptyLeft--;
      if (dfs(remAreaLocal, remPiecesLocal)) return true;
      emptyLeft++;
      assigned--;
      unsetCell(cell);
    }

    return false;
  }

  return dfs(remArea, remPieces);
}

function solve(input) {
  const shapes = input
    .split('\n\n')
    .slice(0, -1)
    .map((lines) => lines.split('\n').slice(1));
  const regions = input
    .split('\n\n')
    .at(-1)
    .split('\n')
    .map((line) => {
      const [W, H, ...counts] = line.matchAll(/\d+/g).map((m) => +m);
      return { W, H, counts };
    });

  const baseCoords = shapes.map(gridToCoords);
  const areas = baseCoords.map((c) => c.length);
  const variantsByShape = baseCoords.map(genVariants);

  // LRU cache to avoid OOM on many distinct sizes
  const MAX_CACHE = 8;
  const lru = new Map(); // key -> cache
  function getCache(W, H) {
    const key = `${W}x${H}`;
    const hit = lru.get(key);
    if (hit) {
      lru.delete(key);
      lru.set(key, hit);
      return hit;
    }
    const cache = buildCacheForSize(W, H, variantsByShape, areas);
    lru.set(key, cache);
    if (lru.size > MAX_CACHE) {
      const firstKey = lru.keys().next().value;
      lru.delete(firstKey);
    }
    return cache;
  }

  let count = 0;
  for (const r of regions) {
    // area prune
    const totalArea = areas.reduce(
      (acc, a, i) => acc + (r.counts[i] ?? 0) * a,
      0
    );
    if (totalArea > r.W * r.H) continue;

    const cache = getCache(r.W, r.H);
    if (solveRegion(r, cache)) count++;
  }
  console.log(count);
}

solve(input);
