# Cloudflare Manager

## Description

Enable creation and tracking of your Cloudflare DNS records from ServiceNow

## Includes

1. Daily sync of DNS records `Create/Update Cloudflare Zones`

2. Record producer for new DNS entries `Cloudflare Entry Request`

3. Automated provisioning of DNS entries `Cloudflare Request Flow`

## Configuration

1. Create API token from your Cloudflare account with Zone Edit permissions

2. Create API Credential record in ServiceNow

3. Attach credential record to the pre-populated Cloudflare connection record `Cloudflare Connection`

4. Set system properteis for default assignment group and default approval group

    System Properties:

    - `default_approval_group`

    - `default_assignment_group`

  
## General Information

- The Daily sync `Create/Update Cloudflare Zones` is set to run at 00:00 by default

- New requests will create a 'note' on new Cloudflare records containing the request number that generated the entry

- Currently deleted entries will not be removed from Cloudflare if deleted from ServiceNow but will be removed from ServiceNow when the daily sync runs
