import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <span className="text-lg font-semibold text-gray-700">GurukulSetu</span>
          <span className="text-sm text-gray-500">gurukulsetu.com</span>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <span className="text-sm font-medium text-blue-800">
            Effective Date: February 9, 2026
          </span>
        </div>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Introduction</h2>
          <p className="text-gray-700 leading-relaxed">
            Welcome to GurukulSetu. We are committed to protecting your privacy and ensuring the security of your personal information. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website 
            <span className="font-medium"> gurukulsetu.com </span> and use our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Information We Collect</h2>
          
          <div className="ml-6 space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Personal Information</h3>
              <p className="text-gray-700 mb-4">
                We may collect personal information that you voluntarily provide to us when you register on the website, 
                express interest in obtaining information about us or our services, participate in activities on the website, 
                or otherwise contact us. This information may include:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Name and contact information (email address, phone number)</li>
                <li>Educational institution details</li>
                <li>Student information (as applicable)</li>
                <li>Academic records and performance data</li>
                <li>Payment information (processed through secure third-party payment processors)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2.2 Automatically Collected Information</h3>
              <p className="text-gray-700">
                When you access our website, we may automatically collect certain information about your device, 
                including information about your web browser, IP address, time zone, and some of the cookies installed 
                on your device. We may also collect information about your browsing actions and patterns.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">3. How We Use Your Information</h2>
          <p className="text-gray-700 mb-4">
            We use the information we collect to:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <li>• Provide, operate, and maintain our services</li>
            <li>• Process your transactions and manage your account</li>
            <li>• Improve, personalize, and expand our services</li>
            <li>• Communicate with you, including for customer service and support</li>
            <li>• Send you updates, newsletters, and promotional materials (with your consent)</li>
            <li>• Monitor and analyze usage and trends to improve user experience</li>
            <li>• Ensure security and prevent fraud</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Information Sharing and Disclosure</h2>
          <p className="text-gray-700 mb-4">
            We may share your information in the following situations:
          </p>
          <ul className="space-y-3 text-gray-700">
            <li>
              <strong>With Service Providers:</strong> We may share your information with third-party service providers 
              who perform services on our behalf, such as payment processing, data analysis, and email delivery.
            </li>
            <li>
              <strong>For Legal Purposes:</strong> We may disclose your information if required by law or in response 
              to valid requests by public authorities.
            </li>
            <li>
              <strong>Business Transfers:</strong> In connection with any merger, sale of company assets, financing, 
              or acquisition of all or a portion of our business.
            </li>
            <li>
              <strong>With Your Consent:</strong> We may share your information for any other purpose with your consent.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Data Security</h2>
          <p className="text-gray-700">
            We implement appropriate technical and organizational security measures to protect your personal information 
            from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over 
            the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Data Retention</h2>
          <p className="text-gray-700">
            We will retain your personal information only for as long as necessary to fulfill the purposes outlined in 
            this Privacy Policy, unless a longer retention period is required or permitted by law.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">7. Your Rights</h2>
          <p className="text-gray-700 mb-4">
            Depending on your location, you may have the following rights regarding your personal information:
          </p>
          <ul className="columns-2 gap-8 text-gray-700">
            <li>• Access to your personal data</li>
            <li>• Correction of inaccurate or incomplete data</li>
            <li>• Deletion of your personal data</li>
            <li>• Restriction of processing</li>
            <li>• Data portability</li>
            <li>• Objection to processing</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">8. Cookies and Tracking Technologies</h2>
          <p className="text-gray-700">
            We use cookies and similar tracking technologies to track activity on our website and store certain information. 
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you 
            do not accept cookies, you may not be able to use some portions of our service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">9. Third-Party Links</h2>
          <p className="text-gray-700">
            Our website may contain links to third-party websites. We are not responsible for the privacy practices or 
            content of these third-party sites. We encourage you to read the privacy policies of any third-party sites you visit.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">10. Children's Privacy</h2>
          <p className="text-gray-700">
            Our services are designed for educational institutions and may be used by minors under parental or institutional 
            supervision. We do not knowingly collect personal information from children without appropriate consent. 
            If you believe we have collected information from a child without proper authorization, please contact us immediately.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">11. Changes to This Privacy Policy</h2>
          <p className="text-gray-700">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
            Privacy Policy on this page and updating the effective date. You are advised to review this Privacy Policy 
            periodically for any changes.
          </p>
        </section>

        <section className="border-t pt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">12. Contact Us</h2>
          <div className="bg-gray-50 p-8 rounded-lg">
            <p className="text-gray-700 mb-4">If you have any questions about this Privacy Policy, please contact us:</p>
            <div className="space-y-3 text-gray-700">
              <div>
                <strong>GurukulSetu</strong>
              </div>
              <div>
                <strong>Website:</strong>{' '}
                <a href="https://gurukulsetu.com" className="text-blue-600 hover:underline">
                  https://gurukulsetu.com
                </a>
              </div>
              <div>
                <strong>Email:</strong> [Your contact email]
              </div>
              <div>
                <strong>Admin Portal:</strong>{' '}
                <a href="https://gurukulsetu.com/admin" className="text-blue-600 hover:underline">
                  https://gurukulsetu.com/admin
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
