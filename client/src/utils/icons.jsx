// src/utils/icons.js

import React from 'react';

// Function to return a dynamic icon
export const getIcon = (iconName, size = 24, color = 'black', style = {}) => {
  // Dynamic class based on the icon name
  const iconClass = `fa ${iconName}`;

  return (
    <i
      className={iconClass}
      style={{
        fontSize: size, // Apply size dynamically
        color: color, // Apply color dynamically
        ...style, // Any other styles passed in
      }}
    />
  );
};
