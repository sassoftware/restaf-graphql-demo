# Utility Functions

---


<dl>
<dt><a href="#module_caslBase">caslBase</a> ⇒ <code>object</code></dt>
<dd><p>Calls cas server and returns the results</p>
</dd>
<dt><a href="#module_casSetup">casSetup</a> ⇒ <code>object</code></dt>
<dd><p>Creates a cas session and loads actionsets</p>
</dd>
<dt><a href="#module_casTableToJson">casTableToJson</a> ⇒ <code>object</code></dt>
<dd><p>Converts a cas table to form needed by graphql</p>
</dd>
<dt><a href="#module_computeSummary">computeSummary</a> ⇒ <code>object</code></dt>
<dd><p>Reduce the job information into consummable form</p>
</dd>
<dt><a href="#module_findReport">findReport</a> ⇒ <code>object</code></dt>
<dd><p>Search for a named report</p>
</dd>
<dt><a href="#module_getProgram">getProgram</a> ⇒ <code>string</code></dt>
<dd><p>Read sas or casl programs</p>
</dd>
<dt><a href="#module_getReportImage">getReportImage</a> ⇒ <code>string</code></dt>
<dd><p>Return the svg of the specified report</p>
</dd>
<dt><a href="#module_getReportUrl">getReportUrl</a> ⇒ <code>string</code></dt><dd><p>Generate url for report</p>
</dd>
<dt><a href="#module_getSASTableRows">getSASTableRows</a> ⇒ <code>object</code></dt>
<dd><p>Convert table to object of the form [{var1: value, var2: value,...},....]</p>
</dd>
<dt><a href="#module_getSelections">getSelections</a> ⇒ <code>object</code></dt>
<dd><p>getSelections - search the AST and get the specified selection set and
reduce</p>
</dd>
<dt><a href="#module_jsonToDict">jsonToDict</a> ⇒ <code>string</code></dt>
<dd><p>Produce a string with casl dictionary suitable for inclsion in casl code</p>
</dd>
<dt><a href="#module_logLines">logLines</a> ⇒ <code>string</code></dt>
<dd><p>Return log lines as html</p>
</dd>
<dt><a href="#module_runCompute">runCompute</a> ⇒ <code>object</code></dt>
<dd><p>Reduce compute service to an consummable form</p>
</dd>
<dt><a href="#module_spBase">spBase</a> ⇒ <code>object</code></dt>
<dd><p>Prepare data for runCompute</p>
</dd>
</dl>

<a name="module_caslBase"></a>

## caslBase ⇒ <code>object</code>
Calls cas server and returns the results

**Returns**: <code>object</code> - standard return value from apiCall

| Param | Type | Description |
| --- | --- | --- |
| store | <code>object</code> | restaf store |
| srcFiles | <code>object</code> | a list of sourcr file to read |
| args | <code>object</code> | args received from graphql server |
| env | <code>object</code> | app specific vales |

<a name="module_casSetup"></a>

## casSetup ⇒ <code>object</code>
Creates a cas session and loads actionsets

**Returns**: <code>object</code> - - rafObject of a cas session

| Param | Type | Description |
| --- | --- | --- |
| store | <code>object</code> | standard restaf store object |
| actionSets | <code>object</code> | array of actionSets to load |

<a name="module_casTableToJson"></a>

## casTableToJson ⇒ <code>object</code>
Converts a cas table to form needed by graphql

**Returns**: <code>object</code> - - the new json version

| Param | Type | Description |
| --- | --- | --- |
| result | <code>object</code> | the raf object retrned from a call to cas |
| table | <code>string</code> | the name of the table |

<a name="module_computeSummary"></a>

## computeSummary ⇒ <code>object</code>
Reduce the job information into consummable form

**Returns**: <code>object</code> - - the computeSmmary object

| Param | Type | Description |
| --- | --- | --- |
| store | <code>object</code> | restaf store |
| job | <code>object</code> | rafObject representing the compute service job |
<a name="module_findReport"></a>

## findReport ⇒ <code>object</code>
Search for a named report

**Returns**: <code>object</code> - - either null or rafObject for the report

| Param | Type | Description |
| --- | --- | --- |
| store | <code>object</code> | restaf store |
| name | <code>string</code> | name of the VA report |

<a name="module_getProgram"></a>

## getProgram ⇒ <code>string</code>
Read sas or casl programs

**Returns**: <code>string</code> - - string with the files content's concatenated

| Param | Type | Description |
| --- | --- | --- |
| store | <code>object</code> | restaf store |
| files | <code>object</code> | array of file names |

<a name="module_getReportImage"></a>

## getReportImage ⇒ <code>string</code>
Return the svg of the specified report

**Returns**: <code>string</code> - - the svg of the report

| Param | Type | Description |
| --- | --- | --- |
| store | <code>object</code> | restaf store |
| name | <code>string</code> | name of the report |

<a name="module_getReportUrl"></a>

## getReportUrl ⇒ <code>string</code>
Generate url for report

**Returns**: <code>string</code> - url for the report

| Param | Type | Description |
| --- | --- | --- |
| store | <code>object</code> | restaf store |
| name | <code>string</code> | name of report |

<a name="module_getSASTableRows"></a>

## getSASTableRows ⇒ <code>object</code>
Convert table to object of the form [{var1: value, var2: value,...},....]

**Returns**: <code>object</code> - - resulting json

| Param | Type | Description |
| --- | --- | --- |
| store | <code>object</code> | restaf store |
| computeSummary | <code>object</code> | computeSummary |
| tableName | <code>string</code> | name of the table |

<a name="module_getSelections"></a>

## getSelections ⇒ <code>object</code>
getSelections - search the AST and get the specified selection set and reduce

**Returns**: <code>object</code> - Contains the updated arg and selections object

| Param | Type | Description |
| --- | --- | --- |
| info | <code>object</code> | info(AST) sent by graphql server as the 4th parameter to the resolver |
| selectionSet | <code>string</code> | the set we are looking for |
| args | <code>object</code> | arguments sent by graphql to the resolver |

<a name="module_jsonToDict"></a>

## jsonToDict ⇒ <code>string</code>
Produce a string with casl dictionary suitable for inclsion in casl code

**Returns**: <code>string</code> - returns the string containing the casl dictionary

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>object</code> | the JS object of interest |
| name | <code>string</code> | the name to assign to the dictionary |

**Example**
```js
obj = {x: 1, b:2, c: ['a','b']};
 name ='_appEnv_';
 result is a string _appEnv_ = {x=2, b=3, c={"a', "b"}}
```
<a name="module_logLines"></a>

## logLines ⇒ <code>string</code>
Return log lines as html

**Returns**: <code>string</code> - log lines as HTML

| Param | Type | Description |
| --- | --- | --- |
| folder | <code>object</code> | raf Object for log lines |

<a name="module_runCompute"></a>

## runCompute ⇒ <code>object</code>
Reduce compute service to an consummable form

**Returns**: <code>object</code> - rafobject of the results from a sas compute job

| Param | Type | Description |
| --- | --- | --- |
| sore | <code>object</code> | restaf store |
| code | <code>code</code> | SAS code to be executed |

<a name="module_spBase"></a>

## spBase ⇒ <code>object</code>
Prepare data for runCompute

**Returns**: <code>object</code> - computeSummary object

| Param | Type | Description |
| --- | --- | --- |
| store | <code>object</code> | restaf store |
| args | <code>object</code> | args from graphql server(enhanced) |
| src | <code>string</code> | code to execute |


