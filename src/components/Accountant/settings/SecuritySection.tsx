import React from 'react';
import { Shield } from 'lucide-react';
import type { SecurityItem as SecurityItemType } from '../../../types/settings.types';
import { SecurityItem } from './SecurityItem';
import { SectionHeader } from './SectionHeader';

interface SecuritySectionProps {
  onSecurityAction: (actionId: string) => void;
}

export const SecuritySection: React.FC<SecuritySectionProps> = ({ onSecurityAction }) => {
  const securityItems: SecurityItemType[] = [
    {
      id: 'change-password',
      title: 'Change Password',
      description: 'Last changed 14 days ago',
      buttonText: 'Update Password',
      buttonVariant: 'primary',
      icon: 'lock'
    },
    {
      id: 'two-factor-auth',
      title: 'Two-Factor Authentication',
      description: 'Text message to your phone number',
      buttonText: 'Enable 2FA',
      buttonVariant: 'success',
      icon: 'smartphone'
    },
    {
      id: 'login-verification',
      title: 'Login Verification',
      description: 'Verify with new devices or android',
      buttonText: 'Enable 2FA',
      buttonVariant: 'success',
      icon: 'shield'
    },
    {
      id: 'browser-sessions',
      title: 'Browser Sessions',
      description: 'Manage your active browser sessions across all devices.',
      buttonText: 'Cancel',
      buttonVariant: 'secondary',
      icon: 'eye'
    },
    {
      id: 'privacy-notifications',
      title: 'Privacy Notifications',
      description: 'Set up alerts for account changes',
      buttonText: '',
      buttonVariant: 'secondary',
      icon: 'shield',
      status: 'On file'
    },
    {
      id: 'multifactor-devices',
      title: 'Multifactor Opt. Devices',
      description: 'Set up alerts for account changes',
      buttonText: '',
      buttonVariant: 'secondary',
      icon: 'shield',
      status: 'On file'
    }
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <SectionHeader
        icon={Shield}
        iconColor="text-yellow-600"
        title="Account & Security"
        description="Manage your login security and authentication methods"
      />

      <div className="space-y-4">
        {securityItems.map((item) => (
          <SecurityItem
            key={item.id}
            item={item}
            onAction={onSecurityAction}
          />
        ))}
      </div>
    </div>
  );
};
