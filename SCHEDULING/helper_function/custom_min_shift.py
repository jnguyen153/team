def validate_shift_duration(shift_duration, student_id, international=False):
    """
    Validates that the shift duration meets the minimum requirement for students.

    Args:
    shift_duration (int): The shift duration in minutes.
    student_id (str): The student's ID.
    international (bool): Whether the student is international.

    Returns:
    bool: Whether the shift duration is valid.
    """
    min_duration = 60 if not international else 45  # International students may have shorter shifts

    if shift_duration < min_duration:
        print(f"Student {student_id}: Shift duration is too short. Minimum required: {min_duration} minutes.")
        return False
    return True
