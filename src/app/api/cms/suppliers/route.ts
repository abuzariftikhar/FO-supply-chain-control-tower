import { NextResponse } from 'next/server';
import { loadSuppliers } from '../../../../lib/cms-loader';

export async function GET() {
  const data = await loadSuppliers();
  return NextResponse.json(data);
}
