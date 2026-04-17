type EntityId = string
type Pos = [number, number, number]
type PlayerId = LifeformId
type LifeformId = EntityId
type PNull<T> = T | null
type PlayerDbId = string
type LifeformBodyPart = (_TypeOf["lifeformBodyParts"])[number]
interface PlayerAttemptDamageOtherPlayerOpts {
	eId: PlayerId
	hitEId: PlayerId
	attemptedDmgAmt: number
	withItem: string
	bodyPartHit?: LifeformBodyPart
	attackDir?: number[]
	showCritParticles?: boolean
	reduceVerticalKbVelocity?: boolean
	horizontalKbMultiplier?: number
	verticalKbMultiplier?: number
	broadcastEntityHurt?: boolean
	attackCooldownSettings?: PNull<{ type: string; cooldownMs: number }>
	hittingSoundOverride?: HittingSoundOverride
	ignoreOtherEntitySettingCanAttack?: boolean
	isTrueDamage?: boolean
	// The damaging playerDbId. If null, will default to the dbId of \`eId\`
	damagerDbId?: PNull<PlayerId>
}
type HittingSoundOverride = { sound: string; volume: number; pitch: number }
type CustomTextStyling = (string | EntityName | TranslatedText | StyledIcon | StyledText)[]
type EntityName = {
	entityName: string
	ranks?: Readonly<Rank[]>
	style?: {
		color?: string
		colour?: string
	}
}
type Rank = (_TypeOf["ranks"])[number]
type TranslatedText = {
	translationKey: string
	params?: Record<string, string | number | boolean | EntityName>
}
type StyledIcon = {
	icon: string
	style?: {
		color?: string
		colour?: string
		fontSize?: FontSize
		opacity?: number
	}
}
type FontSize = string
type StyledText = {
	str: string | EntityName | TranslatedText
	style?: TextStyle
	clickableUrl?: string
}
type TextStyle = {
	color?: string
	colour?: string
	fontWeight?: string
	fontSize?: FontSize
	fontStyle?: string
	opacity?: number
}
type ClientOption = keyof ClientOptions
type EarthSkyBox = {
	type: "earth"
	inclination?: number
	turbidity?: number
	infiniteDistance?: boolean
	luminance?: number
	yCameraOffset?: number
	azimuth?: number
	// Not part of sky model by default; heavily tint to a vertex color
	vertexTint?: [number, number, number]
}
type LobbyLeaderboardInfo = Record<
	string,
	{
		displayName?: string | CustomTextStyling
		hidden?: boolean
		sortOrder?: "ascending" | "descending" // No value means descending
		sortPriority?: number
	}
>
type ShopCategoryKey = string
type ShopItemKey = string
type ShopItem = {
	image: string
	schematicId?: SchematicId
	cost?: number
	currency?: string
	amount?: number // Display amount shown on the shop tile image (0 and 1 are not displayed)
	imageColour?: string
	canBuy?: boolean
	isSelected?: boolean
	buyButtonText?: string | CustomTextStyling
	customTitle?: string | CustomTextStyling
	description?: string | CustomTextStyling
	onBoughtMessage?: string | CustomTextStyling
	redDot?: boolean
	forceRemoveRedDot?: boolean
	isRewardedAd?: boolean
	badge?: { text: string | CustomTextStyling; type: ShopItemBadgeType }
	userInput?: ShopItemUserInput

	// Not defined on client, must be defined on server
	boughtCallback?: (
		playerId: PlayerId,
		cost: number,
		currency: string,
		categoryKey: ShopCategoryKey,
		itemKey: ShopItemKey,
		userInput: string,
		amount: number | undefined,
	) => void
	sell?: boolean // Optional, defaults to false. If true, the sign of "cost" is flipped. So a "cost" of -25 would give the player 25 currency AND be displayed as "25" (instead of -25)
	sortPriority?: number // Descending, bigger number means closer to the top
	hidden?: boolean
}
type ShopItemUserInput =
	| { type: "text"; placeholderText?: string; wordCharsOnly?: boolean; initialValue?: string } // wordCharsOnly defaults to false. If true, only allows \w character (alphanumeric and _). initialValue always takes precedence as the text input value when set.
	| { type: "number"; placeholderText?: string; initialValue?: string }
	| {
			type: "dropdown"
			dropdownOptions: readonly (string | { option: string; cost: number })[]
			shouldResetSelectionOnOptionsChange?: boolean // Defaults to false. If true, the selection will reset to the first option when dropdownOptions changes.
			initialValue?: string
	  }
	| { type: "player"; excludedPlayers?: PlayerId[] } // Defaults to excluding the current player
	| { type: "color"; initialValue?: string }
type SchematicId = string
type ShopItemBadgeType = (_TypeOf["shopItemBadgeTypes"])[number]
type ShopCategoryConfig = Partial<{
	autoSelectCategory: boolean
	customTitle: string // Supports translation keys and ordinary text
	redDot: boolean
	forceRemoveRedDot: boolean
	sortPriority: number
	description: string | CustomTextStyling
}>
type OtherEntitySetting = keyof OtherEntitySettings
type EntityMeshScalingMap = {
	[key in EntityNamedNode]?: number[]
}
type EntityNamedNode = PlayerMeshNamedNode
type PlayerMeshNamedNode = (_TypeOf["playerMeshNamedNodes"])[number]
type LobbyLeaderboardValues = Record<string, string | number | CustomTextStyling>
type NameTagInfo = {
	backgroundColor?: string
	content?: (CustomTextStyling[number] | RankInfo)[]
	subtitle?: (CustomTextStyling[number] | RankInfo)[]
	subtitleBackgroundColor?: string
}
type RankInfo = {
	// Font Awesome icon name
	icon: string
	mainRGB: string
	// Defaults to mainRGB
	bracketRGB?: string
	chatTag: {
		str: string
		// Defaults to mainRGB
		strRGB?: string
	}[]
	// Defaults to none
	nameTag: {
		// Defaults to normal name colour (white)
		iconRGB?: string
		// Defaults to none
		iconShadowRGB?: string
	}
	visible: boolean // If false, this rank will not be shown in the player list or in the chat
}
type TempParticleSystemOpts = ParticleSystemOpts & {
	dir1: number[]
	dir2: number[]
	pos1: number[]
	pos2: number[]
	manualEmitCount: number
	hideDist: number
}
type ParticlePresetOpts = {
	presetId: ParticlePresetId
	pos1: number[]
	pos2: number[]
}
type ParticleSystemOpts = {
	texture: string
	minLifeTime: number
	maxLifeTime: number
	minEmitPower: number
	maxEmitPower: number
	minSize: number
	maxSize: number
	gravity: number[]
	velocityGradients: VelocityGradient[]
	colorGradients: TimeColorGradient[] | RandomColorGradient[]
	blendMode: ParticleSystemBlendMode
}
type VelocityGradient = {
	timeFraction: number
	factor: number
	factor2: number
}
type TimeColorGradient = {
	timeFraction: number
	minColor: [number, number, number, number]
	maxColor?: [number, number, number, number]
}
type RandomColorGradient = {
	color: [number, number, number]
}
type ParticlePresetId = keyof _TypeOf["particlePresets"]
type AnimationSchema = Readonly<{
	animationDurationMs: number
	loop?: LoopModeSchema
	nodeAnimations?: NodeSkeletonAnimationSchema
}>
type BlockbenchAnimationSchema = Readonly<{
	animation_length: number // The duration of the animation in seconds.
	loop?: BlockbenchLoopModeSchema
	bones?: BlockbenchBonesAnimationSchema
}>
type LoopModeSchema = boolean | "hold-on-last-frame"
type AnimationTimelineSchema = readonly KeyframeSchema[]
type KeyframeSchema = Readonly<{
	timeFraction: number
	rotation?: LerpPointSchema // Rotations are assumed to be in radians.
}>
type LerpPointSchema =
	| Point
	| Readonly<{
			lerpMode?: LerpModeSchema
			point: Point
	  }>
	| Readonly<{
			lerpMode?: LerpModeSchema
			pre: Point // When lerping towards a point, we lerp towards its pre.
			post: Point // When lerping away from a point, we lerp away from its post.
	  }>
