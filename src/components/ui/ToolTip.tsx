import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  delay?: number;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  disabled?: boolean;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  delay = 0.3,
  position = 'top',
  className = '',
  disabled = false
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    let timeoutId: number | undefined;
    
    if (shouldShow && !disabled) {
      timeoutId = window.setTimeout(() => {
        setIsVisible(true);
      }, delay * 1000);
    } else {
      setIsVisible(false);
    }

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [shouldShow, delay, disabled]);

  const showTooltip = useCallback(() => {
    if (!disabled) {
      setShouldShow(true);
    }
  }, [disabled]);

  const hideTooltip = useCallback(() => {
    setShouldShow(false);
  }, []);

  const positionClass = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
  }[position];

  const tooltipContent = (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className={`absolute z-50 ${positionClass} ${className}`}
    >
      <div className="bg-gray-900 text-white text-sm rounded-md py-1 px-2 shadow-lg whitespace-nowrap">
        {content}
      </div>
    </motion.div>
  );

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {React.cloneElement(children, {
        'aria-describedby': isVisible ? 'tooltip' : undefined,
        className: `${children.props.className || ''} ${disabled ? 'cursor-not-allowed opacity-50' : ''}`
      })}
      <AnimatePresence>
        {isVisible && tooltipContent}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;