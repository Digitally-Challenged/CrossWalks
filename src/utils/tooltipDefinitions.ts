export const getSVPDescription = (level: string): string => {
  const descriptions: Record<string, string> = {
    '1': 'Short demonstration only (up to 30 days)',
    '2': 'Anything beyond short demonstration up to and including 30 days',
    '3': 'Over 30 days up to and including 3 months',
    '4': 'Over 3 months up to and including 6 months',
    '5': 'Over 6 months up to and including 1 year',
    '6': 'Over 1 year up to and including 2 years',
    '7': 'Over 2 years up to and including 4 years',
    '8': 'Over 4 years up to and including 10 years',
    '9': 'Over 10 years',
  };
  return descriptions[level] || 'Unknown SVP level';
};

export const getStrengthDescription = (level: string): string => {
  const descriptions: Record<string, string> = {
    'Sedentary': 'Exerting up to 10 pounds of force occasionally',
    'Light': 'Exerting up to 20 pounds of force occasionally, up to 10 pounds frequently',
    'Medium': 'Exerting 20-50 pounds occasionally, 10-25 pounds frequently',
    'Heavy': 'Exerting 50-100 pounds occasionally, 25-50 pounds frequently',
    'Very Heavy': 'Exerting in excess of 100 pounds occasionally, 50+ pounds frequently',
  };
  return descriptions[level] || 'Unknown strength level';
};

export const getFrequencyLevelDescription = (level: string): string => {
  const descriptions: Record<string, string> = {
    'Not Present': 'Activity or condition does not exist',
    'Occasionally': 'Activity or condition exists up to 1/3 of the time',
    'Frequently': 'Activity or condition exists from 1/3 to 2/3 of the time',
    'Constantly': 'Activity or condition exists 2/3 or more of the time',
  };
  return descriptions[level] || 'Unknown frequency level';
};

export const getGEDLevelDescription = (level: string, area: string): string => {
  const descriptions: Record<string, Record<string, string>> = {
    reasoning: {
      '1': 'Apply commonsense understanding to carry out simple one- or two-step instructions',
      '2': 'Apply commonsense understanding to carry out detailed but uninvolved written or oral instructions',
      '3': 'Apply commonsense understanding to carry out instructions furnished in written, oral, or diagrammatic form',
      '4': 'Apply principles of rational systems to solve practical problems',
      '5': 'Apply principles of logical or scientific thinking to define problems, collect data, establish facts',
      '6': 'Apply principles of logical or scientific thinking to a wide range of intellectual and practical problems',
    },
    math: {
      '1': 'Add and subtract two-digit numbers',
      '2': 'Perform arithmetic operations involving all American monetary units',
      '3': 'Compute discount, interest, profit, and loss; commission, markup, and selling price',
      '4': 'Perform ordinary algebraic, geometric, and trigonometric operations',
      '5': 'Work with exponents and logarithms, linear equations, quadratic equations, mathematical induction',
      '6': 'Apply concepts of calculus and statistics',
    },
    language: {
      '1': 'Read at rate of 95-120 words per minute. Compare similarities and differences between words',
      '2': 'Reading rate of 190-215 words per minute. Write compound and complex sentences',
      '3': 'Reading rate of 190-215 words per minute. Write with proper grammar, punctuation, and spelling',
      '4': 'Reading rate of 280-310 words per minute. Prepare business letters, summaries, and reports',
      '5': 'Reading rate of 400+ words per minute. Write editorials and journals',
      '6': 'Reading rate of 400+ words per minute. Write novels, plays, editorials, journals, speeches, and manuals',
    },
  };
  return descriptions[area]?.[level] || 'Unknown GED level';
};

export const getTemperamentDescription = (code: string): string => {
  const descriptions: Record<string, string> = {
    'D': 'Directing, controlling, or planning activities of others',
    'F': 'Feelings, ideas, or facts expressed in artistic form',
    'I': 'Influencing people in their opinions, attitudes, or judgments',
    'J': 'Making judgments and decisions',
    'M': 'Making evaluations based on measurable or verifiable criteria',
    'P': 'Dealing with people beyond giving and receiving instructions',
    'R': 'Performing repetitive or continuous tasks',
    'S': 'Performing effectively under stress',
    'T': 'Attaining precise set limits, tolerances, and standards',
    'V': 'Performing variety of duties, often changing from one task to another',
  };
  return descriptions[code] || 'Unknown temperament code';
};

export const getGOEInterestArea = (code: string): string => {
  const areas: Record<string, string> = {
    '01': 'Artistic',
    '02': 'Scientific',
    '03': 'Plants and Animals',
    '04': 'Protective',
    '05': 'Mechanical',
    '06': 'Industrial',
    '07': 'Business Detail',
    '08': 'Selling',
    '09': 'Accommodating',
    '10': 'Humanitarian',
    '11': 'Leading-Influencing',
    '12': 'Physical Performing',
  };
  return areas[code] || 'Unknown interest area';
};

export const WorkerFunctionLevelDescriptions: Record<string, string> = {
  '0': 'No significant relationship',
  '1': 'Taking Instructions-Helping',
  '2': 'Feeding-Offbearing',
  '3': 'Manipulating',
  '4': 'Operating-Controlling',
  '5': 'Precision Working',
  '6': 'Setting-Up',
  '7': 'Speaking-Signaling',
  '8': 'Synthesizing',
};

export const AptitudeLevelDescriptions: Record<string, { interpretation: string; percentile: string; gatbScore: string }> = {
  '1': { interpretation: 'Top 10% of Population', percentile: '90-99', gatbScore: '125+' },
  '2': { interpretation: 'High', percentile: '67-89', gatbScore: '111-124' },
  '3': { interpretation: 'Medium High', percentile: '34-66', gatbScore: '90-110' },
  '4': { interpretation: 'Low', percentile: '11-33', gatbScore: '76-89' },
  '5': { interpretation: 'Bottom 10% of Population', percentile: '1-10', gatbScore: '75-' },
};

export const Temperaments: Record<string, string> = {
  'D': 'Directing',
  'F': 'Feelings',
  'I': 'Influencing',
  'J': 'Judgments',
  'M': 'Measurable',
  'P': 'People',
  'R': 'Repetitive',
  'S': 'Stress',
  'T': 'Tolerances',
  'V': 'Variety',
};

export const Aptitudes: Record<string, string> = {
  'generalLearningAbility': 'General Learning Ability',
  'verbalAptitude': 'Verbal Aptitude',
  'numericalAptitude': 'Numerical Aptitude',
  'spatialAptitude': 'Spatial Aptitude',
  'formPerception': 'Form Perception',
  'clericalPerception': 'Clerical Perception',
  'motorCoordination': 'Motor Coordination',
  'fingerDexterity': 'Finger Dexterity',
  'manualDexterity': 'Manual Dexterity',
  'eyeHandFootCoordination': 'Eye-Hand-Foot Coordination',
  'colorDiscrimination': 'Color Discrimination',
};