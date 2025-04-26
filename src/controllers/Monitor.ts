import 'reflect-metadata';
import { Response } from 'express';
import { controller, all } from '../common/decorator';

@controller('/monitor')
class Monitor {

  @all('/report')
  public async hello(req, res: Response) {
    console.log('report:', req.body, req.query);
    res.json({
      code: 0,
      message: 'ok',
    });
  }
}

export default Monitor;