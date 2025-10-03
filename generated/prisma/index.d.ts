
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Billing
 * 
 */
export type Billing = $Result.DefaultSelection<Prisma.$BillingPayload>
/**
 * Model Payment
 * 
 */
export type Payment = $Result.DefaultSelection<Prisma.$PaymentPayload>
/**
 * Model SurveyInterest
 * 
 */
export type SurveyInterest = $Result.DefaultSelection<Prisma.$SurveyInterestPayload>
/**
 * Model Ticket
 * 
 */
export type Ticket = $Result.DefaultSelection<Prisma.$TicketPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Billings
 * const billings = await prisma.billing.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Billings
   * const billings = await prisma.billing.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.billing`: Exposes CRUD operations for the **Billing** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Billings
    * const billings = await prisma.billing.findMany()
    * ```
    */
  get billing(): Prisma.BillingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payments
    * const payments = await prisma.payment.findMany()
    * ```
    */
  get payment(): Prisma.PaymentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.surveyInterest`: Exposes CRUD operations for the **SurveyInterest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SurveyInterests
    * const surveyInterests = await prisma.surveyInterest.findMany()
    * ```
    */
  get surveyInterest(): Prisma.SurveyInterestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ticket`: Exposes CRUD operations for the **Ticket** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tickets
    * const tickets = await prisma.ticket.findMany()
    * ```
    */
  get ticket(): Prisma.TicketDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.16.2
   * Query Engine version: 1c57fdcd7e44b29b9313256c76699e91c3ac3c43
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Billing: 'Billing',
    Payment: 'Payment',
    SurveyInterest: 'SurveyInterest',
    Ticket: 'Ticket',
    User: 'User'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "billing" | "payment" | "surveyInterest" | "ticket" | "user"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Billing: {
        payload: Prisma.$BillingPayload<ExtArgs>
        fields: Prisma.BillingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BillingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BillingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillingPayload>
          }
          findFirst: {
            args: Prisma.BillingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BillingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillingPayload>
          }
          findMany: {
            args: Prisma.BillingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillingPayload>[]
          }
          create: {
            args: Prisma.BillingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillingPayload>
          }
          createMany: {
            args: Prisma.BillingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BillingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillingPayload>[]
          }
          delete: {
            args: Prisma.BillingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillingPayload>
          }
          update: {
            args: Prisma.BillingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillingPayload>
          }
          deleteMany: {
            args: Prisma.BillingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BillingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BillingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillingPayload>[]
          }
          upsert: {
            args: Prisma.BillingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BillingPayload>
          }
          aggregate: {
            args: Prisma.BillingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBilling>
          }
          groupBy: {
            args: Prisma.BillingGroupByArgs<ExtArgs>
            result: $Utils.Optional<BillingGroupByOutputType>[]
          }
          count: {
            args: Prisma.BillingCountArgs<ExtArgs>
            result: $Utils.Optional<BillingCountAggregateOutputType> | number
          }
        }
      }
      Payment: {
        payload: Prisma.$PaymentPayload<ExtArgs>
        fields: Prisma.PaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findFirst: {
            args: Prisma.PaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findMany: {
            args: Prisma.PaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          create: {
            args: Prisma.PaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          createMany: {
            args: Prisma.PaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          delete: {
            args: Prisma.PaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          update: {
            args: Prisma.PaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          deleteMany: {
            args: Prisma.PaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PaymentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          upsert: {
            args: Prisma.PaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          aggregate: {
            args: Prisma.PaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayment>
          }
          groupBy: {
            args: Prisma.PaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentCountAggregateOutputType> | number
          }
        }
      }
      SurveyInterest: {
        payload: Prisma.$SurveyInterestPayload<ExtArgs>
        fields: Prisma.SurveyInterestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SurveyInterestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyInterestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SurveyInterestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyInterestPayload>
          }
          findFirst: {
            args: Prisma.SurveyInterestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyInterestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SurveyInterestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyInterestPayload>
          }
          findMany: {
            args: Prisma.SurveyInterestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyInterestPayload>[]
          }
          create: {
            args: Prisma.SurveyInterestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyInterestPayload>
          }
          createMany: {
            args: Prisma.SurveyInterestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SurveyInterestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyInterestPayload>[]
          }
          delete: {
            args: Prisma.SurveyInterestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyInterestPayload>
          }
          update: {
            args: Prisma.SurveyInterestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyInterestPayload>
          }
          deleteMany: {
            args: Prisma.SurveyInterestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SurveyInterestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SurveyInterestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyInterestPayload>[]
          }
          upsert: {
            args: Prisma.SurveyInterestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SurveyInterestPayload>
          }
          aggregate: {
            args: Prisma.SurveyInterestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSurveyInterest>
          }
          groupBy: {
            args: Prisma.SurveyInterestGroupByArgs<ExtArgs>
            result: $Utils.Optional<SurveyInterestGroupByOutputType>[]
          }
          count: {
            args: Prisma.SurveyInterestCountArgs<ExtArgs>
            result: $Utils.Optional<SurveyInterestCountAggregateOutputType> | number
          }
        }
      }
      Ticket: {
        payload: Prisma.$TicketPayload<ExtArgs>
        fields: Prisma.TicketFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TicketFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TicketFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          findFirst: {
            args: Prisma.TicketFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TicketFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          findMany: {
            args: Prisma.TicketFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>[]
          }
          create: {
            args: Prisma.TicketCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          createMany: {
            args: Prisma.TicketCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TicketCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>[]
          }
          delete: {
            args: Prisma.TicketDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          update: {
            args: Prisma.TicketUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          deleteMany: {
            args: Prisma.TicketDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TicketUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TicketUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>[]
          }
          upsert: {
            args: Prisma.TicketUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          aggregate: {
            args: Prisma.TicketAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTicket>
          }
          groupBy: {
            args: Prisma.TicketGroupByArgs<ExtArgs>
            result: $Utils.Optional<TicketGroupByOutputType>[]
          }
          count: {
            args: Prisma.TicketCountArgs<ExtArgs>
            result: $Utils.Optional<TicketCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    billing?: BillingOmit
    payment?: PaymentOmit
    surveyInterest?: SurveyInterestOmit
    ticket?: TicketOmit
    user?: UserOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type SurveyInterestCountOutputType
   */

  export type SurveyInterestCountOutputType = {
    User: number
  }

  export type SurveyInterestCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | SurveyInterestCountOutputTypeCountUserArgs
  }

  // Custom InputTypes
  /**
   * SurveyInterestCountOutputType without action
   */
  export type SurveyInterestCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyInterestCountOutputType
     */
    select?: SurveyInterestCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SurveyInterestCountOutputType without action
   */
  export type SurveyInterestCountOutputTypeCountUserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    Payment: number
    Ticket: number
    SurveyInterest: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Payment?: boolean | UserCountOutputTypeCountPaymentArgs
    Ticket?: boolean | UserCountOutputTypeCountTicketArgs
    SurveyInterest?: boolean | UserCountOutputTypeCountSurveyInterestArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPaymentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTicketArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSurveyInterestArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SurveyInterestWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Billing
   */

  export type AggregateBilling = {
    _count: BillingCountAggregateOutputType | null
    _avg: BillingAvgAggregateOutputType | null
    _sum: BillingSumAggregateOutputType | null
    _min: BillingMinAggregateOutputType | null
    _max: BillingMaxAggregateOutputType | null
  }

  export type BillingAvgAggregateOutputType = {
    id: number | null
    amount: number | null
  }

  export type BillingSumAggregateOutputType = {
    id: number | null
    amount: number | null
  }

  export type BillingMinAggregateOutputType = {
    id: number | null
    planName: string | null
    amount: number | null
    currency: string | null
    expiresAt: Date | null
  }

  export type BillingMaxAggregateOutputType = {
    id: number | null
    planName: string | null
    amount: number | null
    currency: string | null
    expiresAt: Date | null
  }

  export type BillingCountAggregateOutputType = {
    id: number
    planName: number
    amount: number
    currency: number
    expiresAt: number
    _all: number
  }


  export type BillingAvgAggregateInputType = {
    id?: true
    amount?: true
  }

  export type BillingSumAggregateInputType = {
    id?: true
    amount?: true
  }

  export type BillingMinAggregateInputType = {
    id?: true
    planName?: true
    amount?: true
    currency?: true
    expiresAt?: true
  }

  export type BillingMaxAggregateInputType = {
    id?: true
    planName?: true
    amount?: true
    currency?: true
    expiresAt?: true
  }

  export type BillingCountAggregateInputType = {
    id?: true
    planName?: true
    amount?: true
    currency?: true
    expiresAt?: true
    _all?: true
  }

  export type BillingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Billing to aggregate.
     */
    where?: BillingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Billings to fetch.
     */
    orderBy?: BillingOrderByWithRelationInput | BillingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BillingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Billings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Billings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Billings
    **/
    _count?: true | BillingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BillingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BillingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BillingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BillingMaxAggregateInputType
  }

  export type GetBillingAggregateType<T extends BillingAggregateArgs> = {
        [P in keyof T & keyof AggregateBilling]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBilling[P]>
      : GetScalarType<T[P], AggregateBilling[P]>
  }




  export type BillingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BillingWhereInput
    orderBy?: BillingOrderByWithAggregationInput | BillingOrderByWithAggregationInput[]
    by: BillingScalarFieldEnum[] | BillingScalarFieldEnum
    having?: BillingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BillingCountAggregateInputType | true
    _avg?: BillingAvgAggregateInputType
    _sum?: BillingSumAggregateInputType
    _min?: BillingMinAggregateInputType
    _max?: BillingMaxAggregateInputType
  }

  export type BillingGroupByOutputType = {
    id: number
    planName: string
    amount: number
    currency: string
    expiresAt: Date | null
    _count: BillingCountAggregateOutputType | null
    _avg: BillingAvgAggregateOutputType | null
    _sum: BillingSumAggregateOutputType | null
    _min: BillingMinAggregateOutputType | null
    _max: BillingMaxAggregateOutputType | null
  }

  type GetBillingGroupByPayload<T extends BillingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BillingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BillingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BillingGroupByOutputType[P]>
            : GetScalarType<T[P], BillingGroupByOutputType[P]>
        }
      >
    >


  export type BillingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    planName?: boolean
    amount?: boolean
    currency?: boolean
    expiresAt?: boolean
    User?: boolean | Billing$UserArgs<ExtArgs>
  }, ExtArgs["result"]["billing"]>

  export type BillingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    planName?: boolean
    amount?: boolean
    currency?: boolean
    expiresAt?: boolean
  }, ExtArgs["result"]["billing"]>

  export type BillingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    planName?: boolean
    amount?: boolean
    currency?: boolean
    expiresAt?: boolean
  }, ExtArgs["result"]["billing"]>

  export type BillingSelectScalar = {
    id?: boolean
    planName?: boolean
    amount?: boolean
    currency?: boolean
    expiresAt?: boolean
  }

  export type BillingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "planName" | "amount" | "currency" | "expiresAt", ExtArgs["result"]["billing"]>
  export type BillingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | Billing$UserArgs<ExtArgs>
  }
  export type BillingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type BillingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $BillingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Billing"
    objects: {
      User: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      planName: string
      amount: number
      currency: string
      expiresAt: Date | null
    }, ExtArgs["result"]["billing"]>
    composites: {}
  }

  type BillingGetPayload<S extends boolean | null | undefined | BillingDefaultArgs> = $Result.GetResult<Prisma.$BillingPayload, S>

  type BillingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BillingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BillingCountAggregateInputType | true
    }

  export interface BillingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Billing'], meta: { name: 'Billing' } }
    /**
     * Find zero or one Billing that matches the filter.
     * @param {BillingFindUniqueArgs} args - Arguments to find a Billing
     * @example
     * // Get one Billing
     * const billing = await prisma.billing.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BillingFindUniqueArgs>(args: SelectSubset<T, BillingFindUniqueArgs<ExtArgs>>): Prisma__BillingClient<$Result.GetResult<Prisma.$BillingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Billing that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BillingFindUniqueOrThrowArgs} args - Arguments to find a Billing
     * @example
     * // Get one Billing
     * const billing = await prisma.billing.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BillingFindUniqueOrThrowArgs>(args: SelectSubset<T, BillingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BillingClient<$Result.GetResult<Prisma.$BillingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Billing that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillingFindFirstArgs} args - Arguments to find a Billing
     * @example
     * // Get one Billing
     * const billing = await prisma.billing.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BillingFindFirstArgs>(args?: SelectSubset<T, BillingFindFirstArgs<ExtArgs>>): Prisma__BillingClient<$Result.GetResult<Prisma.$BillingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Billing that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillingFindFirstOrThrowArgs} args - Arguments to find a Billing
     * @example
     * // Get one Billing
     * const billing = await prisma.billing.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BillingFindFirstOrThrowArgs>(args?: SelectSubset<T, BillingFindFirstOrThrowArgs<ExtArgs>>): Prisma__BillingClient<$Result.GetResult<Prisma.$BillingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Billings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Billings
     * const billings = await prisma.billing.findMany()
     * 
     * // Get first 10 Billings
     * const billings = await prisma.billing.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const billingWithIdOnly = await prisma.billing.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BillingFindManyArgs>(args?: SelectSubset<T, BillingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BillingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Billing.
     * @param {BillingCreateArgs} args - Arguments to create a Billing.
     * @example
     * // Create one Billing
     * const Billing = await prisma.billing.create({
     *   data: {
     *     // ... data to create a Billing
     *   }
     * })
     * 
     */
    create<T extends BillingCreateArgs>(args: SelectSubset<T, BillingCreateArgs<ExtArgs>>): Prisma__BillingClient<$Result.GetResult<Prisma.$BillingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Billings.
     * @param {BillingCreateManyArgs} args - Arguments to create many Billings.
     * @example
     * // Create many Billings
     * const billing = await prisma.billing.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BillingCreateManyArgs>(args?: SelectSubset<T, BillingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Billings and returns the data saved in the database.
     * @param {BillingCreateManyAndReturnArgs} args - Arguments to create many Billings.
     * @example
     * // Create many Billings
     * const billing = await prisma.billing.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Billings and only return the `id`
     * const billingWithIdOnly = await prisma.billing.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BillingCreateManyAndReturnArgs>(args?: SelectSubset<T, BillingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BillingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Billing.
     * @param {BillingDeleteArgs} args - Arguments to delete one Billing.
     * @example
     * // Delete one Billing
     * const Billing = await prisma.billing.delete({
     *   where: {
     *     // ... filter to delete one Billing
     *   }
     * })
     * 
     */
    delete<T extends BillingDeleteArgs>(args: SelectSubset<T, BillingDeleteArgs<ExtArgs>>): Prisma__BillingClient<$Result.GetResult<Prisma.$BillingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Billing.
     * @param {BillingUpdateArgs} args - Arguments to update one Billing.
     * @example
     * // Update one Billing
     * const billing = await prisma.billing.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BillingUpdateArgs>(args: SelectSubset<T, BillingUpdateArgs<ExtArgs>>): Prisma__BillingClient<$Result.GetResult<Prisma.$BillingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Billings.
     * @param {BillingDeleteManyArgs} args - Arguments to filter Billings to delete.
     * @example
     * // Delete a few Billings
     * const { count } = await prisma.billing.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BillingDeleteManyArgs>(args?: SelectSubset<T, BillingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Billings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Billings
     * const billing = await prisma.billing.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BillingUpdateManyArgs>(args: SelectSubset<T, BillingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Billings and returns the data updated in the database.
     * @param {BillingUpdateManyAndReturnArgs} args - Arguments to update many Billings.
     * @example
     * // Update many Billings
     * const billing = await prisma.billing.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Billings and only return the `id`
     * const billingWithIdOnly = await prisma.billing.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BillingUpdateManyAndReturnArgs>(args: SelectSubset<T, BillingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BillingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Billing.
     * @param {BillingUpsertArgs} args - Arguments to update or create a Billing.
     * @example
     * // Update or create a Billing
     * const billing = await prisma.billing.upsert({
     *   create: {
     *     // ... data to create a Billing
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Billing we want to update
     *   }
     * })
     */
    upsert<T extends BillingUpsertArgs>(args: SelectSubset<T, BillingUpsertArgs<ExtArgs>>): Prisma__BillingClient<$Result.GetResult<Prisma.$BillingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Billings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillingCountArgs} args - Arguments to filter Billings to count.
     * @example
     * // Count the number of Billings
     * const count = await prisma.billing.count({
     *   where: {
     *     // ... the filter for the Billings we want to count
     *   }
     * })
    **/
    count<T extends BillingCountArgs>(
      args?: Subset<T, BillingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BillingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Billing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BillingAggregateArgs>(args: Subset<T, BillingAggregateArgs>): Prisma.PrismaPromise<GetBillingAggregateType<T>>

    /**
     * Group by Billing.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BillingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BillingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BillingGroupByArgs['orderBy'] }
        : { orderBy?: BillingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BillingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBillingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Billing model
   */
  readonly fields: BillingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Billing.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BillingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    User<T extends Billing$UserArgs<ExtArgs> = {}>(args?: Subset<T, Billing$UserArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Billing model
   */
  interface BillingFieldRefs {
    readonly id: FieldRef<"Billing", 'Int'>
    readonly planName: FieldRef<"Billing", 'String'>
    readonly amount: FieldRef<"Billing", 'Float'>
    readonly currency: FieldRef<"Billing", 'String'>
    readonly expiresAt: FieldRef<"Billing", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Billing findUnique
   */
  export type BillingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Billing
     */
    select?: BillingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Billing
     */
    omit?: BillingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillingInclude<ExtArgs> | null
    /**
     * Filter, which Billing to fetch.
     */
    where: BillingWhereUniqueInput
  }

  /**
   * Billing findUniqueOrThrow
   */
  export type BillingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Billing
     */
    select?: BillingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Billing
     */
    omit?: BillingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillingInclude<ExtArgs> | null
    /**
     * Filter, which Billing to fetch.
     */
    where: BillingWhereUniqueInput
  }

  /**
   * Billing findFirst
   */
  export type BillingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Billing
     */
    select?: BillingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Billing
     */
    omit?: BillingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillingInclude<ExtArgs> | null
    /**
     * Filter, which Billing to fetch.
     */
    where?: BillingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Billings to fetch.
     */
    orderBy?: BillingOrderByWithRelationInput | BillingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Billings.
     */
    cursor?: BillingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Billings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Billings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Billings.
     */
    distinct?: BillingScalarFieldEnum | BillingScalarFieldEnum[]
  }

  /**
   * Billing findFirstOrThrow
   */
  export type BillingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Billing
     */
    select?: BillingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Billing
     */
    omit?: BillingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillingInclude<ExtArgs> | null
    /**
     * Filter, which Billing to fetch.
     */
    where?: BillingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Billings to fetch.
     */
    orderBy?: BillingOrderByWithRelationInput | BillingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Billings.
     */
    cursor?: BillingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Billings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Billings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Billings.
     */
    distinct?: BillingScalarFieldEnum | BillingScalarFieldEnum[]
  }

  /**
   * Billing findMany
   */
  export type BillingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Billing
     */
    select?: BillingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Billing
     */
    omit?: BillingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillingInclude<ExtArgs> | null
    /**
     * Filter, which Billings to fetch.
     */
    where?: BillingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Billings to fetch.
     */
    orderBy?: BillingOrderByWithRelationInput | BillingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Billings.
     */
    cursor?: BillingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Billings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Billings.
     */
    skip?: number
    distinct?: BillingScalarFieldEnum | BillingScalarFieldEnum[]
  }

  /**
   * Billing create
   */
  export type BillingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Billing
     */
    select?: BillingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Billing
     */
    omit?: BillingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillingInclude<ExtArgs> | null
    /**
     * The data needed to create a Billing.
     */
    data: XOR<BillingCreateInput, BillingUncheckedCreateInput>
  }

  /**
   * Billing createMany
   */
  export type BillingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Billings.
     */
    data: BillingCreateManyInput | BillingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Billing createManyAndReturn
   */
  export type BillingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Billing
     */
    select?: BillingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Billing
     */
    omit?: BillingOmit<ExtArgs> | null
    /**
     * The data used to create many Billings.
     */
    data: BillingCreateManyInput | BillingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Billing update
   */
  export type BillingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Billing
     */
    select?: BillingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Billing
     */
    omit?: BillingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillingInclude<ExtArgs> | null
    /**
     * The data needed to update a Billing.
     */
    data: XOR<BillingUpdateInput, BillingUncheckedUpdateInput>
    /**
     * Choose, which Billing to update.
     */
    where: BillingWhereUniqueInput
  }

  /**
   * Billing updateMany
   */
  export type BillingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Billings.
     */
    data: XOR<BillingUpdateManyMutationInput, BillingUncheckedUpdateManyInput>
    /**
     * Filter which Billings to update
     */
    where?: BillingWhereInput
    /**
     * Limit how many Billings to update.
     */
    limit?: number
  }

  /**
   * Billing updateManyAndReturn
   */
  export type BillingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Billing
     */
    select?: BillingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Billing
     */
    omit?: BillingOmit<ExtArgs> | null
    /**
     * The data used to update Billings.
     */
    data: XOR<BillingUpdateManyMutationInput, BillingUncheckedUpdateManyInput>
    /**
     * Filter which Billings to update
     */
    where?: BillingWhereInput
    /**
     * Limit how many Billings to update.
     */
    limit?: number
  }

  /**
   * Billing upsert
   */
  export type BillingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Billing
     */
    select?: BillingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Billing
     */
    omit?: BillingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillingInclude<ExtArgs> | null
    /**
     * The filter to search for the Billing to update in case it exists.
     */
    where: BillingWhereUniqueInput
    /**
     * In case the Billing found by the `where` argument doesn't exist, create a new Billing with this data.
     */
    create: XOR<BillingCreateInput, BillingUncheckedCreateInput>
    /**
     * In case the Billing was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BillingUpdateInput, BillingUncheckedUpdateInput>
  }

  /**
   * Billing delete
   */
  export type BillingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Billing
     */
    select?: BillingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Billing
     */
    omit?: BillingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillingInclude<ExtArgs> | null
    /**
     * Filter which Billing to delete.
     */
    where: BillingWhereUniqueInput
  }

  /**
   * Billing deleteMany
   */
  export type BillingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Billings to delete
     */
    where?: BillingWhereInput
    /**
     * Limit how many Billings to delete.
     */
    limit?: number
  }

  /**
   * Billing.User
   */
  export type Billing$UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Billing without action
   */
  export type BillingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Billing
     */
    select?: BillingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Billing
     */
    omit?: BillingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillingInclude<ExtArgs> | null
  }


  /**
   * Model Payment
   */

  export type AggregatePayment = {
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  export type PaymentAvgAggregateOutputType = {
    id: number | null
    amount: number | null
    userId: number | null
  }

  export type PaymentSumAggregateOutputType = {
    id: number | null
    amount: number | null
    userId: number | null
  }

  export type PaymentMinAggregateOutputType = {
    id: number | null
    amount: number | null
    currency: string | null
    status: string | null
    method: string | null
    reference: string | null
    description: string | null
    paidAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: number | null
  }

  export type PaymentMaxAggregateOutputType = {
    id: number | null
    amount: number | null
    currency: string | null
    status: string | null
    method: string | null
    reference: string | null
    description: string | null
    paidAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: number | null
  }

  export type PaymentCountAggregateOutputType = {
    id: number
    amount: number
    currency: number
    status: number
    method: number
    reference: number
    description: number
    paidAt: number
    createdAt: number
    updatedAt: number
    userId: number
    _all: number
  }


  export type PaymentAvgAggregateInputType = {
    id?: true
    amount?: true
    userId?: true
  }

  export type PaymentSumAggregateInputType = {
    id?: true
    amount?: true
    userId?: true
  }

  export type PaymentMinAggregateInputType = {
    id?: true
    amount?: true
    currency?: true
    status?: true
    method?: true
    reference?: true
    description?: true
    paidAt?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type PaymentMaxAggregateInputType = {
    id?: true
    amount?: true
    currency?: true
    status?: true
    method?: true
    reference?: true
    description?: true
    paidAt?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type PaymentCountAggregateInputType = {
    id?: true
    amount?: true
    currency?: true
    status?: true
    method?: true
    reference?: true
    description?: true
    paidAt?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    _all?: true
  }

  export type PaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payment to aggregate.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payments
    **/
    _count?: true | PaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentMaxAggregateInputType
  }

  export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
        [P in keyof T & keyof AggregatePayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayment[P]>
      : GetScalarType<T[P], AggregatePayment[P]>
  }




  export type PaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithAggregationInput | PaymentOrderByWithAggregationInput[]
    by: PaymentScalarFieldEnum[] | PaymentScalarFieldEnum
    having?: PaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentCountAggregateInputType | true
    _avg?: PaymentAvgAggregateInputType
    _sum?: PaymentSumAggregateInputType
    _min?: PaymentMinAggregateInputType
    _max?: PaymentMaxAggregateInputType
  }

  export type PaymentGroupByOutputType = {
    id: number
    amount: number
    currency: string
    status: string
    method: string | null
    reference: string
    description: string | null
    paidAt: Date | null
    createdAt: Date
    updatedAt: Date
    userId: number
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentGroupByOutputType[P]>
        }
      >
    >


  export type PaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    currency?: boolean
    status?: boolean
    method?: boolean
    reference?: boolean
    description?: boolean
    paidAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    currency?: boolean
    status?: boolean
    method?: boolean
    reference?: boolean
    description?: boolean
    paidAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    currency?: boolean
    status?: boolean
    method?: boolean
    reference?: boolean
    description?: boolean
    paidAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectScalar = {
    id?: boolean
    amount?: boolean
    currency?: boolean
    status?: boolean
    method?: boolean
    reference?: boolean
    description?: boolean
    paidAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
  }

  export type PaymentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "amount" | "currency" | "status" | "method" | "reference" | "description" | "paidAt" | "createdAt" | "updatedAt" | "userId", ExtArgs["result"]["payment"]>
  export type PaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PaymentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PaymentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payment"
    objects: {
      User: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      amount: number
      currency: string
      status: string
      method: string | null
      reference: string
      description: string | null
      paidAt: Date | null
      createdAt: Date
      updatedAt: Date
      userId: number
    }, ExtArgs["result"]["payment"]>
    composites: {}
  }

  type PaymentGetPayload<S extends boolean | null | undefined | PaymentDefaultArgs> = $Result.GetResult<Prisma.$PaymentPayload, S>

  type PaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaymentCountAggregateInputType | true
    }

  export interface PaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payment'], meta: { name: 'Payment' } }
    /**
     * Find zero or one Payment that matches the filter.
     * @param {PaymentFindUniqueArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentFindUniqueArgs>(args: SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Payment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentFindUniqueOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentFindFirstArgs>(args?: SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payments
     * const payments = await prisma.payment.findMany()
     * 
     * // Get first 10 Payments
     * const payments = await prisma.payment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentWithIdOnly = await prisma.payment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentFindManyArgs>(args?: SelectSubset<T, PaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Payment.
     * @param {PaymentCreateArgs} args - Arguments to create a Payment.
     * @example
     * // Create one Payment
     * const Payment = await prisma.payment.create({
     *   data: {
     *     // ... data to create a Payment
     *   }
     * })
     * 
     */
    create<T extends PaymentCreateArgs>(args: SelectSubset<T, PaymentCreateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Payments.
     * @param {PaymentCreateManyArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentCreateManyArgs>(args?: SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Payments and returns the data saved in the database.
     * @param {PaymentCreateManyAndReturnArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Payment.
     * @param {PaymentDeleteArgs} args - Arguments to delete one Payment.
     * @example
     * // Delete one Payment
     * const Payment = await prisma.payment.delete({
     *   where: {
     *     // ... filter to delete one Payment
     *   }
     * })
     * 
     */
    delete<T extends PaymentDeleteArgs>(args: SelectSubset<T, PaymentDeleteArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Payment.
     * @param {PaymentUpdateArgs} args - Arguments to update one Payment.
     * @example
     * // Update one Payment
     * const payment = await prisma.payment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentUpdateArgs>(args: SelectSubset<T, PaymentUpdateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Payments.
     * @param {PaymentDeleteManyArgs} args - Arguments to filter Payments to delete.
     * @example
     * // Delete a few Payments
     * const { count } = await prisma.payment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentDeleteManyArgs>(args?: SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentUpdateManyArgs>(args: SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments and returns the data updated in the database.
     * @param {PaymentUpdateManyAndReturnArgs} args - Arguments to update many Payments.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PaymentUpdateManyAndReturnArgs>(args: SelectSubset<T, PaymentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Payment.
     * @param {PaymentUpsertArgs} args - Arguments to update or create a Payment.
     * @example
     * // Update or create a Payment
     * const payment = await prisma.payment.upsert({
     *   create: {
     *     // ... data to create a Payment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payment we want to update
     *   }
     * })
     */
    upsert<T extends PaymentUpsertArgs>(args: SelectSubset<T, PaymentUpsertArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentCountArgs} args - Arguments to filter Payments to count.
     * @example
     * // Count the number of Payments
     * const count = await prisma.payment.count({
     *   where: {
     *     // ... the filter for the Payments we want to count
     *   }
     * })
    **/
    count<T extends PaymentCountArgs>(
      args?: Subset<T, PaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentAggregateArgs>(args: Subset<T, PaymentAggregateArgs>): Prisma.PrismaPromise<GetPaymentAggregateType<T>>

    /**
     * Group by Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentGroupByArgs['orderBy'] }
        : { orderBy?: PaymentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payment model
   */
  readonly fields: PaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    User<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Payment model
   */
  interface PaymentFieldRefs {
    readonly id: FieldRef<"Payment", 'Int'>
    readonly amount: FieldRef<"Payment", 'Float'>
    readonly currency: FieldRef<"Payment", 'String'>
    readonly status: FieldRef<"Payment", 'String'>
    readonly method: FieldRef<"Payment", 'String'>
    readonly reference: FieldRef<"Payment", 'String'>
    readonly description: FieldRef<"Payment", 'String'>
    readonly paidAt: FieldRef<"Payment", 'DateTime'>
    readonly createdAt: FieldRef<"Payment", 'DateTime'>
    readonly updatedAt: FieldRef<"Payment", 'DateTime'>
    readonly userId: FieldRef<"Payment", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Payment findUnique
   */
  export type PaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findUniqueOrThrow
   */
  export type PaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findFirst
   */
  export type PaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findFirstOrThrow
   */
  export type PaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findMany
   */
  export type PaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment create
   */
  export type PaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to create a Payment.
     */
    data: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
  }

  /**
   * Payment createMany
   */
  export type PaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Payment createManyAndReturn
   */
  export type PaymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment update
   */
  export type PaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to update a Payment.
     */
    data: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
    /**
     * Choose, which Payment to update.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment updateMany
   */
  export type PaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
  }

  /**
   * Payment updateManyAndReturn
   */
  export type PaymentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment upsert
   */
  export type PaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The filter to search for the Payment to update in case it exists.
     */
    where: PaymentWhereUniqueInput
    /**
     * In case the Payment found by the `where` argument doesn't exist, create a new Payment with this data.
     */
    create: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
    /**
     * In case the Payment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
  }

  /**
   * Payment delete
   */
  export type PaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter which Payment to delete.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment deleteMany
   */
  export type PaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payments to delete
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to delete.
     */
    limit?: number
  }

  /**
   * Payment without action
   */
  export type PaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
  }


  /**
   * Model SurveyInterest
   */

  export type AggregateSurveyInterest = {
    _count: SurveyInterestCountAggregateOutputType | null
    _avg: SurveyInterestAvgAggregateOutputType | null
    _sum: SurveyInterestSumAggregateOutputType | null
    _min: SurveyInterestMinAggregateOutputType | null
    _max: SurveyInterestMaxAggregateOutputType | null
  }

  export type SurveyInterestAvgAggregateOutputType = {
    id: number | null
  }

  export type SurveyInterestSumAggregateOutputType = {
    id: number | null
  }

  export type SurveyInterestMinAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type SurveyInterestMaxAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type SurveyInterestCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type SurveyInterestAvgAggregateInputType = {
    id?: true
  }

  export type SurveyInterestSumAggregateInputType = {
    id?: true
  }

  export type SurveyInterestMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type SurveyInterestMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type SurveyInterestCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type SurveyInterestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SurveyInterest to aggregate.
     */
    where?: SurveyInterestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SurveyInterests to fetch.
     */
    orderBy?: SurveyInterestOrderByWithRelationInput | SurveyInterestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SurveyInterestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SurveyInterests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SurveyInterests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SurveyInterests
    **/
    _count?: true | SurveyInterestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SurveyInterestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SurveyInterestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SurveyInterestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SurveyInterestMaxAggregateInputType
  }

  export type GetSurveyInterestAggregateType<T extends SurveyInterestAggregateArgs> = {
        [P in keyof T & keyof AggregateSurveyInterest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSurveyInterest[P]>
      : GetScalarType<T[P], AggregateSurveyInterest[P]>
  }




  export type SurveyInterestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SurveyInterestWhereInput
    orderBy?: SurveyInterestOrderByWithAggregationInput | SurveyInterestOrderByWithAggregationInput[]
    by: SurveyInterestScalarFieldEnum[] | SurveyInterestScalarFieldEnum
    having?: SurveyInterestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SurveyInterestCountAggregateInputType | true
    _avg?: SurveyInterestAvgAggregateInputType
    _sum?: SurveyInterestSumAggregateInputType
    _min?: SurveyInterestMinAggregateInputType
    _max?: SurveyInterestMaxAggregateInputType
  }

  export type SurveyInterestGroupByOutputType = {
    id: number
    name: string
    _count: SurveyInterestCountAggregateOutputType | null
    _avg: SurveyInterestAvgAggregateOutputType | null
    _sum: SurveyInterestSumAggregateOutputType | null
    _min: SurveyInterestMinAggregateOutputType | null
    _max: SurveyInterestMaxAggregateOutputType | null
  }

  type GetSurveyInterestGroupByPayload<T extends SurveyInterestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SurveyInterestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SurveyInterestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SurveyInterestGroupByOutputType[P]>
            : GetScalarType<T[P], SurveyInterestGroupByOutputType[P]>
        }
      >
    >


  export type SurveyInterestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    User?: boolean | SurveyInterest$UserArgs<ExtArgs>
    _count?: boolean | SurveyInterestCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["surveyInterest"]>

  export type SurveyInterestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["surveyInterest"]>

  export type SurveyInterestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["surveyInterest"]>

  export type SurveyInterestSelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type SurveyInterestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name", ExtArgs["result"]["surveyInterest"]>
  export type SurveyInterestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | SurveyInterest$UserArgs<ExtArgs>
    _count?: boolean | SurveyInterestCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SurveyInterestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type SurveyInterestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SurveyInterestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SurveyInterest"
    objects: {
      User: Prisma.$UserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
    }, ExtArgs["result"]["surveyInterest"]>
    composites: {}
  }

  type SurveyInterestGetPayload<S extends boolean | null | undefined | SurveyInterestDefaultArgs> = $Result.GetResult<Prisma.$SurveyInterestPayload, S>

  type SurveyInterestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SurveyInterestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SurveyInterestCountAggregateInputType | true
    }

  export interface SurveyInterestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SurveyInterest'], meta: { name: 'SurveyInterest' } }
    /**
     * Find zero or one SurveyInterest that matches the filter.
     * @param {SurveyInterestFindUniqueArgs} args - Arguments to find a SurveyInterest
     * @example
     * // Get one SurveyInterest
     * const surveyInterest = await prisma.surveyInterest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SurveyInterestFindUniqueArgs>(args: SelectSubset<T, SurveyInterestFindUniqueArgs<ExtArgs>>): Prisma__SurveyInterestClient<$Result.GetResult<Prisma.$SurveyInterestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SurveyInterest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SurveyInterestFindUniqueOrThrowArgs} args - Arguments to find a SurveyInterest
     * @example
     * // Get one SurveyInterest
     * const surveyInterest = await prisma.surveyInterest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SurveyInterestFindUniqueOrThrowArgs>(args: SelectSubset<T, SurveyInterestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SurveyInterestClient<$Result.GetResult<Prisma.$SurveyInterestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SurveyInterest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyInterestFindFirstArgs} args - Arguments to find a SurveyInterest
     * @example
     * // Get one SurveyInterest
     * const surveyInterest = await prisma.surveyInterest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SurveyInterestFindFirstArgs>(args?: SelectSubset<T, SurveyInterestFindFirstArgs<ExtArgs>>): Prisma__SurveyInterestClient<$Result.GetResult<Prisma.$SurveyInterestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SurveyInterest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyInterestFindFirstOrThrowArgs} args - Arguments to find a SurveyInterest
     * @example
     * // Get one SurveyInterest
     * const surveyInterest = await prisma.surveyInterest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SurveyInterestFindFirstOrThrowArgs>(args?: SelectSubset<T, SurveyInterestFindFirstOrThrowArgs<ExtArgs>>): Prisma__SurveyInterestClient<$Result.GetResult<Prisma.$SurveyInterestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SurveyInterests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyInterestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SurveyInterests
     * const surveyInterests = await prisma.surveyInterest.findMany()
     * 
     * // Get first 10 SurveyInterests
     * const surveyInterests = await prisma.surveyInterest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const surveyInterestWithIdOnly = await prisma.surveyInterest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SurveyInterestFindManyArgs>(args?: SelectSubset<T, SurveyInterestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SurveyInterestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SurveyInterest.
     * @param {SurveyInterestCreateArgs} args - Arguments to create a SurveyInterest.
     * @example
     * // Create one SurveyInterest
     * const SurveyInterest = await prisma.surveyInterest.create({
     *   data: {
     *     // ... data to create a SurveyInterest
     *   }
     * })
     * 
     */
    create<T extends SurveyInterestCreateArgs>(args: SelectSubset<T, SurveyInterestCreateArgs<ExtArgs>>): Prisma__SurveyInterestClient<$Result.GetResult<Prisma.$SurveyInterestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SurveyInterests.
     * @param {SurveyInterestCreateManyArgs} args - Arguments to create many SurveyInterests.
     * @example
     * // Create many SurveyInterests
     * const surveyInterest = await prisma.surveyInterest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SurveyInterestCreateManyArgs>(args?: SelectSubset<T, SurveyInterestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SurveyInterests and returns the data saved in the database.
     * @param {SurveyInterestCreateManyAndReturnArgs} args - Arguments to create many SurveyInterests.
     * @example
     * // Create many SurveyInterests
     * const surveyInterest = await prisma.surveyInterest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SurveyInterests and only return the `id`
     * const surveyInterestWithIdOnly = await prisma.surveyInterest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SurveyInterestCreateManyAndReturnArgs>(args?: SelectSubset<T, SurveyInterestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SurveyInterestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SurveyInterest.
     * @param {SurveyInterestDeleteArgs} args - Arguments to delete one SurveyInterest.
     * @example
     * // Delete one SurveyInterest
     * const SurveyInterest = await prisma.surveyInterest.delete({
     *   where: {
     *     // ... filter to delete one SurveyInterest
     *   }
     * })
     * 
     */
    delete<T extends SurveyInterestDeleteArgs>(args: SelectSubset<T, SurveyInterestDeleteArgs<ExtArgs>>): Prisma__SurveyInterestClient<$Result.GetResult<Prisma.$SurveyInterestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SurveyInterest.
     * @param {SurveyInterestUpdateArgs} args - Arguments to update one SurveyInterest.
     * @example
     * // Update one SurveyInterest
     * const surveyInterest = await prisma.surveyInterest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SurveyInterestUpdateArgs>(args: SelectSubset<T, SurveyInterestUpdateArgs<ExtArgs>>): Prisma__SurveyInterestClient<$Result.GetResult<Prisma.$SurveyInterestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SurveyInterests.
     * @param {SurveyInterestDeleteManyArgs} args - Arguments to filter SurveyInterests to delete.
     * @example
     * // Delete a few SurveyInterests
     * const { count } = await prisma.surveyInterest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SurveyInterestDeleteManyArgs>(args?: SelectSubset<T, SurveyInterestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SurveyInterests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyInterestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SurveyInterests
     * const surveyInterest = await prisma.surveyInterest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SurveyInterestUpdateManyArgs>(args: SelectSubset<T, SurveyInterestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SurveyInterests and returns the data updated in the database.
     * @param {SurveyInterestUpdateManyAndReturnArgs} args - Arguments to update many SurveyInterests.
     * @example
     * // Update many SurveyInterests
     * const surveyInterest = await prisma.surveyInterest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SurveyInterests and only return the `id`
     * const surveyInterestWithIdOnly = await prisma.surveyInterest.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SurveyInterestUpdateManyAndReturnArgs>(args: SelectSubset<T, SurveyInterestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SurveyInterestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SurveyInterest.
     * @param {SurveyInterestUpsertArgs} args - Arguments to update or create a SurveyInterest.
     * @example
     * // Update or create a SurveyInterest
     * const surveyInterest = await prisma.surveyInterest.upsert({
     *   create: {
     *     // ... data to create a SurveyInterest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SurveyInterest we want to update
     *   }
     * })
     */
    upsert<T extends SurveyInterestUpsertArgs>(args: SelectSubset<T, SurveyInterestUpsertArgs<ExtArgs>>): Prisma__SurveyInterestClient<$Result.GetResult<Prisma.$SurveyInterestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SurveyInterests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyInterestCountArgs} args - Arguments to filter SurveyInterests to count.
     * @example
     * // Count the number of SurveyInterests
     * const count = await prisma.surveyInterest.count({
     *   where: {
     *     // ... the filter for the SurveyInterests we want to count
     *   }
     * })
    **/
    count<T extends SurveyInterestCountArgs>(
      args?: Subset<T, SurveyInterestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SurveyInterestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SurveyInterest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyInterestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SurveyInterestAggregateArgs>(args: Subset<T, SurveyInterestAggregateArgs>): Prisma.PrismaPromise<GetSurveyInterestAggregateType<T>>

    /**
     * Group by SurveyInterest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SurveyInterestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SurveyInterestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SurveyInterestGroupByArgs['orderBy'] }
        : { orderBy?: SurveyInterestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SurveyInterestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSurveyInterestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SurveyInterest model
   */
  readonly fields: SurveyInterestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SurveyInterest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SurveyInterestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    User<T extends SurveyInterest$UserArgs<ExtArgs> = {}>(args?: Subset<T, SurveyInterest$UserArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SurveyInterest model
   */
  interface SurveyInterestFieldRefs {
    readonly id: FieldRef<"SurveyInterest", 'Int'>
    readonly name: FieldRef<"SurveyInterest", 'String'>
  }
    

  // Custom InputTypes
  /**
   * SurveyInterest findUnique
   */
  export type SurveyInterestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyInterest
     */
    select?: SurveyInterestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyInterest
     */
    omit?: SurveyInterestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyInterestInclude<ExtArgs> | null
    /**
     * Filter, which SurveyInterest to fetch.
     */
    where: SurveyInterestWhereUniqueInput
  }

  /**
   * SurveyInterest findUniqueOrThrow
   */
  export type SurveyInterestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyInterest
     */
    select?: SurveyInterestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyInterest
     */
    omit?: SurveyInterestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyInterestInclude<ExtArgs> | null
    /**
     * Filter, which SurveyInterest to fetch.
     */
    where: SurveyInterestWhereUniqueInput
  }

  /**
   * SurveyInterest findFirst
   */
  export type SurveyInterestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyInterest
     */
    select?: SurveyInterestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyInterest
     */
    omit?: SurveyInterestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyInterestInclude<ExtArgs> | null
    /**
     * Filter, which SurveyInterest to fetch.
     */
    where?: SurveyInterestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SurveyInterests to fetch.
     */
    orderBy?: SurveyInterestOrderByWithRelationInput | SurveyInterestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SurveyInterests.
     */
    cursor?: SurveyInterestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SurveyInterests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SurveyInterests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SurveyInterests.
     */
    distinct?: SurveyInterestScalarFieldEnum | SurveyInterestScalarFieldEnum[]
  }

  /**
   * SurveyInterest findFirstOrThrow
   */
  export type SurveyInterestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyInterest
     */
    select?: SurveyInterestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyInterest
     */
    omit?: SurveyInterestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyInterestInclude<ExtArgs> | null
    /**
     * Filter, which SurveyInterest to fetch.
     */
    where?: SurveyInterestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SurveyInterests to fetch.
     */
    orderBy?: SurveyInterestOrderByWithRelationInput | SurveyInterestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SurveyInterests.
     */
    cursor?: SurveyInterestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SurveyInterests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SurveyInterests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SurveyInterests.
     */
    distinct?: SurveyInterestScalarFieldEnum | SurveyInterestScalarFieldEnum[]
  }

  /**
   * SurveyInterest findMany
   */
  export type SurveyInterestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyInterest
     */
    select?: SurveyInterestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyInterest
     */
    omit?: SurveyInterestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyInterestInclude<ExtArgs> | null
    /**
     * Filter, which SurveyInterests to fetch.
     */
    where?: SurveyInterestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SurveyInterests to fetch.
     */
    orderBy?: SurveyInterestOrderByWithRelationInput | SurveyInterestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SurveyInterests.
     */
    cursor?: SurveyInterestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SurveyInterests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SurveyInterests.
     */
    skip?: number
    distinct?: SurveyInterestScalarFieldEnum | SurveyInterestScalarFieldEnum[]
  }

  /**
   * SurveyInterest create
   */
  export type SurveyInterestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyInterest
     */
    select?: SurveyInterestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyInterest
     */
    omit?: SurveyInterestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyInterestInclude<ExtArgs> | null
    /**
     * The data needed to create a SurveyInterest.
     */
    data: XOR<SurveyInterestCreateInput, SurveyInterestUncheckedCreateInput>
  }

  /**
   * SurveyInterest createMany
   */
  export type SurveyInterestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SurveyInterests.
     */
    data: SurveyInterestCreateManyInput | SurveyInterestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SurveyInterest createManyAndReturn
   */
  export type SurveyInterestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyInterest
     */
    select?: SurveyInterestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyInterest
     */
    omit?: SurveyInterestOmit<ExtArgs> | null
    /**
     * The data used to create many SurveyInterests.
     */
    data: SurveyInterestCreateManyInput | SurveyInterestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SurveyInterest update
   */
  export type SurveyInterestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyInterest
     */
    select?: SurveyInterestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyInterest
     */
    omit?: SurveyInterestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyInterestInclude<ExtArgs> | null
    /**
     * The data needed to update a SurveyInterest.
     */
    data: XOR<SurveyInterestUpdateInput, SurveyInterestUncheckedUpdateInput>
    /**
     * Choose, which SurveyInterest to update.
     */
    where: SurveyInterestWhereUniqueInput
  }

  /**
   * SurveyInterest updateMany
   */
  export type SurveyInterestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SurveyInterests.
     */
    data: XOR<SurveyInterestUpdateManyMutationInput, SurveyInterestUncheckedUpdateManyInput>
    /**
     * Filter which SurveyInterests to update
     */
    where?: SurveyInterestWhereInput
    /**
     * Limit how many SurveyInterests to update.
     */
    limit?: number
  }

  /**
   * SurveyInterest updateManyAndReturn
   */
  export type SurveyInterestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyInterest
     */
    select?: SurveyInterestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyInterest
     */
    omit?: SurveyInterestOmit<ExtArgs> | null
    /**
     * The data used to update SurveyInterests.
     */
    data: XOR<SurveyInterestUpdateManyMutationInput, SurveyInterestUncheckedUpdateManyInput>
    /**
     * Filter which SurveyInterests to update
     */
    where?: SurveyInterestWhereInput
    /**
     * Limit how many SurveyInterests to update.
     */
    limit?: number
  }

  /**
   * SurveyInterest upsert
   */
  export type SurveyInterestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyInterest
     */
    select?: SurveyInterestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyInterest
     */
    omit?: SurveyInterestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyInterestInclude<ExtArgs> | null
    /**
     * The filter to search for the SurveyInterest to update in case it exists.
     */
    where: SurveyInterestWhereUniqueInput
    /**
     * In case the SurveyInterest found by the `where` argument doesn't exist, create a new SurveyInterest with this data.
     */
    create: XOR<SurveyInterestCreateInput, SurveyInterestUncheckedCreateInput>
    /**
     * In case the SurveyInterest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SurveyInterestUpdateInput, SurveyInterestUncheckedUpdateInput>
  }

  /**
   * SurveyInterest delete
   */
  export type SurveyInterestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyInterest
     */
    select?: SurveyInterestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyInterest
     */
    omit?: SurveyInterestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyInterestInclude<ExtArgs> | null
    /**
     * Filter which SurveyInterest to delete.
     */
    where: SurveyInterestWhereUniqueInput
  }

  /**
   * SurveyInterest deleteMany
   */
  export type SurveyInterestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SurveyInterests to delete
     */
    where?: SurveyInterestWhereInput
    /**
     * Limit how many SurveyInterests to delete.
     */
    limit?: number
  }

  /**
   * SurveyInterest.User
   */
  export type SurveyInterest$UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * SurveyInterest without action
   */
  export type SurveyInterestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyInterest
     */
    select?: SurveyInterestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyInterest
     */
    omit?: SurveyInterestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyInterestInclude<ExtArgs> | null
  }


  /**
   * Model Ticket
   */

  export type AggregateTicket = {
    _count: TicketCountAggregateOutputType | null
    _avg: TicketAvgAggregateOutputType | null
    _sum: TicketSumAggregateOutputType | null
    _min: TicketMinAggregateOutputType | null
    _max: TicketMaxAggregateOutputType | null
  }

  export type TicketAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type TicketSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type TicketMinAggregateOutputType = {
    id: number | null
    subject: string | null
    description: string | null
    status: string | null
    priority: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: number | null
  }

  export type TicketMaxAggregateOutputType = {
    id: number | null
    subject: string | null
    description: string | null
    status: string | null
    priority: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: number | null
  }

  export type TicketCountAggregateOutputType = {
    id: number
    subject: number
    description: number
    status: number
    priority: number
    createdAt: number
    updatedAt: number
    userId: number
    _all: number
  }


  export type TicketAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type TicketSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type TicketMinAggregateInputType = {
    id?: true
    subject?: true
    description?: true
    status?: true
    priority?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type TicketMaxAggregateInputType = {
    id?: true
    subject?: true
    description?: true
    status?: true
    priority?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type TicketCountAggregateInputType = {
    id?: true
    subject?: true
    description?: true
    status?: true
    priority?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    _all?: true
  }

  export type TicketAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ticket to aggregate.
     */
    where?: TicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tickets to fetch.
     */
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tickets
    **/
    _count?: true | TicketCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TicketAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TicketSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TicketMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TicketMaxAggregateInputType
  }

  export type GetTicketAggregateType<T extends TicketAggregateArgs> = {
        [P in keyof T & keyof AggregateTicket]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTicket[P]>
      : GetScalarType<T[P], AggregateTicket[P]>
  }




  export type TicketGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketWhereInput
    orderBy?: TicketOrderByWithAggregationInput | TicketOrderByWithAggregationInput[]
    by: TicketScalarFieldEnum[] | TicketScalarFieldEnum
    having?: TicketScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TicketCountAggregateInputType | true
    _avg?: TicketAvgAggregateInputType
    _sum?: TicketSumAggregateInputType
    _min?: TicketMinAggregateInputType
    _max?: TicketMaxAggregateInputType
  }

  export type TicketGroupByOutputType = {
    id: number
    subject: string
    description: string | null
    status: string
    priority: string | null
    createdAt: Date
    updatedAt: Date
    userId: number
    _count: TicketCountAggregateOutputType | null
    _avg: TicketAvgAggregateOutputType | null
    _sum: TicketSumAggregateOutputType | null
    _min: TicketMinAggregateOutputType | null
    _max: TicketMaxAggregateOutputType | null
  }

  type GetTicketGroupByPayload<T extends TicketGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TicketGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TicketGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TicketGroupByOutputType[P]>
            : GetScalarType<T[P], TicketGroupByOutputType[P]>
        }
      >
    >


  export type TicketSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    subject?: boolean
    description?: boolean
    status?: boolean
    priority?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ticket"]>

  export type TicketSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    subject?: boolean
    description?: boolean
    status?: boolean
    priority?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ticket"]>

  export type TicketSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    subject?: boolean
    description?: boolean
    status?: boolean
    priority?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ticket"]>

  export type TicketSelectScalar = {
    id?: boolean
    subject?: boolean
    description?: boolean
    status?: boolean
    priority?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
  }

  export type TicketOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "subject" | "description" | "status" | "priority" | "createdAt" | "updatedAt" | "userId", ExtArgs["result"]["ticket"]>
  export type TicketInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TicketIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TicketIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TicketPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Ticket"
    objects: {
      User: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      subject: string
      description: string | null
      status: string
      priority: string | null
      createdAt: Date
      updatedAt: Date
      userId: number
    }, ExtArgs["result"]["ticket"]>
    composites: {}
  }

  type TicketGetPayload<S extends boolean | null | undefined | TicketDefaultArgs> = $Result.GetResult<Prisma.$TicketPayload, S>

  type TicketCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TicketFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TicketCountAggregateInputType | true
    }

  export interface TicketDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Ticket'], meta: { name: 'Ticket' } }
    /**
     * Find zero or one Ticket that matches the filter.
     * @param {TicketFindUniqueArgs} args - Arguments to find a Ticket
     * @example
     * // Get one Ticket
     * const ticket = await prisma.ticket.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TicketFindUniqueArgs>(args: SelectSubset<T, TicketFindUniqueArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Ticket that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TicketFindUniqueOrThrowArgs} args - Arguments to find a Ticket
     * @example
     * // Get one Ticket
     * const ticket = await prisma.ticket.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TicketFindUniqueOrThrowArgs>(args: SelectSubset<T, TicketFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ticket that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketFindFirstArgs} args - Arguments to find a Ticket
     * @example
     * // Get one Ticket
     * const ticket = await prisma.ticket.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TicketFindFirstArgs>(args?: SelectSubset<T, TicketFindFirstArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ticket that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketFindFirstOrThrowArgs} args - Arguments to find a Ticket
     * @example
     * // Get one Ticket
     * const ticket = await prisma.ticket.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TicketFindFirstOrThrowArgs>(args?: SelectSubset<T, TicketFindFirstOrThrowArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tickets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tickets
     * const tickets = await prisma.ticket.findMany()
     * 
     * // Get first 10 Tickets
     * const tickets = await prisma.ticket.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ticketWithIdOnly = await prisma.ticket.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TicketFindManyArgs>(args?: SelectSubset<T, TicketFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Ticket.
     * @param {TicketCreateArgs} args - Arguments to create a Ticket.
     * @example
     * // Create one Ticket
     * const Ticket = await prisma.ticket.create({
     *   data: {
     *     // ... data to create a Ticket
     *   }
     * })
     * 
     */
    create<T extends TicketCreateArgs>(args: SelectSubset<T, TicketCreateArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tickets.
     * @param {TicketCreateManyArgs} args - Arguments to create many Tickets.
     * @example
     * // Create many Tickets
     * const ticket = await prisma.ticket.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TicketCreateManyArgs>(args?: SelectSubset<T, TicketCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tickets and returns the data saved in the database.
     * @param {TicketCreateManyAndReturnArgs} args - Arguments to create many Tickets.
     * @example
     * // Create many Tickets
     * const ticket = await prisma.ticket.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tickets and only return the `id`
     * const ticketWithIdOnly = await prisma.ticket.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TicketCreateManyAndReturnArgs>(args?: SelectSubset<T, TicketCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Ticket.
     * @param {TicketDeleteArgs} args - Arguments to delete one Ticket.
     * @example
     * // Delete one Ticket
     * const Ticket = await prisma.ticket.delete({
     *   where: {
     *     // ... filter to delete one Ticket
     *   }
     * })
     * 
     */
    delete<T extends TicketDeleteArgs>(args: SelectSubset<T, TicketDeleteArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Ticket.
     * @param {TicketUpdateArgs} args - Arguments to update one Ticket.
     * @example
     * // Update one Ticket
     * const ticket = await prisma.ticket.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TicketUpdateArgs>(args: SelectSubset<T, TicketUpdateArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tickets.
     * @param {TicketDeleteManyArgs} args - Arguments to filter Tickets to delete.
     * @example
     * // Delete a few Tickets
     * const { count } = await prisma.ticket.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TicketDeleteManyArgs>(args?: SelectSubset<T, TicketDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tickets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tickets
     * const ticket = await prisma.ticket.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TicketUpdateManyArgs>(args: SelectSubset<T, TicketUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tickets and returns the data updated in the database.
     * @param {TicketUpdateManyAndReturnArgs} args - Arguments to update many Tickets.
     * @example
     * // Update many Tickets
     * const ticket = await prisma.ticket.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tickets and only return the `id`
     * const ticketWithIdOnly = await prisma.ticket.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TicketUpdateManyAndReturnArgs>(args: SelectSubset<T, TicketUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Ticket.
     * @param {TicketUpsertArgs} args - Arguments to update or create a Ticket.
     * @example
     * // Update or create a Ticket
     * const ticket = await prisma.ticket.upsert({
     *   create: {
     *     // ... data to create a Ticket
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Ticket we want to update
     *   }
     * })
     */
    upsert<T extends TicketUpsertArgs>(args: SelectSubset<T, TicketUpsertArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tickets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketCountArgs} args - Arguments to filter Tickets to count.
     * @example
     * // Count the number of Tickets
     * const count = await prisma.ticket.count({
     *   where: {
     *     // ... the filter for the Tickets we want to count
     *   }
     * })
    **/
    count<T extends TicketCountArgs>(
      args?: Subset<T, TicketCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TicketCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Ticket.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TicketAggregateArgs>(args: Subset<T, TicketAggregateArgs>): Prisma.PrismaPromise<GetTicketAggregateType<T>>

    /**
     * Group by Ticket.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TicketGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TicketGroupByArgs['orderBy'] }
        : { orderBy?: TicketGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TicketGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTicketGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Ticket model
   */
  readonly fields: TicketFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Ticket.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TicketClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    User<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Ticket model
   */
  interface TicketFieldRefs {
    readonly id: FieldRef<"Ticket", 'Int'>
    readonly subject: FieldRef<"Ticket", 'String'>
    readonly description: FieldRef<"Ticket", 'String'>
    readonly status: FieldRef<"Ticket", 'String'>
    readonly priority: FieldRef<"Ticket", 'String'>
    readonly createdAt: FieldRef<"Ticket", 'DateTime'>
    readonly updatedAt: FieldRef<"Ticket", 'DateTime'>
    readonly userId: FieldRef<"Ticket", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Ticket findUnique
   */
  export type TicketFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter, which Ticket to fetch.
     */
    where: TicketWhereUniqueInput
  }

  /**
   * Ticket findUniqueOrThrow
   */
  export type TicketFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter, which Ticket to fetch.
     */
    where: TicketWhereUniqueInput
  }

  /**
   * Ticket findFirst
   */
  export type TicketFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter, which Ticket to fetch.
     */
    where?: TicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tickets to fetch.
     */
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tickets.
     */
    cursor?: TicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tickets.
     */
    distinct?: TicketScalarFieldEnum | TicketScalarFieldEnum[]
  }

  /**
   * Ticket findFirstOrThrow
   */
  export type TicketFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter, which Ticket to fetch.
     */
    where?: TicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tickets to fetch.
     */
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tickets.
     */
    cursor?: TicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tickets.
     */
    distinct?: TicketScalarFieldEnum | TicketScalarFieldEnum[]
  }

  /**
   * Ticket findMany
   */
  export type TicketFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter, which Tickets to fetch.
     */
    where?: TicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tickets to fetch.
     */
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tickets.
     */
    cursor?: TicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tickets.
     */
    skip?: number
    distinct?: TicketScalarFieldEnum | TicketScalarFieldEnum[]
  }

  /**
   * Ticket create
   */
  export type TicketCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * The data needed to create a Ticket.
     */
    data: XOR<TicketCreateInput, TicketUncheckedCreateInput>
  }

  /**
   * Ticket createMany
   */
  export type TicketCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tickets.
     */
    data: TicketCreateManyInput | TicketCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Ticket createManyAndReturn
   */
  export type TicketCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * The data used to create many Tickets.
     */
    data: TicketCreateManyInput | TicketCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Ticket update
   */
  export type TicketUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * The data needed to update a Ticket.
     */
    data: XOR<TicketUpdateInput, TicketUncheckedUpdateInput>
    /**
     * Choose, which Ticket to update.
     */
    where: TicketWhereUniqueInput
  }

  /**
   * Ticket updateMany
   */
  export type TicketUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tickets.
     */
    data: XOR<TicketUpdateManyMutationInput, TicketUncheckedUpdateManyInput>
    /**
     * Filter which Tickets to update
     */
    where?: TicketWhereInput
    /**
     * Limit how many Tickets to update.
     */
    limit?: number
  }

  /**
   * Ticket updateManyAndReturn
   */
  export type TicketUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * The data used to update Tickets.
     */
    data: XOR<TicketUpdateManyMutationInput, TicketUncheckedUpdateManyInput>
    /**
     * Filter which Tickets to update
     */
    where?: TicketWhereInput
    /**
     * Limit how many Tickets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Ticket upsert
   */
  export type TicketUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * The filter to search for the Ticket to update in case it exists.
     */
    where: TicketWhereUniqueInput
    /**
     * In case the Ticket found by the `where` argument doesn't exist, create a new Ticket with this data.
     */
    create: XOR<TicketCreateInput, TicketUncheckedCreateInput>
    /**
     * In case the Ticket was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TicketUpdateInput, TicketUncheckedUpdateInput>
  }

  /**
   * Ticket delete
   */
  export type TicketDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter which Ticket to delete.
     */
    where: TicketWhereUniqueInput
  }

  /**
   * Ticket deleteMany
   */
  export type TicketDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tickets to delete
     */
    where?: TicketWhereInput
    /**
     * Limit how many Tickets to delete.
     */
    limit?: number
  }

  /**
   * Ticket without action
   */
  export type TicketDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
    billingId: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
    billingId: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    emailVerifiedAt: string | null
    password: string | null
    username: string | null
    phoneNumber: string | null
    alternatePhoneNumber: string | null
    country: string | null
    state: string | null
    employmentStatus: string | null
    mostPreferredCommsChannel: string | null
    howYouGotToKnowUs: string | null
    profilePhoto: string | null
    dob: Date | null
    gender: string | null
    location: string | null
    occupation: string | null
    role: string | null
    isActive: string | null
    twoFactorAuth: string | null
    lastLogin: string | null
    ipAddress: string | null
    browserAgent: string | null
    subscriptionPlan: string | null
    subscriptionPlanExpireAt: string | null
    billingId: number | null
    bio: string | null
    referralCode: string | null
    softDelete: boolean | null
    firstName: string | null
    lastName: string | null
    countryCode: string | null
    stateCode: string | null
    subDivisionCode: string | null
    subDivisionName: string | null
    address: string | null
    hasOnboarded: boolean | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    emailVerifiedAt: string | null
    password: string | null
    username: string | null
    phoneNumber: string | null
    alternatePhoneNumber: string | null
    country: string | null
    state: string | null
    employmentStatus: string | null
    mostPreferredCommsChannel: string | null
    howYouGotToKnowUs: string | null
    profilePhoto: string | null
    dob: Date | null
    gender: string | null
    location: string | null
    occupation: string | null
    role: string | null
    isActive: string | null
    twoFactorAuth: string | null
    lastLogin: string | null
    ipAddress: string | null
    browserAgent: string | null
    subscriptionPlan: string | null
    subscriptionPlanExpireAt: string | null
    billingId: number | null
    bio: string | null
    referralCode: string | null
    softDelete: boolean | null
    firstName: string | null
    lastName: string | null
    countryCode: string | null
    stateCode: string | null
    subDivisionCode: string | null
    subDivisionName: string | null
    address: string | null
    hasOnboarded: boolean | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    emailVerifiedAt: number
    password: number
    username: number
    phoneNumber: number
    alternatePhoneNumber: number
    country: number
    state: number
    employmentStatus: number
    mostPreferredCommsChannel: number
    howYouGotToKnowUs: number
    profilePhoto: number
    dob: number
    gender: number
    location: number
    occupation: number
    role: number
    isActive: number
    twoFactorAuth: number
    lastLogin: number
    ipAddress: number
    browserAgent: number
    subscriptionPlan: number
    subscriptionPlanExpireAt: number
    billingId: number
    bio: number
    referralCode: number
    softDelete: number
    firstName: number
    lastName: number
    countryCode: number
    stateCode: number
    subDivisionCode: number
    subDivisionName: number
    address: number
    hasOnboarded: number
    createdAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
    billingId?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
    billingId?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    emailVerifiedAt?: true
    password?: true
    username?: true
    phoneNumber?: true
    alternatePhoneNumber?: true
    country?: true
    state?: true
    employmentStatus?: true
    mostPreferredCommsChannel?: true
    howYouGotToKnowUs?: true
    profilePhoto?: true
    dob?: true
    gender?: true
    location?: true
    occupation?: true
    role?: true
    isActive?: true
    twoFactorAuth?: true
    lastLogin?: true
    ipAddress?: true
    browserAgent?: true
    subscriptionPlan?: true
    subscriptionPlanExpireAt?: true
    billingId?: true
    bio?: true
    referralCode?: true
    softDelete?: true
    firstName?: true
    lastName?: true
    countryCode?: true
    stateCode?: true
    subDivisionCode?: true
    subDivisionName?: true
    address?: true
    hasOnboarded?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    emailVerifiedAt?: true
    password?: true
    username?: true
    phoneNumber?: true
    alternatePhoneNumber?: true
    country?: true
    state?: true
    employmentStatus?: true
    mostPreferredCommsChannel?: true
    howYouGotToKnowUs?: true
    profilePhoto?: true
    dob?: true
    gender?: true
    location?: true
    occupation?: true
    role?: true
    isActive?: true
    twoFactorAuth?: true
    lastLogin?: true
    ipAddress?: true
    browserAgent?: true
    subscriptionPlan?: true
    subscriptionPlanExpireAt?: true
    billingId?: true
    bio?: true
    referralCode?: true
    softDelete?: true
    firstName?: true
    lastName?: true
    countryCode?: true
    stateCode?: true
    subDivisionCode?: true
    subDivisionName?: true
    address?: true
    hasOnboarded?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    emailVerifiedAt?: true
    password?: true
    username?: true
    phoneNumber?: true
    alternatePhoneNumber?: true
    country?: true
    state?: true
    employmentStatus?: true
    mostPreferredCommsChannel?: true
    howYouGotToKnowUs?: true
    profilePhoto?: true
    dob?: true
    gender?: true
    location?: true
    occupation?: true
    role?: true
    isActive?: true
    twoFactorAuth?: true
    lastLogin?: true
    ipAddress?: true
    browserAgent?: true
    subscriptionPlan?: true
    subscriptionPlanExpireAt?: true
    billingId?: true
    bio?: true
    referralCode?: true
    softDelete?: true
    firstName?: true
    lastName?: true
    countryCode?: true
    stateCode?: true
    subDivisionCode?: true
    subDivisionName?: true
    address?: true
    hasOnboarded?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    emailVerifiedAt: string | null
    password: string
    username: string | null
    phoneNumber: string | null
    alternatePhoneNumber: string | null
    country: string | null
    state: string | null
    employmentStatus: string | null
    mostPreferredCommsChannel: string | null
    howYouGotToKnowUs: string | null
    profilePhoto: string | null
    dob: Date | null
    gender: string | null
    location: string | null
    occupation: string | null
    role: string | null
    isActive: string | null
    twoFactorAuth: string | null
    lastLogin: string | null
    ipAddress: string | null
    browserAgent: string | null
    subscriptionPlan: string | null
    subscriptionPlanExpireAt: string | null
    billingId: number | null
    bio: string | null
    referralCode: string | null
    softDelete: boolean | null
    firstName: string | null
    lastName: string | null
    countryCode: string | null
    stateCode: string | null
    subDivisionCode: string | null
    subDivisionName: string | null
    address: string | null
    hasOnboarded: boolean | null
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    emailVerifiedAt?: boolean
    password?: boolean
    username?: boolean
    phoneNumber?: boolean
    alternatePhoneNumber?: boolean
    country?: boolean
    state?: boolean
    employmentStatus?: boolean
    mostPreferredCommsChannel?: boolean
    howYouGotToKnowUs?: boolean
    profilePhoto?: boolean
    dob?: boolean
    gender?: boolean
    location?: boolean
    occupation?: boolean
    role?: boolean
    isActive?: boolean
    twoFactorAuth?: boolean
    lastLogin?: boolean
    ipAddress?: boolean
    browserAgent?: boolean
    subscriptionPlan?: boolean
    subscriptionPlanExpireAt?: boolean
    billingId?: boolean
    bio?: boolean
    referralCode?: boolean
    softDelete?: boolean
    firstName?: boolean
    lastName?: boolean
    countryCode?: boolean
    stateCode?: boolean
    subDivisionCode?: boolean
    subDivisionName?: boolean
    address?: boolean
    hasOnboarded?: boolean
    createdAt?: boolean
    Payment?: boolean | User$PaymentArgs<ExtArgs>
    Ticket?: boolean | User$TicketArgs<ExtArgs>
    Billing?: boolean | User$BillingArgs<ExtArgs>
    SurveyInterest?: boolean | User$SurveyInterestArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    emailVerifiedAt?: boolean
    password?: boolean
    username?: boolean
    phoneNumber?: boolean
    alternatePhoneNumber?: boolean
    country?: boolean
    state?: boolean
    employmentStatus?: boolean
    mostPreferredCommsChannel?: boolean
    howYouGotToKnowUs?: boolean
    profilePhoto?: boolean
    dob?: boolean
    gender?: boolean
    location?: boolean
    occupation?: boolean
    role?: boolean
    isActive?: boolean
    twoFactorAuth?: boolean
    lastLogin?: boolean
    ipAddress?: boolean
    browserAgent?: boolean
    subscriptionPlan?: boolean
    subscriptionPlanExpireAt?: boolean
    billingId?: boolean
    bio?: boolean
    referralCode?: boolean
    softDelete?: boolean
    firstName?: boolean
    lastName?: boolean
    countryCode?: boolean
    stateCode?: boolean
    subDivisionCode?: boolean
    subDivisionName?: boolean
    address?: boolean
    hasOnboarded?: boolean
    createdAt?: boolean
    Billing?: boolean | User$BillingArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    emailVerifiedAt?: boolean
    password?: boolean
    username?: boolean
    phoneNumber?: boolean
    alternatePhoneNumber?: boolean
    country?: boolean
    state?: boolean
    employmentStatus?: boolean
    mostPreferredCommsChannel?: boolean
    howYouGotToKnowUs?: boolean
    profilePhoto?: boolean
    dob?: boolean
    gender?: boolean
    location?: boolean
    occupation?: boolean
    role?: boolean
    isActive?: boolean
    twoFactorAuth?: boolean
    lastLogin?: boolean
    ipAddress?: boolean
    browserAgent?: boolean
    subscriptionPlan?: boolean
    subscriptionPlanExpireAt?: boolean
    billingId?: boolean
    bio?: boolean
    referralCode?: boolean
    softDelete?: boolean
    firstName?: boolean
    lastName?: boolean
    countryCode?: boolean
    stateCode?: boolean
    subDivisionCode?: boolean
    subDivisionName?: boolean
    address?: boolean
    hasOnboarded?: boolean
    createdAt?: boolean
    Billing?: boolean | User$BillingArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    emailVerifiedAt?: boolean
    password?: boolean
    username?: boolean
    phoneNumber?: boolean
    alternatePhoneNumber?: boolean
    country?: boolean
    state?: boolean
    employmentStatus?: boolean
    mostPreferredCommsChannel?: boolean
    howYouGotToKnowUs?: boolean
    profilePhoto?: boolean
    dob?: boolean
    gender?: boolean
    location?: boolean
    occupation?: boolean
    role?: boolean
    isActive?: boolean
    twoFactorAuth?: boolean
    lastLogin?: boolean
    ipAddress?: boolean
    browserAgent?: boolean
    subscriptionPlan?: boolean
    subscriptionPlanExpireAt?: boolean
    billingId?: boolean
    bio?: boolean
    referralCode?: boolean
    softDelete?: boolean
    firstName?: boolean
    lastName?: boolean
    countryCode?: boolean
    stateCode?: boolean
    subDivisionCode?: boolean
    subDivisionName?: boolean
    address?: boolean
    hasOnboarded?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "emailVerifiedAt" | "password" | "username" | "phoneNumber" | "alternatePhoneNumber" | "country" | "state" | "employmentStatus" | "mostPreferredCommsChannel" | "howYouGotToKnowUs" | "profilePhoto" | "dob" | "gender" | "location" | "occupation" | "role" | "isActive" | "twoFactorAuth" | "lastLogin" | "ipAddress" | "browserAgent" | "subscriptionPlan" | "subscriptionPlanExpireAt" | "billingId" | "bio" | "referralCode" | "softDelete" | "firstName" | "lastName" | "countryCode" | "stateCode" | "subDivisionCode" | "subDivisionName" | "address" | "hasOnboarded" | "createdAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Payment?: boolean | User$PaymentArgs<ExtArgs>
    Ticket?: boolean | User$TicketArgs<ExtArgs>
    Billing?: boolean | User$BillingArgs<ExtArgs>
    SurveyInterest?: boolean | User$SurveyInterestArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Billing?: boolean | User$BillingArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Billing?: boolean | User$BillingArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      Payment: Prisma.$PaymentPayload<ExtArgs>[]
      Ticket: Prisma.$TicketPayload<ExtArgs>[]
      Billing: Prisma.$BillingPayload<ExtArgs> | null
      SurveyInterest: Prisma.$SurveyInterestPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      emailVerifiedAt: string | null
      password: string
      username: string | null
      phoneNumber: string | null
      alternatePhoneNumber: string | null
      country: string | null
      state: string | null
      employmentStatus: string | null
      mostPreferredCommsChannel: string | null
      howYouGotToKnowUs: string | null
      profilePhoto: string | null
      dob: Date | null
      gender: string | null
      location: string | null
      occupation: string | null
      role: string | null
      isActive: string | null
      twoFactorAuth: string | null
      lastLogin: string | null
      ipAddress: string | null
      browserAgent: string | null
      subscriptionPlan: string | null
      subscriptionPlanExpireAt: string | null
      billingId: number | null
      bio: string | null
      referralCode: string | null
      softDelete: boolean | null
      firstName: string | null
      lastName: string | null
      countryCode: string | null
      stateCode: string | null
      subDivisionCode: string | null
      subDivisionName: string | null
      address: string | null
      hasOnboarded: boolean | null
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Payment<T extends User$PaymentArgs<ExtArgs> = {}>(args?: Subset<T, User$PaymentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Ticket<T extends User$TicketArgs<ExtArgs> = {}>(args?: Subset<T, User$TicketArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Billing<T extends User$BillingArgs<ExtArgs> = {}>(args?: Subset<T, User$BillingArgs<ExtArgs>>): Prisma__BillingClient<$Result.GetResult<Prisma.$BillingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    SurveyInterest<T extends User$SurveyInterestArgs<ExtArgs> = {}>(args?: Subset<T, User$SurveyInterestArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SurveyInterestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly emailVerifiedAt: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly phoneNumber: FieldRef<"User", 'String'>
    readonly alternatePhoneNumber: FieldRef<"User", 'String'>
    readonly country: FieldRef<"User", 'String'>
    readonly state: FieldRef<"User", 'String'>
    readonly employmentStatus: FieldRef<"User", 'String'>
    readonly mostPreferredCommsChannel: FieldRef<"User", 'String'>
    readonly howYouGotToKnowUs: FieldRef<"User", 'String'>
    readonly profilePhoto: FieldRef<"User", 'String'>
    readonly dob: FieldRef<"User", 'DateTime'>
    readonly gender: FieldRef<"User", 'String'>
    readonly location: FieldRef<"User", 'String'>
    readonly occupation: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly isActive: FieldRef<"User", 'String'>
    readonly twoFactorAuth: FieldRef<"User", 'String'>
    readonly lastLogin: FieldRef<"User", 'String'>
    readonly ipAddress: FieldRef<"User", 'String'>
    readonly browserAgent: FieldRef<"User", 'String'>
    readonly subscriptionPlan: FieldRef<"User", 'String'>
    readonly subscriptionPlanExpireAt: FieldRef<"User", 'String'>
    readonly billingId: FieldRef<"User", 'Int'>
    readonly bio: FieldRef<"User", 'String'>
    readonly referralCode: FieldRef<"User", 'String'>
    readonly softDelete: FieldRef<"User", 'Boolean'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly countryCode: FieldRef<"User", 'String'>
    readonly stateCode: FieldRef<"User", 'String'>
    readonly subDivisionCode: FieldRef<"User", 'String'>
    readonly subDivisionName: FieldRef<"User", 'String'>
    readonly address: FieldRef<"User", 'String'>
    readonly hasOnboarded: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.Payment
   */
  export type User$PaymentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    cursor?: PaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * User.Ticket
   */
  export type User$TicketArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    where?: TicketWhereInput
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    cursor?: TicketWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TicketScalarFieldEnum | TicketScalarFieldEnum[]
  }

  /**
   * User.Billing
   */
  export type User$BillingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Billing
     */
    select?: BillingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Billing
     */
    omit?: BillingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BillingInclude<ExtArgs> | null
    where?: BillingWhereInput
  }

  /**
   * User.SurveyInterest
   */
  export type User$SurveyInterestArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SurveyInterest
     */
    select?: SurveyInterestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SurveyInterest
     */
    omit?: SurveyInterestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SurveyInterestInclude<ExtArgs> | null
    where?: SurveyInterestWhereInput
    orderBy?: SurveyInterestOrderByWithRelationInput | SurveyInterestOrderByWithRelationInput[]
    cursor?: SurveyInterestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SurveyInterestScalarFieldEnum | SurveyInterestScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const BillingScalarFieldEnum: {
    id: 'id',
    planName: 'planName',
    amount: 'amount',
    currency: 'currency',
    expiresAt: 'expiresAt'
  };

  export type BillingScalarFieldEnum = (typeof BillingScalarFieldEnum)[keyof typeof BillingScalarFieldEnum]


  export const PaymentScalarFieldEnum: {
    id: 'id',
    amount: 'amount',
    currency: 'currency',
    status: 'status',
    method: 'method',
    reference: 'reference',
    description: 'description',
    paidAt: 'paidAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId'
  };

  export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum]


  export const SurveyInterestScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type SurveyInterestScalarFieldEnum = (typeof SurveyInterestScalarFieldEnum)[keyof typeof SurveyInterestScalarFieldEnum]


  export const TicketScalarFieldEnum: {
    id: 'id',
    subject: 'subject',
    description: 'description',
    status: 'status',
    priority: 'priority',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId'
  };

  export type TicketScalarFieldEnum = (typeof TicketScalarFieldEnum)[keyof typeof TicketScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    emailVerifiedAt: 'emailVerifiedAt',
    password: 'password',
    username: 'username',
    phoneNumber: 'phoneNumber',
    alternatePhoneNumber: 'alternatePhoneNumber',
    country: 'country',
    state: 'state',
    employmentStatus: 'employmentStatus',
    mostPreferredCommsChannel: 'mostPreferredCommsChannel',
    howYouGotToKnowUs: 'howYouGotToKnowUs',
    profilePhoto: 'profilePhoto',
    dob: 'dob',
    gender: 'gender',
    location: 'location',
    occupation: 'occupation',
    role: 'role',
    isActive: 'isActive',
    twoFactorAuth: 'twoFactorAuth',
    lastLogin: 'lastLogin',
    ipAddress: 'ipAddress',
    browserAgent: 'browserAgent',
    subscriptionPlan: 'subscriptionPlan',
    subscriptionPlanExpireAt: 'subscriptionPlanExpireAt',
    billingId: 'billingId',
    bio: 'bio',
    referralCode: 'referralCode',
    softDelete: 'softDelete',
    firstName: 'firstName',
    lastName: 'lastName',
    countryCode: 'countryCode',
    stateCode: 'stateCode',
    subDivisionCode: 'subDivisionCode',
    subDivisionName: 'subDivisionName',
    address: 'address',
    hasOnboarded: 'hasOnboarded',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type BillingWhereInput = {
    AND?: BillingWhereInput | BillingWhereInput[]
    OR?: BillingWhereInput[]
    NOT?: BillingWhereInput | BillingWhereInput[]
    id?: IntFilter<"Billing"> | number
    planName?: StringFilter<"Billing"> | string
    amount?: FloatFilter<"Billing"> | number
    currency?: StringFilter<"Billing"> | string
    expiresAt?: DateTimeNullableFilter<"Billing"> | Date | string | null
    User?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type BillingOrderByWithRelationInput = {
    id?: SortOrder
    planName?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    User?: UserOrderByWithRelationInput
  }

  export type BillingWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: BillingWhereInput | BillingWhereInput[]
    OR?: BillingWhereInput[]
    NOT?: BillingWhereInput | BillingWhereInput[]
    planName?: StringFilter<"Billing"> | string
    amount?: FloatFilter<"Billing"> | number
    currency?: StringFilter<"Billing"> | string
    expiresAt?: DateTimeNullableFilter<"Billing"> | Date | string | null
    User?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type BillingOrderByWithAggregationInput = {
    id?: SortOrder
    planName?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    expiresAt?: SortOrderInput | SortOrder
    _count?: BillingCountOrderByAggregateInput
    _avg?: BillingAvgOrderByAggregateInput
    _max?: BillingMaxOrderByAggregateInput
    _min?: BillingMinOrderByAggregateInput
    _sum?: BillingSumOrderByAggregateInput
  }

  export type BillingScalarWhereWithAggregatesInput = {
    AND?: BillingScalarWhereWithAggregatesInput | BillingScalarWhereWithAggregatesInput[]
    OR?: BillingScalarWhereWithAggregatesInput[]
    NOT?: BillingScalarWhereWithAggregatesInput | BillingScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Billing"> | number
    planName?: StringWithAggregatesFilter<"Billing"> | string
    amount?: FloatWithAggregatesFilter<"Billing"> | number
    currency?: StringWithAggregatesFilter<"Billing"> | string
    expiresAt?: DateTimeNullableWithAggregatesFilter<"Billing"> | Date | string | null
  }

  export type PaymentWhereInput = {
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    id?: IntFilter<"Payment"> | number
    amount?: FloatFilter<"Payment"> | number
    currency?: StringFilter<"Payment"> | string
    status?: StringFilter<"Payment"> | string
    method?: StringNullableFilter<"Payment"> | string | null
    reference?: StringFilter<"Payment"> | string
    description?: StringNullableFilter<"Payment"> | string | null
    paidAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    userId?: IntFilter<"Payment"> | number
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PaymentOrderByWithRelationInput = {
    id?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    method?: SortOrderInput | SortOrder
    reference?: SortOrder
    description?: SortOrderInput | SortOrder
    paidAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    User?: UserOrderByWithRelationInput
  }

  export type PaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    reference?: string
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    amount?: FloatFilter<"Payment"> | number
    currency?: StringFilter<"Payment"> | string
    status?: StringFilter<"Payment"> | string
    method?: StringNullableFilter<"Payment"> | string | null
    description?: StringNullableFilter<"Payment"> | string | null
    paidAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    userId?: IntFilter<"Payment"> | number
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "reference">

  export type PaymentOrderByWithAggregationInput = {
    id?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    method?: SortOrderInput | SortOrder
    reference?: SortOrder
    description?: SortOrderInput | SortOrder
    paidAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    _count?: PaymentCountOrderByAggregateInput
    _avg?: PaymentAvgOrderByAggregateInput
    _max?: PaymentMaxOrderByAggregateInput
    _min?: PaymentMinOrderByAggregateInput
    _sum?: PaymentSumOrderByAggregateInput
  }

  export type PaymentScalarWhereWithAggregatesInput = {
    AND?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    OR?: PaymentScalarWhereWithAggregatesInput[]
    NOT?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Payment"> | number
    amount?: FloatWithAggregatesFilter<"Payment"> | number
    currency?: StringWithAggregatesFilter<"Payment"> | string
    status?: StringWithAggregatesFilter<"Payment"> | string
    method?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    reference?: StringWithAggregatesFilter<"Payment"> | string
    description?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    paidAt?: DateTimeNullableWithAggregatesFilter<"Payment"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    userId?: IntWithAggregatesFilter<"Payment"> | number
  }

  export type SurveyInterestWhereInput = {
    AND?: SurveyInterestWhereInput | SurveyInterestWhereInput[]
    OR?: SurveyInterestWhereInput[]
    NOT?: SurveyInterestWhereInput | SurveyInterestWhereInput[]
    id?: IntFilter<"SurveyInterest"> | number
    name?: StringFilter<"SurveyInterest"> | string
    User?: UserListRelationFilter
  }

  export type SurveyInterestOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    User?: UserOrderByRelationAggregateInput
  }

  export type SurveyInterestWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: SurveyInterestWhereInput | SurveyInterestWhereInput[]
    OR?: SurveyInterestWhereInput[]
    NOT?: SurveyInterestWhereInput | SurveyInterestWhereInput[]
    User?: UserListRelationFilter
  }, "id" | "name">

  export type SurveyInterestOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: SurveyInterestCountOrderByAggregateInput
    _avg?: SurveyInterestAvgOrderByAggregateInput
    _max?: SurveyInterestMaxOrderByAggregateInput
    _min?: SurveyInterestMinOrderByAggregateInput
    _sum?: SurveyInterestSumOrderByAggregateInput
  }

  export type SurveyInterestScalarWhereWithAggregatesInput = {
    AND?: SurveyInterestScalarWhereWithAggregatesInput | SurveyInterestScalarWhereWithAggregatesInput[]
    OR?: SurveyInterestScalarWhereWithAggregatesInput[]
    NOT?: SurveyInterestScalarWhereWithAggregatesInput | SurveyInterestScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SurveyInterest"> | number
    name?: StringWithAggregatesFilter<"SurveyInterest"> | string
  }

  export type TicketWhereInput = {
    AND?: TicketWhereInput | TicketWhereInput[]
    OR?: TicketWhereInput[]
    NOT?: TicketWhereInput | TicketWhereInput[]
    id?: IntFilter<"Ticket"> | number
    subject?: StringFilter<"Ticket"> | string
    description?: StringNullableFilter<"Ticket"> | string | null
    status?: StringFilter<"Ticket"> | string
    priority?: StringNullableFilter<"Ticket"> | string | null
    createdAt?: DateTimeFilter<"Ticket"> | Date | string
    updatedAt?: DateTimeFilter<"Ticket"> | Date | string
    userId?: IntFilter<"Ticket"> | number
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type TicketOrderByWithRelationInput = {
    id?: SortOrder
    subject?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    priority?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    User?: UserOrderByWithRelationInput
  }

  export type TicketWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TicketWhereInput | TicketWhereInput[]
    OR?: TicketWhereInput[]
    NOT?: TicketWhereInput | TicketWhereInput[]
    subject?: StringFilter<"Ticket"> | string
    description?: StringNullableFilter<"Ticket"> | string | null
    status?: StringFilter<"Ticket"> | string
    priority?: StringNullableFilter<"Ticket"> | string | null
    createdAt?: DateTimeFilter<"Ticket"> | Date | string
    updatedAt?: DateTimeFilter<"Ticket"> | Date | string
    userId?: IntFilter<"Ticket"> | number
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type TicketOrderByWithAggregationInput = {
    id?: SortOrder
    subject?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    priority?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    _count?: TicketCountOrderByAggregateInput
    _avg?: TicketAvgOrderByAggregateInput
    _max?: TicketMaxOrderByAggregateInput
    _min?: TicketMinOrderByAggregateInput
    _sum?: TicketSumOrderByAggregateInput
  }

  export type TicketScalarWhereWithAggregatesInput = {
    AND?: TicketScalarWhereWithAggregatesInput | TicketScalarWhereWithAggregatesInput[]
    OR?: TicketScalarWhereWithAggregatesInput[]
    NOT?: TicketScalarWhereWithAggregatesInput | TicketScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Ticket"> | number
    subject?: StringWithAggregatesFilter<"Ticket"> | string
    description?: StringNullableWithAggregatesFilter<"Ticket"> | string | null
    status?: StringWithAggregatesFilter<"Ticket"> | string
    priority?: StringNullableWithAggregatesFilter<"Ticket"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Ticket"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Ticket"> | Date | string
    userId?: IntWithAggregatesFilter<"Ticket"> | number
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    emailVerifiedAt?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    username?: StringNullableFilter<"User"> | string | null
    phoneNumber?: StringNullableFilter<"User"> | string | null
    alternatePhoneNumber?: StringNullableFilter<"User"> | string | null
    country?: StringNullableFilter<"User"> | string | null
    state?: StringNullableFilter<"User"> | string | null
    employmentStatus?: StringNullableFilter<"User"> | string | null
    mostPreferredCommsChannel?: StringNullableFilter<"User"> | string | null
    howYouGotToKnowUs?: StringNullableFilter<"User"> | string | null
    profilePhoto?: StringNullableFilter<"User"> | string | null
    dob?: DateTimeNullableFilter<"User"> | Date | string | null
    gender?: StringNullableFilter<"User"> | string | null
    location?: StringNullableFilter<"User"> | string | null
    occupation?: StringNullableFilter<"User"> | string | null
    role?: StringNullableFilter<"User"> | string | null
    isActive?: StringNullableFilter<"User"> | string | null
    twoFactorAuth?: StringNullableFilter<"User"> | string | null
    lastLogin?: StringNullableFilter<"User"> | string | null
    ipAddress?: StringNullableFilter<"User"> | string | null
    browserAgent?: StringNullableFilter<"User"> | string | null
    subscriptionPlan?: StringNullableFilter<"User"> | string | null
    subscriptionPlanExpireAt?: StringNullableFilter<"User"> | string | null
    billingId?: IntNullableFilter<"User"> | number | null
    bio?: StringNullableFilter<"User"> | string | null
    referralCode?: StringNullableFilter<"User"> | string | null
    softDelete?: BoolNullableFilter<"User"> | boolean | null
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    countryCode?: StringNullableFilter<"User"> | string | null
    stateCode?: StringNullableFilter<"User"> | string | null
    subDivisionCode?: StringNullableFilter<"User"> | string | null
    subDivisionName?: StringNullableFilter<"User"> | string | null
    address?: StringNullableFilter<"User"> | string | null
    hasOnboarded?: BoolNullableFilter<"User"> | boolean | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    Payment?: PaymentListRelationFilter
    Ticket?: TicketListRelationFilter
    Billing?: XOR<BillingNullableScalarRelationFilter, BillingWhereInput> | null
    SurveyInterest?: SurveyInterestListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    emailVerifiedAt?: SortOrderInput | SortOrder
    password?: SortOrder
    username?: SortOrderInput | SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    alternatePhoneNumber?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    employmentStatus?: SortOrderInput | SortOrder
    mostPreferredCommsChannel?: SortOrderInput | SortOrder
    howYouGotToKnowUs?: SortOrderInput | SortOrder
    profilePhoto?: SortOrderInput | SortOrder
    dob?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    occupation?: SortOrderInput | SortOrder
    role?: SortOrderInput | SortOrder
    isActive?: SortOrderInput | SortOrder
    twoFactorAuth?: SortOrderInput | SortOrder
    lastLogin?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    browserAgent?: SortOrderInput | SortOrder
    subscriptionPlan?: SortOrderInput | SortOrder
    subscriptionPlanExpireAt?: SortOrderInput | SortOrder
    billingId?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    referralCode?: SortOrderInput | SortOrder
    softDelete?: SortOrderInput | SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    countryCode?: SortOrderInput | SortOrder
    stateCode?: SortOrderInput | SortOrder
    subDivisionCode?: SortOrderInput | SortOrder
    subDivisionName?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    hasOnboarded?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    Payment?: PaymentOrderByRelationAggregateInput
    Ticket?: TicketOrderByRelationAggregateInput
    Billing?: BillingOrderByWithRelationInput
    SurveyInterest?: SurveyInterestOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    billingId?: number
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    emailVerifiedAt?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    username?: StringNullableFilter<"User"> | string | null
    phoneNumber?: StringNullableFilter<"User"> | string | null
    alternatePhoneNumber?: StringNullableFilter<"User"> | string | null
    country?: StringNullableFilter<"User"> | string | null
    state?: StringNullableFilter<"User"> | string | null
    employmentStatus?: StringNullableFilter<"User"> | string | null
    mostPreferredCommsChannel?: StringNullableFilter<"User"> | string | null
    howYouGotToKnowUs?: StringNullableFilter<"User"> | string | null
    profilePhoto?: StringNullableFilter<"User"> | string | null
    dob?: DateTimeNullableFilter<"User"> | Date | string | null
    gender?: StringNullableFilter<"User"> | string | null
    location?: StringNullableFilter<"User"> | string | null
    occupation?: StringNullableFilter<"User"> | string | null
    role?: StringNullableFilter<"User"> | string | null
    isActive?: StringNullableFilter<"User"> | string | null
    twoFactorAuth?: StringNullableFilter<"User"> | string | null
    lastLogin?: StringNullableFilter<"User"> | string | null
    ipAddress?: StringNullableFilter<"User"> | string | null
    browserAgent?: StringNullableFilter<"User"> | string | null
    subscriptionPlan?: StringNullableFilter<"User"> | string | null
    subscriptionPlanExpireAt?: StringNullableFilter<"User"> | string | null
    bio?: StringNullableFilter<"User"> | string | null
    referralCode?: StringNullableFilter<"User"> | string | null
    softDelete?: BoolNullableFilter<"User"> | boolean | null
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    countryCode?: StringNullableFilter<"User"> | string | null
    stateCode?: StringNullableFilter<"User"> | string | null
    subDivisionCode?: StringNullableFilter<"User"> | string | null
    subDivisionName?: StringNullableFilter<"User"> | string | null
    address?: StringNullableFilter<"User"> | string | null
    hasOnboarded?: BoolNullableFilter<"User"> | boolean | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    Payment?: PaymentListRelationFilter
    Ticket?: TicketListRelationFilter
    Billing?: XOR<BillingNullableScalarRelationFilter, BillingWhereInput> | null
    SurveyInterest?: SurveyInterestListRelationFilter
  }, "id" | "email" | "billingId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    emailVerifiedAt?: SortOrderInput | SortOrder
    password?: SortOrder
    username?: SortOrderInput | SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    alternatePhoneNumber?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    employmentStatus?: SortOrderInput | SortOrder
    mostPreferredCommsChannel?: SortOrderInput | SortOrder
    howYouGotToKnowUs?: SortOrderInput | SortOrder
    profilePhoto?: SortOrderInput | SortOrder
    dob?: SortOrderInput | SortOrder
    gender?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    occupation?: SortOrderInput | SortOrder
    role?: SortOrderInput | SortOrder
    isActive?: SortOrderInput | SortOrder
    twoFactorAuth?: SortOrderInput | SortOrder
    lastLogin?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    browserAgent?: SortOrderInput | SortOrder
    subscriptionPlan?: SortOrderInput | SortOrder
    subscriptionPlanExpireAt?: SortOrderInput | SortOrder
    billingId?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    referralCode?: SortOrderInput | SortOrder
    softDelete?: SortOrderInput | SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    countryCode?: SortOrderInput | SortOrder
    stateCode?: SortOrderInput | SortOrder
    subDivisionCode?: SortOrderInput | SortOrder
    subDivisionName?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    hasOnboarded?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    emailVerifiedAt?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringWithAggregatesFilter<"User"> | string
    username?: StringNullableWithAggregatesFilter<"User"> | string | null
    phoneNumber?: StringNullableWithAggregatesFilter<"User"> | string | null
    alternatePhoneNumber?: StringNullableWithAggregatesFilter<"User"> | string | null
    country?: StringNullableWithAggregatesFilter<"User"> | string | null
    state?: StringNullableWithAggregatesFilter<"User"> | string | null
    employmentStatus?: StringNullableWithAggregatesFilter<"User"> | string | null
    mostPreferredCommsChannel?: StringNullableWithAggregatesFilter<"User"> | string | null
    howYouGotToKnowUs?: StringNullableWithAggregatesFilter<"User"> | string | null
    profilePhoto?: StringNullableWithAggregatesFilter<"User"> | string | null
    dob?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    gender?: StringNullableWithAggregatesFilter<"User"> | string | null
    location?: StringNullableWithAggregatesFilter<"User"> | string | null
    occupation?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: StringNullableWithAggregatesFilter<"User"> | string | null
    isActive?: StringNullableWithAggregatesFilter<"User"> | string | null
    twoFactorAuth?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastLogin?: StringNullableWithAggregatesFilter<"User"> | string | null
    ipAddress?: StringNullableWithAggregatesFilter<"User"> | string | null
    browserAgent?: StringNullableWithAggregatesFilter<"User"> | string | null
    subscriptionPlan?: StringNullableWithAggregatesFilter<"User"> | string | null
    subscriptionPlanExpireAt?: StringNullableWithAggregatesFilter<"User"> | string | null
    billingId?: IntNullableWithAggregatesFilter<"User"> | number | null
    bio?: StringNullableWithAggregatesFilter<"User"> | string | null
    referralCode?: StringNullableWithAggregatesFilter<"User"> | string | null
    softDelete?: BoolNullableWithAggregatesFilter<"User"> | boolean | null
    firstName?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastName?: StringNullableWithAggregatesFilter<"User"> | string | null
    countryCode?: StringNullableWithAggregatesFilter<"User"> | string | null
    stateCode?: StringNullableWithAggregatesFilter<"User"> | string | null
    subDivisionCode?: StringNullableWithAggregatesFilter<"User"> | string | null
    subDivisionName?: StringNullableWithAggregatesFilter<"User"> | string | null
    address?: StringNullableWithAggregatesFilter<"User"> | string | null
    hasOnboarded?: BoolNullableWithAggregatesFilter<"User"> | boolean | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type BillingCreateInput = {
    planName: string
    amount: number
    currency: string
    expiresAt?: Date | string | null
    User?: UserCreateNestedOneWithoutBillingInput
  }

  export type BillingUncheckedCreateInput = {
    id?: number
    planName: string
    amount: number
    currency: string
    expiresAt?: Date | string | null
    User?: UserUncheckedCreateNestedOneWithoutBillingInput
  }

  export type BillingUpdateInput = {
    planName?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    User?: UserUpdateOneWithoutBillingNestedInput
  }

  export type BillingUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    planName?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    User?: UserUncheckedUpdateOneWithoutBillingNestedInput
  }

  export type BillingCreateManyInput = {
    id?: number
    planName: string
    amount: number
    currency: string
    expiresAt?: Date | string | null
  }

  export type BillingUpdateManyMutationInput = {
    planName?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BillingUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    planName?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PaymentCreateInput = {
    amount: number
    currency?: string
    status?: string
    method?: string | null
    reference: string
    description?: string | null
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt: Date | string
    User: UserCreateNestedOneWithoutPaymentInput
  }

  export type PaymentUncheckedCreateInput = {
    id?: number
    amount: number
    currency?: string
    status?: string
    method?: string | null
    reference: string
    description?: string | null
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt: Date | string
    userId: number
  }

  export type PaymentUpdateInput = {
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    method?: NullableStringFieldUpdateOperationsInput | string | null
    reference?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    User?: UserUpdateOneRequiredWithoutPaymentNestedInput
  }

  export type PaymentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    method?: NullableStringFieldUpdateOperationsInput | string | null
    reference?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type PaymentCreateManyInput = {
    id?: number
    amount: number
    currency?: string
    status?: string
    method?: string | null
    reference: string
    description?: string | null
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt: Date | string
    userId: number
  }

  export type PaymentUpdateManyMutationInput = {
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    method?: NullableStringFieldUpdateOperationsInput | string | null
    reference?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    method?: NullableStringFieldUpdateOperationsInput | string | null
    reference?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type SurveyInterestCreateInput = {
    name: string
    User?: UserCreateNestedManyWithoutSurveyInterestInput
  }

  export type SurveyInterestUncheckedCreateInput = {
    id?: number
    name: string
    User?: UserUncheckedCreateNestedManyWithoutSurveyInterestInput
  }

  export type SurveyInterestUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    User?: UserUpdateManyWithoutSurveyInterestNestedInput
  }

  export type SurveyInterestUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    User?: UserUncheckedUpdateManyWithoutSurveyInterestNestedInput
  }

  export type SurveyInterestCreateManyInput = {
    id?: number
    name: string
  }

  export type SurveyInterestUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type SurveyInterestUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type TicketCreateInput = {
    subject: string
    description?: string | null
    status?: string
    priority?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
    User: UserCreateNestedOneWithoutTicketInput
  }

  export type TicketUncheckedCreateInput = {
    id?: number
    subject: string
    description?: string | null
    status?: string
    priority?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
    userId: number
  }

  export type TicketUpdateInput = {
    subject?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    User?: UserUpdateOneRequiredWithoutTicketNestedInput
  }

  export type TicketUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    subject?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type TicketCreateManyInput = {
    id?: number
    subject: string
    description?: string | null
    status?: string
    priority?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
    userId: number
  }

  export type TicketUpdateManyMutationInput = {
    subject?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    subject?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type UserCreateInput = {
    email: string
    emailVerifiedAt?: string | null
    password: string
    username?: string | null
    phoneNumber?: string | null
    alternatePhoneNumber?: string | null
    country?: string | null
    state?: string | null
    employmentStatus?: string | null
    mostPreferredCommsChannel?: string | null
    howYouGotToKnowUs?: string | null
    profilePhoto?: string | null
    dob?: Date | string | null
    gender?: string | null
    location?: string | null
    occupation?: string | null
    role?: string | null
    isActive?: string | null
    twoFactorAuth?: string | null
    lastLogin?: string | null
    ipAddress?: string | null
    browserAgent?: string | null
    subscriptionPlan?: string | null
    subscriptionPlanExpireAt?: string | null
    bio?: string | null
    referralCode?: string | null
    softDelete?: boolean | null
    firstName?: string | null
    lastName?: string | null
    countryCode?: string | null
    stateCode?: string | null
    subDivisionCode?: string | null
    subDivisionName?: string | null
    address?: string | null
    hasOnboarded?: boolean | null
    createdAt?: Date | string
    Payment?: PaymentCreateNestedManyWithoutUserInput
    Ticket?: TicketCreateNestedManyWithoutUserInput
    Billing?: BillingCreateNestedOneWithoutUserInput
    SurveyInterest?: SurveyInterestCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    emailVerifiedAt?: string | null
    password: string
    username?: string | null
    phoneNumber?: string | null
    alternatePhoneNumber?: string | null
    country?: string | null
    state?: string | null
    employmentStatus?: string | null
    mostPreferredCommsChannel?: string | null
    howYouGotToKnowUs?: string | null
    profilePhoto?: string | null
    dob?: Date | string | null
    gender?: string | null
    location?: string | null
    occupation?: string | null
    role?: string | null
    isActive?: string | null
    twoFactorAuth?: string | null
    lastLogin?: string | null
    ipAddress?: string | null
    browserAgent?: string | null
    subscriptionPlan?: string | null
    subscriptionPlanExpireAt?: string | null
    billingId?: number | null
    bio?: string | null
    referralCode?: string | null
    softDelete?: boolean | null
    firstName?: string | null
    lastName?: string | null
    countryCode?: string | null
    stateCode?: string | null
    subDivisionCode?: string | null
    subDivisionName?: string | null
    address?: string | null
    hasOnboarded?: boolean | null
    createdAt?: Date | string
    Payment?: PaymentUncheckedCreateNestedManyWithoutUserInput
    Ticket?: TicketUncheckedCreateNestedManyWithoutUserInput
    SurveyInterest?: SurveyInterestUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    emailVerifiedAt?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    alternatePhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    employmentStatus?: NullableStringFieldUpdateOperationsInput | string | null
    mostPreferredCommsChannel?: NullableStringFieldUpdateOperationsInput | string | null
    howYouGotToKnowUs?: NullableStringFieldUpdateOperationsInput | string | null
    profilePhoto?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorAuth?: NullableStringFieldUpdateOperationsInput | string | null
    lastLogin?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    browserAgent?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlan?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlanExpireAt?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    referralCode?: NullableStringFieldUpdateOperationsInput | string | null
    softDelete?: NullableBoolFieldUpdateOperationsInput | boolean | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    countryCode?: NullableStringFieldUpdateOperationsInput | string | null
    stateCode?: NullableStringFieldUpdateOperationsInput | string | null
    subDivisionCode?: NullableStringFieldUpdateOperationsInput | string | null
    subDivisionName?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    hasOnboarded?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Payment?: PaymentUpdateManyWithoutUserNestedInput
    Ticket?: TicketUpdateManyWithoutUserNestedInput
    Billing?: BillingUpdateOneWithoutUserNestedInput
    SurveyInterest?: SurveyInterestUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    emailVerifiedAt?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    alternatePhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    employmentStatus?: NullableStringFieldUpdateOperationsInput | string | null
    mostPreferredCommsChannel?: NullableStringFieldUpdateOperationsInput | string | null
    howYouGotToKnowUs?: NullableStringFieldUpdateOperationsInput | string | null
    profilePhoto?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorAuth?: NullableStringFieldUpdateOperationsInput | string | null
    lastLogin?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    browserAgent?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlan?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlanExpireAt?: NullableStringFieldUpdateOperationsInput | string | null
    billingId?: NullableIntFieldUpdateOperationsInput | number | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    referralCode?: NullableStringFieldUpdateOperationsInput | string | null
    softDelete?: NullableBoolFieldUpdateOperationsInput | boolean | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    countryCode?: NullableStringFieldUpdateOperationsInput | string | null
    stateCode?: NullableStringFieldUpdateOperationsInput | string | null
    subDivisionCode?: NullableStringFieldUpdateOperationsInput | string | null
    subDivisionName?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    hasOnboarded?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Payment?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    Ticket?: TicketUncheckedUpdateManyWithoutUserNestedInput
    SurveyInterest?: SurveyInterestUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    emailVerifiedAt?: string | null
    password: string
    username?: string | null
    phoneNumber?: string | null
    alternatePhoneNumber?: string | null
    country?: string | null
    state?: string | null
    employmentStatus?: string | null
    mostPreferredCommsChannel?: string | null
    howYouGotToKnowUs?: string | null
    profilePhoto?: string | null
    dob?: Date | string | null
    gender?: string | null
    location?: string | null
    occupation?: string | null
    role?: string | null
    isActive?: string | null
    twoFactorAuth?: string | null
    lastLogin?: string | null
    ipAddress?: string | null
    browserAgent?: string | null
    subscriptionPlan?: string | null
    subscriptionPlanExpireAt?: string | null
    billingId?: number | null
    bio?: string | null
    referralCode?: string | null
    softDelete?: boolean | null
    firstName?: string | null
    lastName?: string | null
    countryCode?: string | null
    stateCode?: string | null
    subDivisionCode?: string | null
    subDivisionName?: string | null
    address?: string | null
    hasOnboarded?: boolean | null
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    emailVerifiedAt?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    alternatePhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    employmentStatus?: NullableStringFieldUpdateOperationsInput | string | null
    mostPreferredCommsChannel?: NullableStringFieldUpdateOperationsInput | string | null
    howYouGotToKnowUs?: NullableStringFieldUpdateOperationsInput | string | null
    profilePhoto?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorAuth?: NullableStringFieldUpdateOperationsInput | string | null
    lastLogin?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    browserAgent?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlan?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlanExpireAt?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    referralCode?: NullableStringFieldUpdateOperationsInput | string | null
    softDelete?: NullableBoolFieldUpdateOperationsInput | boolean | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    countryCode?: NullableStringFieldUpdateOperationsInput | string | null
    stateCode?: NullableStringFieldUpdateOperationsInput | string | null
    subDivisionCode?: NullableStringFieldUpdateOperationsInput | string | null
    subDivisionName?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    hasOnboarded?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    emailVerifiedAt?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    alternatePhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    employmentStatus?: NullableStringFieldUpdateOperationsInput | string | null
    mostPreferredCommsChannel?: NullableStringFieldUpdateOperationsInput | string | null
    howYouGotToKnowUs?: NullableStringFieldUpdateOperationsInput | string | null
    profilePhoto?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorAuth?: NullableStringFieldUpdateOperationsInput | string | null
    lastLogin?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    browserAgent?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlan?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlanExpireAt?: NullableStringFieldUpdateOperationsInput | string | null
    billingId?: NullableIntFieldUpdateOperationsInput | number | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    referralCode?: NullableStringFieldUpdateOperationsInput | string | null
    softDelete?: NullableBoolFieldUpdateOperationsInput | boolean | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    countryCode?: NullableStringFieldUpdateOperationsInput | string | null
    stateCode?: NullableStringFieldUpdateOperationsInput | string | null
    subDivisionCode?: NullableStringFieldUpdateOperationsInput | string | null
    subDivisionName?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    hasOnboarded?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type BillingCountOrderByAggregateInput = {
    id?: SortOrder
    planName?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    expiresAt?: SortOrder
  }

  export type BillingAvgOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
  }

  export type BillingMaxOrderByAggregateInput = {
    id?: SortOrder
    planName?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    expiresAt?: SortOrder
  }

  export type BillingMinOrderByAggregateInput = {
    id?: SortOrder
    planName?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    expiresAt?: SortOrder
  }

  export type BillingSumOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type PaymentCountOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    method?: SortOrder
    reference?: SortOrder
    description?: SortOrder
    paidAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type PaymentAvgOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    userId?: SortOrder
  }

  export type PaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    method?: SortOrder
    reference?: SortOrder
    description?: SortOrder
    paidAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type PaymentMinOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    method?: SortOrder
    reference?: SortOrder
    description?: SortOrder
    paidAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type PaymentSumOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    userId?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SurveyInterestCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type SurveyInterestAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SurveyInterestMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type SurveyInterestMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type SurveyInterestSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type TicketCountOrderByAggregateInput = {
    id?: SortOrder
    subject?: SortOrder
    description?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type TicketAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type TicketMaxOrderByAggregateInput = {
    id?: SortOrder
    subject?: SortOrder
    description?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type TicketMinOrderByAggregateInput = {
    id?: SortOrder
    subject?: SortOrder
    description?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type TicketSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type PaymentListRelationFilter = {
    every?: PaymentWhereInput
    some?: PaymentWhereInput
    none?: PaymentWhereInput
  }

  export type TicketListRelationFilter = {
    every?: TicketWhereInput
    some?: TicketWhereInput
    none?: TicketWhereInput
  }

  export type BillingNullableScalarRelationFilter = {
    is?: BillingWhereInput | null
    isNot?: BillingWhereInput | null
  }

  export type SurveyInterestListRelationFilter = {
    every?: SurveyInterestWhereInput
    some?: SurveyInterestWhereInput
    none?: SurveyInterestWhereInput
  }

  export type PaymentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TicketOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SurveyInterestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    emailVerifiedAt?: SortOrder
    password?: SortOrder
    username?: SortOrder
    phoneNumber?: SortOrder
    alternatePhoneNumber?: SortOrder
    country?: SortOrder
    state?: SortOrder
    employmentStatus?: SortOrder
    mostPreferredCommsChannel?: SortOrder
    howYouGotToKnowUs?: SortOrder
    profilePhoto?: SortOrder
    dob?: SortOrder
    gender?: SortOrder
    location?: SortOrder
    occupation?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    twoFactorAuth?: SortOrder
    lastLogin?: SortOrder
    ipAddress?: SortOrder
    browserAgent?: SortOrder
    subscriptionPlan?: SortOrder
    subscriptionPlanExpireAt?: SortOrder
    billingId?: SortOrder
    bio?: SortOrder
    referralCode?: SortOrder
    softDelete?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    countryCode?: SortOrder
    stateCode?: SortOrder
    subDivisionCode?: SortOrder
    subDivisionName?: SortOrder
    address?: SortOrder
    hasOnboarded?: SortOrder
    createdAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
    billingId?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    emailVerifiedAt?: SortOrder
    password?: SortOrder
    username?: SortOrder
    phoneNumber?: SortOrder
    alternatePhoneNumber?: SortOrder
    country?: SortOrder
    state?: SortOrder
    employmentStatus?: SortOrder
    mostPreferredCommsChannel?: SortOrder
    howYouGotToKnowUs?: SortOrder
    profilePhoto?: SortOrder
    dob?: SortOrder
    gender?: SortOrder
    location?: SortOrder
    occupation?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    twoFactorAuth?: SortOrder
    lastLogin?: SortOrder
    ipAddress?: SortOrder
    browserAgent?: SortOrder
    subscriptionPlan?: SortOrder
    subscriptionPlanExpireAt?: SortOrder
    billingId?: SortOrder
    bio?: SortOrder
    referralCode?: SortOrder
    softDelete?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    countryCode?: SortOrder
    stateCode?: SortOrder
    subDivisionCode?: SortOrder
    subDivisionName?: SortOrder
    address?: SortOrder
    hasOnboarded?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    emailVerifiedAt?: SortOrder
    password?: SortOrder
    username?: SortOrder
    phoneNumber?: SortOrder
    alternatePhoneNumber?: SortOrder
    country?: SortOrder
    state?: SortOrder
    employmentStatus?: SortOrder
    mostPreferredCommsChannel?: SortOrder
    howYouGotToKnowUs?: SortOrder
    profilePhoto?: SortOrder
    dob?: SortOrder
    gender?: SortOrder
    location?: SortOrder
    occupation?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    twoFactorAuth?: SortOrder
    lastLogin?: SortOrder
    ipAddress?: SortOrder
    browserAgent?: SortOrder
    subscriptionPlan?: SortOrder
    subscriptionPlanExpireAt?: SortOrder
    billingId?: SortOrder
    bio?: SortOrder
    referralCode?: SortOrder
    softDelete?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    countryCode?: SortOrder
    stateCode?: SortOrder
    subDivisionCode?: SortOrder
    subDivisionName?: SortOrder
    address?: SortOrder
    hasOnboarded?: SortOrder
    createdAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
    billingId?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type UserCreateNestedOneWithoutBillingInput = {
    create?: XOR<UserCreateWithoutBillingInput, UserUncheckedCreateWithoutBillingInput>
    connectOrCreate?: UserCreateOrConnectWithoutBillingInput
    connect?: UserWhereUniqueInput
  }

  export type UserUncheckedCreateNestedOneWithoutBillingInput = {
    create?: XOR<UserCreateWithoutBillingInput, UserUncheckedCreateWithoutBillingInput>
    connectOrCreate?: UserCreateOrConnectWithoutBillingInput
    connect?: UserWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneWithoutBillingNestedInput = {
    create?: XOR<UserCreateWithoutBillingInput, UserUncheckedCreateWithoutBillingInput>
    connectOrCreate?: UserCreateOrConnectWithoutBillingInput
    upsert?: UserUpsertWithoutBillingInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBillingInput, UserUpdateWithoutBillingInput>, UserUncheckedUpdateWithoutBillingInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUncheckedUpdateOneWithoutBillingNestedInput = {
    create?: XOR<UserCreateWithoutBillingInput, UserUncheckedCreateWithoutBillingInput>
    connectOrCreate?: UserCreateOrConnectWithoutBillingInput
    upsert?: UserUpsertWithoutBillingInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBillingInput, UserUpdateWithoutBillingInput>, UserUncheckedUpdateWithoutBillingInput>
  }

  export type UserCreateNestedOneWithoutPaymentInput = {
    create?: XOR<UserCreateWithoutPaymentInput, UserUncheckedCreateWithoutPaymentInput>
    connectOrCreate?: UserCreateOrConnectWithoutPaymentInput
    connect?: UserWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateOneRequiredWithoutPaymentNestedInput = {
    create?: XOR<UserCreateWithoutPaymentInput, UserUncheckedCreateWithoutPaymentInput>
    connectOrCreate?: UserCreateOrConnectWithoutPaymentInput
    upsert?: UserUpsertWithoutPaymentInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPaymentInput, UserUpdateWithoutPaymentInput>, UserUncheckedUpdateWithoutPaymentInput>
  }

  export type UserCreateNestedManyWithoutSurveyInterestInput = {
    create?: XOR<UserCreateWithoutSurveyInterestInput, UserUncheckedCreateWithoutSurveyInterestInput> | UserCreateWithoutSurveyInterestInput[] | UserUncheckedCreateWithoutSurveyInterestInput[]
    connectOrCreate?: UserCreateOrConnectWithoutSurveyInterestInput | UserCreateOrConnectWithoutSurveyInterestInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutSurveyInterestInput = {
    create?: XOR<UserCreateWithoutSurveyInterestInput, UserUncheckedCreateWithoutSurveyInterestInput> | UserCreateWithoutSurveyInterestInput[] | UserUncheckedCreateWithoutSurveyInterestInput[]
    connectOrCreate?: UserCreateOrConnectWithoutSurveyInterestInput | UserCreateOrConnectWithoutSurveyInterestInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserUpdateManyWithoutSurveyInterestNestedInput = {
    create?: XOR<UserCreateWithoutSurveyInterestInput, UserUncheckedCreateWithoutSurveyInterestInput> | UserCreateWithoutSurveyInterestInput[] | UserUncheckedCreateWithoutSurveyInterestInput[]
    connectOrCreate?: UserCreateOrConnectWithoutSurveyInterestInput | UserCreateOrConnectWithoutSurveyInterestInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutSurveyInterestInput | UserUpsertWithWhereUniqueWithoutSurveyInterestInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutSurveyInterestInput | UserUpdateWithWhereUniqueWithoutSurveyInterestInput[]
    updateMany?: UserUpdateManyWithWhereWithoutSurveyInterestInput | UserUpdateManyWithWhereWithoutSurveyInterestInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutSurveyInterestNestedInput = {
    create?: XOR<UserCreateWithoutSurveyInterestInput, UserUncheckedCreateWithoutSurveyInterestInput> | UserCreateWithoutSurveyInterestInput[] | UserUncheckedCreateWithoutSurveyInterestInput[]
    connectOrCreate?: UserCreateOrConnectWithoutSurveyInterestInput | UserCreateOrConnectWithoutSurveyInterestInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutSurveyInterestInput | UserUpsertWithWhereUniqueWithoutSurveyInterestInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutSurveyInterestInput | UserUpdateWithWhereUniqueWithoutSurveyInterestInput[]
    updateMany?: UserUpdateManyWithWhereWithoutSurveyInterestInput | UserUpdateManyWithWhereWithoutSurveyInterestInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutTicketInput = {
    create?: XOR<UserCreateWithoutTicketInput, UserUncheckedCreateWithoutTicketInput>
    connectOrCreate?: UserCreateOrConnectWithoutTicketInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutTicketNestedInput = {
    create?: XOR<UserCreateWithoutTicketInput, UserUncheckedCreateWithoutTicketInput>
    connectOrCreate?: UserCreateOrConnectWithoutTicketInput
    upsert?: UserUpsertWithoutTicketInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTicketInput, UserUpdateWithoutTicketInput>, UserUncheckedUpdateWithoutTicketInput>
  }

  export type PaymentCreateNestedManyWithoutUserInput = {
    create?: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput> | PaymentCreateWithoutUserInput[] | PaymentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutUserInput | PaymentCreateOrConnectWithoutUserInput[]
    createMany?: PaymentCreateManyUserInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type TicketCreateNestedManyWithoutUserInput = {
    create?: XOR<TicketCreateWithoutUserInput, TicketUncheckedCreateWithoutUserInput> | TicketCreateWithoutUserInput[] | TicketUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutUserInput | TicketCreateOrConnectWithoutUserInput[]
    createMany?: TicketCreateManyUserInputEnvelope
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
  }

  export type BillingCreateNestedOneWithoutUserInput = {
    create?: XOR<BillingCreateWithoutUserInput, BillingUncheckedCreateWithoutUserInput>
    connectOrCreate?: BillingCreateOrConnectWithoutUserInput
    connect?: BillingWhereUniqueInput
  }

  export type SurveyInterestCreateNestedManyWithoutUserInput = {
    create?: XOR<SurveyInterestCreateWithoutUserInput, SurveyInterestUncheckedCreateWithoutUserInput> | SurveyInterestCreateWithoutUserInput[] | SurveyInterestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SurveyInterestCreateOrConnectWithoutUserInput | SurveyInterestCreateOrConnectWithoutUserInput[]
    connect?: SurveyInterestWhereUniqueInput | SurveyInterestWhereUniqueInput[]
  }

  export type PaymentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput> | PaymentCreateWithoutUserInput[] | PaymentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutUserInput | PaymentCreateOrConnectWithoutUserInput[]
    createMany?: PaymentCreateManyUserInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type TicketUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TicketCreateWithoutUserInput, TicketUncheckedCreateWithoutUserInput> | TicketCreateWithoutUserInput[] | TicketUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutUserInput | TicketCreateOrConnectWithoutUserInput[]
    createMany?: TicketCreateManyUserInputEnvelope
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
  }

  export type SurveyInterestUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SurveyInterestCreateWithoutUserInput, SurveyInterestUncheckedCreateWithoutUserInput> | SurveyInterestCreateWithoutUserInput[] | SurveyInterestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SurveyInterestCreateOrConnectWithoutUserInput | SurveyInterestCreateOrConnectWithoutUserInput[]
    connect?: SurveyInterestWhereUniqueInput | SurveyInterestWhereUniqueInput[]
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type PaymentUpdateManyWithoutUserNestedInput = {
    create?: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput> | PaymentCreateWithoutUserInput[] | PaymentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutUserInput | PaymentCreateOrConnectWithoutUserInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutUserInput | PaymentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PaymentCreateManyUserInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutUserInput | PaymentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutUserInput | PaymentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type TicketUpdateManyWithoutUserNestedInput = {
    create?: XOR<TicketCreateWithoutUserInput, TicketUncheckedCreateWithoutUserInput> | TicketCreateWithoutUserInput[] | TicketUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutUserInput | TicketCreateOrConnectWithoutUserInput[]
    upsert?: TicketUpsertWithWhereUniqueWithoutUserInput | TicketUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TicketCreateManyUserInputEnvelope
    set?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    disconnect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    delete?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    update?: TicketUpdateWithWhereUniqueWithoutUserInput | TicketUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TicketUpdateManyWithWhereWithoutUserInput | TicketUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TicketScalarWhereInput | TicketScalarWhereInput[]
  }

  export type BillingUpdateOneWithoutUserNestedInput = {
    create?: XOR<BillingCreateWithoutUserInput, BillingUncheckedCreateWithoutUserInput>
    connectOrCreate?: BillingCreateOrConnectWithoutUserInput
    upsert?: BillingUpsertWithoutUserInput
    disconnect?: BillingWhereInput | boolean
    delete?: BillingWhereInput | boolean
    connect?: BillingWhereUniqueInput
    update?: XOR<XOR<BillingUpdateToOneWithWhereWithoutUserInput, BillingUpdateWithoutUserInput>, BillingUncheckedUpdateWithoutUserInput>
  }

  export type SurveyInterestUpdateManyWithoutUserNestedInput = {
    create?: XOR<SurveyInterestCreateWithoutUserInput, SurveyInterestUncheckedCreateWithoutUserInput> | SurveyInterestCreateWithoutUserInput[] | SurveyInterestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SurveyInterestCreateOrConnectWithoutUserInput | SurveyInterestCreateOrConnectWithoutUserInput[]
    upsert?: SurveyInterestUpsertWithWhereUniqueWithoutUserInput | SurveyInterestUpsertWithWhereUniqueWithoutUserInput[]
    set?: SurveyInterestWhereUniqueInput | SurveyInterestWhereUniqueInput[]
    disconnect?: SurveyInterestWhereUniqueInput | SurveyInterestWhereUniqueInput[]
    delete?: SurveyInterestWhereUniqueInput | SurveyInterestWhereUniqueInput[]
    connect?: SurveyInterestWhereUniqueInput | SurveyInterestWhereUniqueInput[]
    update?: SurveyInterestUpdateWithWhereUniqueWithoutUserInput | SurveyInterestUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SurveyInterestUpdateManyWithWhereWithoutUserInput | SurveyInterestUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SurveyInterestScalarWhereInput | SurveyInterestScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PaymentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput> | PaymentCreateWithoutUserInput[] | PaymentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutUserInput | PaymentCreateOrConnectWithoutUserInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutUserInput | PaymentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PaymentCreateManyUserInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutUserInput | PaymentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutUserInput | PaymentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type TicketUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TicketCreateWithoutUserInput, TicketUncheckedCreateWithoutUserInput> | TicketCreateWithoutUserInput[] | TicketUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutUserInput | TicketCreateOrConnectWithoutUserInput[]
    upsert?: TicketUpsertWithWhereUniqueWithoutUserInput | TicketUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TicketCreateManyUserInputEnvelope
    set?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    disconnect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    delete?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    update?: TicketUpdateWithWhereUniqueWithoutUserInput | TicketUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TicketUpdateManyWithWhereWithoutUserInput | TicketUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TicketScalarWhereInput | TicketScalarWhereInput[]
  }

  export type SurveyInterestUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SurveyInterestCreateWithoutUserInput, SurveyInterestUncheckedCreateWithoutUserInput> | SurveyInterestCreateWithoutUserInput[] | SurveyInterestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SurveyInterestCreateOrConnectWithoutUserInput | SurveyInterestCreateOrConnectWithoutUserInput[]
    upsert?: SurveyInterestUpsertWithWhereUniqueWithoutUserInput | SurveyInterestUpsertWithWhereUniqueWithoutUserInput[]
    set?: SurveyInterestWhereUniqueInput | SurveyInterestWhereUniqueInput[]
    disconnect?: SurveyInterestWhereUniqueInput | SurveyInterestWhereUniqueInput[]
    delete?: SurveyInterestWhereUniqueInput | SurveyInterestWhereUniqueInput[]
    connect?: SurveyInterestWhereUniqueInput | SurveyInterestWhereUniqueInput[]
    update?: SurveyInterestUpdateWithWhereUniqueWithoutUserInput | SurveyInterestUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SurveyInterestUpdateManyWithWhereWithoutUserInput | SurveyInterestUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SurveyInterestScalarWhereInput | SurveyInterestScalarWhereInput[]
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type UserCreateWithoutBillingInput = {
    email: string
    emailVerifiedAt?: string | null
    password: string
    username?: string | null
    phoneNumber?: string | null
    alternatePhoneNumber?: string | null
    country?: string | null
    state?: string | null
    employmentStatus?: string | null
    mostPreferredCommsChannel?: string | null
    howYouGotToKnowUs?: string | null
    profilePhoto?: string | null
    dob?: Date | string | null
    gender?: string | null
    location?: string | null
    occupation?: string | null
    role?: string | null
    isActive?: string | null
    twoFactorAuth?: string | null
    lastLogin?: string | null
    ipAddress?: string | null
    browserAgent?: string | null
    subscriptionPlan?: string | null
    subscriptionPlanExpireAt?: string | null
    bio?: string | null
    referralCode?: string | null
    softDelete?: boolean | null
    firstName?: string | null
    lastName?: string | null
    countryCode?: string | null
    stateCode?: string | null
    subDivisionCode?: string | null
    subDivisionName?: string | null
    address?: string | null
    hasOnboarded?: boolean | null
    createdAt?: Date | string
    Payment?: PaymentCreateNestedManyWithoutUserInput
    Ticket?: TicketCreateNestedManyWithoutUserInput
    SurveyInterest?: SurveyInterestCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutBillingInput = {
    id?: number
    email: string
    emailVerifiedAt?: string | null
    password: string
    username?: string | null
    phoneNumber?: string | null
    alternatePhoneNumber?: string | null
    country?: string | null
    state?: string | null
    employmentStatus?: string | null
    mostPreferredCommsChannel?: string | null
    howYouGotToKnowUs?: string | null
    profilePhoto?: string | null
    dob?: Date | string | null
    gender?: string | null
    location?: string | null
    occupation?: string | null
    role?: string | null
    isActive?: string | null
    twoFactorAuth?: string | null
    lastLogin?: string | null
    ipAddress?: string | null
    browserAgent?: string | null
    subscriptionPlan?: string | null
    subscriptionPlanExpireAt?: string | null
    bio?: string | null
    referralCode?: string | null
    softDelete?: boolean | null
    firstName?: string | null
    lastName?: string | null
    countryCode?: string | null
    stateCode?: string | null
    subDivisionCode?: string | null
    subDivisionName?: string | null
    address?: string | null
    hasOnboarded?: boolean | null
    createdAt?: Date | string
    Payment?: PaymentUncheckedCreateNestedManyWithoutUserInput
    Ticket?: TicketUncheckedCreateNestedManyWithoutUserInput
    SurveyInterest?: SurveyInterestUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutBillingInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBillingInput, UserUncheckedCreateWithoutBillingInput>
  }

  export type UserUpsertWithoutBillingInput = {
    update: XOR<UserUpdateWithoutBillingInput, UserUncheckedUpdateWithoutBillingInput>
    create: XOR<UserCreateWithoutBillingInput, UserUncheckedCreateWithoutBillingInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBillingInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBillingInput, UserUncheckedUpdateWithoutBillingInput>
  }

  export type UserUpdateWithoutBillingInput = {
    email?: StringFieldUpdateOperationsInput | string
    emailVerifiedAt?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    alternatePhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    employmentStatus?: NullableStringFieldUpdateOperationsInput | string | null
    mostPreferredCommsChannel?: NullableStringFieldUpdateOperationsInput | string | null
    howYouGotToKnowUs?: NullableStringFieldUpdateOperationsInput | string | null
    profilePhoto?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorAuth?: NullableStringFieldUpdateOperationsInput | string | null
    lastLogin?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    browserAgent?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlan?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlanExpireAt?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    referralCode?: NullableStringFieldUpdateOperationsInput | string | null
    softDelete?: NullableBoolFieldUpdateOperationsInput | boolean | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    countryCode?: NullableStringFieldUpdateOperationsInput | string | null
    stateCode?: NullableStringFieldUpdateOperationsInput | string | null
    subDivisionCode?: NullableStringFieldUpdateOperationsInput | string | null
    subDivisionName?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    hasOnboarded?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Payment?: PaymentUpdateManyWithoutUserNestedInput
    Ticket?: TicketUpdateManyWithoutUserNestedInput
    SurveyInterest?: SurveyInterestUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutBillingInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    emailVerifiedAt?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    alternatePhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    employmentStatus?: NullableStringFieldUpdateOperationsInput | string | null
    mostPreferredCommsChannel?: NullableStringFieldUpdateOperationsInput | string | null
    howYouGotToKnowUs?: NullableStringFieldUpdateOperationsInput | string | null
    profilePhoto?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorAuth?: NullableStringFieldUpdateOperationsInput | string | null
    lastLogin?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    browserAgent?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlan?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlanExpireAt?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    referralCode?: NullableStringFieldUpdateOperationsInput | string | null
    softDelete?: NullableBoolFieldUpdateOperationsInput | boolean | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    countryCode?: NullableStringFieldUpdateOperationsInput | string | null
    stateCode?: NullableStringFieldUpdateOperationsInput | string | null
    subDivisionCode?: NullableStringFieldUpdateOperationsInput | string | null
    subDivisionName?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    hasOnboarded?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Payment?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    Ticket?: TicketUncheckedUpdateManyWithoutUserNestedInput
    SurveyInterest?: SurveyInterestUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutPaymentInput = {
    email: string
    emailVerifiedAt?: string | null
    password: string
    username?: string | null
    phoneNumber?: string | null
    alternatePhoneNumber?: string | null
    country?: string | null
    state?: string | null
    employmentStatus?: string | null
    mostPreferredCommsChannel?: string | null
    howYouGotToKnowUs?: string | null
    profilePhoto?: string | null
    dob?: Date | string | null
    gender?: string | null
    location?: string | null
    occupation?: string | null
    role?: string | null
    isActive?: string | null
    twoFactorAuth?: string | null
    lastLogin?: string | null
    ipAddress?: string | null
    browserAgent?: string | null
    subscriptionPlan?: string | null
    subscriptionPlanExpireAt?: string | null
    bio?: string | null
    referralCode?: string | null
    softDelete?: boolean | null
    firstName?: string | null
    lastName?: string | null
    countryCode?: string | null
    stateCode?: string | null
    subDivisionCode?: string | null
    subDivisionName?: string | null
    address?: string | null
    hasOnboarded?: boolean | null
    createdAt?: Date | string
    Ticket?: TicketCreateNestedManyWithoutUserInput
    Billing?: BillingCreateNestedOneWithoutUserInput
    SurveyInterest?: SurveyInterestCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPaymentInput = {
    id?: number
    email: string
    emailVerifiedAt?: string | null
    password: string
    username?: string | null
    phoneNumber?: string | null
    alternatePhoneNumber?: string | null
    country?: string | null
    state?: string | null
    employmentStatus?: string | null
    mostPreferredCommsChannel?: string | null
    howYouGotToKnowUs?: string | null
    profilePhoto?: string | null
    dob?: Date | string | null
    gender?: string | null
    location?: string | null
    occupation?: string | null
    role?: string | null
    isActive?: string | null
    twoFactorAuth?: string | null
    lastLogin?: string | null
    ipAddress?: string | null
    browserAgent?: string | null
    subscriptionPlan?: string | null
    subscriptionPlanExpireAt?: string | null
    billingId?: number | null
    bio?: string | null
    referralCode?: string | null
    softDelete?: boolean | null
    firstName?: string | null
    lastName?: string | null
    countryCode?: string | null
    stateCode?: string | null
    subDivisionCode?: string | null
    subDivisionName?: string | null
    address?: string | null
    hasOnboarded?: boolean | null
    createdAt?: Date | string
    Ticket?: TicketUncheckedCreateNestedManyWithoutUserInput
    SurveyInterest?: SurveyInterestUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPaymentInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPaymentInput, UserUncheckedCreateWithoutPaymentInput>
  }

  export type UserUpsertWithoutPaymentInput = {
    update: XOR<UserUpdateWithoutPaymentInput, UserUncheckedUpdateWithoutPaymentInput>
    create: XOR<UserCreateWithoutPaymentInput, UserUncheckedCreateWithoutPaymentInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPaymentInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPaymentInput, UserUncheckedUpdateWithoutPaymentInput>
  }

  export type UserUpdateWithoutPaymentInput = {
    email?: StringFieldUpdateOperationsInput | string
    emailVerifiedAt?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    alternatePhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    employmentStatus?: NullableStringFieldUpdateOperationsInput | string | null
    mostPreferredCommsChannel?: NullableStringFieldUpdateOperationsInput | string | null
    howYouGotToKnowUs?: NullableStringFieldUpdateOperationsInput | string | null
    profilePhoto?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorAuth?: NullableStringFieldUpdateOperationsInput | string | null
    lastLogin?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    browserAgent?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlan?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlanExpireAt?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    referralCode?: NullableStringFieldUpdateOperationsInput | string | null
    softDelete?: NullableBoolFieldUpdateOperationsInput | boolean | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    countryCode?: NullableStringFieldUpdateOperationsInput | string | null
    stateCode?: NullableStringFieldUpdateOperationsInput | string | null
    subDivisionCode?: NullableStringFieldUpdateOperationsInput | string | null
    subDivisionName?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    hasOnboarded?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Ticket?: TicketUpdateManyWithoutUserNestedInput
    Billing?: BillingUpdateOneWithoutUserNestedInput
    SurveyInterest?: SurveyInterestUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPaymentInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    emailVerifiedAt?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    alternatePhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    employmentStatus?: NullableStringFieldUpdateOperationsInput | string | null
    mostPreferredCommsChannel?: NullableStringFieldUpdateOperationsInput | string | null
    howYouGotToKnowUs?: NullableStringFieldUpdateOperationsInput | string | null
    profilePhoto?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorAuth?: NullableStringFieldUpdateOperationsInput | string | null
    lastLogin?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    browserAgent?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlan?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlanExpireAt?: NullableStringFieldUpdateOperationsInput | string | null
    billingId?: NullableIntFieldUpdateOperationsInput | number | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    referralCode?: NullableStringFieldUpdateOperationsInput | string | null
    softDelete?: NullableBoolFieldUpdateOperationsInput | boolean | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    countryCode?: NullableStringFieldUpdateOperationsInput | string | null
    stateCode?: NullableStringFieldUpdateOperationsInput | string | null
    subDivisionCode?: NullableStringFieldUpdateOperationsInput | string | null
    subDivisionName?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    hasOnboarded?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Ticket?: TicketUncheckedUpdateManyWithoutUserNestedInput
    SurveyInterest?: SurveyInterestUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSurveyInterestInput = {
    email: string
    emailVerifiedAt?: string | null
    password: string
    username?: string | null
    phoneNumber?: string | null
    alternatePhoneNumber?: string | null
    country?: string | null
    state?: string | null
    employmentStatus?: string | null
    mostPreferredCommsChannel?: string | null
    howYouGotToKnowUs?: string | null
    profilePhoto?: string | null
    dob?: Date | string | null
    gender?: string | null
    location?: string | null
    occupation?: string | null
    role?: string | null
    isActive?: string | null
    twoFactorAuth?: string | null
    lastLogin?: string | null
    ipAddress?: string | null
    browserAgent?: string | null
    subscriptionPlan?: string | null
    subscriptionPlanExpireAt?: string | null
    bio?: string | null
    referralCode?: string | null
    softDelete?: boolean | null
    firstName?: string | null
    lastName?: string | null
    countryCode?: string | null
    stateCode?: string | null
    subDivisionCode?: string | null
    subDivisionName?: string | null
    address?: string | null
    hasOnboarded?: boolean | null
    createdAt?: Date | string
    Payment?: PaymentCreateNestedManyWithoutUserInput
    Ticket?: TicketCreateNestedManyWithoutUserInput
    Billing?: BillingCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSurveyInterestInput = {
    id?: number
    email: string
    emailVerifiedAt?: string | null
    password: string
    username?: string | null
    phoneNumber?: string | null
    alternatePhoneNumber?: string | null
    country?: string | null
    state?: string | null
    employmentStatus?: string | null
    mostPreferredCommsChannel?: string | null
    howYouGotToKnowUs?: string | null
    profilePhoto?: string | null
    dob?: Date | string | null
    gender?: string | null
    location?: string | null
    occupation?: string | null
    role?: string | null
    isActive?: string | null
    twoFactorAuth?: string | null
    lastLogin?: string | null
    ipAddress?: string | null
    browserAgent?: string | null
    subscriptionPlan?: string | null
    subscriptionPlanExpireAt?: string | null
    billingId?: number | null
    bio?: string | null
    referralCode?: string | null
    softDelete?: boolean | null
    firstName?: string | null
    lastName?: string | null
    countryCode?: string | null
    stateCode?: string | null
    subDivisionCode?: string | null
    subDivisionName?: string | null
    address?: string | null
    hasOnboarded?: boolean | null
    createdAt?: Date | string
    Payment?: PaymentUncheckedCreateNestedManyWithoutUserInput
    Ticket?: TicketUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSurveyInterestInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSurveyInterestInput, UserUncheckedCreateWithoutSurveyInterestInput>
  }

  export type UserUpsertWithWhereUniqueWithoutSurveyInterestInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutSurveyInterestInput, UserUncheckedUpdateWithoutSurveyInterestInput>
    create: XOR<UserCreateWithoutSurveyInterestInput, UserUncheckedCreateWithoutSurveyInterestInput>
  }

  export type UserUpdateWithWhereUniqueWithoutSurveyInterestInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutSurveyInterestInput, UserUncheckedUpdateWithoutSurveyInterestInput>
  }

  export type UserUpdateManyWithWhereWithoutSurveyInterestInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutSurveyInterestInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    emailVerifiedAt?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    username?: StringNullableFilter<"User"> | string | null
    phoneNumber?: StringNullableFilter<"User"> | string | null
    alternatePhoneNumber?: StringNullableFilter<"User"> | string | null
    country?: StringNullableFilter<"User"> | string | null
    state?: StringNullableFilter<"User"> | string | null
    employmentStatus?: StringNullableFilter<"User"> | string | null
    mostPreferredCommsChannel?: StringNullableFilter<"User"> | string | null
    howYouGotToKnowUs?: StringNullableFilter<"User"> | string | null
    profilePhoto?: StringNullableFilter<"User"> | string | null
    dob?: DateTimeNullableFilter<"User"> | Date | string | null
    gender?: StringNullableFilter<"User"> | string | null
    location?: StringNullableFilter<"User"> | string | null
    occupation?: StringNullableFilter<"User"> | string | null
    role?: StringNullableFilter<"User"> | string | null
    isActive?: StringNullableFilter<"User"> | string | null
    twoFactorAuth?: StringNullableFilter<"User"> | string | null
    lastLogin?: StringNullableFilter<"User"> | string | null
    ipAddress?: StringNullableFilter<"User"> | string | null
    browserAgent?: StringNullableFilter<"User"> | string | null
    subscriptionPlan?: StringNullableFilter<"User"> | string | null
    subscriptionPlanExpireAt?: StringNullableFilter<"User"> | string | null
    billingId?: IntNullableFilter<"User"> | number | null
    bio?: StringNullableFilter<"User"> | string | null
    referralCode?: StringNullableFilter<"User"> | string | null
    softDelete?: BoolNullableFilter<"User"> | boolean | null
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    countryCode?: StringNullableFilter<"User"> | string | null
    stateCode?: StringNullableFilter<"User"> | string | null
    subDivisionCode?: StringNullableFilter<"User"> | string | null
    subDivisionName?: StringNullableFilter<"User"> | string | null
    address?: StringNullableFilter<"User"> | string | null
    hasOnboarded?: BoolNullableFilter<"User"> | boolean | null
    createdAt?: DateTimeFilter<"User"> | Date | string
  }

  export type UserCreateWithoutTicketInput = {
    email: string
    emailVerifiedAt?: string | null
    password: string
    username?: string | null
    phoneNumber?: string | null
    alternatePhoneNumber?: string | null
    country?: string | null
    state?: string | null
    employmentStatus?: string | null
    mostPreferredCommsChannel?: string | null
    howYouGotToKnowUs?: string | null
    profilePhoto?: string | null
    dob?: Date | string | null
    gender?: string | null
    location?: string | null
    occupation?: string | null
    role?: string | null
    isActive?: string | null
    twoFactorAuth?: string | null
    lastLogin?: string | null
    ipAddress?: string | null
    browserAgent?: string | null
    subscriptionPlan?: string | null
    subscriptionPlanExpireAt?: string | null
    bio?: string | null
    referralCode?: string | null
    softDelete?: boolean | null
    firstName?: string | null
    lastName?: string | null
    countryCode?: string | null
    stateCode?: string | null
    subDivisionCode?: string | null
    subDivisionName?: string | null
    address?: string | null
    hasOnboarded?: boolean | null
    createdAt?: Date | string
    Payment?: PaymentCreateNestedManyWithoutUserInput
    Billing?: BillingCreateNestedOneWithoutUserInput
    SurveyInterest?: SurveyInterestCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTicketInput = {
    id?: number
    email: string
    emailVerifiedAt?: string | null
    password: string
    username?: string | null
    phoneNumber?: string | null
    alternatePhoneNumber?: string | null
    country?: string | null
    state?: string | null
    employmentStatus?: string | null
    mostPreferredCommsChannel?: string | null
    howYouGotToKnowUs?: string | null
    profilePhoto?: string | null
    dob?: Date | string | null
    gender?: string | null
    location?: string | null
    occupation?: string | null
    role?: string | null
    isActive?: string | null
    twoFactorAuth?: string | null
    lastLogin?: string | null
    ipAddress?: string | null
    browserAgent?: string | null
    subscriptionPlan?: string | null
    subscriptionPlanExpireAt?: string | null
    billingId?: number | null
    bio?: string | null
    referralCode?: string | null
    softDelete?: boolean | null
    firstName?: string | null
    lastName?: string | null
    countryCode?: string | null
    stateCode?: string | null
    subDivisionCode?: string | null
    subDivisionName?: string | null
    address?: string | null
    hasOnboarded?: boolean | null
    createdAt?: Date | string
    Payment?: PaymentUncheckedCreateNestedManyWithoutUserInput
    SurveyInterest?: SurveyInterestUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTicketInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTicketInput, UserUncheckedCreateWithoutTicketInput>
  }

  export type UserUpsertWithoutTicketInput = {
    update: XOR<UserUpdateWithoutTicketInput, UserUncheckedUpdateWithoutTicketInput>
    create: XOR<UserCreateWithoutTicketInput, UserUncheckedCreateWithoutTicketInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTicketInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTicketInput, UserUncheckedUpdateWithoutTicketInput>
  }

  export type UserUpdateWithoutTicketInput = {
    email?: StringFieldUpdateOperationsInput | string
    emailVerifiedAt?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    alternatePhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    employmentStatus?: NullableStringFieldUpdateOperationsInput | string | null
    mostPreferredCommsChannel?: NullableStringFieldUpdateOperationsInput | string | null
    howYouGotToKnowUs?: NullableStringFieldUpdateOperationsInput | string | null
    profilePhoto?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorAuth?: NullableStringFieldUpdateOperationsInput | string | null
    lastLogin?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    browserAgent?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlan?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlanExpireAt?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    referralCode?: NullableStringFieldUpdateOperationsInput | string | null
    softDelete?: NullableBoolFieldUpdateOperationsInput | boolean | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    countryCode?: NullableStringFieldUpdateOperationsInput | string | null
    stateCode?: NullableStringFieldUpdateOperationsInput | string | null
    subDivisionCode?: NullableStringFieldUpdateOperationsInput | string | null
    subDivisionName?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    hasOnboarded?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Payment?: PaymentUpdateManyWithoutUserNestedInput
    Billing?: BillingUpdateOneWithoutUserNestedInput
    SurveyInterest?: SurveyInterestUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTicketInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    emailVerifiedAt?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    alternatePhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    employmentStatus?: NullableStringFieldUpdateOperationsInput | string | null
    mostPreferredCommsChannel?: NullableStringFieldUpdateOperationsInput | string | null
    howYouGotToKnowUs?: NullableStringFieldUpdateOperationsInput | string | null
    profilePhoto?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorAuth?: NullableStringFieldUpdateOperationsInput | string | null
    lastLogin?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    browserAgent?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlan?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlanExpireAt?: NullableStringFieldUpdateOperationsInput | string | null
    billingId?: NullableIntFieldUpdateOperationsInput | number | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    referralCode?: NullableStringFieldUpdateOperationsInput | string | null
    softDelete?: NullableBoolFieldUpdateOperationsInput | boolean | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    countryCode?: NullableStringFieldUpdateOperationsInput | string | null
    stateCode?: NullableStringFieldUpdateOperationsInput | string | null
    subDivisionCode?: NullableStringFieldUpdateOperationsInput | string | null
    subDivisionName?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    hasOnboarded?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Payment?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    SurveyInterest?: SurveyInterestUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PaymentCreateWithoutUserInput = {
    amount: number
    currency?: string
    status?: string
    method?: string | null
    reference: string
    description?: string | null
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type PaymentUncheckedCreateWithoutUserInput = {
    id?: number
    amount: number
    currency?: string
    status?: string
    method?: string | null
    reference: string
    description?: string | null
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type PaymentCreateOrConnectWithoutUserInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput>
  }

  export type PaymentCreateManyUserInputEnvelope = {
    data: PaymentCreateManyUserInput | PaymentCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TicketCreateWithoutUserInput = {
    subject: string
    description?: string | null
    status?: string
    priority?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type TicketUncheckedCreateWithoutUserInput = {
    id?: number
    subject: string
    description?: string | null
    status?: string
    priority?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type TicketCreateOrConnectWithoutUserInput = {
    where: TicketWhereUniqueInput
    create: XOR<TicketCreateWithoutUserInput, TicketUncheckedCreateWithoutUserInput>
  }

  export type TicketCreateManyUserInputEnvelope = {
    data: TicketCreateManyUserInput | TicketCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type BillingCreateWithoutUserInput = {
    planName: string
    amount: number
    currency: string
    expiresAt?: Date | string | null
  }

  export type BillingUncheckedCreateWithoutUserInput = {
    id?: number
    planName: string
    amount: number
    currency: string
    expiresAt?: Date | string | null
  }

  export type BillingCreateOrConnectWithoutUserInput = {
    where: BillingWhereUniqueInput
    create: XOR<BillingCreateWithoutUserInput, BillingUncheckedCreateWithoutUserInput>
  }

  export type SurveyInterestCreateWithoutUserInput = {
    name: string
  }

  export type SurveyInterestUncheckedCreateWithoutUserInput = {
    id?: number
    name: string
  }

  export type SurveyInterestCreateOrConnectWithoutUserInput = {
    where: SurveyInterestWhereUniqueInput
    create: XOR<SurveyInterestCreateWithoutUserInput, SurveyInterestUncheckedCreateWithoutUserInput>
  }

  export type PaymentUpsertWithWhereUniqueWithoutUserInput = {
    where: PaymentWhereUniqueInput
    update: XOR<PaymentUpdateWithoutUserInput, PaymentUncheckedUpdateWithoutUserInput>
    create: XOR<PaymentCreateWithoutUserInput, PaymentUncheckedCreateWithoutUserInput>
  }

  export type PaymentUpdateWithWhereUniqueWithoutUserInput = {
    where: PaymentWhereUniqueInput
    data: XOR<PaymentUpdateWithoutUserInput, PaymentUncheckedUpdateWithoutUserInput>
  }

  export type PaymentUpdateManyWithWhereWithoutUserInput = {
    where: PaymentScalarWhereInput
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutUserInput>
  }

  export type PaymentScalarWhereInput = {
    AND?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    OR?: PaymentScalarWhereInput[]
    NOT?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    id?: IntFilter<"Payment"> | number
    amount?: FloatFilter<"Payment"> | number
    currency?: StringFilter<"Payment"> | string
    status?: StringFilter<"Payment"> | string
    method?: StringNullableFilter<"Payment"> | string | null
    reference?: StringFilter<"Payment"> | string
    description?: StringNullableFilter<"Payment"> | string | null
    paidAt?: DateTimeNullableFilter<"Payment"> | Date | string | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    userId?: IntFilter<"Payment"> | number
  }

  export type TicketUpsertWithWhereUniqueWithoutUserInput = {
    where: TicketWhereUniqueInput
    update: XOR<TicketUpdateWithoutUserInput, TicketUncheckedUpdateWithoutUserInput>
    create: XOR<TicketCreateWithoutUserInput, TicketUncheckedCreateWithoutUserInput>
  }

  export type TicketUpdateWithWhereUniqueWithoutUserInput = {
    where: TicketWhereUniqueInput
    data: XOR<TicketUpdateWithoutUserInput, TicketUncheckedUpdateWithoutUserInput>
  }

  export type TicketUpdateManyWithWhereWithoutUserInput = {
    where: TicketScalarWhereInput
    data: XOR<TicketUpdateManyMutationInput, TicketUncheckedUpdateManyWithoutUserInput>
  }

  export type TicketScalarWhereInput = {
    AND?: TicketScalarWhereInput | TicketScalarWhereInput[]
    OR?: TicketScalarWhereInput[]
    NOT?: TicketScalarWhereInput | TicketScalarWhereInput[]
    id?: IntFilter<"Ticket"> | number
    subject?: StringFilter<"Ticket"> | string
    description?: StringNullableFilter<"Ticket"> | string | null
    status?: StringFilter<"Ticket"> | string
    priority?: StringNullableFilter<"Ticket"> | string | null
    createdAt?: DateTimeFilter<"Ticket"> | Date | string
    updatedAt?: DateTimeFilter<"Ticket"> | Date | string
    userId?: IntFilter<"Ticket"> | number
  }

  export type BillingUpsertWithoutUserInput = {
    update: XOR<BillingUpdateWithoutUserInput, BillingUncheckedUpdateWithoutUserInput>
    create: XOR<BillingCreateWithoutUserInput, BillingUncheckedCreateWithoutUserInput>
    where?: BillingWhereInput
  }

  export type BillingUpdateToOneWithWhereWithoutUserInput = {
    where?: BillingWhereInput
    data: XOR<BillingUpdateWithoutUserInput, BillingUncheckedUpdateWithoutUserInput>
  }

  export type BillingUpdateWithoutUserInput = {
    planName?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BillingUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    planName?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SurveyInterestUpsertWithWhereUniqueWithoutUserInput = {
    where: SurveyInterestWhereUniqueInput
    update: XOR<SurveyInterestUpdateWithoutUserInput, SurveyInterestUncheckedUpdateWithoutUserInput>
    create: XOR<SurveyInterestCreateWithoutUserInput, SurveyInterestUncheckedCreateWithoutUserInput>
  }

  export type SurveyInterestUpdateWithWhereUniqueWithoutUserInput = {
    where: SurveyInterestWhereUniqueInput
    data: XOR<SurveyInterestUpdateWithoutUserInput, SurveyInterestUncheckedUpdateWithoutUserInput>
  }

  export type SurveyInterestUpdateManyWithWhereWithoutUserInput = {
    where: SurveyInterestScalarWhereInput
    data: XOR<SurveyInterestUpdateManyMutationInput, SurveyInterestUncheckedUpdateManyWithoutUserInput>
  }

  export type SurveyInterestScalarWhereInput = {
    AND?: SurveyInterestScalarWhereInput | SurveyInterestScalarWhereInput[]
    OR?: SurveyInterestScalarWhereInput[]
    NOT?: SurveyInterestScalarWhereInput | SurveyInterestScalarWhereInput[]
    id?: IntFilter<"SurveyInterest"> | number
    name?: StringFilter<"SurveyInterest"> | string
  }

  export type UserUpdateWithoutSurveyInterestInput = {
    email?: StringFieldUpdateOperationsInput | string
    emailVerifiedAt?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    alternatePhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    employmentStatus?: NullableStringFieldUpdateOperationsInput | string | null
    mostPreferredCommsChannel?: NullableStringFieldUpdateOperationsInput | string | null
    howYouGotToKnowUs?: NullableStringFieldUpdateOperationsInput | string | null
    profilePhoto?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorAuth?: NullableStringFieldUpdateOperationsInput | string | null
    lastLogin?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    browserAgent?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlan?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlanExpireAt?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    referralCode?: NullableStringFieldUpdateOperationsInput | string | null
    softDelete?: NullableBoolFieldUpdateOperationsInput | boolean | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    countryCode?: NullableStringFieldUpdateOperationsInput | string | null
    stateCode?: NullableStringFieldUpdateOperationsInput | string | null
    subDivisionCode?: NullableStringFieldUpdateOperationsInput | string | null
    subDivisionName?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    hasOnboarded?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Payment?: PaymentUpdateManyWithoutUserNestedInput
    Ticket?: TicketUpdateManyWithoutUserNestedInput
    Billing?: BillingUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSurveyInterestInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    emailVerifiedAt?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    alternatePhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    employmentStatus?: NullableStringFieldUpdateOperationsInput | string | null
    mostPreferredCommsChannel?: NullableStringFieldUpdateOperationsInput | string | null
    howYouGotToKnowUs?: NullableStringFieldUpdateOperationsInput | string | null
    profilePhoto?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorAuth?: NullableStringFieldUpdateOperationsInput | string | null
    lastLogin?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    browserAgent?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlan?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlanExpireAt?: NullableStringFieldUpdateOperationsInput | string | null
    billingId?: NullableIntFieldUpdateOperationsInput | number | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    referralCode?: NullableStringFieldUpdateOperationsInput | string | null
    softDelete?: NullableBoolFieldUpdateOperationsInput | boolean | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    countryCode?: NullableStringFieldUpdateOperationsInput | string | null
    stateCode?: NullableStringFieldUpdateOperationsInput | string | null
    subDivisionCode?: NullableStringFieldUpdateOperationsInput | string | null
    subDivisionName?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    hasOnboarded?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Payment?: PaymentUncheckedUpdateManyWithoutUserNestedInput
    Ticket?: TicketUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutSurveyInterestInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    emailVerifiedAt?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    username?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    alternatePhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    employmentStatus?: NullableStringFieldUpdateOperationsInput | string | null
    mostPreferredCommsChannel?: NullableStringFieldUpdateOperationsInput | string | null
    howYouGotToKnowUs?: NullableStringFieldUpdateOperationsInput | string | null
    profilePhoto?: NullableStringFieldUpdateOperationsInput | string | null
    dob?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    gender?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    occupation?: NullableStringFieldUpdateOperationsInput | string | null
    role?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: NullableStringFieldUpdateOperationsInput | string | null
    twoFactorAuth?: NullableStringFieldUpdateOperationsInput | string | null
    lastLogin?: NullableStringFieldUpdateOperationsInput | string | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    browserAgent?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlan?: NullableStringFieldUpdateOperationsInput | string | null
    subscriptionPlanExpireAt?: NullableStringFieldUpdateOperationsInput | string | null
    billingId?: NullableIntFieldUpdateOperationsInput | number | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    referralCode?: NullableStringFieldUpdateOperationsInput | string | null
    softDelete?: NullableBoolFieldUpdateOperationsInput | boolean | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    countryCode?: NullableStringFieldUpdateOperationsInput | string | null
    stateCode?: NullableStringFieldUpdateOperationsInput | string | null
    subDivisionCode?: NullableStringFieldUpdateOperationsInput | string | null
    subDivisionName?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    hasOnboarded?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateManyUserInput = {
    id?: number
    amount: number
    currency?: string
    status?: string
    method?: string | null
    reference: string
    description?: string | null
    paidAt?: Date | string | null
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type TicketCreateManyUserInput = {
    id?: number
    subject: string
    description?: string | null
    status?: string
    priority?: string | null
    createdAt?: Date | string
    updatedAt: Date | string
  }

  export type PaymentUpdateWithoutUserInput = {
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    method?: NullableStringFieldUpdateOperationsInput | string | null
    reference?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    method?: NullableStringFieldUpdateOperationsInput | string | null
    reference?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    method?: NullableStringFieldUpdateOperationsInput | string | null
    reference?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    paidAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketUpdateWithoutUserInput = {
    subject?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    subject?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    subject?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    priority?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SurveyInterestUpdateWithoutUserInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type SurveyInterestUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type SurveyInterestUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}