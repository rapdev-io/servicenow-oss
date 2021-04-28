<h3>How it works:</h3>
Discovery will initially scan the ip addresses in a discovery schedule to find open ports, and it will eventually use HTTP Classification where we have created a classification for Infinidat. Once this classification matches, the Infinidat discovery pattern is used to access the Infinidat API to create the CI and its relationships.

<h3>Custom Operations</h3>

Infinidat Get Call - Used to account for infinidat calls that require pagination

<h3>Discovery Pattern</h3>

API Calls:

GET SYSTEM PHYS INFO "http://" + $host + "/api/rest/system"
* Serial number
* Name 
* Firmware version
* Product ID
* Model ID

GET CLUSTER INFO "http://" + $host + "/api/rest/clusters"

* Name
* ID
* Volume ID
* Host Name
* Host ID
* Host Cluster
	
GET LNN INTERFACES "http://" + $host + "/api/rest/network/interfaces"

* LNN ID
* Name
* Node ID
* Operational Status
* Interface Type

GET NETWORK POOLS "http://" + $host + "/api/rest/pools"

* Pool Name
* Pool ID
* Size
* Free Space

GET STORAGE VOLUMES "http://" + $host + "/api/rest/volumes?page_size=100"

* Name
* ID
* Type
* Total Bytes
* Pool ID

GET ENCLOSURE DRIVES "http://" + $host + "/api/rest/components"

* Model
* Vendor
* Serial Number
* Size

GET FC PORTS "http://" + $host + "/api/rest/components"

* WWNN
* WWPN
* Speed


<h3>Discovery Classification</h3>
Infinidat (HTTP Classification) created so Discovery can access the pattern

<h3>Troubleshooting</h3>
-401 Check if the credentials are correct
-403 Check if the credentials have enough permissions to access above API calls
	

