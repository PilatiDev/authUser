import * as mariadb from "mariadb";
import { Repo } from "../interfaces/repo";

class MariadbRepo implements Repo {
  readonly POOLCFG: mariadb.PoolConfig;

  constructor(
    HOST: string,
    PORT: number,
    USER: string,
    PASS: string,
    private readonly DEBUG_REPO: boolean,
    private readonly DEBUG_REPO_CONTENT: boolean
  ) {
    this.POOLCFG = {
      host: HOST,
      port: PORT,
      user: USER,
      password: PASS,
      connectionLimit: 5,
      connectTimeout: 5000,
    };
    console.log(`[REPO::MARIADB] Instanciado.`, DEBUG_REPO);
  }

  async query(
    query: string,
    values: Array<any> = [],
    database: string | undefined
  ): Promise<any> {
    let connection: mariadb.Connection | undefined;
    let res: any | undefined;
    try {
      console.log(
        `[REPO::MARIADB::QUERY] Criando conexão.`,
        this.DEBUG_REPO && this.DEBUG_REPO_CONTENT
      );
      let tempPoll = this.POOLCFG;
      tempPoll.database = database;
      connection = await mariadb.createConnection(tempPoll);

      console.log(
        `[REPO::MARIADB::QUERY] Enviando...\n  Query:\n    ${query}\n  Values:\n    ${values}`,
        this.DEBUG_REPO && this.DEBUG_REPO_CONTENT
      );
      res = await connection.query(query, values);
      console.log(
        `[REPO::MARIADB::QUERY] Retornado:\n  ${JSON.stringify(res)}`,
        this.DEBUG_REPO && this.DEBUG_REPO_CONTENT
      );
    } catch (error) {
      console.log(
        `[REPO::MARIADB::QUERY] Erro: ${JSON.stringify(error)}`,
        this.DEBUG_REPO && this.DEBUG_REPO_CONTENT
      );
      throw error;
    } finally {
      if (connection) {
        connection.end();
      }
    }
    return res;
  }

  async dump(sqls: Array<string> | string): Promise<any[][]> {
    let connection: mariadb.Connection | undefined;
    let tempPoll = this.POOLCFG;
    tempPoll.database = undefined;

    let res: Array<Array<any>> = [];
    if (typeof sqls === "string") sqls = sqls.split(";");

    try {
      console.log(
        "[REPO::MARIADB::DUMP] Criando conexão.",
        this.DEBUG_REPO && this.DEBUG_REPO_CONTENT
      );
      connection = await mariadb.createConnection(this.POOLCFG);

      console.log(
        `[REPO::MARIADB::DUMP] Enviando arquivo para repositorio`,
        this.DEBUG_REPO && this.DEBUG_REPO_CONTENT
      );
      for (let sql of sqls)
        if (sql.trim() !== "") {
          res.push(await connection.query(sql));
        }
      console.log(
        `[REPO::MARIADB::DUMP] Dump enviado.`,
        this.DEBUG_REPO && this.DEBUG_REPO_CONTENT
      );
    } catch (error) {
      console.log(`[REPO::MARIADB::DUMP] Erro: ${JSON.stringify(error)}`);
      throw error;
    } finally {
      if (connection) {
        connection.end();
      }
    }
    return res;
  }
}

export { MariadbRepo };
