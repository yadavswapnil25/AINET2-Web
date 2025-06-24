// utils/razorpay.js
export const initiatePayment = async ({ amount, name, email, contact }) => {
  return new Promise(async (resolve, reject) => {
    const loadScript = () =>
      new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });

    const isLoaded = await loadScript();
    if (!isLoaded) {
      return reject("Razorpay SDK failed to load");
    }

    const options = {
      key: "rzp_test_UrtmlRIU5M1TXE",
      amount: amount * 100, // convert to paisa
      currency: "INR",
      name: "AINET",
      description: "Membership Payment",
      handler: function (response) {
        console.log("Payment Success ✅", response);
        resolve(response);
      },
      prefill: {
        name,
        email,
        contact,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function (response) {
      console.error("Payment Failed ❌", response.error);
      reject(response.error.description || "Payment failed");
    });
  });
};
