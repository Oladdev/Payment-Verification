const paymentForm = document.getElementById("form");
paymentForm.addEventListener("submit", payWithPaystack);

function payWithPaystack(e) {
  e.preventDefault();

  let fullname = document.getElementById("fullname").value;
  let matric = document.getElementById("matric").value.replace(/\//g, "");
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let group = document.getElementById("group").value;

  let handler = PaystackPop.setup({
    key: "pk_test_87aeb5f1594f41a424ce5e74a6d78f94fbcd5075", // Replace with your own test key
    email: email,
    amount: 200000, // Amount in Kobo (₦2000 = 200000)
    currency: "NGN",
    ref: `${matric}_${Date.now()}`, // Unique transaction reference
    metadata: {
      custom_fields: [
        {
          display_name: "Full Name",
          variable_name: "full_name",
          value: fullname,
        },
        {
          display_name: "Matric Number",
          variable_name: "matric",
          value: matric,
        },
        {
          display_name: "Phone",
          variable_name: "phone",
          value: phone,
        },
        {
          display_name: "Group",
          variable_name: "group",
          value: group,
        },
      ],
    },
    callback: function (response) {
      alert("✅ Payment successful!\nReference: " + response.reference);
    },
    onClose: function () {
      alert("❌ Payment window closed.");
    },
  });

  handler.openIframe();
}
