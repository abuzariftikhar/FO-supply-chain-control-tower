import { NextResponse } from 'next/server';
import { loadChart } from '../../../../../lib/cms-loader';

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const data = await loadChart(params.id);
  return NextResponse.json(data);
}
