output "acm_certificate_arn" {
  value = aws_acm_certificate.this.arn
}

output "backend_domain_name" {
  value = aws_route53_record.backend_endpoint.name
}
