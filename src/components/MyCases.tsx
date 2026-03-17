import { useState, useEffect } from 'react';
import { caseStore } from '../lib/caseStore';
import { Case } from '../types/case';
import { ChevronRight, Clock, CheckCircle, AlertCircle, Trash2 } from 'lucide-react';

export default function MyCases() {
  const [cases, setCases] = useState<Case[]>([]);
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  useEffect(() => {
    setCases(caseStore.getCases());
    const unsubscribe = caseStore.subscribe(() => {
      setCases(caseStore.getCases());
    });
    return unsubscribe;
  }, []);

  const getStatusIcon = (status: Case['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'in-progress':
        return <AlertCircle className="w-4 h-4 text-blue-500" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
  };

  const getStatusLabel = (status: Case['status']) => {
    switch (status) {
      case 'pending':
        return 'Venter';
      case 'in-progress':
        return 'Pågår';
      case 'resolved':
        return 'Løst';
    }
  };

  const getStatusColor = (status: Case['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('nb-NO', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleDelete = (caseId: string) => {
    if (confirm('Er du sikker på at du vil slette denne saken?')) {
      caseStore.deleteCase(caseId);
      setSelectedCase(null);
    }
  };

  if (selectedCase) {
    return (
      <div className="bg-[#f3f3f3] h-full overflow-auto">
        <div className="bg-white p-4 flex items-center gap-3 border-b">
          <button 
            onClick={() => setSelectedCase(null)} 
            className="p-1 hover:bg-gray-100 rounded"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="font-['Imprima',sans-serif] text-xl">Saksdetaljer</h1>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-white rounded-lg p-6 space-y-4">
            {selectedCase.image && (
              <img 
                src={selectedCase.image} 
                alt="Sak" 
                className="w-full h-48 object-cover rounded border border-gray-200"
              />
            )}

            <div>
              <h2 className="font-['Imprima',sans-serif] text-2xl mb-2">{selectedCase.title}</h2>
              <div className="flex items-center gap-2 mb-3">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${getStatusColor(selectedCase.status)}`}>
                  {getStatusIcon(selectedCase.status)}
                  {getStatusLabel(selectedCase.status)}
                </span>
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  {selectedCase.category}
                </span>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-600 block mb-1">Beskrivelse</label>
              <p className="text-gray-900">{selectedCase.description}</p>
            </div>

            <div>
              <label className="text-sm text-gray-600 block mb-1">Plassering</label>
              <p className="text-gray-900">{selectedCase.location}</p>
            </div>

            <div>
              <label className="text-sm text-gray-600 block mb-1">Sendt inn</label>
              <p className="text-gray-900">{formatDate(selectedCase.createdAt)}</p>
            </div>
          </div>

          <button
            onClick={() => handleDelete(selectedCase.id)}
            className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-3 rounded-full font-medium hover:bg-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Slett sak
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f3f3f3] h-full overflow-auto">
      <div className="bg-white p-6 border-b">
        <h1 className="font-['Imprima',sans-serif] text-2xl">Mine saker</h1>
        <p className="text-sm text-gray-600 mt-1">{cases.length} saker totalt</p>
      </div>

      {cases.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="font-['Imprima',sans-serif] text-xl mb-2">Ingen saker ennå</h2>
          <p className="text-gray-600 text-sm">Rapporter problemer ved å bruke «Ny sak +» fanen</p>
        </div>
      ) : (
        <div className="p-4 space-y-3">
          {cases.map((caseItem) => (
            <button
              key={caseItem.id}
              onClick={() => setSelectedCase(caseItem)}
              className="w-full bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow text-left"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    {getStatusIcon(caseItem.status)}
                    <h3 className="font-medium truncate">{caseItem.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                    {caseItem.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{caseItem.location}</span>
                    <span>•</span>
                    <span>{formatDate(caseItem.createdAt)}</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 shrink-0 mt-1" />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}