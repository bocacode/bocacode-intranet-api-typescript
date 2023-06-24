import { RequestHandler } from "express";

export const checkRequestBody: RequestHandler = (req, res, next) => {
  if (!req.body || !req.body?.user_id){
    res.status(401).json({ error: 'Invalid request body' })
    return;
  }
  else {
    next()
  }
}