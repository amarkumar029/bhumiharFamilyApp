// ------------------------------------
// 1. LocationType: वर्तमान (current) चयनित स्थान का प्रतिनिधित्व करता है
// ------------------------------------
export interface LocationType {
  state: string;
  city: string;
  moholla: string; // मोहल्ला (Neighborhood/Locality)
}

// ------------------------------------
// 2. LocationsData: hierarchical (पदानुक्रमित) स्थान डेटा का भंडारण (storage)
// ------------------------------------
export interface LocationsData {
  // Key: राज्य का नाम (State name)
  [state: string]: {
    // Value: cities का object
    // Key: शहर का नाम (City name)
    [city: string]: string[]; // Value: mohallas (मोहल्लों) की array
  };
}

// ------------------------------------
// 3. LocationOption: Dropdown/Selector में उपयोग किए जाने वाले सामान्य विकल्प
// ------------------------------------
export interface LocationOption {
  value: string;
  label: string;
}

// ------------------------------------
// 4. LocationSelectorProps: Location Selector Component के लिए Props
// ------------------------------------
export interface LocationSelectorProps {
  // control: react-hook-form से Control object
  // React Native में react-hook-form के साथ काम करते समय आवश्यक
  control: any; 
  name: string;
  value?: LocationType; // वर्तमान मान
  onChange: (value: LocationType) => void; // मान बदलने पर callback
  // अन्य props जो Native Selectors में उपयोग हो सकते हैं, जैसे:
  // placeholder?: string;
  // disabled?: boolean;
}