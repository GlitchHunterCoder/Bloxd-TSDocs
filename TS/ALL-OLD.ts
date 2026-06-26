
/** The ID of the player running the code.
 *
 * Lobby code usually has nobody running it, so this is null.
 */
declare const myId: string | null
/** The position of the code block or press to code board */
declare const thisPos: [number, number, number]
/** The owner of the current custom lobby */
declare const lobbyOwnerId: string | null

interface Console {
	/** Log a message to chat. */
	log(message: string): void
}
declare const console: Console

interface GameApi {
	/** The ID of the player running the code.
	 *
	 * Lobby code usually has nobody running it, so this is null.
	 */
	myId: string | null
	/** The position of the code block or press to code board */
	thisPos: [number, number, number]
	/** The owner of the current custom lobby */
	lobbyOwnerId: string | null
	/**
 * Get position of a player / entity.
 * @param entityId
 */
getPosition(entityId: EntityId): Pos
/**
 * Set position of a player / entity.
 * @param entityId
 * @param x Can also be an array, in which case y and z shouldn't be passed
 * @param y
 * @param z
 */
setPosition(entityId: EntityId, x: number | number[], y?: number, z?: number): void
/**
 * Get the scale of a lifeform.
 * @param lifeformId
 */
getLifeformScale(lifeformId: LifeformId): number
/**
 * Set the visual + physical scale of a lifeform. A scale of 1 is the default size,
 *
 * @param lifeformId
 * @param scale Must be a finite positive number.
 */
setLifeformScale(lifeformId: LifeformId, scale: number): void
/**
 * Get all the player ids.
 */
getPlayerIds(): PlayerId[]
/**
 * Whether a player is currently in the game
 *
 * @param playerId
 */
playerIsInGame(playerId: PlayerId): boolean
/**
 * @param playerId
 * @returns
 */
playerIsLoggedIn(playerId: PlayerId): boolean
/**
 * Returns the party that the player was in when they joined the game. The returned object contains the playerDbIds, as well
 * as the playerIds if available, of the party leader and members.
 *
 * @param playerId
 * @returns
 */
getPlayerPartyWhenJoined(playerId: PlayerId): PNull<{ partyCode: string; playerDbIds: PlayerDbId[] }>
/**
 * Get the number of players in the room
 */
getNumPlayers(): number
/**
 * Get the co-ordinates of the blocks the player is standing on as a list. For example, if the center of the player is at 0,0,0
 * this function will return [[0, -1, 0], [-1, -1, 0], [0, -1, -1], [-1, -1, -1]]
 * If the player is just standing on one block, the function would return e.g. [[0, 0, 0]]
 * If the player is middair then returns an empty list [].
 *
 * @param playerId
 */
getBlockCoordinatesPlayerStandingOn(playerId: PlayerId): number[][]
/**
 * Get the types of block the player is standing on
 * For example, if a player is standing on 4 dirt blocks, this will return ["Dirt", "Dirt", "Dirt", "Dirt"]
 * @param playerId
 */
getBlockTypesPlayerStandingOn(playerId: PlayerId): any[]
/**
 * Get the up to 12 unit co-ordinates the lifeform is located within
 * (A lifeform is modelled as having four corners and can be in up to 3 blocks vertically)
 *
 * @param lifeformId
 * @returns List of x, y, z positions e.g. [[-1, 0, 0], [-1, 1, 0], [-1, 2, 0]]
 */
getUnitCoordinatesLifeformWithin(lifeformId: LifeformId): number[][]
/**
 * Show the shop tutorial for a player. Will not be shown if they have ever seen the shop tutorial in your game before.
 * @param playerId
 */
showShopTutorial(playerId: PlayerId): void
/**
 * Get the current shield of an entity.
 * @param entityId
 */
getShieldAmount(entityId: EntityId): number
/**
 * Set the current shield of a lifeform.
 *
 * @param lifeformId
 * @param newShieldAmount
 */
setShieldAmount(lifeformId: LifeformId, newShieldAmount: number): void
/**
 * Get the current health of an entity.
 * @param entityId
 */
getHealth(entityId: PlayerId): number
/**
 * @param lifeformId
 * @param changeAmount Must be an integer. A positive amount will increase the entity's health. A negative amount will decrease the entity's shield first, then their health.
 * @param whoDidDamage Optional - If damage done by another player
 * @param broadcastLifeformHurt
 *
 * @return Whether the entity was killed
 */
applyHealthChange(lifeformId: LifeformId, changeAmount: number, whoDidDamage?: LifeformId | { lifeformId: LifeformId; withItem: string }, broadcastLifeformHurt?: boolean): boolean
/**
 * Set the current health of an entity.
 * If you want to set their health to more than their current max health, the optional increaseMaxHealthIfNeeded must be true.
 *
 * @param entityId
 * @param newHealth Can be null to make the player not have health
 * @param whoDidDamage Optional
 * @param increaseMaxHealthIfNeeded Optional
 *
 * @return Whether this change in health killed the player
 */
setHealth(entityId: EntityId, newHealth: PNull<number>, whoDidDamage?: LifeformId | { lifeformId: LifeformId; withItem: string }, increaseMaxHealthIfNeeded?: boolean): boolean
/**
 * Make it as if hittingEId hit hitEId
 *
 * @param hittingEId
 * @param hitEId
 * @param dirFacing
 * @param bodyPartHit
 * @param overrides
 * @returns whether the attack damaged the lifeform
 */
applyMeleeHit(hittingEId: LifeformId, hitEId: LifeformId, dirFacing: number[], bodyPartHit?: PNull<LifeformBodyPart>, overrides?: { damage?: PNull<number>; heldItemName?: PNull<string>; horizontalKbMultiplier?: number; verticalKbMultiplier?: number; }): boolean
/**
 * Apply damage to a lifeform.
 * eId is the player initiating the damage, hitEId is the lifeform being hit.
 *
 * It is recommended to self-inflict damage when the game code wants to apply damage to a lifeform.
 *
 * @param eId
 * @param hitEId
 * @param attemptedDmgAmt
 * @param withItem
 * @param bodyPartHit
 * @param attackDir
 * @param showCritParticles
 * @param reduceVerticalKbVelocity
 * @param horizontalKbMultiplier
 * @param verticalKbMultiplier
 * @param broadcastEntityHurt
 * @param attackCooldownSettings
 * @param hittingSoundOverride
 * @param ignoreOtherEntitySettingCanAttack
 * @param isTrueDamage
 * @param damagerDbId
 *
 * @returns whether the attack damaged the lifeform
 */
attemptApplyDamage({
		eId,
		hitEId,
		attemptedDmgAmt,
		withItem,
		bodyPartHit,
		attackDir,
		showCritParticles,
		reduceVerticalKbVelocity,
		horizontalKbMultiplier,
		verticalKbMultiplier,
		broadcastEntityHurt,
		attackCooldownSettings,
		hittingSoundOverride,
		ignoreOtherEntitySettingCanAttack,
		isTrueDamage,
		damagerDbId,
	}: PlayerAttemptDamageOtherPlayerOpts): boolean
/**
 * Create enchantment attributes for an item at a given enchantment level. Same behaviour as if that level of enchant was selected for the item in an enchanting table.
 * @param itemName
 * @param enchantmentLevel
 */
createEnchantmentAttributesForItem(itemName: ItemName, enchantmentLevel: number): EnchantmentAttributes
/**
 * Force respawn a player
 * @param playerId
 * @param respawnPos
 */
forceRespawn(playerId: PlayerId, respawnPos?: number[]): void
/**
 * Kill a lifeform.
 * @param lifeformId
 * @param whoKilled Optional
 */
killLifeform(lifeformId: LifeformId, whoKilled?: LifeformId | { lifeformId: LifeformId; withItem: string }): void
/**
 * Gets the player's current killstreak
 *
 * @param playerId
 * @returns
 */
getCurrentKillstreak(playerId: PlayerId): number
/**
 * Clears the player's current killstreak
 *
 * @param playerId
 */
clearKillstreak(playerId: PlayerId): void
/**
 * Whether a lifeform is alive or dead (or on the respawn screen, in a player's case).
 *
 * @param lifeformId
 * @returns
 */
isAlive(lifeformId: LifeformId): boolean
/**
 * Send a message to everyone
 *
 * @param message The text contained within the message. Can use `Custom Text Styling`.
 * @param style An optional style argument. Can contain values for fontWeight and color of the message.
 *          style is ignored if message uses custom text styling (i.e. is not a string).
 */
broadcastMessage(message: string | CustomTextStyling, style?: { fontWeight?: number | string; color?: string; colour?: string }): void
/**
 * Send a message to a specific player
 *
 * @param playerId Id of the player
 * @param message The text contained within the message. Can use `Custom Text Styling`.
 * @param style An optional style argument. Can contain values for fontWeight and color of the message.
 *              style is ignored if message uses custom text styling (i.e. is not a string).
 */
sendMessage(playerId: PlayerId, message: string | CustomTextStyling, style?: { fontWeight?: number | string; color?: string }): void
/**
 * Send a flying middle message to a specific player
 *
 * @param playerId Id of the player
 * @param message The text contained within the message. Can be either a string or use `Custom Text Styling`.
 * @param distanceFromAction The distance from the action that has caused this message to be displayed,
 *                           this value will be used to determine how the message flies across the screen.
 * @param lifetimeMs How long the message will be visible in milliseconds. Defaults to 1000ms.
 */
sendFlyingMiddleMessage(playerId: PlayerId, message: string | CustomTextStyling, distanceFromAction: number, lifetimeMs?: number): void
/**
 * Modify a client option at runtime and send to the client if it changed
 *
 * @param playerId
 * @param option The name of the option
 * @param value The new value of the option
 */
setClientOption<PassedOption extends ClientOption>(playerId: PlayerId, option: PassedOption, value: ClientOptions[PassedOption]): void
/**
 * Returns the current value of a client option
 *
 * @param playerId
 * @param option
 */
getClientOption<PassedOption extends ClientOption>(playerId: PlayerId, option: PassedOption): ClientOptions[PassedOption]
/**
 * Create a new shop item under the given category.
 * Will create a new category if it does not exist.
 * If the shop item already exists then it will be replaced.
 * If any per-player overrides exist under the same categoryKey and itemKey then they will be deleted.
 *
 * @param categoryKey - The key of the category to create the item in
 * @param itemKey - The unique key for the item
 * @param item - The shop item to create (will be mutated)
 */
createShopItem(categoryKey: ShopCategoryKey, itemKey: ShopItemKey, item: ShopItem): void
/**
 * Update selected properties of an existing shop item.
 * For example, { canBuy: true } to allow players to purchase the item.
 * Throws an error if the item does not exist.
 *
 * @param categoryKey - The key of the category containing the item
 * @param itemKey - The unique key for the item
 * @param changes - Partial shop item properties to update
 */
updateShopItem(categoryKey: ShopCategoryKey, itemKey: ShopItemKey, changes: Partial<ShopItem>): void
/**
 * Delete an existing shop item.
 * Throws an error if the item does not exist.
 * Will also delete all per-player overrides for the shop item.
 *
 * @param categoryKey - The key of the category containing the item
 * @param itemKey - The unique key for the item
 */
deleteShopItem(categoryKey: ShopCategoryKey, itemKey: ShopItemKey): void
/**
 * Set properties of a shop category.
 *
 * @param categoryKey - The key of the category to configure
 * @param config - Category configuration properties
 */
configureShopCategory(categoryKey: ShopCategoryKey, config: ShopCategoryConfig): void
/**
 * Create a new shop item for a specific player.
 * Will create a new category if it does not exist.
 * Will replace any overrides this player already has for the same item.
 *
 * @param playerId - The player to create the item for
 * @param categoryKey - The key of the category to create the item in
 * @param itemKey - The unique key for the item
 * @param item - The shop item to create (will be mutated)
 */
createShopItemForPlayer(playerId: PlayerId, categoryKey: ShopCategoryKey, itemKey: ShopItemKey, item: ShopItem): void
/**
 * Update selected properties of an existing shop item for a specific player.
 * For example, { canBuy: true } to allow this player to purchase the item.
 * Throws an error if the item does not exist.
 *
 * @param playerId - The player to update the item for
 * @param categoryKey - The key of the category containing the item
 * @param itemKey - The unique key for the item
 * @param changes - Partial shop item properties to update
 */
updateShopItemForPlayer(playerId: PlayerId, categoryKey: ShopCategoryKey, itemKey: ShopItemKey, changes: Partial<ShopItem>): void
/**
 * Delete a specific player's overrides for a shop item.
 * Like other methods, it doesn't matter whether the overrides were created
 * using createShopItemForPlayer or by using updateShopItemForPlayer instead.
 * This method does nothing if the overrides don't exist or are defined internally by the engine.
 *
 * @param playerId - The player to reset the item for
 * @param categoryKey - The key of the category containing the item
 * @param itemKey - The unique key for the item
 */
resetShopItemForPlayer(playerId: PlayerId, categoryKey: ShopCategoryKey, itemKey: ShopItemKey): void
/**
 * Configure a shop category for a specific player.
 *
 * @param playerId - The player to configure the category for
 * @param categoryKey - The key of the category to configure
 * @param config - Category configuration properties
 */
configureShopCategoryForPlayer(playerId: PlayerId, categoryKey: ShopCategoryKey, config: ShopCategoryConfig): void
/**
 * Modify client options at runtime
 *
 * @param playerId
 * @param optionsObj An object which contains key value pairs of new settings. E.g {canChange: true, speedMultiplier: false}
 */
setClientOptions(playerId: PlayerId, optionsObj: Partial<ClientOptions>): void
/**
 * Sets a client option to its default value. This will be the value stored in your game's defaultClientOptions, otherwise Bloxd's default.
 *
 * @param playerId
 * @param option
 */
setClientOptionToDefault(playerId: PlayerId, option: ClientOption): void
/**
 * Set every player's other-entity setting to a specific value for a particular player.
 * includeNewJoiners=true means that new players joining the game will also have this other player setting applied.
 *
 * @param targetedPlayerId
 * @param settingName
 * @param settingValue
 * @param includeNewJoiners
 */
setTargetedPlayerSettingForEveryone<Setting extends OtherEntitySetting>(targetedPlayerId: PlayerId, settingName: Setting, settingValue: OtherEntitySettings[Setting], includeNewJoiners?: boolean): void
/**
 * Set a player's other-entity setting for every lifeform in the game.
 * includeNewJoiners=true means that the player will have the setting applied to new joiners.
 *
 * @param playerId
 * @param settingName
 * @param settingValue
 * @param includeNewJoiners
 */
setEveryoneSettingForPlayer<Setting extends OtherEntitySetting>(playerId: PlayerId, settingName: Setting, settingValue: OtherEntitySettings[Setting], includeNewJoiners?: boolean): void
/**
 * Set a player's other-entity setting for a specific entity.
 *
 * @param relevantPlayerId
 * @param targetedEntityId
 * @param settingName
 * @param settingValue
 */
setOtherEntitySetting<Setting extends OtherEntitySetting>(relevantPlayerId: PlayerId, targetedEntityId: EntityId, settingName: Setting, settingValue: OtherEntitySettings[Setting]): void
/**
 * Set many of a player's other-entity settings for a specific entity.
 *
 * @param relevantPlayerId
 * @param targetedEntityId
 * @param settingsObject
 */
setOtherEntitySettings(relevantPlayerId: PlayerId, targetedEntityId: EntityId, settingsObject: Partial<OtherEntitySettings>): void
/**
 * Get the value of a player's other-entity setting for a specific entity.
 *
 * @param relevantPlayerId
 * @param targetedEntityId
 * @param settingName
 */
getOtherEntitySetting<Setting extends OtherEntitySetting>(relevantPlayerId: PlayerId, targetedEntityId: EntityId, settingName: Setting): OtherEntitySettings[Setting]
/**
 * Reset a player's other-entity setting for a specific entity to the game's default value.
 *
 * @param relevantPlayerId
 * @param targetedEntityId
 * @param settingName
 */
setOtherEntitySettingToDefault<Setting extends OtherEntitySetting>(relevantPlayerId: PlayerId, targetedEntityId: EntityId, settingName: Setting): void
/**
 * Play particle effect on all clients, or only on some clients if clientPredictedBy is specified
 * @param opts
 * @param clientPredictedBy Play only on clients where client with playerId clientPredictedBy
 *                          is not invisible, transparent, or themselves
 */
playParticleEffect(opts: TempParticleSystemOpts | ParticlePresetOpts, clientPredictedBy?: PlayerId): void
/**
 * Animates the given entity. Pass `null` for `animationSchema` to stop the entity's current animation (the
 * `initialTimeFraction` and `animationSpeed` arguments are ignored in that case).
 * @param entityId
 * @param animationSchema
 * @param initialTimeFraction
 * @param animationSpeed
 */
animateEntity(entityId: EntityId, animationSchema: AnimationSchema | BlockbenchAnimationSchema | null, initialTimeFraction?: number, animationSpeed?: number): void
/**
 * Get the in game name of an entity.
 * @param entityId
 */
getEntityName(entityId: EntityId): string
/**
 * Given the name of a player, get their id
 * @param playerName
 */
getPlayerId(playerName: string): PNull<PlayerId>
/**
 * Given a player, get their permanent identifier that doesn't change when leaving and re-entering
 *
 * @param playerId
 */
getPlayerDbId(playerId: PlayerId): PlayerDbId
/**
 * Returns null if player not in lobby
 *
 * @param dbId
 */
getPlayerIdFromDbId(dbId: PlayerDbId): PNull<PlayerId>
/**
 * Gets the persistent database ID for the given mob.
 * This can be useful for reasoning about mobs that have been loaded from the database, such as owned mobs.
 *
 * @param mobId - The ID of the mob from spawnMob
 * @returns The persistent database ID for the mob, or null if the mob is not persistent
 */
getMobDbId(mobId: MobId): PNull<MobDbId>

kickPlayer(playerId: PlayerId, reason: string): void
/**
 * Check if the block at a specific position is in a loaded chunk.
 * @param x
 * @param y
 * @param z
 * @return boolean
 */
isBlockInLoadedChunk(x: number, y: number, z: number): boolean
/**
 * Get the name of a block.
 * @param x could be an array [x, y, z]. If so, the other params shouldn't be passed.
 * @param y
 * @param z
 * @return blockName - any block name, including 'Air'
 */
getBlock(x: number | number[], y?: number, z?: number): BlockName
/**
 * Used to get the block id at a specific position.
 * Intended only for use in hot code paths - default to getBlock for most use cases
 *
 * @param x
 * @param y
 * @param z
 */
getBlockId(x: number, y: number, z: number): BlockId
/**
 * Set a block. Valid names are any block name, including 'Air'
 *
 * This function is optimised for setting broad swathes of blocks. For example, if you have a 50x50x50 area you need to turn to air, it will run performantly if you call this in double nested loops.
 *
 * IF you're only changing a few blocks, you want this to be super snappy for players, AND you're calling this outside of your _tick function, you can use api.setOptimisations(false).
 *
 * If you want the optimisations for large quantities of blocks later on, then call api.setOptimisations(true) when you're done.
 *
 *
 *
 * @param x Can be an array
 * @param y Should be blockname if first param is array
 * @param z
 * @param blockName
 */
setBlock(x: number | number[], y: number | BlockName, z?: number, blockName?: BlockName): void
/**
 * Initiate a block change "by the world".
 * This ends up calling the onWorldChangeBlock and only makes the change if not prevented by game/plugins.
 * initiatorDbId is null if the change was initiated by the game code.
 *
 * @param initiatorDbId
 * @param x
 * @param y
 * @param z
 * @param blockName
 * @param extraInfo
 *
 * @returns "preventChange" if the change was prevented, "preventDrop" if the change was allowed but without dropping any items, and undefined if the change was allowed with an item drop
 */
attemptWorldChangeBlock(initiatorDbId: PNull<PlayerDbId>, x: number, y: number, z: number, blockName: BlockName, extraInfo?: WorldBlockChangedInfo): "preventChange" | "preventDrop" | void
/**
 * Returns whether a block is solid or not.
 * E.g. Grass block is solid, while water, ladder and water are not.
 * Will be true if the block is unloaded.
 *
 * @param x
 * @param y
 * @param z
 */
getBlockSolidity(x: number | number[], y?: number, z?: number): boolean
/**
 * Helper function that sets all blocks in a rectangle to a specific block.
 *
 * @param pos1 array [x, y, z]
 * @param pos2 array [x, y, z]
 * @param blockName
 */
setBlockRect(pos1: number[], pos2: number[], blockName: BlockName): void
/**
 * Create walls by providing two opposite corners of the cuboid
 *
 *
 * @param pos1 array [x, y, z]
 * @param pos2 array [x, y, z]
 * @param blockName
 * @param hasFloor
 * @param hasCeiling
 */
setBlockWalls(pos1: number[], pos2: number[], blockName: BlockName, hasFloor?: boolean, hasCeiling?: boolean): void
/**
 * Only use this instead of getBlock if you REALLY need the performance (i.e. you are iterating over tens of thousands of blocks)
 * ReturnedObject.blockData is a 32x32x32 ndarray of block ids
 * (see https://www.npmjs.com/package/ndarray)
 * Each block id is a 16-bit number
 * The ndarray should only be read from, writing to it will result in desync between the server and client
 *
 * @param pos The returned chunk contains pos
 * @returns null if the chunk is not loaded in a persisted world. ReturnedObject.blockData is an ndarray that can be accessed
 * (but modifications have to be saved with resetChunk).
 */
getChunk(pos: number[]): PNull<GameChunk>
/**
 * Copies chunk from one position to another.
 * A good use case for this is storing 'template' chunks that can be continuously copied to a new position.
 * In order to reset an area to the template, e.g. resetting a session-based game.
 *
 * NOTE: Does nothing if the source chunk is not loaded.
 *
 * @param fromPos - A block coordinate within the chunk to copy from.
 * @param toPos - A block coordinate within the chunk to copy to.
 */
copyChunk(fromPos: number[], toPos: number[]): void
/**
 * Use this to get a chunk ndarray you can edit and set in resetChunk.
 *
 * Only use chunk helpers if you REALLY need the performance (i.e. you are iterating over tens of thousands of blocks)
 * ReturnedObject.blockData is a 32x32x32 ndarray of air.
 * (see https://www.npmjs.com/package/ndarray)
 * Each block id is a 16-bit number
 */
getEmptyChunk(): GameChunk
/**
 * Splits the block name by '|'. If no meta info, metaInfo is ''
 *
 * @param blockName
 */
getMetaInfo(blockName: BlockName | null | undefined): ItemMetaInfo
/**
 * Get the numeric id of a block used in the ndarrays returned from getChunk
 * I.e. chunk.blockData.set(x, y, z, api.blockNameToBlockId("Dirt"))
 * or chunk.blockData.get(x, y, z) === api.blockNameToBlockId("Dirt")
 *
 * @param blockName
 * @param allowInvalidBlock Don't throw an error if the block name is invalid.
 * Defaults false. If true and name is invalid, returns null.
 * @returns
 */
blockNameToBlockId(blockName: BlockName, allowInvalidBlock?: boolean): PNull<number>
/**
 * Goes from block id to block name. The reverse of blockNameToBlockId
 *
 * @param blockId
 */
blockIdToBlockName(blockId: BlockId): BlockName
/**
 * Get the unique id of the chunk containing pos in the current map
 *
 * @param pos
 */
blockCoordToChunkId(pos: number[]): string
/**
 * Get the co-ordinates of the block in the chunk with the lowest x, y, and z co-ordinates
 *
 * @param chunkId
 */
chunkIdToBotLeftCoord(chunkId: string): [number, number, number]
/**
 * @deprecated - prefer using other UI elements
 * (this UI element hasn't been properly thought through in combination with other elements like killfeed, uirequests, etc)
 *
 * Send a player an icon in the top right corner
 *
 * @param playerId
 * @param icon Can be any icon from font-awesome.
 * @param text The text to send.
 * @param opts Can include keys duration, width, height, color, iconSizeMult.
 *
 * Default opts: {
 *  duration: 8, // seconds
 *  width: 400px,
 *  height: 100px,
 *  color: 'rgb(102, 102, 102)', // must be rgb in this format (hex not supported),
 *  iconSizeMult: 5,
 *  textAndIconColor: "white", // can be any colour supported by css (e.g. hex, rgb),
 *  fontSize: '17px',
 * }
 */
sendTopRightHelper(playerId: PlayerId, icon: string, text: string, opts: { duration?: number; width?: number; height?: number; color?: string; iconSizeMult?: number; textAndIconColor?: string; fontSize?: string; }): void
/**
 * Whether the player is on a mobile device or a computer.
 * @param playerId
 */
isMobile(playerId: PlayerId): boolean
/**
 * Create a dropped item.
 * @param x
 * @param y
 * @param z
 * @param itemName Name of the item. Any item name, including blocks and 'Air'
 * @param amount The amount of the item in the drop. Defaults to 1 when omitted. Use 0 for a collect-only trigger that does not add to inventory (fires onPlayerPickedUpItem with itemAmount 0).
 * @param mergeItems Whether to merge the item into a nearby item of same type, if one exists. Defaults to false.
 * @param attributes Attributes of the item being dropped
 * @param timeTillDespawn Time till the item automatically despawns in milliseconds. Max of 5 mins.
 * @param dropperId Who dropped the item.
 * @param options Additional options, such as doPhysics and size.
 * @returns the id you can pass to setCantPickUpItem, or null if the item drop limit was reached
 */
createItemDrop(x: number, y: number, z: number, itemName: ItemName, amount?: PNull<number>, mergeItems?: boolean, attributes?: ItemAttributes, timeTillDespawn?: number, dropperId?: PNull<LifeformId>, options?: ItemDropOptions): PNull<EntityId>
/**
 * Prevent a player from picking up an item. itemId returned by createItemDrop
 *
 * @param playerId
 * @param itemId
 */
setCantPickUpItem(playerId: PlayerId, itemId: EntityId): void
/**
 * Reset a player's ability to pick up an item. itemId returned by createItemDrop
 *
 * @param playerId
 * @param itemId
 */
resetCanPickUpItem(playerId: PlayerId, itemId: EntityId): void
/**
 * Delete an item drop by item drop entity ID
 *
 * @param itemId
 */
deleteItemDrop(itemId: EntityId): void
/**
 * Returns all items overlapping with the given player
 *
 * @param playerId
 * @returns the overlapping item entity IDs
 */
getItemIDsOverlappingWithPlayer(playerId: PlayerId): EntityId[]
/**
 * Get the metadata about a block or item before stats have been modified by any client options
 * (i.e. its entry in the initial metadata object)
 *
 * @param itemName
 */
getInitialItemMetadata(itemName: string): Partial<BlockMetadataItem & NonBlockMetadataItem>
/**
 * Get stat info about a block or item
 * Either based on a client option for a player: (e.g. `DirtTtb`)
 * or its entry in the initial metadata object if no client option is set.
 *
 * If null is passed for lifeformId, this is simply its entry in blockMetadata etc.
 *
 *
 * @param lifeformId
 * @param itemName
 * @param stat
 */
getItemStat<K extends keyof AnyMetadataItem>(lifeformId: PNull<LifeformId>, itemName: ItemName, stat: K): AnyMetadataItem[K]
/**
 * Set a stat attribute for a block or item
 *
 * NOTE: Only a subset of stats are customisable this way.
 *
 * @param playerId
 * @param itemName
 * @param stat
 * @param value
 */
setItemStat<K extends CustomItemStat>(playerId: PlayerId, itemName: ItemName, stat: K, value: AnyMetadataItem[K]): void
/**
 * Set the direction the player is looking.
 *
 * @param playerId
 * @param direction a vector of the direction to look, format [x, y, z]
 */
setCameraDirection(playerId: PlayerId, direction: number[]): void
/**
 * Set a player's opacity
 * A simple helper that calls setTargetedPlayerSettingForEveryone
 *
 * @param playerId
 * @param opacity
 */
setPlayerOpacity(playerId: PlayerId, opacity: number): void
/**
 * Set the level of viewable opacity by one player on another player
 * A simple helper that calls setOtherEntitySetting
 *
 * @param playerIdWhoViewsOpacityPlayer The player who sees that with opacity
 * @param playerIdOfOpacityPlayer The player/player model who is given opacity
 * @param opacity
 */
setPlayerOpacityForOnePlayer(playerIdWhoViewsOpacityPlayer: PlayerId, playerIdOfOpacityPlayer: PlayerId, opacity: number): void
/**
 * Obtain Date.now() value saved at start of current game tick
 */
now(): number
/**
 * Check your game (and, optionally, a entity) is still valid and executing.
 * Useful if you're using async functions and await within your game.
 * If you use await/async or promises and do not check this, your game could have closed and then the rest of your
 * async code executes.
 *
 * @param entityId
 */
checkValid(entityId?: PNull<EntityId>): boolean
/**
 * Let a player change a block at a specific co-ordinate. Useful when client option canChange is false.
 * Overrides blockRect and blockType settings, so also useful when you have disallowed changing of a block type with setCantChangeBlockType.
 * Using this on 1000s of blocks will cause lag - if that is needed, find a way to use setCanChangeBlockType.
 *
 * @param playerId
 * @param x
 * @param y
 * @param z
 */
setCanChangeBlock(playerId: PlayerId, x: number, y: number, z: number): void
/**
 * Prevents a player from changing a block at a specific co-ordinate. Useful when client option canChange is true.
 * Overrides blockRect and blockType settings, so also useful when you have allowed changing of a block type with setCantChangeBlockType.
 * Using this on 1000s of blocks will cause lag - if that is needed, find a way to use setCantChangeBlockType.
 *
 * @param playerId
 * @param x
 * @param y
 * @param z
 */
setCantChangeBlock(playerId: PlayerId, x: number, y: number, z: number): void
/**
 * Remove any previous can/cant change block settings for a player at a specific co-ordinate
 *
 * @param playerId
 * @param x
 * @param y
 * @param z
 */
resetCanChangeBlock(playerId: PlayerId, x: number, y: number, z: number): void
/**
 * Lets a player Change a block type. Valid names are any block name, including 'Air'
 * Less priority than cant change block pos/can change block rect
 *
 * @param playerId
 * @param blockName
 */
setCanChangeBlockType(playerId: PlayerId, blockName: BlockName): void
/**
 * Stops a player from changing a block type. Valid names are any block name, including 'Air'
 * Less priority than can change block pos/can change block rect
 *
 * @param playerId
 * @param blockName
 */
setCantChangeBlockType(playerId: PlayerId, blockName: BlockName): void
/**
 * Remove any previous can/cant change block type settings for a player
 *
 * @param playerId
 * @param blockName
 */
resetCanChangeBlockType(playerId: PlayerId, blockName: BlockName): void
/**
 * Make it so a player can Change blocks within two points. Coordinates are inclusive. E.g. if [0, 0, 0] is pos1
 * and [1, 1, 1] is pos2 then the 8 blocks contained within low and high will be able to be broken.
 * Overrides setCantChangeBlockType
 *
 *
 * @param playerId
 * @param pos1 Arg as [x, y, z]
 * @param pos2 Arg as [x, y, z]
 */
setCanChangeBlockRect(playerId: PlayerId, pos1: number[], pos2: number[]): void
/**
 * Make it so a player cant Change blocks within two points. Coordinates are inclusive. E.g. if [0, 0, 0] is pos1
 * and [1, 1, 1] is pos2 then the 8 blocks contained within pos1 and pos2 won't be able to be broken.
 * Overrides setCanChangeBlockType
 *
 *
 * @param playerId
 * @param pos1 Arg as [x, y, z]
 * @param pos2 Arg as [x, y, z]
 */
setCantChangeBlockRect(playerId: PlayerId, pos1: number[], pos2: number[]): void
/**
 * Remove any previous can/cant change block rect settings for a player
 *
 * @param playerId
 * @param pos1
 * @param pos2
 */
resetCanChangeBlockRect(playerId: PlayerId, pos1: number[], pos2: number[]): void
/**
 * Allow a player to walk through a type of block. For blocks that are normally solid and not seethrough, the player will experience slight visual glitches while inside the block.
 *
 *
 * @param playerId
 * @param blockName
 * @param disable If you've enabled a player to walk through a block and want to make the block solid for them again, pass this with true. Otherwise you only need to pass playerId and blockName
 */
setWalkThroughType(playerId: PlayerId, blockName: BlockName, disable?: boolean): void
/**
 * Allow a player to walk through (or not walk through) voxels that are located within a given rectangle.
 * For blocks that are normally solid and not seethrough, the player will experience slight visual glitches while inside the block.
 *
 * You could set both pos1 and pos2 to [0, 0, 0] to make only 0, 0, 0 walkthrough, for example.
 *
 * @param playerId
 * @param pos1 The one corner of the cuboid. Format [x, y, z]
 * @param pos2 The top right corner of the cuboid. Format [x, y, z]
 * @param updateType The type of update. Whether to make a rect solid, or able to be walked through.
 * Pass DEFAULT_WALK_THROUGH with a previously passed rect to disable any walkthrough setting for that rect.
 *
 */
setWalkThroughRect(playerId: PlayerId, pos1: number[], pos2: number[], updateType: WalkThroughType): void
/**
 * Give a player an item and a certain amount of that item.
 * Returns the amount of item added to the users inventory.
 *
 * @param playerId
 * @param itemName
 * @param itemAmount
 * @param attributes An optional object for certain types of item. For guns this can contain the shotsLeft field which is the amount of ammo the gun currently has.
 */
giveItem(playerId: PlayerId, itemName: ItemName, itemAmount?: number, attributes?: ItemAttributes): number
/**
 * Whether the player has space in their inventory to get new blocks
 * @param playerId
 */
inventoryIsFull(playerId: PlayerId): boolean
/**
 * Put an item in a specific index. Default hotbar is indexes 0-9
 *
 * @param playerId
 * @param itemSlotIndex 0-indexed
 * @param itemName Can be 'Air', in which case itemAmount will be ignored and the slot will be cleared.
 * @param itemAmount -1 for infinity. Should not be set, or null, for items that are not stackable.
 * @param attributes An optional object for certain types of item. For guns this can contain the shotsLeft field which is the amount of ammo the gun currently has.
 * @param tellClient whether to tell client about it - results in desync between client and server if client doesnt locally perform the same action
 */
setItemSlot(playerId: PlayerId, itemSlotIndex: number, itemName: ItemName, itemAmount?: PNull<number>, attributes?: ItemAttributes, tellClient?: boolean): void
/**
 * Remove an amount of item from a player's inventory
 *
 * @param playerId
 * @param itemName
 * @param amount
 */
removeItemName(playerId: PlayerId, itemName: ItemName, amount: number): void
/**
 * Get the item at a specific index
 * Returns null if there is no item at that index
 * If there is an item, return an object of the format { name: string; amount: PNull<number>; attributes: ItemAttributes; }
 *
 * @param playerId
 * @param itemSlotIndex
 */
getItemSlot(playerId: PlayerId, itemSlotIndex: number): PNull<InvenItem>
/**
 * Finds the index of a particular item in a player's inventory.
 *
 * @param playerId
 * @param itemName
 * @return The index of the item in the player's inventory, or null if the item is not found.
 */
findItem(playerId: PlayerId, itemName: ItemName): PNull<number>
/**
 * Whether a player has an item
 *
 * @param playerId
 * @param itemName
 * @returns bool
 */
hasItem(playerId: PlayerId, itemName: ItemName): boolean
/**
 * The amount of an itemName a player has.
 * Returns 0 if the player has none, and a negative number if infinite.
 *
 * @param playerId
 * @param itemName
 * @returns number
 */
getInventoryItemAmount(playerId: PlayerId, itemName: ItemName): number
/**
 * Clear the players inventory
 *
 * @param playerId
 */
clearInventory(playerId: PlayerId): void
/**
 * Force the player to have the ith inventory slot selected. E.g. newI 0 makes the player have the 0th inventory slot selected
 *
 * @param playerId
 * @param newI integer from 0-9
 */
setSelectedInventorySlotI(playerId: PlayerId, newI: number): void
/**
 * Get a player's currently selected inventory slot
 * @param playerId
 * @returns
 */
getSelectedInventorySlotI(playerId: PlayerId): number
/**
 * Get the currently held item of a player
 * Returns null if no item is being held
 * If an item is held, return an object of the format {name: itemName, amount: amountOfItem}
 *
 * @param playerId
 */
getHeldItem(playerId: PlayerId): PNull<InvenItem>
/**
 * Get the amount of free slots in a player's inventory.
 *
 * @param playerId
 * @returns number
 */
getInventoryFreeSlotCount(playerId: PlayerId): number
/**
 * Checks if a player is able to open a chest at a given location,
 * as per the rules laid out by the "onPlayerAttemptOpenChest" game callback.
 * Returns true if the player can open the chest, false if they cannot, and void if the chest does not exist.
 *
 * @param playerId
 * @param chestX
 * @param chestY
 * @param chestZ
 */
canOpenStandardChest(playerId: PlayerId, chestX: number, chestY: number, chestZ: number): PNull<boolean>
/**
 * Open a chest for a player.
 * If there is no chest, or the player cannot open it, do nothing.
 * WARNING: This may call "onPlayerAttemptOpenChest" to determine if the player has permission to open it. Using this function inside that callback risks infinite recursion.
 *
 * @param playerId
 * @param x
 * @param y
 * @param z
 */
openChestForPlayer(playerId: PlayerId, x: number, y: number, z: number): void
/**
 * Close a chest for a player.
 * If the player does not have a chest open, do nothing.
 *
 * @param playerId
 */
closeChestForPlayer(playerId: PlayerId): void
/**
 * Read a player's current crafting recipe set, keyed by output item name. Includes any
 * per-player overrides set via `editItemCraftingRecipes` / `removeItemCraftingRecipes`.
 *
 * @param playerId
 */
getCraftingRecipesForPlayer(playerId: PlayerId): Record<string, RecipesForItem>
/**
 * Give a standard chest an item and a certain amount of that item.
 * Returns the amount of item added to the chest.
 *
 * @param chestPos
 * @param itemName
 * @param itemAmount
 * @param playerId The player who is interacting with the chest.
 * @param attributes An optional object for certain types of item. For guns this can contain the shotsLeft field which is the amount of ammo the gun currently has.
 */
giveStandardChestItem(chestPos: number[], itemName: ItemName, itemAmount?: number, playerId?: PlayerId, attributes?: ItemAttributes): number
/**
 * Remove an amount of item from a standardChest inventory
 *
 * @param chestPos
 * @param itemName
 * @param amount
 * @param playerId The player who is interacting with the chest.
 */
removeItemNameFromStandardChest(chestPos: number[], itemName: ItemName, amount: number, playerId?: PlayerId): void
/**
 * Get the amount of free slots in a standard chest
 * Returns null for non-chests
 *
 * @param chestPos
 * @returns number
 */
getStandardChestFreeSlotCount(chestPos: number[]): PNull<number>
/**
 * The amount of an itemName a standard chest has.
 * Returns 0 if the standard chest has none, and a negative number if infinite.
 *
 * @param chestPos
 * @param itemName
 * @returns number
 */
getStandardChestItemAmount(chestPos: number[], itemName: ItemName): number
/**
 * Get the item at a chest slot. Null if empty otherwise format {name: itemName, amount: amountOfItem}
 *
 * @param chestPos
 * @param idx
 */
getStandardChestItemSlot(chestPos: number[], idx: number): PNull<InvenItem>
/**
 * Get all the items from a standard chest in order. Use this instead of repetitive calls to getStandardChestItemSlot
 *
 * @param chestPos
 */
getStandardChestItems(chestPos: number[]): PNull<InvenItem>[]
/**
 * @param chestPos
 * @param idx 0-indexed
 * @param itemName Can be 'Air', in which case itemAmount will be ignored and the slot will be cleared.
 * @param itemAmount -1 for infinity. Should not be set, or null, for items that are not stackable.
 * @param playerId The player who is interacting with the chest.
 * @param attributes An optional object for certain types of item. For guns this can contain the shotsLeft field which is the amount of ammo the gun currently has.
 */
setStandardChestItemSlot(chestPos: number[], idx: number, itemName: ItemName, itemAmount?: number, playerId?: PlayerId, attributes?: ItemAttributes): void
/**
 * Find the index of a particular item in a standard chest
 * @param chestPos
 * @param itemName
 */
findStandardChestItem(chestPos: number[], itemName: ItemName): PNull<number>
/**
 * Get the item in a player's moonstone chest slot. Null if empty
 *
 * Moonstone chests are a type of chest where a player accesses the same contents no matter the location of the moonstone chest
 *
 * @param playerId
 * @param idx
 */
getMoonstoneChestItemSlot(playerId: PlayerId, idx: number): PNull<InvenItem>
/**
 * Get all the items from a moonstone chest in order. Use this instead of repetitive calls to getMoonstoneChestItemSlot
 *
 * Moonstone chests are a type of chest where a player accesses the same contents no matter the location of the moonstone chest
 *
 * @param playerId
 */
getMoonstoneChestItems(playerId: PlayerId): PNull<InvenItem>[]
/**
 * Moonstone chests are a type of chest where a player accesses the same contents no matter the location of the moonstone chest
 *
 * @param playerId
 * @param idx 0-indexed
 * @param itemName Can be 'Air', in which case itemAmount will be ignored and the slot will be cleared.
 * @param itemAmount -1 for infinity. Should not be set, or null, for items that are not stackable.
 * @param metadata An optional object for certain types of item. For guns this can contain the shotsLeft field which is the amount of ammo the gun currently has.
 */
setMoonstoneChestItemSlot(playerId: PlayerId, idx: number, itemName: ItemName, itemAmount?: number, metadata?: ItemAttributes): void
/**
 * Store data about a block in a performant manner. Data is cleared when block changes.
 * E.g. chest
 * Works well with blocks marked tickable (e.g. wheat)
 *
 * @param x
 * @param y
 * @param z
 * @param data
 */
setBlockData(x: number, y: number, z: number, data: object): void
/**
 * Get stored data about a block in a performant manner. Data is cleared when block changes.
 * E.g. chest
 * Works well with blocks marked tickable (e.g. wheat)
 *
 * @param x
 * @param y
 * @param z
 */
getBlockData(x: number, y: number, z: number): any
/**
 * Get the name of the lobby this game is running in.
 */
getLobbyName(): string
/**
 * Integer lobby names are public
 * @returns boolean
 */
isPublicLobby(): boolean
/**
 * Returns if the current lobby the game is running in is special - e.g. a discord guild or dm, or simply a standard lobby
 */
getLobbyType(): LobbyType
/**
 * Update the progress bar in the bottom right corner.
 * Can be queued.
 *
 * @param playerId
 * @param toFraction The fraction of the progress bar you want to be filled up.
 * @param toDuration The time it takes for the bar to reach the given toFraction in ms.
 * If this is too low and you queue multiple updates, this toFraction could be skipped. Treat 200ms as a minimum.
 */
progressBarUpdate(playerId: PlayerId, toFraction: number, toDuration?: number): void
/**
 * This will initiate the MiddleScreenBar, starting at empty and filling up to full over the given duration.
 * Good to represent cooldowns (eg gun reload) or charged items (eg crossbow)
 *
 * @param playerId
 * @param duration ms over which the MiddleScreenBar fills up
 * @param chargeExpiresAutomatically Defaults to true. If true, the bar will disappear upon reaching full. If false, the bar will remain at full until hidden with removeMiddleScreenBar
 * @param horizontalBarRemOffset Offset the bar left or right (in css unit - rem)
 */
initiateMiddleScreenBar(playerId: PlayerId, duration: number, chargeExpiresAutomatically?: boolean, horizontalBarRemOffset?: number): void
/**
 * If there is any current middle screen bar running, this will hide it
 *
 * @param playerId
 */
removeMiddleScreenBar(playerId: PlayerId): void
/**
 * Show a hitmarker on the player's screen (the X-shaped crosshair flash indicating a successful hit).
 * Useful for custom weapons or things that need visual hit feedback.
 *
 * @param playerId The player to show the hitmarker to
 * @param isCrit If true, shows an enhanced critical-hit hitmarker with a longer, more dramatic animation
 * @param directionVector Optional [x, y, z] direction vector. When provided, the hitmarker appears
 *   at the projected screen position of that direction rather than at the centre of the screen.
 *   Same flow as mobile melee attacks where the tap point differs from screen centre.
 */
sendHitmarker(playerId: PlayerId, isCrit?: boolean, directionVector?: PNull<number[]>): void
/**
 * Show a directional arrow indicator on the player's screen pointing toward a world position.
 * When the position is off-screen the indicator is a rotating chevron at the screen edge.
 * When the position is on-screen it becomes a small marker dot.
 *
 * The arrow persists until explicitly cleared via `clearDirectionArrow`.
 * Calling again with the same `id` updates the existing arrow in-place.
 *
 * @param playerId The player to show the arrow to
 * @param id Unique identifier for this arrow (allows multiple concurrent arrows)
 * @param position [x, y, z] world position the arrow should point toward
 * @param text Optional label rendered below the indicator. Supports CustomTextStyling for rich text with icons/colours.
 * @param showDistance If true, displays the distance (in blocks) from the player to the arrow position.
 * @param style Optional style object (same format as CustomTextStyling's StyledText `style`). Controls chevron/marker colour, label typography, and opacity.
 */
setDirectionArrow(playerId: PlayerId, id: string, position: number[], text?: PNull<string | CustomTextStyling>, showDistance?: boolean, style?: PNull<TextStyle>): void
/**
 * Clear a directional arrow from the player's screen.
 *
 * @param playerId The player to clear the arrow for
 * @param id The arrow identifier to clear. If null, clears all arrows for this player.
 */
clearDirectionArrow(playerId: PlayerId, id?: PNull<string>): void
/**
 * Edit the crafting recipes for a player.
 *
 * @param playerId
 * @param itemName
 * @param recipesForItem
 */
editItemCraftingRecipes(playerId: PlayerId, itemName: ItemName, recipesForItem: RecipesForItem): void
/**
 * Reset the crafting recipes for a given back to its original bloxd state
 *
 * @param playerId
 * @param itemName Resets all crafting recipes for the given player if null, otherwise resets the crafting recipes for the given item.
 */
resetItemCraftingRecipes(playerId: PlayerId, itemName: PNull<string>): void
/**
 * Removes crafting recipes
 *
 * @param playerId
 * @param itemName Removes all crafting recipes for the given player if null, otherwise removes the crafting recipes for the given item.
 */
removeItemCraftingRecipes(playerId: PlayerId, itemName: PNull<string>): void
/**
 * Check if a position is within a cubic rectangle
 *
 * @param coordsToCheck
 * @param pos1 position of one corner
 * @param pos2 position of opposite corner
 * @param addOneToMax
 */
isInsideRect(coordsToCheck: number[], pos1: number[], pos2: number[], addOneToMax?: boolean): boolean
/**
 * Get the entities in the rect between [minX, minY, minZ] and [maxX, maxY, maxZ]
 *
 * @param minCoords
 * @param maxCoords
 * @returns
 */
getEntitiesInRect(minCoords: number[], maxCoords: number[]): EntityId[]
/**
 * @param entityId
 */
getEntityType(entityId: EntityId): EntityType
/**
 * Gets the item name of a dropped item
 *
 * @param itemEId - The ID of the dropped item from createItemDrop
 * @returns
 */
getItemDropName(itemEId: EntityId): PNull<ItemName>
/**
 * Deletes all items dropped in the world
 */
deleteAllItems(): void
/**
 * Create a mob herd. A mob herd represents a collection of mobs that move together.
 */
createMobHerd(): MobHerdId
/**
 * Try to spawn a mob into the world at a given position. Returns null on failure.
 * WARNING: Either the "onPlayerAttemptSpawnMob" or the "onWorldAttemptSpawnMob" game callback will be called
 * depending on whether "spawnerId" is provided. Calling this function inside those callbacks risks infinite recursion.
 * @param mobType
 * @param x
 * @param y
 * @param z
 * @param opts Includes:
 *  - mobHerdId The ID of this mob's herd. (A mob herd represents a collection of mobs that move together.)
 *  - spawnerId The ID of the player who tried to spawn this mob.
 *  - mobDbId A persistent ID for the mob. This can be useful when loading mob data from the database. If the DB ID is already taken, null will be returned.
 *  - name If set, gives the mob a name that will be displayed as a nametag above their head.
 *  - playSoundOnSpawn
 *  - variation
 *  - physicsOpts { width: number; height: number; collidesEntities: boolean }
 * @returns null if the mob could not be spawned.
 * This can happen when there are too many mobs in the world for the current number
 * of players in the lobby, or if the area is protected e.g. by spawn area protection.
 */
attemptSpawnMob<TMobType extends MobType>(mobType: TMobType, x: number, y: number, z: number, opts?: MobSpawnOpts<TMobType>): PNull<MobId>
/**
 * Dispose of a mob's state and remove them from the world without triggering "on death" flows.
 * Always succeeds.
 * @param mobId
 */
despawnMob(mobId: MobId): void
/**
 * Returns the current default value for a mob setting.
 *
 * @param mobType
 * @param setting
 */
getDefaultMobSetting<TMobType extends MobType, TMobSetting extends MobSetting>(mobType: TMobType, setting: TMobSetting): MobSettings<TMobType>[TMobSetting]
/**
 * Set the default value for a mob setting.
 * @param mobType
 * @param setting
 * @param value
 */
setDefaultMobSetting<TMobType extends MobType, TMobSetting extends MobSetting>(mobType: TMobType, setting: TMobSetting, value: MobSettings<TMobType>[TMobSetting]): void
/**
 * Get the current value of a mob setting for a specific mob.
 * @param mobId
 * @param setting
 * @param returnDefaultIfNotOverridden - If true, return the default setting if not overridden.
 */
getMobSetting<TMobSetting extends MobSetting>(mobId: MobId, setting: TMobSetting, returnDefaultIfNotOverridden?: boolean): MobSettings<MobType>[TMobSetting]
/**
 * Set the current value of a mob setting for a specific mob.
 * @param mobId
 * @param setting
 * @param value
 */
setMobSetting<TMobSetting extends MobSetting>(mobId: MobId, setting: TMobSetting, value: MobSettings<MobType>[TMobSetting]): void
/**
 * Get the number of mobs in the world.
 */
getNumMobs(): number
/**
 * Get the mob IDs of all mobs in the world.
 */
getMobIds(): MobId[]
/**
 * Gets the current AI state for the given mob.
 * @param mobId
 */
getMobAiState(mobId: MobId): { state: MobAiState; params: MobAiStateParams<MobAiState> }
/**
 * Sets the current AI state for the given mob.
 * Some AI states will require context such as the ID of the lifeform being chased.
 * @param mobId
 * @param state
 * @param params
 */
setMobAiState<TState extends MobAiState>(mobId: MobId, state: TState, params: MobAiStateParams<TState>): void
/**
 * Clears any aggro the mob has towards the given lifeform.
 * If the mob is currently chasing or running away from it, this also transitions the mob back to idle.
 * @param mobId
 * @param targetLifeformId
 */
passifyHostility(mobId: MobId, targetLifeformId: LifeformId): void
/**
 * Try to create a throwable entity.
 * Similar to creating a mesh entity and uses the same rate limiting.
 * However, this uses the predefined throwables system and physics used by throwable items with the game
 * Each throwable item has its own behaviour already, including default velocity, damage and gravity multipliers.
 *
 * @param throwerEId
 * @param itemName Must be an Item that is usually throwable in-engine
 * @param position Starting position
 * @param direction
 * @param velocityMult Multiplier for the default velocity of the throwable item
 * @param damageMult Multiplier for the default damage of the throwable item
 * @param gravityMult Multiplier for the default gravity of the throwable item
 * @param attributes item attributes (currently used only for the "Boomerag" item)
 * @returns null if throwable creation failed, otherwise the entity ID.
 */
attemptCreateThrowable(throwerEId: EntityId, itemName: ThrowableItem, position: [number, number, number], direction: [number, number, number], velocityMult?: number, damageMult?: number, gravityMult?: number, attributes?: ItemAttributes): string
/**
 * Delete a throwable entity before it automatically removes itself.
 * @param eId
 * @returns true if the entity was deleted, false if it was not a throwable entity
 */
deleteThrowable(eId: EntityId): boolean
/**
 * Try to create a mesh entity. This creates an entity whose mesh position is synced with clients.
 * Set entity position using setPosition
 * There is a limit to the number of mesh entities and throwables that can be created, with an even smaller limit for mesh entities with physics.
 * @param type
 * @param opts
 * @param name The default name for the nametag
 * @param physicsOptions Physics Options
 * @param initiatorId The entity that initiated the creation of the mesh entity.
 * @returns null if the entity creation failed, otherwise the entity ID.
 */
attemptCreateMeshEntity<MeshType extends MeshEntityType>(type: MeshType, opts: MeshEntityOpts[MeshType], name?: string, physicsOptions?: MeshEntityPhysicsOpts, initiatorId?: EntityId): PNull<EntityId>
/**
 * Update a mesh entity. If used on a non-mesh entity, will do nothing.
 *
 * @param eId
 * @param type
 * @param opts
 */
updateMeshEntity<MeshType extends MeshEntityType>(eId: EntityId, type: MeshType, opts: MeshEntityOpts[MeshType]): void
/**
 * Delete a mesh entity
 *
 * @param eId
 * @returns whether the api successfully deleted the meshEntity
 */
deleteMeshEntity(eId: EntityId): boolean
/**
 * Apply an impulse to an entity
 *
 * @param eId
 * @param xImpulse
 * @param yImpulse
 * @param zImpulse
 */
applyImpulse(eId: EntityId, xImpulse: number, yImpulse: number, zImpulse: number): void
/**
 * Get the velocity of an entity
 * Will return [0, 0, 0] if the entity doesn't have a physics body
 *
 * @param eId
 */
getVelocity(eId: EntityId): Pos
/**
 * Set the velocity of an entity
 *
 * @param eId
 * @param x
 * @param y
 * @param z
 */
setVelocity(eId: EntityId, x: number, y: number, z: number): void
/**
 * @deprecated use setEntityRotation
 * Set the heading for a server-auth entity.
 *
 * @param entityId
 * @param newHeading
 */
setEntityHeading(entityId: EntityId, newHeading: number): void
/**
 * @deprecated use getEntityRotation
 * Get the heading for a server-auth entity.
 *
 * @param entityId
 */
getEntityHeading(entityId: EntityId): number
/**
 * Get the rotation for a server-auth entity.
 *
 * @param entityId
 */
getEntityRotation(entityId: EntityId): Pos
/**
 * Set the rotation for a server-auth entity.
 *
 * @param entityId
 * @param xRotation
 * @param yRotation
 * @param zRotation
 */
setEntityRotation(entityId: EntityId, xRotation: number, yRotation: number, zRotation: number): void
/**
 * Set the amount of an item in an item entity
 *
 * @param itemId
 * @param newAmount
 */
setItemAmount(itemId: EntityId, newAmount: number): void
/**
 * Update the max players and soft max players matchmaking will use
 *
 * softMaxPlayers is the number of players that matchmaking will route to using "Quick Play".
 * Once the softMaxPlayers limit is reached, this lobby can only be joined by requesting the lobby name or joining a friend.
 *
 * maxPlayers is the absolute maximum: a lobby will not have more players than this.
 * Tip: softMaxPlayers should be around 90% of maxPlayers
 *
 * WARNING: This change is not immediate, as it takes a while for matchmaking to find out.
 * Also, this will not kick players out of the lobby if set to a lower value than the current player count.
 *
 * @param softMaxPlayers
 * @param maxPlayers
 */
setMaxPlayers(softMaxPlayers: number, maxPlayers: number): void
/**
 * Tell a player to disconnect from the current lobby and join a new one.
 *
 * To connect to a specific variation, format is `gamename_variation`.
 * For Custom Games, this will be `classic_playerSchematic|XXXXXXXXXX`.
 *
 * NOTE: Players won't disconnect immediately (they may play an ad before being redirected).
 *
 * @param playerId
 * @param game Defaults to the current game.
 * @param lobbyName Defaults to "Quick Play"
 */
matchmakePlayer(playerId: PlayerId, game?: string, lobbyName?: string): void
/**
 * Create and register the UI for the requested quicktime event (QTE) to the screen.
 * Handle the result via the onPlayerFinishQTE engine callback.
 *
 * @param playerId
 * @param qteParameters - includes type and parameters
 * @returns an id that can be passed to deleteQTE
 */
addQTE<T extends QTEType>(playerId: PlayerId, qteParameters: QTEClientParameters<T>): QTERequestId
/**
 * Delete a quicktime event from the screen
 *
 * @param playerId
 * @param id Returned from the addQTE request you want to cancel
 */
deleteQTE(playerId: PlayerId, id: QTERequestId): void
/**
 * Check whether the player has any qteRequests
 */
hasActiveQTE(playerId: PlayerId): boolean
/**
 * Show a message over the shop in the same place that a shop item's onBoughtMessage is shown.
 * Displays for a couple seconds before disappearing
 * Use case is to show a dynamic message when player buys an item
 *
 * @param playerId
 * @param info
 */
sendOverShopInfo(playerId: PlayerId, info: string | CustomTextStyling): void
/**
 * Open the shop UI for a player
 *
 * @param playerId
 * @param toggle Whether to close the shop if it's already open
 * @param forceCategoryKey If set, will change the shop to this category
 * @param onlyIfNonEmpty If true, will only open the shop if the category (or shop, if no category is provided) is non-empty
 */
openShop(playerId: PlayerId, toggle?: boolean, forceCategoryKey?: PNull<ShopCategoryKey>, onlyIfNonEmpty?: boolean): void
/**
 * Apply an effect to a lifeform.
 * Can be an inbuilt effect E.g. "Speed" (speed boost), "Damage" (damage boost).
 * For inbuilt just pass the name of the effect and the functionality is handled in-engine.
 * For custom effect, you pass customEffectInfo. The icon can be an InGameIconName or a bloxd item name.
 * The custom effect onEndCb is an optional helper within which you can undo the effect you applied.
 * Note that onEndCb will not work for press to code boards, code blocks or world code.
 *
 * @param lifeformId
 * @param effectName
 * @param duration
 * @param customEffectInfo
 */
applyEffect(lifeformId: LifeformId, effectName: string, duration: number | null, customEffectInfo: { icon?: IngameIconName | ItemName; onEndCb?: () => void; displayName?: string | TranslatedText } & Partial<InbuiltEffectInfo>): void
/**
 * Check if a lifeform has an effect.
 *
 * @param lifeformId
 * @param name
 * @param atOrAboveLevel Checks whether the effect is at or above the given level
 */
hasEffect(lifeformId: LifeformId, name: string, atOrAboveLevel?: number): boolean
/**
 * Get the level of an effect on a lifeform, or 0 if they don't have it.
 *
 * @param lifeformId
 * @param name
 */
getEffectLevel(lifeformId: LifeformId, name: string): number
/**
 * Get all the effects currently applied to a lifeform.
 *
 * @param lifeformId
 */
getEffects(lifeformId: LifeformId): string[]
/**
 * Remove an effect from a lifeform.
 *
 * @param lifeformId
 * @param name
 */
removeEffect(lifeformId: LifeformId, name: string): void
/**
 * Change a part of a player's skin.
 * UGC code is restricted to cosmetics from packs with ugcSelectable; internal code can use any cosmetics.
 * @param playerId Player to change
 * @param cosmeticType Type of cosmetic
 * @param cosmeticName Chosen cosmetic, will be made lowercase automatically
 */
changePlayerIntoSkin(playerId: PlayerId, cosmeticType: CosmeticType, cosmeticName: CosmeticName): void
/**
 * Remove gamemode-applied skin from a player
 * @param playerId
 */
removeAppliedSkin(playerId: PlayerId): void
/**
 * Get a single equipped cosmetic for a player.
 * @param playerId
 * @param cosmeticType Type of cosmetic
 */
getPlayerCosmetic(playerId: PlayerId, cosmeticType: CosmeticType): CosmeticName
/**
 * Scale node of a player's mesh by 3d vector.
 * State from prior calls to this api is lost so if you want to have multiple nodes scaled, pass in all the scales at once.
 *
 * @param playerId
 * @param nodeScales
 */
scalePlayerMeshNodes(playerId: PlayerId, nodeScales: EntityMeshScalingMap): void
/**
 *  Attach/detach mesh instances to/from an entity
 *  @param eId
 *  @param node node to attach to
 *  @param type if null, detaches mesh from this node
 *  @param opts
 *  @param offset
 *  @param rotation
 */
updateEntityNodeMeshAttachment<MeshType extends MeshEntityType>(eId: EntityId, node: EntityNamedNode, type: PNull<MeshType>, opts?: MeshEntityOpts[MeshType], offset?: Pos, rotation?: Pos): void
/**
 * Set the pose of the player
 * @param playerId
 * @param pose
 * @param poseOffset
 */
setPlayerPose(playerId: PlayerId, pose: PlayerPose, poseOffset?: Pos): void
/**
 * Set physics state of player (vehicle type and tier).
 *
 * For types that have tiers (e.g. BOAT, GLIDER, CAR), a `tier` of `null` defaults to the first
 * tier (0). Types without tiers (e.g. DEFAULT) must be given a `null` tier.
 * @param playerId
 * @param physicsState
 * @param positionOffset - Optional offset to adjust the player's collision box
 */
setPlayerPhysicsState(playerId: PlayerId, physicsState: PlayerPhysicsState<PhysicsType>, positionOffset?: Pos): void
/**
 * Get physics state for player
 * @param playerId
 */
getPlayerPhysicsState(playerId: PlayerId): PlayerPhysicsState<PhysicsType>
/**
 * Add following entity to player
 * @param playerId
 * @param eId
 * @param offset
 * @param followsPlayerRotation
 */
addFollowingEntityToPlayer(playerId: PlayerId, eId: EntityId, offset?: number[], followsPlayerRotation?: boolean): void
/**
 * Remove following entity from player
 * @param playerId
 * @param entityEId
 */
removeFollowingEntityFromPlayer(playerId: PlayerId, entityEId: EntityId): void
/**
 * Set camera zoom for a player
 * @param playerId
 * @param zoom
 */
setCameraZoom(playerId: PlayerId, zoom: number): void
/**
 * @param playerId hears the sound
 * @param soundName Can also be a prefix. If so, a random sound with that prefix will be played
 * @param volume 0-1. If it's too quiet and volume is 1, normalise your sound in audacity
 * @param rate The speed of playback. Also affects pitch. 0.5-4. Lower playback = lower pitch
 *        Good for varying the sound. E.g. item pickup sound has a random rate between 1 and 1.5.
 * @param posSettings
 * {playerIdOrPos: PlayerId | number[], maxHearDist: number, refDistance: number}
 * playerIdOrPos: The player the sound originates from, or the position of the sound
 * maxHearDist: sound is not played if player is further than this. Default 15
 * refDistance: higher means the sound decreases less in volume with distance. Default 3. Hitting is 4. Guns are 10
 *
 */
playSound(playerId: PlayerId, soundName: string, volume: number, rate: number, posSettings?: { playerIdOrPos: PlayerId | number[]; maxHearDist?: number; refDistance?: number; }): void
/**
 * See documentation for api.playSound
 */
broadcastSound(soundName: string, volume: number, rate: number, posSettings?: { playerIdOrPos: PlayerId | number[]; maxHearDist?: number; refDistance?: number; }, exceptPlayerId?: PlayerId): void
/**
 * See documentation for api.playSound
 */
playClientPredictedSound(soundName: string, volume: number, rate: number, posSettings?: { playerIdOrPos: PlayerId | number[]; maxHearDist?: number; refDistance?: number; }, predictedBy?: PlayerId): void

calcExplosionForce(eId: EntityId, explosionType: ExplosionType, knockbackFactor: number, explosionRadius: number, explosionPos: number[], ignoreProjectiles: boolean): { force: Pos; forceFrac: number; }
/**
 * Add a custom killfeed message to the killfeed
 * @param killer - The entity ID or a custom name and colour for the killer
 * @param victim - The entity ID or a custom name and colour for the victim
 * @param withItem - The item used
 */
addCustomKillfeedMessage(killer: { eId: EntityId } | { name: string; colour: string }, victim: { eId: EntityId } | { name: string; colour: string }, withItem: string): void
/**
 * Get the position of a player's target block and the block adjacent to it (e.g. where a block would be placed)
 *
 *
 * Note: This position is a tick ahead of the client's block target info (noa.targetedBlock),
 * since the client updates the blocktarget before the entities tick (and since it uses the renderposition of the camera)
 *
 * This normally doesn't matter but if you are client predicting something based on noa.targetedBlock
 * (currently only applicable to in-engine code), you should not verify using this
 *
 * @param playerId
 */
getPlayerTargetInfo(playerId: PlayerId): { position: Pos; normal: Pos; adjacent: Pos }
/**
 * Get the position of a player's camera and the direction (both in Euclidean and spherical coordinates) they are attempting to use an item.
 * The camPos has the same limitations described in getPlayerTargetInfo
 *
 * @param playerId
 */
getPlayerFacingInfo(playerId: PlayerId): { camPos: Pos; dir: Pos; angleDir: AngleDir; moveHeading: number }
/**
 * Raycast for a block in the world.
 * Given a position and a direction, find the first block that the "ray" hits.
 *
 * @param fromPos
 * @param dirVec
 */
raycastForBlock(fromPos: number[], dirVec: number[]): BlockRaycastResult
/**
 * Prevents the player from taking fall damage next time they land on the ground
 * @param playerId
 */
preventFallDamageNextGrounding(playerId: PlayerId): void
/**
 * Check whether a player is crouching
 *
 * @param playerId
 */
isPlayerCrouching(playerId: PlayerId): boolean
/**
 * Get the aura info for a player
 * @param playerId
 */
getAuraInfo(playerId: PlayerId): { level: number; totalAura: number; auraPerLevel: number }
/**
 * Sets the total aura for a player. Will not go over max level or under 0
 * @param playerId
 * @param totalAura
 */
setTotalAura(playerId: PlayerId, totalAura: number): void
/**
 * Set the aura level for a player - shortcut for setTotalAura(level * auraPerLevel)
 * @param playerId
 * @param level
 */
setAuraLevel(playerId: PlayerId, level: number): void
/**
 * Add (or remove if negative) aura to a player. Will not go over max level or under 0
 * @param playerId
 * @param auraDiff
 * @returns The actual change in aura
 */
applyAuraChange(playerId: PlayerId, auraDiff: number): number
/**
 * Updates the particle systems of multiple mesh entities at specified nodes
 * @param updates
 */
updateMeshParticleSystems(updates: MeshParticleSystemUpdates): void
/**
 * Gets a database value that is saved per lobby.
 * @param key
 */
getLobbyDbValue(key: string): PNull<string | number>
/**
 * Sets a database value that is saved per lobby. This persists between sessions.
 * @param key
 * @param value
 */
setLobbyDbValue(key: string, value: string | number): void
/**
 * Deletes a database value that is saved per lobby.
 * @param key
 */
deleteLobbyDbValue(key: string): void
/**
 * Deletes all database values that are saved per lobby.
 */
deleteAllLobbyDbValues(): void
/**
 * Gets a database value that is saved per player.
 * @param playerId
 * @param key
 */
getPlayerDbValue(playerId: PlayerId, key: string): PNull<string | number>
/**
 * Sets a database value that is saved per player. This persists between sessions and between lobbies for custom games.
 * @param playerId
 * @param key
 * @param value
 */
setPlayerDbValue(playerId: PlayerId, key: string, value: string | number): void
/**
 * Deletes a database value that is saved per player.
 * @param playerId
 * @param key
 */
deletePlayerDbValue(playerId: PlayerId, key: string): void
/**
 * Deletes all database values that are saved per player.
 * @param playerId
 */
deleteAllPlayerDbValues(playerId: PlayerId): void
/**
 * Set a default value to be returned by your callback code if it throws an error.
 *
 * @param cbName The name of the callback to set the default value for.
 * @param value The default value to return.
 */
setCallbackValueFallback(cbName: UserCallbacks, value: any): void
/**
 * Set the gamemode of a player. This is persistent across lobbies for custom games.
 *
 * @param playerId The ID of the player to set the gamemode of.
 * @param gamemode The gamemode to set the player to.
 */
setPlayerGamemode(playerId: PlayerId, gamemode: WorldGamemode): void
/**
 * Get the gamemode of a player.
 *
 * @param playerId The ID of the player to get the gamemode of.
 * @returns The gamemode of the player.
 */
getPlayerGamemode(playerId: PlayerId): WorldGamemode
/**
 * Returns true if your code is about to be interrupted for exceeding its time budget.
 * Use this to break up long-running code into smaller chunks.
 *
 *
 * ### Example:
 * ```js
 * // Resume from where we stopped last time (or 0 on the first run)
 * let savedLoopCounter = 0
 *
 * // ...
 *
 * for (let i = savedLoopCounter; i < 1000; i++) {
 * 	if (api.isNearInterrupt()) {
 * 		// Out of time - remember our progress and stop before getting killed
 * 		savedLoopCounter = i
 * 		break
 * 	}
 *
 * 	someExpensiveFunction()
 * }
 * ```
 */
isNearInterrupt(): boolean
/**
 * Schedule small text to be displayed in the middle of the screen (middleTextLower).
 * This text will be removed after the duration.
 * Stacking queued texts will schedule them to be displayed one after the other.
 * NOTE: Overriding the middleTextLower client option may cause queued texts to be displayed incorrectly.
 *
 * @param playerId The ID of the player to display the text to.
 * @param text The text to display.
 * @param duration The duration of the text in milliseconds.
 * @returns The ID of the queued command.
 */
queueMiddleTextLower(playerId: PlayerId, text: string | CustomTextStyling, duration: number): QueuedCommandId
/**
 * Schedule large text to be displayed in the middle of the screen (middleTextUpper).
 * This text will be removed after the duration.
 * Stacking queued texts will schedule them to be displayed one after the other.
 * NOTE: Overriding the middleTextUpper client option may cause queued texts to be displayed incorrectly.
 *
 * @param playerId The ID of the player to display the text to.
 * @param text The text to display.
 * @param duration The duration of the text in milliseconds.
 * @returns The ID of the queued command.
 */
queueMiddleTextUpper(playerId: PlayerId, text: string | CustomTextStyling, duration: number): QueuedCommandId
/**
 * Schedule text to be displayed in the crosshair.
 * This text will be removed after the duration.
 * Stacking queued texts will schedule them to be displayed one after the other.
 * NOTE: Overriding the crosshairText client option may cause queued texts to be displayed incorrectly.
 *
 * @param playerId The ID of the player to display the text to.
 * @param text The text to display.
 * @param duration The duration of the text in milliseconds.
 * @returns The ID of the queued command.
 */
queueCrosshairText(playerId: PlayerId, text: string | CustomTextStyling, duration: number): QueuedCommandId
/**
 * Get the status of a queued command.
 *
 * @param id The ID of the queued command to get the status of.
 * @returns NOT_IN_QUEUE, WAITING_TO_RUN, or CURRENTLY_RUNNING.
 */
getQueuedStatus(id: QueuedCommandId): QueuedStatusString
/**
 * Remove a queued command from the queue.
 *
 * @param id The ID of the queued command to remove.
 */
removeFromQueue(id: QueuedCommandId): void
/**
 * Log a message to chat.
*/
log(message: string): void

	}
	/** Game API */
	declare const api: GameApi;
