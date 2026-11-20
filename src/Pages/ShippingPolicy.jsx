import PolicyPage from '../Components/shared/PolicyPage';

const ShippingPolicy = () => {
  return (
    <PolicyPage title="Shipping Policy" effectiveDate="May 8, 2025">
      <p>
        At <strong>AINET</strong>, we are committed to delivering your orders in a timely and efficient manner. This Shipping Policy explains how we handle order fulfillment, shipping timelines, and delivery methods.
      </p>

      <h2>1. Order Processing Time</h2>
      <p>
        All orders are processed within <strong>1–2 working days</strong> after the order confirmation and successful payment. Orders are not shipped or delivered on weekends or public holidays.
      </p>

      <h2>2. Shipping Timelines</h2>
      <p>Estimated delivery times after dispatch:</p>
      <ul>
        <li><strong>Domestic (within India):</strong> 3–7 working days</li>
        <li><strong>International:</strong> 7–15 working days</li>
      </ul>
      <p>
        Delivery time may vary depending on your location, courier delays, weather conditions, or local disruptions.
      </p>

      <h2>3. Shipping Charges</h2>
      <p>
        Shipping charges, if applicable, will be displayed at checkout before you make the payment. Free shipping may be available on selected products or promotions.
      </p>

      <h2>4. Tracking Information</h2>
      <p>
        Once your order is shipped, we will send you a tracking number via email or SMS. You can use this number to track the status of your shipment through the courier's tracking page.
      </p>

      <h2>5. Delays &amp; Exceptions</h2>
      <p>
        In rare cases, shipping delays may occur due to unforeseen circumstances. We will do our best to inform you and support you during such events. AINET is not responsible for delays caused by courier services, customs, or force majeure events.
      </p>

      <h2>6. Delivery Address</h2>
      <p>
        Please ensure the shipping address provided during checkout is accurate and complete. We are not responsible for failed deliveries due to incorrect or incomplete addresses.
      </p>

      <h2>7. Contact Information</h2>
      <p>
        If you have any questions about shipping, tracking, or your delivery, feel free to contact us:
      </p>
      <ul>
        <li>Email: <a href="mailto:support@ainet.com">support@ainet.com</a></li>
        <li>Phone: +91 - 9322890031</li>
        <li>Address: 7, Professor Colony, St. Kabir Ward, Bhandara (MS) 441904</li>
      </ul>
    </PolicyPage>
  );
};

export default ShippingPolicy;
