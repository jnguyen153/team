import random
from datetime import datetime, timedelta

def generate_draft_schedules(student_schedules, num_schedules=20):
    """
    Generate 'num_schedules' draft schedules based on student's class schedule.

    Args:
    student_schedules (list): A list of class schedules for the student.
    num_schedules (int): The number of schedules to generate.

    Returns:
    list: A list of generated schedules.
    """
    generated_schedules = []
    
    for _ in range(num_schedules):
        draft_schedule = []
        
        for class_info in student_schedules['class_schedule']:
            class_time = class_info[0]  # The class start time in HHMM format
            class_duration = class_info[1]  # Class duration in minutes
            class_days = class_info[2]  # Days the class occurs (e.g., 'MO,WE')

            # Randomly decide on a start date within a week (for demo purposes)
            start_date = datetime.now() + timedelta(days=random.randint(1, 7))
            start_time = datetime.strptime(f'{start_date.date()} {str(class_time).zfill(4)}', '%Y-%m-%d %H%M')

            # Calculate end time
            end_time = start_time + timedelta(minutes=class_duration)

            # Construct the event in the format FullCalendar expects
            event = {
                'id': str(random.randint(1000, 9999)),  # Random unique ID
                'title': f"Class {class_days}",  # Example: "Class MO,WE"
                'start': start_time.isoformat(),
                'end': end_time.isoformat()
            }

            draft_schedule.append(event)
        
        generated_schedules.append(draft_schedule)

    return generated_schedules
