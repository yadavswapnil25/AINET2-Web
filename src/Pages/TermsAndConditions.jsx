import { Link } from 'react-router-dom';
import PolicyPage from '../Components/shared/PolicyPage';

const TermsAndConditions = () => {
  return (
    <PolicyPage title="Terms and Conditions" effectiveDate="May 8, 2025">
      <p>
        Welcome to <strong>AINET</strong> . These Terms and Conditions govern your use of our website located at <strong>www.ainet.com</strong> and the services provided therein.
      </p>

      <p>
        By accessing or using our Website, you agree to be bound by these Terms. If you do not agree with these Terms, please do not access or use our Website.
      </p>

      <h2>1. Eligibility</h2>
      <p>
        You must be at least 18 years of age or have the legal authority under applicable law to agree to these Terms on behalf of another person or entity.
      </p>

      <h2>2. Use of the Website</h2>
      <p>
        You agree to use the Website only for lawful purposes and in a way that does not infringe the rights of any third party or restrict or inhibit anyone else's use of the Website.
      </p>

      <h2>3. Account Registration</h2>
      <p>
        Some parts of our Website may require account registration. You agree to provide accurate and complete information and to keep it up to date. You are responsible for safeguarding your login credentials.
      </p>

      <h2>4. Payment Terms</h2>
      <p>
        We use <strong>Razorpay</strong> as our third-party payment gateway to process all online payments. By making a payment through our Website, you agree to the following:
      </p>
      <ul>
        <li>All transactions are subject to Razorpay’s terms and privacy policy.</li>
        <li>You authorize us and Razorpay to charge your selected payment method for the total amount of your order, including any applicable taxes and fees.</li>
        <li>We do not store your credit/debit card details. All sensitive payment data is handled securely by Razorpay.</li>
      </ul>
      <p>
        For payment issues, contact us at <strong>support@ainet.com</strong>, and we will assist you in resolving the issue with Razorpay.
      </p>

      <h2>5. Refunds and Cancellations</h2>
      <p>
        Our refund and cancellation policy is outlined in our <Link to="/RefundPolicy">Refund Policy</Link>. We reserve the right to approve or deny refund requests at our discretion.
      </p>

      <h2>6. Intellectual Property</h2>
      <p>
        All content, trademarks, logos, graphics, and software on AINET are the property of AINET or its licensors and protected by copyright and other laws.
      </p>

      <h2>7. Limitation of Liability</h2>
      <p>We are not liable for any damages resulting from:</p>
      <ul>
        <li>Your use or inability to use the Website.</li>
        <li>Unauthorized access to your data.</li>
        <li>Third-party content or conduct on the Website.</li>
      </ul>

      <h2>8. Termination</h2>
      <p>
        We may suspend or terminate your access to AINET at any time without notice for violating these Terms.
      </p>

      <h2>9. Changes to the Terms</h2>
      <p>
        We may update these Terms at any time. Updates will be posted on this page. Your continued use of AINET confirms your acceptance of those changes.
      </p>

      <h2>10. Governing Law</h2>
      <p>
        These Terms are governed by the laws of India. Legal disputes shall be resolved in the courts of <strong>Mumbai, Maharashtra</strong>, India.
      </p>

      <h2>11. Contact Us</h2>
      <ul>
        <li>Email: <a href="mailto:support@ainet.com">support@ainet.com</a></li>
        <li>Phone: +91 - 9322890031</li>
        <li>Address: 7, Professor Colony, St. Kabir Ward, Bhandara (MS) 441904</li>
      </ul>
    </PolicyPage>
  );
};

export default TermsAndConditions;
