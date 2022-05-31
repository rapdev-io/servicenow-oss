<h3>How it works:</h3>
The flow action "Find Next Open Change Window" will take in as inputs a change reference, and a number of hours into the future to look for a window without conflicts. 

It will output a boolean that will be true if no window is found to deploy the change within the number of hours provided as input, and a basic date/time that reflects the new start date on the change. 


This works by calling the baseline conflict detector, and iterating the start and end dates of the change until no conflicts are found for the period between those dates.

<h3>How to use</h3>

After applying the update set, the new Global flow action "Find Next Open Change Window" will be available to use in Flow Designer. 


In a flow operating against a change, this action can be inserted at any point where the change conflict detector can be used. The "Change" input should be a reference to an active change request, and "Hours" should be a positive integer.


If you would like to iterate in chunks of time greater or less than one hour, this can be changed in the script step, by adjusting the number of seconds to add to the current time in the loop.
