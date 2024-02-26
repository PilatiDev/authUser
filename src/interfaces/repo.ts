export interface Repo{
    query(query:string, values:Array<any>, dataBase:string):Promise<any[]>;
    dump(sql:Array<string>|string):Promise<any[][]>;
};