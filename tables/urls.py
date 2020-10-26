from django.urls import path

from .views import TableViewSet, OrderTableViewSet
from . import views

app_name = "tables"

tableorder_list = OrderTableViewSet.as_view({"get": "list", "post": "create"})
tableorder_detail = OrderTableViewSet.as_view(
    {
        "get": "retrieve",
        "put": "update",
        "patch": "partial_update",
        "delete": "destroy",
    }
)

table_list = TableViewSet.as_view({"get": "list", "post": "create"})
table_detail = TableViewSet.as_view(
    {
        "get": "retrieve",
        "put": "update",
        "patch": "partial_update",
        "delete": "destroy",
    }
)

urlpatterns = [
    path("<int:pk>/", table_detail),
    path("", table_list),
    path("items/<int:owner>/<int:order_id>/", views.get_tableitems),
    path("new_items/", views.new_item),
    # path("", order_list),
]