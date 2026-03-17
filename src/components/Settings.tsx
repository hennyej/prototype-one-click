import { useState } from 'react';
import { User, Bell, MapPin, Info, ChevronRight } from 'lucide-react';

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [name, setName] = useState('Ola Nordmann');
  const [email, setEmail] = useState('ola.nordmann@eksempel.no');
  const [defaultLocation, setDefaultLocation] = useState('Bergen campus');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, this would save to backend
  };

  return (
    <div className="bg-[#f3f3f3] h-full overflow-auto">
      <div className="bg-white p-6 border-b">
        <h1 className="font-['Imprima',sans-serif] text-2xl">Innstillinger</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-2 mb-3">
              <User className="w-5 h-5 text-gray-600" />
              <h2 className="font-medium text-lg">Profil</h2>
            </div>
            
            {isEditing ? (
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Navn</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#C61932]"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">E-post</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#C61932]"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    className="flex-1 bg-[#C61932] text-white py-2 rounded font-medium hover:bg-[#9E1428] transition-colors"
                  >
                    Lagre
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 border border-gray-300 py-2 rounded font-medium hover:bg-gray-50 transition-colors"
                  >
                    Avbryt
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-sm text-gray-600">Navn</p>
                <p className="mb-2">{name}</p>
                <p className="text-sm text-gray-600">E-post</p>
                <p className="mb-3">{email}</p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-[#C61932] text-sm font-medium"
                >
                  Rediger profil
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <button
            onClick={() => setNotifications(!notifications)}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-gray-600" />
              <div className="text-left">
                <p className="font-medium">Varsler</p>
                <p className="text-sm text-gray-600">
                  {notifications ? 'Aktivert' : 'Deaktivert'}
                </p>
              </div>
            </div>
            <div
              className={`w-12 h-6 rounded-full transition-colors ${
                notifications ? 'bg-[#C61932]' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full mt-0.5 transition-transform ${
                  notifications ? 'ml-6' : 'ml-0.5'
                }`}
              />
            </div>
          </button>
        </div>

        {/* Default Location Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-gray-600" />
              <h2 className="font-medium text-lg">Standard plassering</h2>
            </div>
            <select
              value={defaultLocation}
              onChange={(e) => setDefaultLocation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#C61932]"
            >
              <option>Bergen campus</option>
              <option>Hovedbygning</option>
              <option>Nordvinge</option>
              <option>Sørvinge</option>
              <option>Østvinge</option>
              <option>Vestvinge</option>
            </select>
            <p className="text-xs text-gray-600 mt-2">
              Denne plasseringen vil bli foreslått når du oppretter nye saker
            </p>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5 text-gray-600" />
              <div className="text-left">
                <p className="font-medium">Om</p>
                <p className="text-sm text-gray-600">Versjon 1.0.0</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 py-4">
          <p>One-Tap Report</p>
          <p className="mt-1">© 2026 Anleggsledelsessystem</p>
        </div>
      </div>
    </div>
  );
}