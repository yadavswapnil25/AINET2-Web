import PolicyPage from '../Components/shared/PolicyPage';

const PrivacyPolicy = () => {
  return (
    <PolicyPage title="Privacy Policy" effectiveDate="May 8, 2025">
      <p>
        At <strong>AINET</strong>, we are committed to protecting your personal information and your right to privacy. This Privacy Policy describes how we collect, use, store, and disclose your information when you use our website at <strong>www.ainet.com</strong>.
      </p>

      <h2>1. Information We Collect</h2>
      <p>We may collect the following types of information:</p>
      <ul>
        <li><strong>Personal Information:</strong> Name, email address, phone number, billing/shipping address, etc.</li>
        <li><strong>Payment Details:</strong> Processed securely via Razorpay; we do not store credit/debit card details.</li>
        <li><strong>Technical Data:</strong> IP address, browser type, device info, access times, and visited pages.</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>Your information may be used to:</p>
      <ul>
        <li>Process transactions and send order confirmations</li>
        <li>Provide customer support</li>
        <li>Send updates, newsletters, or promotions (if subscribed)</li>
        <li>Improve our services and user experience</li>
        <li>Prevent fraud or illegal activities</li>
      </ul>

      <h2>3. Sharing Your Data</h2>
      <p>
        We do not sell or rent your personal information. However, we may share data with:
      </p>
      <ul>
        <li>Trusted third-party service providers (like Razorpay, email service providers, logistics partners)</li>
        <li>Law enforcement agencies if required by law</li>
      </ul>

      <h2>4. Data Security</h2>
      <p>
        We take appropriate technical and organizational measures to protect your data from unauthorized access, loss, or misuse. Payments are processed securely using industry-standard encryption.
      </p>

      <h2>5. Cookies</h2>
      <p>
        Our website uses cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings, although this may affect some functionalities of the site.
      </p>

      <h2>6. Your Rights</h2>
      <p>
        You have the right to access, update, or delete your personal information. To request changes, contact us using the information provided below.
      </p>

      <h2>7. Third-Party Links</h2>
      <p>
        Our site may contain links to external websites. We are not responsible for the content or privacy practices of those sites. Please read their privacy policies before providing any information.
      </p>

      <h2>8. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Changes will be posted on this page with the updated effective date. We encourage you to review this page regularly.
      </p>

      <h2>9. Contact Us</h2>
      <p>
        If you have any questions or concerns about our Privacy Policy, feel free to reach out:
      </p>
      <ul>
        <li>Email: <a href="mailto:support@ainet.com">support@ainet.com</a></li>
        <li>Phone: +91 - 9322890031</li>
        <li>Address: 7, Professor Colony, St. Kabir Ward, Bhandara (MS) 441904</li>
      </ul>
    </PolicyPage>
  );
};

export default PrivacyPolicy;
