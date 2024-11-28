// Types for filter groups
export interface FilterOption {
  label: string;
  field: string;
  hasToggle?: boolean;
}

export interface FilterGroups {
  POSTURAL: FilterOption[];
  MANIPULATIVE: FilterOption[];
  SENSORY: FilterOption[];
  VISUAL: FilterOption[];
  ENVIRONMENTAL: FilterOption[];
  WORK_FORCE: FilterOption[];
  EDUCATIONAL: FilterOption[];
}

// Numeric scales
export const SVP_OPTIONS = Array.from({ length: 9 }, (_, i) => i + 1);
export const SCALE_0_TO_6 = Array.from({ length: 7 }, (_, i) => i);
export const SCALE_0_TO_8 = Array.from({ length: 9 }, (_, i) => i);
export const SCALE_1_TO_5 = Array.from({ length: 5 }, (_, i) => i + 1);
export const SCALE_1_TO_6 = Array.from({ length: 6 }, (_, i) => i + 1);

export const FILTER_GROUPS: FilterGroups = {
  POSTURAL: [
    { label: 'Climbing', field: 'climbing' },
    { label: 'Balancing', field: 'balancing' },
    { label: 'Stooping', field: 'stooping' },
    { label: 'Kneeling', field: 'kneeling' },
    { label: 'Crouching', field: 'crouching' },
    { label: 'Crawling', field: 'crawling' }
  ],
  MANIPULATIVE: [
    { label: 'Reaching', field: 'reaching' },
    { label: 'Handling', field: 'handling' },
    { label: 'Fingering', field: 'fingering' }
  ],
  SENSORY: [
    { label: 'Feeling', field: 'feeling' },
    { label: 'Talking', field: 'talking' },
    { label: 'Hearing', field: 'hearing' },
    { label: 'Taste/Smell', field: 'tasting' }
  ],
  VISUAL: [
    { label: 'Near Acuity', field: 'nearAcuity' },
    { label: 'Far Acuity', field: 'farAcuity' },
    { label: 'Depth Perc.', field: 'depth' },
    { label: 'Accommod.', field: 'accommodation' },
    { label: 'Color Vision', field: 'colorVision' },
    { label: 'Field of Vis.', field: 'fieldVision' }
  ],
  ENVIRONMENTAL: [
    { label: 'Weather', field: 'weather' },
    { label: 'Extr. Cold', field: 'cold' },
    { label: 'Extr. Heat', field: 'heat' },
    { label: 'Wet', field: 'wet' },
    { label: 'Noise', field: 'noise' },
    { label: 'Vibration', field: 'vibration' },
    { label: 'Atm. Cond.', field: 'atmosphere' },
    { label: 'Elec. Shock', field: 'electricity' },
    { label: 'Heights', field: 'height' },
    { label: 'Radiation', field: 'radiation' },
    { label: 'Explosion', field: 'explosion' },
    { label: 'Toxic', field: 'toxic' },
    { label: 'Other', field: 'other' }
  ],
  WORK_FORCE: [
    { label: 'Data', field: 'data', hasToggle: true },
    { label: 'People', field: 'people', hasToggle: true },
    { label: 'Things', field: 'things', hasToggle: true }
  ],
  EDUCATIONAL: [
    { label: 'Reasoning', field: 'reasoning', hasToggle: true },
    { label: 'Math', field: 'math', hasToggle: true },
    { label: 'Language', field: 'language', hasToggle: true }
  ]
} as const;