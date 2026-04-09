import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy & Cookies Policy",
  description:
    "Privacy and cookies policy for Guardians of Goodness website.",
};

export default function PrivacyPage() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="max-w-3xl mx-auto prose prose-gray prose-headings:font-display">
        <div className="flex items-center gap-3 mb-8">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-dark !mb-0">
            Privacy &amp; Cookies Policy
          </h1>
          <svg className="w-5 h-5 text-primary/20 flex-shrink-0 mt-2" viewBox="0 0 40 44" fill="currentColor">
            <ellipse cx="20" cy="30" rx="10" ry="9" />
            <circle cx="8" cy="16" r="4.5" />
            <circle cx="17" cy="10" r="4" />
            <circle cx="27" cy="10" r="4" />
            <circle cx="35" cy="16" r="4.5" />
          </svg>
        </div>

        <p className="text-sm text-dark/50 mb-8">
          Last updated: January 2024
        </p>

        <h2>1. Introduction</h2>
        <p>
          Guardians of Goodness (&quot;we&quot;, &quot;us&quot;, or
          &quot;our&quot;) operates the website{" "}
          <strong>{SITE.url}</strong>. This Privacy Policy explains how we
          collect, use, disclose, and safeguard your information when you visit
          our website.
        </p>

        <h2>2. Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <ul>
          <li>
            <strong>Personal Information:</strong> Name, email address, phone
            number, and any other information you voluntarily provide through our
            forms (adoption inquiries, consultation requests, join-us form).
          </li>
          <li>
            <strong>Usage Data:</strong> Information about how you access and use
            the website, including your IP address, browser type, pages visited,
            and time spent on pages.
          </li>
        </ul>

        <h2>3. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Respond to your inquiries and requests</li>
          <li>Process adoption applications</li>
          <li>Send you updates about our programs and events (with your consent)</li>
          <li>Improve our website and services</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2>4. Cookies</h2>
        <p>
          Our website may use cookies and similar tracking technologies to
          enhance your experience. Cookies are small data files stored on your
          device. You can control cookies through your browser settings.
        </p>
        <p>We use the following types of cookies:</p>
        <ul>
          <li>
            <strong>Essential Cookies:</strong> Necessary for the website to
            function properly.
          </li>
          <li>
            <strong>Analytics Cookies:</strong> Help us understand how visitors
            interact with our website.
          </li>
        </ul>

        <h2>5. Data Sharing</h2>
        <p>
          We do not sell, trade, or otherwise transfer your personal information
          to third parties. We may share information with trusted service
          providers who assist us in operating our website, provided they agree
          to keep this information confidential.
        </p>

        <h2>6. Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to
          protect your personal information against unauthorized access,
          alteration, disclosure, or destruction.
        </p>

        <h2>7. Your Rights</h2>
        <p>Under applicable data protection laws, you have the right to:</p>
        <ul>
          <li>Access your personal data</li>
          <li>Rectify inaccurate personal data</li>
          <li>Request erasure of your personal data</li>
          <li>Object to or restrict processing of your personal data</li>
          <li>Data portability</li>
          <li>Withdraw consent at any time</li>
        </ul>

        <h2>8. Children&apos;s Privacy</h2>
        <p>
          Our website is not intended for children under 16 years of age. We do
          not knowingly collect personal information from children.
        </p>

        <h2>9. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify
          you of any changes by posting the new policy on this page and updating
          the &quot;Last updated&quot; date.
        </p>

        <h2>10. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us
          at:{" "}
          <a href={`mailto:${SITE.email}`} className="text-primary hover:underline">
            {SITE.email}
          </a>
        </p>
      </div>
    </section>
  );
}
