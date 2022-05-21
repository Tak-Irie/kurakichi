# IAM_ROLEの作成
resource "aws_iam_role" "this" {
  name               = var.name
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}


# IAM_ROLEをどのAWSサービスに関連付けるか
data "aws_iam_policy_document" "assume_role" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = [var.identifier]
    }
  }
}

# IAM_POLICYの作成
resource "aws_iam_policy" "this" {
  name   = var.name
  policy = var.policy
}

# IAM_ROLEとIAM_POLICYを関連付
resource "aws_iam_role_policy_attachment" "this" {
  role       = aws_iam_role.this.name
  policy_arn = aws_iam_policy.this.arn
}

