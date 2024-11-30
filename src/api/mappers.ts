
import type { JobData, APIJobData } from '../types/job';

export function mapAPIJobDataToJobData(apiJob: APIJobData): JobData {
  return {
    jobTitle: apiJob.Title,
    dotCode: apiJob.Code,
    industryDesignation: apiJob.Industry || '',
    alternateTitles: apiJob.AltTitles ? apiJob.AltTitles.split(';').filter(Boolean) : [],
    goe: {
      code: apiJob.GOE || '',
      title: getGOETitle(apiJob.GOE || '')
    },
    svp: {
      level: (apiJob.SVPNum?.toString() as JobData['svp']['level']) || '1',
      description: getSVPDescription(apiJob.SVPNum?.toString() || '1')
    },
    definition: apiJob.Definitions || '',
    strength: {
      level: (apiJob.Strength as JobData['strength']['level']) || 'Sedentary',
      description: getStrengthDescription(apiJob.Strength || 'Sedentary')
    },
    characteristics: {
      postural: {
        climbing: mapFrequencyLevel(apiJob.ClimbingNum),
        balancing: mapFrequencyLevel(apiJob.BalancingNum),
        stooping: mapFrequencyLevel(apiJob.StoopingNum),
        kneeling: mapFrequencyLevel(apiJob.KneelingNum),
        crouching: mapFrequencyLevel(apiJob.CrouchingNum),
        crawling: mapFrequencyLevel(apiJob.CrawlingNum)
      },
      manipulative: {
        reaching: mapFrequencyLevel(apiJob.ReachingNum),
        handling: mapFrequencyLevel(apiJob.HandlingNum),
        fingering: mapFrequencyLevel(apiJob.FingeringNum)
      },
      sensory: {
        feeling: mapFrequencyLevel(apiJob.FeelingNum),
        talking: mapFrequencyLevel(apiJob.TalkingNum),
        hearing: mapFrequencyLevel(apiJob.HearingNum),
        tasteSmell: mapFrequencyLevel(apiJob.TastingNum)
      },
      visual: {
        nearAcuity: mapFrequencyLevel(apiJob.NearAcuityNum),
        farAcuity: mapFrequencyLevel(apiJob.FarAcuityNum),
        depthPerception: mapFrequencyLevel(apiJob.DepthNum),
        accommodation: mapFrequencyLevel(apiJob.AccommodationNum),
        colorVision: mapFrequencyLevel(apiJob.ColorVisionNum),
        fieldOfVision: mapFrequencyLevel(apiJob.FieldVisionNum)
      },
      environmental: {
        weather: mapFrequencyLevel(apiJob.WeatherNum),
        extremeCold: mapFrequencyLevel(apiJob.ColdNum),
        extremeHeat: mapFrequencyLevel(apiJob.HeatNum),
        wet: mapFrequencyLevel(apiJob.WetNum),
        noise: mapNoiseLevel(apiJob.NoiseNum),
        vibration: mapFrequencyLevel(apiJob.VibrationNum),
        atmosphericConditions: mapFrequencyLevel(apiJob.AtmosphereNum),
        movingMechanicalParts: mapFrequencyLevel(apiJob.MovingNum),
        electricShock: mapFrequencyLevel(apiJob.ElectricityNum),
        highPlaces: mapFrequencyLevel(apiJob.HeightNum),
        radiation: mapFrequencyLevel(apiJob.RadiationNum),
        explosives: mapFrequencyLevel(apiJob.ExplosionNum),
        toxicChemicals: mapFrequencyLevel(apiJob.ToxicNum),
        other: mapFrequencyLevel(apiJob.OtherNum)
      }
    },
    generalEducationalDevelopment: {
      reasoning: {
        level: (apiJob.GEDR?.toString() as JobData['generalEducationalDevelopment']['reasoning']['level']) || '1',
        description: getGEDDescription('reasoning', apiJob.GEDR?.toString() || '1')
      },
      math: {
        level: (apiJob.GEDM?.toString() as JobData['generalEducationalDevelopment']['math']['level']) || '1',
        description: getGEDDescription('math', apiJob.GEDM?.toString() || '1')
      },
      language: {
        level: (apiJob.GEDL?.toString() as JobData['generalEducationalDevelopment']['language']['level']) || '1',
        description: getGEDDescription('language', apiJob.GEDL?.toString() || '1')
      }
    },
    workerFunctions: {
      data: {
        level: (apiJob.WFData?.toString() as JobData['workerFunctions']['data']['level']) || '0',
        description: apiJob.WFDataSig || ''
      },
      people: {
        level: (apiJob.WFPeople?.toString() as JobData['workerFunctions']['people']['level']) || '0',
        description: apiJob.WFPeopleSig || ''
      },
      things: {
        level: (apiJob.WFThings?.toString() as JobData['workerFunctions']['things']['level']) || '0',
        description: apiJob.WFThingsSig || ''
      }
    },
    workField: {
      code: apiJob.WField1 || '',
      description: apiJob.WField1Short || ''
    },
    mpsmsCode: {
      code: apiJob.MPSMS1 || '',
      description: apiJob.MPSMS1Short || ''
    },
    aptitudes: getAptitudes(apiJob),
    temperaments: {
      code: [apiJob.Temp1, apiJob.Temp2, apiJob.Temp3, apiJob.Temp4, apiJob.Temp5]
        .filter(Boolean)
        .join(''),
      description: getTemperamentsDescription([apiJob.Temp1, apiJob.Temp2, apiJob.Temp3, apiJob.Temp4, apiJob.Temp5])
    }
  };
}

