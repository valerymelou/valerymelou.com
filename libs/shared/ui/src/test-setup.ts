import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

setupZoneTestEnv();

// Mock shiki and related modules
jest.mock('shiki', () => ({
  codeToHtml: jest
    .fn()
    .mockReturnValue(Promise.resolve('<pre><code>mocked code</code></pre>')),
}));
