'use client'

import { useEffect } from "react";
import Pusher from "pusher-js";
import pusher from "@/services/pusher";
import ToastNotification from "@/components/notification/toast-notification";
import { useUnreadContext } from "./useMessageContext";
import { useUserContext } from "./useUserContext";

const UserNotifications = () => {
    Pusher.logToConsole = true;
    const {getUnreadMessage} = useUnreadContext()
    const {user} = useUserContext()
    const idUser = user?.id
    const role = user?.role

    useEffect(() => {
      const channel = pusher.subscribe('notifications.'+idUser);

      channel.bind('real-time-notification', async (data: { 
            title: string,
            message: string,
            tenderId:string
        }) => {
          await getUnreadMessage().finally(() => {
            ToastNotification({
              title: data?.title ,
              message: data?.message,
              tenderId: data?.tenderId,
              role: role as string
            })
          })
      }, []);

      return () => {
          pusher.unsubscribe('notifications.'+idUser);
      };
    });
    return null
};

export default UserNotifications;
