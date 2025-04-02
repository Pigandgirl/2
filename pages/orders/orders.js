Page({
  data: {
    orders: [
      {
        id: 1,
        orderNo: 'O202401010001',
        status: 'completed',
        statusText: '已完成',
        dishes: [
          { name: '红烧肉', quantity: 1 },
          { name: '清炒时蔬', quantity: 2 }
        ],
        createTime: '2024-01-01 12:30',
        totalPrice: '88.00'
      },
      {
        id: 2,
        orderNo: 'O202401010002',
        status: 'pending',
        statusText: '待处理',
        dishes: [
          { name: '麻婆豆腐', quantity: 1 },
          { name: '米饭', quantity: 2 }
        ],
        createTime: '2024-01-01 13:00',
        totalPrice: '36.00'
      }
    ]
  },

  onLoad: function() {
    // 这里可以调用获取订单列表的接口
  },

  onPullDownRefresh: function() {
    // 下拉刷新，重新获取订单列表
    wx.stopPullDownRefresh();
  }
})