const DoctorStatusBadge = ({ status }) => {
  const colors = {
    ACTIVE: 'bg-green-100 text-green-800',
    INACTIVE: 'bg-gray-100 text-gray-800',
    ON_LEAVE: 'bg-yellow-100 text-yellow-800',
    BUSY: 'bg-orange-100 text-orange-800'
  };
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
      {status}
    </span>
  );
};

export default DoctorStatusBadge;