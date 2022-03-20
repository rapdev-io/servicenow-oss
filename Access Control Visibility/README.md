# ServiceNow Dashboard - review your public facing access
We provide this update set as an audit solution to misconfigured instances that may be vulnerable to date leaks. The update set contains a dashboard providing visibility into resources and access controls that should be reviewed by the ServiceNow team, with the goal to strengthen your public facing access.

# Manual steps to install the update set 
1. Navigate to Retrieved Update Sets (sys_remote_update_set) and import the xml file
2. Preview the update set named "Evaluate your instance access controls"
3. Review errors/warnings
4. Commit the update set
5. Navigate to UI Properties (system_properties_ui) to confirm that the following tables are included in the option _"List of        system tables (beginning with "sys", comma separated), that are reportable. By default, system tables are not reportable"_
      - sys_security_acl
      - sys_ws_operation
      - sys_app_module
      - sys_app_application
6. Navigate to System Properties (sys_properties) and set _glide.sm.default_mode_ to 'deny'

You can now view the newly created Dashboard - _Access Visibility_ and the the records reported.
