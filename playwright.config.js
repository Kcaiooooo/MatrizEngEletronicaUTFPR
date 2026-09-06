import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests/e2e',
    fullyParallel: true,
    workers: 2,
    timeout: 30000,
    use: {
        baseURL: 'http://127.0.0.1:4173',
        viewport: { width: 1440, height: 900 },
        launchOptions: process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {},
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
    },
    webServer: { command: 'npm run dev', url: 'http://127.0.0.1:4173', reuseExistingServer: !process.env.CI },
});
