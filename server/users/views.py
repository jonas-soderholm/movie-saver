from rest_framework import generics, permissions
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import Movie, UserMovie
from .serializers import MovieSerializer, UserMovieSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.decorators import api_view
User = get_user_model()
from django.db import IntegrityError


class CreateUserView(generics.CreateAPIView):
    model = User
    permission_classes = [AllowAny]
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserDetailView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
    


@api_view(['POST'])
def add_movie(request):
    if request.method == 'POST':
        user = request.user
        data = request.data
        try:
            # Check if a movie with the same title already exists
            if Movie.objects.filter(title=data['title']).exists():
                return Response({'error': 'A movie with this title already exists'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Create the new movie
            movie = Movie.objects.create(
                title=data['title'],
                description=data['description'],
                cover_image=data['cover_image'],
                release_date=data['release_date'],
                price=data.get('price', 'N/A')
            )
            
            # Associate the movie with the user
            user_movie = UserMovie.objects.create(user=user, movie=movie)
            
            # Serialize the movie and return the response
            serializer = MovieSerializer(movie)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['GET'])
def user_movies(request):
    user = request.user
    user_movies = Movie.objects.filter(usermovie__user=user)
    serializer = MovieSerializer(user_movies, many=True)
    return Response(serializer.data)



@api_view(['DELETE'])
def remove_movie(request, movie_id):
    try:
        user_movie = UserMovie.objects.get(user=request.user, movie__id=movie_id)
        movie = user_movie.movie
        user_movie.delete()
        
        # Check if there are any other UserMovie entries for this movie
        if not UserMovie.objects.filter(movie=movie).exists():
            movie.delete()
        
        return Response({'message': 'Movie removed from list'}, status=status.HTTP_204_NO_CONTENT)
    except UserMovie.DoesNotExist:
        return Response({'error': 'Movie not found in user list'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
