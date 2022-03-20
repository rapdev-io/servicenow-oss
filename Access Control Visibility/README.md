# ServiceNow Dashboard - Enhance your public facing access
This update set contains reports in a dashboard providing visibility into resources and access controls that should be reviewed by the ServiceNow team to strengthen your instance public facing access. We provide this dashboard as an audit solution to misconfigured instances that may be vulnerable to date leaks.

# Manual Steps to install the update set 
1. Navigate to Retrieved Update Sets (sys_remote_update_set) and import your xml
2. Preview Update Set named "Evaluate your instance access controls"
3. Review errors/warnings if any
4. Commit Update set
5. Navigate to UI Properties (system_properties_ui) and confirm the following tables are included in _"List of system tables (beginning with "sys_", comma separated), that are reportable. By default, system tables are not reportable"_
  - sys_security_acl
  - sys_ws_operation
  - sys_app_module
  - sys_app_application
  The dashboard report data in these tables
6. Navigate to System Properties (sys_properties) and set _glide.sm.default_mode_ to 'deny'

You can now view the newly created Dashboard _Access Visibility_ and the review the records in the reports.
