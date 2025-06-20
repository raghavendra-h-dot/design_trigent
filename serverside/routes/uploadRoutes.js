import express from 'express';
import path from 'path';
import fs from 'fs';
import { connectToDatabase } from '../lib/db.js';

const router = express.Router();

const UPLOAD_DIR = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

router.post('/image', async (req, res) => {
  try {
    console.log("📥 Upload request received");

    if (!req.files || Object.keys(req.files).length === 0) {
      console.log("❌ No files uploaded");
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const files = Array.isArray(req.files.image) ? req.files.image : [req.files.image];
    const db = await connectToDatabase();

    let {
      services,
      industries,
      client,
      category,
      otherInfo,
      description
    } = req.body;

    try {
      services = JSON.stringify(JSON.parse(services));
    } catch {
      services = JSON.stringify([]);
    }

    try {
      industries = JSON.stringify(JSON.parse(industries));
    } catch {
      industries = JSON.stringify([]);
    }

    try {
      category = JSON.stringify(JSON.parse(category));
    } catch {
      category = JSON.stringify([]);
    }

    console.log("📦 req.body parsed:", {
      services,
      industries,
      category,
      client,
      otherInfo,
      description,
    });

    for (const file of files) {
      const uploadPath = path.join(UPLOAD_DIR, file.name);

      try {
        await file.mv(uploadPath);
        console.log(`✅ File saved to: ${uploadPath}`);
      } catch (moveErr) {
        console.error("❌ File move failed:", moveErr);
        return res.status(500).json({ message: "Failed to save file" });
      }

      const [existing] = await db.execute(
        'SELECT id FROM image_storage WHERE filename = ?', [file.name]
      );

      if (existing.length === 0) {
        await db.execute(
          `INSERT INTO image_storage 
           (filename, filetype, filepath, services, industries, category, client, otherInfo, description)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            file.name,
            file.mimetype,
            uploadPath,
            services,
            industries,
            category,
            client || null,
            otherInfo || null,
            description || null
          ]
        );
        console.log(`📥 DB row inserted for: ${file.name}`);
      } else {
        console.log(`⚠️ Duplicate skipped: ${file.name}`);
      }
    }

    res.json({ message: 'Files uploaded successfully' });
  } catch (err) {
    console.error("❌ Upload Error:", err);
    res.status(500).json({ message: err.message });
  }
});

router.get('/images', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const query = req.query.q?.toLowerCase() || '';

    const [rows] = await db.execute(
      `SELECT * FROM image_storage
       WHERE LOWER(filename) LIKE ? OR
             LOWER(client) LIKE ? OR
             LOWER(category) LIKE ? OR
             LOWER(services) LIKE ? OR
             LOWER(industries) LIKE ? OR
             LOWER(description) LIKE ? OR
             LOWER(otherInfo) LIKE ?`,
      Array(7).fill(`%${query}%`)
    );

    res.json(rows);
  } catch (err) {
    console.error("❌ Search Error:", err);
    res.status(500).json({ message: 'Error retrieving images' });
  }
});

router.get('/home', async (req, res) => {
  try {
    res.json({ user: { name: 'Test User' } });
  } catch (err) {
    console.error("❌ Home route error:", err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
