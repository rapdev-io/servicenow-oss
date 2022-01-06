# RapCache
Bring a quick and easy to use key-value pair caching mechanism to your ServiceNow Platform  
Usable within the platform and externally via API

## Purpose
ServiceNow added a key value pair column type. But haven't given us a convenient way to take advantage of key value pairs and for good reason, a key value store is not exactly what ServiceNow intends to be as it remains a kickass RDBMS.   
But there are many uses of a caching mechanism or a kv store. Especially in distributed systems. All ServiceNow implementations are integration hubs and data is flying across it at all times.  
ServiceNow has a great internal event driven framework which enables multi-threading. With a good caching system, you might just be able to coordinate communication accross a master orchestration job and some workers.

## Overview
The RapCache App consists of the following important objects:  
1) Cache Table and a Column
2) Script Include
3) Scripted Rest Service with resources
4) A safety mechanism to delete old caches because... Developers

## Install
After Installing the App, you are ready to start poking around.

### Create a Cache  

#### In ServiceNow
```
var c = new RapCache().init();
/* then check your table for the cache */
```

#### In Python
```
import requests
url = 'https://{instance-name}.service-now.com/api/x_266114_rap_cache/v1/init'
response = requests.post(url, auth=('user', 'pwd'), headers={"Content-Type":"application/json","Accept":"application/json"})
print(response.text)
```

### Setting Key-Value Pairs
In ServiceNow
```
/* 
Using the cache you just created - go grab the sys_id 
You dont always need to set() the cache. As RapCache() is contructed the initialized cache is set(
The set() is for when you know a cache is already there
*/
var c = new RapCache();
c.set('bb6ad16e2fb80110a972a55df699b69d'); //sets the current cache
c.edit('boom','{"bestShow":"GameOfThrones"}');
```
Now we can go retreive that value with this
```
gs.info(c.get('boom'));
/* or if think a different show is better... */
var kv = c.get('boom');
var obj = JSON.parse(kv);
obj["best_show"] = "Breaking Bad";
/* then commit your statement to the cache */
c.edit('boom',JSON.stringify(obj));
```
Its convenient to throw many kv paires into a single referrable cache
```
/* lets add a couple more */
var c = new RapCache();
c.set('bb6ad16e2fb80110a972a55df699b69d'); //sets the current cache
c.edit('shakalaka','{"bestMovie":"The Departed"}');
c.edit('chikadabang','{"bestSong":"Roar"}');
/* Then we can get all the kv Pairs with this */
var pairs = c.getAll();
gs.info(pairs);

/* Then do things with the values*/
for(var key in pairs) {
    gs.info(key + " = " + pairs[key]);
}
```

### Cleaning things up
```
var c = new RapCache();
c.set('bb6ad16e2fb80110a972a55df699b69d');
c.clear();
```

### Performance

It takes less than 20 seconds to fumnble around with 1000 cache's.  
Since, by design we are not searching by key, but ever only searching by sys_id of a cache then there is no table scanning.
```
var i = 0;
var c = new RapCache();
while( i < 1000){
  i++
  c.init();
  c.edit('boom','{"prop1":"val1"}');
}
```
