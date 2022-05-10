resource "aws_secretsmanager_secret" "this" {
  name       = "kurakichi_secrets"
  kms_key_id = aws_kms_key.kurakichi.id
}

resource "aws_secretsmanager_secret_version" "dev" {
  secret_id     = aws_secretsmanager_secret.this.id
  secret_string = jsonencode(var.dev)
}
variable "dev" {
  default = {
    YAHOO_OIDC_ISSUER_BASE_URL  = "DUMMY"
    YAHOO_OIDC_CLIENT_ID        = "DUMMY"
    YAHOO_OIDC_CLIENT_SECRET    = "DUMMY"
    YAHOO_OIDC_CLIENT_REDIRECT  = "DUMMY"
    GOOGLE_OIDC_ISSUER_BASE_URL = "DUMMY"
    GOOGLE_OIDC_CLIENT_ID       = "DUMMY"
    GOOGLE_OIDC_CLIENT_SECRET   = "DUMMY"
    GOOGLE_OIDC_CLIENT_REDIRECT = "DUMMY"
    SSO_REDIRECT_SUCCESS        = "DUMMY"
    SSO_REDIRECT_FAIL           = "DUMMY"
    SENTRY_DSN                  = "DUMMY"
    SENDGRID_API_KEY            = "DUMMY"
    GOOGLE_GEO_API_KEY          = "DUMMY"
    PSQL_URL                    = "DUMMY"
    REDIS_URL                   = "DUMMY"
    CORS_NEXT                   = "DUMMY"
    SESSION_SECRET              = "DUMMY"
    CRYPT_PASS                  = "DUMMY"
    CRYPT_SALT                  = "DUMMY"
    S3_PUBLIC_BUCKET            = "DUMMY"
    POSTGRES_USER               = "DUMMY"
    POSTGRES_DB                 = "DUMMY"
    POSTGRES_PASSWORD           = "DUMMY"
  }
  type = map(string)
}