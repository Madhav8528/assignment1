import db from "../config/db.js";
import {asyncHandler} from "../utils/asyncHandler.js";

const haversineDistance = (lat1, lon1, lat2, lon2) => {

  const toRad = x => (x * Math.PI) / 180
  const R = 6371
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon/2)**2
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R*c;
}

const addSchool = asyncHandler( async (req, res) => {
    
    const { name, address, latitude, longitude } = req.body

    if (!name || !address || isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({ error: 'Invalid input data' });
    }
    //console.log(name);
    
    const sql = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, address, latitude, longitude], (err, result) => {
        if (err){
            return res.status(500).json({ error: 'DB error' });
        }
        
        res.status(201).json({ message: 'School added successfully', id: result.insertId });
    });

})


const listSchools = asyncHandler( async (req, res) => {
    
    const userLat = parseFloat(req.query.latitude);
    const userLon = parseFloat(req.query.longitude);

    if (isNaN(userLat) || isNaN(userLon)) {
        return res.status(400).json({ error: 'Invalid coordinates' });
    }

    const sql = 'SELECT * FROM schools';
    db.query(sql, (err, results) => {
    
    if (err){
        return res.status(500).json({ error: 'DB error' });
    } 

    const sorted = results.map((school) => {

      const distance = haversineDistance(userLat, userLon, school.latitude, school.longitude);
      return { ...school, distance };
    }).sort((a, b) => a.distance - b.distance);

    res.json(sorted);

  });   

})


export {
    addSchool,
    listSchools
}
