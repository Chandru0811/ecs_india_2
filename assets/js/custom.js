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
  $.validator.addMethod(
    "emailPattern",
    function (value, element) {
      return (
        this.optional(element) ||
        /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
      );
    },
    "Please enter a valid email address"
  );

  // Contact Form Validation
  $("#contactForm").validate({
    rules: {
      first_name: {
        required: true,
        minlength: 2,
        maxlength:255,
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
        maxlength: "Name cannot exceed 255 characters.",
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
        company_id: 43,
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
        company_id: 43,
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
        maxlength:255,
      },
      email: {
        required: true,
        emailPattern: true,
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
      location: {
        required: true,
        maxlength: 30,
      },
      about_me: {
        maxlength: 255,
      },
    },
    messages: {
      full_name: {
        required: "Please enter your full name*",
        minlength: "Your name must be at least 2 characters long",
        maxlength: "Name cannot exceed 255 characters.",
      },
      email: {
        required: "Please enter your email*",
        emailPattern: "Please enter a valid email address",
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
      location: {
        required: "Please enter your Location*",
        maxlength: "Location cannot exceed 30 characters.",
      },
      about_me: {
        maxlength: "About Me cannot exceed 255 characters.",
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
        description_info: `Location : ${$("#location").val()} ^ Course : ${$(
          "#course"
        ).val()} ^ Year of Passing : ${$(
          "#year_of_passing"
        ).val()} ^ About Candidate : ${$("#about_me").val()}`,
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

  // ====  Free certificate form validation   ==== //

  $("#freeCourseHiringForm").validate({
    rules: {
      full_name: {
        required: true,
        minlength: 3,
        maxlength:255,
      },
      email: {
        required: true,
        emailPattern: true,
      },
      mobile: {
        required: true,
        number: true,
        minlength: 10,
        maxlength: 10,
      },
      year_of_passing: {
        required: true,
      },
      course: {
        required: true,
      },
      // selectedCourse: {
      //   required: true,
      // },
      location: {
        required: true,
        maxlength: 30,
      },
      about_me: {
        maxlength: 255,
      },
    },
    messages: {
      full_name: {
        required: "Please enter your full name*",
        minlength: "Your name must be at least 2 characters long",
        maxlength: "Name cannot exceed 255 characters.",
      },
      email: {
        required: "Please enter your email*",
        emailPattern: "Please enter a valid email address",
      },
      mobile: {
        required: "Please enter your phone number*",
        number: "Please enter a valid phone number",
        minlength: "Your phone number must be  10 digits",
        maxlength: "Your phone number must be  10 digits",
      },
      year_of_passing: {
        required: "Please enter your year of passing*",
      },
      course: {
        required: "Please enter your course*",
      },
      location: {
        required: "Please enter your Location*",
        maxlength: "Location cannot exceed 30 characters.",
      },
      // selectedCourse: {
      //   // Add validation message for the course selection
      //   required: "Please select a course*",
      // },
      about_me: {
        maxlength: "About Me cannot exceed 255 characters.",
      },
    },
    errorPlacement: function (error, element) {
      if (element.attr("name") === "selectedCourse") {
        error.addClass("text-danger mt-1");
        // console.log(element.closest(".course-options-group"))
        error.insertAfter(element.closest(".course-options-group"));
      } else {
        error.addClass("text-danger mt-1");
        error.insertAfter(element);
      }
    },
    highlight: function (element) {
      $(element).addClass("is-invalid");
    },
    unhighlight: function (element) {
      $(element).removeClass("is-invalid");
    },
    submitHandler: function (form) {
      if (!$("#freeCourseHiringForm").valid()) {
        return false;
      }
      let payload;
      console.log(window.location.pathname.split("/").pop());
      if( window.location.pathname.split("/").pop()==="free_certificate_course"){
        payload = {
         first_name: $("#full_name").val(),
         email: $("#email").val(),
         phone: $("#mobile").val(),
         company_id: 53,
         company: "Cloud ECS Infotech",
         lead_status: "PENDING",
         description_info: `Location : ${$("#location").val()} ^ Course : ${$(
           "#course"
         ).val()} ^ selected Course : ${
           $("input[name='selectedCourse']:checked").val()
             ? $("input[name='selectedCourse']:checked").val()
             : ""
         } ^ Year of Passing : ${$(
           "#year_of_passing"
         ).val()} ^ About Candidate : ${
           $("#about_me").val() ? $("#about_me").val() : ""
         }`,
         lead_source: "Free Course Internship",
         country_code: "91",
         createdBy: $("#full_name").val(),
       };
      }else {
        payload = {
          first_name: $("#full_name").val(),
          email: $("#email").val(),
          phone: $("#mobile").val(),
          company_id: 54,
          company: "Cloud ECS Infotech",
          lead_status: "PENDING",
          description_info: `Location : ${$("#location").val()} ^ Course : ${$(
            "#course"
          ).val()} ^ selected Course : ${
            $("input[name='selectedCourse']:checked").val()
              ? $("input[name='selectedCourse']:checked").val()
              : ""
          } ^ Year of Passing : ${$(
            "#year_of_passing"
          ).val()} ^ About Candidate : ${
            $("#about_me").val() ? $("#about_me").val() : ""
          }`,
          lead_source: "MBA Intern Ship",
          country_code: "91",
          createdBy: $("#full_name").val(),
        };
      }
      $.ajax({
        url: "https://crmlah.com/ecscrm/api/newClient",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(payload),
        success: function (response) {
          showSuccessModal();
          console.log("payload", payload);
          $(form).trigger("reset");
          const mailPayload = new FormData();
          mailPayload.append("from", "ecscloudinfotech@gmail.com");
          mailPayload.append("to", payload.email);
          mailPayload.append("subject", `Join Our WhatsApp Channel for Updates on Your Free Certificate Course`);
          mailPayload.append(
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
                alt="Cloud ECS Infotech"
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
        <h4 style="margin: 3rem 0 0 0;">Dear ${payload.first_name}</h4>
        <p style="margin: 3rem 0 0 0;">
          Thank you for your application to our Free Certificate Course!
        </p>
        <p style="margin: 2rem 0 0 0;">
          To stay updated on your upcoming sessions, please join our official Cloud ECS Infotech Pvt Ltd WhatsApp channel. Here, you'll receive important updates and information regarding the course.
        </p>
        <p style="margin: 2rem 0 0 0;">
          Follow the link to join the channel: 
        </p>
        <p style="margin: 3px 0 0 0;">
          🔗 <a href="https://whatsapp.com/channel/0029VazH0d7BlHpUQDF9Ou2P">https://whatsapp.com/channel/0029VazH0d7BlHpUQDF9Ou2P</a> 
        </p>
        <p style="margin: 3rem 0 0 0;">
          We look forward to having you with us!
        </p>
        <p style="margin: 3rem 0 0 0;">
          Best regards,
        </p>
        <p style="margin: 5px 0 2rem 0;">
          Cloud ECS Infotech Pvt Ltd
        </p>
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
                alt="Cloud ECS infotech"
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
                >Cloud ECS Infotech</a
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
            data: mailPayload,
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
        },
        error: function () {
          showErrorModal();
        },
      });
    },
  });
});

$(document).ready(function () {
  $("#skill_register").validate({
    rules: {
      name: {
        required: true,
        minlength: 3,
        maxlength:255,
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
        maxlength: 30,
      },
      courses: {
        required: true,
      },
    },
    messages: {
      name: {
        required: "Name is Required.",
        minlength: "Your name must be at least 3 characters long.",
        maxlength: "Name cannot exceed 255 characters.",
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
        maxlength: "City name must not exceed 30 characters.",
      },
      courses: {
        required: "Please select at least one course.",
      },
    },
    submitHandler: function (form) {
      const amount = (
        parseFloat($("#register_course_fee").val()) +
        parseFloat($("#register_course_gst").val())
      )
        .toFixed(2)
        .toString();
      const modalData = {
        name: $("#register_name").val(),
        phoneNumber: $("#register_phone").val(),
        email: $("#register_checkout_email").val(),
        course_fee: $("#register_course_fee").val(),
        course_gst: $("#register_course_gst").val(),
        course: $("#register_courses").val(),
        city: $("#register_city").val(),
        amount: amount,
      };

      console.log("Form Data:", modalData);

      $.ajax({
        url: "https://crmlah.com/ecscrm/api/createEcsIndiaInternship",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(modalData),
        success: function (response) {
          $("#skill_register").trigger("reset");
          fillSecondModal(modalData);
          $("#skill-register").modal("hide");
          $("#skill_checkout").modal("show");
        },
        error: function (error) {
          console.error("Error:", error);
          alert("There was an error submitting the form.");
        },
      });
    },
  });

  $("#course_register").validate({
    rules: {
      name: {
        required: true,
        minlength: 3,
        maxlength:255,
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
        maxlength: 30,
      },
      courses: {
        required: true,
      },
    },
    messages: {
      name: {
        required: "Name is Required.",
        minlength: "Your name must be at least 3 characters long.",
        maxlength: "Name cannot exceed 255 characters.",
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
        maxlength: "City name must not exceed 30 characters.",
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
    $("#skill_checkout .amount-column").html(checkoutSummary);
    $("#checkout .amount-column").html(checkoutSummary);
  }

  $("#skill_checkout").on("click", ".checkout-btn", function (event) {
    event.preventDefault();

    const modalData = JSON.parse($(this).attr("data-modaldata"));
    const { course_fee, course_gst, ...value } = modalData;
    const apiData = { ...value, courseFee: course_fee, courseGst: course_gst };
    $.ajax({
      url: "https://crmlah.com/ecscrm/api/createBillDeskOrder",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(apiData),
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
                alt="Cloud ECS Infotech"
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
                  cursor: pointer ;
                  box-shadow: 0 4px 10px rgba(255, 153, 0, 0.2);
                  transition: background-color 0.3s, transform 0.2s;
                  margin: 0 182px;"
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
                alt="Cloud ECS infotech"
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
                >Cloud ECS Infotech</a
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

        $("#skill_register").trigger("reset");
        $("#skill_checkout").modal("hide");
      },
      error: function (error) {
        console.error("Error submitting order:", error);
        alert("There was an error submitting your order. Please try again.");
      },
    });
  });
  $("#checkout").on("click", ".checkout-btn", function (event) {
    event.preventDefault();

    const modalData = JSON.parse($(this).attr("data-modaldata"));
    const { course_fee, course_gst, ...value } = modalData;
    const apiData = { ...value, courseFee: course_fee, courseGst: course_gst };
    $.ajax({
      url: "https://crmlah.com/ecscrm/api/createBillDeskOrder",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(apiData),
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
                alt="Cloud ECS Infotech"
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
                  cursor: pointer ;
                  box-shadow: 0 4px 10px rgba(255, 153, 0, 0.2);
                  transition: background-color 0.3s, transform 0.2s;
                  margin: 0 182px;"
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
                alt="Cloud ECS infotech"
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
                >Cloud ECS Infotech</a
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
  const SkillModel = document.getElementById("skill-register");
  const SkilForm = document.getElementById("skill_register");
  const form = document.getElementById("course_register");

  SkillModel?.addEventListener("hidden.bs.modal", function () {
    SkilForm.reset();
  });
  modal?.addEventListener("hidden.bs.modal", function () {
    form.reset();
  });
});

// Login

$(document).ready(function () {
  $("#loginForm").validate({
    rules: {
      employeeId: {
        required: true,
      },
      password: {
        required: true,
      },
    },
    messages: {
      employeeId: {
        required: "Please enter your employee ID.",
      },
      password: {
        required: "Please enter your password.",
      },
    },
    errorElement: "div",
    errorClass: "error",
    errorPlacement: function (error, element) {
      if (element.attr("name") === "employeeId") {
        error.insertAfter(element.closest(".input-group"));
      } else if (element.attr("name") === "password") {
        error.insertAfter(element.closest(".input-group"));
      }
    },
    submitHandler: function (form) {
      const $submitButton = $(form).find("button[type='submit']");

      $submitButton
        .html('<i class="fa fa-spinner fa-spin"></i> Logging In...')
        .prop("disabled", true);

      const payload = {
        emp_id: $("#employeeId").val(),
        password: $("#password").val(),
      };

      $.ajax({
        url: "https://ecsaio.com/ecsaio/public/api/emp/login",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(payload),
        success: function (response) {
          // Check if the response has a token or some error info
          if (response.data) {
            const { token, userDetails } = response.data;
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("id", userDetails.id);
            sessionStorage.setItem("name", userDetails.name);
            sessionStorage.setItem("emp_id", userDetails.emp_id);
            sessionStorage.setItem("email", userDetails.email);
            sessionStorage.setItem("join_date", userDetails.join_date);
            sessionStorage.setItem("role", userDetails.role);

            $(form).trigger("reset");
            window.location.href = "/check_in_out";
          } else {
            $submitButton.html("Log In").prop("disabled", false);
          }
        },
        error: function (xhr, status, error) {
          $submitButton.html("Log In").prop("disabled", false);
          $(form).trigger("reset");
          alert("Invalid employee ID or password.");
        },
      });
    },
  });
});

$(document).ready(function () {
  $("#togglePassword").on("click", function () {
    const passwordField = $("#password");
    const passwordFieldType = passwordField.attr("type");

    if (passwordFieldType === "password") {
      passwordField.attr("type", "text");
      $(this).html('<i class="bi bi-eye-slash-fill"></i>');
    } else {
      passwordField.attr("type", "password");
      $(this).html('<i class="bi bi-eye-fill"></i>');
    }
  });
});

$(document).ready(function () {
  $("#checkAttendance").on("submit", function (e) {
    e.preventDefault();

    const token = sessionStorage.getItem("token");

    const selectedValue = $(
      "input[id='checkOut']:checked, input[id='checkIn']:checked"
    ).val();

    if (!selectedValue) {
      alert("No option selected");
      return;
    }
    const workingMode = $("#workingModeSelect").val();

    const work_log = $("#work_log").val();

    const $submitButton = $(this).find("button[type='submit']");

    $submitButton
      .html('<i class="fa fa-spinner fa-spin"></i> Processing...')
      .prop("disabled", true);

    const ajaxConfig = {
      type: "POST",
      contentType: "application/json",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      complete: function () {
        $submitButton.html("Submit").prop("disabled", false);
      },
    };

    if (selectedValue === "checkIn") {
      $.ajax({
        ...ajaxConfig,
        url: `https://ecsaio.com/ecsaio/public/api/emp/checkin?work_mode=${workingMode}?work_log=${work_log}`,
        type: "POST",
        contentType: "application/json",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        success: function (response) {
          console.log("Check-In API Response:", response);
          $("#successModal .SuccessMagnetSubHeading").html(
            "You checked In successfully!"
          );
          $("#successModal").modal("show");
          $("#checkAttendance")[0].reset();
        },
        error: function (xhr, status, error) {
          if (xhr.status === 422) {
            alert("You are already checked In!");
          } else {
            alert(
              "An unexpected error occurred: " +
                (xhr.responseJSON?.message || error)
            );
          }
        },
      });
    } else if (selectedValue === "checkOut") {
      $.ajax({
        ...ajaxConfig,
        url: `https://ecsaio.com/ecsaio/public/api/emp/checkout?work_mode=${workingMode}?work_log=${work_log}`,
        type: "POST",
        contentType: "application/json",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        success: function (response) {
          console.log("Check-Out API Response:", response);
          $("#successModal .SuccessMagnetSubHeading").html(
            "You checked Out successfully!"
          );
          $("#successModal").modal("show");
          $("#checkAttendance")[0].reset();
        },
        error: function (xhr, status, error) {
          if (xhr.status === 422) {
            alert("You are already checked out!");
          } else {
            alert(
              "An unexpected error occurred: " +
                (xhr.responseJSON?.message || error)
            );
          }
        },
      });
    } else {
      console.error("Invalid option selected:", selectedValue);
      alert("Invalid selection. Please try again.");
    }
  });
});

$(document).ready(function () {
  function populateOffcanvas() {
    const name = sessionStorage.getItem("name");
    const email = sessionStorage.getItem("email");
    const joinDate = sessionStorage.getItem("join_date");
    const role = sessionStorage.getItem("role");

    $(".list-group a:nth-child(1)").text(name || "Unknown");
    $(".list-group a:nth-child(2)").text(email || "No Email Provided");
    $(".list-group a:nth-child(3)").html(
      `<span>DOJ: </span>${joinDate || "N/A"}`
    );

    const roleText =
      role === "2" ? "Employee" : role === "1" ? "Admin" : "Unknown";
    $(".list-group a:nth-child(4)").text(roleText);
  }

  $("#userOffcanvas").on("show.bs.offcanvas", function () {
    populateOffcanvas();
  });
});

function check() {
  var checkOutAndCheckIn = document.querySelectorAll("#checkOut, #checkIn");

  checkOutAndCheckIn.forEach((radio) => {
    var parent = radio.closest(".check_inputs, .input_layout");

    if (parent && radio.checked) {
      parent.style.background = "green";
      parent.style.boxShadow = "0 4px 8px rgba(0, 128, 0, 0.3)";
      parent.style.color = "white";
      parent.style.transition =
        "background 0.3s, box-shadow 0.3s, color 0.3s, padding 0.3s";
    } else if (parent) {
      parent.style.background = "white";
      parent.style.boxShadow = "none";
      parent.style.color = "black";
    }
  });
}
