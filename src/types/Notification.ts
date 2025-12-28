export type NotificationStatus = 'Sent' | 'Failed' | 'Schedule';

export type NotificationChannel = 'mail' | 'notification';

export const NoticeType = {
  MAINTENANCE: "maintenance",
  EVENT: "event",
  ANNOUNCEMENT: "announcement",
  FEATURES: "features",
  OTHER: "other",
  WARNING: "warning",
  BILLING: "billing",
} as const;

export type NoticeType = typeof NoticeType[keyof typeof NoticeType];

export interface NotificationLogItem {
  id: number;
  title: string;
  sentTo: string;
  type: NotificationChannel[];
  sentOn: string;
  status: NotificationStatus;
  statusColor: string;
}

export type NotificationTab = 'All' | 'Sent' | 'Schedule' | 'Failed';

export interface NotificationFormState {
  title: string;
  targetAudience: 'Teachers Only' | 'Students Only' | 'All Users';
  message: string;
  specificStudent: string;
  specificTeacher: string;
  notificationType: 'app-push' | 'email';
  scheduleOption: 'send-now' | 'schedule-later';
  scheduleDate: string;
  scheduleTime: string;
  sendToSpecific: boolean;
}

export interface NotificationFormData {
  subject: string;
  notice_for: "all" | "someone";
  message: string;
  type: NoticeType;
  recipients?: string[]
}
