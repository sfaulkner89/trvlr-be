import { Request, Response } from 'express'
import fetch from 'node-fetch'
import dotenv from 'dotenv'

dotenv.config()

export default async (req: Request, res: Response) => {
  const latitude: string = String(req.query.latitude)
  const longitude: string = String(req.query.longitude)
  const place = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude.slice(
      0,
      9
    )},${longitude.slice(0, 9)}&key=${process.env.GOOGLE_API_KEY}`
  )
    .then(place => place.json())
    .catch(err => console.error(err))
  res.status(200).json(place.results[0].address_components)
}
