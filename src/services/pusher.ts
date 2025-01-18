import Pusher from "pusher-js";

const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY || "default_pusher_key", {
    cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER || "default_cluster",
    wsHost: process.env.NEXT_PUBLIC_PUSHER_HOST,
    wsPort: Number(process.env.NEXT_PUBLIC_PUSHER_PORT) || 8080,
    wssPort: Number(process.env.NEXT_PUBLIC_PUSHER_PORT) || 8080,
});

export default pusher;
