'use client'

import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import toast from "react-hot-toast";
import pusher from "@/services/pusher";

const UserNotifications = () => {
    Pusher.logToConsole = true;

    useEffect(() => {
      const channel = pusher.subscribe('notifications');

      channel.bind('real-time-notification', (data: { message: string }) => {
          toast(data?.message, {
              duration: 4000,
              position: "top-right",
          });
      });

      return () => {
          pusher.unsubscribe('notifications');
      };
    });
    return null
};

export default UserNotifications;