type EntityId = string;
type Pos = [number, number, number];
type LifeformId = EntityId;
type PlayerId = LifeformId;
type PNull<T> = T | null;
type PlayerDbId = string;
type LifeformBodyPart = (_TypeOf["lifeformBodyParts"])[number];
interface PlayerAttemptDamageOtherPlayerOpts {
    eId: PlayerId;
    hitEId: PlayerId;
    attemptedDmgAmt: number;
    withItem: string;
    bodyPartHit?: LifeformBodyPart;
    attackDir?: number[];
    showCritParticles?: boolean;
    reduceVerticalKbVelocity?: boolean;
    horizontalKbMultiplier?: number;
    verticalKbMultiplier?: number;
    broadcastEntityHurt?: boolean;
    attackCooldownSettings?: PNull<{
        type: string;
        cooldownMs: number;
    }>;
    hittingSoundOverride?: HittingSoundOverride;
    ignoreOtherEntitySettingCanAttack?: boolean;
    isTrueDamage?: boolean;
    damagerDbId?: PNull<PlayerId>;
}
type HittingSoundOverride = {
    sound: string;
    volume: number;
    pitch: number;
};
type ItemName = string;
type EnchantmentAttributes = {
    enchantments: Partial<Record<EnchantmentPerk, number>>;
    enchantmentTier: EnchantmentTier;
    id: string;
};
type EnchantmentPerk = (_TypeOf["enchantmentPerks"])[number];
type EnchantmentTier = (_TypeOf["enchantmentTiers"])[number];
type CustomTextStyling = (string | EntityName | TranslatedText | StyledIcon | StyledText | ProgressBar)[];
type TranslatedText = {
    translationKey: string;
    params?: Record<string, string | number | boolean | EntityName>;
};
type EntityName = {
    entityName: string;
    ranks?: Readonly<Rank[]>;
    style?: {
        color?: string;
        colour?: string;
    };
};
type Rank = (_TypeOf["ranks"])[number];
type StyledIcon = {
    icon: string;
    style?: {
        color?: string;
        colour?: string;
        fontSize?: FontSize;
        opacity?: number;
    };
};
type FontSize = string;
type StyledText = {
    str: string | EntityName | TranslatedText;
    style?: TextStyle;
    clickableUrl?: string;
};
type TextStyle = {
    color?: string;
    colour?: string;
    fontWeight?: string;
    fontSize?: FontSize;
    fontStyle?: string;
    opacity?: number;
};
type ProgressBar = {
    type: "ProgressBar";
    progress: number;
    width?: FontSize;
    height?: FontSize;
    colours?: string[];
    backgroundColour?: string;
};
type ClientOption = keyof ClientOptions;
type EarthSkyBox = {
    type: "earth";
    inclination?: number;
    turbidity?: number;
    infiniteDistance?: boolean;
    luminance?: number;
    rayleigh?: number;
    mieCoefficient?: number;
    mieDirectionalG?: number;
    distance?: number;
    sunPosition?: Vec3;
    useSunPosition?: boolean;
    xCameraOffset?: number;
    yCameraOffset?: number;
    zCameraOffset?: number;
    up?: Vec3;
    dithering?: boolean;
    azimuth?: number;
    vertexTint?: Vec3;
};
type Vec3 = [number, number, number];
type LobbyLeaderboardInfo = Record<string, {
    displayName?: string | CustomTextStyling;
    hidden?: boolean;
    sortOrder?: "ascending" | "descending";
    sortPriority?: number;
}>;
type TextWithDisplayOptions = {
    showBackground?: boolean;
    content: string | CustomTextStyling;
};
type HeaderChip = string | CustomTextStyling | TextWithDisplayOptions;
type GunshotOrigin = "default" | "head";
type ShopCategoryKey = string;
type ShopItemKey = string;
type ShopItem = {
    image: string;
    schematicId?: SchematicId;
    cost?: number;
    currency?: string;
    amount?: number;
    imageColour?: string;
    canBuy?: boolean;
    isSelected?: boolean;
    buyButtonText?: string | CustomTextStyling;
    customTitle?: string | CustomTextStyling;
    description?: string | CustomTextStyling;
    onBoughtMessage?: string | CustomTextStyling;
    redDot?: boolean;
    forceRemoveRedDot?: boolean;
    isRewardedAd?: boolean;
    badge?: {
        text: string | CustomTextStyling;
        type: ShopItemBadgeType;
    };
    userInput?: ShopItemUserInput;
    enchant?: {
        tier: EnchantmentTier;
        enchantments: Partial<Record<EnchantmentPerk, number>>;
        enchantmentData?: Record<string, {
            icon?: string;
            description?: string;
        }>;
    };
    boughtCallback?: (playerId: PlayerId, cost: number, currency: string, categoryKey: ShopCategoryKey, itemKey: ShopItemKey, userInput: string, amount: number | undefined) => void;
    sell?: boolean;
    sortPriority?: number;
    hidden?: boolean;
};
type ShopItemUserInput = {
    type: "text";
    placeholderText?: string;
    wordCharsOnly?: boolean;
    initialValue?: string;
} | {
    type: "number";
    placeholderText?: string;
    initialValue?: string;
} | {
    type: "dropdown";
    dropdownOptions: readonly (string | {
        option: string;
        cost: number;
    })[];
    shouldResetSelectionOnOptionsChange?: boolean;
    initialValue?: string;
    autoSubmit?: boolean;
} | {
    type: "player";
    excludedPlayers?: PlayerId[];
} | {
    type: "color";
    initialValue?: string;
};
type SchematicId = string;
type ShopItemBadgeType = (_TypeOf["shopItemBadgeTypes"])[number];
type ShopCategoryConfig = Partial<{
    autoSelectCategory: boolean;
    customTitle: string;
    redDot: boolean;
    forceRemoveRedDot: boolean;
    sortPriority: number;
    description: string | CustomTextStyling;
}>;
type OtherEntitySetting = keyof OtherEntitySettings;
type EntityMeshScalingMap = {
    [key in EntityNamedNode]?: number[];
};
type EntityNamedNode = PlayerMeshNamedNode;
type PlayerMeshNamedNode = (_TypeOf["playerMeshNamedNodes"])[number];
type LobbyLeaderboardValues = Record<string, string | number | CustomTextStyling>;
type ChatTags = CustomTextStyling[];
type NameTagInfo = {
    backgroundColor?: string;
    content?: (CustomTextStyling[number] | RankInfo)[];
    subtitle?: (CustomTextStyling[number] | RankInfo)[];
    subtitleBackgroundColor?: string;
    minLighting?: number;
    healthbar?: HealthbarInfo;
    border?: NameTagBorder;
};
type RankInfo = {
    icon: string;
    mainRGB: string;
    bracketRGB?: string;
    chatTag: {
        str: string;
        strRGB?: string;
    }[];
    nameTag: {
        iconRGB?: string;
        iconShadowRGB?: string;
    };
    visible: boolean;
};
type HealthbarInfo = Readonly<{
    display?: HealthbarDisplay;
    height?: FontSize;
    backgroundColour?: string;
    foregroundColour?: string | readonly HealthbarColourGradient[];
}>;
type NameTagBorder = Readonly<{
    colour: string;
    style?: NameTagBorderStyle;
    width?: FontSize;
    applyTo?: NameTagBorderTarget;
}>;
type HealthbarDisplay = (_TypeOf["healthbarDisplays"])[number];
type HealthbarColourGradient = Readonly<{
    healthFraction: number;
    colour: string;
}>;
type NameTagBorderStyle = (_TypeOf["nameTagBorderStyles"])[number];
type NameTagBorderTarget = (_TypeOf["nameTagBorderTargets"])[number];
type MultilineTextBox = {
    content: (CustomTextStyling[number] | RankInfo)[];
    backgroundColor?: string;
    animateIn?: boolean;
};
type TempParticleSystemOpts = ParticleSystemOpts & {
    dir1: number[];
    dir2: number[];
    pos1: number[];
    pos2: number[];
    manualEmitCount: number;
    hideDist: number;
};
type ParticlePresetOpts = {
    presetId: ParticlePresetId;
    pos1: number[];
    pos2: number[];
};
type ParticleSystemOpts = {
    texture: string;
    minLifeTime: number;
    maxLifeTime: number;
    minEmitPower: number;
    maxEmitPower: number;
    minSize: number;
    maxSize: number;
    gravity: number[];
    velocityGradients: VelocityGradient[];
    colorGradients: TimeColorGradient[] | RandomColorGradient[];
    blendMode: ParticleSystemBlendMode;
};
type VelocityGradient = {
    timeFraction: number;
    factor: number;
    factor2: number;
};
type TimeColorGradient = {
    timeFraction: number;
    minColor: [number, number, number, number];
    maxColor?: [number, number, number, number];
};
type RandomColorGradient = {
    color: [number, number, number];
};
type ParticlePresetId = keyof _TypeOf["particlePresets"];
type AnimationSchema = Readonly<{
    animationDurationMs: number;
    loop?: LoopModeSchema;
    nodeAnimations?: NodeSkeletonAnimationSchema;
}>;
type BlockbenchAnimationSchema = Readonly<{
    animation_length: number;
    loop?: BlockbenchLoopModeSchema;
    bones?: BlockbenchBonesAnimationSchema;
}>;
type LoopModeSchema = boolean | "hold-on-last-frame";
type AnimationTimelineSchema = readonly KeyframeSchema[];
type KeyframeSchema = Readonly<{
    timeFraction: number;
    rotation?: LerpPointSchema;
    position?: LerpPointSchema;
}>;
type LerpPointSchema = Point | Readonly<{
    lerpMode?: LerpModeSchema;
    point: Point;
}> | Readonly<{
    lerpMode?: LerpModeSchema;
    pre: Point;
    post: Point;
}>;
type Point = Readonly<Vec3>;
type LerpModeSchema = "linear" | "catmull-rom-spline";
type BlockbenchLoopModeSchema = boolean | "hold_on_last_frame";
type BlockbenchAnimationTimelineSchema = Point | Readonly<Record<TimestampString, BlockbenchAnimationFrameSchema>>;
type TimestampString = string;
type BlockbenchAnimationFrameSchema = Point | Readonly<{
    lerp_mode?: BlockbenchLerpModeSchema;
    pre?: Point;
    post: Point;
}>;
type BlockbenchLerpModeSchema = "linear" | "catmullrom";
type NodeSkeletonAnimationSchema = Readonly<Record<NodeName, NodeAnimationSchema>>;
type NodeName = string;
type NodeAnimationSchema = Readonly<{
    timeline: AnimationTimelineSchema;
}>;
type BlockbenchBonesAnimationSchema = Readonly<Record<NodeName, BlockbenchBoneAnimationSchema>>;
type BlockbenchBoneAnimationSchema = Readonly<{
    rotation?: BlockbenchAnimationTimelineSchema;
    position?: BlockbenchAnimationTimelineSchema;
}>;
type MobId = LifeformId;
type MobDbId = string;
type BlockName = string;
type BlockId = number;
type WorldBlockChangedInfo = {
    cause: PNull<WorldBlockChangedCause>;
};
type WorldBlockChangedCause = "Paintball" | "FloorCreator" | "Sapling" | "StemFruit" | "MeltingIce" | "Explosion";
type GameChunk = {
	blockData: any
	extraInfo: PersistedExtraInfo
}
type PersistedExtraInfo = {
	specialBlocks: any[]
	entities: any[]
	// We allow games and plugins to store custom metadata in the chunk,
	// but that metadata should be:
	// - minimal, to avoid issues where the chunk is too large to store;
	// - updated infrequently, to avoid excessive writes to the DB.
	customMetadata: any
}
type MobType = (_TypeOf["mobTypes"])[number];
type ItemAttributes = {
    customDisplayName?: string;
    customDescription?: string;
    customAttributes?: Record<string, any>;
};
type ItemDropOptions = Readonly<Partial<{
    doPhysics: boolean;
    size: number;
}>>;
type AnimParams = {
    animTextures: string[];
    animationInterval: number;
};
type HarvestType = "granule" | "wood" | "rock" | "cuttable";
type BlockMetadataModelType = "CentreCross" | "SquareSided" | "CustomPlanes" | "CustomModel" | "Slab" | "door" | "trapdoor" | "rotatableOffset" | "rotatable";
type SpecialToolDrop = {
    tool: ItemName | ItemName[];
    drops: ItemName | BlockName;
};
type RecursiveReadonly<T> = T extends Primitive ? T : T extends (...args: never[]) => unknown ? T : T extends readonly unknown[] ? number extends T["length"] ? ReadonlyArray<RecursiveReadonly<T[number]>> : {
    readonly [K in keyof T]: RecursiveReadonly<T[K]>;
} : Readonly<{
    [K in keyof T]: RecursiveReadonly<T[K]>;
}>;
type Primitive = string | number | boolean | bigint | symbol | undefined | null;
type SoundType = "stone" | "wood" | "gravel" | "grass" | "glass" | "sand" | "snow" | "cloth";
type GunStatsOverride = Partial<Omit<GunMetadata, NonOverridableStats>>;
type GunMetadata = {
    gunType: GunCategory;
    scopeType: "none" | "sniper";
    muzzleFlashOffsetFromGun: Vec3;
    muzzleFlashScale?: number;
    autoFireWithMouse: boolean;
    fireRate: number;
    fireRateWithHeldTouch?: number;
    burstCount?: number;
    burstDelay?: number;
    damage: number;
    shotPelletCount?: number;
    reloadTime?: number;
    clipSize: number;
    reloadBulletsIndividually?: boolean;
    bulletReloadTime?: number;
    cockTime?: number;
    tagSpeedMult: number;
    subsequentTagSpeedReductionScalar: number;
    inaccuracyStanding: number;
    inaccuracyFromShot: number;
    inaccuracyMovement: number;
    yVelocityInaccuracy: number;
    inaccuracyFromJump: number;
    altInaccuracyStanding: number;
    altInaccuracyFromShot: number;
    altInaccuracyMovement: number;
    recoveryRate: number;
    msPerRound?: number;
    msPerRoundTouchScreen?: number;
    altYVelocityInaccuracy?: number;
    altInaccuracyFromJump?: number;
    hasVerticalInaccuracy?: boolean;
    keepScopeOnShot?: boolean;
    aimZoomFactor?: number;
    kickbackDecreaseRate: number;
    minKickback?: number;
    maxKickback?: number;
    kickbackRate?: number;
};
type NonOverridableStats = "msPerRound" | "msPerRoundTouchScreen" | "tagSpeedMult" | "subsequentTagSpeedReductionScalar";
type GunCategory = (_TypeOf["gunCategories"])[number];
type WeaponComboInfo = Readonly<{
    comboWindowMs: number;
    comboMultipliers: readonly number[];
    backstabAngle?: number;
}>;
type AnyMetadataItem = Partial<BlockMetadataItem & NonBlockMetadataItem>;
type CustomItemStat = (_TypeOf["customItemStats"])[number];
type InvenItem = {
    name: string;
    amount: PNull<number>;
    attributes: ItemAttributes;
    typeObj: any;
};
type RecipesForItem = RecursiveReadonly<{
    requires: {
        items: ItemName[];
        amt: number;
    }[];
    produces: number;
    station?: string | string[];
    onCraftedAura?: number;
    isStarterRecipe?: boolean;
    attributes?: ItemAttributes;
}[]>;
type EntityType = PNull<NetworkedEntityType | "Mesh" | "Item">;
type NetworkedEntityType = LifeformType | ThrowableItem | string | string;
type LifeformType = (_TypeOf["lifeformTypes"])[number];
type ThrowableItem = string;
type MeshEntityType = keyof MeshEntityOpts;
type MeshEntityOptsStringified = string;
type MeshEntityOpts = {
    Box: CommonMeshEntityOpts & {
        width: number;
        height: number;
        depth: number;
        diffuseColor?: number[];
        emissiveColor?: number[];
        backFaceCulling?: boolean;
        texture?: string;
        faceUV?: number[][];
        animateTexture?: boolean;
    };
    BloxdBlock: CommonMeshEntityOpts & {
        blockName: BlockNameOrId;
        size: number | [number, number, number];
    };
    Person: CommonMeshEntityOpts & {
        size?: number;
        textures?: Partial<Cosmetics>;
        pose?: PlayerPose;
    };
    ParticleEmitter: MeshParticleSystemOpts;
};
type CommonMeshEntityOpts = {
    hideDist?: number;
    meshOffset?: number[];
    autoRotate?: boolean;
    lineToEId?: EntityId;
};
type BlockNameOrId = BlockName | BlockId;
type Cosmetics = Record<CosmeticType, CosmeticName>;
type PlayerPose = (_TypeOf["playerPoses"])[number];
type MeshParticleSystemOpts = ParticleSystemOpts & CommonMeshEntityOpts & {
    height: number;
    width: number;
    depth: number;
    emitRate: number;
    dir1?: number[];
    dir2?: number[];
};
type CosmeticType = (_TypeOf["cosmeticTypes"])[number];
type CosmeticName = string;
type MobHerdId = number;
type MobSpawnOpts<TMobType extends MobType> = Partial<{
    mobHerdId: MobHerdId;
    spawnerId: PlayerId;
    mobDbId: MobDbId;
    name: string;
    playSoundOnSpawn: boolean;
    variation: MobVariation<TMobType>;
    physicsOpts: Partial<{
        width: number;
        height: number;
        collidesEntities: boolean;
    }>;
}>;
type MobVariation<TMobType extends MobType> = (_TypeOf["mobVariations"])[TMobType][number];
type MobSetting = (_TypeOf["mobSettings"])[number];
type MobSettings<TMobType extends MobType> = {
    variation: MobVariation<TMobType>;
    name: string;
    maxHealth: number;
    initialHealth: number;
    idleSound: PNull<string>;
    attackSound: PNull<string>;
    secondaryAttackSound: PNull<string>;
    hurtSound: PNull<string>;
    onDeathItemDrops: readonly MobItemDrop[];
    onDeathParticleTexture: string;
    onDeathAura: number;
    baseWalkingSpeed: number;
    baseRunningSpeed: number;
    walkingSpeedMultiplier: number;
    runningSpeedMultiplier: number;
    jumpCount: number;
    baseJumpImpulseXZ: number;
    baseJumpImpulseY: number;
    jumpMultiplier: number;
    runAwayRadius: number;
    chaseRadius: number;
    territoryRadius: number;
    hostilityRadius: number;
    stoppingRadius: number;
    attackInterval: number;
    attackRadius: number;
    secondaryAttackRadius: number;
    attackDamage: number;
    secondaryAttackDamage: number;
    isReceivingDamageCooldownGlobal: boolean;
    knockbackReceivedMultiplier: number;
    attackImpulse: number;
    secondaryAttackImpulse: number;
    rangedAttackInaccuracy: number;
    burstAttackInfo: PNull<MobBurstAttackInfo>;
    secondaryBurstAttackInfo: PNull<MobBurstAttackInfo>;
    heldItemName: PNull<ItemName>;
    heldItemEnchantmentTier: PNull<EnchantmentTier>;
    armour: MobArmour;
    attackItemName: PNull<ItemName>;
    secondaryAttackItemName: PNull<ItemName>;
    swingArmOnAttack: boolean;
    swingArmOnSecondaryAttack: boolean;
    attackEffectName: PNull<string>;
    attackEffectDuration: number;
    warpTargetSpecialAttackInfo: PNull<MobWarpTargetSpecialAttackInfo>;
    combatTetherInfo: PNull<MobCombatTetherCombatInfo>;
    evadeInfo: PNull<MobEvadeInfo>;
    chargeSpecialAttackInfo: PNull<MobChargeSpecialAttackInfo>;
    tameInfo: PNull<Readonly<MobTameInfo>>;
    onTamedHealthMultiplier: number;
    petInfo: Readonly<MobPetInfo>;
    ownerDbId: PNull<PlayerDbId>;
    minFollowingRadius: number;
    maxFollowingRadius: number;
    isRideable: boolean;
    healthRegen: PNull<MobHealthRegenSettings>;
    ridingSpeedMult: number;
    metaInfo: string;
};
type MobItemDrop = Readonly<{
    itemName: ItemName;
    probabilityOfDrop: number;
    dropMinAmount: number;
    dropMaxAmount: number;
    applyBurstImpulseToDrop?: boolean;
}>;
type MobBurstAttackInfo = Readonly<{
    burstAttackIntervals: readonly number[];
}>;
type MobArmour = Partial<Readonly<Record<ArmourPart, MobArmourPiece>>>;
type MobWarpTargetSpecialAttackInfo = Readonly<{
    cooldown: number;
    range: number;
    sound: PNull<string>;
    delay: number;
    minDestinationRadius: number;
    maxDestinationRadius: number;
    swingArm: boolean;
    particleOpts: PNull<TempMobParticleOpts>;
}>;
type MobCombatTetherCombatInfo = Readonly<{
    range: number;
    particleOpts: MobParticleOpts;
}>;
type MobEvadeInfo = Readonly<{
    probability: number;
    impulse: number;
    minAngle: number;
    maxAngle: number;
}>;
type MobChargeSpecialAttackInfo = Readonly<{
    chargeSpeedMult?: number;
    faceTolerance?: number;
    chargePose?: PlayerPose;
}>;
type MobTameInfo = {
    tameItemName: ItemName | readonly ItemName[];
    probabilityOfTame: number;
    isSaddleable?: boolean;
    saddleItemName?: ItemName;
    foodItemNames?: readonly ItemName[];
    foodItemsWithEffects?: readonly Readonly<ItemNameWithEffects>[];
    supportsFriendship?: boolean;
    likedFoods?: readonly ItemName[];
    neutralFoods?: readonly ItemName[];
    dislikedFoods?: readonly ItemName[];
    guaranteedDrop?: ItemName;
    commonDrops?: ItemName[];
    levelUpBonuses?: LevelUpBonuses;
};
type MobPetInfo = {
    friendshipPoints: number;
    lastFedAt: number;
    highestFriendshipLevelReached: MobFeedLevel;
    superlikedFood: PNull<ItemName>;
    superlikedFoodKnown: boolean;
    bonusesGained: readonly MobLevelUpBonus[];
};
type MobHealthRegenSettings = Readonly<{
    amount: number;
    interval: number;
    startAfter: number;
}>;
type ArmourPart = (_TypeOf["armourPieces"])[number];
type MobArmourPiece = Readonly<{
    itemName: ItemName;
    enchantmentTier?: EnchantmentTier;
}>;
type TempMobParticleOpts = Readonly<{
    duration: number;
}> & MobParticleOpts;
type MobParticleOpts = Readonly<Pick<MeshParticleSystemOpts, "texture" | "colorGradients">>;
type ItemNameWithEffects = {
    itemName: ItemName;
    effects: readonly Readonly<EffectOpts>[];
    healAmt?: number;
};
type LevelUpBonuses = RecursiveReadonly<Record<MobFeedLevelUpLevels, MobLevelUpBonus>>;
type EffectOpts = {
    name: PotionEffect;
    duration: number;
    level: number;
};
type PotionEffect = (_TypeOf["potionEffects"])[number];
type MobFeedLevelUpLevels = Exclude<MobFeedLevel, 0>;
type MobLevelUpBonus = (_TypeOf["mobLevelUpBonuses"])[number];
type MobFeedLevel = InclusiveRange<_TypeOf["MAX_MOB_FEED_LEVEL"]>;
type InclusiveRange<N extends number, Arr extends number[] = []> = Arr["length"] extends N ? Arr[number] | Arr["length"] : InclusiveRange<N, [...Arr, Arr["length"]]>;
type MobAiState = (_TypeOf["mobAiStates"])[number];
type MobAiStateParams<TState extends MobAiState> = MobWorldView[TState];
type MobWorldView = {
    idle: null;
    disabled: null;
    idleBeforeTurning: null;
    turning: null;
    idleBeforeWalking: null;
    walking: null;
    runningAway: {
        targetId: LifeformId;
    };
    chasing: {
        targetId: LifeformId;
    };
    turningBeforeCharging: {
        targetId: LifeformId;
    };
    charging: {
        targetId: LifeformId;
    };
    following: {
        targetId: LifeformId;
    };
    watching: {
        targetId: LifeformId;
    };
    walkingToPosition: {
        pos: Pos;
    };
    runningToPosition: {
        pos: Pos;
    };
};
type MeshEntityPhysicsOpts = {
    doPhysics: boolean;
    onCollideTerrain?: () => void;
    collidesEntities?: boolean;
    collideBits?: number;
    collideMask?: number;
    heightExpandAmt?: number;
    widthExpandAmt?: number;
};
type QTEType = keyof QTEDefinitions;
type QTEClientParameters<T extends QTEType = QTEType> = {
    type: T;
    parameters: QTEParametersForType<T>;
};
type QTEParametersForType<T extends QTEType> = QTEDefinitions[T]["params"];
interface QTEDefinitions {
    progressBar: {
        params: ProgressBarQteParams;
        state: ProgressBarQteState;
    };
    timedClick: {
        params: TimedClickQteParams;
        state: TimedClickQteState;
    };
    gravityBar: {
        params: GravityBarQteParams;
        state: GravityBarQteState;
    };
    precisionBar: {
        params: PrecisionBarQteParams;
        state: PrecisionBarQteState;
    };
    rhythmClick: {
        params: RhythmClickQteParams;
        state: RhythmClickQteState;
    };
}
type ProgressBarQteParams = Readonly<{
    /** Starting progress value (0-100) @default 30 */
    progressStartValue?: number;
    /** How much progress drains each tick while the player isn't clicking @default 0.075 */
    progressDecreasePerTick: number;
    /** How much progress is gained per click @default 5 */
    progressPerClick: number;
    /** If true, the QTE fails when progress reaches 0; otherwise progress clamps at 0 @default false */
    canFail: boolean;
    /** Rich text shown as the QTE prompt @default [{ str: "Click repeatedly to complete!" }] */
    description: CustomTextStyling;
    /** Icon displayed on the click target @default "fa-solid fa-computer-mouse" */
    clickIcon: string;
    /** Scale multiplier for the click icon (must be > 0) @default 1 */
    scale?: number;
    /** Rotation in degrees for the click icon (must be ≥ 0) @default 15 */
    rotation?: number;
}>;
type ProgressBarQteState = {
    progress: number;
    clickCount: number;
};
type TimedClickQteParams = Readonly<{
    /** Duration in milliseconds the player has to click @default 3000 */
    timeWindow: number;
    /** Icon displayed on the click target @default "fa-solid fa-computer-mouse" */
    icon: string;
    /** Rich text shown as the QTE prompt @default [{ str: "Click to complete the QTE!" }] */
    label: CustomTextStyling;
    /** Whether to display a countdown timer @default true */
    showTimer: boolean;
    /** Scale multiplier for the icon (must be > 0) @default 1 */
    scale?: number;
    /** Rotation in degrees for the icon (must be ≥ 0) @default 15 */
    rotation?: number;
    /** If true, the icon pulses with a breathing animation anchored to the centre @default false */
    breatheCenter?: boolean;
}>;
type TimedClickQteState = {
    timeRemaining: number;
    timeWindow: number;
};
type GravityBarQteParams = Readonly<{
    /** Starting progress value (0-100) @default 30 */
    progressStartValue?: number;
    /** Size of the player's catch zone as a fraction of the bar (must be > 0, 0-1) @default 0.25 */
    catchZoneSize: number;
    /** Speed at which the mover travels along the bar (must be > 0) @default 3 */
    moverSpeed: number;
    /** How erratically the mover changes direction (higher = more unpredictable) @default 0.8 */
    moverErraticness: number;
    /** Downward pull on the catch zone when the player isn't holding click @default 1 */
    gravity: number;
    /** Upward force on the catch zone while the player holds click @default 1.5 */
    riseSpeed: number;
    /** Progress gained per second while the mover is inside the catch zone @default 8 */
    progressGainPerSecond: number;
    /** Progress lost per second while the mover is outside the catch zone @default 4 */
    progressDrainPerSecond: number;
    /** If true, the QTE fails when progress reaches 0; otherwise progress clamps at 0 @default false */
    canFail: boolean;
    /** Rich text shown as the QTE prompt @default [{ str: "Hold to catch!" }] */
    description: CustomTextStyling;
    /** Icon displayed on the mover @default "Moonfish" */
    icon?: string;
}>;
type GravityBarQteState = {
    catchZonePosition: number;
    catchZoneSize: number;
    moverPosition: number;
    progress: number;
    isCatching: boolean;
};
type PrecisionBarQteParams = Readonly<{
    /** Speed of the marker in full bar-widths per second (must be > 0, e.g. 1.0 = one full sweep per second) @default 0.5 */
    speed: number;
    /** Fraction of the bar that counts as the success zone, centred in the middle (must be > 0, 0-1, e.g. 0.15 = 15%) @default 0.15 */
    successZoneSize: number;
    /** Rich text shown as the QTE prompt @default [{ str: "Click when the marker is within the green zone." }] */
    label: CustomTextStyling;
    /** Icon displayed on the marker @default "" */
    icon?: string;
    /** Scale multiplier for the icon (must be > 0) @default 1 */
    scale?: number;
    /** Rotation in degrees for the icon (must be ≥ 0) @default 0 */
    rotation?: number;
}>;
type PrecisionBarQteState = {
    /** Marker position as 0–1 where 0.5 is the centre */
    markerPosition: number;
};
type RhythmClickQteParams = Readonly<{
    /** Number of successful clicks needed to complete the QTE (must be a positive integer) @default 5 */
    requiredSuccesses: number;
    /** Duration in milliseconds for the outer circle to shrink from max size to centre (must be > 0) @default 1200 */
    shrinkDurationMs: number;
    /** Fraction of the inner circle radius that counts as a successful overlap (must be > 0, 0-1, e.g. 0.15 = ±15%) @default 0.15 */
    toleranceFraction: number;
    /** Max misses allowed before failing. If omitted, unlimited misses are permitted (must be a non-negative integer) @default 3 */
    maxMisses?: number;
    /** Rich text shown as the QTE prompt @default [{ str: "Click when the circles align!" }] */
    label: CustomTextStyling;
    /** Icon displayed in the centre of the circles @default "" */
    icon?: string;
}>;
type RhythmClickQteState = {
    /** Current outer circle radius as a fraction of the max radius (1 = fully expanded, 0 = at centre) */
    outerCircleProgress: number;
    /** Number of successful clicks so far */
    successes: number;
    /** Number of required successes to complete */
    requiredSuccesses: number;
    /** Number of misses so far */
    misses: number;
    /** Result of the most recent click: null if no click yet, true if hit, false if miss */
    lastClickResult: boolean | null;
};
type QTERequestId = number;
type IngameIconName = (_TypeOf["ingameIconNames"])[number];
type InbuiltEffectInfo = { inbuiltLevel: number; initiatorId?: PlayerId }
type PlayerPhysicsState<TPhysicsType extends PhysicsType> = Readonly<{
    type: TPhysicsType;
    tier: PhysicsTier<TPhysicsType>;
}>;
type PhysicsTier<TPhysicsType extends PhysicsType> = PNull<PhysicsTiers[TPhysicsType]>;
type PhysicsTiers = {
    [PhysicsType.DEFAULT]: null;
    [PhysicsType.BOAT]: BoatTier;
    [PhysicsType.GLIDER]: GliderTier;
    [PhysicsType.BALLOON]: BalloonTier;
    [PhysicsType.SLEEPING]: SleepingTier;
    [PhysicsType.RIDING_MOB]: null;
    [PhysicsType.CAR]: CarTier;
    [PhysicsType.HOVERCRAFT]: null;
};
type AngleDir = {
    theta: number;
    phi: number;
};
type BlockRaycastResult = PNull<{
	blockID: BlockId // The block ID of the block that was hit
	position: Pos // The position of the block that was hit
	normal: Pos // The normal of the face that was hit
	adjacent: Pos // The position of the block adjacent to the hit face
}>
type MeshParticleSystemUpdates = Record<EntityId, Record<NodeName, MeshParticleSystemUpdate>>;
type MeshParticleSystemUpdate = {
    particleSystemDir1?: number[];
    particleSystemDir2?: number[];
    particleSystemMinSize?: number;
    particleSystemMaxSize?: number;
    particleSystemPlayingState?: boolean;
};
type UserCallbacks = "tick" | "onClose" | "onPlayerJoin" | "onPlayerLeave" | "onPlayerJump" | "onRespawnRequest" | "playerCommand" | "onPlayerChat" | "onPlayerChangeBlock" | "onBlockStand" | "onBlockStandStart" | "onBlockStandStop" | "onPlayerAttemptCraft" | "onPlayerCraft" | "onPlayerAttemptOpenChest" | "onPlayerOpenedChest" | "onPlayerMoveItemOutOfInventory" | "onPlayerDropItem" | "onPlayerPickedUpItem" | "onPlayerSelectInventorySlot" | "onPlayerAttack" | "onPlayerDamagingOtherPlayer" | "onPlayerDamagingMob" | "onMobDamagingPlayer" | "onMobDamagingOtherMob" | "onAttemptKillPlayer" | "onPlayerKilledOtherPlayer" | "onMobKilledPlayer" | "onPlayerKilledMob" | "onMobKilledOtherMob" | "onPlayerPotionEffect" | "onPlayerDamagingMeshEntity" | "onPlayerBreakMeshEntity" | "onPlayerUsedThrowable" | "onPlayerThrowableHitTerrain" | "onTouchscreenActionButton" | "onPlayerMoveInvenItem" | "onPlayerMoveItemIntoIdxs" | "onPlayerSwapInvenSlots" | "onPlayerMoveInvenItemWithAmt" | "onPlayerAttemptAltAction" | "onPlayerAltAction" | "onPlayerClick" | "onPlayerClickUp" | "onClientOptionUpdated" | "onMobSettingUpdated" | "onInventoryUpdated" | "onChestUpdated" | "onWorldChangeBlock" | "onCreateBloxdMeshEntity" | "onEntityCollision" | "onPlayerAttemptSpawnMob" | "onWorldAttemptSpawnMob" | "onPlayerSpawnMob" | "onWorldSpawnMob" | "onWorldAttemptDespawnMob" | "onMobDespawned" | "onChunkLoaded" | "onPlayerRequestChunk" | "onItemDropCreated" | "onPlayerStartChargingItem" | "onPlayerFinishChargingItem" | "onPlayerFinishQTE" | "onPlayerToggledShopMenu" | "onPlayerBoughtShopItem" | "onPlayerPlayedEmote" | "doPeriodicSave"
type WorldGamemode = (_TypeOf["worldGamemodes"])[number];
type QueuedCommandId = string
type QueuedStatusString = (_TypeOf["QUEUED_COMMAND_STATUS_STRINGS"])[keyof _TypeOf["QUEUED_COMMAND_STATUS_STRINGS"]]
type MultiBlockInfo = {
    positions: {
        block: string;
        id: number;
        x: number;
        y: number;
        z: number;
    }[];
};
type BoughtShopItem = Omit<ShopItem, "boughtCallback" | "schematicId" | "isRewardedAd">;
type OnPlayerChatObjectResponse = Record<PlayerId, false | ChatMessageObject>
type ChatMessageObject = {
	prefixContent?: ChatTags
	chatContent?: CustomTextStyling
}
interface _TypeOf {
	lifeformBodyParts: readonly ["Torso", "Head", "ArmRight", "ArmLeft", "LegLeft", "LegRight"]
	enchantmentPerks: readonly ["Damage", "Attack Speed", "Critical Damage", "Protection", "Health", "Health Regen", "Stomp Damage", "Knockback Resist", "Arrow Speed", "Arrow Damage", "Quick Charge", "Break Speed", "Momentum", "Mining Yield", "Farming Yield", "Mining Aura", "Digging Aura", "Lumber Aura", "Farming Aura", "Horizontal Knockback", "Vertical Knockback"]
	enchantmentTiers: readonly ["Tier 1", "Tier 2", "Tier 3", "Tier 4", "Tier 5"]
	ranks: readonly ["developer", "admin", "super", "youtuber"]
	shopItemBadgeTypes: readonly ["new", "lucky"]
	playerMeshNamedNodes: readonly ["TorsoNode", "HeadMesh", "ArmRightMesh", "ArmLeftMesh", "LegLeftMesh", "LegRightMesh"]
	healthbarDisplays: readonly ["always", "never", "onDamage"]
	nameTagBorderStyles: readonly ["solid", "glow", "double"]
	nameTagBorderTargets: readonly ["both", "nametag", "healthbar"]
	particlePresets: { readonly damageInner: unknown; readonly damageOuter: unknown; readonly bouncinessInner: unknown; readonly bouncinessOuter: unknown; readonly miningYieldInner: unknown; readonly miningYieldOuter: unknown; readonly healthRegenInner: unknown; readonly healthRegenOuter: unknown; readonly damageReductionInner: unknown; readonly damageReductionOuter: unknown; readonly speedInner: unknown; readonly speedOuter: unknown; readonly invisibleInner: unknown; readonly invisibleOuter: unknown; readonly jumpBoostInner: unknown; readonly jumpBoostOuter: unknown; readonly poisonedInner: unknown; readonly poisonedOuter: unknown; readonly slownessInner: unknown; readonly slownessOuter: unknown; readonly weaknessInner: unknown; readonly weaknessOuter: unknown; readonly hasteInner: unknown; readonly hasteOuter: unknown; readonly doubleJumpInner: unknown; readonly doubleJumpOuter: unknown; readonly heatResistanceInner: unknown; readonly heatResistanceOuter: unknown; readonly thiefInner: unknown; readonly thiefOuter: unknown; readonly brainRotInner: unknown; readonly brainRotOuter: unknown; readonly blindnessInner: unknown; readonly blindnessOuter: unknown; readonly pickpocketerInner: unknown; readonly pickpocketerOuter: unknown; readonly lifestealInner: unknown; readonly lifestealOuter: unknown; readonly airWalkInner: unknown; readonly airWalkOuter: unknown; readonly wallClimbingInner: unknown; readonly wallClimbingOuter: unknown; readonly poopyInner: unknown; readonly poopyOuter: unknown; readonly knockbackInner: unknown; readonly knockbackOuter: unknown; readonly cleansedInner: unknown; readonly cleansedOuter: unknown; readonly instantDamageInner: unknown; readonly instantDamageOuter: unknown; readonly instantHealthInner: unknown; readonly instantHealthOuter: unknown; readonly shieldInner: unknown; readonly shieldOuter: unknown; readonly auraInner: unknown; readonly auraOuter: unknown; readonly xRayVisionInner: unknown; readonly xRayVisionOuter: unknown; readonly defaultFirecrackerSmall: { readonly colorGradients: TimeColorGradient[]; readonly texture: string; readonly minLifeTime: number; readonly maxLifeTime: number; readonly minEmitPower: number; readonly maxEmitPower: number; readonly minSize: number; readonly maxSize: number; readonly gravity: number[]; readonly velocityGradients: VelocityGradient[]; readonly blendMode: ParticleSystemBlendMode; readonly dir1: number[]; readonly dir2: number[]; readonly manualEmitCount: number; readonly hideDist: number; }; readonly defaultFirecrackerLarge: { readonly colorGradients: TimeColorGradient[]; readonly texture: string; readonly minLifeTime: number; readonly maxLifeTime: number; readonly minEmitPower: number; readonly maxEmitPower: number; readonly minSize: number; readonly maxSize: number; readonly gravity: number[]; readonly velocityGradients: VelocityGradient[]; readonly blendMode: ParticleSystemBlendMode; readonly dir1: number[]; readonly dir2: number[]; readonly manualEmitCount: number; readonly hideDist: number; }; readonly mango: unknown; readonly blackFirecrackerSmall: unknown; readonly blackFirecrackerLarge: unknown; readonly redFirecrackerSmall: unknown; readonly redFirecrackerLarge: unknown; readonly orangeFirecrackerSmall: unknown; readonly orangeFirecrackerLarge: unknown; readonly pinkFirecrackerSmall: unknown; readonly pinkFirecrackerLarge: unknown; readonly purpleFirecrackerSmall: unknown; readonly purpleFirecrackerLarge: unknown; readonly yellowFirecrackerSmall: unknown; readonly yellowFirecrackerLarge: unknown; readonly blueFirecrackerSmall: unknown; readonly blueFirecrackerLarge: unknown; readonly brownFirecrackerSmall: unknown; readonly brownFirecrackerLarge: unknown; readonly cyanFirecrackerSmall: unknown; readonly cyanFirecrackerLarge: unknown; readonly grayFirecrackerSmall: unknown; readonly grayFirecrackerLarge: unknown; readonly greenFirecrackerSmall: unknown; readonly greenFirecrackerLarge: unknown; readonly lightBlueFirecrackerSmall: unknown; readonly lightBlueFirecrackerLarge: unknown; readonly lightGrayFirecrackerSmall: unknown; readonly lightGrayFirecrackerLarge: unknown; readonly limeFirecrackerSmall: unknown; readonly limeFirecrackerLarge: unknown; readonly magentaFirecrackerSmall: unknown; readonly magentaFirecrackerLarge: unknown; readonly whiteFirecrackerSmall: unknown; readonly whiteFirecrackerLarge: unknown; readonly brainRot: unknown; readonly stomp: unknown; readonly fertiliser: unknown; readonly bonemeal: unknown; readonly mobTameSuccess: unknown; readonly mobTameFailure: unknown; readonly mobCatch: unknown; readonly spawnCaughtMob: unknown; readonly mobFeedDefault: unknown; readonly mobFeedSuperliked: { readonly colorGradients: TimeColorGradient[]; readonly texture: string; readonly minLifeTime: number; readonly maxLifeTime: number; readonly minEmitPower: number; readonly maxEmitPower: number; readonly minSize: number; readonly maxSize: number; readonly gravity: number[]; readonly velocityGradients: VelocityGradient[]; readonly blendMode: ParticleSystemBlendMode; readonly dir1: number[]; readonly dir2: number[]; readonly manualEmitCount: number; readonly hideDist: number; }; readonly mobFeedLike: { readonly colorGradients: TimeColorGradient[]; readonly texture: string; readonly minLifeTime: number; readonly maxLifeTime: number; readonly minEmitPower: number; readonly maxEmitPower: number; readonly minSize: number; readonly maxSize: number; readonly gravity: number[]; readonly velocityGradients: VelocityGradient[]; readonly blendMode: ParticleSystemBlendMode; readonly dir1: number[]; readonly dir2: number[]; readonly manualEmitCount: number; readonly hideDist: number; }; readonly mobFeedNeutral: { readonly colorGradients: TimeColorGradient[]; readonly texture: string; readonly minLifeTime: number; readonly maxLifeTime: number; readonly minEmitPower: number; readonly maxEmitPower: number; readonly minSize: number; readonly maxSize: number; readonly gravity: number[]; readonly velocityGradients: VelocityGradient[]; readonly blendMode: ParticleSystemBlendMode; readonly dir1: number[]; readonly dir2: number[]; readonly manualEmitCount: number; readonly hideDist: number; }; readonly mobFeedDisliked: { readonly colorGradients: TimeColorGradient[]; readonly texture: string; readonly minLifeTime: number; readonly maxLifeTime: number; readonly minEmitPower: number; readonly maxEmitPower: number; readonly minSize: number; readonly maxSize: number; readonly gravity: number[]; readonly velocityGradients: VelocityGradient[]; readonly blendMode: ParticleSystemBlendMode; readonly dir1: number[]; readonly dir2: number[]; readonly manualEmitCount: number; readonly hideDist: number; }; readonly mobDeath: unknown; readonly mobDeathSoul: unknown; readonly boardShopSuccess: unknown; readonly mobSpawnerBlockFail: { readonly colorGradients: [{ readonly timeFraction: 0; readonly minColor: [80, 80, 80, 1]; readonly maxColor: [160, 160, 160, 1]; }]; readonly texture: string; readonly minLifeTime: number; readonly maxLifeTime: number; readonly minEmitPower: number; readonly maxEmitPower: number; readonly minSize: number; readonly maxSize: number; readonly gravity: number[]; readonly velocityGradients: VelocityGradient[]; readonly blendMode: ParticleSystemBlendMode; readonly dir1: number[]; readonly dir2: number[]; readonly manualEmitCount: number; readonly hideDist: number; }; readonly mobSpawnerBlockPassive: { readonly colorGradients: [{ readonly timeFraction: 0; readonly minColor: [0, 200, 50, 1]; readonly maxColor: [0, 255, 100, 1]; }]; readonly texture: string; readonly minLifeTime: number; readonly maxLifeTime: number; readonly minEmitPower: number; readonly maxEmitPower: number; readonly minSize: number; readonly maxSize: number; readonly gravity: number[]; readonly velocityGradients: VelocityGradient[]; readonly blendMode: ParticleSystemBlendMode; readonly dir1: number[]; readonly dir2: number[]; readonly manualEmitCount: number; readonly hideDist: number; }; readonly mobSpawnerBlockNeutral: { readonly colorGradients: [{ readonly timeFraction: 0; readonly minColor: [200, 200, 0, 1]; readonly maxColor: [255, 255, 0, 1]; }]; readonly texture: string; readonly minLifeTime: number; readonly maxLifeTime: number; readonly minEmitPower: number; readonly maxEmitPower: number; readonly minSize: number; readonly maxSize: number; readonly gravity: number[]; readonly velocityGradients: VelocityGradient[]; readonly blendMode: ParticleSystemBlendMode; readonly dir1: number[]; readonly dir2: number[]; readonly manualEmitCount: number; readonly hideDist: number; }; readonly mobSpawnerBlockHostile: { readonly colorGradients: [{ readonly timeFraction: 0; readonly minColor: [200, 10, 0, 1]; readonly maxColor: [255, 20, 0, 1]; }]; readonly texture: string; readonly minLifeTime: number; readonly maxLifeTime: number; readonly minEmitPower: number; readonly maxEmitPower: number; readonly minSize: number; readonly maxSize: number; readonly gravity: number[]; readonly velocityGradients: VelocityGradient[]; readonly blendMode: ParticleSystemBlendMode; readonly dir1: number[]; readonly dir2: number[]; readonly manualEmitCount: number; readonly hideDist: number; }; readonly mobSpawnOrb: unknown; readonly aura: unknown; }
	mobTypes: readonly ["Pig", "Cow", "Sheep", "Horse", "Deer", "Wolf", "Wildcat", "Spirit Golem", "Spirit Wolf", "Spirit Bear", "Spirit Stag", "Spirit Gorilla", "Bear", "Stag", "Gold Watermelon Stag", "Gorilla", "Cave Golem", "Draugr Zombie", "Draugr Skeleton", "Frost Golem", "Frost Zombie", "Frost Skeleton", "Draugr Knight", "Draugr Huntress", "Magma Golem", "Draugr Warper", "Frost Wraith", "Draugr Reaver", "Stalker", "Crone", "NPC", "67", "Bobino Musculino", "Capitano Explovissimo"]
	gunCategories: readonly ["semi_automatic", "submachine", "rifle", "pistol", "shotgun"]
	customItemStats: readonly ["ttb", "displayName", "harvestLevel", "stoodOnSpeedMultiplier", "specialToolDrop", "specialToolBonusDrops", "description", "altActionable", "eatHealAmt", "eatShieldAmt", "damage", "attackRange", "attackCooldownMs", "secondaryDamage", "absorbThrowable", "armourReduction", "CrosshairText", "gunStats", "showInCreativeInven"]
	lifeformTypes: readonly ["Player", "Pig", "Cow", "Sheep", "Horse", "Deer", "Wolf", "Wildcat", "Spirit Golem", "Spirit Wolf", "Spirit Bear", "Spirit Stag", "Spirit Gorilla", "Bear", "Stag", "Gold Watermelon Stag", "Gorilla", "Cave Golem", "Draugr Zombie", "Draugr Skeleton", "Frost Golem", "Frost Zombie", "Frost Skeleton", "Draugr Knight", "Draugr Huntress", "Magma Golem", "Draugr Warper", "Frost Wraith", "Draugr Reaver", "Stalker", "Crone", "NPC", "67", "Bobino Musculino", "Capitano Explovissimo"]
	cosmeticTypes: readonly ["skin", "hat", "head", "eyebrows", "eyes", "back", "body", "legs", "shoes", "cape", "nameColour", "profileEffect", "emote"]
	playerPoses: readonly ["standing", "sitting", "zombie", "gliding", "driving", "sleeping", "riding"]
	mobVariations: { readonly Pig: readonly ["default"]; readonly Cow: readonly ["default", "cream"]; readonly Sheep: readonly ["default", "black", "red", "orange", "pink", "purple", "yellow", "blue", "brown", "cyan", "gray", "green", "lightBlue", "lightGray", "lime", "magenta"]; readonly Horse: readonly ["default", "black", "brown", "cream"]; readonly "Cave Golem": readonly ["default", "iron"]; readonly "Draugr Zombie": readonly ["default", "longHairChestplate", "longHairClothed", "shortHairClothed"]; readonly "Draugr Skeleton": readonly ["default"]; readonly "Frost Golem": readonly ["default"]; readonly "Frost Zombie": readonly ["default", "longHairChestplate", "shortHairClothed"]; readonly "Frost Skeleton": readonly ["default"]; readonly "Draugr Knight": readonly ["default"]; readonly Wolf: readonly ["default", "white", "brown", "grey", "spectral"]; readonly Bear: readonly ["default"]; readonly Deer: readonly ["default"]; readonly Stag: readonly ["default"]; readonly "Gold Watermelon Stag": readonly ["default"]; readonly Gorilla: readonly ["default"]; readonly Wildcat: readonly ["default", "tabby", "grey", "black", "calico", "siamese", "leopard"]; readonly "Magma Golem": readonly ["default"]; readonly "Draugr Huntress": readonly ["default", "chainmail"]; readonly "Spirit Golem": readonly ["default"]; readonly "Spirit Wolf": readonly ["default"]; readonly "Spirit Bear": readonly ["default"]; readonly "Spirit Stag": readonly ["default"]; readonly "Spirit Gorilla": readonly ["default"]; readonly "Draugr Warper": readonly ["default"]; readonly "Frost Wraith": readonly ["default"]; readonly "Draugr Reaver": readonly ["default"]; readonly Stalker: readonly ["default", "crimson", "frost", "void"]; readonly Crone: readonly ["default"]; readonly NPC: readonly ["default", "emma", "leo", "isabel", "sanjay", "imara", "enoch", "sara", "carmen"]; readonly "67": readonly ["default"]; readonly "Bobino Musculino": readonly ["default"]; readonly "Capitano Explovissimo": readonly ["default"]; }
	mobSettings: readonly ["variation", "name", "maxHealth", "initialHealth", "idleSound", "attackSound", "secondaryAttackSound", "hurtSound", "onDeathItemDrops", "onDeathParticleTexture", "onDeathAura", "baseWalkingSpeed", "baseRunningSpeed", "walkingSpeedMultiplier", "runningSpeedMultiplier", "jumpCount", "baseJumpImpulseXZ", "baseJumpImpulseY", "jumpMultiplier", "runAwayRadius", "chaseRadius", "territoryRadius", "hostilityRadius", "stoppingRadius", "attackInterval", "attackRadius", "secondaryAttackRadius", "attackDamage", "secondaryAttackDamage", "isReceivingDamageCooldownGlobal", "knockbackReceivedMultiplier", "attackImpulse", "secondaryAttackImpulse", "rangedAttackInaccuracy", "burstAttackInfo", "secondaryBurstAttackInfo", "heldItemName", "heldItemEnchantmentTier", "armour", "attackItemName", "secondaryAttackItemName", "swingArmOnAttack", "swingArmOnSecondaryAttack", "attackEffectName", "attackEffectDuration", "warpTargetSpecialAttackInfo", "combatTetherInfo", "evadeInfo", "chargeSpecialAttackInfo", "tameInfo", "onTamedHealthMultiplier", "petInfo", "ownerDbId", "minFollowingRadius", "maxFollowingRadius", "isRideable", "healthRegen", "ridingSpeedMult", "metaInfo"]
	armourPieces: readonly ["Helmet", "Chestplate", "Gauntlets", "Leggings", "Boots"]
	potionEffects: readonly ["Speed", "Damage Reduction", "Damage", "Invisible", "Jump Boost", "Knockback", "Poisoned", "Slowness", "Weakness", "Cleansed", "Instant Damage", "Health Regen", "Instant Health", "Haste", "Shield", "Double Jump", "Heat Resistance", "Thief", "X-Ray Vision", "Mining Yield", "Brain Rot", "Aura", "Wall Climbing", "Air Walk", "Pickpocketer", "Lifesteal", "Bounciness", "Blindness", "Poopy"]
	MAX_MOB_FEED_LEVEL: 5
	mobLevelUpBonuses: readonly ["Renaming", "Special Drops", "Thorns", "Rainbow Wool", "Max Health +", "Damage +", "Riding Speed +", "Double Poop", "Self Yield", "Painting", "Friends", "Pack Leader", "Poison Claws", "Mob Power", "Mob Yield", "Feed Aura", "Antlers"]
	mobAiStates: readonly ["idle", "disabled", "idleBeforeTurning", "turning", "idleBeforeWalking", "walking", "runningAway", "chasing", "turningBeforeCharging", "charging", "following", "watching", "walkingToPosition", "runningToPosition"]
	ingameIconNames: readonly ["Damage", "Damage Reduction", "Speed", "VoidJump", "Fist", "Frozen", "Hydrated", "Invisible", "Jump Boost", "Poisoned", "Slowness", "Weakness", "Health Regen", "Haste", "Double Jump", "Heat Resistance", "Gliding", "Boating", "Obsidian Boating", "Riding", "Bunny Hop", "FallDamage", "Feather Falling", "Thief", "X-Ray Vision", "Mining Yield", "Brain Rot", "Rested Damage", "Rested Haste", "Rested Speed", "Rested Farming Yield", "Rested Aura", "Blindness", "Pickpocketer", "Lifesteal", "Bounciness", "Air Walk", "Wall Climbing", "Thorns", "Poopy", "Draugr Knight Head", "Draugr Warper Head", "Magma Golem Head", "Mystery Fish", "Damage Enchantment", "Critical Damage Enchantment", "Attack Speed Enchantment", "Protection Enchantment", "Health Enchantment", "Health Regen Enchantment", "Stomp Damage Enchantment", "Knockback Resist Enchantment", "Arrow Speed Enchantment", "Arrow Damage Enchantment", "Quick Charge Enchantment", "Break Speed Enchantment", "Momentum Enchantment", "Mining Yield Enchantment", "Farming Yield Enchantment", "Mining Aura Enchantment", "Digging Aura Enchantment", "Lumber Aura Enchantment", "Farming Aura Enchantment", "Vertical Knockback Enchantment", "Horizontal Knockback Enchantment", "Self Yield", "Friends", "Riding Speed", "Feed Aura", "Double Poop", "Mob Slayer", "Rainbow Wool", "Pack Leader", "Max Health", "Poison Claws", "Mob Yield", "Antlers Bonus", "Health", "HealthShield", "Cross", "Friendship", "Dotted Friendship", "Hunger", "Empty Hunger", "Pixelated Heart", "Question Mark", "Trader Black", "Trader Blue", "Trader Piggy"]
	worldGamemodes: readonly ["survival", "peaceful", "creative", "survivaladventure", "peacefuladventure", "spectator"]
	QUEUED_COMMAND_STATUS_STRINGS: { readonly 0: "NOT_IN_QUEUE"; readonly 1: "WAITING_TO_RUN"; readonly 2: "CURRENTLY_RUNNING"; }
	ItemMetaInfo: {
		readonly rootName: string
		readonly rootId: number
		readonly metaStr: string
		readonly rot: number | null
		readonly open: boolean | null
		readonly halfblockPlacement: HalfblockPlacement | null
		readonly growing: true | null
		readonly treeBase: true | null
		readonly treeCanopy: true | null
		readonly books: number | null
		readonly freshlyGrown: true | null
		readonly roots: true | null
		/** Lava-growing variant (e.g. Chili Pepper Seeds|Lava) */
		readonly lava: true | null
		/** Top half of tall plants (e.g. Tall Grass|Top, Tomato Plant|Top|FreshlyGrown) */
		readonly top: true | null
		readonly grassRoots: true | null
		/** "Breaking" state (e.g. Melting Ice|Breaking) */
		readonly breaking: true | null
		/** Flashing animation state (e.g. Timed Spike Bomb Block|Flashing) */
		readonly flashing: true | null
		readonly charging: number | null
		readonly direction: number | null
		readonly requiresAmmo: true | null
		readonly woodType: string | null
		readonly caughtMobType: MobType | null
	}
	BlockMetadataItem: {
		displayName: string | TranslatedText | CustomTextStyling
		ttb?: number
		textureInfo: string | (string | AnimParams)[] | [number, number, number, number?] | ({
	        colour?: [number, number, number, number?];
	    } & AnimParams)
		texturePerSide: number[]
		harvestType: HarvestType
		transTex: boolean
		model: BlockMetadataModelType | string
		itemTexture: string
		drops: string
		solid: boolean
		heldItemScale: number
		modelScale: number
		meta: ItemMetaInfo
		rootMetaDesc: string
		particlesIgnoreBlack: boolean
		harvestLevel: number
		fluid: boolean
		specialToolDrop: SpecialToolDrop
		specialToolBonusDrops: RecursiveReadonly<Record<string, {
	        bonusDrop: string;
	        probabilityOfDrop: number;
	    }[]>>
		damage: number
		stoodOnSpeedMultiplier: number
		description: string | TranslatedText | CustomTextStyling
		altActionable: boolean
		soundType: {
	        break: SoundType;
	        place: SoundType;
	    }
		unlitStandaloneMesh: boolean
		customPlanesInfo: {
	        textureIdx: number;
	        yRot: number;
	    }[]
		customModelInfo: {
	        yOffset?: number;
	        /** Only honoured by onRotatableCreate. */
	        yRotOffset?: number;
	        /** Only honoured by onRotatableCreate. */
	        xRotOffset?: number;
	        unlit?: boolean;
	        emissiveColor?: Vec3;
	        backFaceCulling?: boolean;
	    }
		absorbThrowable?: boolean
		CrosshairText?: string | CustomTextStyling
		/** Light emission as [R, G, B], each 0-15. Omit for no emission. */
		lightEmission?: Vec3
		/** Sky light emission level: null or 0-15. 0 is equivalent to null (no emission). */
		skyLightEmission?: number
		/** Light attenuation when light passes through this block. Default: 1 for air/transparent, 3 for fluid, 15 for opaque. */
		lightFilter?: number
		name: string
		id: number
		atlasIdx: number | number[]
		stackable: boolean
		heldItemGlb?: string
		blockModel: string
		blockModelItem: boolean
		twoDBlockItem: boolean
		rotatableOffsetAmt: number
		canBePlacedOver: boolean
		onMinedAura: number
		showInCreativeInven?: boolean
		gunStats?: GunStatsOverride
	}
	NonBlockMetadataItem: {
		displayName?: string | TranslatedText | CustomTextStyling
		type: "Item" | "Tool" | "Gun" | "FullAuto" | "Armour" | "GrayscaleArmour" | "Chargeable"
		textureInfo: string | string[] | [number, number, number, number?]
		weight: number
		heldItemScale: number
		heldItemGlb?: string
		/** Extra Euler rotation (radians) applied only to the first-person held mesh, on top of the default hand pose. */
		firstPersonHeldRotationOffset?: Vec3
		/** Extra Euler rotation (radians) applied only to the third-person held mesh, on top of the default pose. */
		thirdPersonHeldRotationOffset?: Vec3
		description?: string | TranslatedText | CustomTextStyling
		stackable: boolean
		eatable?: boolean
		chargeSound?: string
		afterEatenItem?: ItemName
		eatShieldAmt?: number
		eatHealAmt?: number
		chargeStages?: number
		chargeTime?: number
		minChargeStateToUse?: number
		damage?: number
		attackRange?: number
		secondaryDamage?: number
		holdAsAiming?: boolean
		hideAimingUI?: boolean
		requiresArrow?: boolean
		knockbackHorizontalScalar?: number
		knockbackVerticalScalar?: number
		attackCooldownMs?: number
		abilityCooldownMs?: number
		dashImpulse?: number
		comboInfo?: WeaponComboInfo
		velocityMultiplier?: number
		harvests?: HarvestType
		multiplier?: number
		level?: number
		lumberjackHeight?: number
		armourReduction?: number
		knockbackReduction?: number
		id?: number
		name?: string
		isCustom?: boolean
		/** Light emission as [R, G, B], each 0-15. Omit for no emission. */
		lightEmission?: Vec3
		/** Spotlight reach in blocks. When set, the local player emits a directional beam (instead of the default omnidirectional held light) while holding this item, or wearing it if a helmet. */
		spotlightRange?: number
		/** Full cone apex angle in degrees (smaller = tighter beam). Only used with `spotlightRange`; omit for the default width. */
		spotlightConeAngle?: number
		meta?: ItemMetaInfo
		rootMetaDesc?: string
		keepMetaInChest?: boolean
		gunType?: GunCategory
		scopeType?: "none" | "sniper"
		muzzleFlashOffsetFromGun?: Vec3
		muzzleFlashScale?: number
		autoFireWithMouse?: boolean
		fireRate?: number
		fireRateWithHeldTouch?: number
		burstCount?: number
		burstDelay?: number
		shotPelletCount?: number
		reloadTime?: number
		clipSize?: number
		reloadBulletsIndividually?: boolean
		bulletReloadTime?: number
		cockTime?: number
		tagSpeedMult?: number
		subsequentTagSpeedReductionScalar?: number
		inaccuracyStanding?: number
		inaccuracyFromShot?: number
		inaccuracyMovement?: number
		yVelocityInaccuracy?: number
		inaccuracyFromJump?: number
		altInaccuracyStanding?: number
		altInaccuracyFromShot?: number
		altInaccuracyMovement?: number
		recoveryRate?: number
		aimZoomFactor?: number
		kickbackDecreaseRate?: number
		minKickback?: number
		maxKickback?: number
		kickbackRate?: number
		hasVerticalInaccuracy?: boolean
		keepScopeOnShot?: boolean
		msPerRound?: number
		msPerRoundTouchScreen?: number
		altYVelocityInaccuracy?: number
		altInaccuracyFromJump?: number
		fireInterval?: number
		gunStats?: GunStatsOverride
		showInCreativeInven?: boolean
	}
	LoadedChunk: {
		anySetsRan: boolean
		readonly lastUpdated: number
		set(x: number, y: number, z: number, id: BlockId): void
		get(x: number, y: number, z: number): number
		/**
		 * Returns the underlying array of the chunk
		 * This exists for performance reasons only
		 * Be careful using this - updating the data directly without calling set or setUnderlying will result in inconsistent state
		 */
		getUnderlyingData(): Uint16Array<ArrayBufferLike>
		setUnderlying(idx: number, id: BlockId): void
	}
}
type ItemMetaInfo = _TypeOf["ItemMetaInfo"]
type BlockMetadataItem = _TypeOf["BlockMetadataItem"]
type NonBlockMetadataItem = _TypeOf["NonBlockMetadataItem"]
type LoadedChunk = _TypeOf["LoadedChunk"]
type Song = "Adigold - A Place To Be Free" | "Adigold - Butterfly Effect" | "Adigold - Dreamless Sleep" | "Adigold - Frozen Pulse" | "Adigold - Frozen Skies" | "Adigold - Healing Thoughts" | "Adigold - Here Forever" | "Adigold - Just a Little Hope" | "Adigold - Just Like Heaven" | "Adigold - Memories Remain" | "Adigold - Place To Be" | "Adigold - The Riverside" | "Adigold - The Wonder" | "Adigold - Vetrar (Cut B)" | "Awkward Comedy Quirky" | "battle-ship-111902" | "cdk-Silence-Await" | "corsairs-studiokolomna-main-version-23542-02-33" | "ghost-Reverie-small-theme" | "happy" | "Heroic-Demise-New" | "I-am-the-Sea-The-Room-4" | "Juhani Junkala [Retro Game Music Pack] Ending" | "Juhani Junkala [Retro Game Music Pack] Level 1" | "Juhani Junkala [Retro Game Music Pack] Level 2" | "Juhani Junkala [Retro Game Music Pack] Level 3" | "Juhani Junkala [Retro Game Music Pack] Title Screen" | "LonePeakMusic-Highway-1" | "Mojo Productions - Pirates" | "Mojo Productions - Sneaky Jazz" | "Mojo Productions - The Sneaky" | "Mojo Productions - The Sneaky Jazz" | "progress" | "raise-the-sails-152124" | "ramblinglibrarian-I-Have-Often-T" | "Slow-Motion-Bensound" | "snowflake-Ethereal-Space" | "the-epic-adventure-131399" | "TownTheme" | "The Suspense Ambient" | "Epic1" | "Epic2" | "Emotional Epic" | "Enemy Marked"
type ParticleSystemBlendMode = 0 | 1 | 2 | 3 | 4
type HalfblockPlacement = 0 | 1 | 2
type WalkThroughType = 0 | 1 | 2
type LobbyType = 0 | 1 | 2
type PhysicsType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7
type BoatTier = 0 | 1
type GliderTier = 0 | 1 | 2 | 3
type BalloonTier = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15
type SleepingTier = 0 | 1 | 2 | 3
type CarTier = 0 | 1
type ExplosionType = 0 | 1 | 2

	type ClientOptions = {
		canChange: boolean
		speedMultiplier: number
		crouchingSpeed: number
		/** you should probably use speed multiplier - this doesn't make much sense on phone */
		walkingSpeed: number
		/** you should probably use speed multiplier - this doesn't make much sense on phone */
		runningSpeed: number
		jumpAmount: number
		airJumpCount: number
		bunnyhopMaxMultiplier: number
		music: Song
		musicVolumeLevel: number
		/** Not recommended to use as it lags when being loaded. */
		skyBox: string | EarthSkyBox
		minChunkAddDist: [number, number]
		showPlayersInUnloadedChunks: boolean
		useInventory: boolean
		/** For now just enables the full inventory UI */
		useFullInventory: boolean
		canCraft: boolean
		canPickUpItems: boolean
		playerZoom: number
		zoomOutDistance: number
		maxPlayerZoom: number
		lobbyLeaderboardInfo: LobbyLeaderboardInfo
		canCustomiseChar: boolean
		/** used if canChange is true but useInventory is false */
		defaultBlock: string
		cantChangeError: string | CustomTextStyling
		cantBreakError: string | CustomTextStyling
		cantBuildError: string | CustomTextStyling
		/** The contents of the action button. Supports custom text styling. onTouchscreenActionButton will be called when button pressed. */
		touchscreenActionButton: string | CustomTextStyling
		strictFluidBuckets: boolean
		canUseZoomKey: boolean
		canAltAction: boolean
		canSeeNametagsThroughWalls: boolean
		showBasicMovementControls: boolean
		/** Centred text at the very top of the screen, level with the FPS counter / coordinates / room name. Drops below that strip when a centred placement would overlap it. */
		middleTextTop: string | CustomTextStyling | TextWithDisplayOptions
		middleTextUpper: string | CustomTextStyling | TextWithDisplayOptions
		middleTextLower: string | CustomTextStyling | TextWithDisplayOptions
		/** A row of compact chips rendered in the top-left HUD strip, concatenated immediately after the FPS counter / coordinates / room name. */
		headerChips: HeaderChip[]
		RightInfoText: string | CustomTextStyling | TextWithDisplayOptions
		crosshairText: string | CustomTextStyling
		/** If set, clients will only be able to see the closest x players (good for client perf in games with many players) */
		numClosestPlayersVisible: number
		showProgressBar: boolean
		showKillfeed: boolean
		/** Whether the viewer renders speech bubbles above other players when they send chat messages. Off by default. */
		showChatBubbles: boolean
		/** Allows player to select a channel that is passed as argument to onPlayerChat. See engineGameplayTypes.ts for expected format */
		chatChannels: { channelName: string; elementContent: string | CustomTextStyling; elementBgColor: string; }[]
		creative: boolean
		/** while in creative */
		flySpeedMultiplier: number
		/** Ignored if creative is false */
		canPickBlocks: boolean
		/** Position of the compass target. If string, will be parsed as a player id */
		compassTarget: string | number | number[]
		ttbMultiplier: number
		/** only applicable if useInventory is true */
		inventoryItemsMoveable: boolean
		invincible: boolean
		maxShield: number
		/** Shield upon joining and respawn. */
		initialShield: number
		maxHealth: number
		/** Health upon joining and respawn. Can be null for the player to not have health. */
		initialHealth: number
		/** Fraction of max health that regens each regen tick */
		healthRegenAmount: number
		/** How often health regen is ticked */
		healthRegenInterval: number
		/** How long after a player receives damage to start regen again */
		healthRegenStartAfter: number
		/** Duration of the +damage effect from plum */
		effectDamageDuration: number
		/** Duration of +speed effect from cracked coconut */
		effectSpeedDuration: number
		/** Duration of +damage reduction effect from pear */
		effectDamageReductionDuration: number
		/** Duration of +health regen effect from cherry */
		effectHealthRegenDuration: number
		/** Duration of potion effects */
		potionEffectDuration: number
		/** Duration of splash potion effects */
		splashPotionEffectDuration: number
		/** Duration of arrow potion effects */
		arrowPotionEffectDuration: number
		/** RGBA array [r, g, b, a] for camera screen tint effect. Values fall between 0 and 1. */
		cameraTint: [number, number, number, number]
		/** Fog distance which overrides graphic settings. Uses graphic settings if null. */
		fogChunkDistanceOverride: number
		/** Fog colour override - as a hex string e.g. #ffffff */
		fogColourOverride: string
		/** After dying, the player can respawn after this many seconds */
		secsToRespawn: number
		/** When player is dead, also shows a play again button matchmakes player into a new lobby. Mostly useful for sessionBased games */
		usePlayAgainButton: boolean
		/** If true, player will respawn automatically after secsToRespawn seconds. Won't show an ad so autoRespawn needs to be false some of the time */
		autoRespawn: boolean
		/** Text to show on respawn button. (E.g. "Spectate") */
		respawnButtonText: string
		/** Whether the player can use the respawn button. Otherwise forces either play again or exit */
		useRespawnButton: boolean
		/** MS before a killstreak expires. (defaults to never expiring) */
		killstreakDuration: number
		/** Damage multiplier for all types of damage */
		dealingDamageMultiplier: number
		/** Mult for when the player hits a head. Only applies to guns */
		dealingDamageHeadMultiplier: number
		/** Mult for when the player hits a leg. Only applies to guns */
		dealingDamageLegMultiplier: number
		/** Mult for when the player hits neither a leg or a head. Only applies to guns */
		dealingDamageDefaultMultiplier: number
		/** Where gunshots originate from. "default" preserves camera-assisted behavior. */
		gunshotOrigin: GunshotOrigin
		/** Mult for all types of incoming damage */
		receivingDamageMultiplier: number
		/** When the player is attacked, a short cooldown prevents further damage from the same attack type. If true, all attackers share that cooldown. If false, each attacker has their own. */
		isReceivingDamageCooldownGlobal: boolean
		/** Mult for horizontal knockback when dealing damage */
		horizontalKnockbackMultiplier: number
		/** Mult for vertical knockback when dealing damage */
		verticalKnockbackMultiplier: number
		/** Mult for the damage done by "stomping" on a lifeform, i.e.: falling on them wearing Spiked Boots. */
		stompDamageMultiplier: number
		/** Radius around the player that will be affected by the stomp damage. */
		stompDamageRadius: number
		/** Mult for the radius within which mobs can detect the player when crouching. If a player's mult is 2, then mobs will think they are twice as far away. */
		crouchMobDetectionRadiusMultiplier: number
		/** Scale factor to use for dropped item meshes */
		droppedItemScale: number
		/** Amount that player camera is affected by movement based fov */
		movementBasedFovScale: number
		/** Amount of friction to apply to airborne players - only change if absolutely necessary */
		airFrictionScale: number
		/** Amount of friction to apply to grounded players - only change if absolutely necessary */
		groundFrictionScale: number
		/** Amount of acceleration to apply to airborne players - only change if absolutely necessary */
		airAccScale: number
		/** Whether to allow players to strafe and conserve momentum while airborne */
		airMomentumConservation: boolean
		/** Multiplier applied to gravity during normal movement */
		gravityMultiplier: number
		/** How much the player bounces off of solid blocks */
		bounciness: number
		/** Whether the player can climb walls */
		canClimbWalls: boolean
		/** Whether the player can crouch */
		canCrouch: boolean
		/** Whether players take fall damage */
		fallDamage: boolean
		/** How much aura levels up the player */
		auraPerLevel: number
		/** Max aura the player can have */
		maxAuraLevel: number
		/** Distance in blocks over which we reduce the opacity of entities as they approach the camera */
		proximityFadeDistance: number
		/** Minimum opacity multiplier reachable when fading entities based on camera proximity */
		proximityFadeMinOpacity: number
		/** Force the camera to look in a specific direction [x, y, z]. Set to null to allow free camera movement. */
		forcedCameraDirection: [number, number, number]
		/** Duration in ms to animate/transition to the forced camera direction. 0 = instant. */
		forcedCameraDirectionTransitionMs: number
		/** Roll angle of the camera in radians */
		cameraRoll: number
		/** Duration in ms to animate/transition to the camera roll angle. 0 = instant. */
		cameraRollTransitionMs: number
		/** Third-person camera origin rotation offset [x, y, z] in radians. */
		cameraRotationOffset: [number, number, number]
		/** Third-person camera origin translation offset [x, y, z] in blocks. */
		cameraPositionOffset: [number, number, number]
		/** When null, just use the player's graphics setting. When set, forces lighting on (true) or off (false). */
		lightingOverride: boolean
		/** Sky light colour override - hex string e.g. #ffffff. */
		skyLightColourOverride: string
		/** Ambient (absence of sky light) colour override - hex string e.g. #ffffff. */
		ambientLightColourOverride: string
		/** Held item light colour override - hex colour string e.g. #ffffff. Applied regardless of any held item. */
		heldLightColourOverride: string
		/** Held item light range override. Distance is measured in blocks. */
		heldLightRangeOverride: number
		/** Held item light cone angle override. Angle is measured in degrees. Larger number = wider beam. */
		heldLightConeAngleOverride: number
		/** When true, hides world and chunk coordinates regardless of the player's setting. */
		hideCoordinates: boolean
		/** Renders a terrain-following strip of animated chevron arrows on the ground from this player to the target position. Optional `colour` is a hex string like #ffaa00 (default white). */
		groundArrowPath: { target: [number, number, number]; colour?: string; }
	}
