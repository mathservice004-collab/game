import type { VercelRequest, VercelResponse } from '@vercel/node';

// Note: In-memory store is local to each serverless instance and will reset.
// For production, use Upstash Redis or a database.
let mockLeaderboard = [
    { name: 'NEON_PRO', score: 2500 },
    { name: 'DRIFT_KING', score: 2100 },
    { name: 'VOID_RUNNER', score: 1800 },
    { name: 'CYBER_PUNK', score: 1500 },
    { name: 'TECH_NO', score: 1200 },
];

export default function handler(
    request: VercelRequest,
    response: VercelResponse
) {
    if (request.method === 'GET') {
        return response.status(200).json(mockLeaderboard.sort((a, b) => b.score - a.score));
    }

    return response.status(405).json({ error: 'Method not allowed' });
}
