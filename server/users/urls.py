from django.urls import path
from .views import CreateUserView, UserDetailView, add_movie, user_movies

urlpatterns = [
    path('signup/', CreateUserView.as_view(), name='signup'),
    path('me/', UserDetailView.as_view(), name='user-detail'),
    path('add_movie/', add_movie, name='add_movie'),
    path('movies/', user_movies, name='user-movies'),  
]