import { NextResponse } from 'next/server';
import { loadOrders } from '../../../../lib/cms-loader';

export async function GET() {
  const data = await loadOrders();
  return NextResponse.json(data);
}
