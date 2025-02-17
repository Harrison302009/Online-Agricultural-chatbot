self.addEventListener("push", (event) => {
  const data = event.data.json();
  console.log("Received push data:", data);

  self.registration.showNotification(data.title, {
    body: data.body,
    icon: data.icon || "/default-icon.png",
    badge: data.badge || "/default-badge.png",
    data: { url: data.url },
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const urlToOpen = event.notification.data.url;
  if (event.action === "reply") {
    clients.openWindow("/chat");
  } else if (event.action === "dismiss") {
    console.log("Notification dismissed.");
  } else {
    clients.openWindow("/chat");
  }

  if (urlToOpen) {
    event.waitUntil(clients.openWindow(urlToOpen));
  }
});
