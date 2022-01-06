import { Request, Response, NextFunction } from 'express';


export default function log(msg) {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log(111111111, msg);
    next();
  };
}