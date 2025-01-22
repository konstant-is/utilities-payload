import { defineConfig } from 'tsup'

export default defineConfig(() => ({
  clean: true, // Clean the output directory before building
  dts: true, // Generate declaration files
  entry: ['src/index.ts', 'src/canUseDOM.ts'], // Include all necessary entry points
  external: ['react'], // Mark React as external
  format: ['cjs', 'esm'], // Build both CommonJS and ESM
  outDir: 'dist', // Output directory
  sourcemap: true, // Generate sourcemaps
}))
