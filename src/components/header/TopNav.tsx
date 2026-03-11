import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Bell, User, Settings, LogOut, X } from 'lucide-react';
import { useAppDispatch } from '../../store/hooks';
import { logout } from '../../store/slices/authSlice';

interface Notification {
  id: number;
  title: string;
  preview: string;
  body: string;
  time: string;
}

const notifications: Notification[] = [
  {
    id: 1,
    title: 'New team member added',
    preview: 'Sarah Connor has joined the Design team.',
    body: 'Sarah Connor has been added to the Design team as a Senior UI Designer. She will be collaborating on the upcoming dashboard redesign project. Please welcome her and make sure she has access to all relevant Figma files, Slack channels, and documentation repositories. Her onboarding checklist has been shared with the HR department.',
    time: '5 min ago',
  },
  {
    id: 2,
    title: 'Server maintenance scheduled',
    preview: 'Downtime expected on March 14, 2:00 AM – 4:00 AM UTC.',
    body: 'Scheduled maintenance will take place on March 14 from 2:00 AM to 4:00 AM UTC. During this window the primary database cluster will be upgraded to version 16.2 and all application servers will be restarted with the latest security patches. Users may experience brief interruptions to service. A status page update will be posted at the start and end of the maintenance window. Please plan any critical deployments around this timeframe.',
    time: '1 hour ago',
  },
  {
    id: 3,
    title: 'Monthly report ready',
    preview: 'Your February analytics report is available for download.',
    body: 'The February 2026 analytics report has been generated and is ready for review. Highlights include a 12% increase in active users, a 7% improvement in average session duration, and a notable spike in API usage on February 18. Revenue metrics are up 4.3% month-over-month. The full PDF report has been attached to your documents folder and a summary has been sent to the executive mailing list. Reach out to the data team if you need any custom breakdowns.',
    time: '3 hours ago',
  },
];

const TopNav = () => {
  const dispatch = useAppDispatch();

  const [showNotifications, setShowNotifications] = useState(false);
  const [activeNotification, setActiveNotification] = useState<Notification | null>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setShowProfileMenu(false);
    dispatch(logout());
  };

  return (
    <>
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            {/* Left — Brand */}
            <a href="/" className="flex items-center group">
              <img src="/tabler-logo.png" alt="brand logo" className="w-10 h-10" />
              <span className="text-xl font-semibold text-gray-800 tracking-tight">
                tabler
              </span>
            </a>

            {/* Right — Actions & Profile */}
            <div className="flex items-center gap-5">
              {/* Source Code Button */}
              <a
                href="https://github.com/Ola-Oluwajuwon/tabler"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center px-3 py-1.5 border border-blue-600 text-blue-600 text-sm font-medium rounded hover:bg-blue-50 transition-colors duration-150"
              >
                Source code
              </a>

              {/* Notification Bell */}
              <div className="relative" ref={notifRef}>
                <button
                  type="button"
                  className="relative p-1 text-gray-500 hover:text-gray-700 transition-colors duration-150"
                  aria-label="Notifications"
                  onClick={() => {
                    setShowNotifications((prev) => !prev);
                    setShowProfileMenu(false);
                  }}
                >
                  <Bell className="w-5 h-5" strokeWidth={1.75} />
                  <span className="absolute top-0.5 right-0.5 block w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <h3 className="text-sm font-semibold text-gray-800">Notifications</h3>
                    </div>
                    <ul>
                      {notifications.map((n) => (
                        <li key={n.id}>
                          <button
                            type="button"
                            className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0"
                            onClick={() => {
                              setActiveNotification(n);
                              setShowNotifications(false);
                            }}
                          >
                            <p className="text-sm font-medium text-gray-800 truncate">{n.title}</p>
                            <p className="text-xs text-gray-500 mt-0.5 truncate">{n.preview}</p>
                            <p className="text-[11px] text-gray-400 mt-1">{n.time}</p>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px h-8 bg-gray-200" />

              {/* User Profile */}
              <div className="relative" ref={profileRef}>
                <button
                  type="button"
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => {
                    setShowProfileMenu((prev) => !prev);
                    setShowNotifications(false);
                  }}
                >
                  <img
                    src="/avatar.png"
                    alt="Jane Pearson"
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-100"
                  />
                  <div className="hidden sm:flex flex-col">
                    <span className="text-sm font-medium text-gray-700 leading-tight">
                      Jane Pearson
                    </span>
                    <span className="text-xs text-gray-500 leading-tight">
                      Administrator
                    </span>
                  </div>
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden py-1">
                    <button
                      type="button"
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-default"
                    >
                      <User className="w-4 h-4 text-gray-400" />
                      Profile
                    </button>
                    <button
                      type="button"
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-default"
                    >
                      <Settings className="w-4 h-4 text-gray-400" />
                      Settings
                    </button>
                    <div className="border-t border-gray-100 my-1" />
                    <button
                      type="button"
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-screen Notification Modal */}
      {activeNotification &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={() => setActiveNotification(null)}
          >
            <div
              className="bg-white w-full max-w-lg mx-4 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">
                  {activeNotification.title}
                </h2>
                <button
                  type="button"
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
                  onClick={() => setActiveNotification(null)}
                  aria-label="Close notification"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="px-6 py-5">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {activeNotification.body}
                </p>
              </div>
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-400">{activeNotification.time}</span>
                <button
                  type="button"
                  className="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                  onClick={() => setActiveNotification(null)}
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default TopNav;
