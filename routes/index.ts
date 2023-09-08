import express from 'express'
import getMapAreaName from '../handlers/googleServices/getMapAreaName'
import { Request, Response } from 'express'
import placeFinder from '../handlers/googleServices/placeFinder'
import nearbySearch from '../handlers/googleServices/nearbySearch'

const router = express.Router()

router.get('/get-map-area-name', (req: Request, res: Response) =>
  getMapAreaName(req, res)
)
router.get('/place-search', (req: Request, res: Response) =>
  placeFinder(req, res)
)
router.get('/nearby-search', (req: Request, res: Response) => {
  console.log('poo')
  nearbySearch(req, res)
})

export default router
