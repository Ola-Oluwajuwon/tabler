import { Bell } from 'lucide-react';

/**
 * TopNav — Level 1 of the two-tier header.
 * Contains the brand logo/text, "Source code" button,
 * notification bell with red indicator, and user profile.
 */
const TopNav = () => {
  return (
    <div className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Left — Brand */}
          <a href="/" className="flex items-center group">
            {/* Tabler Logo Icon */}
            <img src='/tabler-logo.png' alt='brand logo' className='w-10 h-10'/>
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
            <button
              type="button"
              className="relative p-1 text-gray-500 hover:text-gray-700 transition-colors duration-150"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" strokeWidth={1.75} />
              {/* Red Dot Indicator */}
              <span className="absolute top-0.5 right-0.5 block w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            </button>

            {/* Divider */}
            <div className="hidden sm:block w-px h-8 bg-gray-200" />

            {/* User Profile */}
            <div className="flex items-center gap-3">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
