import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/actions/auth.action';

export async function POST(request: Request): Promise<NextResponse> {
  // Check if the user is authenticated
  const user = await getCurrentUser();
  
  if (!user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        return {
          allowedContentTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
          allowOverwrite: true,
          tokenPayload: JSON.stringify({
            userId: user.id,
            userEmail: user.email,
            uploadedAt: new Date().toISOString(),
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Log upload completion
        console.log('Blob upload completed:', {
          url: blob.url,
          pathname: blob.pathname,
        });

        try {
          const payload = JSON.parse(tokenPayload as string);
          console.log(`File uploaded by user: ${payload.userEmail} (${payload.userId})`);
        } catch (error) {
          console.error('Error parsing token payload:', error);
        }
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }
}