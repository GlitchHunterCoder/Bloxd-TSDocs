/**
 * Called every tick, 20 times per second
 * @param ms - The fixed timestep, can be used as "milliseconds since last tick"
 */
declare var tick: (ms: number) => void

/**
 * Called when the lobby is shutting down
 * @param serverIsShuttingDown - Whether the server is shutting down
 */
declare var onClose: (serverIsShuttingDown: boolean) => void

/**
 * Called when a player joins the lobby
 * @param playerId - The id of the player that joined
 * @param fromGameReset - Whether this call is from a game reset (used by SessionBasedGame)
 */
declare var onPlayerJoin: (playerId: string, fromGameReset: boolean) => void

/**
 * Called when a player leaves the lobby
 * @param playerId - The id of the player that left
 * @param serverIsShuttingDown - Whether the server is shutting down
 */
declare var onPlayerLeave: (playerId: string, serverIsShuttingDown: boolean) => void

/**
 * Called when a player jumps
 * @param playerId - The id of the player that jumped
 */
declare var onPlayerJump: (playerId: string) => void

/**
 * Called when a player requests to respawn.
 * Optionally return the respawn location. Defaults to [0, 0, 0].
 * Return true to handle yourself (good for async,
 * but be careful that the player isn't at the place they died,
 * as they could pick up their old items or hit the player they were fighting).
 * @param playerId - The id of the player that requested to respawn
 */
declare var onRespawnRequest: (playerId: string) => true | void | number[]

/**
 * Called when a player sends a command
 * @param playerId - The id of the player that sent the command
 * @param command - The command that the player sent
 */
declare var playerCommand: (playerId: string, command: string) => boolean

/**
 * Called when a player sends a chat message
 * Return false or null to prevent the broadcast of the message.
 * Return a string or CustomTextStyling to add a prefix to message.
 * Return for most flexibility: an object where keys are playerIds -
 * the value for a playerId being false means that player won't receive the message.
 * Otherwise playerId values should be an object with (optional) keys
 * prefixContent and chatContent to modify the prefix and the chat.
 * CustomTextStyling[] prefixContent is expected, e.g. [["prefix"]] or [[{ str: "prefix" }]].
 * World code is not permitted to specify chatContent, it will be ignored.
 * @param playerId - The id of the player that sent the message
 * @param chatMessage - The message that the player sent
 * @param channelName - The name of the channel that the message was sent in
 */
declare var onPlayerChat: (playerId: PlayerId, chatMessage: string, channelName?: string) => boolean | void | ChatTags | OnPlayerChatObjectResponse

/**
 * Called when a player changes a block
 * Return "preventChange" to prevent the change.
 * If player places block, fromBlock will be Air (and toBlock the block).
 * If a player breaks a block, toBlock will be Air.
 * Return "preventDrop" to prevent a block item from dropping.
 * Return an array to set the dropped item position.
 */
declare var onPlayerChangeBlock: (playerId: PlayerId, x: number, y: number, z: number, fromBlock: BlockName, toBlock: BlockName, droppedItem: BlockName | null, fromBlockInfo: MultiBlockInfo, toBlockInfo: MultiBlockInfo) => void | [number, number, number] | "preventChange" | "preventDrop"

/**
 * Called when a player drops an item
 * Return "preventDrop" to prevent the player from dropping the item at all.
 * Return "allowButNoDroppedItemCreated" to allow discarding items without dropping them.
 */
declare var onPlayerDropItem: (playerId: PlayerId, x: number, y: number, z: number, itemName: ItemName, itemAmount: number, fromIdx: number) => void | "preventDrop" | "allowButNoDroppedItemCreated"

/**
 * Called when a player picks up an item
 * @param playerId - The id of the player that picked up the item
 * @param itemName - The name of the item that was picked up
 * @param itemAmount - The amount of the item that was picked up
 */
declare var onPlayerPickedUpItem: (playerId: PlayerId, itemName: string, itemAmount: number) => void

/**
 * Called when a player selects a different inventory slot.
 * This will be called eventually when you have already set the slot using
 * api.setSelectedInventorySlotI so be careful not to cause an infinite loop doing this.
 * @param playerId - The id of the player that selected the inventory slot
 * @param slotIndex - The index of the inventory slot that was selected
 */
