#
# Cookbook Name:: wordpress
# Recipe:: default
#
# Copyright 2013, YOUR_COMPANY_NAME
#
# All rights reserved - Do Not Redistribute
#

include_recipe "apache2"
include_recipe "mysql::server"
include_recipe "php"
include_recipe "php::module_mysql"
include_recipe "apache2::mod_php5"

execute "create wordpress database" do
  command "/usr/bin/mysqladmin -u root -p\"#{node['mysql']['server_root_password']}\" create wordpress"
  not_if("/usr/bin/mysql -u root -p\"#{node['mysql']['server_root_password']}\" -e 'use wordpress'")
end

apache_site "000-default" do
  enable false
end

web_app "guileful_magic" do
  server_name "guilefulmagic.com"
  server_aliases "*.guilefulmagic.com"
  docroot "/var/www/guilefulmagic.com/public_html"
end
