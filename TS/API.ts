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
  broadcastMessage(message: string | CustomTextStyling, style?: { fontWeight?: number | string; color?: string }): void
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
   * Play particle effect on all clients, or only on some clients if clientPredictedBy is specified
   * @param opts
   * @param clientPredictedBy Play only on clients where client with playerId clientPredictedBy
   *                          is not invisible, transparent, or themselves
   */
  playParticleEffect(opts: TempParticleSystemOpts | ParticlePresetOpts, clientPredictedBy?: PlayerId): void
  /**
   * Animates the given entity.
   * @param entityId
   * @param animationSchema
   * @param initialTimeFraction
   * @param animationSpeed
   */
  animateEntity(entityId: EntityId, animationSchema: AnimationSchema | BlockbenchAnimationSchema, initialTimeFraction?: number, animationSpeed?: number): void
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
   * @return blockName - will be a name contained in blockMetadata.ts or 'Air'
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
   * Set a block. Valid names are those either contained in blockMetadata.ts or are 'Air'
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
   * @param itemName Name of the item. Valid names can be found in blockMetadata.ts and itemMetadata.ts
   * @param amount The amount of the item to include in the drop - so when the player picks up the item drop, they get this many of the item.
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
   * Delete an item drop by item drop entity ID
   *
   * @param itemId
   */
  deleteItemDrop(itemId: EntityId): void
  /**
   * Get the metadata about a block or item before stats have been modified by any client options
   * (i.e. its entry in either blockMetadata.ts or nonBlockMetadata in itemMetadata.ts)
   *
   * @param itemName
   */
  getInitialItemMetadata(itemName: string): Partial<BlockMetadataItem & NonBlockMetadataItem>
  /**
   * Get stat info about a block or item
   * Either based on a client option for a player: (e.g. `DirtTtb`)
   * or its entry in blockMetadata.ts or nonBlockMetadata in itemMetadata.ts if no client option is set.
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
   * Lets a player Change a block type. Valid names are those contained within blockMetadata.ts and 'Air'
   * Less priority than cant change block pos/can change block rect
   *
   * @param playerId
   * @param blockName
   */
  setCanChangeBlockType(playerId: PlayerId, blockName: BlockName): void
  /**
   * Stops a player from changing a block type. Valid names are those contained within blockMetadata.ts and 'Air'
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
   * Edit the crafting recipes for a player. See crafting.ts for the format of recipesForItem
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
  attemptCreateMeshEntity<MeshType extends MeshEntityType>(type: MeshType, opts: MeshEntityOpts[MeshType], name?: string, physicsOptions?: MeshEntityPhysicsOpts, initiatorId?: EntityId): EntityId | null
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
   *
   * Returns whether the api successfully deleted the meshEntity
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
   * Returns whether the player has any qteRequests
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
   * For custom effect, you pass customEffectInfo. The icon can be an icon from "IngameIcons.ts" or a bloxd item name.
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
   * Set physics state of player (vehicle type and tier)
   * @param playerId
   * @param physicsState
   * @param positionOffset - Optional offset to adjust the player's collision box
   */
  setPlayerPhysicsState(playerId: PlayerId, physicsState: PlayerPhysicsStateData, positionOffset?: Pos): void
  /**
   * Get physics state for player
   * @param playerId
   */
  getPlayerPhysicsState(playerId: PlayerId): PlayerPhysicsStateData
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
   * Log a message to chat.
  */
  log(message: string): void
  /**
   * Set a default value to be returned by your callback code if it throws an error.
   */
  setCallbackValueFallback(callbackName: string, defaultValue: any): void
}
	/** Game API */
declare const api: GameApi;
