import { Router } from 'express'

const router = Router()
const baseURL = '/'

router.get(baseURL, (_req, res) => res.status(200).send('Assalaamu Alaikum Wahaaj'))

export default router