type Point = Readonly<Vec3>
type LerpModeSchema = "linear" | "catmull-rom-spline"
type Vec3 = [number, number, number]
type BlockbenchLoopModeSchema = boolean | "hold_on_last_frame"
type BlockbenchAnimationTimelineSchema = Point | Readonly<Record<TimestampString, BlockbenchAnimationFrameSchema>>
type TimestampString = string
type BlockbenchAnimationFrameSchema =
	| Point
	| Readonly<{
			lerp_mode?: BlockbenchLerpModeSchema
			pre?: Point // When lerping towards a point, we lerp towards its pre.
			post: Point // When lerping away from a point, we lerp away from its post.
	  }>
type BlockbenchLerpModeSchema = "linear" | "catmullrom"
type NodeSkeletonAnimationSchema = Readonly<Record<NodeName, NodeAnimationSchema>>
type NodeName = string
type NodeAnimationSchema = Readonly<{
	timeline: AnimationTimelineSchema
}>
type BlockbenchBonesAnimationSchema = Readonly<Record<NodeName, BlockbenchBoneAnimationSchema>>
type BlockbenchBoneAnimationSchema = Readonly<{
	rotation?: BlockbenchAnimationTimelineSchema // Blockbench rotations are in degrees.
}>
type BlockName = string
type BlockId = number
type WorldBlockChangedInfo = {
	cause: PNull<WorldBlockChangedCause>
}
type WorldBlockChangedCause = "Paintball" | "FloorCreator" | "Sapling" | "StemFruit" | "MeltingIce" | "Explosion"
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
type ItemName = string
type ItemAttributes = { customDisplayName?: string; customDescription?: string; customAttributes?: Record<string, any> }
type ItemDropOptions = Readonly<
	Partial<{
		doPhysics: boolean
		size: number
	}>
>
type AnimParams = { animTextures: string[]; animationInterval: number }
type HarvestType = "granule" | "wood" | "rock" | "cuttable"
type RecursiveReadonlyObject<T> = {
	readonly [P in keyof T]: RecursiveReadonly<T[P]>
}
type RecursiveReadonly<T> = T extends (infer R)[]
	? RecursiveReadonlyArray<R>
	: T extends Function
		? T
		: T extends object
			? RecursiveReadonlyObject<T>
			: T
type RecursiveReadonlyArray<T> = ReadonlyArray<RecursiveReadonly<T>>
type SoundType = "stone" | "wood" | "gravel" | "grass" | "glass" | "sand" | "snow" | "cloth"
type GunStatsOverride = Partial<Pick<GunMetadata, GunStatsOverrideKey>>
type GunMetadata = {
	gunType: string
	scopeType: "none" | "sniper"
	muzzleFlashOffsetFromGun: [number, number, number]
	muzzleFlashScale?: number
	autoFireWithMouse: boolean
	fireRate: number
	fireRateWithHeldTouch?: number
	damage: number
	shotPelletCount?: number
	reloadTime?: number
	clipSize: number
	reloadBulletsIndividually?: boolean
	bulletReloadTime?: number
	cockTime?: number
	tagSpeedMult: number
	subsequentTagSpeedReductionScalar: number
	inaccuracyStanding: number
	inaccuracyFromShot: number
	inaccuracyMovement: number
	yVelocityInaccuracy: number
	inaccuracyFromJump: number
	altInaccuracyStanding: number
	altInaccuracyFromShot: number
	altInaccuracyMovement: number
	recoveryRate: number

	msPerRound?: number // calculated below
	msPerRoundTouchScreen?: number // calculated below

	altYVelocityInaccuracy?: number
	altInaccuracyFromJump?: number

	hasVerticalInaccuracy?: boolean

	aimZoomFactor?: number

	// Kickback
	kickbackDecreaseRate: number
	minKickback?: number
	maxKickback?: number
	kickbackRate?: number
}
type GunStatsOverrideKey =
	| "scopeType"
	| "fireRate"
	| "damage"
	| "clipSize"
	| "reloadTime"
	| "bulletReloadTime"
	| "cockTime"
	| "kickbackDecreaseRate"
	| "minKickback"
	| "maxKickback"
	| "kickbackRate"
	| "inaccuracyStanding"
	| "inaccuracyFromShot"
	| "inaccuracyMovement"
	| "yVelocityInaccuracy"
	| "inaccuracyFromJump"
	| "altInaccuracyStanding"
	| "altInaccuracyFromShot"
	| "altInaccuracyMovement"
	| "altYVelocityInaccuracy"
	| "altInaccuracyFromJump"
	| "recoveryRate"
