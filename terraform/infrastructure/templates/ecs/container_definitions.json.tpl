[
  {
    "name": "${container_name}",
    "image": "${app_image}",
    "cpu": ${cpu},
    "memory": ${memory},
    "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/${project_name}/${stage}",
          "awslogs-region": "${aws_region}",
          "awslogs-stream-prefix": "ecs"
        }
    },
    "portMappings": [
      {
        "containerPort": ${app_port},
        "protocol": "tcp"
      }
    ],
    "essential": true
  }
]
