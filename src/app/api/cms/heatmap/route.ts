import { NextResponse } from 'next/server';
import { loadHeatmap } from '../../../../lib/cms-loader';

export async function GET() {
  const data = await loadHeatmap();
  return NextResponse.json(data);
}
