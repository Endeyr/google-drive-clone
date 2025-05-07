import { MUTATION } from '@/server/db/queries';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { name, parent } = body;

  const session = await auth();

  if (!session.userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const newFolder = await MUTATION.createFolder({
    folder: {
      name,
      parent,
    },
    userId: session.userId,
  });

  if (!newFolder) {
    return NextResponse.json({ Error: 'Unable to create folder' });
  }
  return NextResponse.json({ success: true });
}
