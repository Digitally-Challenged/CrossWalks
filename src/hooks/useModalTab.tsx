import { useState } from 'react';

export const useModalTab = (initialTab: string) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return { activeTab, handleTabChange };
};