// Mock AI categorization logic
interface CategorizedReport {
  title: string;
  category: string;
  location: string;
}

const categories = [
  { 
    keywords: ['soap', 'dispenser', 'hand wash', 'sanitizer', 'såpe', 'såpedispenser', 'håndvask', 'desinfeksjon', 'tom såpe', 'mangler såpe', 'fylles'], 
    category: 'Hygieneutstyr', 
    titleTemplates: ['Tom såpedispenser', 'Såpedispenser må fylles', 'Hygieneutstyr mangler']
  },
  { 
    keywords: ['toilet', 'bathroom', 'restroom', 'flush', 'toalett', 'bad', 'wc', 'spyle', 'do', 'klosett', 'vaskerom', 'går ikke ned', 'tett'],
    category: 'Rørleggerarbeid', 
    titleTemplates: ['Toalettproblem', 'WC-feil', 'Rørleggerfeil']
  },
  { 
    keywords: ['light', 'bulb', 'lamp', 'dark', 'electricity', 'lys', 'pære', 'lampe', 'lyser ikke', 'mørk', 'mørkt', 'strøm', 'blinker', 'flimrer', 'ødelagt lys'],
    category: 'Elektrisk', 
    titleTemplates: ['Lysproblem', 'Ødelagt belysning', 'Defekt pære']
  },
  { 
    keywords: ['leak', 'water', 'drip', 'pipe', 'lekkasje', 'vann', 'drypp', 'rør', 'fuktig', 'våt', 'renner'],
    category: 'Rørleggerarbeid', 
    titleTemplates: ['Vannlekkasje', 'Drypper fra tak', 'Vannproblem']
  },
  { 
    keywords: ['door', 'lock', 'key', 'stuck', 'dør', 'lås', 'nøkkel', 'fast', 'åpnes ikke', 'lukkes ikke', 'henger', 'knirker'],
    category: 'Vedlikehold', 
    titleTemplates: ['Dørfeil', 'Låsproblem', 'Døren er ødelagt']
  },
  { 
    keywords: ['ac', 'air conditioning', 'heating', 'hvac', 'temperature', 'cold', 'hot', 'klimaanlegg', 'varme', 'temperatur', 'kald', 'varm', 'kaldt', 'varmt', 'frysende', 'for varm', 'for kald', 'kjølig', 'ovn'],
    category: 'HVAC', 
    titleTemplates: ['Temperaturproblem', 'Klimaanlegg-feil', 'HVAC-problem']
  },
  { 
    keywords: ['trash', 'garbage', 'waste', 'bin', 'full', 'søppel', 'avfall', 'bøtte', 'søppelbøtte', 'tømmes', 'overfylt', 'stank', 'lukt'],
    category: 'Sanitær', 
    titleTemplates: ['Full søppelbøtte', 'Avfall må tømmes', 'Søppelproblem']
  },
  { 
    keywords: ['wifi', 'internet', 'network', 'connection', 'nettverk', 'tilkobling', 'trådløs', 'ikke internett', 'tregtt', 'koblet fra'],
    category: 'IT', 
    titleTemplates: ['Nettverksproblem', 'WiFi-feil', 'Ingen internett']
  },
  { 
    keywords: ['printer', 'copier', 'scanner', 'paper jam', 'skriver', 'kopimaskin', 'papir', 'skriver ikke', 'papirstopp'],
    category: 'IT', 
    titleTemplates: ['Skriverfeil', 'Kopimaskin-problem', 'Printerfeil']
  },
  { 
    keywords: ['window', 'glass', 'broken', 'crack', 'vindu', 'glass', 'glasset', 'ødelagt', 'knust', 'sprekk', 'sprekkk'],
    category: 'Vedlikehold', 
    titleTemplates: ['Vinduskade', 'Knust glass', 'Ødelagt vindu']
  },
  { 
    keywords: ['projector', 'screen', 'display', 'monitor', 'projektor', 'skjerm', 'lerret', 'viser ikke', 'sort skjerm'],
    category: 'IT', 
    titleTemplates: ['Projektorproblem', 'Skjermfeil', 'Display-problem']
  },
  { 
    keywords: ['chair', 'desk', 'table', 'furniture', 'stol', 'bord', 'pult', 'møbel', 'ødelagt', 'ustabil', 'knekt'],
    category: 'Vedlikehold', 
    titleTemplates: ['Møbelfeil', 'Ødelagt stol', 'Bordskade']
  },
  { 
    keywords: ['floor', 'carpet', 'wet', 'slippery', 'gulv', 'teppe', 'våt', 'glatt', 'sklir', 'søl'],
    category: 'Vedlikehold', 
    titleTemplates: ['Gulvproblem', 'Våt gulv', 'Sklefarer']
  },
  { 
    keywords: ['noise', 'loud', 'sound', 'støy', 'lyd', 'høyt', 'bråk', 'larm'],
    category: 'Generelt', 
    titleTemplates: ['Støyproblem', 'For høy lyd', 'Lydproblem']
  }
];

