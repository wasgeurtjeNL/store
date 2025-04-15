declare module '@adminjs/sql' {
  export interface SqlResourceOptions {
    knex?: any;
    tableName: string;
    client?: string;
    connectionString?: string;
    properties?: Record<string, any>;
    idProperty?: string;
  }
  
  export class SqlResource {
    constructor(options: SqlResourceOptions);
    id(): string;
    databaseName(): string;
    properties(): Record<string, any>;
    property(name: string): any;
    count(filters: any): Promise<number>;
    find(filters: any, options: any): Promise<Array<Record<string, any>>>;
    findOne(id: string): Promise<Record<string, any> | null>;
    findMany(ids: Array<string>): Promise<Array<Record<string, any>>>;
    create(data: Record<string, any>): Promise<Record<string, any>>;
    update(id: string, data: Record<string, any>): Promise<Record<string, any>>;
    delete(id: string): Promise<void>;
  }
} 