type OtherEntitySettings = {
		opacity: number
		zIndex: 0 | 1
		overlayColour: string
		canAttack: boolean
		canSee: boolean
		showDamageAmounts: boolean
		killfeedColour: string
		meshScaling: EntityMeshScalingMap
		colorInLobbyLeaderboard: string
		lobbyLeaderboardValues: LobbyLeaderboardValues
		lobbyLeaderboardTags: ChatTags
		nameTagInfo: NameTagInfo
		hasPriorityNametag: boolean
		multilineTextBox: MultilineTextBox
		nameColour: "default" | "yellow" | "lime" | "green" | "aqua" | "cyan" | "blue" | "purple" | "pink" | "red" | "orange"
	}

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
declare var onPlayerChangeBlock: (playerId: PlayerId, x: number, y: number, z: number, fromBlock: BlockName, toBlock: BlockName, droppedItem: BlockName | null, fromBlockInfo: MultiBlockInfo, toBlockInfo: MultiBlockInfo) => void | "preventChange" | "preventDrop" | [number, number, number]

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
 * @param itemEntityId - The entityId of the item that was picked up
 */
declare var onPlayerPickedUpItem: (playerId: PlayerId, itemName: string, itemAmount: number, itemEntityId: EntityId) => void

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
 * @param playerId - The id of the player that stood on the block
 * @param x - The x coordinate of the block that was stood on
 * @param y - The y coordinate of the block that was stood on
 * @param z - The z coordinate of the block that was stood on
 * @param blockName - The name of the block that was stood on
 */
