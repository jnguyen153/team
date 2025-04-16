from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

class AdminSubmission(models.Model):
    data = models.JSONField()
    submitted_at = models.DateTimeField(auto_now_add=True)

class StudentSchedule(models.Model):
    student_id = models.CharField(max_length=100)
    schedule = models.JSONField()
    submitted_at = models.DateTimeField(auto_now_add=True)

class EmployeeParameters(models.Model):
    student_id = models.CharField(max_length=100)
    min_hours = models.IntegerField(
        null=True,
        blank=True,
        default=5,
        validators=[MinValueValidator(0), MaxValueValidator(50)],
        help_text="Enter the 'minimum working hour' as an integer in range [0,50]. (Default: 5)"
    )
    max_hours = models.IntegerField(
        null=True,
        blank=True,
        default=20,
        validators=[MinValueValidator(0), MaxValueValidator(50)],
        help_text="Enter the 'maximum working hour' as an integer in range [0,50] (Default: 20)"
    )
    preferability = models.IntegerField(
        null=True,
        blank=True,
        default=1,
        validators=[MinValueValidator(0), MaxValueValidator(2)],
        help_text="Enter the 'preferability' as an integer in range [0,2]. (Default: 1)"
    )