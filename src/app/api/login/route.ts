import { NextResponse } from 'next/server';

// Example users database (in-memory for demo)
const users = [
  {
    username: 'testuser',
    password: 'Password@123', // Must match the frontend validation
  },
  {
    username: 'Admin',
    password: 'Admin@2025',
  },
];

export async function POST(request: Request) {
  const { username, password } = await request.json();
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    return NextResponse.json({ success: true, message: 'Login successful!' });
  } else {
    return NextResponse.json(
      { success: false, message: 'Invalid username or password.' },
      { status: 401 }
    );
  }
}
