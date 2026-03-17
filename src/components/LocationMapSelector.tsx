import { useState } from 'react';
import { X, ZoomIn, ZoomOut, ChevronDown } from 'lucide-react';

// Building and room structure
const BUILDINGS = [
  {
    name: 'Kalfarveien 72A',
    floors: [
      {
        floor: 1,
        label: '1. etasje',
        rooms: [
          { id: 101, name: 'Resepsjon', icon: '🏢', x: 20, y: 20, width: 120, height: 80 },
          { id: 102, name: 'Klasserom', icon: '📚', x: 150, y: 20, width: 100, height: 80 },
          { id: 103, name: 'Møterom', icon: '👥', x: 260, y: 20, width: 100, height: 80 },
          { id: 104, name: 'Garderobe', icon: '👔', x: 20, y: 110, width: 80, height: 80 },
          { id: 105, name: 'Rom 105', icon: '📋', x: 110, y: 110, width: 80, height: 80 },
          { id: 106, name: 'Auditorium', icon: '🎭', x: 200, y: 110, width: 160, height: 120 },
        ]
      },
      {
        floor: 2,
        label: '2. etasje',
        rooms: [
          { id: 201, name: 'Klasserom', icon: '📚', x: 20, y: 20, width: 100, height: 80 },
          { id: 202, name: 'Datalab', icon: '💻', x: 130, y: 20, width: 120, height: 80 },
          { id: 203, name: 'Møterom', icon: '👥', x: 260, y: 20, width: 100, height: 80 },
          { id: 204, name: 'Kontor', icon: '💼', x: 20, y: 110, width: 100, height: 80 },
          { id: 205, name: 'Personalrom', icon: '☕', x: 130, y: 110, width: 100, height: 80 },
        ]
      },
      {
        floor: 3,
        label: '3. etasje',
        rooms: [
          { id: 301, name: 'Kontor', icon: '💼', x: 20, y: 20, width: 120, height: 80 },
          { id: 302, name: 'Møterom', icon: '👥', x: 150, y: 20, width: 100, height: 80 },
          { id: 303, name: 'Lesesal', icon: '📖', x: 260, y: 20, width: 100, height: 100 },
        ]
      }
    ]
  },
  {
    name: 'Kalfarveien 76',
    floors: [
      {
        floor: 1,
        label: '1. etasje',
        rooms: [
          { id: 'B104', name: 'B104 - Fasiliteter', icon: '🏢', x: 20, y: 20, width: 100, height: 80 },
          { id: 'Kafeteria1', name: 'Kafeteria', icon: '🍽️', x: 130, y: 20, width: 120, height: 80 },
          { id: 'Trapp', name: 'Trappehus', icon: '🪜', x: 260, y: 20, width: 60, height: 80 },
        ]
      },
      {
        floor: 2,
        label: '2. etasje',
        rooms: [
          { id: 'Kafeteria2', name: 'Kafeteria 2. etg', icon: '🍽️', x: 20, y: 20, width: 180, height: 100 },
        ]
      }
    ]
  },
  {
    name: 'Kalfarveien 78C',
    floors: [
      {
        floor: 1,
        label: '1. etasje',
        rooms: [
          { id: 'Lab1', name: 'Laboratorium', icon: '🔬', x: 20, y: 20, width: 150, height: 100 },
          { id: 'Verksted', name: 'Verksted', icon: '🔧', x: 180, y: 20, width: 140, height: 100 },
        ]
      }
    ]
  }
];

interface LocationMapSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (location: string) => void;
  currentLocation: string;
}

export function LocationMapSelector({ isOpen, onClose, onSelect, currentLocation }: LocationMapSelectorProps) {
  const [selectedBuilding, setSelectedBuilding] = useState(BUILDINGS[0]);
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [showBuildingDropdown, setShowBuildingDropdown] = useState(false);

  if (!isOpen) return null;

  const currentFloorData = selectedBuilding.floors.find(f => f.floor === selectedFloor);

  const handleRoomClick = (roomName: string) => {
    const fullLocation = `${selectedBuilding.name} - ${roomName}`;
    onSelect(fullLocation);
    onClose();
  };

  const handleZoomIn = () => {
    setZoom(Math.min(150, zoom + 10));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(50, zoom - 10));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-[540px] w-full max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-medium text-lg">Velg lokasjon på kart</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Building Selector */}
        <div className="p-4 border-b">
          <label className="text-sm text-gray-600 block mb-2">Bygning</label>
          <div className="relative">
            <button
              onClick={() => setShowBuildingDropdown(!showBuildingDropdown)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span>{selectedBuilding.name}</span>
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </button>
            {showBuildingDropdown && (
              <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                {BUILDINGS.map((building) => (
                  <button
                    key={building.name}
                    onClick={() => {
                      setSelectedBuilding(building);
                      setSelectedFloor(1);
                      setShowBuildingDropdown(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >
                    {building.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Floor Selector */}
        <div className="px-4 py-3 border-b">
          <label className="text-sm text-gray-600 block mb-2">Etasje</label>
          <div className="flex gap-2">
            {selectedBuilding.floors.map((floor) => (
              <button
                key={floor.floor}
                onClick={() => setSelectedFloor(floor.floor)}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedFloor === floor.floor
                    ? 'bg-[#C61932] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {floor.label}
              </button>
            ))}
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="px-4 py-3 border-b flex items-center justify-center gap-4">
          <button
            onClick={handleZoomOut}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Zoom ut"
          >
            <ZoomOut className="w-5 h-5 text-gray-600" />
          </button>
          <span className="text-sm font-medium text-gray-700 min-w-[60px] text-center">
            {zoom}%
          </span>
          <button
            onClick={handleZoomIn}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            title="Zoom inn"
          >
            <ZoomIn className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Floor Plan */}
        <div className="flex-1 overflow-auto p-4 bg-gray-50">
          <div 
            className="relative bg-white border-2 border-gray-200 rounded-lg mx-auto"
            style={{ 
              width: `${380 * (zoom / 100)}px`,
              height: `${250 * (zoom / 100)}px`,
              minWidth: '380px',
              minHeight: '250px'
            }}
          >
            {currentFloorData?.rooms.map((room) => (
              <button
                key={room.id}
                onClick={() => handleRoomClick(room.name)}
                className="absolute border-2 border-gray-300 rounded hover:bg-[#C61932] hover:bg-opacity-10 hover:border-[#C61932] transition-all flex flex-col items-center justify-center text-center p-2 bg-white"
                style={{
                  left: `${room.x * (zoom / 100)}px`,
                  top: `${room.y * (zoom / 100)}px`,
                  width: `${room.width * (zoom / 100)}px`,
                  height: `${room.height * (zoom / 100)}px`,
                }}
              >
                <span className="text-2xl mb-1">{room.icon}</span>
                <span className="text-xs font-medium text-gray-700 leading-tight">
                  {String(room.id)}
                </span>
                <span className="text-xs text-gray-600 leading-tight">
                  {room.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50 text-center">
          <p className="text-sm text-gray-600">Klikk på et rom for å velge lokasjon</p>
        </div>
      </div>
    </div>
  );
}