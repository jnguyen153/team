from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import AdminSubmission, StudentSchedule, EmployeeParameters

def get_schedules(request):
    return JsonResponse({'schedules': []})

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

@csrf_exempt
def update_parameters(request):
    if request.method == "PUT":
        print(">>> View reached")
        print(">>> Method:", request.method)
        body = json.loads(request.body)
        params = body.get("parameters", {})
        EmployeeParameters.objects.create(
            student_id=params.get('student_id', ''),
            max_hours=params.get('max_hours', 20),
            min_hours=params.get('min_hours', 5),
            preferability=params.get('preferability', 1)
        )
        return JsonResponse({'status': 'parameters updated'})
    return JsonResponse({'error': 'Only PUT allowed'}, status=405)