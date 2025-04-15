def optimized_schedule_for_students(class_schedule, students_info):
    """
    Optimizes the schedule by assigning class timeslots to students based on their performance.

    Args:
    class_schedule (list): A list of available class slots with each slot represented as [class_id, start_time, duration].
    students_info (list): A list of students with each student represented as a dict containing:
                          - 'student_id': str,
                          - 'performance_score': int, (Higher is better)
                          - 'preferred_times': list of preferred times in [start_time, duration] format.
    
    Returns:
    list: A list of scheduled classes for each student, prioritizing high-performance students.
    """
    # Sorted students based on performance score (higher score gets higher priority)
    sorted_students = sorted(students_info, key=lambda x: x['performance_score'], reverse=True)
    
    scheduled_classes = []
    
    for student in sorted_students:
        # Try to assign a class that matches the student's preferred time
        for preferred_time in student['preferred_times']:
            class_id = None
            for class_slot in class_schedule:
                if class_slot[1] == preferred_time[0] and class_slot[2] == preferred_time[1]:
                    class_id = class_slot[0]
                    scheduled_classes.append({
                        'student_id': student['student_id'],
                        'class_id': class_id,
                        'start_time': preferred_time[0],
                        'duration': preferred_time[1],
                    })
                    class_schedule.remove(class_slot)  # Remove the assigned class slot
                    break

            if class_id is not None:
                break  # Once a class is assigned, move to the next student
    
    return scheduled_classes
