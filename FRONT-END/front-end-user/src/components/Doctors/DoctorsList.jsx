import DoctorCard from './DoctorCard';

const DoctorsList = ({ doctors, onViewProfile, onBook }) => {
  if (doctors.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No doctors found matching your criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {doctors.map((doctor) => (
        <DoctorCard
          key={doctor.id}
          doctor={doctor}
          onViewProfile={onViewProfile}
          onBook={onBook}
        />
      ))}
    </div>
  );
};

export default DoctorsList;