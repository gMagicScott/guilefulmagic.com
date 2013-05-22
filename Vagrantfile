# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant::Config.run do |config|

  # Every Vagrant virtual environment requires a box to build off of.
  # Ubuntu 12.04, 64 bit
  config.vm.box     = "precise64_vagrant"
  config.vm.box_url = "http://files.vagrantup.com/precise64.box"

  # Assign IP Address and prep for a local domain
  config.vm.host_name = "guilefulmagic.com"
  config.hosts.aliases = %w(www.guilefulmagic.com)
  config.vm.network :hostonly, "33.33.33.60"

  # Share a folder
  config.vm.share_folder("public_html", "/var/www/guilefulmagic.com/public_html", ".", :extra => 'dmode=777,fmode=777')

  # Provision with Chef-Solo
  config.vm.provision :chef_solo do |chef|
    chef.cookbooks_path = ["cookbooks", "site-cookbooks"]
    chef.add_recipe "apt"
    chef.add_recipe "build-essential"
    chef.add_recipe "apache2::mod_php5"
    chef.add_recipe "apache2::mod_rewrite"
    chef.add_recipe "apache2::mod_ssl"
    chef.add_recipe "mysql"
    chef.add_recipe "mysql::server"
    chef.add_recipe "php"
    chef.add_recipe "MailCatcher"
    chef.add_recipe "wordpress"
    chef.json = {
      'mysql' => {
        'server_root_password'   => 'root',
        'server_repl_password'   => 'root',
        'server_debian_password' => 'root',
        'allow_remote_root'      => true
      }
    }
  end


end
