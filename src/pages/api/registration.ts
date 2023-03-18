import type { NextApiRequest, NextApiResponse } from 'next';
import { Validator } from 'node-input-validator';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(500).json({ message: 'Method not allowed' });
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const v = new Validator(req.body, {
    name: 'required|string',
    email: 'required|email',
    password: 'required|string|minLength:6|same:confirm_password',
  });

  const matched = await v.check();

  if (!matched) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return res.status(406).json({ message: 'Failed to register', errors: v.errors });
  }

  return res.status(200).json({ message: 'Successful registration' });
}
