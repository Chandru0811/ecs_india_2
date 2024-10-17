function closeVideoModal() {
  // Hide the modal
  $("#videoModal").modal("hide");

  // Pause all YouTube videos in iframes
  document.querySelectorAll(".youtube-iframe").forEach((iframe) => {
    // Save the current src value
    const currentSrc = iframe.getAttribute("src");

    // Reset the iframe src to stop playback
    iframe.setAttribute("src", "");

    // Optionally, store the original src for later use
    iframe.setAttribute("data-original-src", currentSrc);
  });
}

function showVideoModal() {
  $("#videoModal").modal("show");

  // Optionally, restore the iframe src when the modal is shown
  $("#videoModal").on("shown.bs.modal", function () {
    document.querySelectorAll(".youtube-container").forEach((container) => {
      const videoId = container.getAttribute("data-video-id");
      const iframe = container.querySelector(".youtube-iframe");

      if (iframe && iframe.hasAttribute("data-original-src")) {
        iframe.setAttribute("src", iframe.getAttribute("data-original-src"));
      }
    });
  });
}
