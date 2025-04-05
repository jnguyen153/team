from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import AdminSubmission, StudentSchedule

@csrf_exempt
def admin_form_submission(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        AdminSubmission.objects.create(data=body)
        return JsonResponse({'status': 'admin form received'})
    return JsonResponse({'error': 'Only POST allowed'}, status=405)

@csrf_exempt
def submit_schedule(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        StudentSchedule.objects.create(
            student_id=body.get('student_id', ''),
            schedule=body.get('schedule', {})
        )
        return JsonResponse({'status': 'schedule received'})
    return JsonResponse({'error': 'Only POST allowed'}, status=405)

def get_schedules(request):
    return JsonResponse({'schedules': []})