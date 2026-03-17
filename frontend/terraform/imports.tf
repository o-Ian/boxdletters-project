import {
  to = aws_vpc.main
  id = "vpc-016b0fb01a1d31451"
}
resource "aws_vpc" "main" {
}

data "aws_subnets" "selected" {
  filter {
    name   = "vpc-id"
    values = [aws_vpc.main.id]
  }
}