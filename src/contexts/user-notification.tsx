'use client'

import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import toast from "react-hot-toast";
import pusher from "@/services/pusher";
import ToastNotification from "@/components/notification/toast-notification";

const UserNotifications = () => {
    Pusher.logToConsole = true;

    useEffect(() => {
      const channel = pusher.subscribe('notifications');

      channel.bind('real-time-notification', (data: { 
            title: string,
            message: string 
        }) => {
          ToastNotification({
            title: data?.title ,
            message: data?.message
        })
      });

      return () => {
          pusher.unsubscribe('notifications');
      };
    });
    return null
};

export default UserNotifications;
