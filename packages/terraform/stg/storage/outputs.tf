output "s3_log" {
  value       = aws_s3_bucket.log.id
  description = "kurakichi log backet id"
}

output "docdb_cluster" {
  value       = aws_docdb_cluster.kurakichi
  description = "kurakichi docDB cluster"
}

output "elasticache_cluster" {
  value       = aws_elasticache_cluster.kurakichi
  description = "kurakichi elastiCache cluster"
}

