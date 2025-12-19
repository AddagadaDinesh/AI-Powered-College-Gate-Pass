// Quick test script to verify backend endpoints
const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

async function testBackend() {
    console.log('🧪 Testing Backend Endpoints...\n');

    // Test 1: Ping endpoint
    try {
        console.log('1️⃣ Testing /ping endpoint...');
        const pingRes = await axios.get(`${BASE_URL}/ping`);
        console.log('✅ Ping successful:', pingRes.data);
    } catch (err) {
        console.log('❌ Ping failed:', err.message);
        console.log('⚠️  Backend might not be running on port 5000');
        return;
    }

    // Test 2: Student login endpoint (will fail with invalid credentials, but should return 401, not 404)
    try {
        console.log('\n2️⃣ Testing /api/auth/login endpoint...');
        const loginRes = await axios.post(`${BASE_URL}/api/auth/login`, {
            email: 'test@example.com',
            password: 'test123',
            role: 'student'
        });
        console.log('✅ Login endpoint exists (unexpected success):', loginRes.data);
    } catch (err) {
        if (err.response) {
            if (err.response.status === 404) {
                console.log('❌ 404 Error - Route does not exist!');
                console.log('   Expected route: /api/auth/login');
            } else if (err.response.status === 401) {
                console.log('✅ Login endpoint exists (401 Invalid credentials - expected)');
            } else {
                console.log(`✅ Login endpoint exists (${err.response.status} - ${err.response.data.message})`);
            }
        } else {
            console.log('❌ Network error:', err.message);
        }
    }

    // Test 3: Faculty login endpoint
    try {
        console.log('\n3️⃣ Testing /api/auth/faculty-login endpoint...');
        const facultyRes = await axios.post(`${BASE_URL}/api/auth/faculty-login`, {
            email: 'test@example.com',
            password: 'test123'
        });
        console.log('✅ Faculty login endpoint exists:', facultyRes.data);
    } catch (err) {
        if (err.response) {
            if (err.response.status === 404) {
                console.log('❌ 404 Error - Route does not exist!');
            } else {
                console.log(`✅ Faculty login endpoint exists (${err.response.status})`);
            }
        } else {
            console.log('❌ Network error:', err.message);
        }
    }

    // Test 4: Gatekeeper login endpoint
    try {
        console.log('\n4️⃣ Testing /api/auth/gatekeeper-login endpoint...');
        const gatekeeperRes = await axios.post(`${BASE_URL}/api/auth/gatekeeper-login`, {
            email: 'test@example.com',
            password: 'test123'
        });
        console.log('✅ Gatekeeper login endpoint exists:', gatekeeperRes.data);
    } catch (err) {
        if (err.response) {
            if (err.response.status === 404) {
                console.log('❌ 404 Error - Route does not exist!');
            } else {
                console.log(`✅ Gatekeeper login endpoint exists (${err.response.status})`);
            }
        } else {
            console.log('❌ Network error:', err.message);
        }
    }

    console.log('\n✨ Backend test complete!\n');
}

testBackend();
