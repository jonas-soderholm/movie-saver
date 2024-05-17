from django.urls import path
from .views import CreateUserView, UserDetailView

urlpatterns = [
    path('signup/', CreateUserView.as_view(), name='signup'),
    path('me/', UserDetailView.as_view(), name='user-detail'),
]