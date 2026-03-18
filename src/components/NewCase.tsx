import { useState, useRef, useEffect } from 'react';
import { Camera, X, Sparkles, MapPin } from 'lucide-react';
import { categorizeReport } from '../lib/aiCategorizer';
import { caseStore } from '../lib/caseStore';
import { Case } from '../types/case';
import { LocationMapSelector } from './LocationMapSelector';

export default function NewCase() {
  const [description, setDescription] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState<{
    title: string;
    category: string;
    location: string;
    description: string;
    image?: string;
  } | null>(null);
  const [image, setImage] = useState<string | undefined>(undefined);
  const [showSuccess, setShowSuccess] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<{
    title: string;
    category: string;
    location: string;
  } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Kalfarveien 72A - Resepsjon');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout>();

  // Real-time AI categorization as user types
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (description.trim().length < 5) {
      setAiSuggestion(null);
      return;
    }

    setIsGenerating(true);

    debounceTimerRef.current = setTimeout(() => {
      const categorized = categorizeReport(description);
      setAiSuggestion(categorized);
      setIsGenerating(false);
    }, 800); // Debounce for 800ms to simulate AI processing

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [description]);

  const handleGenerate = () => {
    if (!description.trim()) return;

    const categorized = categorizeReport(description);
    setPreviewData({
      ...categorized,
      location: selectedLocation, // Use user-selected location
      description: description.trim(),
      image
    });
    setShowPreview(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMockImageUpload = () => {
    // Generate a random image from Lorem Picsum
    const width = 400;
    const height = 300;
    const randomId = Math.floor(Math.random() * 1000);
    const imageUrl = `https://picsum.photos/id/${randomId}/${width}/${height}`;
    setImage(imageUrl);
  };

  const handleSubmit = () => {
    if (!previewData) return;

    const newCase: Case = {
      id: crypto.randomUUID(),
      title: previewData.title,
      description: previewData.description,
      location: previewData.location,
      category: previewData.category,
      image: previewData.image,
      status: 'pending',
      createdAt: new Date()
    };

    caseStore.addCase(newCase);
    
    // Show success message
    setShowSuccess(true);
    
    // Reset form after a delay
    setTimeout(() => {
      setDescription('');
      setImage(undefined);
      setShowPreview(false);
      setPreviewData(null);
      setShowSuccess(false);
      window.close();
    }, 2000);
  };

  const handleBack = () => {
    setShowPreview(false);
  };

  const removeImage = () => {
    setImage(undefined);
    if (previewData) {
      setPreviewData({ ...previewData, image: undefined });
    }
  };

  if (showSuccess) {
    return (
      <div className="bg-[#f3f3f3] h-full flex items-center justify-center p-6">
        <div className="bg-white rounded-lg p-8 text-center shadow-lg">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl mb-2">Ticket sendt inn!</h2>
          <p className="text-gray-600">Rapporten din har blitt opprettet.</p>
          <p className="text-sm text-gray-400">Du kan nå lukke denne fanen.</p>
        </div>
      </div>
    );
  }

  if (showPreview && previewData) {
    return (
      <div className="bg-[#f3f3f3] h-full overflow-auto">
        <div className="bg-white p-4 flex items-center gap-3 border-b">
          <button onClick={handleBack} className="p-1 hover:bg-gray-100 rounded">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl">Gjennomgå rapport</h1>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-white rounded-lg p-6 space-y-4">
            {/* Image preview */}
            {previewData.image && (
              <div className="relative">
                <img 
                  src={previewData.image} 
                  alt="Rapport" 
                  className="w-full h-48 object-cover rounded border border-gray-200"
                />
              </div>
            )}

            {/* Title */}
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Tittel</label>
              <input
                type="text"
                value={previewData.title}
                onChange={(e) => setPreviewData({ ...previewData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#C61932]"
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Beskrivelse</label>
              <textarea
                value={previewData.description}
                onChange={(e) => setPreviewData({ ...previewData, description: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#C61932] resize-none"
              />
            </div>

            {/* Location */}
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Plassering</label>
              <input
                type="text"
                value={previewData.location}
                onChange={(e) => setPreviewData({ ...previewData, location: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#C61932]"
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-sm text-gray-600 mb-1 block">Kategori</label>
              <div className="inline-block px-3 py-1 bg-[#C61932] text-white rounded-full text-sm">
                {previewData.category}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-[#C61932] text-white py-3 rounded-full font-medium hover:bg-[#9E1428] transition-colors"
          >
            SEND INN
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f3f3f3] h-full flex flex-col items-center p-6 pt-10">
      <h1 className="text-[32px] font-medium text-center mb-8 px-4" style={{ fontFamily: 'var(--font-graphik)' }}>
        Hva er problemet?
      </h1>

      {/* Description Input */}
      <div className="bg-white rounded w-full max-w-[326px] min-h-[164px] p-4 mb-4 shadow-sm">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="F.eks. 'Såpedispenseren i rom 205 er tom' eller 'AC i kafeteriaen er for kald'"
          className="w-full h-full min-h-[132px] resize-none outline-none text-[13px] placeholder:text-[rgba(0,0,0,0.2)]"
          style={{ fontFamily: 'var(--font-graphik)' }}
        />
      </div>

      {/* Location Button */}
      <button
        onClick={() => setShowLocationModal(true)}
        className="w-full max-w-[326px] mb-4 flex items-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
      >
        <MapPin className="w-5 h-5 text-gray-600" />
        <div className="flex-1 text-left">
          <span className="text-xs text-gray-600 block">Plassering</span>
          <span className="text-sm font-medium">{selectedLocation}</span>
        </div>
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Location Map Selector Modal */}
      <LocationMapSelector
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        onSelect={setSelectedLocation}
        currentLocation={selectedLocation}
      />

      {/* AI Suggestion Preview */}
      {(aiSuggestion || isGenerating) && (
        <div className="bg-white rounded-lg w-full max-w-[326px] p-4 mb-4 shadow-sm border-2 border-[#C61932] animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-[#C61932]" />
            <span className="text-xs font-medium text-[#C61932]">AI-forslag</span>
            {isGenerating && (
              <div className="ml-auto">
                <div className="w-4 h-4 border-2 border-[#C61932] border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
          
          {aiSuggestion && !isGenerating && (
            <div className="space-y-2">
              <div>
                <p className="text-xs text-gray-600">Tittel</p>
                <p className="text-sm font-medium">{aiSuggestion.title}</p>
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <p className="text-xs text-gray-600">Kategori</p>
                  <span className="inline-block px-2 py-0.5 bg-[#C61932] text-white rounded-full text-xs">
                    {aiSuggestion.category}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-600">Plassering</p>
                  <p className="text-sm">{aiSuggestion.location}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Image Upload - Hidden input for potential future use */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleImageUpload}
        className="hidden"
      />

      {image ? (
        <div className="relative mb-6 w-full max-w-[326px]">
          <img src={image} alt="Opplastingsforhåndsvisning" className="w-full h-32 object-cover rounded border border-gray-200" />
          <button
            onClick={removeImage}
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 mb-6 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
        >
          <Camera className="w-5 h-5 text-gray-600" />
          <span className="text-sm text-gray-700">Legg til bilde (valgfritt)</span>
        </button>
      )}

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={!description.trim()}
        className={`px-7 py-2.5 rounded-full transition-all ${
          description.trim()
            ? 'bg-[#C61932] text-white hover:bg-[#9E1428]'
            : 'bg-gray-300 opacity-60 text-gray-500 cursor-not-allowed'
        }`}
      >
        <span className="font-['SF_Pro',sans-serif] text-[15px] tracking-[-0.23px]">
          Meld inn feil
        </span>
      </button>
    </div>
  );
}