declare var onPlayerSelectInventorySlot: (playerId: PlayerId, slotIndex: number) => void

/**
 * Called when a player stands on a block
 */
declare var onBlockStand: (playerId: PlayerId, x: number, y: number, z: number, blockName: BlockName) => void

/**
 * Called when a player attempts to craft an item
 * Return "preventCraft" to prevent a craft from happening
 * @param playerId - The id of the player that is attempting to craft the item
 * @param itemName - The name of the item that is being crafted
 * @param craftingIdx - The index of the used recipe in the item's recipe list
 * @param craftTimes - The number of times the craft recipe is used at once (e.g. shift held while crafting)
 */
declare var onPlayerAttemptCraft: (playerId: PlayerId, itemName: string, craftingIdx: number, craftTimes: number) => void | "preventCraft"

/**
 * Called when a player crafts an item
 * @param playerId - The id of the player that crafted the item
 * @param itemName - The name of the item that was crafted
 * @param craftingIdx - The index of the used recipe in the item's recipe list
 * @param recipe - The recipe that was used to craft the item
 * @param craftTimes - The number of times the craft recipe is used at once (e.g. shift held while crafting)
 */
declare var onPlayerCraft: (playerId: PlayerId, itemName: string, craftingIdx: number, recipe: RecipesForItem[number], craftTimes: number) => void

/**
 * Called when a player attempts to open a chest
 * Return "preventOpen" to prevent the player from opening the chest
 */
declare var onPlayerAttemptOpenChest: (playerId: PlayerId, x: number, y: number, z: number, isMoonstoneChest: boolean, isIronChest: boolean) => void | "preventOpen"

/**
 * Called when a player opens a chest
 */
declare var onPlayerOpenedChest: (playerId: PlayerId, x: number, y: number, z: number, isMoonstoneChest: boolean, isIronChest: boolean) => void

/**
 * Called when a player moves an item out of their inventory
 * Return "preventChange" to prevent the movement
 */
declare var onPlayerMoveItemOutOfInventory: (playerId: PlayerId, itemName: string, itemAmount: number, fromIdx: number, movementType: string) => void | "preventChange"

/**
 * Called for all types of inventory item movement.
 * Certain methods of moving item can result in splitting a stack
 * into multiple slots. (e.g. shift-click).
 * toStartIdx and toEndIdx provide the min and max idxs moved into.
 * Return "preventChange" to prevent item movement.
 */
declare var onPlayerMoveInvenItem: (playerId: PlayerId, fromIdx: number, toStartIdx: number, toEndIdx: number, amt: number) => void | "preventChange"

/**
 * Called when a player moves an item into an index within a range of inventory slots
 * Return "preventChange" to prevent the movement
 */
declare var onPlayerMoveItemIntoIdxs: (playerId: PlayerId, start: number, end: number, moveIdx: number, itemAmount: number) => void | "preventChange"

/**
 * Return "preventChange" to prevent the swap
 * @param playerId - The id of the player swapping the inventory slots
 * @param i - The index of the first slot
 * @param j - The index of the second slot
 */
declare var onPlayerSwapInvenSlots: (playerId: PlayerId, i: number, j: number) => void | "preventChange"

/**
 * Return "preventChange" to prevent the movement
 * @param playerId - The id of the player moving the item
 * @param i - The index of the first slot
 * @param j - The index of the second slot
 * @param amt - The amount of the item being moved
 */
declare var onPlayerMoveInvenItemWithAmt: (playerId: PlayerId, i: number, j: number, amt: number) => void | "preventChange"

/**
 * Called when player alt actions (right click on pc).
 * The co-ordinates will be undefined if there is no targeted block (and block will be "Air")
 * Some actions can be prevented by returning "preventAction",
 * but this may not work as well for certain actions which the game client predicts to succeed -
 * test it to see if it works for your use case, feel free to report any broken ones.
 */
declare var onPlayerAttemptAltAction: (playerId: PlayerId, x: number, y: number, z: number, block: BlockName, targetEId: EntityId | null) => void | "preventAction"

/**
 * Called when player completes an alt action (right click on pc).
 * The co-ordinates will be undefined if there is no targeted block (and block will be "Air")
 */
declare var onPlayerAltAction: (playerId: PlayerId, x: number, y: number, z: number, block: BlockName, targetEId: EntityId | null) => void

