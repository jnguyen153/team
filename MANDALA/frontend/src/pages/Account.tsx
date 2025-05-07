import Navbar from '../components/Navbar';
import { UserProfile } from '@clerk/clerk-react';

const Account = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    <Navbar />
    <main className="flex-grow flex flex-col items-center pt-20">
      <h1 className="text-2xl font-bold mb-6">Account Management</h1>
      <div className="w-full flex justify-center">
        <div className="w-full max-w-3xl">
          <UserProfile />
        </div>
      </div>
    </main>
  </div>
);

export default Account;