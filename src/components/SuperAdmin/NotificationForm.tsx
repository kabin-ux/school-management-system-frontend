import { useState } from 'react';
import { Calendar, Clock, Mail, Smartphone, Send } from 'lucide-react';

interface NotificationFormData {
  title: string;
  targetAudience: string;
  messageContent: string;
  schoolSelections: string;
  schoolCode: string;
  notificationType: string;
  scheduleOption: string;
  scheduleDate: string;
  scheduleTime: string;
  specificSchool: boolean;
}

export default function NotificationForm() {
  const [formData, setFormData] = useState<NotificationFormData>({
    title: '',
    targetAudience: 'All Users',
    messageContent: '',
    schoolSelections: '',
    schoolCode: '',
    notificationType: 'App Push',
    scheduleOption: 'Send Now',
    scheduleDate: '',
    scheduleTime: '',
    specificSchool: false
  });

  const handleInputChange = (field: keyof NotificationFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSendNotification = () => {
    console.log('Sending notification:', formData);
    // Handle form submission
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Send New Notification</h2>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Notification Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notification Title</label>
            <input
              type="text"
              placeholder="Enter notification title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Target Audience */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
            <select
              value={formData.targetAudience}
              onChange={(e) => handleInputChange('targetAudience', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>All Users</option>
              <option>Parents</option>
              <option>Teachers</option>
              <option>Students</option>
              <option>Administrators</option>
            </select>
          </div>
        </div>

        {/* Message Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Message Content</label>
          <div className="relative">
            <textarea
              placeholder="Enter your notification message here..."
              value={formData.messageContent}
              onChange={(e) => handleInputChange('messageContent', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            <div className="absolute bottom-2 right-2 text-sm text-gray-500">
              {formData.messageContent.length}/280
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* School Selections */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">School Selections</label>
            <input
              type="text"
              placeholder="Enter School/Department here"
              value={formData.schoolSelections}
              onChange={(e) => handleInputChange('schoolSelections', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* School Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">School Code</label>
            <input
              type="text"
              placeholder="Enter the school Code here"
              value={formData.schoolCode}
              onChange={(e) => handleInputChange('schoolCode', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Send notifications to Specific School Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="specificSchool"
            checked={formData.specificSchool}
            onChange={(e) => handleInputChange('specificSchool', e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="specificSchool" className="ml-2 text-sm text-gray-700">
            Send notifications to Specific School
          </label>
        </div>

        {/* Notification Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Notification Type</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="notificationType"
                value="App Push"
                checked={formData.notificationType === 'App Push'}
                onChange={(e) => handleInputChange('notificationType', e.target.value)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
              />
              <Smartphone className="w-4 h-4 ml-2 mr-1" />
              <span className="text-sm text-gray-700">App Push</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="notificationType"
                value="Email"
                checked={formData.notificationType === 'Email'}
                onChange={(e) => handleInputChange('notificationType', e.target.value)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
              />
              <Mail className="w-4 h-4 ml-2 mr-1" />
              <span className="text-sm text-gray-700">Email</span>
            </label>
          </div>
        </div>

        {/* Schedule Options */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Schedule Option</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="scheduleOption"
                  value="Send Now"
                  checked={formData.scheduleOption === 'Send Now'}
                  onChange={(e) => handleInputChange('scheduleOption', e.target.value)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Send Now</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="scheduleOption"
                  value="Schedule Later"
                  checked={formData.scheduleOption === 'Schedule Later'}
                  onChange={(e) => handleInputChange('scheduleOption', e.target.value)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Schedule Later</span>
              </label>
            </div>
          </div>

          {formData.scheduleOption === 'Schedule Later' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Schedule date</label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.scheduleDate}
                    onChange={(e) => handleInputChange('scheduleDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Schedule Time</label>
                <div className="relative">
                  <input
                    type="time"
                    value={formData.scheduleTime}
                    onChange={(e) => handleInputChange('scheduleTime', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Clock className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Send Button */}
        <div className="flex justify-end pt-4">
          <button
            onClick={handleSendNotification}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Send Notification
          </button>
        </div>
      </div>
    </div>
  );
}