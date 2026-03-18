import { NextResponse } from 'next/server';
import { loadPlantProfile } from '../../../../../lib/cms-loader';

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const data = await loadPlantProfile(params.id);
  return NextResponse.json(data);
}
