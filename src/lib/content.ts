import fs from 'node:fs';
import path from 'node:path';
import { Property } from '@/types/property';

export interface BaseContent {
  agency: {
    name: string;
    owner: string;
    location: string;
    gmb_url: string;
  };
  reviews: {
    author: string;
    date: string;
    rating: number;
    content: string;
  }[];
  stats: {
    average: number;
    count: number;
    label: string;
    platform: string;
  };
  properties: Property[];
}

export function getBaseContent(): BaseContent {
  try {
    const filePath = path.join(process.cwd(), 'base-content.json');
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Error reading base-content.json:', error);
    return {
      agency: { name: '', owner: '', location: '', gmb_url: '' },
      reviews: [],
      stats: { average: 0, count: 0, label: '', platform: '' },
      properties: []
    };
  }
}
