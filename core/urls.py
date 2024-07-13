# file_processor/urls.py
from django.urls import path
from . import views
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('upload/', views.upload_file, name='upload_file'),
    path('process/<int:file_id>/', views.process_file, name='process_file'),
    path('match_and_replace/<int:file_id>/', views.match_and_replace, name='match_and_replace'),
    path('csrf_token/', csrf_exempt(views.get_csrf_token), name='get_csrf_token'),
]
