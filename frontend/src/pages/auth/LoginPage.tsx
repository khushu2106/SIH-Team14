import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { UserRole, User } from '../../types';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import {
  Sprout,
  ArrowRight,
  UserCheck,
  MapPin,
  Phone,
  Lock,
  Mail,
  Scale,
  Sparkles
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { switchRole, login, register } = useAuth();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'signin' | 'register'>('register');

  // Sign In State
  const [selectedRole, setSelectedRole] = useState<UserRole>('farmer');
  const [phone, setPhone] = useState('+91 98250 12345');
  const [password, setPassword] = useState('password123');

  // New Farmer Registration State
  const [farmerName, setFarmerName] = useState('');
  const [farmerPhone, setFarmerPhone] = useState('');
  const [farmerEmail, setFarmerEmail] = useState('');
  const [farmerLocation, setFarmerLocation] = useState('');
  const [landAcres, setLandAcres] = useState(5);
  const [primaryCrop, setPrimaryCrop] = useState('Tomato');
  const [regPassword, setRegPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(selectedRole);
    navigate(
      selectedRole === 'farmer'
        ? '/farmer/dashboard'
        : selectedRole === 'fpo'
        ? '/fpo/dashboard'
        : selectedRole === 'buyer'
        ? '/buyer/dashboard'
        : '/admin/dashboard'
    );
  };

  const handleRegisterFarmer = (e: React.FormEvent) => {
    e.preventDefault();

    const newFarmerId = `farmer-${Date.now()}`;
    const newFarmer: User = {
      id: newFarmerId,
      name: farmerName.trim() || 'New Farmer',
      phone: farmerPhone.trim() || '+91 98980 00000',
      email: farmerEmail.trim() || `${farmerName.toLowerCase().replace(/\s+/g, '')}@farmsetu.in`,
      role: 'farmer',
      location: farmerLocation.trim() || 'Gujarat, India',
      verified: true,
      rating: 5.0,
      totalOrders: 0,
      avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80'
    };

    register(newFarmer);

    addNotification({
      title: 'Farmer Profile Created',
      message: `Welcome ${newFarmer.name}! Your farm profile (${farmerLocation}, ${landAcres} Acres) is now registered on FarmSetu.`,
      type: 'system',
      targetRole: 'farmer'
    });

    navigate('/farmer/dashboard');
  };

  const handleQuickDemoRole = (role: UserRole) => {
    setSelectedRole(role);
    switchRole(role);
    navigate(
      role === 'farmer'
        ? '/farmer/dashboard'
        : role === 'fpo'
        ? '/fpo/dashboard'
        : role === 'buyer'
        ? '/buyer/dashboard'
        : '/admin/dashboard'
    );
  };

  const demoRoles: { role: UserRole; title: string; subtitle: string; icon: string }[] = [
    { role: 'farmer', title: 'Farmer (કિસાન)', subtitle: 'Ramesh Patel • Rajkot', icon: '🌾' },
    { role: 'fpo', title: 'FPO Org', subtitle: 'Saurashtra Kisan Co.', icon: '🏢' },
    { role: 'buyer', title: 'Bulk Buyer', subtitle: 'GreenLeaf Grand', icon: '🛒' },
    { role: 'admin', title: 'Admin (DoCA)', subtitle: 'Dr. Alok Verma', icon: '🛡️' },
  ];

  return (
    <Card className="p-6 sm:p-8 space-y-6 shadow-xl border-slate-200 dark:border-slate-800">
      {/* Header */}
      <div className="text-center space-y-1">
        <Badge variant="success">Direct Digital Marketplace</Badge>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Welcome to FarmSetu
        </h2>
        <p className="text-xs text-slate-500">
          Digital bridge connecting farmers directly with buyers
        </p>
      </div>

      {/* Tabs: Register as Farmer vs Sign In */}
      <div className="flex bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
        <button
          type="button"
          onClick={() => setActiveTab('register')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'register'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Sprout className="w-3.5 h-3.5" /> Farmer Registration (નવી નોંધણી)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('signin')}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'signin'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" /> Sign In / Demo
        </button>
      </div>

      {/* TAB 1: New Farmer Registration Form */}
      {activeTab === 'register' && (
        <form onSubmit={handleRegisterFarmer} className="space-y-4 animate-fade-in">
          <div className="p-3 bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-xl text-xs text-emerald-800 dark:text-emerald-300 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>
              Register with your real farm details to start listing produce, getting AI price recommendations, and connecting directly with bulk buyers.
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Farmer Full Name (તમારું નામ) *
            </label>
            <input
              type="text"
              placeholder="e.g. Ramesh Patel, Shaileshbhai..."
              value={farmerName}
              onChange={(e) => setFarmerName(e.target.value)}
              required
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Mobile Number *
              </label>
              <input
                type="tel"
                placeholder="+91 98250 XXXXX"
                value={farmerPhone}
                onChange={(e) => setFarmerPhone(e.target.value)}
                required
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="farmer@gmail.com"
                value={farmerEmail}
                onChange={(e) => setFarmerEmail(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Village / District, State *
              </label>
              <input
                type="text"
                placeholder="e.g. Gondal, Rajkot, Gujarat"
                value={farmerLocation}
                onChange={(e) => setFarmerLocation(e.target.value)}
                required
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Land Size (Acres)
              </label>
              <input
                type="number"
                min="1"
                max="500"
                value={landAcres}
                onChange={(e) => setLandAcres(Number(e.target.value))}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Primary Crop (મુખ્ય પાક)
              </label>
              <select
                value={primaryCrop}
                onChange={(e) => setPrimaryCrop(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value="Tomato">Tomato (ટામેટા / टमाटर)</option>
                <option value="Onion">Onion (ડુંગળી / प्याज)</option>
                <option value="Spinach (Palak)">Spinach (પાલક / पालक)</option>
                <option value="Banana">Banana (કેળા / केला)</option>
                <option value="Potato">Potato (બટાકા / आलू)</option>
                <option value="Green Chilli">Green Chilli (મરચાં / हरी मिर्च)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Create Password *
              </label>
              <input
                type="password"
                placeholder="******"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                required
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <Button type="submit" variant="primary" className="w-full gap-1 text-sm py-3 mt-2">
            Complete Registration & Enter Farmer Portal <ArrowRight className="w-4 h-4" />
          </Button>
        </form>
      )}

      {/* TAB 2: Sign In / Quick Demo */}
      {activeTab === 'signin' && (
        <div className="space-y-4 animate-fade-in">
          {/* Quick Demo Switcher */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
              1-Click Demo Accounts:
            </span>
            <div className="grid grid-cols-2 gap-2">
              {demoRoles.map((r) => (
                <button
                  key={r.role}
                  type="button"
                  onClick={() => handleQuickDemoRole(r.role)}
                  className="p-2.5 text-left rounded-xl border border-slate-200 dark:border-slate-700 hover:border-emerald-500 bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50/50 transition-all flex items-start gap-2 group"
                >
                  <span className="text-xl">{r.icon}</span>
                  <div className="overflow-hidden">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block truncate group-hover:text-emerald-600">
                      {r.title}
                    </span>
                    <span className="text-[10px] text-slate-400 block truncate">
                      {r.subtitle}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-200 dark:border-slate-700" />
            <span className="flex-shrink mx-4 text-[10px] uppercase font-bold text-slate-400">Or Sign In with Phone</span>
            <div className="flex-grow border-t border-slate-200 dark:border-slate-700" />
          </div>

          <form onSubmit={handleLogin} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Mobile Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <Button type="submit" variant="primary" className="w-full gap-1 text-sm py-2.5">
              Sign In as {selectedRole.toUpperCase()} <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        </div>
      )}
    </Card>
  );
};
