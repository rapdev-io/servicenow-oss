The purpose is to automate the creation of AWS accounts in ServiceNow along with correlated table records needed to discover AWS resources from ServiceNow. This endpoint utilizes the AWS assume role function to allow for discovery of AWS resources. Furthermore, it will attempt to discover data centers associated with the account and automatically create a discovery schedule for this aws account.

A prerequisite to use this is a servicenow service account to fulfill basic auth requirements and this should be passed along with the api call.

<h3> Required Fields </h3>

* account_id
* access_role_name
* external_id
* accessor_id

These are the required fields necessary for the payload to run, where account id is the AWS  account id and the access role name is the assume role. External ID will be generated along with the AWS account and should be passed in as well. 

If no name is passed in at account create, a discovery schedule will be created automatically.

if it is the account will be added to the configuration of the discovery schedule if that is a valid pre-existing discovery schedule. If it is not an existing discovery schedule a new one will be created with the name that is passed in.
