locals {
  tags = {
    project_name = var.project_name
    stage = var.stage
  }
}

resource "aws_acm_certificate" "this" {
  domain_name       = var.certificate_domain
  validation_method = "DNS"

  tags = local.tags

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "cert_validation" {
  name    = aws_acm_certificate.this.domain_validation_options.0.resource_record_name
  type    = aws_acm_certificate.this.domain_validation_options.0.resource_record_type
  zone_id = var.zone_id
  records = [aws_acm_certificate.this.domain_validation_options.0.resource_record_value]
  ttl     = 60
}

resource "aws_acm_certificate_validation" "this" {
  certificate_arn         = aws_acm_certificate.this.arn
  validation_record_fqdns = [aws_route53_record.cert_validation.fqdn]
}


resource "aws_route53_record" "backend_endpoint" {
  zone_id = var.zone_id
  name    = var.certificate_domain
  type    = "A"

  alias {
    name                   = var.alb_endpoint
    zone_id                = var.alb_zone_id
    evaluate_target_health = true
  }
}
