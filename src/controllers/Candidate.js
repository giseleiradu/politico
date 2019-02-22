import dotenv from 'dotenv';
import db from '../database/db';

dotenv.config();

class Candidate {
    /* Posting a candidate */
    static async candidateReg(req, res){
        const text = `INSERT INTO
                candidates(officeid, partyid, candidateid)
                VALUES($1, $2, $3)
                returning *`;
        const values = [
            req.params.id,
            req.body.partyId,
            req.body.userId,
        ];
        try{
            const checkCandidate = await db.query(`SELECT * FROM candidates WHERE officeid = $1`,[req.params.id])
            if (checkCandidate.rows.lenghth > 0){
                return res.status(422).json({
                    status: 422,
                    error: 'sorry, This candidate is already registered',
                });
            }
            const {rows } = await db.query(text, values);

            if (rows.length > 0){
                return res.status(201).json({
                    status : 201,
                    data: rows,
                });
            }
        } catch (error){
            console.log(error);
        }
        return res.status(200).json({
            status: 200,
            error: 'Sorry, something wemt wrong, Candidate registration failed!'
        });
    }
}

export default Candidate;
