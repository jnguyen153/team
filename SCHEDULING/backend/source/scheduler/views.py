from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime, timedelta
import pytz
import json
from .models import AdminSubmission, Employee, SavedSchedules

def get_schedules(request):
    return JsonResponse({'schedules': []})

@csrf_exempt
def admin_form_submission(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST allowed'}, status=405)
    body=json.loads(request.body)
    students=body.get('listofstudents')
    for key in students:
        Employee.objects.create(
            employee_id= key.get('student_id')
            student_id= key.get('student_id')
            email=key.get('student_email')
        )
    '''body = json.loads(request.body)
    AdminSubmission.objects.create(data=body)'''
    return JsonResponse({'status': 'admin form received'})
    

def convert_events_to_unavailability_matrix(events):
    tz = pytz.timezone("America/New_York")
    schedule = [[0] * 96 for _ in range(7)]  # 7 days × 96 blocks

    def time_to_block(dt):
        return dt.hour * 4 + dt.minute // 15

    for e in events:
        start_str = e.get("start")
        end_str = e.get("end", "")

        if not start_str:
            continue

        try:
            start = datetime.fromisoformat(start_str).astimezone(tz)
        except ValueError:
            continue

        if end_str:
            try:
                end = datetime.fromisoformat(end_str).astimezone(tz)
            except ValueError:
                end = start + timedelta(minutes=15)
        else:
            end = start + timedelta(minutes=15)

        day = start.weekday()
        start_block = max(0, min(time_to_block(start), 95))
        end_block = max(0, min(time_to_block(end), 96))

        for i in range(start_block, end_block):
            schedule[day][i] = 1

    return schedule

@csrf_exempt
def submit_availability(request):
    if request.method != 'PUT':
        return JsonResponse({'error': 'Only PUT allowed'}, status=405)

    body = json.loads(request.body)
    student = body.get("student", {})
    events = body.get("events", [])
    student_id = student.get("studentId")

    if not student_id or not events:
        return JsonResponse({'error': 'Missing studentId or events'}, status=400)

    try:
        employee = Employee.objects.get(student_id=student_id)
    except Employee.DoesNotExist:
        return JsonResponse({'error': 'Student not found in database'}, status=404)

    bit_matrix = convert_events_to_unavailability_matrix(events)
    employee.schedule = bit_matrix  # assumes you have a JSONField or TextField
    employee.save()

    return JsonResponse({'status': 'availability updated', 'studentId': student_id}, status=200)


@csrf_exempt
def update_parameters(request):
    if request.method != 'PUT':
        return JsonResponse({'error': 'Only PUT allowed'}, status=405)
    
    body = json.loads(request.body)
    new_params = body.get('updates', {})
    if (new_params == {}):
        return JsonResponse({'error': 'update body is empty'}, status=400)
    student_id=new_params.get('student_id', '')
    if (student_id == ''):
        return JsonResponse({'error': 'student_id is required'}, status=400)
    try:
        # get the existing parameters
        exisitng_params = Employee.objects.get(student_id=student_id).params
        # update mappings if provided in JSON request body
        if 'max_hours' in new_params:
            exisitng_params.max_hours = new_params.get('max')
        if 'f1_status' in new_params:
            exisitng_params.f1_status = new_params.get('f1_status')
        if 'priority' in new_params:
            exisitng_params.priority = new_params.get('priority')
        exisitng_params.save()
        return JsonResponse({'status': 'Parameters updated'}, status=204)
    except Employee.DoesNotExist:
        return JsonResponse({'error': 'student_id not found in database'}, status=404)

@csrf_exempt
def get_schedules(request):
    if request.method != 'GET':
        return JsonResponse({'error': 'Only GET allowed'}, status=405)
    data = SavedSchedules.object.first()
    return JsonResponse({'status': 'schedules request successful', 'data': data}, status=200)
                        

@csrf_exempt
def generate_schedule(request):
    if request.method != 'GET':
        return JsonResponse({'error': 'Only GET allowed'}, status=405)
    return JsonResponse({'status': 'admin form received'})
    

@csrf_exempt
def save_schedule(request):
    if request.method != 'PUT':
        return JsonResponse({'error': 'Only PUT allowed'}, status=405)
    body = json.loads(request.body)
    new_schedule = body.get('new_schedule')
    existing_data = SavedSchedules.objects.first()
    # new_schedule.schedules = 
    return JsonResponse({'status': 'schedule successfully saved'})
    