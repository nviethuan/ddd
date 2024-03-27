import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['**/*.e2e-spec.ts'],
    globals: true,
    // alias: {
    //   '@src': './src',
    //   '@test': './test',
    // },
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
  resolve: {
    // alias: {
    //   '@src': './src',
    //   '@test': './test',
    // },
  },
  plugins: [swc.vite()],
});
