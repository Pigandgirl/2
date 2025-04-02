from django.db import models

class WxUser(models.Model):
    """微信用户模型"""
    openid = models.CharField(max_length=100, unique=True, verbose_name="微信OpenID")
    nickname = models.CharField(max_length=100, blank=True, null=True, verbose_name="昵称")
    avatar = models.URLField(blank=True, null=True, verbose_name="头像URL")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="创建时间")
    
    class Meta:
        verbose_name = "微信用户"
        verbose_name_plural = verbose_name
        
    def __str__(self):
        return self.nickname or self.openid

class Category(models.Model):
    """菜品分类模型"""
    name = models.CharField(max_length=100, verbose_name="分类名称")
    sort_order = models.IntegerField(default=0, verbose_name="排序")
    is_active = models.BooleanField(default=True, verbose_name="是否启用")
    
    class Meta:
        verbose_name = "菜品分类"
        verbose_name_plural = verbose_name
        ordering = ['sort_order']
        
    def __str__(self):
        return self.name

class Dish(models.Model):
    """菜品模型"""
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='dishes', verbose_name="所属分类")
    name = models.CharField(max_length=100, verbose_name="菜品名称")
    description = models.TextField(blank=True, verbose_name="菜品描述")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="价格")
    image = models.URLField(verbose_name="图片URL")
    is_available = models.BooleanField(default=True, verbose_name="是否可用")
    is_recommended = models.BooleanField(default=False, verbose_name="是否推荐")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="创建时间")
    
    class Meta:
        verbose_name = "菜品"
        verbose_name_plural = verbose_name
        
    def __str__(self):
        return self.name

class Order(models.Model):
    """订单模型"""
    STATUS_CHOICES = (
        ('pending', '待处理'),
        ('completed', '已完成'),
        ('cancelled', '已取消'),
    )
    
    user = models.ForeignKey(WxUser, on_delete=models.CASCADE, related_name='orders', verbose_name="用户")
    order_no = models.CharField(max_length=100, unique=True, verbose_name="订单号")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending', verbose_name="订单状态")
    total_price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="总价")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="创建时间")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="更新时间")
    
    class Meta:
        verbose_name = "订单"
        verbose_name_plural = verbose_name
        ordering = ['-created_at']
        
    def __str__(self):
        return self.order_no

class OrderItem(models.Model):
    """订单项模型"""
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items', verbose_name="所属订单")
    dish = models.ForeignKey(Dish, on_delete=models.CASCADE, verbose_name="菜品")
    quantity = models.IntegerField(default=1, verbose_name="数量")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="单价")
    
    class Meta:
        verbose_name = "订单项"
        verbose_name_plural = verbose_name
        
    def __str__(self):
        return f"{self.dish.name} x {self.quantity}"
