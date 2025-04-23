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
        return JsonResponse({'status': 'admin form received'}, status = 201)
    return JsonResponse({'error': 'Only POST allowed'}, status=405)

@csrf_exempt
def submit_schedule(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        student_id = body.get('student_id', '')
        schedule=body.get('schedule', {})
        # Create the schedule
        StudentSchedule.objects.create(
            student_id=student_id,
            schedule=schedule
        )
        # check if parameters already exist for given student_id
        if (EmployeeParameters.objects.filter(student_id=student_id).exists()) == False:
            # create default parameters if they don't exist
            EmployeeParameters.objects.create(
                student_id=student_id,
                max_hours=20,  # default max hours = 20
                min_hours=5,   # default min hours = 5
                preferability=1  # default preferability = 1
            )
        
        return JsonResponse({'status': 'schedule received'}, status = 201)
    return JsonResponse({'error': 'Only POST allowed'}, status=405)

@csrf_exempt
def update_parameters(request):
    if request.method == 'PUT':
        body = json.loads(request.body)
        params = body.get('parameters', {})
        student_id=params.get('student_id', '')

        if (student_id == ''):
            return JsonResponse({'error': 'student_id is required'}, status=400)
        

        try:
            # get the existing parameters
            exisitng_params = EmployeeParameters.objects.get(student_id=student_id)
            # update fields if provided in JSON 
            if 'min' in params:
                exisitng_params.min_hours = params.get('min')
            if 'max' in params:
                exisitng_params.max_hours = params.get('max')
            if 'preferability' in params:
                exisitng_params.preferability = params.get('preferability')
            exisitng_params.save()
            return JsonResponse({'status': 'Parameters updated'}, status=204)

        except EmployeeParameters.DoesNotExist:
            return JsonResponse({'error': 'student_id not found'}, status=404)
    return JsonResponse({'error': 'Only PUT allowed'}, status=405)