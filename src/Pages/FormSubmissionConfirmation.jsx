import { FaCheck } from 'react-icons/fa';
import { Link, useSearchParams } from 'react-router-dom';
import { buttonPrimary, buttonSecondary } from '../Components/shared/sectionStyles';

const FormSubmissionConfirmation = () => {
  const [searchParams] = useSearchParams();
  const formType = searchParams.get('type') || 'ppf'; // Default to 'ppf' for backward compatibility

  // Determine the message based on form type
  const getMessage = () => {
    if (formType === 'drf') {
      return 'Thank you for submitting your delegate registration form. Your submission has been received and is being reviewed.';
    }
    return 'Thank you for submitting your presentation proposal form. Your submission has been received and is being reviewed.';
  };

  return (
    <main className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-cream-soft px-4 py-16">
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 -top-24 size-96 rounded-full bg-sage/50 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -right-24 size-96 rounded-full bg-sky/50 blur-3xl" />

      <div className="relative w-full max-w-2xl rounded-[2rem] bg-white p-8 text-center shadow-xl shadow-ink/10 ring-1 ring-ink/5 sm:p-12">
        {/* Success Icon */}
        <div className="mx-auto grid size-20 place-items-center rounded-full bg-sage text-3xl text-sage-deep">
          <FaCheck aria-hidden="true" />
        </div>

        {/* Success Message */}
        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-ink">
          Form Submitted Successfully!
        </h1>

        <p className="mt-4 text-lg leading-relaxed text-ink/70">
          {getMessage()}
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/" className={buttonPrimary}>
            Return to Home
          </Link>
          <Link to="/conference" className={buttonSecondary}>
            View Conference Details
          </Link>
        </div>

        {/* Contact Information */}
        <p className="mt-10 border-t border-ink/10 pt-6 text-sm text-ink/60">
          If you have any questions, please contact us at{' '}
          <a href="mailto:theainet@gmail.com" className="font-semibold text-sage-deep underline-offset-4 hover:underline">
            theainet@gmail.com
          </a>
        </p>
      </div>
    </main>
  );
};

export default FormSubmissionConfirmation;
