"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MariadbRepo = void 0;
const mariadb = __importStar(require("mariadb"));
class MariadbRepo {
    constructor(HOST, PORT, USER, PASS, DEBUG_REPO, DEBUG_REPO_CONTENT) {
        this.DEBUG_REPO = DEBUG_REPO;
        this.DEBUG_REPO_CONTENT = DEBUG_REPO_CONTENT;
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
    query(query, values = [], database) {
        return __awaiter(this, void 0, void 0, function* () {
            let connection;
            let res;
            try {
                console.log(`[REPO::MARIADB::QUERY] Criando conexão.`, this.DEBUG_REPO && this.DEBUG_REPO_CONTENT);
                let tempPoll = this.POOLCFG;
                tempPoll.database = database;
                connection = yield mariadb.createConnection(tempPoll);
                console.log(`[REPO::MARIADB::QUERY] Enviando...\n  Query:\n    ${query}\n  Values:\n    ${values}`, this.DEBUG_REPO && this.DEBUG_REPO_CONTENT);
                res = yield connection.query(query, values);
                console.log(`[REPO::MARIADB::QUERY] Retornado:\n  ${JSON.stringify(res)}`, this.DEBUG_REPO && this.DEBUG_REPO_CONTENT);
            }
            catch (error) {
                console.log(`[REPO::MARIADB::QUERY] Erro: ${JSON.stringify(error)}`, this.DEBUG_REPO && this.DEBUG_REPO_CONTENT);
                throw error;
            }
            finally {
                if (connection) {
                    connection.end();
                }
            }
            return res;
        });
    }
    dump(sqls) {
        return __awaiter(this, void 0, void 0, function* () {
            let connection;
            let tempPoll = this.POOLCFG;
            tempPoll.database = undefined;
            let res = [];
            if (typeof sqls === "string")
                sqls = sqls.split(";");
            try {
                console.log("[REPO::MARIADB::DUMP] Criando conexão.", this.DEBUG_REPO && this.DEBUG_REPO_CONTENT);
                connection = yield mariadb.createConnection(this.POOLCFG);
                console.log(`[REPO::MARIADB::DUMP] Enviando arquivo para repositorio`, this.DEBUG_REPO && this.DEBUG_REPO_CONTENT);
                for (let sql of sqls)
                    if (sql.trim() !== "") {
                        res.push(yield connection.query(sql));
                    }
                console.log(`[REPO::MARIADB::DUMP] Dump enviado.`, this.DEBUG_REPO && this.DEBUG_REPO_CONTENT);
            }
            catch (error) {
                console.log(`[REPO::MARIADB::DUMP] Erro: ${JSON.stringify(error)}`);
                throw error;
            }
            finally {
                if (connection) {
                    connection.end();
                }
            }
            return res;
        });
    }
}
exports.MariadbRepo = MariadbRepo;
