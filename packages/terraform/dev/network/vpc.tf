data "aws_vpc" "kurakichi" {
  id = var.vpc_id
}

resource "aws_eip" "nat" {
  vpc = true
}

resource "aws_nat_gateway" "this" {
  allocation_id = aws_eip.nat.id
  subnet_id = var.public_subnet_1a_id
}

resource "aws_route" "private"{
  route_table_id = var.route_table_id_private_subnet_1a
  nat_gateway_id = aws_nat_gateway.this.id
  destination_cidr_block = "0.0.0.0/0"
}