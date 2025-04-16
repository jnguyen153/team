import pandas as pd
from datetime import timedelta, datetime
import streamlit as st

# === CONFIGURATION === #
start_of_day = 12 * 4  # 2PM (in 15-minute blocks)
end_of_day = 18 * 4    # 6PM
day_range = [0]        # [0] for Monday; [0, 1] for Mon–Tue

# === DERIVED CONSTANTS === #
blocks_per_day = 96
length_of_day = end_of_day - start_of_day
length_of_window = length_of_day * len(day_range)
expected_binary_length = length_of_window * 2  # work + availability


def binary_to_shift_times(binary_string, base_block_offset, unavailable=False):
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
        current_time = start_time + timedelta(minutes=15 * (base_block_offset + i))
        if ((bit == '1' and not unavailable) or (bit == '0' and unavailable)) and not in_shift:
            in_shift = True
            shift_start = current_time
        elif ((bit == '0' and not unavailable) or (bit == '1' and unavailable)) and in_shift:
            in_shift = False
            shifts.append(f"{shift_start.strftime('%H:%M')} - {current_time.strftime('%H:%M')}")
    if in_shift:
        end_time = current_time + timedelta(minutes=15)
        shifts.append(f"{shift_start.strftime('%H:%M')} - {end_time.strftime('%H:%M')}")

    return ', '.join(shifts)


def generate_schedule(employees_dict):
    schedule = {}
    for employee, binary in employees_dict.items():
        work_binary = binary[:length_of_window]
        schedule[employee] = {}
        for i, day in enumerate(day_range):
            start = i * length_of_day
            end = (i + 1) * length_of_day
            day_slice = work_binary[start:end]
            label = f"{['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'][day]} {start_of_day//4}:00–{end_of_day//4}:00"
            base_block_offset = day * blocks_per_day + start_of_day
            schedule[employee][label] = binary_to_shift_times(day_slice, base_block_offset)
    return pd.DataFrame(schedule).T


def generate_availability(employees_dict):
    availability = {}
    for employee, binary in employees_dict.items():
        avail_binary = binary[length_of_window:]
        availability[employee] = {}
        for i, day in enumerate(day_range):
            start = i * length_of_day
            end = (i + 1) * length_of_day
            day_slice = avail_binary[start:end]
            label = f"{['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'][day]} {start_of_day//4}:00–{end_of_day//4}:00"
            base_block_offset = day * blocks_per_day + start_of_day
            availability[employee][label] = binary_to_shift_times(day_slice, base_block_offset, unavailable=True)
    return pd.DataFrame(availability).T


# === STREAMLIT UI === #
st.set_page_config(layout="wide")
st.title("Employee Schedule Viewer – Dynamic Time Window")

st.sidebar.header("Controls")
uploaded_file = st.sidebar.file_uploader("Upload a CSV with employee_name,binary_string", type="csv")

if uploaded_file:
    df = pd.read_csv(uploaded_file)
    input_data = {}
    for _, row in df.iterrows():
        name = row["employee_name"]
        bits = row["binary_string"]
        if len(bits) == expected_binary_length:
            input_data[name] = bits
        else:
            st.warning(f"Skipping {name}: binary string is {len(bits)} bits, expected {expected_binary_length}.")

    if st.sidebar.button("Load Schedule"):
        if input_data:
            schedule_df = generate_schedule(input_data)
            availability_df = generate_availability(input_data)

            st.subheader("Work Schedule")
            st.dataframe(schedule_df, use_container_width=True)

            st.subheader("Availability")
            st.dataframe(availability_df, use_container_width=True)
        else:
            st.error("No valid employee data found in uploaded file.")
else:
    st.info(f"Upload a CSV with exactly {expected_binary_length} bits per employee (work + availability).")
