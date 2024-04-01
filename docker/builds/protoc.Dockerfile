FROM golang:alpine

WORKDIR /opt/data

RUN apk update
RUN apk upgrade

RUN apk add --no-cache --update protoc
RUN go mod init ngnviethuan/protoc
RUN go get -u google.golang.org/protobuf/cmd/protoc-gen-go
RUN go install google.golang.org/protobuf/cmd/protoc-gen-go
RUN go get -u google.golang.org/grpc/cmd/protoc-gen-go-grpc
RUN go install google.golang.org/grpc/cmd/protoc-gen-go-grpc

VOLUME [ "/opt/data" ]

ENTRYPOINT [ "sh" ]
