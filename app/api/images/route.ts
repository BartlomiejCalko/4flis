import { list } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const blobToken = process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_VERCEL_READ_WRITE_TOKEN;
    
    if (!blobToken) {
      console.error('Blob token is not available');
      return NextResponse.json(
        { error: 'Vercel Blob Storage is not configured.' },
        { status: 500 }
      );
    }

    const { blobs } = await list({
      token: blobToken,
    });

    // Map blobs to simplified structure (all blobs should be images based on upload restrictions)
    const images = blobs
      .map(blob => ({
        url: blob.url,
        pathname: blob.pathname,
        uploadedAt: blob.uploadedAt,
      }))
      .sort((a, b) => {
        // Sort by uploadedAt in descending order (newest first)
        return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
      });

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error fetching images:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch images';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

