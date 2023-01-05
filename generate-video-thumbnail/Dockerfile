FROM public.ecr.aws/lambda/nodejs:16

RUN yum update -y && \
    yum install tar xz -y

RUN curl https://johnvansickle.com/ffmpeg/builds/ffmpeg-git-amd64-static.tar.xz --output ffmpeg-git-amd64-static.tar.xz && \
    tar xvf ffmpeg-git-amd64-static.tar.xz && \
    rm -f ffmpeg-git-amd64-static.tar.xz && \
    mv ffmpeg-git-*-amd64-static/ffmpeg /usr/local/bin/ffmpeg

COPY . ${LAMBDA_TASK_ROOT}/

RUN npm install

CMD ["index.handler"]