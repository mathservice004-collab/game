import type { VercelRequest, VercelResponse } from '@vercel/node';

// Simplified validation
export default function handler(
    request: VercelRequest,
    response: VercelResponse
) {
    if (request.method === 'POST') {
        const { name, score } = request.body;

        // Basic anti-cheat
        if (score > 100000 || !name) {
            return response.status(400).json({ error: 'Invalid score submission' });
        }

        // In a real app, you'd save this to a DB here.
        return response.status(200).json({
            success: true,
            message: 'Score submitted!',
            position: 1 // Simulation
        });
    }

    return response.status(405).json({ error: 'Method not allowed' });
}
