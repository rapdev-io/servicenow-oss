# Update Set Printer

Simplify writing documentation with the ***Update Set Printer*** functionality.

## How to use:

 * Download the latest version of the ***Update Set Printer.xml*** 

 * Import XML into your ServiceNow Dev Instance

### To print single update sets:

  * Navigate to the ***Update Sets (sys_update_set)*** table
  
  * Click into the Update Set you wish to print
  
  * Click the ***Print*** UI Action on the form, this will take you to a Portal page with the contents listed organized by type
  
  * Copy the listed items and paste into your documentation

### To print multiple update sets:

  * Navigate to the ***Update Sets (sys_update_set)*** table

  * In the list view, select the Update Sets you with to print
  
  * From the ***'Actions on selected rows...'*** drop down, select the ***Print*** option and this will bring up a prompt box

  * Select ***OK*** if you wish to have updates consolidated by Type

  * Select ***Cancel*** if you wish to have updates consolidated by Update Sets
  
  * Copy the listed items and paste into your documentation



### Versions
  * **v1.2** Adds 'Print' button to display contents of Update Sets | Adds ability to select multiple Update Sets in list view | Adds functionality to consolidate Updates from multiple Update Sets into their respective types
  * **v1.3** Fixed bug to print name of Flow / Subflows
  * **v2.0** Added Functionality to toggle displaying Deleted Records | Added Option to dynamically display certain Types of Updates | Added Option to toggle showing Updates as Consolidated or Separated