/**
 * Called when a player clicks
 * Don't have important functionality depending on wasAltClick,
 * as it'll always be false for touchscreen players.
 */
declare var onPlayerClick: (playerId: PlayerId, wasAltClick: boolean, x: number, y: number, z: number, block: BlockName, targetEId: EntityId | null) => void

/**
 * Called when a client option is updated
 * @param playerId - The id of the player whose option was updated
 * @param option - The option that was updated
 * @param value - The new value of the option, always null for custom code
 */
declare var onClientOptionUpdated: (playerId: PlayerId, option: ClientOption, value: any) => void

/**
 * Called when a mob setting is updated
 * @param mobId - The id of the mob whose setting was updated
 * @param setting - The setting that was updated
 * @param value - The new value of the setting
 */
declare var onMobSettingUpdated: (mobId: MobId, setting: MobSetting, value: any) => void

/**
 * Called when a player's inventory is updated
 * @param playerId - The id of the player whose inventory was updated
 */
declare var onInventoryUpdated: (playerId: PlayerId) => void

/**
 * Called when a chest is updated by a player
 * x, y, z, will be null if isMoonstoneChest is true
 */
declare var onChestUpdated: (initiatorEId: PlayerId, isMoonstoneChest: boolean, x: number | null, y: number | null, z: number | null) => void

/**
 * Called when a block is changed in the world
 * initiatorDbId is null if updated by game code e.g. when a sapling grows
 * Return "preventChange" to prevent change
 * Return "preventDrop" to prevent a block item from dropping
 */
declare var onWorldChangeBlock: (x: number, y: number, z: number, fromBlock: BlockName, toBlock: BlockName, initiatorDbId: string | null, extraInfo: WorldBlockChangedInfo) => void | "preventChange" | "preventDrop"

/**
 * Called when a mesh entity is created
 * @param eId - The id of the mesh entity
 * @param type - The type of mesh entity
 * @param initiatorId - The id of the entity that created the mesh entity, if any
 */
declare var onCreateBloxdMeshEntity: (eId: EntityId, type: string, initiatorId: EntityId | null) => void

/**
 * Called when a entity collides with another entity
 * @param eId - The id of the entity
 * @param otherEId - The id of the other entity
 */
declare var onEntityCollision: (eId: EntityId, otherEId: EntityId) => void

/**
 * Called when a player attempts to spawn a mob, e.g. using a spawn orb.
 * Return "preventSpawn" to prevent the mob from spawning.
 */
declare var onPlayerAttemptSpawnMob: (playerId: PlayerId, mobType: MobType, x: number, y: number, z: number) => void | "preventSpawn"

/**
 * Called when the world attempts to spawn a mob.
 * Return "preventSpawn" to prevent the mob from spawning.
 * @param mobType - The type of mob
 * @param x - The potential x coordinate of the mob
 * @param y - The potential y coordinate of the mob
 * @param z - The potential z coordinate of the mob
 */
declare var onWorldAttemptSpawnMob: (mobType: MobType, x: number, y: number, z: number) => void | "preventSpawn"

/**
 * Called when a mob is spawned by a player
 */
declare var onPlayerSpawnMob: (playerId: PlayerId, mobId: MobId, mobType: MobType, x: number, y: number, z: number, mobHerdId: MobHerdId, playSoundOnSpawn: boolean) => void

/**
 * Called when a mob is spawned by the world
 */
declare var onWorldSpawnMob: (mobId: MobId, mobType: MobType, x: number, y: number, z: number, mobHerdId: MobHerdId, playSoundOnSpawn: boolean) => void

/**
 * Called when a mob is despawned by the world.
 * Return "preventDespawn" to prevent the mob from despawning.
 * @param mobId - The id of the mob despawned
 */
declare var onWorldAttemptDespawnMob: (mobId: MobId) => void | "preventDespawn"

/**
 * Called when a mob is despawned
 * @param mobId - The id of the mob despawned
 */
declare var onMobDespawned: (mobId: MobId) => void

/**
 * Called when a player attacks another player
 * @param playerId - The id of the player attacking
 */
declare var onPlayerAttack: (playerId: string) => void

/**
 * Called when a player is damaging another player
 * Return "preventDamage" to prevent damage
 * Return number to change damage dealt to that amount
 * Sometimes the damager will have left the game (e.g. spikes placer);
 * in this case, attackingPlayer will be the damagedPlayer,
 * but we pass damagerDbId for use cases where it's important.
 */
