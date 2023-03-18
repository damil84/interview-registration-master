import type { NextApiRequest, NextApiResponse } from 'next';
import { Validator } from 'node-input-validator';

const PASSWORD = 'password';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(500).json({ message: 'Method not allowed' });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const v = new Validator(req.body, {
    email: 'required|email',
    password: 'required|string',
  });

  v.addPostRule(
    (provider: {
      inputs: { password: string };
      error(name: string, type: string, message: string): string;
    }) => {
      if (provider.inputs.password !== PASSWORD) {
        provider.error('password', 'custom', 'Incorrect password');
      }
    },
  );

  const matched = await v.check();

  if (!matched) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return res.status(406).json({ message: 'Login failed', errors: v.errors });
  }

  return res.status(200).json({ message: 'Successful login' });
}
