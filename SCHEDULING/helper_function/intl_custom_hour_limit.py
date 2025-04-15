def enforce_hour_limit(student_id, hours_worked, international=False):
    """
    Enforces an hourly limit on student work based on their status.

    Args:
    student_id (str): The student's ID.
    hours_worked (int): The total hours the student has worked.
    international (bool): Whether the student is international (default: False).

    Returns:
    bool: Whether the student is allowed to work more hours.
    """
    max_hours = 20 if international else 40  # International students have a 20-hour limit

    if hours_worked > max_hours:
        print(f"Student {student_id} exceeds the hourly limit. Max allowed: {max_hours} hours.")
        return False
    return True
