# YAML to JSON Converter

The base application is the ***YAML JSON Conversion*** update set.

## How to use:
```
var myObject = new x_radi_yaml_json.Yaml().parse('some: yaml'); //input must be a string containing YAML; returns a JSON object
gs.info(JSON.stringify(myObject));
```

### Example REST call to get a YAML file stored in GitHub
```
var request = new sn_ws.RESTMessageV2();
request.setHttpMethod("GET");
request.setBasicAuth("user","pass");
request.setEndpoint("https://api.github.com/repos/:owner/:repo/contents/:path");
request.setRequestHeader("accept","application/json");
var run = request.execute();
var body = run.getBody();
var bodyParsed = JSON.parse(body);
var content = bodyParsed.content.toString();
//var decoded = GlideStringUtil.base64Decode(content) //call from global scope
//var decoded = gs.base64Decode(content); //call from scoped app
var decodedString = JSON.stringify(decoded);
decodedString = decodedString.substring(1, decodedString.length-1);
var obj = new x_radi_yaml_json.Yaml().parse(decodedString);
```

### Credits
-[jeremyfa](https://github.com/jeremyfa) for base code
