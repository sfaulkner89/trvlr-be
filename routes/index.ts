import express from 'express'
import getMapAreaName from '../handlers/googleServices/getMapAreaName'
import { Request, Response } from 'express'

const router = express.Router()

router.get('/get-map-area-name', (req: Request, res: Response) =>
  getMapAreaName(req, res)
)

export default router
