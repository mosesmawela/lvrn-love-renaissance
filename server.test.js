import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import express from 'express';
import path from 'path';

// Set NODE_ENV to test to prevent server.js from calling app.listen()
process.env.NODE_ENV = 'test';

// Dynamically import the app after setting the environment variable
const { default: app } = await import('./server.js');

describe('Server Route Configuration', () => {
    let originalSendFile;
    const mockedSendFile = vi.fn(function (path, options, callback) {
        // Express signature: res.sendFile(path, [options], [fn])
        let done = callback;
        if (typeof options === 'function') {
            done = options;
        }

        // Must call express.response.end() or similar so the request completes
        this.status(200).send('mocked');
        if (done) done();
    });

    beforeAll(() => {
        originalSendFile = express.response.sendFile;
        express.response.sendFile = mockedSendFile;
    });

    afterAll(() => {
        express.response.sendFile = originalSendFile;
    });

    it('should serve index.html on the root route "/"', async () => {
        mockedSendFile.mockClear();

        const response = await request(app).get('/');

        expect(response.status).toBe(200);
        expect(mockedSendFile).toHaveBeenCalled();

        const calledWith = mockedSendFile.mock.calls[0][0];
        expect(calledWith.endsWith(path.join('dist', 'index.html'))).toBe(true);
    });

    it('should serve index.html as fallback for unknown routes (SPA routing)', async () => {
        mockedSendFile.mockClear();

        const response = await request(app).get('/some-unknown-route');

        expect(response.status).toBe(200);
        expect(mockedSendFile).toHaveBeenCalled();

        const calledWith = mockedSendFile.mock.calls[0][0];
        expect(calledWith.endsWith(path.join('dist', 'index.html'))).toBe(true);
    });

    it('should serve index.html as fallback for deep unknown routes (SPA routing)', async () => {
        mockedSendFile.mockClear();

        const response = await request(app).get('/deep/nested/unknown-route');

        expect(response.status).toBe(200);
        expect(mockedSendFile).toHaveBeenCalled();

        const calledWith = mockedSendFile.mock.calls[0][0];
        expect(calledWith.endsWith(path.join('dist', 'index.html'))).toBe(true);
    });
});
