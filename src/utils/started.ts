export const started = (port: number) =>
    console.log(`\n🚀️ started on http://localhost:${port}\n📜️ swagger http://localhost:${port}/docs\n🚨️ environment: ${process.env.NODE_ENV}`);
