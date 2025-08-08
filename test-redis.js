import Redis from "ioredis";

const client = new Redis.Cluster(
  [{ host: 'madzone-web-dev-kggmse.serverless.euc1.cache.amazonaws.com', port: 6379 }],
  {
    dnsLookup: (address, callback) => callback(null, address),
    redisOptions: {
      tls: {},
    },
  });

(async () => {
    try {
        console.log("🔄 Connecting to Redis cluster...");
        
        // Set and assert
        const setResult = await client.set("key", "value");
        console.assert(setResult === "OK");
        console.log("✅ SET operation successful:", setResult);

        // Get and assert
        const getResult = await client.get("key");
        console.assert(getResult === "value");
        console.log("✅ GET operation successful:", getResult);
        
        // Test additional operations
        await client.set("test:timestamp", new Date().toISOString());
        const timestamp = await client.get("test:timestamp");
        console.log("✅ Timestamp test:", timestamp);
        
        console.log("🎉 Redis cluster connection successful!");
        
    } catch (error) {
        console.error("❌ Redis cluster connection failed:", error.message);
    } finally {
        // Close the connection
        client.disconnect();
        console.log("🔌 Redis connection closed");
    }
})();
