import React from 'react';

const traditionalPractices = {
  // ... (previous code remains the same until zoneMapping)
};

const LocalPractices = ({ district }) => {
  const getZoneBasedPractices = (district) => {
    const zoneMapping = {
      'Thanjavur': 'cauveryDelta',
      'Tiruvarur': 'cauveryDelta',
      'Nagapattinam': 'cauveryDelta',
      'Coimbatore': 'westernGhats',
      'Nilgiris': 'westernGhats',
      'Ramanathapuram': 'coastal',
      'Tuticorin': 'coastal'
      // Removed duplicate 'Nagapattinam' entry as it's already mapped to 'cauveryDelta'
    };

    const zone = zoneMapping[district];
    return zone ? traditionalPractices.regionSpecific[zone] : [];
  };

  // ... (rest of the component code remains the same)
};

export default LocalPractices;