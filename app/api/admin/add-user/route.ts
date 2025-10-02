import { NextRequest, NextResponse } from 'next/server';
import { addAuthorizedUser } from '@/lib/actions/auth.action';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, adminKey } = body;

    if (!name || !email || !password || !adminKey) {
      return NextResponse.json(
        { success: false, message: 'Brakujące dane: name, email, password, adminKey' },
        { status: 400 }
      );
    }

    const result = await addAuthorizedUser({
      name,
      email,
      password,
      adminKey,
    });

    return NextResponse.json(result, { status: result.success ? 200 : 400 });
  } catch (error: any) {
    console.error('Error in add-user API:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Wystąpił błąd' },
      { status: 500 }
    );
  }
}

