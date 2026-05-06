import { User, Mail, Phone, FileText } from 'lucide-react';

const PatientForm = ({ formData, onChange }) => {
  const handleInputChange = (e) => {
    onChange(e.target.name, e.target.value);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
          <User size={16} /> Full Name *
        </label>
        <input
          type="text"
          name="patientName"
          value={formData.patientName}
          onChange={handleInputChange}
          required
          placeholder="Enter your full name"
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
          <Mail size={16} /> Email *
        </label>
        <input
          type="email"
          name="patientEmail"
          value={formData.patientEmail}
          onChange={handleInputChange}
          required
          placeholder="your@email.com"
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
          <Phone size={16} /> Phone Number *
        </label>
        <input
          type="tel"
          name="patientPhone"
          value={formData.patientPhone}
          onChange={handleInputChange}
          required
          placeholder="0912 345 6789"
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
          <FileText size={16} /> Reason for Visit
        </label>
        <textarea
          name="reason"
          value={formData.reason}
          onChange={handleInputChange}
          rows="3"
          placeholder="Briefly describe your concerns or reason for consultation..."
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
        />
      </div>
    </div>
  );
};

export default PatientForm;