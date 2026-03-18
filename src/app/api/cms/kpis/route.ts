import { NextResponse } from 'next/server';
import { loadKPIs } from '../../../../lib/cms-loader';

export async function GET() {
  const data = await loadKPIs();
  return NextResponse.json(data);
}
