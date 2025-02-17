import { useEffect } from "react";
import Pusher from "pusher-js";
import { useSession } from "next-auth/react";

const usePusher = () => {
  const session = useSession();
  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: "mt1",
    });
    const channel = pusher.subscribe("chat");
    channel.bind("message", (data: any) => {
      if (navigator.serviceWorker && navigator.serviceWorker.ready) {
        if (data.ownerId !== session.data?.user.id) {
          navigator.serviceWorker.ready.then((registration) => {
            registration.showNotification(
              `${data.owner.name} sent you a message`,
              {
                body: `${data.message}`,
                icon: "/chat-user.jpg",
                image: "/ai-mail.png",
                data: { url: "/chat" },
                requireInteraction: true,
                actions: [
                  {
                    action: "reply",
                    title: "Reply",
                    icon: "/reply.png",
                  },
                  {
                    action: "dismiss",
                    title: "Dismiss",
                    icon: "/dismiss.png",
                  },
                ],
              },
            );
          });
        }
      }
    });

    return () => {
      pusher.unsubscribe("chat");
    };
  }, [session.data?.user.id]);
};

export default usePusher;
