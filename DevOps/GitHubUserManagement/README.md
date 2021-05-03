# GitHub User Management Catalog Items

## Setup:
After installing the application, you must set up your GitHub organization and credentials:
- Value of system property "x_radi_github.Github Organization" must be set to the name of your GitHub organization
- Credential associated with sys_alias record "x_radi_github.Github" must be set to a GitHub service account
- Under the outbound REST Message "Github", Variable Substitutions for HTTP Methods "Get Users" and "Get Member" should be set to valid values for your organization

## How to use:

After installation, a new Service Catalog category called "Github" will be available, containing two new Catalog Items, "Add Your Github Username" and "GitHub Guest User Management".

From the service portal, users should first submit "Add Your Github Username" to validate their username exists in the organization, and associate the GitHub username with their NOW user account. Once that has been done, a GitHub admin (must have the role "x_radi_github.github_admin") can submit the "GitHub Guest User Management" request which can add the user to one or more repositories, remove the user from one or more repositories, or cancel pending invitations from previously submitted requests.
