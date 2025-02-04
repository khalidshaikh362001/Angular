FROM python:alpine

USER root

RUN groupadd -r -g 1001001 acfpy_group \
    && useradd -u 2001001 --no-log-init -d /home/168538_acf --gid acfpy_group 168538_acf

RUN mkdir -p /pythonapps/acf-backend
COPY  requirements.txt /pythonapps/
COPY pip.conf /pythonapps/
COPY acf-backend /pythonapps/acf-backend

COPY python-custom.sh pythonapps/acf-backend/python-custom.sh
RUN chmod +x /pythonapps/acf-backend/python-custom.sh

RUN chown -R 
