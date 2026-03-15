import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Lock, User, ArrowRight, Github, Chrome as Google } from 'lucide-react';

interface AuthProps {
  onLogin: () => void;
}

export default function Auth({ onLogin }: AuthProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1); // 1: Basic Info, 2: Driver Verification
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  // Driver Verification Fields
  const [licensePlate, setLicensePlate] = useState('');
  const [licenseImage, setLicenseImage] = useState<string | null>(null);
  const [vehicleDocImage, setVehicleDocImage] = useState<string | null>(null);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      onLogin();
    } else {
      if (step === 1) {
        setStep(2);
      } else {
        onLogin();
      }
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else setIsLogin(true);
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col px-6 py-12 font-sans">
      {/* Logo / Branding */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col items-center mb-8"
      >
        <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-200 mb-3">
          <motion.div
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
          >
            <Phone size={32} className="text-white" fill="currentColor" />
          </motion.div>
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">GiaoHang</h1>
        <p className="text-slate-500 text-sm font-medium">Hệ thống đối tác tài xế</p>
      </motion.div>

      {/* Form Container */}
      <div className="flex-1">
        <div className="flex gap-8 mb-8 border-b border-slate-100">
          <button 
            onClick={() => { setIsLogin(true); setStep(1); }}
            className={`pb-4 text-lg font-bold transition-all relative ${isLogin ? 'text-emerald-500' : 'text-slate-400'}`}
          >
            Đăng nhập
            {isLogin && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500 rounded-full" />}
          </button>
          <button 
            onClick={() => setIsLogin(false)}
            className={`pb-4 text-lg font-bold transition-all relative ${!isLogin ? 'text-emerald-500' : 'text-slate-400'}`}
          >
            Đăng ký tài xế
            {!isLogin && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500 rounded-full" />}
          </button>
        </div>

        <form onSubmit={handleNextStep} className="space-y-5">
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.div
                key="login-fields"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
                className="space-y-5"
              >
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Số điện thoại</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input 
                      type="tel" 
                      placeholder="090 123 4567" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Mật khẩu</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input 
                      type="password" 
                      placeholder="••••••••" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
                      required
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button type="button" className="text-sm font-bold text-emerald-600 hover:text-emerald-700">Quên mật khẩu?</button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={`step-${step}`}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="space-y-5"
              >
                {step === 1 ? (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Họ và tên</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input 
                          type="text" 
                          placeholder="Nguyễn Văn A" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Số điện thoại</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input 
                          type="tel" 
                          placeholder="090 123 4567" 
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Mật khẩu</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input 
                          type="password" 
                          placeholder="••••••••" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
                          required
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                      <p className="text-xs font-bold text-emerald-700 uppercase tracking-widest mb-1">Bước 2/2</p>
                      <h3 className="font-bold text-slate-900">Xác minh tài xế</h3>
                      <p className="text-xs text-slate-500">Vui lòng cung cấp thông tin phương tiện</p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Biển số xe</label>
                      <input 
                        type="text" 
                        placeholder="59-G1 123.45" 
                        value={licensePlate}
                        onChange={(e) => setLicensePlate(e.target.value)}
                        className="w-full bg-slate-50 border-none rounded-2xl py-4 px-4 focus:ring-2 focus:ring-emerald-500 transition-all font-bold text-lg uppercase"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Bằng lái xe</label>
                        <button 
                          type="button"
                          onClick={() => setLicenseImage('uploaded')}
                          className={`w-full aspect-video rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-all ${licenseImage ? 'bg-emerald-50 border-emerald-500 text-emerald-600' : 'bg-slate-50 border-slate-200 text-slate-400'}`}
                        >
                          <User size={24} />
                          <span className="text-[10px] font-bold uppercase">{licenseImage ? 'Đã tải lên' : 'Tải ảnh lên'}</span>
                        </button>
                      </div>
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Giấy tờ xe</label>
                        <button 
                          type="button"
                          onClick={() => setVehicleDocImage('uploaded')}
                          className={`w-full aspect-video rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-all ${vehicleDocImage ? 'bg-emerald-50 border-emerald-500 text-emerald-600' : 'bg-slate-50 border-slate-200 text-slate-400'}`}
                        >
                          <Phone size={24} />
                          <span className="text-[10px] font-bold uppercase">{vehicleDocImage ? 'Đã tải lên' : 'Tải ảnh lên'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-3 pt-4">
            {!isLogin && step === 2 && (
              <button 
                type="button"
                onClick={handleBack}
                className="flex-1 bg-slate-100 text-slate-600 font-bold py-4 rounded-2xl hover:bg-slate-200 transition-all"
              >
                Quay lại
              </button>
            )}
            <motion.button 
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="flex-[2] bg-emerald-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-100 flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all"
            >
              {isLogin ? 'Đăng nhập' : (step === 1 ? 'Tiếp tục' : 'Hoàn tất đăng ký')}
              <ArrowRight size={20} />
            </motion.button>
          </div>
        </form>

        {isLogin && (
          <div className="mt-10">
            <div className="relative flex items-center justify-center mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <span className="relative px-4 bg-white text-xs font-bold text-slate-400 uppercase tracking-widest">Hoặc tiếp tục với</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 py-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all font-bold text-slate-700">
                <Google size={20} className="text-red-500" />
                Google
              </button>
              <button className="flex items-center justify-center gap-3 py-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all font-bold text-slate-700">
                <Github size={20} />
                Github
              </button>
            </div>
          </div>
        )}
      </div>

      <p className="text-center text-sm text-slate-400 mt-8">
        Bằng cách tiếp tục, bạn đồng ý với <span className="text-slate-600 font-bold underline">Điều khoản</span> & <span className="text-slate-600 font-bold underline">Chính sách</span> của chúng tôi.
      </p>
    </div>
  );
}
