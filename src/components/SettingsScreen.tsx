import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Icons for Settings Menu Items
const PersonalizationIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M12 1v6m0 6v6m9-9h-6m-6 0H3"></path>
  </svg>
)

const AppsConnectorsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
)

const WorkspaceIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
  </svg>
)

const UpgradeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="m8 12 4-4 4 4M12 16V8"></path>
  </svg>
)

const EmailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
  </svg>
)

const PhoneIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
)

const AppearanceIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"></circle>
    <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32 1.41-1.41"></path>
  </svg>
)

const AccentColorIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
  </svg>
)

const GeneralIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M12 1v6m0 6v6"></path>
    <circle cx="12" cy="12" r="10"></circle>
  </svg>
)

const VoiceIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
    <line x1="12" x2="12" y1="19" y2="22"></line>
  </svg>
)

const DataControlsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
    <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
    <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
    <line x1="12" y1="22.08" x2="12" y2="12"></line>
  </svg>
)

const SecurityIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
  </svg>
)

const AboutIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 16v-4m0-4h.01"></path>
  </svg>
)

const LogoutIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
    <polyline points="16 17 21 12 16 7"></polyline>
    <line x1="21" y1="12" x2="9" y2="12"></line>
  </svg>
)

const BackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 18-6-6 6-6"></path>
  </svg>
)

const ChevronDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6"></path>
  </svg>
)

interface SettingsScreenProps {
  onBack: () => void
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack }) => {
  const [accentColorOpen, setAccentColorOpen] = useState(false)

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
          <h1 className="text-lg font-semibold text-gray-800">Settings</h1>
          <div className="w-10"></div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* User Section */}
        <div className="text-sm text-gray-500 mb-2">My AutoDecx</div>

        {/* Personalization */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl"
          style={{ backgroundColor: '#F3F4F6' }}
        >
          <div className="text-purple-600">
            <PersonalizationIcon />
          </div>
          <span className="text-base text-gray-900">Personalization</span>
        </motion.button>

        {/* Apps & connectors */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl"
          style={{ backgroundColor: '#F3F4F6' }}
        >
          <div className="text-purple-600">
            <AppsConnectorsIcon />
          </div>
          <span className="text-base text-gray-900">Apps & connectors</span>
        </motion.button>

        {/* Account Section */}
        <div className="text-sm text-gray-500 mt-6 mb-2">Account</div>

        {/* Workspace */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl"
          style={{ backgroundColor: '#F3F4F6' }}
        >
          <div className="text-purple-600">
            <WorkspaceIcon />
          </div>
          <div className="flex-1 text-left">
            <div className="text-base text-gray-900">Workspace</div>
            <div className="text-xs text-gray-600">Personal</div>
          </div>
        </motion.button>

        {/* Upgrade to Go */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl"
          style={{ backgroundColor: '#F3F4F6' }}
        >
          <div className="text-purple-600">
            <UpgradeIcon />
          </div>
          <span className="text-base text-gray-900">Upgrade to Go</span>
        </motion.button>

        {/* Email */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl"
          style={{ backgroundColor: '#F3F4F6' }}
        >
          <div className="text-purple-600">
            <EmailIcon />
          </div>
          <div className="flex-1 text-left">
            <div className="text-base text-gray-900">Email</div>
            <div className="text-xs text-gray-600">lindovmshange@gmail.com</div>
          </div>
        </motion.button>

        {/* Phone number */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl"
          style={{ backgroundColor: '#F3F4F6' }}
        >
          <div className="text-purple-600">
            <PhoneIcon />
          </div>
          <div className="flex-1 text-left">
            <div className="text-base text-gray-900">Phone number</div>
            <div className="text-xs text-gray-600">+27658957077</div>
          </div>
        </motion.button>

        {/* Appearance */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl"
          style={{ backgroundColor: '#F3F4F6' }}
        >
          <div className="text-purple-600">
            <AppearanceIcon />
          </div>
          <div className="flex-1 text-left">
            <div className="text-base text-gray-900">Appearance</div>
            <div className="text-xs text-gray-600">System (Default)</div>
          </div>
        </motion.button>

        {/* Accent color */}
        <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#F3F4F6' }}>
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setAccentColorOpen(!accentColorOpen)}
            className="w-full flex items-center gap-3 px-4 py-3.5"
          >
            <div className="text-purple-600">
              <AccentColorIcon />
            </div>
            <div className="flex-1 text-left">
              <div className="text-base text-gray-900">Accent color</div>
              <div className="text-xs text-gray-600">Default</div>
            </div>
            <motion.div
              animate={{ rotate: accentColorOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-gray-600"
            >
              <ChevronDownIcon />
            </motion.div>
          </motion.button>

          {/* Accent Color Dropdown */}
          <AnimatePresence>
            {accentColorOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden border-t border-gray-300"
              >
                <div className="px-4 py-3 space-y-2">
                  {[
                    { name: 'Default', color: 'gray' },
                    { name: 'Blue', color: 'blue' },
                    { name: 'Green', color: 'green' },
                    { name: 'Yellow', color: 'yellow' },
                    { name: 'Pink', color: 'pink' },
                    { name: 'Orange', color: 'orange' },
                  ].map((colorOption) => (
                    <motion.button
                      key={colorOption.name}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center gap-3 px-3 py-2 hover:bg-white/60 rounded-lg transition-colors"
                    >
                      <div className={`w-3 h-3 rounded-full bg-${colorOption.color}-500`}></div>
                      <span className="text-sm text-gray-900">{colorOption.name}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* General */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl"
          style={{ backgroundColor: '#F3F4F6' }}
        >
          <div className="text-purple-600">
            <GeneralIcon />
          </div>
          <span className="text-base text-gray-900">General</span>
        </motion.button>

        {/* Voice */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl"
          style={{ backgroundColor: '#F3F4F6' }}
        >
          <div className="text-purple-600">
            <VoiceIcon />
          </div>
          <span className="text-base text-gray-900">Voice</span>
        </motion.button>

        {/* Data controls */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl"
          style={{ backgroundColor: '#F3F4F6' }}
        >
          <div className="text-purple-600">
            <DataControlsIcon />
          </div>
          <span className="text-base text-gray-900">Data controls</span>
        </motion.button>

        {/* Security */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl"
          style={{ backgroundColor: '#F3F4F6' }}
        >
          <div className="text-purple-600">
            <SecurityIcon />
          </div>
          <span className="text-base text-gray-900">Security</span>
        </motion.button>

        {/* About */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl"
          style={{ backgroundColor: '#F3F4F6' }}
        >
          <div className="text-purple-600">
            <AboutIcon />
          </div>
          <span className="text-base text-gray-900">About</span>
        </motion.button>

        {/* Log out */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl mt-4"
          style={{ backgroundColor: '#FEE2E2' }}
        >
          <div className="text-red-600">
            <LogoutIcon />
          </div>
          <span className="text-base text-red-600">Log out</span>
        </motion.button>

        {/* Bottom spacing */}
        <div className="h-8"></div>
      </div>
    </div>
  )
}

export default SettingsScreen
