<h3>How it works:</h3>
The scheduled script execution "Gather Infoblox Ranges" will gather subnets from Infoblox and dynamically create range sets and schedules (if applicable) for Discovery, depending on the configuration specified on the Properties page within the application.

<h3>How to use</h3>

After installing the application, navigate to Infoblox Integration -> Properties and enter your Infoblox URL and credential details. The other options can be set depending on your needs:

* Query to limit results: Can set query to limit ranges retrieved from Infoblox

* Extensible attribute in Infoblox to group subnets by: Choose an attribute that will group retrieved subnets within a Discovery range. This attribute must be specified in Infoblox.

* Create an "Unknown Locations" Discovery Range Set and Discovery Schedule: This option will create a new range set for subnets that do not have the attribute specified above

* Use MID Server: Determines whether to use a MID server to communicate with Infoblox

* Create Discovery Schedules for new Discovery Range Sets based on the location attribute: Determines whether discovery schedules will be created for discovered range sets based on the location attribute specified above

* ServiceNow field on the Location (cmn_location) table to which the x_radi_infoblox.location_attribute value will be matched against: Chooses a field on cmn_location that will be used to match the value of the location attribute in Infoblox


