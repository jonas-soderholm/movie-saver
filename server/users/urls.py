from django.urls import path
from .views import CreateUserView, UserDetailView, add_movie

urlpatterns = [
    path('signup/', CreateUserView.as_view(), name='signup'),
    path('me/', UserDetailView.as_view(), name='user-detail'),
    path('add_movie/', add_movie, name='add_movie'),  # Using the add_movie function directly
]