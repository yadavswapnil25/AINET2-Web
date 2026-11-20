import PolicyPage from '../Components/shared/PolicyPage';

const RefundPolicy = () => {
    return (
        <PolicyPage title="Refund and Cancellation Policy">
            <p>
                At <strong>AINET</strong>, we are committed to providing a seamless experience for all our users. This Refund and Cancellation Policy outlines the terms under which refunds and cancellations may be processed.
            </p>

            <h2>1. Cancellation Policy</h2>
            <p>
                You may request cancellation of a service or transaction within <strong>24 hours</strong> of purchase, provided the service has not been used or initiated.
                To request cancellation, please contact our support team at <a href="mailto:support@ainet.com">support@ainet.com</a> with your order details.
            </p>

            <h2>2. Refund Eligibility</h2>
            <p>
                Refunds will only be issued under the following conditions:
            </p>
            <ul>
                <li>You have canceled the service within the allowed time window.</li>
                <li>The service or subscription has not been used or consumed.</li>
                <li>A valid reason for the refund request is provided and accepted by AINET.</li>
            </ul>

            <h2>3. Refund Processing Time</h2>
            <p>
                Once your refund is approved, we will initiate the refund to your original payment method. Please allow <strong>5–7 working days</strong> for the amount to reflect in your account.
                The actual time may vary depending on your bank or payment provider.
            </p>

            <h2>4. Non-Refundable Cases</h2>
            <p>
                Please note that we do not offer refunds under the following circumstances:
            </p>
            <ul>
                <li>The service has already been used or consumed.</li>
                <li>Refund request made after the cancellation window.</li>
                <li>Issues caused by the user, such as incorrect account information.</li>
            </ul>

            <h2>5. Contact Information</h2>
            <p>
                If you have any questions about cancellations or refunds, please contact us at:
            </p>
            <ul>
                <li>Email: <a href="mailto:support@ainet.com">support@ainet.com</a></li>
                <li>Phone: +91 - 9322890031</li>
                <li>Address: 7, Professor Colony, St. Kabir Ward, Bhandara (MS) 441904</li>
            </ul>
        </PolicyPage>
    );
};

export default RefundPolicy;
