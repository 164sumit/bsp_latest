# Use an official Python runtime as a parent image
FROM python:3.9-slim


WORKDIR /app2
# COPY . /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
# Make port 5000 available to the world outside this container
EXPOSE 5000
# Run app.py when the container launches
CMD ["python", "loop_main_api.py"]