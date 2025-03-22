import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'personal.reviews.app',
  appName: 'personal-reviews',
  webDir: 'build',
  plugins: {
    CapacitorSQLite: {
      androidDatabaseLocation: "default",
    },
  },
};

export default config;
