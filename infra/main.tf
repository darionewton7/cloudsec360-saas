'''
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  // Para colaboração, configure um backend remoto como o S3.
  // backend "s3" {
  //   bucket         = "cloudsec360-terraform-state"
  //   key            = "global/s3/terraform.tfstate"
  //   region         = "us-east-1"
  //   encrypt        = true
  //   dynamodb_table = "terraform-lock"
  // }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_s3_bucket" "reports_bucket" {
  bucket = "cloudsec360-compliance-reports-${random_id.bucket_suffix.hex}"

  tags = {
    Name        = "CloudSec360 Compliance Reports"
    Project     = "CloudSec360"
    ManagedBy   = "Terraform"
  }
}

resource "random_id" "bucket_suffix" {
  byte_length = 8
}

output "reports_bucket_name" {
  description = "The name of the S3 bucket for storing compliance reports."
  value       = aws_s3_bucket.reports_bucket.bucket
}
'''
