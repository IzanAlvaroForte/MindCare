import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const DoctorModal = ({ isOpen, onClose, doctor, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    email: '',
    phone: '',
    license: '',
    experience: '',
    fee: '',
    status: 'ACTIVE'
  });

  useEffect(() => {
    if (doctor) {
      setFormData({
        name: doctor.name || '',
        specialty: doctor.specialty || '',
        email: doctor.email || '',
        phone: doctor.phone || '',
        license: doctor.license || '',
        experience: doctor.experience || '',
        fee: doctor.fee || '',
        status: doctor.status || 'ACTIVE'
      });
    } else {
      setFormData({
        name: '',
        specialty: '',
        email: '',
        phone: '',
        license: '',
        experience: '',
        fee: '',
        status: 'ACTIVE'
      });
    }
  }, [doctor, isOpen]);

  const handleSubmit = (e) => {
  e.preventDefault();
  
  // Only send fields that have values
  const dataToSave = {};
    if (formData.name) dataToSave.name = formData.name;
    if (formData.specialty) dataToSave.specialty = formData.specialty;
    if (formData.email) dataToSave.email = formData.email;
    if (formData.phone) dataToSave.phone = formData.phone;
    if (formData.license) dataToSave.license = formData.license;
    if (formData.experience) dataToSave.experience = parseInt(formData.experience);
    if (formData.fee) dataToSave.fee = parseFloat(formData.fee);
    if (formData.status) dataToSave.status = formData.status;
    
    onSave(dataToSave);
    onClose();
  };

  const specialties = ['Counselor', 'Psychologist', 'Psychiatrist', 'Psychometrician', 'Clinical Psychologist'];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
          <h2 className="text-xl font-bold">
            {doctor ? 'Edit Doctor' : 'Add New Doctor'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input type="text" name="name" required value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Dr. John Smith" />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Specialty *</label>
              <select name="specialty" required value={formData.specialty}
                onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="">Select Specialty</option>
                {specialties.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input type="email" name="email" required value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="doctor@example.com" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
              <input type="tel" name="phone" required value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="09123456789" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">License #</label>
              <input type="text" name="license" value={formData.license}
                onChange={(e) => setFormData({...formData, license: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="PRC-12345" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Years Experience</label>
              <input type="number" name="experience" value={formData.experience}
                onChange={(e) => setFormData({...formData, experience: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="5" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Consultation Fee (₱)</label>
              <input type="number" name="fee" value={formData.fee}
                onChange={(e) => setFormData({...formData, fee: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="500" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select name="status" value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
                <option value="ON_LEAVE">On Leave</option>
                <option value="BUSY">Busy</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose}
              className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">Cancel</button>
            <button type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              {doctor ? 'Save Changes' : 'Add Doctor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorModal;