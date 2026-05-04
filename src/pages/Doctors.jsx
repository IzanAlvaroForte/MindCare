import SearchBar from '../components/Common/SearchBar';
import DoctorCard from '../components/Doctors/DoctorCard';

const Doctors = () => {
  return (
    <div className="flex flex-col gap-6 h-full w-full px-24 py-8">
      <header className="py-4">
        <p className="text-2xl font-bold">DOCTORS</p>
      </header>

      <SearchBar />

      <main className="w-full space-y-4">
        <DoctorCard />
      </main>
    </div>
  );
};

export default Doctors;