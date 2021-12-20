FROM python:3.8-alpine
WORKDIR /repo

RUN python3.8 -m venv venv
RUN . venv/bin/activate

COPY requirements.txt .
RUN python3.8 -m pip install -r requirements.txt

COPY . .

# Copy ssl certificates

## Configure SSL and enforce HTTPS
# COPY certificates/star_isq_pt.crt .
# COPY certificates/star_isq_pt.key .

ENTRYPOINT [ "python3.8"]
CMD ["main.py"]