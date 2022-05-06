resource "aws_secretsmanager_secret" "kurakichi" {
  name = "kurakichi-secrets"
  kms_key_id = aws_kms_key.kurakichi.id
}
