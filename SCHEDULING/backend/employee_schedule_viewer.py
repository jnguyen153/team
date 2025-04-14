import pandas as pd
from datetime import timedelta, datetime
import streamlit as st

# Convert a 96-character binary string into shift time ranges (per day)
def binary_to_shift_times(binary_string, unavailable=False):
    if unavailable:
        if '0' not in binary_string:
            return "Not Available"
    else:
        if '1' not in binary_string:
            return "Not Working"

    shifts = []
    start_time = datetime.strptime("00:00", "%H:%M")
    in_shift = False
    shift_start = None

    for i, bit in enumerate(binary_string):
        current_time = start_time + timedelta(minutes=15 * i)
        if ((bit == '1' and not unavailable) or (bit == '0' and unavailable)) and not in_shift:
            in_shift = True
            shift_start = current_time
        elif ((bit == '0' and not unavailable) or (bit == '1' and unavailable)) and in_shift:
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
        work_binary = binary[:672]
        for i, day in enumerate(days):
            day_binary = work_binary[i * 96:(i + 1) * 96]
            schedule[employee][day] = binary_to_shift_times(day_binary)

    return pd.DataFrame(schedule).T  # Employees as rows

# Convert availability strings into a DataFrame
def generate_availability(employees_dict):
    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    availability = {employee: {} for employee in employees_dict}

    for employee, binary in employees_dict.items():
        avail_binary = binary[672:]
        for i, day in enumerate(days):
            day_binary = avail_binary[i * 96:(i + 1) * 96]
            availability[employee][day] = binary_to_shift_times(day_binary, unavailable=True)

    return pd.DataFrame(availability).T

# Streamlit interface
st.set_page_config(layout="wide")
st.title("Employee Weekly Schedule Viewer")

# Example test data
example_input = {
    "Bob": (
        "00001111111100001111" + "0" * (96 - 20) + "1" * 96 * 6 +  # work binary (672 bits)
        "0" * 672  # fully available (matches work schedule)
    ),
    "Alice": (
        "1" * 96 + "0" * 96 * 6 +  # works all Monday
        "0" * 672  # fully available
    ),
    "Charlie": (
        "0" * 96 * 3 + "1" * 96 + "0" * 96 * 3 +  # only works Thursday
        "1" * 96 * 3 + "0" * 96 + "1" * 96 * 3  # only available Thursday
    ),
    "Robert": "0" * 56,
    "Justin": "0" * 56 + "1" * 4 + "0",
    "Juan": "0" * 56 + "0000" + "0000" + "1111" + "1111" + "0",
    "Patrick": "0" * 56 + "0000" + "1111" + "0000" + "0000",
    "John": "0" * 56 + "1111" + "0000" + "0000" + "0000",
    "Francis": "0" * 56 + "0000" + "0000" + "0000" + "1111" + "0",
    "Xavier": "0" * 56 + "0111" + "1100" + "0000" + "0000",
}

st.sidebar.header("Controls")
if st.sidebar.button("Load Schedule"):
    schedule_df = generate_schedule(example_input)
    availability_df = generate_availability(example_input)

    st.subheader("Work Schedule")
    st.dataframe(schedule_df, use_container_width=True)

    st.subheader("Availability")
    st.dataframe(availability_df, use_container_width=True)
else:
    st.info("Click 'Load Schedule' in the sidebar to view the employee schedule and availability.")
