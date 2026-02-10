import React from 'react';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms and Conditions</h1>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Acceptance of Terms</h2>
          <p className="text-gray-700 leading-relaxed">
            By accessing and using GurukulSetu ("the Platform"), available at{' '}
            <span className="font-medium">gurukulsetu.com</span>, you accept and agree to be bound by these Terms and 
            Conditions. If you do not agree to these terms, please do not use our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Description of Service</h2>
          <p className="text-gray-700 leading-relaxed">
            GurukulSetu is an educational management platform that provides tools and services for educational 
            institutions, administrators, teachers, students, and parents. Our services include but are not limited 
            to student management, academic tracking, communication tools, and administrative features accessible 
            through{' '}
            <a href="https://gurukulsetu.com/admin" className="text-blue-600 hover:underline font-medium">
              https://gurukulsetu.com/admin
            </a>{' '}
            and other platform areas.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">3. User Accounts</h2>
          
          <div className="ml-6 space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3.1 Account Creation</h3>
              <p className="text-gray-700">
                To access certain features of the Platform, you may be required to create an account. You agree to 
                provide accurate, current, and complete information during the registration process and to update 
                such information to keep it accurate, current, and complete.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3.2 Account Security</h3>
              <p className="text-gray-700">
                You are responsible for safeguarding your password and for all activities that occur under your 
                account. You agree to notify us immediately of any unauthorized use of your account or any other 
                breach of security.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3.3 Account Types</h3>
              <p className="text-gray-700">
                Different user types (administrators, teachers, students, parents) have different access levels 
                and permissions within the Platform.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">4. User Responsibilities</h2>
          <p className="text-gray-700 mb-4">
            You agree to use the Platform only for lawful purposes and in accordance with these Terms. You agree not to:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 space-y-2">
            <li>• Use the Platform in any way that violates any applicable national or international law or regulation</li>
            <li>• Transmit any material that is defamatory, offensive, or otherwise objectionable</li>
            <li>• Attempt to gain unauthorized access to any portion of the Platform</li>
            <li>• Interfere with or disrupt the Platform or servers or networks connected to the Platform</li>
            <li>• Impersonate or attempt to impersonate another user or person</li>
            <li>• Use any automated system to access the Platform without our express written permission</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Intellectual Property Rights</h2>
          
          <div className="ml-6 space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">5.1 Platform Content</h3>
              <p className="text-gray-700">
                The Platform and its entire contents, features, and functionality (including but not limited to all 
                information, software, text, displays, images, video, and audio, and the design, selection, and 
                arrangement thereof) are owned by GurukulSetu and are protected by copyright, trademark, and other 
                intellectual property laws.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">5.2 User Content</h3>
              <p className="text-gray-700">
                You retain all rights to any content you submit, post, or display on or through the Platform. By 
                submitting content, you grant GurukulSetu a worldwide, non-exclusive, royalty-free license to use, 
                reproduce, and display such content in connection with providing the services.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Payment Terms</h2>
          
          <div className="ml-6 space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">6.1 Fees</h3>
              <p className="text-gray-700">
                Certain features of the Platform may require payment of fees. You agree to pay all applicable fees 
                as described on the Platform at the time of purchase.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">6.2 Payment Processing</h3>
              <p className="text-gray-700">
                Payments are processed through secure third-party payment processors. We do not store your complete 
                payment card information on our servers.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">6.3 Refunds</h3>
              <p className="text-gray-700">
                Refund policies will be communicated at the time of purchase. Generally, refunds are provided at our 
                discretion and subject to specific conditions.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">7. Privacy and Data Protection</h2>
          <p className="text-gray-700">
            Your use of the Platform is also governed by our{' '}
            <a href="/privacy" className="text-blue-600 hover:underline font-medium">
              Privacy Policy
            </a>
            , which is incorporated into these Terms by reference. Please review our Privacy Policy to understand 
            our practices regarding the collection and use of your personal information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">8. Prohibited Uses</h2>
          <p className="text-gray-700 mb-4">
            In addition to other prohibitions set forth in these Terms, you are prohibited from:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 space-y-2">
            <li>• Using the Platform for any illegal or unauthorized purpose</li>
            <li>• Violating any laws in your jurisdiction</li>
            <li>• Infringing upon or violating our intellectual property rights or the rights of others</li>
            <li>• Harassing, abusing, or harming another person</li>
            <li>• Submitting false or misleading information</li>
            <li>• Uploading or transmitting viruses or any other type of malicious code</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">9. Termination</h2>
          <p className="text-gray-700">
            We may terminate or suspend your account and access to the Platform immediately, without prior notice or 
            liability, for any reason, including without limitation if you breach these Terms. Upon termination, your 
            right to use the Platform will immediately cease.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">10. Disclaimers</h2>
          
          <div className="ml-6 space-y-4">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">10.1 "As Is" Basis</h3>
              <p className="text-gray-700">
                The Platform is provided on an "AS IS" and "AS AVAILABLE" basis. GurukulSetu makes no representations 
                or warranties of any kind, express or implied, as to the operation of the Platform or the information, 
                content, materials, or products included on the Platform.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">10.2 No Warranty</h3>
              <p className="text-gray-700">
                We do not warrant that the Platform will be uninterrupted, timely, secure, or error-free. We do not 
                warrant that the results obtained from the use of the Platform will be accurate or reliable.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">11. Limitation of Liability</h2>
          <p className="text-gray-700">
            To the fullest extent permitted by applicable law, GurukulSetu shall not be liable for any indirect, 
            incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether 
            incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting 
            from your access to or use of or inability to access or use the Platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">12. Indemnification</h2>
          <p className="text-gray-700">
            You agree to defend, indemnify, and hold harmless GurukulSetu and its officers, directors, employees, 
            and agents from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, 
            or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms 
            or your use of the Platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">13. Governing Law</h2>
          <p className="text-gray-700">
            These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], 
            without regard to its conflict of law provisions. Any disputes arising from these Terms or your use 
            of the Platform shall be subject to the exclusive jurisdiction of the courts located in [Your Jurisdiction].
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">14. Changes to Terms</h2>
          <p className="text-gray-700">
            We reserve the right to modify or replace these Terms at any time at our sole discretion. If a revision 
            is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes 
            a material change will be determined at our sole discretion.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">15. Severability</h2>
          <p className="text-gray-700">
            If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions 
            will remain in effect. The failure of GurukulSetu to enforce any right or provision of these Terms will not 
            be considered a waiver of those rights.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">16. Entire Agreement</h2>
          <p className="text-gray-700">
            These Terms constitute the entire agreement between you and GurukulSetu regarding the use of the Platform 
            and supersede all prior and contemporaneous written or oral agreements between you and GurukulSetu.
          </p>
        </section>

        <section className="border-t pt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">17. Contact Information</h2>
          <div className="bg-gray-50 p-8 rounded-lg">
            <p className="text-gray-700 mb-6">If you have any questions about these Terms and Conditions, please contact us:</p>
            <div className="space-y-4 text-gray-700">
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

export default TermsAndConditions;
