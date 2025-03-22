import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'personal-reviews-v2',
  webDir: 'build',
  plugins: {
    CapacitorSQLite: {
      androidDatabaseLocation: "default",
    },
  },
};

export default config;
