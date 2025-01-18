'use client'

import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import toast from "react-hot-toast";
import pusher from "@/services/pusher";
import ToastNotification from "@/components/notification/toast-notification";
import { useUnreadContext } from "./useMessageContext";

const UserNotifications = () => {
    Pusher.logToConsole = true;
    const {getUnreadMessage} = useUnreadContext()

    useEffect(() => {
      const channel = pusher.subscribe('notifications');

      channel.bind('real-time-notification', async (data: { 
            title: string,
            message: string 
        }) => {
          await getUnreadMessage().finally(() => {
            ToastNotification({
              title: data?.title ,
              message: data?.message
            })
          })
      }, []);

      return () => {
          pusher.unsubscribe('notifications');
      };
    });
    return null
};

export default UserNotifications;
