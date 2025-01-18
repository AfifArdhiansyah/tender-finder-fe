import Pusher from "pusher-js";

const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY || "default_pusher_key", {
    cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER || "default_cluster",
});

export default pusher;
