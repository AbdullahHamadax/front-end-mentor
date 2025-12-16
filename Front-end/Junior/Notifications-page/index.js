import notifications from "./data.js";

const markAllAsReadBtn = document.querySelector("button");

markAllAsReadBtn.addEventListener("click", () => {
  notifications.forEach((notification) => (notification.unread = false));
  setUnreadNotificationsCount();
  renderNotifications();
});

setUnreadNotificationsCount();
renderNotifications();

function setUnreadNotificationsCount() {
  const unreadNotifications = notifications.filter(
    (notification) => notification.unread === true
  );
  document.querySelector(".unread-notifications-count").textContent =
    unreadNotifications.length;
}

function getNotificationsHTML() {
  return notifications
    .map((notification) => {
      return `
      <div class="${
        notification.unread ? "bg-[#F6FAFD]" : "bg-white"
      } p-4 rounded-lg flex gap-4 cursor-pointer transition-colors notification-card">
        
        <img src="${notification.profilePicture}" alt="${
        notification.name
      }" class="size-10">
        
        <div class="flex flex-col text-sm">
            
            <p class="text-[#5E6778]">
                <span class="font-bold text-[#1C202B] hover:text-[#0A327B]">${
                  notification.name
                }</span>
                <span class="ml-1">${notification.type}</span>
                
                ${
                  notification.title
                    ? `<span class="font-bold text-[#5E6778] hover:text-[#0A327B] ml-1 cursor-pointer">${notification.title}</span>`
                    : ""
                }
                
                ${
                  notification.unread
                    ? `<span class="inline-block w-2 h-2 bg-red-500 rounded-full ml-1.5"></span>`
                    : ""
                }
            </p>

            <p class="text-[#939DAE] mt-0.5">${notification.time}</p>
            
            ${
              notification.message
                ? `<div class="mt-3 p-4 border border-gray-200 rounded text-[#5E6778] hover:bg-[#E5EFFA] cursor-pointer">${notification.message}</div>`
                : ""
            }
        </div>

        ${
          notification.commentPicture
            ? `<img src="${notification.commentPicture}" class="ml-auto size-10 cursor-pointer rounded-md">`
            : ""
        }

      </div>
      `;
    })
    .join("");
}

function renderNotifications() {
  document.querySelector(".notifications-feed").innerHTML =
    getNotificationsHTML();
  const notificationCard = document.querySelectorAll(".notification-card");

  notificationCard.forEach((card, index) => {
    card.addEventListener("click", () => {
      notifications[index].unread = false;
      setUnreadNotificationsCount();
      renderNotifications();
    });
  });
}
