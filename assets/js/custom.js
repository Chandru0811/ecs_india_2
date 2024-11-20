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

$(document).ready(function () {
  $("#course_register").validate({
    rules: {
      name: {
        required: true,
        minlength: 3,
      },
      checkout_email: {
        required: true,
        email: true,
      },
      phone: {
        required: true,
        digits: true,
        minlength: 10,
        maxlength: 10,
      },
    },
    messages: {
      name: {
        required: "Name is Required.",
        minlength: "Your name must be at least 3 characters long.",
      },
      checkout_email: {
        required: "Email is Required.",
        email: "Please enter a valid email address.",
      },
      phone: {
        required: "Phone number is Required.",
        digits: "Phone number must contain only digits.",
        minlength: "Phone number must be exactly 10 digits.",
        maxlength: "Phone number must be exactly 10 digits.",
      },
    },
    submitHandler: function (form) {
      const amount =
        parseFloat($("#course_fee").val()) + parseFloat($("#course_gst").val());
      const modalData = {
        name: $("#name").val(),
        phoneNumber: $("#phone").val(),
        email: $("#checkout_email").val(),
        course_fee: $("#course_fee").val(),
        course_gst: $("#course_gst").val(),
        course: $("#courses").val(),
        city: $("#city").val(),
        amount: amount,
      };

      console.log("Form Data:", modalData);

      $.ajax({
        url: "https://crmlah.com/ecscrm/api/createEcsIndiaInternship",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(modalData),
        success: function (response) {
          $("#course_register").trigger("reset");
          fillSecondModal(modalData);
          $("#course-register").modal("hide");
          $("#checkout").modal("show");
        },
        error: function (error) {
          console.error("Error:", error);
          alert("There was an error submitting the form.");
        },
      });
    },
  });

  function fillSecondModal(data) {
    const checkoutSummary = `
        <div >
          <p class="text-center" style="font-weight: 500; font-size: 3rem; background: linear-gradient(90deg, #2f57efbf 0%, #c586eeab 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
            <b>Checkout</b>
          </p>
          <div class="pt-4">
            <div class="d-flex justify-content-between align-items-center py-2">
              <div>Sub Total</div>
              <div>₹ ${data.course_fee}</div>
            </div>
            <div class="d-flex justify-content-between align-items-center py-2">
              <div>GST</div>
              <div>₹ ${data.course_gst}</div>
            </div>
            <hr />
            <div class="d-flex justify-content-between align-items-center py-2">
              <div>Total</div>
              <div>₹  ${(
                parseFloat(data.course_fee) + parseFloat(data.course_gst)
              ).toFixed(0)}</div>
            </div>
          </div>
          <div class="py-5">
            <button 
              type="submit" 
              class="btn btn-primary w-100 my-2 checkout-btn"
              style="font-size: 1.5rem; border-radius: 6px; background: linear-gradient(to right, #2f57efbf 0%, #b964e3 100%); padding: 10px; border: none; transition: background 0.3s ease-in-out;"
              onmouseover="this.style.background='linear-gradient(to left, #2f57efbf 0%, #b964e3 100%)'"
              onmouseout="this.style.background='linear-gradient(to right, #2f57efbf 0%, #b964e3 100%)'"
              data-modaldata='${JSON.stringify(data)}'
            >
              Checkout
            </button>
          </div>
        </div>

    `;
    $("#checkout .amount-column").html(checkoutSummary);
  }

  $("#checkout").on("click", ".checkout-btn", function (event) {
    event.preventDefault();

    const modalData = JSON.parse($(this).attr("data-modaldata"));

    $.ajax({
      url: "https://crmlah.com/ecscrm/api/createBillDeskOrder",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(modalData),
      success: function (response) {
        console.log(response);
        console.log("Order created successfully!");

        $("#chceckout-success").modal("show");

        const payload = new FormData();
        payload.append("from", "ecscloudinfotech@gmail.com");
        payload.append("to", modalData.email);
        payload.append("subject", "Ecs Cloud Infotech Verification Processing");
        payload.append(
          "htmlContent",
          `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Payment Request - Course Registration</title>
          <style>
            /* Your styles here */
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header" style="padding: 25px; border-bottom: 1px solid #ddd; text-align: center">
              <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse">
                <tr>
                  <td align="left" style="vertical-align: middle">
                    <img src="https://ecsaio.in/assets/images/logo.webp" alt="Deals Machi" style="max-width: 150px; height: auto" />
                  </td>
                  <td align="right" style="vertical-align: middle">
                    <div class="headerText" style="font-size: 14px; color: #333">
                      <a href="https://ecsaio.com/" target="_blank" style="text-decoration: none; color: #333">
                        Your <span style="color: #005aea">info@ecsaio.in</span>
                      </a> | <a href="tel:919150150687" target="_blank" style="text-decoration: none; color: #333">
                        +91 9150150687
                      </a>
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            <div class="message">
              <p>Hello ${modalData.name}!</p>
              <p>Thank you for registering for the course <strong> ${
                modalData.course
              }</strong> on our platform. Below are the details of your registration and payment request.</p>
            </div>
            <div class="user-details">
              <h2>User Details</h2>
              <p class="sub-heading">Name: <span>${modalData.name}</span></p>
              <p class="sub-heading">Email: <span>${modalData.email}</span></p>
              <p class="sub-heading">Phone Number: <span>+91 ${
                modalData.phoneNumber
              }</span></p>
              <p class="sub-heading">Address: <span>${modalData.city}</span></p>
            </div>
            <div class="course-details">
              <h2>Course Details</h2>
              <p class="course_details">Course Title: ${modalData.course}</p>
              <div class="fee_details">
                <div>Amount :</div>
                <div>${modalData.course_fee}</div>
              </div>
              <div class="fee_details">
                <div>GST :</div>
                <div>${modalData.course_gst}</div>
              </div>
              <hr />
              <div class="fee_details">
                <div>Total :</div>
                <div>${(
                  parseFloat(modalData.course_fee) +
                  parseFloat(modalData.course_gst)
                ).toFixed(0)}</div>
              </div>
            </div>
            <div class="align_button">
              <form name="sdklaunch" id="sdklaunch" action="${
                response.href
              }" method="POST">
                <input type="hidden" id="bdorderid" name="bdorderid" value="${
                  response.bdOrderId
                }" />
                <input type="hidden" id="merchantid" name="merchantid" value="${
                  response.merchantId
                }" />
                <input type="hidden" id="rdata" name="rdata" value="${
                  response.rdata
                }" />
                <input name="submit" type="submit" class="cta-button" value="Complete your Payment" />
              </form>
            </div>
            <div class="footer" style="padding: 15px 25px; text-align: center">
              <table width="100%" cellspacing="0" cellpadding="0" style="border-collapse: collapse">
                <tr>
                  <td align="left" style="vertical-align: middle">
                    <img src="https://ecsaio.in/assets/images/logo.webp" alt="dealsmachi" style="max-width: 150px; height: auto; margin-bottom: 10px" />
                  </td>
                  <td align="right" style="vertical-align: middle">
                    <p style="font-size: 12px; color: #333; margin: 0">Connect with <a href="https://ecsaio.com/" target="_blank" style="color: #005aea; text-decoration: none">cloud ECS infotech</a> India</p>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </body>
      </html>
    `
        );

        const apiUrl =
          "https://crmlah.com/ecscrm/api/sendMailWithSingleAttachment";

        $.ajax({
          url: apiUrl,
          method: "POST",
          data: payload,
          processData: false,
          contentType: false,
          headers: {
            Authorization:
              "eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJDTVBfVVNFUiJdLCJzdWIiOiJCaWxsIERlc2siLCJpYXQiOjE3MzIwOTM0NjksImV4cCI6MTczMjA5NzA2OX0.lzJJYgfAmLxTwUE9vBQs9Fi8c2KehhP1pXr86uTa-BiYao9PQH0NcFS0h-axuByZW1T0BZmsvNmwo0ocKn1DuQ",
          },
          success: function (mailResponse) {
            console.log(mailResponse.message);
          },
          error: function (mailError) {
            console.error("Error sending mail:", mailError);
            alert("An error occurred while sending the mail.");
          },
        });

        $("#course_register").trigger("reset");
        $("#checkout").modal("hide");
      },
      error: function (error) {
        console.error("Error submitting order:", error);
        alert("There was an error submitting your order. Please try again.");
      },
    });
  });
});
