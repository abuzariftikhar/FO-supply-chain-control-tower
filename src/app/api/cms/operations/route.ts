import { NextResponse } from 'next/server';
import { loadOperations } from '../../../../lib/cms-loader';

export async function GET() {
  const data = await loadOperations();
  return NextResponse.json(data);
}
