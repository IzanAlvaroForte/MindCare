import { User, Calendar, CheckCircle } from 'lucide-react';

const ProfileHeader = ({ user }) => {
  return (
    <div className="bg-gradient-to-r from-primary to-primary/70 rounded-2xl p-6 text-white mb-6">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
          <User size={40} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{user?.name || 'User'}</h1>
          <p className="text-white/80">{user?.email}</p>
          <div className="flex gap-4 mt-2 text-sm">
            <span className="flex items-center gap-1"><Calendar size={14} /> Member since {user?.joinDate}</span>
            <span className="flex items-center gap-1"><CheckCircle size={14} /> {user?.totalAppointments || 0} appointments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;