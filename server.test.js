import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import { app } from './server.js';
import path from 'path';

describe('Express Server Routes', () => {
  let originalSendFile;
  const sendFileMock = vi.fn().mockImplementation(function(filePath) {
      this.status(200).send(`Mocked sendFile: ${filePath}`);
  });

  beforeEach(() => {
    // Clear mock calls between tests
    vi.clearAllMocks();

    // Save original sendFile to restore later
    originalSendFile = express.response.sendFile;

    // Create a new mock for sendFile on the prototype directly
    express.response.sendFile = sendFileMock;
  });

  afterEach(() => {
    // Restore original sendFile to avoid interfering with other tests
    express.response.sendFile = originalSendFile;
  });

  it('should handle the explicit root route (/)', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

  it('should handle SPA routing for unknown routes', async () => {
    const response = await request(app).get('/some/random/route');

    expect(response.status).toBe(200);
    expect(sendFileMock).toHaveBeenCalled();

    // Get the path that was passed to sendFile
    const callArg = sendFileMock.mock.calls[0][0];
    expect(callArg).toContain('dist/index.html'.replace(/\//g, path.sep));
  });
});