declare var onPlayerDamagingOtherPlayer: (attackingPlayer: PlayerId, damagedPlayer: PlayerId, damageDealt: number, withItem: string, bodyPartHit: LifeformBodyPart, damagerDbId: PlayerDbId) => number | void | "preventDamage"

/**
 * Called when a player is damaging a mob
 * Return "preventDamage" to prevent damage
 * Return number to change damage dealt to that amount
 */
declare var onPlayerDamagingMob: (playerId: PlayerId, mobId: MobId, damageDealt: number, withItem: string, damagerDbId: PlayerDbId) => number | void | "preventDamage"

/**
 * Called when a mob is damaging a player
 * Return "preventDamage" to prevent damage
 * Return number to change damage dealt to that amount
 * @param attackingMob the id of the mob damaging the player
 * @param damagedPlayer the id of the player being damaged
 * @param damageDealt the amount of damage dealt
 * @param withItem the item used to attack
 */
declare var onMobDamagingPlayer: (attackingMob: MobId, damagedPlayer: PlayerId, damageDealt: number, withItem: string) => number | void | "preventDamage"

/**
 * Called when a mob is damaging another mob
 * Return "preventDamage" to prevent damage
 * Return number to change damage dealt to that amount
 * @param attackingMob the id of the mob attacking
 * @param damagedMob the id of the mob being damaged
 * @param damageDealt the amount of damage dealt
 * @param withItem the item used to attack
 */
declare var onMobDamagingOtherMob: (attackingMob: MobId, damagedMob: MobId, damageDealt: number, withItem: string) => number | void | "preventDamage"

/**
 * Called when a player is about to be killed
 * Return "preventDeath" to prevent the player from being killed
 * @param killedPlayer - The id of the player being killed
 * @param attackingLifeform - The optional id of the lifeform attacking the player
 */
declare var onAttemptKillPlayer: (killedPlayer: PlayerId, attackingLifeform?: LifeformId) => void | "preventDeath"

/**
 * Called when a player kills another player
 * Return "keepInventory" to not drop the player's inventory
 * @param attackingPlayer - The id of the player attacking
 * @param killedPlayer - The id of the player killed
 * @param damageDealt - The amount of damage dealt
 * @param withItem - The item used to attack
 */
declare var onPlayerKilledOtherPlayer: (attackingPlayer: string, killedPlayer: string, damageDealt: number, withItem: string) => void | "keepInventory"

/**
 * Called when a mob kills a player
 * Return "keepInventory" to not drop the player's inventory
 * @param attackingMob - The id of the mob attacking
 * @param killedPlayer - The id of the player killed
 * @param damageDealt - The amount of damage dealt
 * @param withItem - The item used to attack
 */
declare var onMobKilledPlayer: (attackingMob: any, killedPlayer: any, damageDealt: any, withItem: any) => void | "keepInventory"

/**
 * Called when a player kills a mob
 * Return "preventDrop" to prevent the mob from dropping items
 */
declare var onPlayerKilledMob: (playerId: PlayerId, mobId: MobId, damageDealt: number, withItem: string) => void | "preventDrop"

/**
 * Called when a mob kills another mob
 * Return "preventDrop" to prevent the mob from dropping items
 * @param attackingMob - The id of the mob attacking
 * @param killedMob - The id of the mob killed
 * @param damageDealt - The amount of damage dealt
 * @param withItem - The item used to attack
 */
declare var onMobKilledOtherMob: (attackingMob: MobId, killedMob: MobId, damageDealt: number, withItem: string) => void | "preventDrop"

/**
 * Called when a player is affected by a new potion effect
 * @param initiatorId - The id of the player who initiated the potion effect
 * @param targetId - The id of the player who has started being affected
 * @param effectName - The name of the potion effect
 */
declare var onPlayerPotionEffect: (initiatorId: string, targetId: string, effectName: "Damage" | "Speed" | "Damage Reduction" | "Invisible" | "Jump Boost" | "Knockback" | "Poisoned" | "Slowness" | "Weakness" | "Cleansed" | "Instant Damage" | "Health Regen" | "Instant Health" | "Haste" | "Shield" | "Double Jump" | "Heat Resistance" | "Thief" | "X-Ray Vision" | "Mining Yield" | "Brain Rot" | "Aura" | "Wall Climbing" | "Air Walk" | "Pickpocketer" | "Lifesteal" | "Bounciness" | "Blindness" | "Poopy") => void | "preventEffect"

