FROM python:3.11

WORKDIR /app/backend
COPY . /app/backend

RUN pip install --no-cache-dir -r requirements.txt
RUN pytest -q

EXPOSE 5000
CMD ["python", "app.py"]
