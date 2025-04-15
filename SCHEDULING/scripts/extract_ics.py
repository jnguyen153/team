import sys
import re
import json


# parse_ics_to_json: .ics file -> .json file 
# json file contains a dict that stores 2 data: 
#   a. str:"student_id" -> int:id_number 
#   b. str:"class_schedule" -> class[]
def parse_ics_to_json(infile: str):
    # extract student ID from file name
    match_id = re.search(r'(\d{8})(?=_Cal\.ics)', infile)
    id = match_id.group(1)

    # extract info from .ics file
    schedule = extract_info(infile)

    # create dict that stores data of: student ID and schedule
    student_schedule_dict = {
        "student_id": id,
        "class_schedule": schedule
    }

    # used for testing
    # print(student_schedule_dict)
    
    # output dict to an json file named after student ID for matted: STUDENT_ID + "_schedule.json"
    outfile_name = id + "_schedule.json" 
    with open(outfile_name, "w") as json_file:
        json.dump(student_schedule_dict, json_file, indent=4)



# class[int: time, int: duration, string: days]
#   - time: time in which the class starts (in HHMM format)
#   - duration: how long the class lasts in minutes
#   - days: days of the week the class takes place as a single string separated by , 

# extract_info: .ics file -> array of class[]
def extract_info(file: str):
    class_schedule = []
    # open file for reading
    with open (file, "r", encoding="utf-8") as f:
        ics_text = f.read()
    # divide the classes into individual sections for data extraction (skipping first one)
    individual_classes = ics_text.split("BEGIN:VEVENT")[1:]

    for event in individual_classes:
        # extract starting time
        match_time = re.search(r"DTSTART:\d{8}T(\d{4})", event)
        time = int (match_time.group(1))

        # extract class duration
        match_duration = re.search(r"DURATION:PT(\d{1})H(\d{2})", event)
        hours = int (match_duration.group(1)) * 60
        minutes = int(match_duration.group(2)) + hours

        # extract class days
        match_days = re.search(r"BYDAY=([A-Z,]+)", event)
        days = match_days.group(1)

        # Assemble the extracted data in arr
        current_class = [time, minutes, days]

        # Only add current_class if class_schedule is empty or it isn't a duplicate
        if (len(class_schedule) == 0 or current_class != class_schedule[len(class_schedule) - 1]):
            class_schedule.append(current_class)

    return class_schedule

# run with .ics file as arg
if __name__ == '__main__':
    if len(sys.argv) > 1:
        info = extract_info(sys.argv[1])
        # used for testing
        # print(info)
        parse_ics_to_json(sys.argv[1]) # calls json 
    else:
        print("Usage: python extract_ics.py <ics_file>")