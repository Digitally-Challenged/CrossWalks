import React from 'react';

interface BasicInfoProps {
  title: string;
  strength: string | null;
  svp: string | null;
  setTitle: (value: string) => void;
  setStrength: (value: string | null) => void;
  setSvp: (value: string | null) => void;
}

const BasicInfo: React.FC<BasicInfoProps> = ({
  title,
  strength,
  svp,
  setTitle,
  setStrength,
  setSvp,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-300">
          Job Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="strength" className="block text-sm font-medium text-gray-300">
          Strength
        </label>
        <select
          id="strength"
          value={strength || ''}
          onChange={(e) => setStrength(e.target.value || null)}
          className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select Strength</option>
          <option value="S">Sedentary</option>
          <option value="L">Light</option>
          <option value="M">Medium</option>
          <option value="H">Heavy</option>
          <option value="V">Very Heavy</option>
        </select>
      </div>
      <div>
        <label htmlFor="svp" className="block text-sm font-medium text-gray-300">
          SVP (Specific Vocational Preparation)
        </label>
        <select
          id="svp"
          value={svp || ''}
          onChange={(e) => setSvp(e.target.value || null)}
          className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select SVP</option>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => (
            <option key={value} value={value.toString()}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default BasicInfo;