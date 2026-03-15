import React from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Settings, 
  Shield, 
  CreditCard, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  Star,
  Award,
  Clock
} from 'lucide-react';

interface ProfileProps {
  onLogout: () => void;
}

export default function Profile({ onLogout }: ProfileProps) {
  const menuItems = [
    { icon: <User size={20} />, label: 'Thông tin cá nhân', sub: 'Cập nhật hồ sơ của bạn' },
    { icon: <Shield size={20} />, label: 'Xác minh tài xế', sub: 'Bằng lái, giấy tờ xe', status: 'Đã xác minh' },
    { icon: <CreditCard size={20} />, label: 'Phương thức thanh toán', sub: 'Liên kết ngân hàng, ví' },
    { icon: <Settings size={20} />, label: 'Cài đặt ứng dụng', sub: 'Thông báo, ngôn ngữ' },
    { icon: <HelpCircle size={20} />, label: 'Trung tâm hỗ trợ', sub: 'Câu hỏi thường gặp, liên hệ' },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-y-auto pb-20">
      {/* Profile Header */}
      <div className="bg-white px-6 pt-12 pb-8 rounded-b-[40px] shadow-sm border-b border-slate-100 mb-6">
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full border-4 border-emerald-50 shadow-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop" 
                alt="User" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute bottom-0 right-0 bg-emerald-500 text-white p-1.5 rounded-full border-2 border-white shadow-lg">
              <Award size={14} fill="currentColor" />
            </div>
          </div>
          
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Nguyễn Văn Nam</h2>
          <p className="text-sm font-bold text-slate-400 mb-6">Đối tác tài xế Bạch kim</p>

          <div className="grid grid-cols-3 gap-8 w-full">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-amber-500 font-black text-lg">
                <Star size={18} fill="currentColor" /> 4.9
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Đánh giá</span>
            </div>
            <div className="flex flex-col items-center border-x border-slate-100">
              <div className="text-slate-900 font-black text-lg">1.240</div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Chuyến đi</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-slate-900 font-black text-lg">2 năm</div>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Gắn bó</span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-6 space-y-3">
        {menuItems.map((item, idx) => (
          <motion.button
            key={idx}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors flex items-center justify-center">
                {item.icon}
              </div>
              <div className="text-left">
                <p className="font-bold text-slate-900 text-sm">{item.label}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{item.sub}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {item.status && (
                <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">
                  {item.status}
                </span>
              )}
              <ChevronRight size={18} className="text-slate-300" />
            </div>
          </motion.button>
        ))}

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onLogout}
          className="w-full bg-red-50 p-4 rounded-2xl border border-red-100 flex items-center justify-center gap-3 text-red-500 font-black text-sm mt-6 mb-10"
        >
          <LogOut size={20} />
          Đăng xuất tài khoản
        </motion.button>
      </div>
    </div>
  );
}
