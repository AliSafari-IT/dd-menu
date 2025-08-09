import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  minify: true,
  treeshake: true,
  sourcemap: true,
  splitting: false,
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  target: 'es2020',
  banner: {
    js: '// @asafarim/dd-menu - A minimal, elegant, and highly customizable dropdown menu React component',
  },
});