declare var onBlockStand: (playerId: PlayerId, x: number, y: number, z: number, blockName: BlockName) => void

/**
 * Called when a player enters a block. Only called once per block until the player leaves the block.
 * @param playerId - The id of the player that entered the block
 * @param x - The x coordinate of the block that was entered
 * @param y - The y coordinate of the block that was entered
 * @param z - The z coordinate of the block that was entered
 * @param blockName - The name of the block that was entered
 */
declare var onBlockStandStart: (playerId: PlayerId, x: number, y: number, z: number, blockName: BlockName) => void

/**
 * Called when a player leaves a block.
 * @param playerId - The id of the player that left the block
 * @param x - The x coordinate of the block that was left
 * @param y - The y coordinate of the block that was left
 * @param z - The z coordinate of the block that was left
 * @param blockName - The name of the block that was left
 */
declare var onBlockStandStop: (playerId: PlayerId, x: number, y: number, z: number, blockName: BlockName) => void

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
 * Called when a player releases a click (mouse-up on desktop, touch-end on mobile).
 * Fires for both primary and secondary click releases.
 * Keep in mind wasAltClick will always be false for touchscreen players.
 */
declare var onPlayerClickUp: (playerId: PlayerId, wasAltClick: boolean, x: number, y: number, z: number, block: BlockName, targetEId: EntityId | null) => void

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
 * Called when a player opens or closes the shop menu
 * @param playerId - The id of the player whose shop menu changed
 * @param isOpen - Whether the shop menu is now open
 */
declare var onPlayerToggledShopMenu: (playerId: PlayerId, isOpen: boolean) => void

/** Called after a player plays an emote from the emote wheel. */
declare var onPlayerPlayedEmote: (playerId: PlayerId, emoteId: string) => void

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
