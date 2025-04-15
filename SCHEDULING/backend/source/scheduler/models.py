from django.db import models

class AdminSubmission(models.Model):
    data = models.JSONField()
    submitted_at = models.DateTimeField(auto_now_add=True)

class StudentSchedule(models.Model):
    student_id = models.CharField(max_length=100)
    schedule = models.JSONField()
    submitted_at = models.DateTimeField(auto_now_add=True)
