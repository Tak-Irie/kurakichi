resource "aws_ecr_repository" "kurakichi" {
  name = "kurakichi"
}

resource "aws_ecr_lifecycle_policy" "kurakichi" {
  repository = aws_ecr_repository.kurakichi.name

  policy = <<EOF
  {
    "rules": [
      {
        "rulePriority": 1,
        "description": "Keep last 30 release tagged images",
        "selection": {
          "tagStatus": "tagged",
          "tagPrefixList": ["release"],
          "countType": "imageCountMoreThan",
          "countNumber": 30
        },
        "action": {
          "type": "expire"
        }
      }
    ]
  }
EOF
}