// Enhanced location keywords for better detection
const locationKeywords = {
  'Kalfarveien 72A - Resepsjon': ['resepsjon', 'reception', 'inngang', 'entrance', 'lobby'],
  'Kalfarveien 72A - Klasserom': ['klasserom', 'classroom', 'undervisning'],
  'Kalfarveien 72A - Møterom': ['møterom', 'meeting room', 'konferanse'],
  'Kalfarveien 72A - Garderobe': ['garderobe', 'wardrobe', 'locker'],
  'Kalfarveien 72A - Auditorium': ['auditorium', 'auditoriet', 'forelesning', 'lecture hall'],
  'Kalfarveien 76 - Kafeteria': ['kafeteria', 'cafeteria', 'kantine', 'canteen', 'spiserom'],
  'Kalfarveien 76 - Trappehus': ['trappehus', 'stairwell', 'trapp', 'stairs'],
  'Kalfarveien 78C - Laboratorium': ['lab', 'laboratorium', 'laboratory'],
  'Kalfarveien 78C - Verksted': ['verksted', 'workshop', 'arbeidsplass']
};

function generateSmartTitle(description: string, matchedCategory: typeof categories[0] | undefined): string {
  const lowerDesc = description.toLowerCase().trim();
  
  if (!matchedCategory) {
    // Try to create a generic title from the description
    const words = description.trim().split(/\s+/);
    if (words.length <= 4) {
      // Short description - capitalize first letter
      return description.charAt(0).toUpperCase() + description.slice(1);
    }
    // Longer description - create summary
    return 'Anleggsproblem: ' + words.slice(0, 4).join(' ') + '...';
  }

  // Use context to pick the best template
  const templates = matchedCategory.titleTemplates;
  
  // Check for specific patterns to choose the best title
  if (lowerDesc.includes('tom') || lowerDesc.includes('mangler') || lowerDesc.includes('fylles')) {
    return templates.find(t => t.includes('Tom') || t.includes('fylles') || t.includes('mangler')) || templates[0];
  }
  if (lowerDesc.includes('ødelagt') || lowerDesc.includes('knekt') || lowerDesc.includes('broken')) {
    return templates.find(t => t.includes('Ødelagt') || t.includes('Defekt')) || templates[0];
  }
  if (lowerDesc.includes('lekkasje') || lowerDesc.includes('drypp') || lowerDesc.includes('renner')) {
    return templates.find(t => t.includes('lekkasje') || t.includes('Drypper')) || templates[0];
  }
  if (lowerDesc.includes('full') || lowerDesc.includes('overfylt') || lowerDesc.includes('tømmes')) {
    return templates.find(t => t.includes('Full') || t.includes('tømmes')) || templates[0];
  }
  if (lowerDesc.includes('for kald') || lowerDesc.includes('kald') || lowerDesc.includes('kaldt')) {
    return 'For kald temperatur';
  }
  if (lowerDesc.includes('for varm') || lowerDesc.includes('varm') || lowerDesc.includes('varmt')) {
    return 'For varm temperatur';
  }
  
  // Default to first template
  return templates[0];
}

function detectLocation(description: string): string {
  const lowerDesc = description.toLowerCase();
  
  // First, try exact location name matching
  for (const [location, keywords] of Object.entries(locationKeywords)) {
    if (keywords.some(keyword => lowerDesc.includes(keyword))) {
      return location;
    }
    // Also check if the full location name is mentioned
    if (lowerDesc.includes(location.toLowerCase())) {
      return location;
    }
  }
  
  // Try to extract room numbers with various patterns
  const roomPatterns = [
    /\brom\s*(\d+[a-z]?)/i,           // "rom 205", "rom 105B"
    /\br\.?\s*(\d+[a-z]?)/i,          // "r. 205", "r.205"
    /\b(\d{3,4}[a-z]?)\b/,            // "205", "105B" (standalone 3-4 digit numbers)
    /\b([a-z]\d{3,4})\b/i             // "B104", "A205"
  ];
  
  for (const pattern of roomPatterns) {
    const match = lowerDesc.match(pattern);
    if (match) {
      const roomNum = match[1] || match[0];
      // Map to actual buildings based on room number patterns
      if (roomNum.match(/^b\d+/i)) {
        return `Kalfarveien 76 - ${roomNum.toUpperCase()}`;
      }
      return `Kalfarveien 72A - Rom ${roomNum}`;
    }
  }
  
  // Default to Bergen campus
  return 'Bergen campus';
}

export function categorizeReport(description: string): CategorizedReport {
  const lowerDesc = description.toLowerCase();
  
  // Find matching category - now checks ALL keywords and picks the best match
  let matchedCategory = categories.find(cat => 
    cat.keywords.some(keyword => lowerDesc.includes(keyword))
  );

  // Try multi-word matching for better accuracy
  if (!matchedCategory) {
    matchedCategory = categories.find(cat => {
      const words = lowerDesc.split(/\s+/);
      return cat.keywords.some(keyword => 
        words.some(word => word.includes(keyword) || keyword.includes(word))
      );
    });
  }

  // Detect location using enhanced logic
  const detectedLocation = detectLocation(description);
  
  // Generate smart title based on context
  const smartTitle = generateSmartTitle(description, matchedCategory);

  return {
    title: smartTitle,
    category: matchedCategory?.category || 'Generelt',
    location: detectedLocation
  };
}