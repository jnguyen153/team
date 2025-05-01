from django.urls import path
from . import views

urlpatterns = [
    path('admin-form/', views.admin_form_submission, name='admin_form'),
    path('submit-schedule/', views.submit_schedule, name='submit_schedule'),
    path('update-parameters/', views.update_parameters, name='update_parameters'),
    path('schedules/', views.get_schedules, name='get_schedules'),
<<<<<<< Updated upstream
    path('parameters/', views.update_parameters, name='update_parameters'),
=======
    path('generate-schedule/', views.generate_schedule, name='generate_schedule'),
    path('save-schedule/', views.save_schedule, name='save_schedule'),
>>>>>>> Stashed changes
]
