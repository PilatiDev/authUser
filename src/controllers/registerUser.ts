import {Request, Response} from "express";

export async function registerUser(req:Request, res:Response) {
    const insert = `INSERT INTO user (name, cpf, pass, permission)
                    VALUES ("${req.body.name}", "${req.body.cpf}", "${req.body.pass}", ${req.body.permission});`;
                    console.log(insert);
                    res.status(200).json("ok");
}