

FROM python:3.11
WORKDIR /
COPY /requirements.txt /requirements.txt
RUN pip install --no-cache-dir --upgrade -r /requirements.txt
COPY ./ /
CMD ["uvicorn", "main:app", "--host", "127.0.0.1", "--port", "8000"]