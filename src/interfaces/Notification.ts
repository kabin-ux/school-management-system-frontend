export interface NotificationLog {
  id: string;
  title: string;
  sentTo: string;
  type: string;
  sentOn: string;
  status: 'Sent' | 'Failed' | 'Scheduled';
}

export interface NotificationFormData {
  title: string;
  targetAudience: string;
  messageContent: string;
  schoolSelections: string;
  schoolCode: string;
  notificationType: string;
  scheduleOption: string;
  scheduleDate: string;
  scheduleTime: string;
}