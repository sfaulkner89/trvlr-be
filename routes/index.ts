import express from 'express'
import getMapAreaName from '../handlers/googleServices/getMapAreaName'
import { Request, Response } from 'express'
import placeFinder from '../handlers/googleServices/placeFinder'

const router = express.Router()

router.get('/get-map-area-name', (req: Request, res: Response) =>
  getMapAreaName(req, res)
)
router.get('/place-search', (req: Request, res: Response) =>
  placeFinder(req, res)
)

export default router
