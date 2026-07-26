const { createClient } = require("redis");

const redisClient = createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT)
    }
});

redisClient.on("error", (err) => {
    console.error("Redis error:", err);
});

async function connectRedis() {
    await redisClient.connect();

    const response = await redisClient.ping();

    console.log("Redis ping:", response);
}

module.exports = {
    redisClient,
    connectRedis
};