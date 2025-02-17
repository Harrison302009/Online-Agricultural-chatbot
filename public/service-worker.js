// public/service-worker.js
self.addEventListener("push", (event) => {
  const data = event.data?.json() || {};

  self.registration.showNotification(data.title || "New Notification", {
    body: data.body,
    icon: data.icon || "/chat-user.jpg",
    data: data.url || "/",
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data || "/";
  event.waitUntil(clients.openWindow(url));
});
