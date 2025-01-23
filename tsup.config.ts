import { defineConfig } from 'tsup'

export default defineConfig(() => ({
  clean: true, // Clean the output directory before building
  dts: true, // Generate declaration files
  entry: [
    'src/index.ts',
    'src/fields/index.ts',
    'src/fields/index.ts',
    'src/queries/index.ts',
    'src/exports/client.ts',
  ],
  esbuildOptions: (options) => {
    options.alias = {
      '@': './src', // Map '@' to the 'src' directory
    }
  },
  external: ['react', 'payload', 'next', '@payloadcms/ui'], // Mark React as external
  format: ['cjs', 'esm'], // Build both CommonJS and ESM
  outDir: 'dist', // Output directory
  sourcemap: true, // Generate sourcemaps
}))
