from datetime import datetime, time


def break_down_time(time_str):
    if time_str:  # Check if time is not None
        # Parse the time string into a datetime object
        time_obj = datetime.strptime(time_str, "%H:%M:%S")
        
        # Extract the 24-hour hour and convert to 12-hour format
        hour_24 = time_obj.hour
        minutes = time_obj.minute

        # Determine AM or PM and adjust hour for 12-hour format
        period = "AM" if hour_24 < 12 else "PM"
        hour_12 = hour_24 % 12
        hour_12 = hour_12 if hour_12 != 0 else 12  # Handle midnight (0 -> 12)

        # Format hours and minutes as strings with leading zeros
        return {
            "hours": str(hour_12).zfill(2),
            "minutes": str(minutes).zfill(2),
            "period": period
        }
    return None

def create_time_object(hours, minutes, period):

    if period == "PM" and hours != 12:
        hours += 12
    elif period == "AM" and hours == 12:
        hours = 0

    # Create a time object
    return time(hour=hours, minute=minutes)