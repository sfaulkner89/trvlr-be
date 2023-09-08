import { Request, Response } from 'express'
import fetch from 'node-fetch'

export default async (req: Request, res: Response) => {
  const search = req.query.search
  const location = `${req.query.latitude}%2C${req.query.longitude}`
  const radius: number =
    typeof req.query.radius === 'string'
      ? parseFloat(req.query.radius) * 10
      : 500
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${search}&key=${process.env.GOOGLE_API_KEY}&location=${location}&radius=${radius}`
  const results: google.maps.places.AutocompleteResponse = await (
    await fetch(url)
  )
    .json()
    .catch(err => {
      console.log(err)
    })
  const resultsShim = results.predictions.map(pred => {
    return {
      description: pred.description,
      placeId: pred.place_id,
      names: pred.structured_formatting
    }
  })
  res.status(200).json(resultsShim)
}
