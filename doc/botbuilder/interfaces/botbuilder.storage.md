[Bot Builder SDK](../README.md) > [Storage](../interfaces/botbuilder.storage.md)



# Interface: Storage


:package: **botbuilder-core-extensions**

Interface for a store provider that stores and retrieves objects.

## Implemented by

* [BrowserLocalStorage](../classes/botbuilder.browserlocalstorage.md)
* [BrowserSessionStorage](../classes/botbuilder.browsersessionstorage.md)
* [MemoryStorage](../classes/botbuilder.memorystorage.md)


## Methods
<a id="delete"></a>

###  delete

► **delete**(keys: *`string`[]*): `Promise`.<`void`>



*Defined in [libraries/botbuilder-core-extensions/lib/storage.d.ts:39](https://github.com/Microsoft/botbuilder-js/blob/09ad751/libraries/botbuilder-core-extensions/lib/storage.d.ts#L39)*



Removes store items from storage


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| keys | `string`[]   |  Array of item keys to remove from the store. |





**Returns:** `Promise`.<`void`>





___

<a id="read"></a>

###  read

► **read**(keys: *`string`[]*): `Promise`.<[StoreItems](botbuilder.storeitems.md)>



*Defined in [libraries/botbuilder-core-extensions/lib/storage.d.ts:27](https://github.com/Microsoft/botbuilder-js/blob/09ad751/libraries/botbuilder-core-extensions/lib/storage.d.ts#L27)*



Loads store items from storage


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| keys | `string`[]   |  Array of item keys to read from the store. |





**Returns:** `Promise`.<[StoreItems](botbuilder.storeitems.md)>





___

<a id="write"></a>

###  write

► **write**(changes: *[StoreItems](botbuilder.storeitems.md)*): `Promise`.<`void`>



*Defined in [libraries/botbuilder-core-extensions/lib/storage.d.ts:33](https://github.com/Microsoft/botbuilder-js/blob/09ad751/libraries/botbuilder-core-extensions/lib/storage.d.ts#L33)*



Saves store items to storage.


**Parameters:**

| Param | Type | Description |
| ------ | ------ | ------ |
| changes | [StoreItems](botbuilder.storeitems.md)   |  Map of items to write to storage. |





**Returns:** `Promise`.<`void`>





___


