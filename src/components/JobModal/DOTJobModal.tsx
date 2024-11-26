import React from 'react';
import { X } from 'lucide-react';
import { Modal, ModalContent, ModalHeader, ModalTitle } from '../ui/Modal';
import { useModalTab } from '../../hooks/useModalTab';
import { JobData } from '../../types/job';
import DOTTab from './DOTTab';
import SCOTab from './SCOTab';

interface DOTJobModalProps {
  job: JobData | null;
  isOpen: boolean;
  onClose: () => void;
}

const DOTJobModal: React.FC<DOTJobModalProps> = ({ job, isOpen, onClose }) => {
  const { activeTab, handleTabChange } = useModalTab('dot');

  if (!job) return null;

  return (
    <Modal open={isOpen}>
      <ModalContent className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gray-900 text-white">
        <ModalHeader className="border-b border-gray-700 sticky top-0 bg-gray-900 z-10">
          <div className="flex justify-between items-center pr-8">
            <ModalTitle className="text-2xl font-bold text-blue-400">
              {job.jobTitle}
            </ModalTitle>
            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-800 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex space-x-4 mt-4">
            <button
              className={`px-4 py-2 rounded-t-lg transition-colors ${
                activeTab === 'dot'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
              onClick={() => handleTabChange('dot')}
            >
              DOT Details
            </button>
            <button
              className={`px-4 py-2 rounded-t-lg transition-colors ${
                activeTab === 'sco'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
              onClick={() => handleTabChange('sco')}
            >
              SCO Crosswalk
            </button>
          </div>
        </ModalHeader>

        <div className="p-6">
          {activeTab === 'dot' ? (
            <DOTTab job={job} />
          ) : (
            <SCOTab job={job} />
          )}
        </div>
      </ModalContent>
    </Modal>
  );
};

export default DOTJobModal;