/**
 * Called when a player is damaging a mesh entity
 */
declare var onPlayerDamagingMeshEntity: (playerId: PlayerId, damagedId: EntityId, damageDealt: number, withItem: string) => void

/**
 * Called when a player breaks a mesh entity
 * @param playerId - The id of the player breaking the mesh entity
 * @param entityId - The id of the mesh entity being broken
 */
declare var onPlayerBreakMeshEntity: (playerId: PlayerId, entityId: EntityId) => void

/**
 * Called when a player uses a throwable item
 */
declare var onPlayerUsedThrowable: (playerId: PlayerId, throwableName: ThrowableItem, thrownEntityId: EntityId) => void

/**
 * Called when a player's thrown projectile hits the terrain
 */
declare var onPlayerThrowableHitTerrain: (playerId: PlayerId, throwableName: ThrowableItem, thrownEntityId: EntityId) => void

/**
 * Set client option `touchscreenActionButton` to take effect
 * Called when a player presses the touchscreen action button
 * Called for both touchDown and touchUp
 * @param playerId - The id of the player pressing the touchscreen action button
 * @param touchDown - Whether the touchscreen action button was pressed or released
 */
declare var onTouchscreenActionButton: (playerId: PlayerId, touchDown: boolean) => void

/**
 * Called when a player claims a task
 * @param playerId - The id of the player claiming the task
 * @param taskId - The id of the task being claimed
 * @param isPromoTask - Whether the task is a promo task
 * @param claimedRewards - The rewards claimed by the player
 */
declare var onTaskClaimed: (playerId: string, taskId: any, isPromoTask: any, claimedRewards: any) => any

/**
 * Called when a chunk is first loaded
 * API Methods that modify the chunk like setBlock cannot be used here to make
 * persisted changes, and will introduce client-server desync most cases,
 * but might have some creative uses if you know what you're doing.
 * For most use cases, consider using another callback e.g. tick.
 * @param chunkId - The id of the chunk being loaded
 * @param chunk - The chunk being loaded, which can be modified by this callback
 * For world code callbacks this value will always be null.
 * @param wasPersistedChunk - Whether the chunk was persisted
 */
declare var onChunkLoaded: (chunkId: string, chunk: LoadedChunk, wasPersistedChunk: boolean) => void

/**
 * Called when a player requests a chunk
 */
declare var onPlayerRequestChunk: (playerId: PlayerId, chunkX: number, chunkY: number, chunkZ: number, chunkId: string) => void

/**
 * Called when an item drop is created
 */
declare var onItemDropCreated: (itemEId: EntityId, itemName: string, itemAmount: number, x: number, y: number, z: number) => void

/**
 * Called when a player starts charging an item
 * @param playerId - The id of the player charging the item
 * @param itemName - The name of the item being charged
 */
declare var onPlayerStartChargingItem: (playerId: PlayerId, itemName: string) => void | "preventCharge"

/**
 * Called when a player finishes charging an item
 */
declare var onPlayerFinishChargingItem: (playerId: PlayerId, used: boolean, itemName: string, duration: number) => void


declare var onPlayerFinishQTE: (playerId: PlayerId, qteId: QTERequestId, result: boolean) => void

/**
 * Called after a player successfully buys a shop item
 * @param playerId - The id of the player that bought the item
 * @param categoryKey - The shop category key
 * @param itemKey - The shop item key
 * @param item - The resolved shop item (with per-player overrides applied, internal properties stripped)
 * @param userInput - The user input provided, if the item has a userInput config
 */
declare var onPlayerBoughtShopItem: (playerId: PlayerId, categoryKey: ShopCategoryKey, itemKey: ShopItemKey, item: BoughtShopItem, userInput?: string) => void

/**
 * Called every so often.
 * You should save custom db values/s3 objects here.
 * Persisted items ARE saved on graceful shutdown (e.g. uncaught error, update, etc),
 * but this helps prevent large data-loss on non-graceful shutdowns.
 */
declare var doPeriodicSave: () => void