type WeaponComboInfo = Readonly<{
	comboWindowMs: number
	comboMultipliers: readonly number[]
	backstabAngle?: number // If present, hitting an enemy from behind within this angle (radians) skip to end of combo
}>
type AnyMetadataItem = Partial<BlockMetadataItem & NonBlockMetadataItem>
type CustomItemStat = (_TypeOf["customItemStats"])[number]
type InvenItem = { name: string; amount: PNull<number>; attributes: ItemAttributes; typeObj: any }
type RecipesForItem = RecursiveReadonly<
	{
		requires: { items: ItemName[]; amt: number }[]
		produces: number
		station?: string | string[]
		onCraftedAura?: number
		isStarterRecipe?: boolean
	}[]
>
type EntityType = PNull<NetworkedEntityType | "Mesh" | "Item">
type NetworkedEntityType = LifeformType | ThrowableItem | string | string
type LifeformType = (_TypeOf["lifeformTypes"])[number]
type ThrowableItem = string
type MeshEntityType = keyof MeshEntityOpts
type MeshEntityOptsStringified = string
type MeshEntityOpts = {
	Box: CommonMeshEntityOpts & {
		width: number
		height: number
		depth: number
		diffuseColor?: number[]
		emissiveColor?: number[]
		backFaceCulling?: boolean // Default true
		texture?: string // Can be a blockname. Wraps every one block
		faceUV?: number[][]
	}
	BloxdBlock: CommonMeshEntityOpts & {
		blockName: BlockNameOrId
		size: number | [number, number, number]
	}
	Person: CommonMeshEntityOpts & {
		size?: number
		textures?: Partial<Cosmetics>
		pose?: PlayerPose
	}
	ParticleEmitter: MeshParticleSystemOpts
}
type CommonMeshEntityOpts = {
	hideDist?: number
	meshOffset?: number[]
	autoRotate?: boolean
	lineToEId?: EntityId // EntityId to connect to using a line
}
type BlockNameOrId = BlockName | BlockId
type Cosmetics = Record<CosmeticType, CosmeticName>
type PlayerPose = (_TypeOf["playerPoses"])[number]
type MeshParticleSystemOpts = ParticleSystemOpts &
	CommonMeshEntityOpts & {
		height: number
		width: number
		depth: number
		emitRate: number
		dir1?: number[]
		dir2?: number[]
	}
type CosmeticType = (_TypeOf["cosmeticTypes"])[number]
type CosmeticName = string
type MobHerdId = number
type MobType = (_TypeOf["mobTypes"])[number]
type MobSpawnOpts<TMobType extends MobType> = Partial<{
	mobHerdId: MobHerdId
	spawnerId: PlayerId
	mobDbId: MobDbId
	name: string
	playSoundOnSpawn: boolean
	variation: MobVariation<TMobType>
	physicsOpts: Partial<{
		width: number
		height: number
		collidesEntities: boolean
	}>
}>
type MobVariation<TMobType extends MobType> = (_TypeOf["mobVariations"])[TMobType][number]
type MobId = LifeformId
type MobDbId = string
type MobSetting = (_TypeOf["mobSettings"])[number]
type MobSettings<TMobType extends MobType> = {
	variation: MobVariation<TMobType>
	name: string
	maxHealth: number
	initialHealth: number
	idleSound: PNull<string>
	attackSound: PNull<string>
	secondaryAttackSound: PNull<string>
	hurtSound: PNull<string>
	onDeathItemDrops: readonly MobItemDrop[]
	onDeathParticleTexture: string
	onDeathAura: number
	baseWalkingSpeed: number
	baseRunningSpeed: number
	walkingSpeedMultiplier: number
	runningSpeedMultiplier: number
	jumpCount: number
	baseJumpImpulseXZ: number
	baseJumpImpulseY: number
	jumpMultiplier: number
	runAwayRadius: number
	chaseRadius: number
	territoryRadius: number
	hostilityRadius: number
	stoppingRadius: number
	attackInterval: number
	attackRadius: number
	secondaryAttackRadius: number
	attackDamage: number
	secondaryAttackDamage: number
	attackImpulse: number
	secondaryAttackImpulse: number
	burstAttackInfo: PNull<MobBurstAttackInfo>
	secondaryBurstAttackInfo: PNull<MobBurstAttackInfo>
	heldItemName: PNull<string>
	attackItemName: PNull<string>
	secondaryAttackItemName: PNull<string>
	swingArmOnAttack: boolean
	swingArmOnSecondaryAttack: boolean
	attackEffectName: PNull<string>
	attackEffectDuration: number
	warpTargetSpecialAttackInfo: PNull<MobWarpTargetSpecialAttackInfo>
	combatTetherInfo: PNull<MobCombatTetherCombatInfo>
	evadeInfo: PNull<MobEvadeInfo>
	tameInfo: PNull<Readonly<MobTameInfo>>
	onTamedHealthMultiplier: number
	petInfo: Readonly<MobPetInfo> // Instance-specific information related to mob feeding
	ownerDbId: PNull<PlayerDbId>
	minFollowingRadius: number
	maxFollowingRadius: number
	isRideable: boolean
	healthRegen: PNull<MobHealthRegenSettings>
	ridingSpeedMult: number
	metaInfo: string
}
type MobItemDrop = Readonly<{
	itemName: string
	probabilityOfDrop: number

	// If a mob drops an item, then we choose a random amount within these bounds.
	dropMinAmount: number
	dropMaxAmount: number

	// If true, the item will "burst" out of the mob rather than just dropping.
	applyBurstImpulseToDrop?: boolean
}>
type MobBurstAttackInfo = Readonly<{
	burstAttackIntervals: readonly number[]
}>
type MobWarpTargetSpecialAttackInfo = Readonly<{
	cooldown: number
	range: number
	sound: PNull<string>
	delay: number
	minDestinationRadius: number
	maxDestinationRadius: number
	swingArm: boolean
	particleOpts: PNull<TempMobParticleOpts>
}>
type MobCombatTetherCombatInfo = Readonly<{
	range: number
	particleOpts: MobParticleOpts
}>
type MobEvadeInfo = Readonly<{
	probability: number
	impulse: number
	minAngle: number
	maxAngle: number
}>
type MobTameInfo = {
	tameItemName: string | readonly string[]
	probabilityOfTame: number
	isSaddleable?: boolean
	saddleItemName?: string
	foodItemNames?: readonly string[]
	foodItemsWithEffects?: readonly Readonly<ItemNameWithEffects>[]
	supportsFriendship?: boolean
	likedFoods?: readonly string[]
	neutralFoods?: readonly string[]
	dislikedFoods?: readonly string[]
	guaranteedDrop?: ItemName
	commonDrops?: ItemName[]
	levelUpBonuses?: LevelUpBonuses
}
type MobPetInfo = {
	friendshipPoints: number
	lastFedAt: number
	highestFriendshipLevelReached: MobFeedLevel
	superlikedFood: PNull<ItemName>
	superlikedFoodKnown: boolean
	bonusesGained: readonly MobLevelUpBonus[]
}
type MobHealthRegenSettings = Readonly<{
	amount: number
	interval: number
	startAfter: number
}>
type TempMobParticleOpts = Readonly<{
	duration: number
}> &
	MobParticleOpts
