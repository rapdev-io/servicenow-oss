(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
    
	var serviceAcc = new GlideRecord("cmdb_ci_cloud_service_account");
	var requestBody = JSON.parse(request.body.dataString);

	serviceAcc.name = requestBody.account_id;
	serviceAcc.account_id = requestBody.account_id;
	serviceAcc.datacenter_type = "cmdb_ci_aws_datacenter";
	
	//query for the accessor account
    if (requestBody.accessor_id){
		var accessor = new GlideRecord("cmdb_ci_cloud_service_account");
		accessor.addQuery("account_id", requestBody.accessor_id);
		accessor.query();
		if (accessor.next()){
			serviceAcc.accessor_account = accessor.sys_id;
		}
	}
    var serviceAccId= serviceAcc.insert();

	//if did not pass in an accessor account put itself as the accessor
	if (!serviceAcc.accessor_account){
		serviceAcc.accessor_account = serviceAccId;
		serviceAcc.update();
	}
	
	var assumeRole = new GlideRecord("cloud_service_account_aws_cross_assume_role_params");
	assumeRole.access_role_name = requestBody.access_role_name;
	assumeRole.role_session_name = requestBody.access_role_name;
	assumeRole.cloud_service_account = serviceAccId;
	if (requestBody.external_id){
		assumeRole.external_id = requestBody.external_id;
	}
	assumeRole.insert();
	
	var validSchedule = false;
	if (requestBody.schedule_name){
		var gr = new GlideRecord("discovery_schedule");
		gr.addQuery("name", requestBody.schedule_name);
		gr.query();
		if (gr.next()){
			validSchedule = true;
		}
	}
		
	if (validSchedule){
		//create the discovery schedule config
		var gr2 = new GlideRecord("discovery_schedule");
		gr2.addQuery("name", requestBody.schedule_name);
		gr2.query();
		if (gr.next()){
			//insert in discovery config table
			var newConfig = new GlideRecord("cmp_discovery_ldc_config");
			newConfig.discovery_schedule = gr2.sys_id;
			newConfig.service_account = serviceAccId;
			newConfig.active = true;
			newConfig.insert();
		}
		
	}
	else{
		//regular schedule
		var discoverySchedule = new GlideRecord("discovery_schedule");
		if (requestBody.schedule_name)
			discoverySchedule.name = requestBody.schedule_name;
		else
			discoverySchedule.name = "AWS Discovery " + requestBody.account_id;
		discoverySchedule.discover = "Cloud Resources";
		discoverySchedule.active = false;
		discoverySchedule.disco_run_type = "weekly";
		discoverySchedule.mid_select_method = "auto_select";
		discoverySchedule.sys_scope = "Global";
		var scheduleId = discoverySchedule.insert();
		
		//vm schedule
		var discoveryScheduleVM = new GlideRecord("discovery_schedule");
		if (requestBody.schedule_name)
			discoverySchedule.name = requestBody.schedule_name+ "- VM Schedule";
		else
			discoverySchedule.name = "AWS Discovery " + requestBody.account_id + "- VM Schedule";
		discoveryScheduleVM.discover = "CIs";
		discoveryScheduleVM.active = false;
		discoveryScheduleVM.run_type = "weekly";
		discoveryScheduleVM.disco_run_type = "after_discovery";
		discoveryScheduleVM.service_discovery = "ci_type";
		discoveryScheduleVM.sys_scope = "Global";
		discoveryScheduleVM.mid_select_method = "auto_select";
		discoveryScheduleVM.run_after = scheduleId;
		var scheduleIdVM = discoveryScheduleVM.insert();
		
		//set vm run field
		var discoSchedule2 = new GlideRecord("discovery_schedule");
		discoSchedule2.get(scheduleId);
		discoSchedule2.vm_run = scheduleIdVM;
		discoSchedule2.update();

		//discovery schedule config table
		var config = new GlideRecord("cmp_discovery_ldc_config");
		config.discovery_schedule = scheduleId;
		config.service_account = serviceAccId;
		config.active = true;
		config.insert();
	
	}
	//discover datacenters for new service account
	var scheduleConfig = new global.CloudDiscoveryScheduleConfig();
	var result = {};
	try {
		result = scheduleConfig.discoverDatacenters(serviceAccId);
		return 200;
	} catch(err) {
		gs.log("***AWS ENDPOINT ERROR*** " + err);
		result.error = err;
		return 500;
	}
	


	
})(request, response);
