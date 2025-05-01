from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
<<<<<<< Updated upstream
from .models import AdminSubmission, StudentSchedule, EmployeeParameters
=======
from .models import AdminSubmission, Employee, SavedSchedules
>>>>>>> Stashed changes

def get_schedules(request):
    return JsonResponse({'schedules': []})

@csrf_exempt
def admin_form_submission(request):
    if request.method == 'POST':
        body = json.loads(request.body)
<<<<<<< Updated upstream
        AdminSubmission.objects.create(data=body)
        return JsonResponse({'status': 'admin form received'}, status = 201)
=======
        AdminSubmission.objects.create(data=body)   
        return JsonResponse({'status': 'admin form received'})
>>>>>>> Stashed changes
    return JsonResponse({'error': 'Only POST allowed'}, status=405)

@csrf_exempt
def submit_schedule(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        student_id = body.get('student_id', '')
<<<<<<< Updated upstream
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
=======
        schedule_update = body.get('schedule', {})
        if (student_id == ''):
            return JsonResponse({'error': 'student_id is required'}, status=400)  
        if (schedule_update == {}):
            return JsonResponse('error': 'non-empty scheule is required', status=400)
        try: 
            existing_employee = Employee.object.get(student_id=student_id)
            existing_employee.schedule = schedule_update
        except Employee.DoesNotExist:
            return JsonResponse({'error': 'student_id not found in database'}, status=404)
>>>>>>> Stashed changes
    return JsonResponse({'error': 'Only POST allowed'}, status=405)

@csrf_exempt
def update_parameters(request):
    if request.method == 'PUT':
        body = json.loads(request.body)
<<<<<<< Updated upstream
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
=======
        new_params = body.get('parameters', {})
        student_id=new_params.get('student_id', '')

        if (student_id == ''):
            return JsonResponse({'error': 'student_id is required'}, status=400)
        try:
            # get the existing parameters
            exisitng_params = Employee.objects.get(student_id=student_id).params
            # update fields if provided in JSON 
            if 'max' in new_params:
                exisitng_params.max_hours = new_params.get('max')
            """
            if 'min' in params:
                exisitng_params.min_hours = params.get('min')
            if 'preferability' in params:
                exisitng_params.preferability = params.get('preferability')"""
            exisitng_params.save()
            return JsonResponse({'status': 'Parameters updated'}, status=204)
        except Employee.DoesNotExist:
            return JsonResponse({'error': 'student_id not found in database'}, status=404)
    return JsonResponse({'error': 'Only PUT allowed'}, status=405)

@csrf_exempt
def get_schedules(request):
    if request.method == 'GET':
        data = SavedSchedules.object.first()
        return JsonResponse({'status': 'schedules request successful', 'data': data}, status=200)
    return JsonResponse({'error': 'Only GET allowed'}, status=405)
                        

@csrf_exempt
def generate_schedule(request):
    if request.method == 'GET':
        return JsonResponse({'status': 'admin form received'})
    return JsonResponse({'error': 'Only GET allowed'}, status=405)

@csrf_exempt
def save_schedule(request):
    if request.method == 'PUT':
        body = json.loads(request.body)
        new_schedule = body.get('new_schedule')
        existing_data = SavedSchedules.objects.first()
        new_schedule.schedules = 
        return JsonResponse({'status': 'schedule successfully saved'})
>>>>>>> Stashed changes
    return JsonResponse({'error': 'Only PUT allowed'}, status=405)