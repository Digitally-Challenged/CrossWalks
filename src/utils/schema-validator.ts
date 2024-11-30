import { z } from 'zod';

// Frontend Types (from job.ts)
const frontendTypes = {
  FrequencyLevel: ['Not Present', 'Occasionally', 'Frequently', 'Constantly'],
  StrengthFullName: ['Sedentary', 'Light', 'Medium', 'Heavy', 'Very Heavy'],
  SVPLevel: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
  GEDLevel: ['1', '2', '3', '4', '5', '6'],
  WorkerFunctionLevel: ['0', '1', '2', '3', '4', '5', '6', '7', '8'],
  AptitudeLevel: ['1', '2', '3', '4', '5']
};

// Backend Column Types (from database.py)
const backendColumns = new Set([
  'Ncode', 'DocumentNumber', 'Code', 'DLU', 'WFData', 'WFDataSig', 
  'WFPeople', 'WFPeopleSig', 'WFThings', 'WFThingsSig', 'GEDR', 
  'GEDM', 'GEDL', 'SVPNum', 'AptGenLearn', 'AptVerbal', 'AptNumerical', 
  'AptSpacial', 'AptFormPer', 'AptClericalPer', 'AptMotor', 'AptFingerDext',
  'AptManualDext', 'AptEyeHandCoord', 'AptColorDisc', 'WField1', 'WField2', 
  'WField3', 'MPSMS1', 'MPSMS2', 'MPSMS3', 'Temp1', 'Temp2', 'Temp3', 
  'Temp4', 'Temp5', 'GOE', 'GOENum', 'Strength', 'StrengthNum', 'ClimbingNum',
  'BalancingNum', 'StoopingNum', 'KneelingNum', 'CrouchingNum', 'CrawlingNum',
  'ReachingNum', 'HandlingNum', 'FingeringNum', 'FeelingNum', 'TalkingNum',
  'HearingNum', 'TastingNum', 'NearAcuityNum', 'FarAcuityNum', 'DepthNum',
  'AccommodationNum', 'ColorVisionNum', 'FieldVisionNum', 'WeatherNum',
  'ColdNum', 'HeatNum', 'WetNum', 'NoiseNum', 'VibrationNum', 'AtmosphereNum',
  'MovingNum', 'ElectricityNum', 'HeightNum', 'RadiationNum', 'ExplosionNum',
  'ToxicNum', 'OtherNum', 'Title', 'AltTitles', 'CompleteTitle', 'Industry',
  'Definitions', 'GOE1', 'GOE2', 'GOE3', 'WField1Short', 'WField2Short',
  'WField3Short', 'MPSMS1Short', 'MPSMS2Short', 'MPSMS3Short', 'OccGroup'
]);

// Frontend to Backend mapping validation
const columnMappings = {
  // Basic Info
  'title': 'Title',
  'strength': 'Strength',
  'svp': 'SVPNum',

  // Posturals
  'climbing': 'ClimbingNum',
  'balancing': 'BalancingNum',
  'stooping': 'StoopingNum',
  'kneeling': 'KneelingNum',
  'crouching': 'CrouchingNum',
  'crawling': 'CrawlingNum',

  // Manipulative
  'reaching': 'ReachingNum',
  'handling': 'HandlingNum',
  'fingering': 'FingeringNum',
  'feeling': 'FeelingNum',

  // Sensory
  'talking': 'TalkingNum',
  'hearing': 'HearingNum',
  'tasteSmell': 'TastingNum',

  // Visual
  'nearAcuity': 'NearAcuityNum',
  'farAcuity': 'FarAcuityNum',
  'depthPerception': 'DepthNum',
  'accommodation': 'AccommodationNum',
  'colorVision': 'ColorVisionNum',
  'fieldOfVision': 'FieldVisionNum',

  // Environmental
  'weather': 'WeatherNum',
  'extremeCold': 'ColdNum',
  'extremeHeat': 'HeatNum',
  'wet': 'WetNum',
  'noise': 'NoiseNum',
  'vibration': 'VibrationNum',
  'atmosphericConditions': 'AtmosphereNum',
  'movingMechanicalParts': 'MovingNum',
  'electricShock': 'ElectricityNum',
  'highPlaces': 'HeightNum',
  'radiation': 'RadiationNum',
  'explosives': 'ExplosionNum',
  'toxicChemicals': 'ToxicNum',
  'other': 'OtherNum',

  // GED
  'reasoning': 'GEDR',
  'math': 'GEDM',
  'language': 'GEDL',

  // Worker Functions
  'data': 'WFData',
  'people': 'WFPeople',
  'things': 'WFThings'
};

interface ValidationError {
  field: string;
  message: string;
}

export function validateSchemaAlignment(): ValidationError[] {
  const errors: ValidationError[] = [];

  // Validate that all backend columns exist
  Object.values(columnMappings).forEach(backendColumn => {
    if (!backendColumns.has(backendColumn)) {
      errors.push({
        field: backendColumn,
        message: `Backend column "${backendColumn}" not found in database schema`
      });
    }
  });

  // Validate Zod schema against backend columns
  const zodSchema = z.object({
    Title: z.string().optional(),
    Strength: z.string().optional(),
    SVPNum: z.number().optional(),
    // ... add all other fields from jobDataSchema
  });

  try {
    zodSchema.parse({}); // Validate schema structure
  } catch (error) {
    if (error instanceof z.ZodError) {
      error.errors.forEach(err => {
        errors.push({
          field: err.path.join('.'),
          message: `Schema validation error: ${err.message}`
        });
      });
    }
  }

  // Validate enum values
  const validateEnumMapping = (
    frontendEnum: string[],
    backendColumn: string,
    mapper: (value: string) => any
  ) => {
    frontendEnum.forEach(value => {
      try {
        const mappedValue = mapper(value);
        if (mappedValue === undefined) {
          errors.push({
            field: backendColumn,
            message: `No mapping found for frontend value "${value}" in column "${backendColumn}"`
          });
        }
      } catch (error) {
        errors.push({
          field: backendColumn,
          message: `Error mapping frontend value "${value}" to backend column "${backendColumn}": ${error}`
        });
      }
    });
  };

  // Validate strength mappings
  validateEnumMapping(
    frontendTypes.StrengthFullName,
    'Strength',
    value => STRENGTH_MAPPINGS.TO_NUMBER[value as keyof typeof STRENGTH_MAPPINGS.TO_NUMBER]
  );

  // Validate frequency mappings
  validateEnumMapping(
    frontendTypes.FrequencyLevel,
    'FrequencyNum',
    value => {
      const map: Record<string, number> = {
        'Not Present': 1,
        'Occasionally': 2,
        'Frequently': 3,
        'Constantly': 4
      };
      return map[value];
    }
  );

  return errors;
}

export function checkSchemaConsistency(): void {
  const errors = validateSchemaAlignment();
  
  if (errors.length > 0) {
    console.error('Schema validation errors found:');
    errors.forEach(error => {
      console.error(`- ${error.field}: ${error.message}`);
    });
    throw new Error('Schema validation failed');
  } else {
    console.log('Schema validation passed successfully');
  }
}