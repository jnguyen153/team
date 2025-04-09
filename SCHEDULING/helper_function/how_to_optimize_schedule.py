How to use optimize_schedule.py:
class_schedule: A list of available class slots, where each slot is represented by [class_id, start_time, duration].

students_info: A list of dictionaries for each student, including:

performance_score: This is the student’s performance score (higher score = better).

preferred_times: A list of times that the student prefers, represented as [start_time, duration] pairs.

Priority: The students are sorted by their performance score (higher priority for higher scores).
The algorithm then tries to assign each student to their preferred time slot, removing that slot from the available pool once assigned.

Let’s say you have three students, and they each have a list of preferred times they want to work, and the available timeslots are:
# Example student information (sorted by performance score)
students_info = [
    {'student_id': '123', 'performance_score': 90, 'preferred_times': [[930, 60], [1200, 60]]},
    {'student_id': '456', 'performance_score': 85, 'preferred_times': [[930, 60], [1400, 60]]},
    {'student_id': '789', 'performance_score': 80, 'preferred_times': [[930, 60], [1200, 60]]},
]

# Example available class schedule (time slot: [class_id, start_time, duration])
class_schedule = [
    [1, 930, 60],  # Class 1 starts at 9:30 AM and is 60 minutes long
    [2, 1200, 60], # Class 2 starts at 12:00 PM and is 60 minutes long
    [3, 1400, 60], # Class 3 starts at 2:00 PM and is 60 minutes long
]

# Call the function to generate an optimized schedule
optimized_classes = optimized_schedule_for_students(class_schedule, students_info)

# Print the result
for scheduled_class in optimized_classes:
    print(f"Student {scheduled_class['student_id']} is assigned to Class {scheduled_class['class_id']} at {scheduled_class['start_time']} for {scheduled_class['duration']} minutes.")


Expected output:
Student 123 is assigned to Class 1 at 930 for 60 minutes.
Student 456 is assigned to Class 3 at 1400 for 60 minutes.
Student 789 is assigned to Class 2 at 1200 for 60 minutes.


Notes:
Tiebreakers: If two students have the same performance score and prefer the same timeslot, this code assigns the timeslot to the first one in the list (as sorted).

Flexibility: You can adjust the logic to handle additional constraints or prioritize other factors if needed (e.g., student availability, specific days of the week).