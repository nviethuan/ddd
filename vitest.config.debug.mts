import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    root: './',
    testTimeout: 300_000,
    hookTimeout: 300_000,
    fileParallelism: false,
    logHeapUsage: true,
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
  },
  plugins: [
    // This is required to build the test files with SWC
    swc.vite(),
  ],
});
