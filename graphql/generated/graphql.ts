import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type ContactIds = {
  __typename?: 'ContactIds';
  group?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  visible?: Maybe<Scalars['Boolean']['output']>;
};

export type CountryInput = {
  country?: InputMaybe<Scalars['String']['input']>;
  visited?: InputMaybe<Scalars['Boolean']['input']>;
};

export type CountryOutput = {
  __typename?: 'CountryOutput';
  country?: Maybe<Scalars['String']['output']>;
  dateAdded?: Maybe<Scalars['String']['output']>;
};

export type FollowChange = {
  __typename?: 'FollowChange';
  follow?: Maybe<Scalars['Boolean']['output']>;
  from?: Maybe<User>;
  to?: Maybe<User>;
};

/** the optional initial place on a list */
export type InitialPlace = {
  address?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  googlePlaceId: Scalars['String']['input'];
  location: LatLngInput;
  name: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  rating?: InputMaybe<PlaceRatingInput>;
  types?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type LatLngInput = {
  latitude?: InputMaybe<Scalars['Float']['input']>;
  longitude?: InputMaybe<Scalars['Float']['input']>;
};

export type LatLngOutput = {
  __typename?: 'LatLngOutput';
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
};

/** A list */
export type List = {
  __typename?: 'List';
  city?: Maybe<Scalars['String']['output']>;
  commentIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  country?: Maybe<Scalars['String']['output']>;
  deleted?: Maybe<Scalars['Boolean']['output']>;
  displayName: Scalars['String']['output'];
  duplicatePlace?: Maybe<Scalars['Boolean']['output']>;
  followerProfiles?: Maybe<Array<Maybe<User>>>;
  followers?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  location?: Maybe<LatLngOutput>;
  noteIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  photoLocation?: Maybe<Scalars['String']['output']>;
  placeIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  places?: Maybe<Array<Maybe<Place>>>;
};

export type Message = {
  __typename?: 'Message';
  from: Scalars['ID']['output'];
  message: Scalars['String']['output'];
  to: Array<Maybe<Scalars['ID']['output']>>;
};

/** A message group */
export type MessageGroup = {
  __typename?: 'MessageGroup';
  group?: Maybe<Scalars['Boolean']['output']>;
  members?: Maybe<Array<Maybe<Scalars['ID']['output']>>>;
  messages?: Maybe<Array<Maybe<Message>>>;
  name?: Maybe<Scalars['String']['output']>;
};

/** Root Mutation */
export type Mutation = {
  __typename?: 'Mutation';
  /** Add a place to a list */
  addPlaceToList?: Maybe<List>;
  /** Start a group with a message */
  createGroup?: Maybe<MessageGroup>;
  /** Initialise a list */
  createList?: Maybe<List>;
  /** Initialise a place */
  createPlace?: Maybe<Place>;
  /** Create a new user */
  createUser?: Maybe<User>;
  /** Removes a list from a user */
  deleteList?: Maybe<User>;
  /** Add a new follow */
  follow?: Maybe<User>;
  /** Create a new signup */
  postDetails?: Maybe<SignUp>;
  /** Add a message to a group */
  postMessage?: Maybe<MessageGroup>;
  /** Alter a user */
  putContact?: Maybe<User>;
  /** Alter a signup */
  putDetails?: Maybe<SignUp>;
  /** Alter a user */
  putUser?: Maybe<User>;
  /** Remove follow */
  unfollow?: Maybe<User>;
};


/** Root Mutation */
export type MutationAddPlaceToListArgs = {
  listId: Scalars['String']['input'];
  place?: InputMaybe<PlaceToAdd>;
  userId: Scalars['String']['input'];
};


/** Root Mutation */
export type MutationCreateGroupArgs = {
  from: Scalars['String']['input'];
  message?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  to: Array<InputMaybe<Scalars['String']['input']>>;
};


/** Root Mutation */
export type MutationCreateListArgs = {
  displayName: Scalars['String']['input'];
  initialPlace?: InputMaybe<InitialPlace>;
  location?: InputMaybe<LatLngInput>;
  userId: Scalars['String']['input'];
};


/** Root Mutation */
export type MutationCreateUserArgs = {
  displayName: Scalars['String']['input'];
  dob: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  profileLocation?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
};


/** Root Mutation */
export type MutationDeleteListArgs = {
  listId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


/** Root Mutation */
export type MutationFollowArgs = {
  followId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


/** Root Mutation */
export type MutationPostDetailsArgs = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};


/** Root Mutation */
export type MutationPostMessageArgs = {
  groupId?: InputMaybe<Scalars['String']['input']>;
  message?: InputMaybe<Scalars['String']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};


/** Root Mutation */
export type MutationPutContactArgs = {
  contactIds: Array<InputMaybe<Scalars['String']['input']>>;
  groupName?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Root Mutation */
export type MutationPutDetailsArgs = {
  countriesToVisit?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  countriesVisited?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id: Scalars['String']['input'];
};


/** Root Mutation */
export type MutationPutUserArgs = {
  checkInLocation?: InputMaybe<CheckInLocation>;
  countries?: InputMaybe<Array<InputMaybe<CountryInput>>>;
  userId: Scalars['String']['input'];
};


/** Root Mutation */
export type MutationUnfollowArgs = {
  followId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

/** Place to check whether duplicate */
export type NewPlaceToCheck = {
  address?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  googlePlaceId: Scalars['String']['input'];
  location: LatLngInput;
  name: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  rating?: InputMaybe<PlaceRatingInput>;
  types?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** A place */
export type Place = {
  __typename?: 'Place';
  address?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  comments?: Maybe<Array<Maybe<PlaceCommentOutput>>>;
  country?: Maybe<Scalars['String']['output']>;
  googlePlaceId: Scalars['String']['output'];
  location: LatLngOutput;
  name: Scalars['String']['output'];
  ratings?: Maybe<Array<Maybe<PlaceRatingOutput>>>;
  types?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type PlaceCommentOutput = {
  __typename?: 'PlaceCommentOutput';
  dateCreated: Scalars['String']['output'];
  id: Scalars['String']['output'];
  likes: Scalars['Int']['output'];
  text: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type PlaceRatingInput = {
  dateCreated: Scalars['String']['input'];
  id: Scalars['String']['input'];
  stars?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['String']['input'];
};

export type PlaceRatingOutput = {
  __typename?: 'PlaceRatingOutput';
  dateCreated: Scalars['String']['output'];
  id: Scalars['String']['output'];
  stars?: Maybe<Scalars['String']['output']>;
  userId: Scalars['String']['output'];
};

/** the place to add to a list */
export type PlaceToAdd = {
  address?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  googlePlaceId: Scalars['String']['input'];
  location: LatLngInput;
  name: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  rating?: InputMaybe<PlaceRatingInput>;
  types?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/** Root Query */
export type Query = {
  __typename?: 'Query';
  /** Find out if a duplicate place is being added to a list */
  checkDuplicatePlace?: Maybe<Scalars['Boolean']['output']>;
  /** Retrieve users */
  getContacts?: Maybe<User>;
  /** Retrieve a list */
  getList?: Maybe<List>;
  /** Retrieve a user */
  getUser?: Maybe<User>;
  /** Retrieve a user with email and password */
  loginUser?: Maybe<User>;
  /** Search for users */
  userSearch?: Maybe<Array<Maybe<User>>>;
};


/** Root Query */
export type QueryCheckDuplicatePlaceArgs = {
  listId: Scalars['String']['input'];
  place?: InputMaybe<NewPlaceToCheck>;
};


/** Root Query */
export type QueryGetContactsArgs = {
  userId: Scalars['String']['input'];
};


/** Root Query */
export type QueryGetListArgs = {
  id: Scalars['String']['input'];
};


/** Root Query */
export type QueryGetUserArgs = {
  id: Scalars['String']['input'];
  populated?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Root Query */
export type QueryLoginUserArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


/** Root Query */
export type QueryUserSearchArgs = {
  query?: InputMaybe<Scalars['String']['input']>;
};

/** A signup */
export type SignUp = {
  __typename?: 'SignUp';
  _id?: Maybe<Scalars['String']['output']>;
  countriesToVisit?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  countriesVisited?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  email?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

/** Root Subscription */
export type Subscription = {
  __typename?: 'Subscription';
  /** A Change to followers/following */
  followChange?: Maybe<FollowChange>;
  /** New messages from the server */
  newMessages?: Maybe<MessageGroup>;
};


/** Root Subscription */
export type SubscriptionFollowChangeArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
};


/** Root Subscription */
export type SubscriptionNewMessagesArgs = {
  date?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};

/** A single user's data */
export type User = {
  __typename?: 'User';
  admin?: Maybe<Scalars['Boolean']['output']>;
  checkInLocation?: Maybe<CheckInOutput>;
  contactIds?: Maybe<Array<Maybe<ContactIds>>>;
  contacts?: Maybe<Array<Maybe<User>>>;
  countries?: Maybe<Array<Maybe<CountryOutput>>>;
  displayName: Scalars['String']['output'];
  dob: Scalars['String']['output'];
  email: Scalars['String']['output'];
  followerUsers?: Maybe<Array<Maybe<User>>>;
  followers?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  following?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  followingUsers?: Maybe<Array<Maybe<User>>>;
  group?: Maybe<Scalars['String']['output']>;
  listIds?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  lists?: Maybe<Array<Maybe<List>>>;
  messagingGroups?: Maybe<Array<Maybe<MessageGroup>>>;
  password: Scalars['String']['output'];
  profileLocation?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
  visible?: Maybe<Scalars['Boolean']['output']>;
};

/** the details of where user is checking in */
export type CheckInLocation = {
  location?: InputMaybe<LatLngInput>;
  names?: InputMaybe<CheckInLocationNames>;
  placeId?: InputMaybe<Scalars['String']['input']>;
};

export type CheckInLocationNames = {
  main_text?: InputMaybe<Scalars['String']['input']>;
  secondary_text?: InputMaybe<Scalars['String']['input']>;
};

export type CheckInLocationOutput = {
  __typename?: 'checkInLocationOutput';
  main_text?: Maybe<Scalars['String']['output']>;
  secondary_text?: Maybe<Scalars['String']['output']>;
};

export type CheckInOutput = {
  __typename?: 'checkInOutput';
  location?: Maybe<LatLngOutput>;
  names?: Maybe<CheckInLocationOutput>;
  placeId?: Maybe<Scalars['String']['output']>;
};

export type AdditionalEntityFields = {
  path?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  ContactIds: ResolverTypeWrapper<ContactIds>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CountryInput: CountryInput;
  CountryOutput: ResolverTypeWrapper<CountryOutput>;
  FollowChange: ResolverTypeWrapper<FollowChange>;
  InitialPlace: InitialPlace;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  LatLngInput: LatLngInput;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  LatLngOutput: ResolverTypeWrapper<LatLngOutput>;
  List: ResolverTypeWrapper<List>;
  Message: ResolverTypeWrapper<Message>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  MessageGroup: ResolverTypeWrapper<MessageGroup>;
  Mutation: ResolverTypeWrapper<{}>;
  NewPlaceToCheck: NewPlaceToCheck;
  Place: ResolverTypeWrapper<Place>;
  PlaceCommentOutput: ResolverTypeWrapper<PlaceCommentOutput>;
  PlaceRatingInput: PlaceRatingInput;
  PlaceRatingOutput: ResolverTypeWrapper<PlaceRatingOutput>;
  PlaceToAdd: PlaceToAdd;
  Query: ResolverTypeWrapper<{}>;
  SignUp: ResolverTypeWrapper<SignUp>;
  Subscription: ResolverTypeWrapper<{}>;
  User: ResolverTypeWrapper<User>;
  checkInLocation: CheckInLocation;
  checkInLocationNames: CheckInLocationNames;
  checkInLocationOutput: ResolverTypeWrapper<CheckInLocationOutput>;
  checkInOutput: ResolverTypeWrapper<CheckInOutput>;
  AdditionalEntityFields: AdditionalEntityFields;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  ContactIds: ContactIds;
  String: Scalars['String']['output'];
  Boolean: Scalars['Boolean']['output'];
  CountryInput: CountryInput;
  CountryOutput: CountryOutput;
  FollowChange: FollowChange;
  InitialPlace: InitialPlace;
  Int: Scalars['Int']['output'];
  LatLngInput: LatLngInput;
  Float: Scalars['Float']['output'];
  LatLngOutput: LatLngOutput;
  List: List;
  Message: Message;
  ID: Scalars['ID']['output'];
  MessageGroup: MessageGroup;
  Mutation: {};
  NewPlaceToCheck: NewPlaceToCheck;
  Place: Place;
  PlaceCommentOutput: PlaceCommentOutput;
  PlaceRatingInput: PlaceRatingInput;
  PlaceRatingOutput: PlaceRatingOutput;
  PlaceToAdd: PlaceToAdd;
  Query: {};
  SignUp: SignUp;
  Subscription: {};
  User: User;
  checkInLocation: CheckInLocation;
  checkInLocationNames: CheckInLocationNames;
  checkInLocationOutput: CheckInLocationOutput;
  checkInOutput: CheckInOutput;
  AdditionalEntityFields: AdditionalEntityFields;
};

export type UnionDirectiveArgs = {
  discriminatorField?: Maybe<Scalars['String']['input']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type UnionDirectiveResolver<Result, Parent, ContextType = any, Args = UnionDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AbstractEntityDirectiveArgs = {
  discriminatorField: Scalars['String']['input'];
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type AbstractEntityDirectiveResolver<Result, Parent, ContextType = any, Args = AbstractEntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityDirectiveArgs = {
  embedded?: Maybe<Scalars['Boolean']['input']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type EntityDirectiveResolver<Result, Parent, ContextType = any, Args = EntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ColumnDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']['input']>;
};

export type ColumnDirectiveResolver<Result, Parent, ContextType = any, Args = ColumnDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IdDirectiveArgs = { };

export type IdDirectiveResolver<Result, Parent, ContextType = any, Args = IdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type LinkDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']['input']>;
};

export type LinkDirectiveResolver<Result, Parent, ContextType = any, Args = LinkDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EmbeddedDirectiveArgs = { };

export type EmbeddedDirectiveResolver<Result, Parent, ContextType = any, Args = EmbeddedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MapDirectiveArgs = {
  path: Scalars['String']['input'];
};

export type MapDirectiveResolver<Result, Parent, ContextType = any, Args = MapDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ContactIdsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ContactIds'] = ResolversParentTypes['ContactIds']> = {
  group?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  visible?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CountryOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['CountryOutput'] = ResolversParentTypes['CountryOutput']> = {
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  dateAdded?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FollowChangeResolvers<ContextType = any, ParentType extends ResolversParentTypes['FollowChange'] = ResolversParentTypes['FollowChange']> = {
  follow?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  from?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  to?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LatLngOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['LatLngOutput'] = ResolversParentTypes['LatLngOutput']> = {
  latitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  longitude?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ListResolvers<ContextType = any, ParentType extends ResolversParentTypes['List'] = ResolversParentTypes['List']> = {
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  commentIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  duplicatePlace?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  followerProfiles?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  followers?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  location?: Resolver<Maybe<ResolversTypes['LatLngOutput']>, ParentType, ContextType>;
  noteIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  photoLocation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  placeIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  places?: Resolver<Maybe<Array<Maybe<ResolversTypes['Place']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  from?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  to?: Resolver<Array<Maybe<ResolversTypes['ID']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageGroupResolvers<ContextType = any, ParentType extends ResolversParentTypes['MessageGroup'] = ResolversParentTypes['MessageGroup']> = {
  group?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  members?: Resolver<Maybe<Array<Maybe<ResolversTypes['ID']>>>, ParentType, ContextType>;
  messages?: Resolver<Maybe<Array<Maybe<ResolversTypes['Message']>>>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addPlaceToList?: Resolver<Maybe<ResolversTypes['List']>, ParentType, ContextType, RequireFields<MutationAddPlaceToListArgs, 'listId' | 'userId'>>;
  createGroup?: Resolver<Maybe<ResolversTypes['MessageGroup']>, ParentType, ContextType, RequireFields<MutationCreateGroupArgs, 'from' | 'to'>>;
  createList?: Resolver<Maybe<ResolversTypes['List']>, ParentType, ContextType, RequireFields<MutationCreateListArgs, 'displayName' | 'userId'>>;
  createPlace?: Resolver<Maybe<ResolversTypes['Place']>, ParentType, ContextType>;
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'displayName' | 'dob' | 'email' | 'password' | 'username'>>;
  deleteList?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationDeleteListArgs, 'listId' | 'userId'>>;
  follow?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationFollowArgs, 'followId' | 'userId'>>;
  postDetails?: Resolver<Maybe<ResolversTypes['SignUp']>, ParentType, ContextType, Partial<MutationPostDetailsArgs>>;
  postMessage?: Resolver<Maybe<ResolversTypes['MessageGroup']>, ParentType, ContextType, Partial<MutationPostMessageArgs>>;
  putContact?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationPutContactArgs, 'contactIds' | 'userId'>>;
  putDetails?: Resolver<Maybe<ResolversTypes['SignUp']>, ParentType, ContextType, RequireFields<MutationPutDetailsArgs, 'id'>>;
  putUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationPutUserArgs, 'userId'>>;
  unfollow?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUnfollowArgs, 'followId' | 'userId'>>;
};

export type PlaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Place'] = ResolversParentTypes['Place']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  comments?: Resolver<Maybe<Array<Maybe<ResolversTypes['PlaceCommentOutput']>>>, ParentType, ContextType>;
  country?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  googlePlaceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  location?: Resolver<ResolversTypes['LatLngOutput'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ratings?: Resolver<Maybe<Array<Maybe<ResolversTypes['PlaceRatingOutput']>>>, ParentType, ContextType>;
  types?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlaceCommentOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlaceCommentOutput'] = ResolversParentTypes['PlaceCommentOutput']> = {
  dateCreated?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  likes?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlaceRatingOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['PlaceRatingOutput'] = ResolversParentTypes['PlaceRatingOutput']> = {
  dateCreated?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  stars?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  checkDuplicatePlace?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<QueryCheckDuplicatePlaceArgs, 'listId'>>;
  getContacts?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetContactsArgs, 'userId'>>;
  getList?: Resolver<Maybe<ResolversTypes['List']>, ParentType, ContextType, RequireFields<QueryGetListArgs, 'id'>>;
  getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserArgs, 'id' | 'populated'>>;
  loginUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryLoginUserArgs, 'email' | 'password'>>;
  userSearch?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType, Partial<QueryUserSearchArgs>>;
};

export type SignUpResolvers<ContextType = any, ParentType extends ResolversParentTypes['SignUp'] = ResolversParentTypes['SignUp']> = {
  _id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  countriesToVisit?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  countriesVisited?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  followChange?: SubscriptionResolver<Maybe<ResolversTypes['FollowChange']>, "followChange", ParentType, ContextType, Partial<SubscriptionFollowChangeArgs>>;
  newMessages?: SubscriptionResolver<Maybe<ResolversTypes['MessageGroup']>, "newMessages", ParentType, ContextType, Partial<SubscriptionNewMessagesArgs>>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  admin?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  checkInLocation?: Resolver<Maybe<ResolversTypes['checkInOutput']>, ParentType, ContextType>;
  contactIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['ContactIds']>>>, ParentType, ContextType>;
  contacts?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  countries?: Resolver<Maybe<Array<Maybe<ResolversTypes['CountryOutput']>>>, ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  dob?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  followerUsers?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  followers?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  following?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  followingUsers?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  group?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  listIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  lists?: Resolver<Maybe<Array<Maybe<ResolversTypes['List']>>>, ParentType, ContextType>;
  messagingGroups?: Resolver<Maybe<Array<Maybe<ResolversTypes['MessageGroup']>>>, ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  profileLocation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  visible?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CheckInLocationOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['checkInLocationOutput'] = ResolversParentTypes['checkInLocationOutput']> = {
  main_text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  secondary_text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CheckInOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['checkInOutput'] = ResolversParentTypes['checkInOutput']> = {
  location?: Resolver<Maybe<ResolversTypes['LatLngOutput']>, ParentType, ContextType>;
  names?: Resolver<Maybe<ResolversTypes['checkInLocationOutput']>, ParentType, ContextType>;
  placeId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  ContactIds?: ContactIdsResolvers<ContextType>;
  CountryOutput?: CountryOutputResolvers<ContextType>;
  FollowChange?: FollowChangeResolvers<ContextType>;
  LatLngOutput?: LatLngOutputResolvers<ContextType>;
  List?: ListResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  MessageGroup?: MessageGroupResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Place?: PlaceResolvers<ContextType>;
  PlaceCommentOutput?: PlaceCommentOutputResolvers<ContextType>;
  PlaceRatingOutput?: PlaceRatingOutputResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SignUp?: SignUpResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  checkInLocationOutput?: CheckInLocationOutputResolvers<ContextType>;
  checkInOutput?: CheckInOutputResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  union?: UnionDirectiveResolver<any, any, ContextType>;
  abstractEntity?: AbstractEntityDirectiveResolver<any, any, ContextType>;
  entity?: EntityDirectiveResolver<any, any, ContextType>;
  column?: ColumnDirectiveResolver<any, any, ContextType>;
  id?: IdDirectiveResolver<any, any, ContextType>;
  link?: LinkDirectiveResolver<any, any, ContextType>;
  embedded?: EmbeddedDirectiveResolver<any, any, ContextType>;
  map?: MapDirectiveResolver<any, any, ContextType>;
};

import { ObjectId } from 'mongodb';