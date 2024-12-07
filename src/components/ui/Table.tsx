import React from 'react';
import { Card } from 'flowbite-react';
import { HelpCircle } from 'lucide-react';
import { Tooltip } from './ToolTip';
import { LucideIcon } from 'lucide-react';

interface TableProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
}

export const Table: React.FC<TableProps> = ({ 
  title, 
  description, 
  icon: Icon,
  children,
  className = ''
}) => {
  return (
    <Card className={`bg-gray-800 border-gray-700 ${className}`}>
      <div className="w-full flex flex-col items-center mb-4">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-5 h-5 text-blue-400" />}
          <h3 className="text-lg font-medium text-white flex items-center gap-2">
            {title}
            {description && (
              <Tooltip content={description}>
                <HelpCircle className="w-4 h-4 text-gray-400" />
              </Tooltip>
            )}
          </h3>
        </div>
      </div>
      {children}
    </Card>
  );
}; 