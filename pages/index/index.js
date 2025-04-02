// index.js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    motto: 'Hello World',
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
    // 轮播图数据
    swiperList: [
      { id: 1, url: '/images/swiper/1.jpg' },
      { id: 2, url: '/images/swiper/2.jpg' },
      { id: 3, url: '/images/swiper/3.jpg' },
      { id: 4, url: '/images/swiper/4.jpg' }
    ],
    // 分类数据
    categories: [
      { id: 0, name: '热门推荐' },
      { id: 1, name: '精品炒菜' },
      { id: 2, name: '汤类' },
      { id: 3, name: '主食' },
      { id: 4, name: '特色小炒' }
    ],
    // 当前选中的分类
    currentCategory: 0,
    // 所有菜品数据
    allDishes: {
      // 热门推荐
      0: [
        {
          id: 1,
          name: '红烧肉',
          price: 68,
          description: '精选五花肉，红烧入味',
          image: '/images/dishes/hongshaorou.jpg',
          count: 0
        },
        {
          id: 2,
          name: '清炒时蔬',
          price: 18,
          description: '新鲜应季蔬菜',
          image: '/images/dishes/shishu.jpg',
          count: 0
        },
        {
          id: 3,
          name: '麻婆豆腐',
          price: 32,
          description: '川味十足，麻辣鲜香',
          image: '/images/dishes/mapodoufu.jpg',
          count: 0
        }
      ],
      // 精品炒菜
      1: [
        {
          id: 4,
          name: '红焖大虾',
          price: 88,
          description: '新鲜大虾，红焖入味',
          image: '/images/dishes/hongmendaxia.jpg',
          count: 0
        },
        {
          id: 5,
          name: '爆炒三文鱼',
          price: 76,
          description: '新鲜三文鱼，爆炒鲜香',
          image: '/images/dishes/sanwenyu.jpg',
          count: 0
        }
      ],
      // 汤类
      2: [
        {
          id: 6,
          name: '老母鸡炖汤',
          price: 48,
          description: '滋补养生，浓汤美味',
          image: '/images/dishes/jitang.jpg',
          count: 0
        },
        {
          id: 7,
          name: '冬阴功汤',
          price: 45,
          description: '泰式风味，酸辣可口',
          image: '/images/dishes/dongyingong.jpg',
          count: 0
        },
        {
          id: 8,
          name: '乌鸡滋补',
          price: 58,
          description: '乌鸡炖汤，滋补养生',
          image: '/images/dishes/wuji.jpg',
          count: 0
        }
      ],
      // 主食
      3: [
        {
          id: 9,
          name: '东北水饺',
          price: 28,
          description: '现包现煮，皮薄馅大',
          image: '/images/dishes/shuijiao.jpg',
          count: 0
        },
        {
          id: 10,
          name: '酸辣粉',
          price: 22,
          description: '重庆风味，酸辣爽口',
          image: '/images/dishes/suanlafen.jpg',
          count: 0
        },
        {
          id: 11,
          name: '螺蛳粉',
          price: 25,
          description: '柳州特色，味道正宗',
          image: '/images/dishes/luosifen.jpg',
          count: 0
        }
      ],
      // 特色小炒
      4: [
        {
          id: 12,
          name: '干炒牛河',
          price: 36,
          description: '粒粒分明，牛肉鲜嫩',
          image: '/images/dishes/ganchao.jpg',
          count: 0
        },
        {
          id: 13,
          name: '湿炒牛河',
          price: 36,
          description: '滑嫩可口，牛肉十足',
          image: '/images/dishes/shichao.jpg',
          count: 0
        },
        {
          id: 14,
          name: '芹菜牛肉',
          price: 42,
          description: '芹菜爽口，牛肉鲜美',
          image: '/images/dishes/qincai.jpg',
          count: 0
        },
        {
          id: 15,
          name: '酸菜牛肉',
          price: 45,
          description: '酸菜开胃，牛肉鲜嫩',
          image: '/images/dishes/suancai.jpg',
          count: 0
        }
      ]
    },
    // 当前显示的菜品
    dishes: [],
    // 购物车总数量
    totalCount: 0,
    // 购物车总价格
    totalPrice: 0,
    showCartPanel: false
  },
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    const { nickName } = this.data.userInfo
    this.setData({
      "userInfo.avatarUrl": avatarUrl,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
  },
  onInputChange(e) {
    const nickName = e.detail.value
    const { avatarUrl } = this.data.userInfo
    this.setData({
      "userInfo.nickName": nickName,
      hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
    })
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  // 切换分类
  switchCategory(e) {
    const index = parseInt(e.currentTarget.dataset.index);
    console.log('切换到分类：', index, typeof index);
    
    // 检查数据是否存在
    if (!this.data.allDishes) {
      console.error('allDishes不存在');
      return;
    }
    
    if (!this.data.allDishes[index]) {
      console.error('该分类数据不存在：', index);
      return;
    }
    
    console.log('该分类的菜品数量：', this.data.allDishes[index].length);
    
    // 更新当前分类和菜品数据
    this.setData({
      currentCategory: index
    });
    
    // 单独设置dishes，避免一次性更新过多数据
    setTimeout(() => {
      this.setData({
        dishes: this.data.allDishes[index]
      }, () => {
        console.log('当前分类：', this.data.currentCategory);
        console.log('当前菜品：', this.data.dishes);
      });
    }, 50);
  },
  // 添加菜品
  addCount(e) {
    const id = e.currentTarget.dataset.id;
    const allDishes = this.data.allDishes;
    const currentDishes = this.data.dishes;
    
    // 更新当前显示的菜品
    const dishes = currentDishes.map(dish => {
      if (dish.id === id) {
        return {
          ...dish,
          count: (dish.count || 0) + 1
        };
      }
      return dish;
    });

    // 更新所有菜品中的数量
    Object.keys(allDishes).forEach(categoryIndex => {
      allDishes[categoryIndex] = allDishes[categoryIndex].map(dish => {
        if (dish.id === id) {
          return {
            ...dish,
            count: (dish.count || 0) + 1
          };
        }
        return dish;
      });
    });

    this.setData({ 
      dishes,
      allDishes,
      showCartPanel: false
    });
    this.updateCart();
  },
  // 减少菜品
  minusCount(e) {
    const id = e.currentTarget.dataset.id;
    const allDishes = this.data.allDishes;
    const currentDishes = this.data.dishes;
    
    // 更新当前显示的菜品
    const dishes = currentDishes.map(dish => {
      if (dish.id === id && dish.count > 0) {
        return {
          ...dish,
          count: dish.count - 1
        };
      }
      return dish;
    });

    // 更新所有菜品中的数量
    Object.keys(allDishes).forEach(categoryIndex => {
      allDishes[categoryIndex] = allDishes[categoryIndex].map(dish => {
        if (dish.id === id && dish.count > 0) {
          return {
            ...dish,
            count: dish.count - 1
          };
        }
        return dish;
      });
    });

    this.setData({ 
      dishes,
      allDishes
    });
    this.updateCart();
  },
  // 切换购物车面板
  toggleCartPanel() {
    if (this.data.totalCount > 0) {
      this.setData({
        showCartPanel: !this.data.showCartPanel
      });
    } else {
      wx.showToast({
        title: '购物车是空的',
        icon: 'none'
      });
    }
  },
  // 隐藏购物车面板
  hideCartPanel() {
    this.setData({
      showCartPanel: false
    });
  },
  // 阻止事件冒泡
  stopPropagation() {
    return;
  },
  // 清空购物车
  clearCart() {
    const dishes = this.data.dishes.map(dish => ({
      ...dish,
      count: 0
    }));
    
    this.setData({
      dishes,
      totalCount: 0,
      totalPrice: '0.00',
      showCartPanel: false
    });

    wx.showToast({
      title: '购物车已清空',
      icon: 'success'
    });
  },
  // 去结算
  // 在index.js中添加下单逻辑
  
  // 去结算按钮点击事件
  goToCheckout: function() {
    if (this.data.totalCount <= 0) {
      wx.showToast({
        title: '请先选择商品',
        icon: 'none'
      });
      return;
    }
    
    // 准备订单数据
    let orderItems = [];
    let totalPrice = 0;
    
    this.data.categories.forEach((category, categoryIndex) => {
      this.data.allDishes[categoryIndex].forEach(dish => {
        if (dish.count > 0) {
          // 计算每个菜品的总价
          const itemPrice = parseFloat(dish.price) * dish.count;
          totalPrice += itemPrice;
          
          orderItems.push({
            dish_id: dish.id,
            dish_name: dish.name,
            quantity: dish.count,
            price: parseFloat(dish.price),
            total_item_price: itemPrice
          });
        }
      });
    });
    
    // 确保总价是数字并格式化为两位小数
    totalPrice = parseFloat(totalPrice.toFixed(2));
    
    // 构建订单请求数据
    const orderData = {
      items: orderItems,
      total_price: totalPrice
    };
    
    console.log('准备提交的订单数据:', orderData);
    
    // 发送创建订单请求
    wx.showLoading({
      title: '提交订单中',
    });
    
    // 使用模拟数据进行测试，避免后端API未就绪导致的问题
    const useMockData = true; // 设置为true使用模拟数据，后端API准备好后改为false
    
    if (useMockData) {
      // 模拟成功响应
      setTimeout(() => {
        // 先隐藏加载提示
        wx.hideLoading();
        
        // 生成模拟订单数据
        const mockOrder = {
          id: 'order_' + Date.now(),
          order_no: 'O' + Date.now(),
          status: 'pending',
          total_price: totalPrice,
          items: orderItems.map(item => ({
            dish_name: item.dish_name,
            quantity: item.quantity,
            price: item.price
          })),
          created_at: new Date().toISOString()
        };
        
        // 保存到本地存储
        const orders = wx.getStorageSync('orders') || [];
        orders.unshift(mockOrder);
        wx.setStorageSync('orders', orders);
        
        // 跳转到订单页面
        wx.switchTab({
          url: '/pages/orders/orders'
        });
      }, 1000);
    } else {
      // 原有的API请求代码
      wx.request({
        url: 'http://localhost:8000/api/orders/',
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${wx.getStorageSync('token')}` // 假设使用Token认证
        },
        data: orderData,
        success: (res) => {
          wx.hideLoading(); // 确保在success回调中调用hideLoading
          
          if (res.statusCode === 201) { // 创建成功
            // 清空购物车
            this.clearCart();
            
            wx.showToast({
              title: '下单成功',
              icon: 'success'
            });
            
            // 跳转到订单页面
            wx.switchTab({
              url: '/pages/orders/orders'
            });
          } else {
            wx.showToast({
              title: '下单失败: ' + (res.data.message || '未知错误'),
              icon: 'none'
            });
          }
        },
        fail: (err) => {
          wx.hideLoading(); // 确保在fail回调中调用hideLoading
          
          console.error('请求失败', err);
          wx.showToast({
            title: '网络错误',
            icon: 'none'
          });
        }
      });
    }
  },
  
  // 根据ID查找菜品
  findDishById: function(id) {
    for (let categoryIndex in this.data.allDishes) {
      const dish = this.data.allDishes[categoryIndex].find(d => d.id === id);
      if (dish) return dish;
    }
    return null;
  },
  // 更新购物车
  updateCart: function() { // 修改为标准的函数定义方式
    let totalCount = 0;
    let totalPrice = 0;

    // 遍历所有分类的菜品
    Object.values(this.data.allDishes).forEach(categoryDishes => {
      categoryDishes.forEach(dish => {
        if (dish.count) {
          totalCount += dish.count;
          totalPrice += dish.count * dish.price;
        }
      });
    });

    this.setData({
      totalCount,
      totalPrice: totalPrice.toFixed(2)
    });

    // 如果购物车为空，自动隐藏面板
    if (totalCount === 0) {
      this.setData({
        showCartPanel: false
      });
    }

    // 保存到本地存储
    wx.setStorageSync('cartData', {
      allDishes: this.data.allDishes,
      totalCount,
      totalPrice: totalPrice.toFixed(2)
    });
  },
  onLoad() {
    // 添加调试辅助函数
    console.log('==== 数据结构检查 ====');
    console.log('分类列表：', this.data.categories);
    console.log('所有菜品数据：', this.data.allDishes);
    if (this.data.allDishes) {
      Object.keys(this.data.allDishes).forEach(key => {
        console.log(`分类 ${key} 的菜品数量:`, this.data.allDishes[key].length);
      });
    }
    
    // 初始化显示热门推荐分类的菜品
    const initialDishes = this.data.allDishes[0] || [];
    console.log('初始化菜品数据：', initialDishes);
    
    this.setData({
      currentCategory: 0,
      dishes: initialDishes
    }, () => {
      console.log('初始化后的菜品列表：', this.data.dishes);
    });

    // 从本地存储恢复购物车数据（如果有）
    const cartData = wx.getStorageSync('cartData');
    if (cartData && cartData.allDishes) {
      console.log('恢复购物车数据');
      this.setData({
        allDishes: cartData.allDishes,
        dishes: cartData.allDishes[this.data.currentCategory] || [],
        totalCount: cartData.totalCount || 0,
        totalPrice: cartData.totalPrice || '0.00'
      }, () => {
        console.log('恢复后的菜品列表：', this.data.dishes);
      });
    }
  },
  // 保存购物车数据到本地存储
  onHide() {
    wx.setStorageSync('cartData', {
      allDishes: this.data.allDishes,
      totalCount: this.data.totalCount,
      totalPrice: this.data.totalPrice
    });
  }
})
