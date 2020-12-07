from django.urls import path

from .views import OrderViewSet, OrderWhatsAppViewSet, ProductViewSet, TypesViewSet, SubTypesViewSet
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

types_list = TypesViewSet.as_view({"get": "list", "post": "create"})
types_detail = TypesViewSet.as_view(
    {
        "get": "retrieve",
        "put": "update",
        "patch": "partial_update",
        "delete": "destroy",
    }
)

subtypes_list = SubTypesViewSet.as_view({"get": "list", "post": "create"})
subtypes_detail = SubTypesViewSet.as_view(
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
    # path("types/", views.get_types),
    path("types/<int:pk>/", types_detail),
    path("types/", types_list),
    path("subtypes/<int:pk>/", subtypes_detail),
    path("subtypes/", subtypes_list),
    path("owner/", views.get_owner),
    path("whatsapp/", order_whatsapp),
    path("<int:pk>/", order_detail),
    path("", order_list),
]
