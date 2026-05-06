import { useState, useEffect } from 'react';

const HeaderDateTime = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="hidden md:block text-right">
      <p className="text-sm text-gray-400">
        {dateTime.toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      </p>
      <p className="text-xs text-gray-400">{dateTime.toLocaleTimeString()}</p>
    </div>
  );
};

export default HeaderDateTime;