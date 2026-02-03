import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const body = await request.json();
    const { subject, tone, context } = body;

    // Simulate AI delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    let content = '';

    if (tone === 'Professional') {
        content = `Dear [Contact Name],

I hope this email finds you well.

Regarding "${subject}", I wanted to reach out and share some exciting updates. ${context}

We value your partnership and look forward to discussing this further.

Best regards,
[Your Name]`;
    } else if (tone === 'Friendly') {
        content = `Hi [Contact Name]! 👋

Hope you're having a great week!

I'm super excited to tell you about "${subject}". ${context}

Let's catch up soon!

Cheers,
[Your Name]`;
    } else {
        // Magic/Creative
        content = `Greetings [Contact Name] ✨,

Something magical is happening with "${subject}".

${context}

Prepare to be amazed!

Magically yours,
[Your Name]`;
    }

    return NextResponse.json({ content });
}
