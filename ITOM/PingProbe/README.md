How is works:

The ping command is kicked off via an ecc_queue record. Creating a new record with the “Agent” field populate with the MID Server of choice, the “Topic” field populated with “Command”, and finally the “Name” field with the actual ping command, will ping the device just as if you are manually doing it from the MID Server.

The response will show in the ecc_queue as well. If you filter the "Response to" field with the sys_id of the command record created you will find the response.

A UI action was created to show the list banner button "Ping Test" right next to the quick discovery button on the discovery schedules page. The UI action then opens a GlideDialogWindow which references a UI page. The UI page takes in the MID of choice and IP address. Once the user initiates the ping test a subflow is called from a script include. This creates the ping record and then waits for the response. Once the response is recieved it then returns a parsed response message.

How to use:

Navigate to the discovery schedules page. Click on the "Ping Test" button on the top right. Enter the MID Server you would like to ping from and the IP address you would like to ping. Click "OK". A notification message will display "Waiting for ping response...". The response will be displayed shortly after. Keep in mind the notification messages fade out after 10 seconds.
