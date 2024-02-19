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

### Installation Notes
  * If you are installing v2.0, there are errors you will encounter when adding the Update Set to your instance.
  * These errors pertain to the additional Digi functionality to help automation descriptions for selected Updates.
  * Select all of the following errors and select 'Skip remote update'
  * Expect to see the following 7 Remote Updates throw errors
     1. x_radi_digi_ai_prompt_81b4d2c71b3b3510d4e599f91d4bcb79
     2. x_radi_digi_ai_prompt_04c49e071b3b3510d4e599f91d4bcb32
     3. x_radi_digi_actions_df1316471b3b3510d4e599f91d4bcbbb
     4. x_radi_digi_ai_prompt_70dd34541b07e150d4e599f91d4bcbe8
     5. sys_scope_privilege_645d00e11bf37510d1dca685ec4bcbbc - Could not find a record in sys_scope for column sys_scope referenced in this update	
     6. sys_scope_privilege_645d00e11bf37510d1dca685ec4bcbbc - Could not find a record in sys_scope for column source_scope referenced in this update	
     7. sys_scope_privilege_645d00e11bf37510d1dca685ec4bcbbc - Cannot commit Update Set 'Update Set Printer v2.0' because: Update scope id '43072c731ba22110d1dca685ec4bcbaa' is different than update set scope id 'global'. Resolve the problem before committing.	


### Versions
  * **v1.2** - Adds 'Print' button to display contents of Update Sets | Adds ability to select multiple Update Sets in list view | Adds functionality to consolidate Updates from multiple Update Sets into their respective types
  * **v1.3** - Fixed bug to print name of Flow / Subflows
  * **v2.0** - Added Functionality to toggle displaying Deleted Records, Option to dynamically display certain Types of Updates, Option to toggle showing Updates as Consolidated or Extended, Copy Data functionality, Integration with Digi to gather descriptions from AI
