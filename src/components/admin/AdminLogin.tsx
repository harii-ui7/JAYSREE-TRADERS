import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Lock, Mail, KeyRound, ArrowLeft, Shield, Eye, EyeOff, HelpCircle } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const { data, loginAdmin, resetAdminPasswordWithPin, setCurrentView } = useStore();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [recoveryPin, setRecoveryPin] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pinError, setPinError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginAdmin(password);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPinError('New passwords do not match');
      return;
    }
    const success = resetAdminPasswordWithPin(recoveryPin, newPassword);
    if (success) {
      setIsForgotPassword(false);
      setPassword('');
      setRecoveryPin('');
      setNewPassword('');
      setConfirmPassword('');
      setPinError('');
    } else {
      setPinError('Invalid recovery PIN. Default is 2026.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        {/* Top Back to Website link */}
        <button
          onClick={() => setCurrentView('public')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-amber-400 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Live Website</span>
        </button>

        {/* Brand Lockup */}
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center font-heading font-extrabold text-slate-950 text-2xl shadow-xl shadow-amber-400/20 mb-3">
            {data.settings.logoText || 'JT'}
          </div>
          <h2 className="font-heading text-2xl font-extrabold text-white tracking-tight">
            {data.settings.shopName}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Store Owner &amp; Content Management Portal
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 relative z-10">
        <div className="bg-slate-900 py-8 px-6 sm:px-10 rounded-2xl shadow-2xl border border-slate-800">
          {!isForgotPassword ? (
            /* Login Form */
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Admin Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={data.auth.email}
                    disabled
                    className="w-full text-xs sm:text-sm pl-10 pr-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 cursor-not-allowed select-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="admin-password" className="block text-xs font-semibold text-slate-300">
                    Master Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsForgotPassword(true)}
                    className="text-[11px] text-amber-400 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoFocus
                    className="w-full text-xs sm:text-sm pl-10 pr-10 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Default Credentials Hint for First-time setup */}
              <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 text-[11px] text-amber-300 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                <div>
                  Default password: <strong className="font-mono text-white">jaysree@2026</strong>
                  <br />
                  Recovery PIN: <strong className="font-mono text-white">2026</strong>
                  <div className="text-[10px] text-amber-400/80 mt-0.5">You can change both anytime inside the admin dashboard.</div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-lg shadow-amber-400/20 transition-all transform active:scale-95"
              >
                <Shield className="w-4 h-4" />
                <span>Enter Admin Dashboard</span>
              </button>
            </form>
          ) : (
            /* Forgot Password / Recovery PIN Reset Form */
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="flex items-center gap-2 mb-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <KeyRound className="w-4 h-4" />
                <span>Password Recovery</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Enter your 4-digit master recovery PIN to set a new password. (Default PIN is <strong className="text-white">2026</strong>).
              </p>

              <div>
                <label htmlFor="recovery-pin" className="block text-xs font-semibold text-slate-300 mb-1">
                  4-Digit Recovery PIN
                </label>
                <input
                  id="recovery-pin"
                  type="text"
                  placeholder="e.g. 2026"
                  value={recoveryPin}
                  onChange={(e) => {
                    setRecoveryPin(e.target.value);
                    setPinError('');
                  }}
                  required
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-400 font-mono tracking-widest text-center"
                />
              </div>

              <div>
                <label htmlFor="new-admin-pass" className="block text-xs font-semibold text-slate-300 mb-1">
                  New Password
                </label>
                <input
                  id="new-admin-pass"
                  type="password"
                  placeholder="Minimum 4 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div>
                <label htmlFor="confirm-admin-pass" className="block text-xs font-semibold text-slate-300 mb-1">
                  Confirm New Password
                </label>
                <input
                  id="confirm-admin-pass"
                  type="password"
                  placeholder="Re-enter new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              {pinError && (
                <p className="text-xs text-red-400 font-medium">{pinError}</p>
              )}

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setIsForgotPassword(false)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  Back to Login
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors"
                >
                  Reset &amp; Sign In
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
