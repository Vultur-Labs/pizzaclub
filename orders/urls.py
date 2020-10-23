from django.urls import path

from .views import OrderViewSet, OrderWhatsAppViewSet, ProductViewSet

from . import views

app_name = "orders"

order_list = OrderViewSet.as_view({"get": "list", "post": "create"})
order_detail = OrderViewSet.as_view(
    {
        "get": "retrieve",
        "put": "update",
        "patch": "partial_update",
        "delete": "destroy",
    }
)

order_whatsapp = OrderWhatsAppViewSet.as_view(
    {
        "post": "create",
    }
)

product_list = ProductViewSet.as_view({"get": "list", "post": "create"})
product_detail = ProductViewSet.as_view(
    {
        "get": "retrieve",
        "put": "update",
        "patch": "partial_update",
        "delete": "destroy",
    }
)

urlpatterns = [
    path("products/", product_list),
    path("products/<int:pk>/", product_detail),
    path("types/", views.get_types),
    path("owner/", views.get_owner),
    path("<int:pk>/", order_detail),
    path("whatsapp/", order_whatsapp),
    path("", order_list),
]