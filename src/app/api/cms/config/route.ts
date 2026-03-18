import { NextResponse } from 'next/server';
import { loadDashboardConfig } from '../../../../lib/cms-loader';

export async function GET() {
  const data = await loadDashboardConfig();
  return NextResponse.json(data);
}
