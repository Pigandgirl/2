Page({
  data: {
    order: null,
    loading: true
  },

  onLoad: function(options) {
    const id = options.id;
    this.loadOrderDetail(id);
  },
  
  // 加载订单详情
  loadOrderDetail: function(id) {
    this.setData({ loading: true });
    
    try {
      // 从本地存储获取订单列表
      const orders = wx.getStorageSync('orders') || [];
      console.log('所有订单:', orders);
      
      // 查找指定ID的订单
      const order = orders.find(o => o.id === id);
      console.log('当前订单ID:', id);
      console.log('找到的订单:', order);
      
      if (order) {
        // 处理订单状态显示
        order.statusText = this.getStatusText(order.status);
        
        // 确保订单数据结构完整
        if (!order.items) {
          order.items = [];
        }
        
        // 格式化时间
        if (order.created_at) {
          const date = new Date(order.created_at);
          order.created_at = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
        }
        
        this.setData({
          order: order,
          loading: false
        });
      } else {
        wx.showToast({
          title: '订单不存在',
          icon: 'none'
        });
        this.setData({ loading: false });
        
        // 返回上一页
        setTimeout(() => {
          wx.navigateBack();
        }, 1500);
      }
    } catch (e) {
      console.error('获取订单详情失败', e);
      wx.showToast({
        title: '获取订单详情失败',
        icon: 'none'
      });
      this.setData({ loading: false });
    }
  },
  
  // 获取状态文本
  getStatusText: function(status) {
    const statusMap = {
      'pending': '待处理',
      'processing': '处理中',
      'completed': '已完成',
      'cancelled': '已取消'
    };
    return statusMap[status] || '未知状态';
  }
});