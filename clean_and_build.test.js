import { test } from 'node:test';
import assert from 'node:assert';
import { cleanAndBuild } from './clean_and_build.js';
import path from 'path';

test('cleanAndBuild should clean directories and call build', () => {
    let execCalled = false;
    let execCmd = '';
    let rmCalled = [];

    const mockFs = {
        existsSync: () => true,
        rmSync: (p) => rmCalled.push(p)
    };

    const mockExecSync = (cmd) => {
        execCalled = true;
        execCmd = cmd;
    };

    const mockDir = '/mock/dir';

    cleanAndBuild(mockFs, mockExecSync, mockDir);

    assert.strictEqual(execCalled, true);
    assert.strictEqual(execCmd, 'npm run build');
    assert.strictEqual(rmCalled.length, 2);
    assert.strictEqual(rmCalled[0], path.join(mockDir, 'dist'));
    assert.strictEqual(rmCalled[1], path.join(mockDir, 'node_modules', '.vite'));
});

test('cleanAndBuild should not clean if directories do not exist', () => {
    let execCalled = false;
    let rmCalled = [];

    const mockFs = {
        existsSync: () => false,
        rmSync: (p) => rmCalled.push(p)
    };

    const mockExecSync = (cmd) => {
        execCalled = true;
    };

    cleanAndBuild(mockFs, mockExecSync, '/mock/dir');

    assert.strictEqual(execCalled, true);
    assert.strictEqual(rmCalled.length, 0);
});

test('cleanAndBuild should handle fs errors gracefully', () => {
    let execCalled = false;

    const mockFs = {
        existsSync: () => true,
        rmSync: () => { throw new Error('Permission denied'); }
    };

    const mockExecSync = (cmd) => {
        execCalled = true;
    };

    // Should not throw, should just log and continue
    cleanAndBuild(mockFs, mockExecSync, '/mock/dir');

    assert.strictEqual(execCalled, true);
});

test('cleanAndBuild should exit on build error', () => {
    let processExitCalled = false;
    let exitCode = 0;

    // Mock process.exit
    const originalProcessExit = process.exit;
    process.exit = (code) => {
        processExitCalled = true;
        exitCode = code;
    };

    const mockFs = {
        existsSync: () => false,
        rmSync: () => {}
    };

    const mockExecSync = (cmd) => {
        throw new Error('Build failed');
    };

    try {
        cleanAndBuild(mockFs, mockExecSync, '/mock/dir');

        assert.strictEqual(processExitCalled, true);
        assert.strictEqual(exitCode, 1);
    } finally {
        process.exit = originalProcessExit;
    }
});
