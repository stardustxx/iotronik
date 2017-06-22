export default class Helpers {
  static showNotification(message) {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      // Let's check whether notification permissions have already been granted
      // If it's okay let's create a notification
      new Notification(message);
    } else if (Notification.permission !== "denied") {
      // Otherwise, we need to ask the user for permission
      Notification.requestPermission((permission) => {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          new Notification("You will now get notification when incident happens!");
        }
      });
    }

    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them any more.
  }
}
