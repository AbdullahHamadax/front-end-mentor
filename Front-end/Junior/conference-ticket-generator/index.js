const form = document.querySelector("form");
const dropzone = document.getElementById("dropzone");
const fileInput = document.getElementById("dropzone-file");
const emailInput = document.getElementById("email-input");
const nameInput = document.getElementById("name-input");
const githubUsernameInput = document.getElementById("github-username-input");

const photoFeedback = document.getElementById("photo-feedback");
const emailFeedback = document.getElementById("email-feedback");
const fullNameFeedback = document.getElementById("full-name-feedback");
const githubUsernameFeedback = document.getElementById(
  "github-username-feedback"
);
const userForm = document.getElementById("user-form");
const userAvatar = document.getElementById("user-avatar");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nameRegex = /^[A-Z][a-zA-Z.'\\-]*(?: [A-Z][a-zA-Z.'\\-]*)*$/;
const githubUsernameRegex = /^@[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

const maxImageSize = 500 * 1024;

document.addEventListener("DOMContentLoaded", () => {
  setupFileUpload();
  form.addEventListener("submit", handleFormSubmit);
});

function setupFileUpload() {
  fileInput.addEventListener("change", () => handleFiles(fileInput.files));

  dropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropzone.classList.add("bg-opacity-50");
  });

  dropzone.addEventListener("dragleave", (e) => {
    e.preventDefault();
    dropzone.classList.remove("bg-opacity-50");
  });

  dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropzone.classList.remove("bg-opacity-50");
    if (e.dataTransfer.files.length) {
      handleFiles(e.dataTransfer.files);
    }
  });
}

function handleFiles(files) {
  if (!files || files.length === 0) return;
  const file = files[0];

  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(file);
  fileInput.files = dataTransfer.files;

  if (!["image/jpeg", "image/png"].includes(file.type)) {
    errorMsg(photoFeedback, "Please upload your image in PNG or JPEG format.");
    errorOutline(dropzone);
    return;
  }

  if (file.size > maxImageSize) {
    errorMsg(
      photoFeedback,
      "File too large. Please upload a photo under 500KB."
    );
    errorOutline(dropzone);
    return;
  }

  hideError(photoFeedback, dropzone);
  displayImagePreview(file);
}

function displayImagePreview(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const dropzoneContent = dropzone.querySelector("div");
    if (dropzoneContent) dropzone.removeChild(dropzoneContent);

    const previewContainer = document.createElement("div");
    previewContainer.className =
      "flex flex-col items-center justify-center w-full py-8";

    const preview = document.createElement("img");
    preview.className = "object-cover mb-4 rounded-md size-32";
    preview.src = e.target.result;
    userAvatar.src = e.target.result;

    const fileLabel = document.createElement("p");
    fileLabel.className = "text-xl text-[#d2d1d6]";
    fileLabel.textContent = "Image uploaded successfully!";

    previewContainer.appendChild(preview);
    previewContainer.appendChild(fileLabel);
    dropzone.appendChild(previewContainer);
  };

  reader.onerror = () => {
    errorMsg(photoFeedback, "Error reading file. Please try again.");
  };

  reader.readAsDataURL(file);
}

function handleFormSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const fullName = formData.get("fullName");
  const email = formData.get("email");
  const githubUsername = formData.get("githubUsername");

  let formIsValid = true;

  if (!fileInput.files || fileInput.files.length === 0) {
    errorMsg(photoFeedback, "Please upload an image.");
    errorOutline(dropzone);
    formIsValid = false;
  } else if (!["image/jpeg", "image/png"].includes(fileInput.files[0].type)) {
    errorMsg(photoFeedback, "Please upload your image in PNG or JPEG format.");
    errorOutline(dropzone);
    formIsValid = false;
  } else {
    hideError(photoFeedback, dropzone);
  }

  if (!nameRegex.test(fullName)) {
    errorMsg(
      fullNameFeedback,
      "Please enter your name with each part starting with a capital letter."
    );
    errorOutline(nameInput);
    formIsValid = false;
  } else {
    hideError(fullNameFeedback, nameInput);
  }

  if (!emailRegex.test(email)) {
    errorMsg(emailFeedback, "Please enter a valid email address.");
    errorOutline(emailInput);
    formIsValid = false;
  } else {
    hideError(emailFeedback, emailInput);
  }

  if (!githubUsernameRegex.test(githubUsername)) {
    errorMsg(
      githubUsernameFeedback,
      "Please enter a valid GitHub username. It must start with @ and only contain letters, numbers, and hyphens, and cannot start or end with a hyphen."
    );
    errorOutline(githubUsernameInput);
    formIsValid = false;
  } else {
    hideError(githubUsernameFeedback, githubUsernameInput);
  }

  if (formIsValid) {
    displayTicket(fullName, email, githubUsername);
  }
}

function errorOutline(element) {
  element.classList.add("ring", "ring-[#e16151]");
}

function clearErrorOutline(element) {
  element.classList.remove("ring", "ring-[#e16151]");
}

function hideError(feedbackElement, inputElement) {
  feedbackElement.classList.add("hidden");
  feedbackElement.classList.remove(
    "animate-pulse",
    "transition",
    "text-[#e16151]"
  );
  feedbackElement.classList.add("text-[#d2d1d6]");
  clearErrorOutline(inputElement);
}

function errorMsg(element, message) {
  const paragraph = element.querySelector("p");
  paragraph.textContent = message;

  element.classList.remove("hidden");
  element.classList.add("animate-pulse", "text-[#e16151]");
}

function displayTicket(fullName, email, githubUsername) {
  const ticket = document.getElementById("ticket");
  const submittedEmail = document.getElementById("submitted-email");
  const submittedName = document.getElementById("submitted-name");
  const ticketName = document.getElementById("ticket-name");
  const ticketGithubName = document.getElementById("ticket-github-username");
  const ticketId = document.getElementById("ticket-id");

  submittedEmail.textContent = email;
  submittedName.textContent = fullName;
  ticketName.textContent = fullName;
  ticketGithubName.textContent = githubUsername;
  ticketId.textContent = `#${Math.floor(Math.random() * 10000) + 10000}`;

  ticket.classList.remove("hidden");
  userForm.classList.add("hidden");

  animateTicket();
}

function animateTicket() {
  const ticket = document.getElementById("ticket-card");
  ticket.style.display = "flex";

  anime({
    targets: "#ticket-card",
    translateY: 50,
    opacity: [0, 1],
  });
}
