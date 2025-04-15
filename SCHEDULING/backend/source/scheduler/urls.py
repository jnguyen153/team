from django.urls import path
from . import views

urlpatterns = [
    path('admin-form/', views.admin_form_submission, name='admin_form'),
    path('submit-schedule/', views.submit_schedule, name='submit_schedule'),
    path('schedules/', views.get_schedules, name='get_schedules'),
]
