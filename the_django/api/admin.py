from django.contrib import admin
from .models import WxUser, Category, Dish, Order, OrderItem

class DishAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'is_available', 'is_recommended')
    list_filter = ('category', 'is_available', 'is_recommended')
    search_fields = ('name', 'description')
    list_editable = ('price', 'is_available', 'is_recommended')

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'sort_order', 'is_active')
    list_editable = ('sort_order', 'is_active')

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0

class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_no', 'user', 'status', 'total_price', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('order_no', 'user__nickname')
    inlines = [OrderItemInline]

admin.site.register(WxUser)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Dish, DishAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderItem)