type MobParticleOpts = Readonly<Pick<MeshParticleSystemOpts, "texture" | "colorGradients">>
type ItemNameWithEffects = { itemName: string; effects: readonly Readonly<EffectOpts>[]; healAmt?: number }
type LevelUpBonuses = RecursiveReadonly<Record<MobFeedLevelUpLevels, MobLevelUpBonus>>
type EffectOpts = { name: PotionEffect; duration: number; level: number }
type PotionEffect = (_TypeOf["potionEffects"])[number]
type MobFeedLevelUpLevels = Exclude<MobFeedLevel, 0>
type MobLevelUpBonus = (_TypeOf["mobLevelUpBonuses"])[number]
type MobFeedLevel = InclusiveRange<_TypeOf["MAX_MOB_FEED_LEVEL"]>
type InclusiveRange<N extends number, Arr extends number[] = []> = Arr["length"] extends N
	? Arr[number] | Arr["length"]
	: InclusiveRange<N, [...Arr, Arr["length"]]>
type MobAiState = (_TypeOf["mobAiStates"])[number]
type MobAiStateParams<TState extends MobAiState> = MobWorldView[TState]
type MobWorldView = {
	// The mob is stood still, but it still has awareness of its environment.
	// For example: if the mob is hostile, it will still chase and attack nearby players.
	idle: null
	// The mob is stood still, and it has no awareness of its environment.
	// It will not even react if provoked.
	disabled: null
	// The mob is stood still (idle) and is about to turn.
	idleBeforeTurning: null
	// The mob has chosen a new direction at random and is turning to face it.
	turning: null
	// The mob is stood still (idle) and is about to walk.
	idleBeforeWalking: null
	// The mob is walking in the direction it is facing.
	walking: null
	// The mob is running away from the target lifeform.
	runningAway: { targetId: LifeformId }
	// The mob is chasing the target lifeform.
	chasing: { targetId: LifeformId }
	// The mob is following the target lifeform.
	// It will stop if it is within the \`minFollowingDistance\` (mob setting) of the target,
	// and teleport to the target if it is outside the \`maxFollowingDistance\` (mob setting) of the target.
	following: { targetId: LifeformId }
	// The mob is stood still looking at the target.
	watching: { targetId: LifeformId }
	// The mob is walking towards the position.
	// It will stop if it is within the \`stoppingRadius\` (mob setting) of the position.
	walkingToPosition: { pos: Pos }
	// The mob is running towards the position.
	// It will stop if it is within the \`stoppingRadius\` (mob setting) of the position.
	runningToPosition: { pos: Pos }
}
type MeshEntityPhysicsOpts = {
	doPhysics: boolean
	onCollideTerrain?: () => void // Unsupported for custom code
	collidesEntities?: boolean
	collideBits?: number // bitmask category of this entity
	collideMask?: number // bitmask category of entities this entity collides with
	heightExpandAmt?: number // expand hitbox height by this amount
	widthExpandAmt?: number // expand hitbox width by this amount
	vehicleOpts?: MeshEntityVehicleOpts // Unsupported for custom code
}
type MeshEntityVehicleOpts = {
	/** Physics state the player transitions to when entering this entity. */
	physicsState: PlayerPhysicsStateData
	/** Item to drop when punched. Omit for game-mode vehicles that shouldn't be breakable. */
	itemDrop?: string
}
type PlayerPhysicsStateData = { type: PhysicsType; tier: number }
type QTEType = keyof QTEDefinitions
type QTEClientParameters<T extends QTEType = QTEType> = {
	type: T
	parameters: QTEParametersForType<T>
}
type QTEParametersForType<T extends QTEType> = QTEDefinitions[T]["params"]
interface QTEDefinitions {
	progressBar: { params: ProgressBarQteParams; state: ProgressBarQteState }
	timedClick: { params: TimedClickQteParams; state: TimedClickQteState }
	gravityBar: { params: GravityBarQteParams; state: GravityBarQteState }
	precisionBar: { params: PrecisionBarQteParams; state: PrecisionBarQteState }
	rhythmClick: { params: RhythmClickQteParams; state: RhythmClickQteState }
}
type ProgressBarQteParams = Readonly<{
	/** Starting progress value (0-100) @default 30 */
	progressStartValue?: number
	/** How much progress drains each tick while the player isn't clicking @default 0.075 */
	progressDecreasePerTick: number
	/** How much progress is gained per click @default 5 */
	progressPerClick: number
	/** If true, the QTE fails when progress reaches 0; otherwise progress clamps at 0 @default false */
	canFail: boolean
	/** Rich text shown as the QTE prompt @default [{ str: "Click repeatedly to complete!" }] */
	description: CustomTextStyling
	/** Icon displayed on the click target @default "fa-solid fa-computer-mouse" */
	clickIcon: string
	/** Scale multiplier for the click icon (must be > 0) @default 1 */
	scale?: number
	/** Rotation in degrees for the click icon (must be ≥ 0) @default 15 */
	rotation?: number
}>
type ProgressBarQteState = {
	progress: number
	clickCount: number
}
type TimedClickQteParams = Readonly<{
	/** Duration in milliseconds the player has to click @default 3000 */
	timeWindow: number
	/** Icon displayed on the click target @default "fa-solid fa-computer-mouse" */
	icon: string
	/** Rich text shown as the QTE prompt @default [{ str: "Click to complete the QTE!" }] */
	label: CustomTextStyling
	/** Whether to display a countdown timer @default true */
	showTimer: boolean
	/** Scale multiplier for the icon (must be > 0) @default 1 */
	scale?: number
	/** Rotation in degrees for the icon (must be ≥ 0) @default 15 */
	rotation?: number
	/** If true, the icon pulses with a breathing animation anchored to the centre @default false */
	breatheCenter?: boolean
}>
type TimedClickQteState = {
	timeRemaining: number
	timeWindow: number
}
type GravityBarQteParams = Readonly<{
	/** Starting progress value (0-100) @default 30 */
	progressStartValue?: number
	/** Size of the player's catch zone as a fraction of the bar (must be > 0, 0-1) @default 0.25 */
	catchZoneSize: number
	/** Speed at which the mover travels along the bar (must be > 0) @default 3 */
	moverSpeed: number
	/** How erratically the mover changes direction (higher = more unpredictable) @default 0.8 */
	moverErraticness: number
	/** Downward pull on the catch zone when the player isn't holding click @default 1 */
	gravity: number
	/** Upward force on the catch zone while the player holds click @default 1.5 */
	riseSpeed: number
	/** Progress gained per second while the mover is inside the catch zone @default 8 */
	progressGainPerSecond: number
	/** Progress lost per second while the mover is outside the catch zone @default 4 */
	progressDrainPerSecond: number
	/** If true, the QTE fails when progress reaches 0; otherwise progress clamps at 0 @default false */
	canFail: boolean
	/** Rich text shown as the QTE prompt @default [{ str: "Hold to catch!" }] */
	description: CustomTextStyling
	/** Icon displayed on the mover @default "Moonfish" */
	icon?: string
}>
type GravityBarQteState = {
	catchZonePosition: number
	catchZoneSize: number
	moverPosition: number
	progress: number
	isCatching: boolean
}
type PrecisionBarQteParams = Readonly<{
	/** Speed of the marker in full bar-widths per second (must be > 0, e.g. 1.0 = one full sweep per second) @default 0.5 */
	speed: number
	/** Fraction of the bar that counts as the success zone, centred in the middle (must be > 0, 0-1, e.g. 0.15 = 15%) @default 0.15 */
	successZoneSize: number
	/** Rich text shown as the QTE prompt @default [{ str: "Click when the marker is within the green zone." }] */
	label: CustomTextStyling
	/** Icon displayed on the marker @default "" */
	icon?: string
	/** Scale multiplier for the icon (must be > 0) @default 1 */
	scale?: number
	/** Rotation in degrees for the icon (must be ≥ 0) @default 0 */
	rotation?: number
}>
type PrecisionBarQteState = {
	/** Marker position as 0–1 where 0.5 is the centre */
	markerPosition: number
}
type RhythmClickQteParams = Readonly<{
	/** Number of successful clicks needed to complete the QTE (must be a positive integer) @default 5 */
	requiredSuccesses: number
	/** Duration in milliseconds for the outer circle to shrink from max size to centre (must be > 0) @default 1200 */
	shrinkDurationMs: number
	/** Fraction of the inner circle radius that counts as a successful overlap (must be > 0, 0-1, e.g. 0.15 = ±15%) @default 0.15 */
	toleranceFraction: number
	/** Max misses allowed before failing. If omitted, unlimited misses are permitted (must be a non-negative integer) @default 3 */
	maxMisses?: number
	/** Rich text shown as the QTE prompt @default [{ str: "Click when the circles align!" }] */
	label: CustomTextStyling
	/** Icon displayed in the centre of the circles @default "" */
	icon?: string
}>
type RhythmClickQteState = {
	/** Current outer circle radius as a fraction of the max radius (1 = fully expanded, 0 = at centre) */
	outerCircleProgress: number
	/** Number of successful clicks so far */
	successes: number
	/** Number of required successes to complete */
	requiredSuccesses: number
	/** Number of misses so far */
	misses: number
	/** Result of the most recent click: null if no click yet, true if hit, false if miss */
	lastClickResult: boolean | null
}
type QTERequestId = number
type IngameIconName = (_TypeOf["ingameIconNames"])[number]
type InbuiltEffectInfo = { inbuiltLevel: number; initiatorId?: PlayerId }
type AngleDir = {
	theta: number
	phi: number
}
type BlockRaycastResult = PNull<{
	blockID: BlockId // The block ID of the block that was hit
	position: Pos // The position of the block that was hit
	normal: Pos // The normal of the face that was hit
	adjacent: Pos // The position of the block adjacent to the hit face
}>
type MultiBlockInfo = {
	positions: { block: string; id: number; x: number; y: number; z: number }[]
}
type BoughtShopItem = Omit<ShopItem, "boughtCallback" | "schematicId" | "isRewardedAd">
type ChatTags = CustomTextStyling[]
type OnPlayerChatObjectResponse = Record<PlayerId, false | ChatMessageObject>
type ChatMessageObject = {
	prefixContent?: ChatTags
	chatContent?: CustomTextStyling
}
interface _TypeOf {
	lifeformBodyParts: readonly ["Torso", "Head", "ArmRight", "ArmLeft", "LegLeft", "LegRight"]
	ranks: readonly ["developer", "admin", "super", "youtuber"]
	shopItemBadgeTypes: readonly ["new", "lucky"]
	playerMeshNamedNodes: readonly ["TorsoNode", "HeadMesh", "ArmRightMesh", "ArmLeftMesh", "LegLeftMesh", "LegRightMesh"]
	particlePresets: { readonly damageInner: unknown; readonly damageOuter: unknown; readonly bouncinessInner: unknown; readonly bouncinessOuter: unknown; readonly healthRegenInner: unknown; readonly healthRegenOuter: unknown; readonly speedInner: unknown; readonly speedOuter: unknown; readonly damageReductionInner: unknown; readonly damageReductionOuter: unknown; readonly invisibleInner: unknown; readonly invisibleOuter: unknown; readonly jumpBoostInner: unknown; readonly jumpBoostOuter: unknown; readonly knockbackInner: unknown; readonly knockbackOuter: unknown; readonly poisonedInner: unknown; readonly poisonedOuter: unknown; readonly slownessInner: unknown; readonly slownessOuter: unknown; readonly weaknessInner: unknown; readonly weaknessOuter: unknown; readonly cleansedInner: unknown; readonly cleansedOuter: unknown; readonly instantDamageInner: unknown; readonly instantDamageOuter: unknown; readonly instantHealthInner: unknown; readonly instantHealthOuter: unknown; readonly hasteInner: unknown; readonly hasteOuter: unknown; readonly shieldInner: unknown; readonly shieldOuter: unknown; readonly doubleJumpInner: unknown; readonly doubleJumpOuter: unknown; readonly heatResistanceInner: unknown; readonly heatResistanceOuter: unknown; readonly thiefInner: unknown; readonly thiefOuter: unknown; readonly miningYieldInner: unknown; readonly miningYieldOuter: unknown; readonly brainRotInner: unknown; readonly brainRotOuter: unknown; readonly auraInner: unknown; readonly auraOuter: unknown; readonly wallClimbingInner: unknown; readonly wallClimbingOuter: unknown; readonly airWalkInner: unknown; readonly airWalkOuter: unknown; readonly pickpocketerInner: unknown; readonly pickpocketerOuter: unknown; readonly lifestealInner: unknown; readonly lifestealOuter: unknown; readonly blindnessInner: unknown; readonly blindnessOuter: unknown; readonly poopyInner: unknown; readonly poopyOuter: unknown; readonly xRayVisionInner: unknown; readonly xRayVisionOuter: unknown; readonly defaultFirecrackerSmall: { readonly colorGradients: TimeColorGradient[]; readonly texture: string; readonly minLifeTime: number; readonly maxLifeTime: number; readonly minEmitPower: number; readonly maxEmitPower: number; readonly minSize: number; readonly maxSize: number; readonly gravity: number[]; readonly velocityGradients: VelocityGradient[]; readonly blendMode: ParticleSystemBlendMode; readonly dir1: number[]; readonly dir2: number[]; readonly manualEmitCount: number; readonly hideDist: number; }; readonly defaultFirecrackerLarge: { readonly colorGradients: TimeColorGradient[]; readonly texture: string; readonly minLifeTime: number; readonly maxLifeTime: number; readonly minEmitPower: number; readonly maxEmitPower: number; readonly minSize: number; readonly maxSize: number; readonly gravity: number[]; readonly velocityGradients: VelocityGradient[]; readonly blendMode: ParticleSystemBlendMode; readonly dir1: number[]; readonly dir2: number[]; readonly manualEmitCount: number; readonly hideDist: number; }; readonly mango: unknown; readonly yellowFirecrackerSmall: unknown; readonly yellowFirecrackerLarge: unknown; readonly limeFirecrackerSmall: unknown; readonly limeFirecrackerLarge: unknown; readonly greenFirecrackerSmall: unknown; readonly greenFirecrackerLarge: unknown; readonly cyanFirecrackerSmall: unknown; readonly cyanFirecrackerLarge: unknown; readonly blueFirecrackerSmall: unknown; readonly blueFirecrackerLarge: unknown; readonly purpleFirecrackerSmall: unknown; readonly purpleFirecrackerLarge: unknown; readonly pinkFirecrackerSmall: unknown; readonly pinkFirecrackerLarge: unknown; readonly redFirecrackerSmall: unknown; readonly redFirecrackerLarge: unknown; readonly orangeFirecrackerSmall: unknown; readonly orangeFirecrackerLarge: unknown; readonly blackFirecrackerSmall: unknown; readonly blackFirecrackerLarge: unknown; readonly brownFirecrackerSmall: unknown; readonly brownFirecrackerLarge: unknown; readonly grayFirecrackerSmall: unknown; readonly grayFirecrackerLarge: unknown; readonly lightBlueFirecrackerSmall: unknown; readonly lightBlueFirecrackerLarge: unknown; readonly lightGrayFirecrackerSmall: unknown; readonly lightGrayFirecrackerLarge: unknown; readonly magentaFirecrackerSmall: unknown; readonly magentaFirecrackerLarge: unknown; readonly whiteFirecrackerSmall: unknown; readonly whiteFirecrackerLarge: unknown; readonly brainRot: unknown; readonly stomp: unknown; readonly fertiliser: unknown; readonly bonemeal: unknown; readonly mobTameSuccess: unknown; readonly mobTameFailure: unknown; readonly mobCatch: unknown; readonly spawnCaughtMob: unknown; readonly mobFeedDefault: unknown; readonly mobFeedSuperliked: { readonly colorGradients: TimeColorGradient[]; readonly texture: string; readonly minLifeTime: number; readonly maxLifeTime: number; readonly minEmitPower: number; readonly maxEmitPower: number; readonly minSize: number; readonly maxSize: number; readonly gravity: number[]; readonly velocityGradients: VelocityGradient[]; readonly blendMode: ParticleSystemBlendMode; readonly dir1: number[]; readonly dir2: number[]; readonly manualEmitCount: number; readonly hideDist: number; }; readonly mobFeedLike: { readonly colorGradients: TimeColorGradient[]; readonly texture: string; readonly minLifeTime: number; readonly maxLifeTime: number; readonly minEmitPower: number; readonly maxEmitPower: number; readonly minSize: number; readonly maxSize: number; readonly gravity: number[]; readonly velocityGradients: VelocityGradient[]; readonly blendMode: ParticleSystemBlendMode; readonly dir1: number[]; readonly dir2: number[]; readonly manualEmitCount: number; readonly hideDist: number; }; readonly mobFeedNeutral: { readonly colorGradients: TimeColorGradient[]; readonly texture: string; readonly minLifeTime: number; readonly maxLifeTime: number; readonly minEmitPower: number; readonly maxEmitPower: number; readonly minSize: number; readonly maxSize: number; readonly gravity: number[]; readonly velocityGradients: VelocityGradient[]; readonly blendMode: ParticleSystemBlendMode; readonly dir1: number[]; readonly dir2: number[]; readonly manualEmitCount: number; readonly hideDist: number; }; readonly mobFeedDisliked: { readonly colorGradients: TimeColorGradient[]; readonly texture: string; readonly minLifeTime: number; readonly maxLifeTime: number; readonly minEmitPower: number; readonly maxEmitPower: number; readonly minSize: number; readonly maxSize: number; readonly gravity: number[]; readonly velocityGradients: VelocityGradient[]; readonly blendMode: ParticleSystemBlendMode; readonly dir1: number[]; readonly dir2: number[]; readonly manualEmitCount: number; readonly hideDist: number; }; readonly mobDeath: unknown; readonly mobDeathSoul: unknown; readonly boardShopSuccess: unknown; readonly mobSpawnerBlockFail: { readonly colorGradients: [{ readonly timeFraction: 0; readonly minColor: [80, 80, 80, 1]; readonly maxColor: [160, 160, 160, 1]; }]; readonly texture: string; readonly minLifeTime: number; readonly maxLifeTime: number; readonly minEmitPower: number; readonly maxEmitPower: number; readonly minSize: number; readonly maxSize: number; readonly gravity: number[]; readonly velocityGradients: VelocityGradient[]; readonly blendMode: ParticleSystemBlendMode; readonly dir1: number[]; readonly dir2: number[]; readonly manualEmitCount: number; readonly hideDist: number; }; readonly mobSpawnerBlockPassive: { readonly colorGradients: [{ readonly timeFraction: 0; readonly minColor: [0, 200, 50, 1]; readonly maxColor: [0, 255, 100, 1]; }]; readonly texture: string; readonly minLifeTime: number; readonly maxLifeTime: number; readonly minEmitPower: number; readonly maxEmitPower: number; readonly minSize: number; readonly maxSize: number; readonly gravity: number[]; readonly velocityGradients: VelocityGradient[]; readonly blendMode: ParticleSystemBlendMode; readonly dir1: number[]; readonly dir2: number[]; readonly manualEmitCount: number; readonly hideDist: number; }; readonly mobSpawnerBlockNeutral: { readonly colorGradients: [{ readonly timeFraction: 0; readonly minColor: [200, 200, 0, 1]; readonly maxColor: [255, 255, 0, 1]; }]; readonly texture: string; readonly minLifeTime: number; readonly maxLifeTime: number; readonly minEmitPower: number; readonly maxEmitPower: number; readonly minSize: number; readonly maxSize: number; readonly gravity: number[]; readonly velocityGradients: VelocityGradient[]; readonly blendMode: ParticleSystemBlendMode; readonly dir1: number[]; readonly dir2: number[]; readonly manualEmitCount: number; readonly hideDist: number; }; readonly mobSpawnerBlockHostile: { readonly colorGradients: [{ readonly timeFraction: 0; readonly minColor: [200, 10, 0, 1]; readonly maxColor: [255, 20, 0, 1]; }]; readonly texture: string; readonly minLifeTime: number; readonly maxLifeTime: number; readonly minEmitPower: number; readonly maxEmitPower: number; readonly minSize: number; readonly maxSize: number; readonly gravity: number[]; readonly velocityGradients: VelocityGradient[]; readonly blendMode: ParticleSystemBlendMode; readonly dir1: number[]; readonly dir2: number[]; readonly manualEmitCount: number; readonly hideDist: number; }; readonly mobSpawnOrb: unknown; readonly aura: unknown; }
	customItemStats: readonly ["ttb", "displayName", "harvestLevel", "stoodOnSpeedMultiplier", "specialToolDrop", "specialToolBonusDrops", "description", "altActionable", "eatHealAmt", "eatShieldAmt", "damage", "attackRange", "secondaryDamage", "absorbThrowable", "armourReduction", "CrosshairText", "gunStats", "showInCreativeInven"]
	lifeformTypes: readonly ["Player", "Pig", "Cow", "Sheep", "Horse", "Deer", "Wolf", "Wildcat", "Spirit Golem", "Spirit Wolf", "Spirit Bear", "Spirit Stag", "Spirit Gorilla", "Bear", "Stag", "Gold Watermelon Stag", "Gorilla", "Cave Golem", "Draugr Zombie", "Draugr Skeleton", "Frost Golem", "Frost Zombie", "Frost Skeleton", "Draugr Knight", "Draugr Huntress", "Magma Golem", "Draugr Warper", "Frost Wraith", "Draugr Reaver", "NPC", "67", "Bobino Musculino", "Capitan Explosivo"]
	cosmeticTypes: readonly ["skin", "hat", "head", "eyebrows", "eyes", "back", "body", "legs", "shoes", "cape", "nameColour"]
	playerPoses: readonly ["standing", "sitting", "zombie", "gliding", "driving", "sleeping", "riding"]
	mobVariations: { readonly Pig: readonly ["default"]; readonly Cow: readonly ["default", "cream"]; readonly Sheep: readonly ["default", "black", "red", "orange", "pink", "purple", "yellow", "blue", "brown", "cyan", "gray", "green", "lightBlue", "lightGray", "lime", "magenta"]; readonly Horse: readonly ["default", "black", "brown", "cream"]; readonly "Cave Golem": readonly ["default", "iron"]; readonly "Draugr Zombie": readonly ["default", "longHairChestplate", "longHairClothed", "shortHairClothed"]; readonly "Draugr Skeleton": readonly ["default"]; readonly "Frost Golem": readonly ["default"]; readonly "Frost Zombie": readonly ["default", "longHairChestplate", "shortHairClothed"]; readonly "Frost Skeleton": readonly ["default"]; readonly "Draugr Knight": readonly ["default"]; readonly Wolf: readonly ["default", "white", "brown", "grey", "spectral"]; readonly Bear: readonly ["default"]; readonly Deer: readonly ["default"]; readonly Stag: readonly ["default"]; readonly "Gold Watermelon Stag": readonly ["default"]; readonly Gorilla: readonly ["default"]; readonly Wildcat: readonly ["default", "tabby", "grey", "black", "calico", "siamese", "leopard"]; readonly "Magma Golem": readonly ["default"]; readonly "Draugr Huntress": readonly ["default", "chainmail"]; readonly "Spirit Golem": readonly ["default"]; readonly "Spirit Wolf": readonly ["default"]; readonly "Spirit Bear": readonly ["default"]; readonly "Spirit Stag": readonly ["default"]; readonly "Spirit Gorilla": readonly ["default"]; readonly "Draugr Warper": readonly ["default"]; readonly "Frost Wraith": readonly ["default"]; readonly "Draugr Reaver": readonly ["default"]; readonly NPC: readonly ["default", "emma", "leo", "isabel", "sanjay", "imara", "enoch", "sara", "carmen"]; readonly "67": readonly ["default"]; readonly "Bobino Musculino": readonly ["default"]; readonly "Capitan Explosivo": readonly ["default"]; }
	mobTypes: readonly ["Pig", "Cow", "Sheep", "Horse", "Deer", "Wolf", "Wildcat", "Spirit Golem", "Spirit Wolf", "Spirit Bear", "Spirit Stag", "Spirit Gorilla", "Bear", "Stag", "Gold Watermelon Stag", "Gorilla", "Cave Golem", "Draugr Zombie", "Draugr Skeleton", "Frost Golem", "Frost Zombie", "Frost Skeleton", "Draugr Knight", "Draugr Huntress", "Magma Golem", "Draugr Warper", "Frost Wraith", "Draugr Reaver", "NPC", "67", "Bobino Musculino", "Capitan Explosivo"]
	mobSettings: readonly ["variation", "name", "maxHealth", "initialHealth", "idleSound", "attackSound", "secondaryAttackSound", "hurtSound", "onDeathItemDrops", "onDeathParticleTexture", "onDeathAura", "baseWalkingSpeed", "baseRunningSpeed", "walkingSpeedMultiplier", "runningSpeedMultiplier", "jumpCount", "baseJumpImpulseXZ", "baseJumpImpulseY", "jumpMultiplier", "runAwayRadius", "chaseRadius", "territoryRadius", "hostilityRadius", "stoppingRadius", "attackInterval", "attackRadius", "secondaryAttackRadius", "attackDamage", "secondaryAttackDamage", "attackImpulse", "secondaryAttackImpulse", "burstAttackInfo", "secondaryBurstAttackInfo", "heldItemName", "attackItemName", "secondaryAttackItemName", "swingArmOnAttack", "swingArmOnSecondaryAttack", "attackEffectName", "attackEffectDuration", "warpTargetSpecialAttackInfo", "combatTetherInfo", "evadeInfo", "tameInfo", "onTamedHealthMultiplier", "petInfo", "ownerDbId", "minFollowingRadius", "maxFollowingRadius", "isRideable", "healthRegen", "ridingSpeedMult", "metaInfo"]
	potionEffects: readonly ["Speed", "Damage Reduction", "Damage", "Invisible", "Jump Boost", "Knockback", "Poisoned", "Slowness", "Weakness", "Cleansed", "Instant Damage", "Health Regen", "Instant Health", "Haste", "Shield", "Double Jump", "Heat Resistance", "Thief", "X-Ray Vision", "Mining Yield", "Brain Rot", "Aura", "Wall Climbing", "Air Walk", "Pickpocketer", "Lifesteal", "Bounciness", "Blindness", "Poopy"]
	MAX_MOB_FEED_LEVEL: 5
	mobLevelUpBonuses: readonly ["Renaming", "Special Drops", "Thorns", "Rainbow Wool", "Max Health +", "Damage +", "Riding Speed +", "Double Poop", "Self Yield", "Painting", "Friends", "Pack Leader", "Poison Claws", "Mob Power", "Mob Yield", "Feed Aura", "Antlers"]
	mobAiStates: readonly ["idle", "disabled", "idleBeforeTurning", "turning", "idleBeforeWalking", "walking", "runningAway", "chasing", "following", "watching", "walkingToPosition", "runningToPosition"]
	ingameIconNames: readonly ["Damage", "Damage Reduction", "Speed", "VoidJump", "Fist", "Frozen", "Hydrated", "Invisible", "Jump Boost", "Poisoned", "Slowness", "Weakness", "Health Regen", "Haste", "Double Jump", "Heat Resistance", "Gliding", "Boating", "Obsidian Boating", "Riding", "Bunny Hop", "FallDamage", "Feather Falling", "Thief", "X-Ray Vision", "Mining Yield", "Brain Rot", "Rested Damage", "Rested Haste", "Rested Speed", "Rested Farming Yield", "Rested Aura", "Blindness", "Pickpocketer", "Lifesteal", "Bounciness", "Air Walk", "Wall Climbing", "Thorns", "Poopy", "Draugr Knight Head", "Draugr Warper Head", "Magma Golem Head", "Mystery Fish", "Damage Enchantment", "Critical Damage Enchantment", "Attack Speed Enchantment", "Protection Enchantment", "Health Enchantment", "Health Regen Enchantment", "Stomp Damage Enchantment", "Knockback Resist Enchantment", "Arrow Speed Enchantment", "Arrow Damage Enchantment", "Quick Charge Enchantment", "Break Speed Enchantment", "Momentum Enchantment", "Mining Yield Enchantment", "Farming Yield Enchantment", "Mining Aura Enchantment", "Digging Aura Enchantment", "Lumber Aura Enchantment", "Farming Aura Enchantment", "Vertical Knockback Enchantment", "Horizontal Knockback Enchantment", "Self Yield", "Friends", "Riding Speed", "Feed Aura", "Double Poop", "Mob Slayer", "Rainbow Wool", "Pack Leader", "Max Health", "Poison Claws", "Mob Yield", "Antlers Bonus", "Health", "HealthShield", "Cross", "Friendship", "Dotted Friendship", "Hunger", "Empty Hunger", "Pixelated Heart", "Question Mark", "Trader Black", "Trader Blue", "Trader Piggy"]
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
		readonly lava: true | null
		readonly top: true | null
		readonly grassRoots: true | null
		readonly breaking: true | null
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
		textureInfo: | string
			| (string | AnimParams)[]
			| [number, number, number, number?]
			| ({
					colour?: [number, number, number, number?]
			  } & AnimParams)
		texturePerSide: number[]
		harvestType: HarvestType
		transTex: boolean
		model: | "CentreCross"
			| "SquareSided"
			| "CustomPlanes"
			| "CustomPlanes|rotatable"
			| "CustomModel"
			| "Slab"
			| "door"
			| "trapdoor"
			| "rotatableOffset"
			| "rotatable"
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
		specialToolDrop: { tool: string; drops: string }
		specialToolBonusDrops: RecursiveReadonly<Record<string, { bonusDrop: string; probabilityOfDrop: number }[]>>
		damage: number
		stoodOnSpeedMultiplier: number
		description: string | TranslatedText | CustomTextStyling
		altActionable: boolean
		soundType: { break: SoundType; place: SoundType }
		unlitStandaloneMesh: boolean
		customPlanesInfo: { textureIdx: number; yRot: number }[]
		customModelInfo: { yOffset?: number; yRotOffset?: number; unlit?: boolean; emissiveColor?: [number, number, number]; backFaceCulling?: boolean }
		absorbThrowable?: boolean
		CrosshairText?: string | CustomTextStyling
		/** Light emission as [R, G, B], each 0-15. Omit for no emission. */
		lightEmission?: [number, number, number]
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
		lightEmission?: [number, number, number]
		meta?: ItemMetaInfo
		rootMetaDesc?: string
		keepMetaInChest?: boolean
		gunType?: string
		scopeType?: "none" | "sniper"
		muzzleFlashOffsetFromGun?: [number, number, number]
		muzzleFlashScale?: number
		autoFireWithMouse?: boolean
		fireRate?: number
		fireRateWithHeldTouch?: number
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
		getUnderlyingData(): number[] | any | any
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
type PhysicsType = 0 | 1 | 2 | 3 | 4 | 5
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
		/** Held item light colour override - hex colour string e.g. #ffffff. Applied regardless of any held item. */
		heldLightColourOverride: string
		/** When true, hides world and chunk coordinates regardless of the player's setting. */
		hideCoordinates: boolean
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
