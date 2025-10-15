import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

interface BankUpdateRequest {
  bankName?: string;
  accountNumber?: string;
  routingNumber?: string;
}

interface RouteParams {
  params: {
    id: string;
  };
}

export async function PUT(
  request: NextRequest, 
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    const body: BankUpdateRequest = await request.json();
    
    const bank = await prisma.banks.update({
      where: { id: params.id },
      data: {
        ...body,
        updatedAt: new Date(),
      }
    });
    
    return NextResponse.json(bank);
  } catch (error) {
    console.error('Error updating bank:', error);
    return NextResponse.json(
      { error: 'Failed to update bank' }, 
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest, 
  { params }: RouteParams
): Promise<NextResponse> {
  try {
    await prisma.banks.delete({
      where: { id: params.id }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting bank:', error);
    return NextResponse.json(
      { error: 'Failed to delete bank' }, 
      { status: 500 }
    );
  }
}