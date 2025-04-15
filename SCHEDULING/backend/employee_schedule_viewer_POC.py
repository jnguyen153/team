import pandas as pd
from datetime import timedelta, datetime
import streamlit as st

# Convert a slice of a 96-character binary string into shift time ranges (per day, filtered)
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

# Convert employee binary schedules into a DataFrame (only Monday, 2PM-6PM)
def generate_schedule(employees_dict):
    schedule = {}
    for employee, binary in employees_dict.items():
        work_binary = binary[:672]  # first 672 = work schedule
        monday_binary = work_binary[0:96]  # Monday
        interval_start = 0
        interval_end = 96   # 6PM = 18:00 = 72
        monday_slice = monday_binary[interval_start:interval_end]
        schedule[employee] = {"Monday 14:00–18:00": binary_to_shift_times(monday_slice)}
    return pd.DataFrame(schedule).T

# Convert availability into DataFrame (only Monday, 2PM-6PM)
def generate_availability(employees_dict):
    availability = {}
    for employee, binary in employees_dict.items():
        avail_binary = binary[672:]  # second 672 = availability
        monday_binary = avail_binary[0:96]
        interval_start = 0
        interval_end = 96
        monday_slice = monday_binary[interval_start:interval_end]
        availability[employee] = {"Monday 14:00–18:00": binary_to_shift_times(monday_slice, unavailable=True)}
    return pd.DataFrame(availability).T

# Streamlit interface
st.set_page_config(layout="wide")
st.title("Employee Schedule Tester: Monday 2PM–6PM")

st.sidebar.header("Controls")
uploaded_file = st.sidebar.file_uploader("Upload a CSV file", type="csv")

if uploaded_file is not None:
    df = pd.read_csv(uploaded_file)
    # Expecting CSV format: employee_name,binary_string (1344 characters total)
    input_data = {row["employee_name"]: row["binary_string"] for _, row in df.iterrows() if len(row["binary_string"]) == 1344}

    if st.sidebar.button("Load Schedule"):
        schedule_df = generate_schedule(input_data)
        availability_df = generate_availability(input_data)

        st.subheader("Work Schedule (Monday 2PM–6PM)")
        st.dataframe(schedule_df, use_container_width=True)

        st.subheader("Availability (Monday 2PM–6PM)")
        st.dataframe(availability_df, use_container_width=True)
else:
    st.info("Upload a CSV file with employee_name and binary_string to begin.")
