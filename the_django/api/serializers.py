from rest_framework import serializers
from .models import Order, OrderItem, Dish

class OrderItemSerializer(serializers.ModelSerializer):
    dish_name = serializers.CharField(source='dish.name', read_only=True)
    
    class Meta:
        model = OrderItem
        fields = ['id', 'dish', 'dish_name', 'quantity', 'price']
        read_only_fields = ['dish_name']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    
    class Meta:
        model = Order
        fields = ['id', 'order_no', 'status', 'total_price', 'created_at', 'updated_at', 'items']
        read_only_fields = ['order_no', 'created_at', 'updated_at']

class OrderItemCreateSerializer(serializers.Serializer):
    dish_id = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value=1)

class OrderCreateSerializer(serializers.Serializer):
    items = OrderItemCreateSerializer(many=True)
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2)