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

  // Hiring Form Validation
  $("#hiringForm").validate({
    rules: {
      full_name: {
        required: true,
        minlength: 3,
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
      year_of_passing: {
        required: true,
      },
      course: {
        required: true,
      },
    },
    messages: {
      full_name: {
        required: "Please enter your full name*",
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
      year_of_passing: {
        required: "Please enter your year of passing*",
      },
      course: {
        required: "Please enter your course*",
      },
    },
    errorPlacement: function (error, element) {
      error.addClass("text-danger mt-1");
      error.insertAfter(element);
    },
    highlight: function (element) {
      $(element).addClass("is-invalid");
    },
    unhighlight: function (element) {
      $(element).removeClass("is-invalid");
    },
    submitHandler: function (form) {
      if (!$("#hiringForm").valid()) {
        return false;
      }
      const payload = {
        first_name: $("#full_name").val(),
        email: $("#email").val(),
        phone: $("#mobile").val(),
        company_id: 43,
        company: "Cloud ECS Infotech",
        lead_status: "PENDING",
        description_info: `Year of Passing : ${$("#year_of_passing").val()}, Course : ${$("#course").val()}, About Candidate : ${$("#about_me").val()}`,
        lead_source: "HIRING FORM",
        country_code: "91",
        createdBy: $("#full_name").val(),
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
      city: {
        required: true,
      },
      courses: {
        required: true,
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
      city: {
        required: "City is Required.",
      },
      courses: {
        required: "Please select at least one course.",
      },
    },
    submitHandler: function (form) {
      const amount = (
        parseFloat($("#course_fee").val()) + parseFloat($("#course_gst").val())
      )
        .toFixed(2)
        .toString();
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
             <div class="text-dark">Sub Total</div>
             <div class="text-dark">₹ ${new Intl.NumberFormat("en-IN").format(
      data.course_fee
    )}</div>
           </div>
           <div class="d-flex justify-content-between align-items-center py-2">
             <div class="text-dark">GST</div>
             <div class="text-dark">₹ ${new Intl.NumberFormat("en-IN").format(
      data.course_gst
    )}</div>
           </div>
           <div style="width: 100%; border-bottom: 1px solid #2f3437"></div>
           <div class="d-flex justify-content-between align-items-center py-2">
             <div class="text-dark">Total</div>
             <div class="text-dark">₹ ${new Intl.NumberFormat("en-IN").format(
      (
        parseFloat(data.course_fee) + parseFloat(data.course_gst)
      ).toFixed(2)
    )}</div>
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
        payload.append(
          "subject",
          `Secure Your Spot: Complete Your ${modalData.course} Payment Today!`
        );
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
      body {
        background-color: #f7f9fc;
        font-family: "Arial", sans-serif;
        color: #333;
        margin: 0;
        padding: 0;
      }

      .container {
        max-width: 650px;
        background-color: #ffffff;
        margin: 40px auto;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        border-top: 5px solid #0076f7;
        border-bottom: 3px solid #888888;
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 25px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
      }

      .header img {
        width: 120px;
      }

      .headerText a {
        font-size: 12px;
        text-decoration: none;
        color: #000;
      }

      .message {
        padding: 10px 25px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
      }

      .message a {
        color: #0076f7;
      }

      .content {
        padding: 0px 25px;
        line-height: 1.6;
      }

      .content h4 {
        color: #0076f7;
        font-size: 28px;
        margin-top: 15px;
        margin-bottom: 15px;
      }

      .content p {
        font-size: 15px;
        margin-bottom: 20px;
      }

      .vendor-details {
        margin: 20px 0;
        padding: 15px;
        border: 1px solid #ddd;
        background-color: #f9f9f9;
      }

      .vendor-details h2 {
        color: #333;
        font-size: 20px;
        margin-bottom: 10px;
        margin-top: 0px;
      }

      .vendor-details .col-6 {
        flex: 0 0 50%;
        max-width: 50%;
      }

      .vendor-details p {
        margin: 0px;
      }

      .vendor-details .sub-heading span {
        color: #6b7b93;
      }

      .cta-button {
        text-align: center;
        margin: 40px 0;
      }

      .cta-button a {
        background-color: #0076f7;
        color: #fff;
        padding: 14px 28px;
        font-size: 16px;
        text-decoration: none;
        border-radius: 6px;
        box-shadow: 0 4px 10px rgba(255, 153, 0, 0.2);
        transition: background-color 0.3s;
      }

      .cta-button a:hover {
        background-color: #cc3b3b;
      }
      .user-details {
        padding: 15px 25px;
      }
      .course-details {
        padding: 15px 25px;
      }

      .align_button {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .align_button input {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 15px;
        background-color: #0076f7;
        color: #fff;
        border: 1px solid #0076f7;
        border-radius: 6px;
      }
      .align_button input:hover {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 15px;
        background-color: #fff;
        color: #0076f7;
        border: 1px solid #0076f7;
        border-radius: 6px;
      }
      .fee_details {
        display: flex;
        justify-content: space-between !important;
        align-items: center;
        padding: 15px 0;
      }

      .footer img {
        width: 120px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div
        class="header"
        style="padding: 25px; border-bottom: 1px solid #ddd; text-align: center"
      >
        <table
          width="100%"
          cellspacing="0"
          cellpadding="0"
          style="border-collapse: collapse"
        >
          <tr>
            <td align="left" style="vertical-align: middle">
              <img
                src="https://sgitjobs.com/logo/Cloud_ECS_Infotech.png"
                alt="Deals Machi"
                style="max-width: 150px; height: auto"
              />
            </td>
            <td align="right" style="vertical-align: middle">
              <div class="headerText" style="font-size: 14px; color: #333">
                <a
                  href="https://info@ecsaio.in/"
                  target="_blank"
                  style="text-decoration: none; color: #333"
                >
                  Your <span style="color: #005aea">info@ecsaio.in</span>
                </a>
                |
                <a
                  href="tel:919150150687"
                  target="_blank"
                  style="text-decoration: none; color: #333"
                >
                  +91 9150150687
                </a>
              </div>
            </td>
          </tr>
        </table>
      </div>
      <div class="message">
        <p>Hello ${modalData.name}!</p>
        <p>
          Thank you for registering for the course
          <strong> ${modalData.course}</strong> on our platform. Below are the
          details of your registration and payment request.
        </p>
      </div>
      <div class="user-details">
        <h2>User Details</h2>
        <p class="sub-heading">Name: <span>${modalData.name}</span></p>
        <p class="sub-heading">Email: <span>${modalData.email}</span></p>
        <p class="sub-heading">
          Phone Number: <span>+91 ${modalData.phoneNumber}</span>
        </p>
        <p class="sub-heading">Address: <span>${modalData.city}</span></p>
      </div>
      <div class="course-details">
        <h2>Course Details</h2>
        <p class="course_details">Course Title: ${modalData.course}</p>

        <table
          width="100%"
          cellspacing="0"
          cellpadding="0"
          style="border-collapse: collapse"
        >
          <tr>
            <td align="left" style="vertical-align: middle; padding: 15px 0">
              Amount :
            </td>
            <td align="right" style="vertical-align: middle">
             ₹ ${new Intl.NumberFormat("en-IN").format(modalData.course_fee)}
            </td>
          </tr>
          <tr>
            <td align="left" style="vertical-align: middle; padding: 15px 0">
              GST :
            </td>
            <td align="right" style="vertical-align: middle">
              ₹ ${new Intl.NumberFormat("en-IN").format(modalData.course_gst)}
            </td>
          </tr>
        </table>
        <hr />
        <table
          width="100%"
          cellspacing="0"
          cellpadding="0"
          style="border-collapse: collapse"
        >
          <tr>
            <td align="left" style="vertical-align: middle; padding: 15px 0">
              Total :
            </td>
            <td align="right" style="vertical-align: middle">
              ₹ ${new Intl.NumberFormat("en-IN").format(
            (
              parseFloat(modalData.course_fee) +
              parseFloat(modalData.course_gst)
            ).toFixed(2)
          )}
            </td>
          </tr>
        </table>
        <table
          width="100%"
          cellspacing="0"
          cellpadding="0"
          style="border-collapse: collapse"
        >
          <tr>
            <td align="center" style="padding: 15px 0">
              <form
                name="sdklaunch"
                id="sdklaunch"
                action="${response.href}"
                method="POST"
              >
                <input
                  type="hidden"
                  id="bdorderid"
                  name="bdorderid"
                  value="${response.bdOrderId}"
                />
                <input
                  type="hidden"
                  id="merchantid"
                  name="merchantid"
                  value="${response.merchantId}"
                />
                <input
                  type="hidden"
                  id="rdata"
                  name="rdata"
                  value="${response.rdata}"
                />
                <div style="text-align: center">
                  <input
                    name="submit"
                    type="submit"
                    style="
                      display: inline-block;
                      padding: 14px 28px;
                      background-color: #0076f7;
                      color: #fff;
                      font-size: 16px;
                      text-decoration: none;
                      border-radius: 6px;
                      border: none;
                      cursor: pointer;
                      box-shadow: 0 4px 10px rgba(255, 153, 0, 0.2);
                      transition: background-color 0.3s;
                      margin: 0 182px;
                    "
                    value="Complete your Payment"
                  />
                </div>
              </form>
            </td>
          </tr>
        </table>
      </div>

      <div class="footer" style="padding: 15px 25px; text-align: center">
        <table
          width="100%"
          cellspacing="0"
          cellpadding="0"
          style="border-collapse: collapse"
        >
          <tr>
            <td align="left" style="vertical-align: middle">
              <img
                src="https://sgitjobs.com/logo/Cloud_ECS_Infotech.png"
                alt="dealsmachi"
                style="max-width: 150px; height: auto; margin-bottom: 10px"
              />
            </td>
            <td align="right" style="vertical-align: middle">
              <p style="font-size: 12px; color: #333; margin: 0">
                Connect with
                <a
                  href="https://ecsaio.in/"
                  target="_blank"
                  style="color: #005aea; text-decoration: none"
                  >cloud ECS infotech</a
                >
                India
              </p>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </body>
</html>
    `
        );

        const apiUrl = "https://crmlah.com/ecscrm/api/sendMailWithOutToken";

        $.ajax({
          url: apiUrl,
          method: "POST",
          data: payload,
          processData: false,
          contentType: false,
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

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("course-register");
  const form = document.getElementById("course_register");

  modal.addEventListener("hidden.bs.modal", function () {
    form.reset();
  });
});