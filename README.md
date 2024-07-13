# data-processor

This application allows users to upload CSV or Excel files, identify patterns in text columns using natural language input, and replace the matched patterns. The frontend is built using React, and the backend is built using Django.
Features

    Upload CSV or Excel files
    Process and display file data
    Identify and replace text patterns in the data
    Display modified data with specific patterns replaced

Prerequisites

Before you begin, ensure you have met the following requirements:

    You have installed Python 3.x.
    You have installed Node.js and npm.
    You have an OpenAI API key (if using OpenAI for generating regex patterns).

Getting Started
Backend Setup (Django)

    Clone the repository:

git clone https://github.com/yourusername/data-processor.git
cd data-processor


Create and activate a virtual environment:

python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`

Install the required packages:

pip install -r requirements.txt

Set up the Django project:

    Migrate the database:

python manage.py migrate

Create a superuser:

python manage.py createsuperuser

Run the development server:

        python manage.py runserver

Frontend Setup (React)

    Navigate to the frontend directory:

cd frontend

Install the required packages:

npm install

Start the React development server:

    npm start

Configuration

    Django Settings:
        Ensure ALLOWED_HOSTS, CORS_ALLOWED_ORIGINS, and CSRF_TRUSTED_ORIGINS are configured properly in settings.py.
        Add your OpenAI API key to your environment variables if you plan to use the OpenAI API for pattern matching.

    React Axios Configuration:
        Ensure axiosConfig.js is set up to point to your Django backend.

Usage

    Upload a File:
        Use the file upload section to upload your CSV or Excel file.

    Match and Replace Patterns:
        In the pattern description field, enter email addresses.
        In the replacement value field, enter REDACTED.
        Click "Match and Replace" to replace email addresses with REDACTED.

    View Processed Data:
        The processed data will be displayed in a table format with the specified patterns replaced.

Example

    Upload a file (text.csv):
    Name	Email	Phone
    John Doe	john@example.com	123-456-7890
    Jane Roe	jane@example.com	098-765-4321

    Enter Pattern Description and Replacement Value:
        Pattern Description: email addresses
        Replacement Value: REDACTED

    Result:
    Name	Email	Phone
    John Doe	REDACTED	123-456-7890
    Jane Roe	REDACTED	098-765-4321

