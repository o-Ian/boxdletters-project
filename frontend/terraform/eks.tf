module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 21.0"

  name               = "boxdletters"
  kubernetes_version = "1.33"

  compute_config = {
    enabled    = true
    node_pools = ["general-purpose"]
  }

  vpc_id     = aws_vpc.main.id
  subnet_ids = data.aws_subnets.selected.ids

  # EKS Managed Node Group
  eks_managed_node_groups = {
    boxdletters_node_group = {
      ami_type       = "AL2023_x86_64_STANDARD"
      instance_types = ["t3.micro"]

      min_size     = 1
      max_size     = 3
      desired_size = 3
    }
  }

}