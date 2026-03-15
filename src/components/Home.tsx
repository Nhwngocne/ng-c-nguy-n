import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  DollarSign, 
  ChevronRight,
  Package,
  Utensils,
  ShoppingBag,
  Zap,
  ArrowUpDown
} from 'lucide-react';

interface Order {
  id: string;
  type: 'food' | 'package' | 'grocery';
  pickup: string;
  dropoff: string;
  distance: string;
  duration: string;
  earnings: string;
  store: string;
}

const availableOrders: Order[] = [
  {
    id: 'VN8829400',
    type: 'food',
    store: 'Phúc Long Coffee & Tea',
    pickup: '42 Trần Cao Vân, Quận 3',
    dropoff: '15 Lê Thánh Tôn, Quận 1',
    distance: '2.4 km',
    duration: '12 phút',
    earnings: '25.000đ'
  },
  {
    id: 'VN8829401',
    type: 'package',
    store: 'Giao hàng nhanh',
    pickup: '182 Lê Đại Hành, Quận 11',
    dropoff: '55 Nguyễn Huệ, Quận 1',
    distance: '5.8 km',
    duration: '22 phút',
    earnings: '42.000đ'
  },
  {
    id: 'VN8829402',
    type: 'grocery',
    store: 'WinMart+',
    pickup: '20 Cộng Hòa, Tân Bình',
    dropoff: '120 Hoàng Văn Thụ, Phú Nhuận',
    distance: '3.1 km',
    duration: '15 phút',
    earnings: '32.000đ'
  },
  {
    id: 'VN8829403',
    type: 'food',
    store: 'Bún Đậu Mắm Tôm A Chảnh',
    pickup: '175 Thành Thái, Quận 10',
    dropoff: '334 Tô Hiến Thành, Quận 10',
    distance: '1.2 km',
    duration: '8 phút',
    earnings: '18.000đ'
  }
];

interface HomeProps {
  onAcceptOrder: (orderId: string) => void;
}

type SortCriteria = 'earnings' | 'distance' | 'time';

export default function Home({ onAcceptOrder }: HomeProps) {
  const [sortBy, setSortBy] = useState<SortCriteria>('earnings');
  const [showSortMenu, setShowSortMenu] = useState(false);

  const sortedOrders = useMemo(() => {
    return [...availableOrders].sort((a, b) => {
      if (sortBy === 'earnings') {
        const valA = parseInt(a.earnings.replace(/\D/g, ''));
        const valB = parseInt(b.earnings.replace(/\D/g, ''));
        return valB - valA; // High to low
      }
      if (sortBy === 'distance') {
        const valA = parseFloat(a.distance.replace(/[^\d.]/g, ''));
        const valB = parseFloat(b.distance.replace(/[^\d.]/g, ''));
        return valA - valB; // Low to high
      }
      if (sortBy === 'time') {
        const valA = parseInt(a.duration.replace(/\D/g, ''));
        const valB = parseInt(b.duration.replace(/\D/g, ''));
        return valA - valB; // Low to high
      }
      return 0;
    });
  }, [sortBy]);

  const sortOptions = [
    { id: 'earnings', label: 'Thu nhập cao nhất', icon: <DollarSign size={14} /> },
    { id: 'distance', label: 'Khoảng cách gần nhất', icon: <Navigation size={14} /> },
    { id: 'time', label: 'Thời gian nhanh nhất', icon: <Clock size={14} /> },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-y-auto pb-24">
      {/* Status Banner */}
      <div className="bg-emerald-500 px-6 py-4 flex justify-between items-center text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Zap size={20} fill="currentColor" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Trạng thái</p>
            <p className="font-black">Đang trực tuyến</p>
          </div>
        </div>
        <button className="bg-white text-emerald-600 px-4 py-2 rounded-xl font-bold text-sm shadow-sm">
          Nghỉ ngơi
        </button>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-black text-slate-900">Đơn hàng mới</h2>
          <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold">
            {availableOrders.length} đơn gần bạn
          </span>
        </div>

        {/* Sorting Controls */}
        <div className="mb-6 relative">
          <button 
            onClick={() => setShowSortMenu(!showSortMenu)}
            className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-slate-100 shadow-sm text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all"
          >
            <ArrowUpDown size={14} />
            Sắp xếp theo: {sortOptions.find(o => o.id === sortBy)?.label}
          </button>

          <AnimatePresence>
            {showSortMenu && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute left-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50"
              >
                {sortOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setSortBy(option.id as SortCriteria);
                      setShowSortMenu(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-sm font-bold ${
                      sortBy === option.id ? 'bg-emerald-50 text-emerald-600' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {option.icon}
                    {option.label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-4">
          {sortedOrders.map((order) => (
            <motion.div
              key={order.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden"
            >
              <div className="p-5">
                {/* Order Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      order.type === 'food' ? 'bg-orange-50 text-orange-500' :
                      order.type === 'package' ? 'bg-blue-50 text-blue-500' :
                      'bg-emerald-50 text-emerald-500'
                    }`}>
                      {order.type === 'food' ? <Utensils size={20} /> :
                       order.type === 'package' ? <Package size={20} /> :
                       <ShoppingBag size={20} />}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{order.store}</h3>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">#{order.id}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-emerald-500">{order.earnings}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Thu nhập</p>
                  </div>
                </div>

                {/* Route Info */}
                <div className="space-y-3 mb-5 relative">
                  <div className="absolute left-[11px] top-4 bottom-4 w-0.5 bg-slate-100"></div>
                  
                  <div className="flex items-start gap-3 relative">
                    <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 z-10">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    </div>
                    <p className="text-xs font-medium text-slate-600 pt-0.5">{order.pickup}</p>
                  </div>

                  <div className="flex items-start gap-3 relative">
                    <div className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center shrink-0 z-10">
                      <MapPin size={12} className="text-white" fill="currentColor" />
                    </div>
                    <p className="text-xs font-medium text-slate-600 pt-0.5">{order.dropoff}</p>
                  </div>
                </div>

                {/* Order Stats */}
                <div className="flex gap-4 mb-5">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Navigation size={14} />
                    <span className="text-xs font-bold">{order.distance}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Clock size={14} />
                    <span className="text-xs font-bold">{order.duration}</span>
                  </div>
                </div>

                {/* Action Button */}
                <button 
                  onClick={() => onAcceptOrder(order.id)}
                  className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
                >
                  Nhận đơn ngay
                  <ChevronRight size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
