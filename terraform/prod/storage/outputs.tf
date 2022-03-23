output "s3_log" {
  value = aws_s3_bucket.log.id
}

output "docdb_cluster" {
  value = aws_docdb_cluster.kurakichi
}