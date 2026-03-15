/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  HelpCircle, 
  Plus, 
  Minus, 
  Navigation, 
  Bike, 
  Home, 
  Truck, 
  Star, 
  MessageSquare, 
  Phone, 
  LayoutGrid, 
  History, 
  Wallet, 
  Bell, 
  User,
  LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Auth from './components/Auth';
import Income from './components/Income';
import Notifications from './components/Notifications';
import Profile from './components/Profile';
import HomeView from './components/Home';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  if (!isLoggedIn) {
    return <Auth onLogin={() => setIsLoggedIn(true)} />;
  }

  const handleAcceptOrder = (orderId: string) => {
    // When an order is accepted, switch to the activity (map) view
    setActiveTab('activity');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView onAcceptOrder={handleAcceptOrder} />;
      case 'income':
        return <Income />;
      case 'notifications':
        return <Notifications />;
      case 'profile':
        return <Profile onLogout={() => setIsLoggedIn(false)} />;
      case 'activity':
      default:
        return (
          <main className="relative flex-1 bg-slate-200 overflow-hidden">
            {/* Mock Map Background */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuD9J2b_5l4uE5CpkIapSGK6lvqCM2wcKgpX-laATFrK9N08HEMDA85t4YMgOMecKAAGjc6Ob8rSLBYQcc2cUinVLZbrFTPlnN9tHEYDaCOw3xbjuLDqnwkE5RjlMBG9xL3igF8n1cVCxCOVnSoAPXTMhm_iA4VF-c0-0i_7NxPYlW0wxfREb7CFuzAi1LAxgR7tzVVpbDvLVMkki73rC90D7irJZWNqyBaJTRg1PcG0CSjgjR4yG_PYAJqEidQyCujdn2eS1IAGb-bB')`,
                filter: 'brightness(0.95) contrast(1.05)'
              }}
            />

            {/* Map Overlay Controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
              <div className="flex flex-col bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
                <button className="p-3 hover:bg-slate-50 border-b border-slate-100 transition-colors">
                  <Plus size={20} className="text-slate-600" />
                </button>
                <button className="p-3 hover:bg-slate-50 transition-colors">
                  <Minus size={20} className="text-slate-600" />
                </button>
              </div>
              <button className="p-3 bg-white rounded-xl shadow-lg border border-slate-100 text-emerald-500 hover:bg-slate-50 transition-colors">
                <Navigation size={20} fill="currentColor" />
              </button>
            </div>

            {/* Markers */}
            {/* Shipper Marker */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center"
              >
                <div className="relative">
                  <div className="bg-emerald-500 p-2.5 rounded-full shadow-xl ring-4 ring-white text-white">
                    <Bike size={24} fill="currentColor" />
                  </div>
                  <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-white px-2 py-0.5 rounded shadow-sm border border-slate-100 whitespace-nowrap">
                    <p className="text-[10px] font-bold text-slate-800">Đang đến</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Destination Marker */}
            <div className="absolute top-1/3 left-1/4 z-10">
              <div className="bg-slate-900 p-2.5 rounded-full shadow-xl ring-4 ring-white text-white">
                <Home size={24} fill="currentColor" />
              </div>
            </div>

            {/* Bottom Status Card */}
            <div className="absolute bottom-4 left-4 right-4 z-20">
              <motion.div 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                className="bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
              >
                {/* Status Header */}
                <div className="p-4 bg-emerald-50/50 border-b border-emerald-100">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Trạng thái hiện tại</span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">Đang giao hàng</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 flex items-center justify-center bg-emerald-500 rounded-2xl text-white shadow-lg shadow-emerald-200">
                      <Truck size={24} fill="currentColor" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 leading-tight">Tài xế đang đến vị trí của bạn</h3>
                      <p className="text-sm text-slate-500">Dự kiến giao: 10:45 AM (8 phút nữa)</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-5 h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '75%' }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-emerald-500 rounded-full"
                    />
                  </div>
                </div>

                {/* Driver Info */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-slate-100 border-2 border-white shadow-sm overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1288&auto=format&fit=crop" 
                        alt="Driver" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">Nguyễn Văn Nam</p>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                          <Star size={12} fill="currentColor" /> 4.9
                        </span>
                        <span className="text-slate-300">•</span>
                        <span>Xe máy: 59-G1 123.45</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-emerald-100 hover:text-emerald-600 transition-all">
                      <MessageSquare size={20} />
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-200 hover:bg-emerald-600 transition-all">
                      <Phone size={20} fill="currentColor" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </main>
        );
    }
  };

  const getHeaderTitle = () => {
    switch (activeTab) {
      case 'home': return 'Trang chủ';
      case 'income': return 'Thu nhập';
      case 'notifications': return 'Thông báo';
      case 'profile': return 'Cá nhân';
      case 'activity': return 'Hoạt động';
      default: return 'GiaoHang';
    }
  };

  const getHeaderSubtitle = () => {
    switch (activeTab) {
      case 'home': return 'Đơn hàng mới gần bạn';
      case 'income': return 'Thống kê tài chính';
      case 'notifications': return 'Cập nhật mới nhất';
      case 'profile': return 'Hồ sơ tài xế';
      case 'activity': return 'Theo dõi đơn hàng';
      default: return 'Hệ thống giao hàng';
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-slate-50 font-sans overflow-hidden text-slate-900">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-100 z-30">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setActiveTab('home')}
            className={`p-2 hover:bg-slate-100 rounded-full transition-colors ${activeTab === 'home' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-lg font-bold leading-tight">{getHeaderTitle()}</h1>
            <p className="text-xs text-slate-500">{getHeaderSubtitle()}</p>
          </div>
        </div>
        <div className="relative">
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white shadow-sm overflow-hidden"
          >
            <img 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1000&auto=format&fit=crop" 
              alt="User" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </button>
          
          <AnimatePresence>
            {showProfileMenu && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50"
              >
                <button 
                  onClick={() => setIsLoggedIn(false)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors font-bold text-sm"
                >
                  <LogOut size={18} />
                  Đăng xuất
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {renderContent()}

      {/* Bottom Navigation */}
      <nav className="flex items-center justify-around px-2 py-3 bg-white border-t border-slate-100 pb-8">
        <NavItem 
          icon={<LayoutGrid size={22} />} 
          label="Trang chủ" 
          active={activeTab === 'home'} 
          onClick={() => setActiveTab('home')}
        />
        <NavItem 
          icon={<History size={22} />} 
          label="Hoạt động" 
          active={activeTab === 'activity'} 
          onClick={() => setActiveTab('activity')}
        />
        <NavItem 
          icon={<Wallet size={22} />} 
          label="Thu nhập" 
          active={activeTab === 'income'} 
          onClick={() => setActiveTab('income')}
        />
        <NavItem 
          icon={<Bell size={22} />} 
          label="Thông báo" 
          active={activeTab === 'notifications'} 
          onClick={() => setActiveTab('notifications')}
        />
        <NavItem 
          icon={<User size={22} />} 
          label="Cá nhân" 
          active={activeTab === 'profile'} 
          onClick={() => setActiveTab('profile')}
        />
      </nav>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all ${
        active ? 'text-emerald-500' : 'text-slate-400'
      }`}
    >
      <div className={`${active ? 'scale-110' : 'scale-100'} transition-transform`}>
        {icon}
      </div>
      <span className="text-[10px] font-bold tracking-tight">{label}</span>
    </button>
  );
}
