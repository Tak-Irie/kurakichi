resource "aws_vpc" "kurakichi" {
  cidr_block           = "172.16.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "kurakichi-VPC"
  }
}
resource "aws_internet_gateway" "kurakichi" {
  vpc_id = aws_vpc.kurakichi.id
  tags = {
    Name = "kurakichi-IGW"
  }
}
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.kurakichi.id
  tags = {
    Name = "kurakichi-public-route-table"
  }
}
resource "aws_route" "public" {
  route_table_id         = aws_route_table.public.id
  gateway_id             = aws_internet_gateway.kurakichi.id
  destination_cidr_block = "0.0.0.0/0"
}

resource "aws_route" "private" {
  route_table_id         = aws_route_table.private_1a.id
  nat_gateway_id         = aws_nat_gateway.kurakichi_nat_1a.id
  destination_cidr_block = "0.0.0.0/0"
}

resource "aws_subnet" "public_1a" {
  vpc_id                  = aws_vpc.kurakichi.id
  cidr_block              = "172.16.30.0/24"
  map_public_ip_on_launch = true
  availability_zone       = "ap-northeast-1a"
  tags = {
    Name = "kurakichi-public-subnet-tokyo-1a"
  }
}

resource "aws_route_table_association" "public_1a" {
  subnet_id      = aws_subnet.public_1a.id
  route_table_id = aws_route_table.public.id
}


resource "aws_route_table" "private_1a" {
  vpc_id = aws_vpc.kurakichi.id
  tags = {
    Name = "kurakichi-private-route-table-1a"
  }
}
resource "aws_route_table" "private_1c" {
  vpc_id = aws_vpc.kurakichi.id
  tags = {
    Name = "kurakichi-private-route-table-1c"
  }
}

resource "aws_subnet" "private_1a" {
  vpc_id                  = aws_vpc.kurakichi.id
  cidr_block              = "172.16.40.0/24"
  availability_zone       = "ap-northeast-1a"
  map_public_ip_on_launch = false
  tags = {
    Name = "kurakichi-private-subnet-tokyo-1a"
  }
}

resource "aws_subnet" "private_1c" {
  vpc_id                  = aws_vpc.kurakichi.id
  cidr_block              = "172.16.41.0/24"
  availability_zone       = "ap-northeast-1c"
  map_public_ip_on_launch = false
  tags = {
    Name = "kurakichi-private-subnet-tokyo-1c"
  }
}


resource "aws_nat_gateway" "kurakichi_nat_1a" {
  allocation_id = aws_eip.nat_gateway_1a.id
  subnet_id     = aws_subnet.public_1a.id
  depends_on    = [aws_internet_gateway.kurakichi]

  tags = {
    Name = "kurakichi_nat_1a"
  }
}

resource "aws_eip" "nat_gateway_1a" {
  vpc        = true
  depends_on = [aws_internet_gateway.kurakichi]
  tags = {
    Name = "kurakichi_eip_1a"
  }
}



resource "aws_route_table_association" "private_1a" {
  subnet_id      = aws_subnet.private_1a.id
  route_table_id = aws_route_table.private_1a.id
}
resource "aws_route_table_association" "private_1c" {
  subnet_id      = aws_subnet.private_1c.id
  route_table_id = aws_route_table.private_1c.id
}



