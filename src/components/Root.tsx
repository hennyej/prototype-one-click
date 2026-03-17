import { Outlet, useLocation, useNavigate } from 'react-router';
import { PlusCircle, FolderOpen, Settings } from 'lucide-react';
import Rectangle from '../imports/Rectangle1';
import logo from '../assets/kristianiaLogo-kopi.png';

export default function Root() {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { path: '/', label: 'Ny sak', icon: PlusCircle, id: 'new-case' },
    { path: '/my-cases', label: 'Mine saker', icon: FolderOpen, id: 'my-cases' },
    { path: '/settings', label: 'Innstillinger', icon: Settings, id: 'settings' }
  ];

  const activeTab = location.pathname === '/' ? 'new-case' : 
                    location.pathname === '/my-cases' ? 'my-cases' : 'settings';

  return (
    <div className="bg-white flex flex-col h-screen max-w-[400px] mx-auto border-x border-black">
      {/* Red Banner with Logo */}
      <div className="h-[63px] w-full relative">
        <Rectangle />
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <h1 className="text-white font-medium text-sm">What's Down</h1>
          <img src={logo} alt="Logo" className="h-8 absolute left-1/2 -translate-x-1/2" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>

      {/* Tab Navigation - Mobile Style */}
      <div className="border-t border-gray-200 bg-white safe-area-bottom">
        <div className="flex h-16">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const isDisabled = tab.id !== 'new-case';
            
            return (
              <button
                key={tab.id}
                onClick={() => !isDisabled && navigate(tab.path)}
                disabled={isDisabled}
                className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors ${
                  isDisabled ? 'opacity-40 cursor-not-allowed' : 'active:bg-gray-50'
                }`}
              >
                <Icon 
                  className={`w-6 h-6 ${
                    isActive ? 'text-[rgb(198,25,50)]' : 'text-gray-600'
                  }`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span
                  className={`text-xs font-medium ${
                    isActive ? 'text-[rgb(198,25,50)]' : 'text-gray-600'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}