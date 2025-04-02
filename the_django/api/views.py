from rest_framework import viewsets, status
from rest_framework.response import Response
from django.core.cache import cache
from .models import Order, OrderItem, Dish, WxUser
from .serializers import OrderSerializer, OrderCreateSerializer
import datetime
import random

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    
    def get_queryset(self):
        user = self.request.user
        # 尝试从Redis缓存获取订单
        cache_key = f"user_orders_{user.id}"
        cached_orders = cache.get(cache_key)
        
        if cached_orders is not None:
            return cached_orders
        
        # 缓存未命中，从数据库获取
        queryset = Order.objects.filter(user=user).order_by('-created_at')
        
        # 将结果存入Redis缓存，设置过期时间为10分钟
        cache.set(cache_key, queryset, 60 * 10)
        
        return queryset
    
    def get_serializer_class(self):
        if self.action == 'create':
            return OrderCreateSerializer
        return OrderSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # 获取当前用户
        user = request.user
        
        # 生成订单号
        now = datetime.datetime.now()
        order_no = f"O{now.strftime('%Y%m%d')}{random.randint(1000, 9999)}"
        
        # 创建订单
        order = Order.objects.create(
            user=user,
            order_no=order_no,
            status='pending',
            total_price=serializer.validated_data['total_price']
        )
        
        # 创建订单项
        items_data = serializer.validated_data['items']
        for item_data in items_data:
            dish = Dish.objects.get(id=item_data['dish_id'])
            OrderItem.objects.create(
                order=order,
                dish=dish,
                quantity=item_data['quantity'],
                price=dish.price
            )
        
        # 清除该用户的订单缓存，以便下次获取最新数据
        cache_key = f"user_orders_{user.id}"
        cache.delete(cache_key)
        
        # 返回创建的订单
        return Response(
            OrderSerializer(order).data,
            status=status.HTTP_201_CREATED
        )
