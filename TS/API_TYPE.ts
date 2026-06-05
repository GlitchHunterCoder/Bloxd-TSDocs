type ParticlePresetOpts = {
	presetId: ParticlePresetId
	pos1: number[]
	pos2: number[]
}
type ParticlePresetId = keyof _TypeOf["particlePresets"]
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
type InbuiltEffectInfo = { inbuiltLevel: number; initiatorId?: PlayerId }
type BlockRaycastResult = PNull<{
	blockID: BlockId // The block ID of the block that was hit
	position: Pos // The position of the block that was hit
	normal: Pos // The normal of the face that was hit
	adjacent: Pos // The position of the block adjacent to the hit face
}>
type UserCallbacks = "tick" | "onClose" | "onPlayerJoin" | "onPlayerLeave" | "onPlayerJump" | "onRespawnRequest" | "playerCommand" | "onPlayerChat" | "onPlayerChangeBlock" | "onBlockStand" | "onPlayerAttemptCraft" | "onPlayerCraft" | "onPlayerAttemptOpenChest" | "onPlayerOpenedChest" | "onPlayerMoveItemOutOfInventory" | "onPlayerDropItem" | "onPlayerPickedUpItem" | "onPlayerSelectInventorySlot" | "onPlayerAttack" | "onPlayerDamagingOtherPlayer" | "onPlayerDamagingMob" | "onMobDamagingPlayer" | "onMobDamagingOtherMob" | "onAttemptKillPlayer" | "onPlayerKilledOtherPlayer" | "onMobKilledPlayer" | "onPlayerKilledMob" | "onMobKilledOtherMob" | "onPlayerPotionEffect" | "onPlayerDamagingMeshEntity" | "onPlayerBreakMeshEntity" | "onPlayerUsedThrowable" | "onPlayerThrowableHitTerrain" | "onTouchscreenActionButton" | "onPlayerMoveInvenItem" | "onPlayerMoveItemIntoIdxs" | "onPlayerSwapInvenSlots" | "onPlayerMoveInvenItemWithAmt" | "onPlayerAttemptAltAction" | "onPlayerAltAction" | "onPlayerClick" | "onPlayerClickUp" | "onClientOptionUpdated" | "onMobSettingUpdated" | "onInventoryUpdated" | "onChestUpdated" | "onWorldChangeBlock" | "onCreateBloxdMeshEntity" | "onEntityCollision" | "onPlayerAttemptSpawnMob" | "onWorldAttemptSpawnMob" | "onPlayerSpawnMob" | "onWorldSpawnMob" | "onWorldAttemptDespawnMob" | "onMobDespawned" | "onChunkLoaded" | "onPlayerRequestChunk" | "onItemDropCreated" | "onPlayerStartChargingItem" | "onPlayerFinishChargingItem" | "onPlayerFinishQTE" | "onPlayerToggledShopMenu" | "onPlayerBoughtShopItem" | "onPlayerPlayedEmote" | "doPeriodicSave"
type QueuedCommandId = string
type QueuedStatusString = (_TypeOf["QUEUED_COMMAND_STATUS_STRINGS"])[keyof _TypeOf["QUEUED_COMMAND_STATUS_STRINGS"]]
type OnPlayerChatObjectResponse = Record<PlayerId, false | ChatMessageObject>
type ChatMessageObject = {
	prefixContent?: ChatTags
	chatContent?: CustomTextStyling
}
interface _TypeOf {
	particlePresets: { readonly damageInner: unknown; readonly damageOuter: unknown; readonly bouncinessInner: unknown; readonly bouncinessOuter: unknown; readonly healthRegenInner: unknown; readonly healthRegenOuter: unknown; readonly speedInner: unknown; readonly speedOuter: unknown; readonly damageReductionInner: unknown; readonly damageReductionOuter: unknown; readonly invisibleInner: unknown; readonly invisibleOuter: unknown; readonly jumpBoostInner: unknown; readonly jumpBoostOuter: unknown; readonly knockbackInner: unknown; readonly knockbackOuter: unknown; readonly poisonedInner: unknown; readonly poisonedOuter: unknown; readonly slownessInner: unknown; readonly slownessOuter: unknown; readonly weaknessInner: unknown; readonly weaknessOuter: unknown; readonly cleansedInner: unknown; readonly cleansedOuter: unknown; readonly instantDamageInner: unknown; readonly instantDamageOuter: unknown; readonly instantHealthInner: unknown; readonly instantHealthOuter: unknown; readonly hasteInner: unknown; readonly hasteOuter: unknown; readonly shieldInner: unknown; readonly shieldOuter: unknown; readonly doubleJumpInner: unknown; readonly doubleJumpOuter: unknown; readonly heatResistanceInner: unknown; readonly heatResistanceOuter: unknown; readonly thiefInner: unknown; readonly thiefOuter: unknown; readonly miningYieldInner: unknown; readonly miningYieldOuter: unknown; readonly brainRotInner: unknown; readonly brainRotOuter: unknown; readonly auraInner: unknown; readonly auraOuter: unknown; readonly wallClimbingInner: unknown; readonly wallClimbingOuter: unknown; readonly airWalkInner: unknown; readonly airWalkOuter: unknown; readonly pickpocketerInner: unknown; readonly pickpocketerOuter: unknown; readonly lifestealInner: unknown; readonly lifestealOuter: unknown; readonly blindnessInner: unknown; readonly blindnessOuter: unknown; readonly poopyInner: unknown; readonly poopyOuter: unknown; readonly xRayVisionInner: unknown; readonly xRayVisionOuter: unknown; readonly defaultFirecrackerSmall: { readonly colorGradients: TimeColorGradient[]; readonly texture: string; readonly minLifeTime: number; readonly maxLifeTime: number; readonly minEmitPower: number; readonly maxEmitPower: number; readonly minSize: number; readonly maxSize: number; readonly gravity: number[]; readonly velocityGradients: VelocityGradient[]; readonly blendMode: ParticleSystemBlendMode; readonly dir1: number[]; readonly dir2: number[]; readonly manualEmitCount: number; readonly hideDist: number; }; readonly defaultFirecrackerLarge: { readonly colorGradients: TimeColorGradient[]; readonly texture: string; readonly minLifeTime: number; readonly maxLifeTime: number; readonly minEmitPower: number; readonly maxEmitPower: number; readonly minSize: number; readonly maxSize: number; readonly gravity: number[]; readonly velocityGradients: VelocityGradient[]; readonly blendMode: ParticleSystemBlendMode; readonly dir1: number[]; readonly dir2: number[]; readonly manualEmitCount: number; readonly hideDist: number; }; readonly mango: unknown; readonly yellowFirecrackerSmall: unknown; readonly yellowFirecrackerLarge: unknown; readonly limeFirecrackerSmall: unknown; readonly limeFirecrackerLarge: unknown; readonly greenFirecrackerSmall: unknown; readonly greenFirecrackerLarge: unknown; readonly cyanFirecrackerSmall: unknown; readonly cyanFirecrackerLarge: unknown; readonly blueFirecrackerSmall: unknown; readonly blueFirecrackerLarge: unknown; readonly purpleFirecrackerSmall: unknown; readonly purpleFirecrackerLarge: unknown; readonly pinkFirecrackerSmall: unknown; readonly pinkFirecrackerLarge: unknown; readonly redFirecrackerSmall: unknown; readonly redFirecrackerLarge: unknown; readonly orangeFirecrackerSmall: unknown; readonly orangeFirecrackerLarge: unknown; readonly blackFirecrackerSmall: unknown; readonly blackFirecrackerLarge: unknown; readonly brownFirecrackerSmall: unknown; readonly brownFirecrackerLarge: unknown; readonly grayFirecrackerSmall: unknown; readonly grayFirecrackerLarge: unknown; readonly lightBlueFirecrackerSmall: unknown; readonly lightBlueFirecrackerLarge: unknown; readonly lightGrayFirecrackerSmall: unknown; readonly lightGrayFirecrackerLarge: unknown; readonly magentaFirecrackerSmall: unknown; readonly magentaFirecrackerLarge: unknown; readonly whiteFirecrackerSmall: unknown; readonly whiteFirecrackerLarge: unknown; readonly brainRot: unknown; readonly stomp: unknown; readonly fertiliser: unknown; readonly bonemeal: unknown; readonly mobTameSuccess: unknown; readonly mobTameFailure: unknown; readonly mobCatch: unknown; readonly spawnCaughtMob: unknown; readonly mobFeedDefault: unknown; readonly mobFeedSuperliked: { readonly colorGradients: TimeColorGradient[]; readonly texture: string; readonly minLifeTime: number; readonly maxLifeTime: number; readonly minEmitPower: number; readonly maxEmitPower: number; readonly minSize: number; readonly maxSize: number; readonly gravity: number[]; readonly velocityGradients: VelocityGradient[]; readonly blendMode: ParticleSystemBlendMode; readonly dir1: number[]; readonly dir2: number[]; readonly manualEmitCount: number; readonly hideDist: number; }; readonly mobFeedLike: { readonly colorGradients: TimeColorGradient[]; readonly texture: string; readonly minLifeTime: number; readonly maxLifeTime: number; readonly minEmitPower: number; readonly maxEmitPower: number; readonly minSize: number; readonly maxSize: number; readonly gravity: number[]; readonly velocityGradients: VelocityGradient[]; readonly blendMode: ParticleSystemBlendMode; readonly dir1: number[]; readonly dir2: number[]; readonly manualEmitCount: number; readonly hideDist: number; }; readonly mobFeedNeutral: { readonly colorGradients: TimeColorGradient[]; readonly texture: string; readonly minLifeTime: number; readonly maxLifeTime: number; readonly minEmitPower: number; readonly maxEmitPower: number; readonly minSize: number; readonly maxSize: number; readonly gravity: number[]; readonly velocityGradients: VelocityGradient[]; readonly blendMode: ParticleSystemBlendMode; readonly dir1: number[]; readonly dir2: number[]; readonly manualEmitCount: number; readonly hideDist: number; }; readonly mobFeedDisliked: { readonly colorGradients: TimeColorGradient[]; readonly texture: string; readonly minLifeTime: number; readonly maxLifeTime: number; readonly minEmitPower: number; readonly maxEmitPower: number; readonly minSize: number; readonly maxSize: number; readonly gravity: number[]; readonly velocityGradients: VelocityGradient[]; readonly blendMode: ParticleSystemBlendMode; readonly dir1: number[]; readonly dir2: number[]; readonly manualEmitCount: number; readonly hideDist: number; }; readonly mobDeath: unknown; readonly mobDeathSoul: unknown; readonly boardShopSuccess: unknown; readonly mobSpawnerBlockFail: { readonly colorGradients: [{ readonly timeFraction: 0; readonly minColor: [80, 80, 80, 1]; readonly maxColor: [160, 160, 160, 1]; }]; readonly texture: string; readonly minLifeTime: number; readonly maxLifeTime: number; readonly minEmitPower: number; readonly maxEmitPower: number; readonly minSize: number; readonly maxSize: number; readonly gravity: number[]; readonly velocityGradients: VelocityGradient[]; readonly blendMode: ParticleSystemBlendMode; readonly dir1: number[]; readonly dir2: number[]; readonly manualEmitCount: number; readonly hideDist: number; }; readonly mobSpawnerBlockPassive: { readonly colorGradients: [{ readonly timeFraction: 0; readonly minColor: [0, 200, 50, 1]; readonly maxColor: [0, 255, 100, 1]; }]; readonly texture: string; readonly minLifeTime: number; readonly maxLifeTime: number; readonly minEmitPower: number; readonly maxEmitPower: number; readonly minSize: number; readonly maxSize: number; readonly gravity: number[]; readonly velocityGradients: VelocityGradient[]; readonly blendMode: ParticleSystemBlendMode; readonly dir1: number[]; readonly dir2: number[]; readonly manualEmitCount: number; readonly hideDist: number; }; readonly mobSpawnerBlockNeutral: { readonly colorGradients: [{ readonly timeFraction: 0; readonly minColor: [200, 200, 0, 1]; readonly maxColor: [255, 255, 0, 1]; }]; readonly texture: string; readonly minLifeTime: number; readonly maxLifeTime: number; readonly minEmitPower: number; readonly maxEmitPower: number; readonly minSize: number; readonly maxSize: number; readonly gravity: number[]; readonly velocityGradients: VelocityGradient[]; readonly blendMode: ParticleSystemBlendMode; readonly dir1: number[]; readonly dir2: number[]; readonly manualEmitCount: number; readonly hideDist: number; }; readonly mobSpawnerBlockHostile: { readonly colorGradients: [{ readonly timeFraction: 0; readonly minColor: [200, 10, 0, 1]; readonly maxColor: [255, 20, 0, 1]; }]; readonly texture: string; readonly minLifeTime: number; readonly maxLifeTime: number; readonly minEmitPower: number; readonly maxEmitPower: number; readonly minSize: number; readonly maxSize: number; readonly gravity: number[]; readonly velocityGradients: VelocityGradient[]; readonly blendMode: ParticleSystemBlendMode; readonly dir1: number[]; readonly dir2: number[]; readonly manualEmitCount: number; readonly hideDist: number; }; readonly mobSpawnOrb: unknown; readonly aura: unknown; }
	QUEUED_COMMAND_STATUS_STRINGS: { readonly 0: "NOT_IN_QUEUE"; readonly 1: "WAITING_TO_RUN"; readonly 2: "CURRENTLY_RUNNING"; }
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
type LoadedChunk = _TypeOf["LoadedChunk"]
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
		middleTextUpper: string | CustomTextStyling
		middleTextLower: string | CustomTextStyling
		crosshairText: string | CustomTextStyling
		RightInfoText: string | CustomTextStyling
		/** If set, clients will only be able to see the closest x players (good for client perf in games with many players) */
		numClosestPlayersVisible: number
		showProgressBar: boolean
		showKillfeed: boolean
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
		/** After dying, the player can respawn after this many seconds */
		secsToRespawn: number
		/** When player is dead, also shows a play again button matchmakes player into a new lobby. Mostly useful for sessionBased games */
		usePlayAgainButton: boolean
		/** If true, player will respawn automatically after secsToRespawn seconds. Won't show an ad so autoRespawn needs to be false some of the time */
		autoRespawn: boolean
		/** Text to show on respawn button. (E.g. "Spectate") */
		respawnButtonText: string
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
		/** Mult for all types of incoming damage */
		receivingDamageMultiplier: number
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
		/** Whether players take fall damage */
		fallDamage: boolean
		/** How much aura levels up the player */
		auraPerLevel: number
		/** Max aura the player can have */
		maxAuraLevel: number
		/** Fog distance which overrides graphic settings. Uses graphic settings if null. */
		fogChunkDistanceOverride: number
		/** Fog colour override - as a hex string e.g. #ffffff */
		fogColourOverride: string
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
		/** How much the player bounces off of solid blocks */
		bounciness: number
		/** Whether the player can climb walls */
		canClimbWalls: boolean
		/** Whether the player can crouch */
		canCrouch: boolean
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
		/** When null, just use the player's graphics setting. When set, forces lighting on (true) or off (false). */
		lightingOverride: boolean
		/** Sky light colour override - hex string e.g. #ffffff. */
		skyLightColourOverride: string
		/** Ambient (absence of sky light) colour override - hex string e.g. #ffffff. */
		ambientLightColourOverride: string
		/** Held item light colour override - hex colour string e.g. #ffffff. Applied regardless of any held item. */
		heldLightColourOverride: string
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
		nameTagInfo: NameTagInfo
		hasPriorityNametag: boolean
		nameColour: "default" | "yellow" | "lime" | "green" | "aqua" | "cyan" | "blue" | "purple" | "pink" | "red" | "orange"
	}
