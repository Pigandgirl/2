// logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    currentDate: '',
    currentTime: '',
    logContent: ''
  },

  onLoad() {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return {
          date: util.formatTime(new Date(log)),
          timeStamp: log
        }
      })
    })
    this.updateCurrentTime()
  },

  onShow() {
    this.updateCurrentTime()
  },

  updateCurrentTime() {
    const now = new Date()
    this.setData({
      currentDate: util.formatTime(now),
      currentTime: now.toLocaleTimeString()
    })
  },

  // 添加新日志
  addLog() {
    if (!this.data.logContent.trim()) {
      wx.showToast({
        title: '请输入日志内容',
        icon: 'none'
      })
      return
    }

    const newLog = {
      content: this.data.logContent,
      date: this.data.currentDate,
      time: this.data.currentTime
    }

    const logs = [newLog, ...this.data.logs]
    this.setData({
      logs,
      logContent: ''
    })

    // 保存到本地存储
    wx.setStorageSync('logs', logs.map(log => new Date(log.date).getTime()))

    wx.showToast({
      title: '添加成功',
      icon: 'success'
    })
  },

  // 输入日志内容
  onInput(e) {
    this.setData({
      logContent: e.detail.value
    })
  },

  // 删除日志
  deleteLog(e) {
    const index = e.currentTarget.dataset.index
    const logs = this.data.logs.filter((_, i) => i !== index)
    
    this.setData({ logs })
    wx.setStorageSync('logs', logs.map(log => new Date(log.date).getTime()))

    wx.showToast({
      title: '删除成功',
      icon: 'success'
    })
  }
})
