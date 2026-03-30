import { readFile, writeFile } from 'fs/promises';
import path from 'path';

export async function getReviews() {
  const filePath = path.join(process.cwd(), 'base-content.json');
  
  try {
    const data = await readFile(filePath, 'utf-8');
    const parsed = JSON.parse(data);
    
    // In a real production scenario with GMB API:
    // const lastUpdated = new Date(parsed.stats.lastUpdated);
    // const now = new Date();
    // if (now.getTime() - lastUpdated.getTime() > 24 * 60 * 60 * 1000) { 
    //   await updateGMBData(); 
    // }

    return parsed;
  } catch (error) {
    console.error('Error reading reviews:', error);
    return { reviews: [], stats: { average: 0, total: 0 } };
  }
}
