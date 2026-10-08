// Run manually after changing the original artwork; deployment uses committed WebP assets.
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const sources = JSON.parse(await readFile(resolve(root, 'scripts/image-sources.json'), 'utf8'))
const results = []
for (const { source, target, lossless = false } of sources) {
  const original = await readFile(resolve(root, source))
  const metadata = await sharp(original).metadata()
  await mkdir(dirname(resolve(root, target)), { recursive: true })
  const output = await sharp(original).webp({ quality: 82, effort: 5, lossless }).toBuffer()
  await writeFile(resolve(root, target), output)
  const optimized = await sharp(output).metadata()
  if (optimized.width !== metadata.width || optimized.height !== metadata.height) throw new Error(`Dimensions changed: ${source}`)
  results.push({ source, target, width: metadata.width, height: metadata.height, originalBytes: original.length, optimizedBytes: output.length })
}
await mkdir(resolve(root, 'qa'), { recursive: true })
await writeFile(resolve(root, 'qa/image-sizes.json'), JSON.stringify(results, null, 2) + '\n')
console.log(`${results.length} images: ${results.reduce((n, i) => n + i.originalBytes, 0)} -> ${results.reduce((n, i) => n + i.optimizedBytes, 0)} bytes`)
