import { del } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/actions/auth.action';

export async function DELETE(request: Request) {
  try {
    // Check if the user is authenticated
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get the blob token
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_VERCEL_READ_WRITE_TOKEN;
    
    if (!blobToken) {
      console.error('Blob token is not available');
      return NextResponse.json(
        { error: 'Vercel Blob Storage is not configured.' },
        { status: 500 }
      );
    }

    // Get the URL from the request body
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: 'Image URL is required' },
        { status: 400 }
      );
    }

    // Delete the blob
    await del(url, { token: blobToken });

    return NextResponse.json({ 
      success: true,
      message: 'Image deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting image:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete image';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

