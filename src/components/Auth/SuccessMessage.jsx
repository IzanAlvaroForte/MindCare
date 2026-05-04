import { CheckCircle } from 'lucide-react';

const SuccessMessage = ({ message }) => {
  if (!message) return null;
  
  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
      <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
        <CheckCircle size={20} />
        {message}
      </div>
    </div>
  );
};

export default SuccessMessage;