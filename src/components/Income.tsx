import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Wallet, 
  Calendar, 
  ChevronRight,
  Filter,
  Download,
  Search,
  X
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'Th 2', total: 450000 },
  { name: 'Th 3', total: 520000 },
  { name: 'Th 4', total: 380000 },
  { name: 'Th 5', total: 610000 },
  { name: 'Th 6', total: 580000 },
  { name: 'Th 7', total: 750000 },
  { name: 'CN', total: 420000 },
];

const transactions = [
  { id: 1, title: 'Đơn hàng #VN8829310', amount: 45000, time: 'Hôm nay, 10:45', type: 'income' },
  { id: 2, title: 'Đơn hàng #VN8829305', amount: 32000, time: 'Hôm nay, 09:15', type: 'income' },
  { id: 3, title: 'Rút tiền về ngân hàng', amount: -500000, time: 'Hôm qua, 18:30', type: 'withdraw' },
  { id: 4, title: 'Đơn hàng #VN8829290', amount: 55000, time: 'Hôm qua, 16:20', type: 'income' },
  { id: 5, title: 'Thưởng hoàn thành ngày', amount: 100000, time: 'Hôm qua, 22:00', type: 'bonus' },
];

export default function Income() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredTransactions = useMemo(() => {
    return transactions.filter(tx => {
      const matchesSearch = tx.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           tx.time.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === 'all' || tx.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [searchQuery, filterType]);

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-y-auto pb-20">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-8 rounded-b-[40px] shadow-sm border-b border-slate-100">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Tổng thu nhập tuần này</p>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">3.710.000đ</h2>
          </div>
          <button className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl hover:bg-emerald-100 transition-colors">
            <TrendingUp size={24} />
          </button>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 bg-emerald-500 text-white py-4 rounded-2xl font-bold shadow-lg shadow-emerald-100 flex items-center justify-center gap-2">
            <ArrowDownLeft size={20} />
            Rút tiền
          </button>
          <button className="flex-1 bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-lg shadow-slate-200 flex items-center justify-center gap-2">
            <Wallet size={20} />
            Ví tiền
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 px-6 -mt-4 mb-8">
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100"
        >
          <p className="text-xs font-bold text-slate-400 uppercase mb-2">Đơn hàng</p>
          <p className="text-xl font-black text-slate-900">84</p>
          <span className="text-[10px] font-bold text-emerald-500">+12% so với tuần trước</span>
        </motion.div>
        <motion.div 
          whileHover={{ y: -5 }}
          className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100"
        >
          <p className="text-xs font-bold text-slate-400 uppercase mb-2">Đánh giá</p>
          <p className="text-xl font-black text-slate-900">4.95</p>
          <span className="text-[10px] font-bold text-emerald-500">Rất tốt</span>
        </motion.div>
      </div>

      {/* Chart Section */}
      <div className="px-6 mb-8">
        <div className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-900">Biểu đồ thu nhập</h3>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 bg-slate-50 px-3 py-2 rounded-xl">
              <Calendar size={14} />
              Tuần này
            </div>
          </div>
          
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }}
                  dy={10}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontWeight: 700, color: '#10b981' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="total" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorTotal)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="px-6 mb-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-slate-900">Lịch sử giao dịch</h3>
          <div className="flex gap-2">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 rounded-xl border transition-all ${showFilters ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white border-slate-100 text-slate-400'}`}
            >
              <Filter size={18} />
            </button>
            <button className="p-2 bg-white rounded-xl border border-slate-100 text-slate-400">
              <Download size={18} />
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="Tìm kiếm giao dịch, ngày..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-100 rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-sm shadow-sm"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap gap-2 pb-2">
                  {['all', 'income', 'withdraw', 'bonus'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setFilterType(type)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        filterType === type 
                          ? 'bg-emerald-500 text-white shadow-md shadow-emerald-100' 
                          : 'bg-white text-slate-500 border border-slate-100 hover:bg-slate-50'
                      }`}
                    >
                      {type === 'all' ? 'Tất cả' : 
                       type === 'income' ? 'Thu nhập' : 
                       type === 'withdraw' ? 'Rút tiền' : 'Thưởng'}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-3">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((tx) => (
              <motion.div 
                key={tx.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    tx.type === 'withdraw' ? 'bg-red-50 text-red-500' : 
                    tx.type === 'bonus' ? 'bg-amber-50 text-amber-500' :
                    'bg-emerald-50 text-emerald-600'
                  }`}>
                    {tx.type === 'withdraw' ? <ArrowUpRight size={20} /> : <ArrowDownLeft size={20} />}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{tx.title}</p>
                    <p className="text-xs text-slate-400 font-medium">{tx.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-black ${
                    tx.type === 'withdraw' ? 'text-red-500' : 'text-emerald-500'
                  }`}>
                    {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()}đ
                  </p>
                  <ChevronRight size={16} className="text-slate-300 ml-auto mt-1" />
                </div>
              </motion.div>
            ))
          ) : (
            <div className="py-12 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <Search size={24} />
              </div>
              <p className="text-slate-500 font-bold">Không tìm thấy giao dịch nào</p>
              <p className="text-xs text-slate-400 mt-1">Thử thay đổi từ khóa hoặc bộ lọc</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
