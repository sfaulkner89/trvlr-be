import { Request, Response } from 'express'
import fetch from 'node-fetch'

export default async (req: Request, res: Response) => {
  const location = `${req.query.latitude}%2C${req.query.longitude}`
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&rankby=distance&key=${process.env.GOOGLE_API_KEY}`
  const results = await (await fetch(url)).json()
  if (results.results[0])
    res.status(200).json(
      [results.results[0]].map(place => {
        return {
          location: place?.geometry?.location,
          placeId: place.place_id,
          names: {
            main_text: place.name,
            secondary_text: place.vicinity
          }
        }
      })[0]
    )
  else res.status(200).json(null)
}
