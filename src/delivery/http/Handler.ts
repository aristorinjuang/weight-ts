import  Repository from '../../repository/Repository';
import Usecase from '../../usecase/Usecase';
import { Router, Request, Response } from 'express';
import JSON from '../../factory/JSON';
import Weight from '../../entity/Weight';
import { body, param, validationResult, Result, ValidationError } from 'express-validator';

export default (repository: Repository, usecase: Usecase): Router => {
  const router: Router = Router();

  router.get('/', async (_: Request, res: Response): Promise<void> => {
    try {
      usecase.weights = await repository.list()

      res.status(200).json({
        'status': 'success',
        'message': '',
        'data': {
          'weights': JSON.weights(usecase.weights),
          'average': {
            'max': usecase.averageMax(),
            'min': usecase.averageMin(),
            'difference': usecase.averageDifference()
          }
        }
      }).end()
    } catch (err) {
      console.error(err);

      res.status(500).json({
        'status': 'error',
        'message': 'failed to get weights'
      }).end()
    }
  })

  router.post(
    '/',
    body('date').isDate(),
    body('max').isFloat({
      min: 2
    }),
    body('min').isFloat({
      min: 1
    }),
    async (req: Request, res: Response): Promise<void> => {
      let errors: Result<ValidationError> = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({
          'status': 'error',
          'message': errors.array(),
          'data': {}
        }).end()

        return;
      }

      if (req.body.max <= req.body.min) {
        res.status(400).json({
          'status': 'error',
          'message': 'max should be greater than min',
          'data': {}
        }).end()

        return;
      }

      let date : Date = new Date(req.body.date);

      try {
        await repository.create(new Weight(date, req.body.max, req.body.min));

        res.status(200).json({
          'status': 'success',
          'message': '',
          'data': {}
        }).end()
      } catch (err) {
        console.error(err);

        res.status(500).json({
          'status': 'error',
          'message': 'failed to create a weight'
        }).end()
      }
    }
  )

  router.get(
    '/:date',
    param('date').isDate(),
    async (req: Request, res: Response) => {
      let errors: Result<ValidationError> = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({
          'status': 'error',
          'message': errors.array(),
          'data': {}
        }).end()

        return;
      }

      try {
        let date: Date = new Date(req.params.date)
        let weight: Weight = await repository.read(date)

        if (!weight) {
          res.status(404).json({
            'status': 'error',
            'message': 'the weight does not exists',
            'data': {}
          }).end()
  
          return;
        }

        res.status(200).json({
          'status': 'success',
          'message': '',
          'data': {
            'weight': {
              'date': weight.date,
              'max': weight.max,
              'min': weight.min,
              'difference': weight.difference()
            }
          }
        }).end()
      } catch(err) {
        console.error(err);

        res.status(500).json({
          'status': 'error',
          'message': 'failed to get the weight'
        }).end()
      }
    }
  )

  router.put(
    '/:date',
    param('date').isDate(),
    body('max').isFloat({
      min: 2
    }),
    body('min').isFloat({
      min: 1
    }),
    async (req: Request, res: Response): Promise<void> => {
      let errors: Result<ValidationError> = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({
          'status': 'error',
          'message': errors.array(),
          'data': {}
        }).end()

        return;
      }

      if (req.body.max <= req.body.min) {
        res.status(400).json({
          'status': 'error',
          'message': 'max should be greater than min',
          'data': {}
        }).end()

        return;
      }

      let date: Date = new Date(req.params.date)

      try {
        await repository.update(new Weight(date, req.body.max, req.body.min))

        res.status(200).json({
          'status': 'success',
          'message': '',
          'data': {}
        }).end()
      } catch (err) {
        console.error(err);

        res.status(500).json({
          'status': 'error',
          'message': 'failed to update the weight'
        }).end()
      }
    } 
  )

  router.delete(
    '/:date',
    param('date').isDate(),
    async (req: Request, res: Response) => {
      let errors: Result<ValidationError> = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({
          'status': 'error',
          'message': errors.array(),
          'data': {}
        }).end()

        return;
      }

      let date: Date = new Date(req.params.date)

      try {
        await repository.delete(date)

        res.status(200).json({
          'status': 'success',
          'message': '',
          'data': {}
        }).end()
      } catch(err) {
        console.error(err);

        res.status(500).json({
          'status': 'error',
          'message': 'failed to delete the weight'
        }).end()
      }
    }
  )

  return router;
}