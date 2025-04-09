import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_confirmation_email(student_email, schedule_details):
    """
    Sends a confirmation email to a student with their schedule details.

    Args:
    student_email (str): The student's email address.
    schedule_details (str): The schedule in string format.
    """
    sender_email = "your_email@example.com"
    sender_password = "your_password"  # Use an app-specific password for Gmail
    subject = "Your Class Schedule Confirmation"

    # Create the email body
    body = f"Dear Student,\n\nHere is your confirmed class schedule:\n\n{schedule_details}\n\nBest regards,\nThe Team"
    
    # Setup MIME
    msg = MIMEMultipart()
    msg["From"] = sender_email
    msg["To"] = student_email
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "plain"))

    # Send email
    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, student_email, msg.as_string())
        server.close()
        print(f"Confirmation email sent to {student_email}")
    except Exception as e:
        print(f"Error sending email: {e}")
