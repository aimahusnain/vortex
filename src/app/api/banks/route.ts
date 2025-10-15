import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

interface BankCreateRequest {
  bankName: string;
  accountNumber: string;
  routingNumber: string;
}

export async function GET(): Promise<NextResponse> {
  try {
    const banks = await prisma.banks.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    return NextResponse.json(banks);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch banks' }, 
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: BankCreateRequest = await request.json();
    
    const bank = await prisma.banks.create({
      data: {
        bankName: body.bankName,
        accountNumber: body.accountNumber,
        routingNumber: body.routingNumber,
      }
    });
    
    return NextResponse.json(bank);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create bank' }, 
      { status: 500 }
    );
  }
}