from django.urls import path

from . import views

app_name = "registration"

employee_list = views.EmployeeViewSet.as_view({"get": "list"})
employee_detail = views.EmployeeViewSet.as_view(
    {
        "get": "retrieve",
        "patch": "partial_update",
        "delete": "destroy",
    }
)

urlpatterns = [
    #path("login", views.login_view, name="login"),
    #path("direct-login", views.direct_login, name="direct_login"),
    #path("logout", views.logout_view, name="logout"),
    #path("signin", views.signin_view, name="signin"),
    #path("owner", views.owner_login_view, name="owner_login"),
    #path("password_reset", views.password_reset, name="password_reset"),
    #path('password_reset/<uidb64>/<token>', views.password_reset_confirm, name="password_reset_confirm"),
    #path("password_reset/confirm", views.password_reset_complete, name="password_reset_complete"),
    #path("password_reset/success", views.password_reset_success, name="password_reset_success"),
    #path("password_reset/error", views.password_reset_failed, name="password_reset_error"),
    path("me/", views.me, name="me"),
    path("new_employee/", views.register_employee),
    path("employees/", employee_list),
    path("employees/<int:pk>/", employee_detail),
    path("validate_username/", views.validate_username)
]
