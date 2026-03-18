import { NextResponse } from 'next/server';
import { loadAlerts } from '../../../../lib/cms-loader';

export async function GET() {
  const data = await loadAlerts();
  return NextResponse.json(data);
}