function mapFrequencyLevel(level: number | undefined): JobData['characteristics']['postural']['climbing'] {
  if (!level) return 'Not Present';
  const levels: Record<number, JobData['characteristics']['postural']['climbing']> = {
    1: 'Not Present',
    2: 'Occasionally',
    3: 'Frequently',
    4: 'Constantly'
  };
  return levels[level] || 'Not Present';
}

function mapNoiseLevel(level: number | undefined): string {
  if (!level) return 'Not Present';
  const levels: Record<number, string> = {
    1: 'Very Quiet',
    2: 'Quiet',
    3: 'Moderate',
    4: 'Loud',
    5: 'Very Loud'
  };
  return levels[level] || 'Not Present';
}

// Add placeholder functions for descriptions (implement these based on your needs)
function getGOETitle(code: string): string {
  return code;
}

function getSVPDescription(level: string): string {
  return `SVP Level ${level}`;
}

function getStrengthDescription(strength: string): string {
  return `${strength} strength required`;
}

function getGEDDescription(type: string, level: string): string {
  return `${type.charAt(0).toUpperCase() + type.slice(1)} Level ${level}`;
}

function getTemperamentsDescription(temps: (string | undefined)[]): string {
  return temps.filter(Boolean).join(', ');
}

function getAptitudes(apiJob: APIJobData): JobData['aptitudes'] {
  // Implement aptitude mapping based on your needs
  return {
    generalLearningAbility: { level: '1', description: '', aptitude: '' },
    verbalAptitude: { level: '1', description: '', aptitude: '' },
    numericalAptitude: { level: '1', description: '', aptitude: '' },
    spatialAptitude: { level: '1', description: '', aptitude: '' },
    formPerception: { level: '1', description: '', aptitude: '' },
    clericalPerception: { level: '1', description: '', aptitude: '' },
    motorCoordination: { level: '1', description: '', aptitude: '' },
    fingerDexterity: { level: '1', description: '', aptitude: '' },
    manualDexterity: { level: '1', description: '', aptitude: '' },
    eyeHandFootCoordination: { level: '1', description: '', aptitude: '' },
    colorDiscrimination: { level: '1', description: '', aptitude: '' }
  };
}
