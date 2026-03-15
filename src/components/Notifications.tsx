import React from 'react';
import { motion } from 'motion/react';
import { 
  Bell, 
  Package, 
  Tag, 
  Info, 
  ChevronRight, 
  Circle,
  CheckCircle2
} from 'lucide-react';

const notifications = [
  {
    id: 1,
    title: 'Đơn hàng đã hoàn thành',
    description: 'Bạn đã hoàn thành đơn hàng #VN8829310. Thu nhập 45.000đ đã được cộng vào ví.',
    time: '2 phút trước',
    type: 'order',
    unread: true
  },
  {
    id: 2,
    title: 'Khuyến mãi mới cho tài xế',
    description: 'Hoàn thành 10 đơn hàng trong ngày để nhận thêm 100.000đ tiền thưởng.',
    time: '1 giờ trước',
    type: 'promo',
    unread: true
  },
  {
    id: 3,
    title: 'Cập nhật chính sách',
    description: 'Chúng tôi vừa cập nhật điều khoản dịch vụ cho đối tác tài xế. Vui lòng xem chi tiết.',
    time: '5 giờ trước',
    type: 'info',
    unread: false
  },
  {
    id: 4,
    title: 'Đánh giá 5 sao',
    description: 'Khách hàng vừa đánh giá bạn 5 sao cho đơn hàng #VN8829285.',
    time: 'Hôm qua',
    type: 'order',
    unread: false
  }
];

export default function Notifications() {
  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-y-auto pb-20">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black text-slate-900">Thông báo</h2>
          <button className="text-sm font-bold text-emerald-600">Đánh dấu đã đọc</button>
        </div>

        <div className="space-y-4">
          {notifications.map((notif) => (
            <motion.div
              key={notif.id}
              whileTap={{ scale: 0.98 }}
              className={`p-4 rounded-2xl border transition-all flex gap-4 ${
                notif.unread 
                  ? 'bg-white border-emerald-100 shadow-md shadow-emerald-50' 
                  : 'bg-slate-50 border-slate-100'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                notif.type === 'order' ? 'bg-emerald-100 text-emerald-600' :
                notif.type === 'promo' ? 'bg-amber-100 text-amber-600' :
                'bg-blue-100 text-blue-600'
              }`}>
                {notif.type === 'order' ? <Package size={22} /> :
                 notif.type === 'promo' ? <Tag size={22} /> :
                 <Info size={22} />}
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`text-sm font-bold ${notif.unread ? 'text-slate-900' : 'text-slate-600'}`}>
                    {notif.title}
                  </h3>
                  {notif.unread && <Circle size={8} fill="#10b981" className="text-emerald-500 mt-1" />}
                </div>
                <p className="text-xs text-slate-500 leading-relaxed mb-2">
                  {notif.description}
                </p>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {notif.time}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">
            Xem các thông báo cũ hơn
          </button>
        </div>
      </div>
    </div>
  );
}
