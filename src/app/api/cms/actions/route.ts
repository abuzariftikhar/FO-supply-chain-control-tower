import { NextResponse } from 'next/server';
import { loadActions } from '../../../../lib/cms-loader';

export async function GET() {
  const data = await loadActions();
  return NextResponse.json(data);
}
