from django.urls import path

from .views import TableViewSet, OrderTableViewSet, TableItemView
from . import views

app_name = "tables"

tableorder_list = OrderTableViewSet.as_view({"get": "list", "post": "open"})
tableorder_detail = OrderTableViewSet.as_view(
    {
        "get": "retrieve",
        "patch": "partial_update",
        "delete": "destroy",
        "post": "close"
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

staff_table_list = TableItemView.as_view(
    {
        "get": "list",
        "post": "create"
    }
)
staff_table_detail = TableItemView.as_view(
    {
        "patch": "partial_update",
        "delete": "destroy"
    }
)

urlpatterns = [
    path("tableorder/<int:pk>/", tableorder_detail),
    path("tableorder/", tableorder_list),
    path("staff/<int:pk>/", staff_table_detail),
    path("staff/", staff_table_list),
    path("<int:pk>/", table_detail),
    path("", table_list),
]
