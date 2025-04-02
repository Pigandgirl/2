const app = getApp();

Page({
  data: {
    orders: [],
    loading: true
  },

  onLoad: function() {
    this.loadOrders();
  },
  
  onShow: function() {
    // 每次显示页面时重新加载订单数据
    this.loadOrders();
  },
  
  // 加载订单数据
  loadOrders: function() {
    this.setData({ loading: true });
    
    // 使用本地存储的模拟数据
    try {
      const orders = wx.getStorageSync('orders') || [];
      console.log('获取到的订单数据:', orders);
      
      // 处理订单状态显示和确保价格格式正确
      const processedOrders = orders.map(order => {
        // 确保价格是数字并格式化为两位小数
        let totalPrice = order.total_price;
        if (typeof totalPrice === 'string') {
          totalPrice = parseFloat(totalPrice) || 0;
        }
        
        return {
          ...order,
          statusText: this.getStatusText(order.status),
          total_price: totalPrice.toFixed(2)
        };
      });
      
      this.setData({
        orders: processedOrders,
        loading: false
      });
    } catch (e) {
      console.error('获取订单数据失败', e);
      wx.showToast({
        title: '获取订单失败',
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
  },
  
  // 查看订单详情
  viewOrderDetail: function(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/orderDetail/orderDetail?id=' + id
    });
  },
  
  // 下拉刷新
  onPullDownRefresh: function() {
    this.loadOrders();
    wx.stopPullDownRefresh();
  }
});