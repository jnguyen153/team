import pandas as pd
from datetime import timedelta, datetime
import streamlit as st

# Convert a 96-character binary string into shift time ranges (per day)
def binary_to_shift_times(binary_string):
    if '1' not in binary_string:
        return "Not Working"

    shifts = []
    start_time = datetime.strptime("00:00", "%H:%M")
    in_shift = False
    shift_start = None

    for i, bit in enumerate(binary_string):
        current_time = start_time + timedelta(minutes=15 * i)
        if bit == '1' and not in_shift:
            in_shift = True
            shift_start = current_time
        elif bit == '0' and in_shift:
            in_shift = False
            shifts.append(f"{shift_start.strftime('%H:%M')} - {current_time.strftime('%H:%M')}")
    if in_shift:
        shifts.append(f"{shift_start.strftime('%H:%M')} - 24:00")

    return ', '.join(shifts)

# Convert employee binary schedules into a DataFrame
def generate_schedule(employees_dict):
    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    schedule = {employee: {} for employee in employees_dict}

    for employee, binary in employees_dict.items():
        for i, day in enumerate(days):
            day_binary = binary[i * 96:(i + 1) * 96]
            schedule[employee][day] = binary_to_shift_times(day_binary)

    return pd.DataFrame(schedule).T  # Employees as rows

# Streamlit interface
st.set_page_config(layout="wide")
st.title("Employee Weekly Schedule Viewer")

# Example test data (one working day, rest zeros)
example_input = {
    "Bob": "00001111111100001111" + "0" * (96 - 20) + "1" * 96 * 6,  # Works 1am-3am, 4am-5am Monday, rest fully working
    "Alice": "1" * 96 + "0" * 96 * 6,  # Works all Monday
    "Charlie": "0" * 96 * 3 + "1" * 96 + "0" * 96 * 3,  # Works only Thursday
}

st.sidebar.header("Controls")
if st.sidebar.button("Load Schedule"):
    schedule_df = generate_schedule(example_input)
    st.dataframe(schedule_df, use_container_width=True)
else:
    st.info("Click 'Load Schedule' in the sidebar to view the employee schedule.")
