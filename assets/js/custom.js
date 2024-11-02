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

$(document).ready(function () {
  function showSuccessModal() {
    $("#successModal").modal("show");
  }

  function showErrorModal() {
    $("#errorModal").modal("show");
  }

  function closePopup() {
    $(".modal").modal("hide");
  }

  // Contact Form Validation
  $("#contactForm").validate({
    rules: {
      first_name: {
        required: true,
        minlength: 2,
      },
      email: {
        required: true,
        email: true,
      },
      mobile: {
        required: true,
        number: true,
        minlength: 8,
        maxlength: 10,
      },
      description_info: {
        required: true,
      },
    },
    messages: {
      first_name: {
        required: "Please enter your first name*",
        minlength: "Your name must be at least 2 characters long",
      },
      email: {
        required: "Please enter your email*",
        email: "Please enter a valid email address",
      },
      mobile: {
        required: "Please enter your phone number*",
        number: "Please enter a valid phone number",
        minlength: "Your phone number must be at least 8 digits long",
        maxlength: "Your phone number must be at most 10 digits long",
      },
      description_info: {
        required: "Please enter your message*",
      },
    },
    errorPlacement: function (error, element) {
      element.closest(".form-group").next(".error").html(error);
    },
    submitHandler: function (form) {
      const payload = {
        first_name: $("#first_name").val(),
        email: $("#email").val(),
        phone: $("#mobile").val(),
        company_id: 2,
        company: "ECSCloudInfotech India",
        lead_status: "PENDING",
        description_info: $("#description_info").val(),
        lead_source: "WEBSITE",
        country_code: "91",
        createdBy: $("#first_name").val(),
      };
      $.ajax({
        url: "https://crmlah.com/ecscrm/api/newClient",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(payload),
        success: function (response) {
          showSuccessModal();
          $(form).trigger("reset");
        },
        error: function () {
          showErrorModal();
        },
      });
    },
  });

  // Enquiry Form Validation
  $("#enquiryEmail").validate({
    rules: {
      email: {
        required: true,
        email: true,
      },
    },
    messages: {
      email: {
        required: "Please enter your email*",
        email: "Please enter a valid email address",
      },
    },
    errorPlacement: function (error, element) {
      element.closest(".form-group").find(".error").html(error);
    },
    submitHandler: function (form) {
      const payload = {
        email: $("#enquiry_email").val(),
        company_id: 2,
        company: "ECSCloudInfotech India",
        lead_status: "PENDING",
        lead_source: "WEBSITE",
        country_code: "91",
      };
      $.ajax({
        url: "https://crmlah.com/ecscrm/api/newClient",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(payload),
        success: function () {
          showSuccessModal();
          $(form).trigger("reset");
        },
        error: function () {
          showErrorModal();
        },
      });
    },
  });
});
