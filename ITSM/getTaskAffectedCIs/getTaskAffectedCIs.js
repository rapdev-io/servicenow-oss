(function executeRule(current, previous /*null when async*/ ) {

    wipeAffectedCis(current.sys_id.toString());

    if (current.cmdb_ci.sys_class_name == "cmdb_ci_datacenter") {
        var dataCenterCis = getLocCis(current.cmdb_ci.location.sys_id.toString());
        linkCis(dataCenterCis, current.sys_id.toString());
    }
    var ci = current.getValue('cmdb_ci');
    var childrenArray = traverseChildrenTree(ci, [], 1);
    var parentArray = traverseParentTree(ci, [], 1);
    var concatenatedArray = childrenArray.concat(parentArray);
    linkCis(concatenatedArray, current.sys_id.toString());
    var ciListGr = new GlideRecord("task_ci");
    ciListGr.addQuery('task', current.sys_id.toString());
    ciListGr.addQuery('ci_item', ci);
    ciListGr.query();
    if (!ciListGr.next()) {
        ciListGr.initialize();
        ciListGr.ci_item = ci;
        ciListGr.task = current.sys_id.toString();
        ciListGr.insert();
    }

})(current, previous);

function getLocCis(loc) {
    var tables = getCiTables();
    var ciArray = [];
    var ciGr = new GlideRecord('cmdb_ci');
    ciGr.addQuery('location', loc);
    ciGr.addQuery('install_status', "!=", 6);
    ciGr.addQuery('install_status', "!=", 7);
    ciGr.query();
    while (ciGr.next()) {
        if (tables.indexOf(ciGr.sys_class_name.toString()) > -1) {
            if (ciArray.indexOf(ciGr.sys_id.toString()) == -1) {
                ciArray.push(ciGr.sys_id.toString());
            }
        }
    }
    return ciArray;
}

function traverseChildrenTree(ci, ciArray, currentDepth) {
    if (currentDepth > 3) {
        return ciArray;
    }
    var tables = getCiTables();
    var ciRelationship = "cmdb_rel_ci";
    var relationship = new GlideRecord(ciRelationship);
    relationship.addQuery('parent.sys_id', ci);
    relationship.addQuery('child', '!=', "");
    relationship.addQuery('child.install_status', "!=", 6);
    relationship.addQuery('child.install_status', "!=", 7);
    relationship.query();
    while (relationship.next()) {
        if (tables.indexOf(relationship.child.sys_class_name.toString()) > -1) {
            if (ciArray.indexOf(relationship.child.sys_id.toString()) == -1) {
                ciArray.push(relationship.child.sys_id.toString());
                traverseChildrenTree(relationship.child.sys_id.toString(), ciArray, currentDepth++);
            }
        }
    }
    return ciArray;
}

function traverseParentTree(ci, ciArray, currentDepth) {
    if (currentDepth > 3) {
        return ciArray;
    }
    var tables = getCiTables();
    var ciRelationship = "cmdb_rel_ci";
    var relationship = new GlideRecord(ciRelationship);
    relationship.addQuery('child.sys_id', ci);
    relationship.addQuery('parent', '!=', "");
    relationship.addQuery('parent.install_status', "!=", 6);
    relationship.addQuery('parent.install_status', "!=", 7);
    relationship.query();
    while (relationship.next()) {
        if (tables.indexOf(relationship.parent.sys_class_name.toString()) > -1) {
            if (ciArray.indexOf(relationship.parent.sys_id.toString()) == -1) {
                ciArray.push(relationship.parent.sys_id.toString());
                traverseParentTree(relationship.parent.sys_id.toString(), ciArray, currentDepth++);
            }
        }
    }
    return ciArray;
}

function linkCis(cis, taskID) {
    for (var i = 0; i < cis.length; i++) {
        var taskCi = new GlideRecord('task_ci');
        taskCi.initialize();
        taskCi.ci_item = cis[i];
        taskCi.task = taskID;
        taskCi.insert();
    }
}

function getCiTables() {
    var combinedTables = [];
    var application = "cmdb_ci_appl";
    combinedTables.push(application);
    var hardware = new TableUtils("cmdb_ci_hardware");
    var hardwareArray = hardware.getAllExtensions();
    for (var i = 0; i < hardwareArray.size(); i++) {
        combinedTables.push(JSON.stringify(hardwareArray.get(i)).replace(/"/g, ''));
    }
    var database = new TableUtils("cmdb_ci_db_instance");
    var databaseArray = database.getAllExtensions();
    for (var j = 0; j < databaseArray.size(); j++) {
        combinedTables.push(JSON.stringify(databaseArray.get(j)).replace(/"/g, ''));
    }
    return combinedTables;

}

function wipeAffectedCis(taskID) {
    var taskCi = new GlideRecord('task_ci');
    taskCi.addQuery('task', taskID);
    taskCi.setWorkflow(false);
    taskCi.deleteMultiple();

}
