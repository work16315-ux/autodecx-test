import React from 'react'
import { motion } from 'framer-motion'

const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 18-6-6 6-6"></path>
  </svg>
)

interface Notification {
  id: string
  icon: 'goal' | 'reminder' | 'habit' | 'progress' | 'mechanic' | 'roadside'
  title: string
  message: string
  time: string
  unread?: boolean
}

interface NotificationsScreenProps {
  onBack: () => void
}

const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ onBack }) => {
  // Sample notifications - in real app, these would come from your backend
  const notifications: Notification[] = [
    {
      id: '1',
      icon: 'mechanic',
      title: 'Mechanic Response',
      message: 'Your mechanic has reviewed your engine diagnosis.',
      time: '2h ago',
      unread: true,
    },
    {
      id: '2',
      icon: 'roadside',
      title: 'Roadside Assistance',
      message: 'Your roadside assistance request has been confirmed.',
      time: '5h ago',
      unread: true,
    },
    {
      id: '3',
      icon: 'goal',
      title: 'Diagnosis Complete',
      message: 'Your vehicle diagnosis report is ready to view.',
      time: '8h ago',
      unread: true,
    },
    {
      id: '4',
      icon: 'reminder',
      title: 'Service Reminder',
      message: 'Your vehicle service is due in 2 weeks.',
      time: '1d ago',
      unread: false,
    },
    {
      id: '5',
      icon: 'progress',
      title: 'Parts Order Update',
      message: 'Your ordered parts are ready for pickup.',
      time: '1d ago',
      unread: false,
    },
  ]

  const getIconComponent = (type: Notification['icon']) => {
    switch (type) {
      case 'goal':
        return (
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-600">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="m9 12 2 2 4-4"></path>
            </svg>
          </div>
        )
      case 'reminder':
        return (
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-orange-600">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 6v6l4 2"></path>
            </svg>
          </div>
        )
      case 'habit':
        return (
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-600">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
        )
      case 'progress':
        return (
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-600">
              <path d="M6 9h14M6 15h14M12 3v18"></path>
            </svg>
          </div>
        )
      case 'mechanic':
        return (
          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-600">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
            </svg>
          </div>
        )
      case 'roadside':
        return (
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-orange-600">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="w-full h-screen bg-white overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <div className="text-gray-700">
              <BackIcon />
            </div>
          </motion.button>
          <h1 className="text-lg font-semibold text-gray-800">Notifications</h1>
          <div className="w-10"></div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="px-4 py-4">
        {notifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileTap={{ scale: 0.98 }}
            className="relative flex items-start gap-3 py-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
          >
            {/* Icon */}
            <div className="flex-shrink-0 relative">
              {getIconComponent(notification.icon)}
              {notification.unread && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-600 rounded-full border-2 border-white"></div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                {notification.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {notification.message}
              </p>
            </div>

            {/* Time */}
            <div className="flex-shrink-0 text-xs text-gray-500 ml-2">
              {notification.time}
            </div>
          </motion.div>
        ))}

        {/* Empty state if no notifications */}
        {notifications.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </div>
            <p className="text-gray-500 text-sm">No notifications yet</p>
          </div>
        )}

        {/* Bottom spacing */}
        <div className="h-8"></div>
      </div>
    </div>
  )
}

export default NotificationsScreen
