import express from 'express';
import { initializeFuse } from '../fuse/fuse';
import Fuse from 'fuse.js';

const router = express.Router();

let providerFuse: Fuse<any>;
let clinicFuse: Fuse<any>;

//Load on app start
initializeFuse().then((fuse) => {
  providerFuse = fuse.providerFuse;
  clinicFuse = fuse.clinicFuse;
});

//Search Route
router.get('/search', (req, res) => {
  const query = req.query.q?.toString().trim();
  const limit = Math.min(parseInt(req.query.limit?.toString() || '10', 10), 50);

  if (!query) return res.status(400).json({ message: 'No query provided' });

  const providerResults = providerFuse
    .search(query)
    .slice(0, limit)
    .map((r) => r.item);
  const clinicResults = clinicFuse
    .search(query)
    .slice(0, limit)
    .map((r) => r.item);

  res.json({ providers: providerResults, clinics: clinicResults });
});

export default router;
