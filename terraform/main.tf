terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "3.0.2"
    }
    sops = {
      source  = "carlpett/sops"
      version = "0.7.0"
    }
  }
}

provider "docker" {
  host     = "ssh://deploy@${local.target_host}:22"
  ssh_opts = ["-o", "StrictHostKeyChecking=no", "-o", "UserKnownHostsFile=/dev/null"]

  registry_auth {
    address  = var.ci_registry
    username = var.ci_deploy_user
    password = var.ci_deploy_password
  }
}

provider "sops" {}

data "sops_file" "env_vars" {
  source_file = "secrets/${var.ci_environment_name}.enc.yaml"
  input_type  = "yaml"
}

locals {
  target_host = yamldecode(data.sops_file.env_vars.raw).target_host
  caddy_hosts = yamldecode(data.sops_file.env_vars.raw).caddy_hosts
  basic_auth  = yamldecode(data.sops_file.env_vars.raw).basic_auth
}


resource "docker_image" "website" {
  name = var.docker_image
}

resource "docker_container" "website" {
  image   = docker_image.website.image_id
  name    = "${var.ci_environment_name}_tsb_website"
  restart = "unless-stopped"

  ports {
    internal = 80
  }
}

resource "local_file" "caddyfile" {
  content = templatefile("./Caddyfile.tftpl", {
    hosts       = local.caddy_hosts,
    docker_port = docker_container.website.ports[0].external,
    basic_auth  = local.basic_auth
  })
  filename = "./Caddyfile"
}

resource "null_resource" "caddyfile_template" {
  triggers = {
    "host_changed" = local.target_host
    "docker_port"  = docker_container.website.ports[0].external
  }

  provisioner "file" {
    source      = local_file.caddyfile.filename
    destination = "/etc/caddy/caddy.d/${local.target_host}.conf"
  }

  provisioner "remote-exec" {
    inline = ["sudo systemctl reload caddy"]
  }

  connection {
    type = "ssh"
    user = "deploy"
    host = local.target_host
  }
}
